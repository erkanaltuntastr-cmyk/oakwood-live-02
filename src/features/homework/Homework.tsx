import { useAppStore } from '@/state/store'
import type { HomeworkItem } from '@/lib/homeworkService'
import { cn } from '@/lib/utils'
import { BookOpen, FlaskConical, AlertTriangle, RotateCcw, CheckCircle2 } from 'lucide-react'

const TYPE_CONFIG = {
  memory:  { icon: BookOpen,       label: 'Hafıza Kartı',    color: 'text-violet-600', bg: 'bg-violet-50' },
  formula: { icon: FlaskConical,   label: 'Formül & Notlar', color: 'text-blue-600',   bg: 'bg-blue-50'   },
  mistake: { icon: AlertTriangle,  label: 'Yaygın Hata',     color: 'text-amber-600',  bg: 'bg-amber-50'  },
  review:  { icon: RotateCcw,      label: 'Tekrar Çalış',    color: 'text-rose-600',   bg: 'bg-rose-50'   },
}

function HomeworkCard({ item }: { item: HomeworkItem }) {
  const { completeHomework } = useAppStore()
  const cfg = TYPE_CONFIG[item.type]
  const Icon = cfg.icon
  const done = item.status === 'completed'

  return (
    <div className={cn('oak-card p-4 transition-opacity', done && 'opacity-50')}>
      <div className="flex items-start gap-3">
        <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center shrink-0', cfg.bg)}>
          <Icon className={cn('w-4 h-4', cfg.color)} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{cfg.label}</p>
            <span className="text-xs text-muted-foreground">{item.subject}</span>
          </div>
          <p className={cn('text-sm text-foreground leading-relaxed', done && 'line-through')}>{item.content}</p>
        </div>
        {!done && (
          <button
            onClick={() => completeHomework(item.id)}
            className="shrink-0 w-6 h-6 rounded-full border-2 border-border hover:border-primary hover:bg-accent transition-colors"
            title="Tamamlandı olarak işaretle"
          />
        )}
        {done && <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />}
      </div>
    </div>
  )
}

export function Homework() {
  const { homework, activeChildId } = useAppStore()

  const items = homework.filter((h) => !activeChildId || h.childId === activeChildId)
  const pending   = items.filter((h) => h.status === 'pending')
  const completed = items.filter((h) => h.status === 'completed')

  // Group pending by subject
  const bySubject = pending.reduce<Record<string, HomeworkItem[]>>((acc, item) => {
    if (!acc[item.subject]) acc[item.subject] = []
    acc[item.subject].push(item)
    return acc
  }, {})

  if (!activeChildId) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-2 text-muted-foreground">
        <p className="text-lg font-display italic">Ödevler</p>
        <p className="text-sm">Önce Aile Merkezi'nden bir çocuk seç.</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-display font-semibold text-foreground italic">Ödevler</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Sınav sonrası otomatik oluşturulan çalışma notları.
        </p>
      </div>

      {pending.length === 0 && (
        <div className="oak-card p-10 text-center text-muted-foreground text-sm">
          Bekleyen ödev yok. Bir sınav tamamlanınca otomatik oluşturulur.
        </div>
      )}

      {Object.entries(bySubject).map(([subject, subItems]) => (
        <section key={subject} className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground">{subject}</h2>
          {subItems.map((item) => <HomeworkCard key={item.id} item={item} />)}
        </section>
      ))}

      {completed.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground">Tamamlananlar ({completed.length})</h2>
          {completed.map((item) => <HomeworkCard key={item.id} item={item} />)}
        </section>
      )}
    </div>
  )
}
