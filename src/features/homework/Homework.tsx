import { useAppStore } from '@/state/store'
import { useLang } from '@/lib/useLang'
import type { HomeworkItem } from '@/lib/homeworkService'
import { cn } from '@/lib/utils'
import { BookOpen, FlaskConical, AlertTriangle, RotateCcw, CheckCircle2 } from 'lucide-react'

const TYPE_ICONS = {
  memory:  { icon: BookOpen,       color: 'text-violet-600', bg: 'bg-violet-50' },
  formula: { icon: FlaskConical,   color: 'text-blue-600',   bg: 'bg-blue-50'   },
  mistake: { icon: AlertTriangle,  color: 'text-amber-600',  bg: 'bg-amber-50'  },
  review:  { icon: RotateCcw,      color: 'text-rose-600',   bg: 'bg-rose-50'   },
}

function HomeworkCard({ item }: { item: HomeworkItem }) {
  const { completeHomework } = useAppStore()
  const { t } = useLang()
  const cfg = TYPE_ICONS[item.type]
  const Icon = cfg.icon
  const done = item.status === 'completed'

  const typeLabel: Record<HomeworkItem['type'], string> = {
    memory: t('hw.memory'), formula: t('hw.formula'),
    mistake: t('hw.mistake'), review: t('hw.review'),
  }

  return (
    <div className={cn('oak-card p-4 transition-opacity', done && 'opacity-50')}>
      <div className="flex items-start gap-3">
        <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center shrink-0', cfg.bg)}>
          <Icon className={cn('w-4 h-4', cfg.color)} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{typeLabel[item.type]}</p>
            <span className="text-xs text-muted-foreground">{item.subject}</span>
          </div>
          <p className={cn('text-sm text-foreground leading-relaxed', done && 'line-through')}>{item.content}</p>
        </div>
        {!done ? (
          <button onClick={() => completeHomework(item.id)}
            className="shrink-0 w-6 h-6 rounded-full border-2 border-border hover:border-primary hover:bg-accent transition-colors" />
        ) : (
          <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
        )}
      </div>
    </div>
  )
}

export function Homework() {
  const { homework, activeChildId } = useAppStore()
  const { t } = useLang()

  if (!activeChildId) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-2 text-muted-foreground">
        <p className="text-lg font-display italic">{t('hw.title')}</p>
        <p className="text-sm">{t('hw.selectLearner')}</p>
      </div>
    )
  }

  const items     = homework.filter((h) => !activeChildId || h.childId === activeChildId)
  const pending   = items.filter((h) => h.status === 'pending')
  const completed = items.filter((h) => h.status === 'completed')
  const bySubject = pending.reduce<Record<string, HomeworkItem[]>>((acc, item) => {
    if (!acc[item.subject]) acc[item.subject] = []
    acc[item.subject].push(item)
    return acc
  }, {})

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-display font-semibold text-foreground italic">{t('hw.title')}</h1>
        <p className="text-muted-foreground mt-1 text-sm">{t('hw.subtitle')}</p>
      </div>

      {pending.length === 0 && (
        <div className="oak-card p-10 text-center text-muted-foreground text-sm">{t('hw.empty')}</div>
      )}

      {Object.entries(bySubject).map(([subject, subItems]) => (
        <section key={subject} className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground">{subject}</h2>
          {subItems.map((item) => <HomeworkCard key={item.id} item={item} />)}
        </section>
      ))}

      {completed.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground">{t('hw.completed', { n: completed.length })}</h2>
          {completed.map((item) => <HomeworkCard key={item.id} item={item} />)}
        </section>
      )}
    </div>
  )
}
