import type { QuizSession } from '@/types'

const API_BASE = (import.meta.env.VITE_API_BASE as string | undefined)?.replace(/\/$/, '') ?? ''

const FALLBACK_MESSAGES: Record<string, string> = {
  quiz: 'AI servisi şu an bağlı değil. Ayarlar\'dan API key ekleyebilir ya da yerel AI bridge kurabilirsin.',
  chat: 'AI bağlantısı kurulamadı. Lütfen tekrar dene.',
}

export async function callAI(
  messages: { role: string; content: string }[],
  systemPrompt: string
): Promise<{ success: boolean; content: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, systemPrompt }),
      signal: AbortSignal.timeout(15000),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      return { success: false, content: err.message ?? FALLBACK_MESSAGES.quiz }
    }

    return res.json()
  } catch {
    return { success: false, content: FALLBACK_MESSAGES.quiz }
  }
}

export function quizFeedbackPrompt(session: QuizSession): string {
  const correct = session.answers.filter((a) => a?.correct).length
  return `You are an encouraging UK primary/secondary school tutor.
Subject: ${session.subject}. Topics: ${session.topics.join(', ')}.
Student score: ${correct}/${session.questions.length} (${session.score ?? 0}%).
Give 3-4 sentences: one strength, one area to improve, one specific tip.
Keep it age-appropriate and positive.`
}

export function buildFeedbackMessage(session: QuizSession) {
  const wrong = session.questions
    .filter((_, i) => !session.answers[i]?.correct)
    .map((q) => q.topic)
  return {
    role: 'user' as const,
    content: `Please give me feedback on my ${session.subject} quiz. I got ${session.score}%. Topics I struggled with: ${wrong.join(', ') || 'none'}.`,
  }
}
