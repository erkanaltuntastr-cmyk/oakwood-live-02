import { useAppStore } from '@/state/store'
import { useLang } from '@/lib/useLang'
import { buildReport } from '@/lib/quizService'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, Minus, CheckCircle2, XCircle } from 'lucide-react'
import { OakwoodAssetIcon } from '@/components/brand/OakwoodAssetIcon'

function ScoreRing({ score }: { score: number }) {
  const color = score >= 80 ? 'text-green-600 border-green-400' : score >= 60 ? 'text-amber-500 border-amber-400' : 'text-red-500 border-red-400'
  return (
    <div className={cn('w-14 h-14 rounded-full border-4 flex items-center justify-center shrink-0', color)}>
      <span className="text-sm font-bold">{score}%</span>
    </div>
  )
}

export function Reports() {
  const { quizSessions, activeChildId } = useAppStore()
  const { t } = useLang()

  if (!activeChildId) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-2 text-muted-foreground">
        <p className="text-lg font-display italic">{t('reports.title')}</p>
        <p className="text-sm">{t('reports.selectLearner')}</p>
      </div>
    )
  }

  const sessions = quizSessions
    .filter((s) => s.childId === activeChildId && s.status === 'completed' && s.score !== undefined)
    .sort((a, b) => new Date(b.completedAt ?? b.assignedAt).getTime() - new Date(a.completedAt ?? a.assignedAt).getTime())

  const total   = sessions.length
  const avg     = total ? Math.round(sessions.reduce((s, q) => s + (q.score ?? 0), 0) / total) : 0
  const best    = total ? Math.max(...sessions.map((s) => s.score ?? 0)) : 0
  const recent5 = sessions.slice(0, 5).map((s) => s.score ?? 0)
  const delta   = recent5.length >= 2 ? recent5[0] - recent5[1] : 0

  const TrendIcon = delta > 0 ? TrendingUp : delta < 0 ? TrendingDown : Minus
  const trendColor = delta > 0 ? 'text-green-600' : delta < 0 ? 'text-red-500' : 'text-muted-foreground'

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <div className="flex items-center gap-3">
          <OakwoodAssetIcon type="report" className="h-9 w-9" size={36} alt="Report icon" />
          <h1 className="text-2xl font-display font-semibold text-foreground italic">{t('reports.title')}</h1>
        </div>
        <p className="text-muted-foreground mt-1 text-sm">{t('reports.subtitle')}</p>
      </div>

      {total === 0 ? (
        <div className="oak-card p-10 text-center text-muted-foreground text-sm">{t('reports.empty')}</div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: t('reports.total'),   value: total },
              { label: t('reports.average'), value: `${avg}%` },
              { label: t('reports.best'),    value: `${best}%` },
            ].map(({ label, value }) => (
              <div key={label} className="oak-card p-4 text-center">
                <p className="text-2xl font-bold text-foreground">{value}</p>
                <p className="text-xs text-muted-foreground mt-1">{label}</p>
              </div>
            ))}
          </div>

          {recent5.length >= 2 && (
            <div className="oak-card p-4 flex items-center gap-3">
              <TrendIcon className={cn('w-4 h-4', trendColor)} />
              <p className="text-sm text-foreground">
                {t('reports.trend', { delta: delta > 0 ? `+${delta}` : String(delta) })}
              </p>
            </div>
          )}

          <section className="space-y-3">
            <h2 className="text-sm font-semibold text-foreground">{t('reports.history')}</h2>
            {sessions.map((session) => {
              const report  = session.report ?? buildReport(session.score ?? 0)
              const correct = session.answers.filter((a) => a?.correct).length
              const date    = session.completedAt
                ? new Date(session.completedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
                : '—'
              return (
                <div key={session.id} className="oak-card p-4">
                  <div className="flex items-start gap-4">
                    <ScoreRing score={session.score ?? 0} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <p className="font-semibold text-foreground text-sm">{session.subject}</p>
                        <span className="text-xs text-muted-foreground">{date}</span>
                      </div>
                      {session.topics.length > 0 && <p className="text-xs text-muted-foreground mb-2">{session.topics.join(', ')}</p>}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-green-500" />{t('reports.correct', { n: correct })}</span>
                        <span className="flex items-center gap-1"><XCircle className="w-3.5 h-3.5 text-red-400" />{t('reports.wrong', { n: session.questions.length - correct })}</span>
                        <span className="flex items-center gap-1"><OakwoodAssetIcon type="quiz" className="w-4 h-4" size={16} alt="Quiz icon" />{t('reports.questions', { n: session.questions.length })}</span>
                      </div>
                      {report.strengths.slice(0, 1).map((s) => <p key={s} className="text-xs text-green-700">✓ {s}</p>)}
                      {report.critical.slice(0, 1).map((s) => <p key={s} className="text-xs text-amber-700">⚠ {s}</p>)}
                    </div>
                  </div>
                </div>
              )
            })}
          </section>
        </>
      )}
    </div>
  )
}
