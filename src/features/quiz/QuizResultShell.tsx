import { cn } from '@/lib/utils'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'
import type { Report } from '@/types'

interface QuizResultShellProps {
  score: number
  correct: string[]
  wrong: string[]
  onRetry: () => void
  onAiSuggest: () => void
  aiLoading: boolean
  aiText?: string | null
  report?: Report
}

export function QuizResultShell({ score, correct, wrong, onRetry, onAiSuggest, aiLoading, aiText, report }: QuizResultShellProps) {
  const color = score >= 80 ? 'text-green-600' : score >= 60 ? 'text-amber-500' : 'text-red-500'
  const ring = score >= 80 ? 'border-green-400' : score >= 60 ? 'border-amber-400' : 'border-red-400'

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Sınav Sonucu</h1>

      <div className="flex gap-6">
        {/* Left: results */}
        <div className="flex-1 space-y-6">
          {/* Score circle */}
          <div className="flex justify-center">
            <div className={cn('w-32 h-32 rounded-full border-8 flex items-center justify-center', ring)}>
              <span className={cn('text-3xl font-bold', color)}>%{score}</span>
            </div>
          </div>

          {/* Correct / Wrong */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-green-200 bg-green-50 p-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm font-semibold text-green-700">Doğrular ({correct.length})</span>
              </div>
              <ul className="space-y-1">
                {correct.map((s) => (
                  <li key={s} className="text-sm text-green-800">{s}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-red-200 bg-red-50 p-4">
              <div className="flex items-center gap-2 mb-3">
                <XCircle className="w-4 h-4 text-red-500" />
                <span className="text-sm font-semibold text-red-700">Yanlışlar ({wrong.length})</span>
              </div>
              <ul className="space-y-1">
                {wrong.map((s) => (
                  <li key={s} className="text-sm text-red-800">{s}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Report notes */}
          {report && (
            <div className="oak-card p-4 space-y-2 text-sm">
              {report.strengths.map((s) => <p key={s} className="text-green-700">✓ {s}</p>)}
              {report.critical.map((s) => <p key={s} className="text-amber-700">⚠ {s}</p>)}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3">
            <button onClick={onRetry} className="flex-1 oak-btn-ghost">
              Tekrar Dene
            </button>
            <button
              onClick={onAiSuggest}
              disabled={aiLoading || !!aiText}
              className="flex-1 oak-btn-primary disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {aiLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {aiText ? 'Öneri Alındı' : 'AI Önerisi Al'}
            </button>
          </div>
        </div>

        {/* Right: AI panel */}
        <div className="w-64 shrink-0 oak-card p-4 flex flex-col">
          <p className="text-sm font-display font-semibold text-foreground mb-3 italic">AI Önerisi</p>
          {aiLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : aiText ? (
            <p className="text-sm text-foreground leading-relaxed">{aiText}</p>
          ) : (
            <div className="flex-1 flex items-center justify-center text-xs text-muted-foreground text-center px-2">
              "AI Önerisi Al" butonuna bas
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
