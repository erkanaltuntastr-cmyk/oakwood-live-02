import { useAppStore } from '@/state/store'
import { buildReport } from '@/lib/quizService'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, Minus, ClipboardList, CheckCircle2, XCircle } from 'lucide-react'

function ScoreRing({ score }: { score: number }) {
  const color = score >= 80 ? 'text-green-600 border-green-400' : score >= 60 ? 'text-amber-500 border-amber-400' : 'text-red-500 border-red-400'
  return (
    <div className={cn('w-14 h-14 rounded-full border-4 flex items-center justify-center shrink-0', color)}>
      <span className="text-sm font-bold">{score}%</span>
    </div>
  )
}

function TrendIcon({ delta }: { delta: number }) {
  if (delta > 0) return <TrendingUp className="w-4 h-4 text-green-600" />
  if (delta < 0) return <TrendingDown className="w-4 h-4 text-red-500" />
  return <Minus className="w-4 h-4 text-muted-foreground" />
}

export function Reports() {
  const { quizSessions, activeChildId } = useAppStore()

  if (!activeChildId) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-2 text-muted-foreground">
        <p className="text-lg font-display italic">Raporlar</p>
        <p className="text-sm">Önce Aile Merkezi'nden bir çocuk seç.</p>
      </div>
    )
  }

  const sessions = quizSessions
    .filter((s) => s.childId === activeChildId && s.status === 'completed' && s.score !== undefined)
    .sort((a, b) => new Date(b.completedAt ?? b.assignedAt).getTime() - new Date(a.completedAt ?? a.assignedAt).getTime())

  // Summary stats
  const total   = sessions.length
  const avg     = total ? Math.round(sessions.reduce((s, q) => s + (q.score ?? 0), 0) / total) : 0
  const best    = total ? Math.max(...sessions.map((s) => s.score ?? 0)) : 0
  const recent5 = sessions.slice(0, 5).map((s) => s.score ?? 0)
  const trend   = recent5.length >= 2 ? recent5[0] - recent5[1] : 0

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-display font-semibold text-foreground italic">Raporlar</h1>
        <p className="text-muted-foreground mt-1 text-sm">Tamamlanan sınavların özeti ve değerlendirme.</p>
      </div>

      {total === 0 ? (
        <div className="oak-card p-10 text-center text-muted-foreground text-sm">
          Henüz tamamlanmış sınav yok.
        </div>
      ) : (
        <>
          {/* Summary */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Toplam Sınav', value: total },
              { label: 'Ortalama', value: `${avg}%` },
              { label: 'En Yüksek', value: `${best}%` },
            ].map(({ label, value }) => (
              <div key={label} className="oak-card p-4 text-center">
                <p className="text-2xl font-bold text-foreground">{value}</p>
                <p className="text-xs text-muted-foreground mt-1">{label}</p>
              </div>
            ))}
          </div>

          {/* Trend */}
          {recent5.length >= 2 && (
            <div className="oak-card p-4 flex items-center gap-3">
              <TrendIcon delta={trend} />
              <p className="text-sm text-foreground">
                Son 2 sınav karşılaştırması:{' '}
                <span className={cn('font-semibold', trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-500' : 'text-muted-foreground')}>
                  {trend > 0 ? `+${trend}` : trend}%
                </span>
              </p>
            </div>
          )}

          {/* Session list */}
          <section className="space-y-3">
            <h2 className="text-sm font-semibold text-foreground">Sınav Geçmişi</h2>
            {sessions.map((session) => {
              const report = session.report ?? buildReport(session.score ?? 0)
              const correct = session.answers.filter((a) => a?.correct).length
              const date = session.completedAt
                ? new Date(session.completedAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })
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
                      {session.topics.length > 0 && (
                        <p className="text-xs text-muted-foreground mb-2">{session.topics.join(', ')}</p>
                      )}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                          {correct} doğru
                        </span>
                        <span className="flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5 text-red-400" />
                          {session.questions.length - correct} yanlış
                        </span>
                        <span className="flex items-center gap-1">
                          <ClipboardList className="w-3.5 h-3.5" />
                          {session.questions.length} soru
                        </span>
                      </div>
                      {/* Report bullets */}
                      <div className="space-y-1">
                        {report.strengths.slice(0, 1).map((s) => (
                          <p key={s} className="text-xs text-green-700">✓ {s}</p>
                        ))}
                        {report.critical.slice(0, 1).map((s) => (
                          <p key={s} className="text-xs text-amber-700">⚠ {s}</p>
                        ))}
                      </div>
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
