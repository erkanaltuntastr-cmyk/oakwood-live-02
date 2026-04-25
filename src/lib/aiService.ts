import type { QuizSession } from '@/types'

const API_BASE = 'http://localhost:3001'

export async function callAI(messages: { role: string; content: string }[], systemPrompt: string) {
  const res = await fetch(`${API_BASE}/api/ai/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, systemPrompt }),
  })
  if (!res.ok) throw new Error(`AI error: ${res.status}`)
  return res.json() as Promise<{ success: boolean; content: string }>
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
