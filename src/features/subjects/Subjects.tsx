import { useAppStore } from '@/state/store'
import { SUBJECTS } from '@/lib/quizService'
import { useLang } from '@/lib/useLang'
import { cn } from '@/lib/utils'
import { BookOpen, Plus, X } from 'lucide-react'

export function Subjects() {
  const { profiles, activeChildId, updateProfile } = useAppStore()
  const { t } = useLang()
  const child = profiles.find((p) => p.id === activeChildId)

  if (!activeChildId || !child) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-2 text-muted-foreground">
        <p className="text-lg font-display italic">{t('subjects.title')}</p>
        <p className="text-sm">{t('children.subtitle')}</p>
      </div>
    )
  }

  const childSubjects = child!.subjects ?? []
  const availableToAdd = SUBJECTS.filter((s) => !childSubjects.some((cs) => cs.name === s))

  function toggleSubject(name: string) {
    updateProfile(child!.id, { subjects: childSubjects.map((s) => s.name === name ? { ...s, active: !s.active } : s) })
  }
  function addSubject(name: string) {
    updateProfile(child!.id, { subjects: [...childSubjects, { name, active: true }] })
  }
  function removeSubject(name: string) {
    updateProfile(child!.id, { subjects: childSubjects.filter((s) => s.name !== name) })
  }

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-display font-semibold text-foreground italic">{t('subjects.title')}</h1>
        <p className="text-muted-foreground mt-1 text-sm">{t('subjects.subtitle', { name: child.name })}</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground">{t('subjects.active')}</h2>
        {childSubjects.length === 0 && <div className="oak-card p-6 text-center text-muted-foreground text-sm">{t('subjects.empty')}</div>}
        <div className="grid gap-2">
          {childSubjects.map(({ name, active }) => (
            <div key={name} className={cn('oak-card flex items-center justify-between px-4 py-3 transition-opacity', !active && 'opacity-50')}>
              <div className="flex items-center gap-3">
                <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', active ? 'bg-accent' : 'bg-muted')}>
                  <BookOpen className={cn('w-4 h-4', active ? 'text-primary' : 'text-muted-foreground')} />
                </div>
                <span className="text-sm font-medium text-foreground">{name}</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => toggleSubject(name)}
                  className={cn('w-10 h-6 rounded-full transition-colors relative', active ? 'bg-primary' : 'bg-muted border border-border')}>
                  <div className={cn('absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all', active ? 'left-5' : 'left-1')} />
                </button>
                <button onClick={() => removeSubject(name)}
                  className="p-1 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {availableToAdd.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground">{t('subjects.add')}</h2>
          <div className="flex flex-wrap gap-2">
            {availableToAdd.map((name) => (
              <button key={name} onClick={() => addSubject(name)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-dashed border-border text-sm text-muted-foreground hover:border-primary/40 hover:text-foreground hover:bg-muted transition-colors">
                <Plus className="w-3.5 h-3.5" /> {name}
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
