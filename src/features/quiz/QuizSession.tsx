import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { QuizSessionShell } from './QuizSessionShell'
import { useAppStore } from '@/state/store'
import { checkAnswer } from '@/lib/quizService'

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

export function QuizSession() {
  const { sessionId } = useParams<{ sessionId: string }>()
  const navigate = useNavigate()
  const { quizSessions, updateQuizSession } = useAppStore()

  const session = quizSessions.find((s) => s.id === sessionId)

  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [gapValue, setGapValue] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null)
  const [elapsed, setElapsed] = useState(0)
  const timeLimitSec = (session?.config.timeLimit ?? 0) * 60

  useEffect(() => {
    if (session && session.status === 'pending') {
      updateQuizSession(session.id, { status: 'in_progress', startedAt: new Date().toISOString() })
    }
  }, [session?.id])

  useEffect(() => {
    const t = setInterval(() => {
      setElapsed((e) => {
        const next = e + 1
        if (timeLimitSec > 0 && next >= timeLimitSec) clearInterval(t)
        return next
      })
    }, 1000)
    return () => clearInterval(t)
  }, [timeLimitSec])

  // When user selects an answer on MC, immediately record and show explanation if configured
  function handleSelect(i: number) {
    if (!session) return
    setSelected(i)
    const question = session.questions[currentQ]
    const value = question.options?.[i] ?? ''
    const correct = checkAnswer(question, value)
    setLastAnswerCorrect(correct)
    if (session.config.showExplanation && question.explanation) {
      setShowExplanation(true)
    }
  }

  const handleNext = useCallback(() => {
    if (!session) return
    const question = session.questions[currentQ]
    let value = ''
    if (question.type === 'multiple-choice' && selected !== null) {
      value = question.options?.[selected] ?? ''
    } else {
      value = gapValue
    }

    const correct = question.type === 'open-ended' ? false : checkAnswer(question, value)
    const answers = [...(session.answers ?? [])]
    answers[currentQ] = { value, correct }
    updateQuizSession(session.id, { answers })

    const isLast = currentQ === session.questions.length - 1
    if (isLast) {
      const correctCount = answers.filter((a) => a?.correct).length
      const score = Math.round((correctCount / session.questions.length) * 100)
      updateQuizSession(session.id, {
        status: 'completed',
        score,
        completedAt: new Date().toISOString(),
        answers,
      })
      navigate(`/app/quiz/result/${session.id}`)
    } else {
      setCurrentQ((q) => q + 1)
      setSelected(null)
      setGapValue('')
      setShowHint(false)
      setShowExplanation(false)
      setLastAnswerCorrect(null)
    }
  }, [session, currentQ, selected, gapValue])

  if (!session) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        Sınav bulunamadı.
      </div>
    )
  }

  const timeDisplay = timeLimitSec > 0
    ? formatTime(Math.max(0, timeLimitSec - elapsed))
    : formatTime(elapsed)

  const question = session.questions[currentQ]
  const isGap = question.type === 'gap-fill'
  const isOpen = question.type === 'open-ended'
  const canProceed = selected !== null || gapValue.trim().length > 0

  // Gap-fill and open-ended: custom layout
  if (isGap || isOpen) {
    return (
      <div className="max-w-2xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">{session.subject}</p>
            <h1 className="text-lg font-display font-semibold text-foreground">{question.topic}</h1>
          </div>
          <span className="font-mono text-sm bg-muted px-3 py-1 rounded-lg">{timeDisplay}</span>
        </div>

        <div>
          <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
            <span>Soru {currentQ + 1} / {session.questions.length}</span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${((currentQ + 1) / session.questions.length) * 100}%` }} />
          </div>
        </div>

        <div className="oak-card p-6">
          <p className="text-base font-medium text-foreground leading-relaxed">{question.prompt}</p>
        </div>

        <textarea
          value={gapValue}
          onChange={(e) => setGapValue(e.target.value)}
          placeholder={isOpen ? 'Cevabını yaz...' : 'Boşluğa yazılacak kelime...'}
          rows={isOpen ? 4 : 2}
          className="w-full border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 resize-none bg-background"
        />

        {session.config.showHint && question.hint && (
          <div>
            <button onClick={() => setShowHint(!showHint)} className="text-xs text-primary underline">
              {showHint ? 'İpucunu gizle' : 'İpucu göster'}
            </button>
            {showHint && (
              <p className="text-xs text-muted-foreground mt-1.5 bg-accent/40 border border-border px-3 py-2 rounded-lg">
                💡 {question.hint}
              </p>
            )}
          </div>
        )}

        <div className="flex justify-between">
          <span />
          <button onClick={handleNext} disabled={!canProceed}
            className="oak-btn-primary disabled:opacity-40 disabled:cursor-not-allowed">
            {currentQ === session.questions.length - 1 ? 'Bitir' : 'Sonraki'}
          </button>
        </div>
      </div>
    )
  }

  // Multiple choice
  return (
    <QuizSessionShell
      title={`${session.subject} — ${question.topic}`}
      currentQ={currentQ + 1}
      totalQ={session.questions.length}
      timeLeft={timeDisplay}
      question={question.prompt}
      options={question.options ?? []}
      selectedOption={selected}
      onSelect={handleSelect}
      onHint={() => setShowHint((h) => !h)}
      onNext={handleNext}
      hint={showHint && session.config.showHint ? question.hint : undefined}
      explanation={
        showExplanation && lastAnswerCorrect !== null && session.config.showExplanation
          ? question.explanation
          : undefined
      }
    />
  )
}
