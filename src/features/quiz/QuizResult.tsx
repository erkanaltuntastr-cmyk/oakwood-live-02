import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { QuizResultShell } from './QuizResultShell'
import { useAppStore } from '@/state/store'
import { buildReport, createSession } from '@/lib/quizService'
import { callAI, quizFeedbackPrompt, buildFeedbackMessage } from '@/lib/aiService'

export function QuizResult() {
  const { sessionId } = useParams<{ sessionId: string }>()
  const navigate = useNavigate()
  const { quizSessions, addQuizSession, updateQuizSession } = useAppStore()

  const session = quizSessions.find((s) => s.id === sessionId)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiText, setAiText] = useState<string | null>(null)

  if (!session) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        Sonuç bulunamadı.
      </div>
    )
  }

  const score = session.score ?? 0
  const report = session.report ?? buildReport(score)

  const correct = session.questions
    .filter((_, i) => session.answers[i]?.correct)
    .map((q) => q.topic)

  const wrong = session.questions
    .filter((_, i) => !session.answers[i]?.correct)
    .map((q) => q.topic)

  async function handleAiSuggest() {
    setAiLoading(true)
    try {
      const result = await callAI(
        [buildFeedbackMessage(session!)],
        quizFeedbackPrompt(session!)
      )
      setAiText(result.content)
      updateQuizSession(session!.id, { report: { ...report, growth: [result.content] } })
    } catch {
      setAiText('AI servisi şu an kullanılamıyor. Ayarlar\'dan API key ekleyebilirsin.')
    } finally {
      setAiLoading(false)
    }
  }

  function handleRetry() {
    const retake = createSession(
      session!.childId,
      session!.subject,
      session!.topics,
      session!.config
    )
    addQuizSession(retake)
    navigate(`/app/quiz/session/${retake.id}`)
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-display font-semibold text-foreground">Sınav Sonucu</h1>
        <p className="text-muted-foreground text-sm mt-1">{session.subject} — {session.topics.join(', ') || 'Tüm konular'}</p>
      </div>

      <QuizResultShell
        score={score}
        correct={[...new Set(correct)]}
        wrong={[...new Set(wrong)]}
        onRetry={handleRetry}
        onAiSuggest={handleAiSuggest}
        aiLoading={aiLoading}
        aiText={aiText}
        report={report}
      />
    </div>
  )
}
