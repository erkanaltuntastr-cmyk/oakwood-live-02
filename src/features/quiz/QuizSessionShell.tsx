import { cn } from '@/lib/utils'
import { useLang } from '@/lib/useLang'
import { OakwoodAssetIcon } from '@/components/brand/OakwoodAssetIcon'

interface QuizSessionShellProps {
  title: string
  currentQ: number
  totalQ: number
  timeLeft: string
  question: string
  options: string[]
  selectedOption: number | null
  onSelect: (i: number) => void
  onHint: () => void
  onNext: () => void
  hint?: string
  explanation?: string
}

const LABELS = ['A', 'B', 'C', 'D']

export function QuizSessionShell({ title, currentQ, totalQ, timeLeft, question, options, selectedOption, onSelect, onHint, onNext, hint, explanation }: QuizSessionShellProps) {
  const { t } = useLang()
  const progress = (currentQ / totalQ) * 100

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <OakwoodAssetIcon type="quiz" className="h-7 w-7" size={28} alt="Quiz icon" />
          <h1 className="font-semibold text-foreground">{title}</h1>
        </div>
        <span className="font-mono text-sm bg-muted px-3 py-1 rounded-lg text-muted-foreground">{timeLeft}</span>
      </div>

      <div>
        <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
          <span>{t('quiz.question', { current: currentQ, total: totalQ })}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="oak-card p-6">
        <p className="text-lg font-medium text-foreground leading-relaxed">{question}</p>
      </div>

      <div className="grid gap-3">
        {options.map((opt, i) => (
          <button key={i} onClick={() => onSelect(i)}
            className={cn('flex items-center gap-4 px-5 py-4 rounded-xl border-2 text-left transition-all',
              selectedOption === i ? 'border-primary bg-accent/30 text-foreground' : 'border-border bg-white hover:border-border/80 hover:bg-muted/50 text-foreground')}>
            <span className={cn('w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0',
              selectedOption === i ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground')}>
              {LABELS[i]}
            </span>
            <span className="font-medium">{opt}</span>
          </button>
        ))}
      </div>

      {hint && (
        <div className="flex items-start gap-2 text-sm bg-accent/40 border border-border rounded-xl px-4 py-3 text-muted-foreground">
          <OakwoodAssetIcon type="ai" className="mt-0.5 h-5 w-5 shrink-0" size={20} alt="AI icon" />
          <span>{hint}</span>
        </div>
      )}
      {explanation && <div className="text-sm bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-green-800">{explanation}</div>}

      <div className="flex justify-between">
        <button onClick={onHint} className="oak-btn-ghost">{t('quiz.hint')}</button>
        <button onClick={onNext} disabled={selectedOption === null}
          className="oak-btn-primary disabled:opacity-40 disabled:cursor-not-allowed">
          {currentQ === totalQ ? t('quiz.finish') : t('quiz.next_q')}
        </button>
      </div>
    </div>
  )
}
