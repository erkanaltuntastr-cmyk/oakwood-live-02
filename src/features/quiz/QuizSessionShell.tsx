import { cn } from '@/lib/utils'

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
}

const LABELS = ['A', 'B', 'C', 'D']

export function QuizSessionShell({
  title, currentQ, totalQ, timeLeft,
  question, options, selectedOption,
  onSelect, onHint, onNext,
}: QuizSessionShellProps) {
  const progress = (currentQ / totalQ) * 100

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-gray-900">{title}</h1>
        <span className="font-mono text-sm bg-gray-100 px-3 py-1 rounded-lg text-gray-700">
          {timeLeft}
        </span>
      </div>

      {/* Progress */}
      <div>
        <div className="flex justify-between text-xs text-gray-400 mb-1.5">
          <span>Soru {currentQ} / {totalQ}</span>
          <span>%{Math.round(progress)}</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <p className="text-lg font-medium text-gray-900 leading-relaxed">{question}</p>
      </div>

      {/* Options */}
      <div className="grid gap-3">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className={cn(
              'flex items-center gap-4 px-5 py-4 rounded-xl border-2 text-left transition-all',
              selectedOption === i
                ? 'border-blue-500 bg-blue-50 text-blue-900'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 text-gray-800'
            )}
          >
            <span className={cn(
              'w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0',
              selectedOption === i ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'
            )}>
              {LABELS[i]}
            </span>
            <span className="font-medium">{opt}</span>
          </button>
        ))}
      </div>

      {/* Bottom actions */}
      <div className="flex justify-between">
        <button
          onClick={onHint}
          className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-600 font-medium hover:bg-gray-50 transition-colors"
        >
          İpucu
        </button>
        <button
          onClick={onNext}
          disabled={selectedOption === null}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {currentQ === totalQ ? 'Bitir' : 'Sonraki'}
        </button>
      </div>
    </div>
  )
}
