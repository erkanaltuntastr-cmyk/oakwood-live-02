import { cn } from '@/lib/utils'

interface QuizWizardShellProps {
  step: 1 | 2 | 3
  onBack: () => void
  onNext: () => void
  onSubmit: () => void
  children: React.ReactNode
}

const STEPS = ['Konu Seç', 'Soru Ayarları', 'Önizleme']

export function QuizWizardShell({ step, onBack, onNext, onSubmit, children }: QuizWizardShellProps) {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Step indicator */}
      <div className="flex items-center mb-8">
        {STEPS.map((label, i) => {
          const num = i + 1
          const done = num < step
          const active = num === step
          return (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              <div className="flex items-center gap-2 shrink-0">
                <div className={cn(
                  'w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold transition-colors',
                  done ? 'bg-blue-600 text-white' :
                  active ? 'bg-blue-600 text-white' :
                  'bg-gray-100 text-gray-400'
                )}>
                  {done ? '✓' : num}
                </div>
                <span className={cn(
                  'text-sm font-medium',
                  active ? 'text-gray-900' : 'text-gray-400'
                )}>{label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={cn(
                  'flex-1 h-px mx-3',
                  done ? 'bg-blue-600' : 'bg-gray-200'
                )} />
              )}
            </div>
          )
        })}
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        {children}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          disabled={step === 1}
          className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Geri
        </button>
        {step < 3 ? (
          <button
            onClick={onNext}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            İleri
          </button>
        ) : (
          <button
            onClick={onSubmit}
            className="px-5 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            Sınavı Oluştur
          </button>
        )}
      </div>
    </div>
  )
}
