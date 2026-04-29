import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/state/store'
import { Avatar } from '@/components/Avatar'
import { useLang } from '@/lib/useLang'
import { cn } from '@/lib/utils'
import { Calendar, ChevronRight, Clock } from 'lucide-react'
import { OakwoodAssetIcon } from '@/components/brand/OakwoodAssetIcon'
import type { Profile } from '@/types'

const AGENDA_ITEMS = [
  { id: 1, child: 'Amelia', type: 'quiz', subject: 'Mathematics', date: 'Tomorrow' },
  { id: 2, child: 'Oliver', type: 'hw',   subject: 'English',     date: 'Friday' },
  { id: 3, child: 'Amelia', type: 'quiz', subject: 'Science',     date: 'Monday' },
]

function ParentBadge({ profile }: { profile: Profile }) {
  const { t } = useLang()
  return (
    <div className="flex min-h-40 w-full min-w-56 flex-col items-center justify-center gap-3 rounded-3xl border border-border bg-card px-5 py-5 text-center shadow-card">
      <Avatar profile={profile} size="lg" />
      <div>
        <p className="text-sm font-semibold text-foreground">{profile.name} {profile.surname}</p>
        <p className="text-xs text-muted-foreground">{t('common.parent')}</p>
      </div>
    </div>
  )
}

function ChildCard({ childId }: { childId: string }) {
  const { profiles, activeChildId, setActiveChild } = useAppStore()
  const navigate = useNavigate()
  const { t } = useLang()
  const child = profiles.find((p) => p.id === childId)
  if (!child) return null

  const subjects = child.subjects?.filter((s) => s.active).map((s) => s.name) ?? []
  const isActive = childId === activeChildId

  function handleSelect() { setActiveChild(childId); navigate(`/app/learner/${childId}`) }

  return (
    <div className={cn('rounded-3xl border bg-card transition-all duration-150',
      isActive ? 'border-primary shadow-card-md' : 'border-border hover:border-primary/30 hover:shadow-card')}>
      <button onClick={handleSelect} className="group relative flex w-full flex-col items-center justify-center px-5 py-6 text-center">
        <Avatar profile={child} size="xl" />
        <div className="mt-4">
            <p className="font-semibold text-foreground">{child.name} {child.surname}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{child.yearGroup} {child.school ? `· ${child.school}` : ''}</p>
            {isActive && <span className="text-xs text-primary font-medium">{t('hub.selected')}</span>}
        </div>
        <ChevronRight className={cn('absolute right-5 top-5 h-4 w-4 transition-colors', isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground')} />
      </button>

      {subjects.length > 0 && (
        <div className="border-t border-border/60 px-4 pb-5 text-center">
          <p className="text-xs text-muted-foreground mt-2.5 mb-2 uppercase tracking-wider font-medium">{t('hub.activeSubjects')}</p>
          <div className="flex flex-col items-center gap-1">
            {subjects.map((s) => (
              <div key={s} className="flex items-center gap-2 text-sm text-muted-foreground">
                <OakwoodAssetIcon type="lessons" className="w-3.5 h-3.5 shrink-0" size={14} alt="Lessons icon" /> {s}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function Dashboard() {
  const { profiles, activeProfileId, activeChildId } = useAppStore()
  const { t } = useLang()
  const profile = profiles.find((p) => p.id === activeProfileId)
  const isParent = profile?.role === 'parent'

  if (!isParent) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-display font-semibold text-foreground">Hello, {profile?.name}!</h1>
        <p className="text-muted-foreground text-sm">Your assignments for today will appear here.</p>
      </div>
    )
  }

  const parents  = profiles.filter((p) => p.role === 'parent')
  const childIds = profile?.childIds ?? []

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-display font-semibold text-foreground italic">{t('hub.title')}</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          {activeChildId ? t('hub.subtitle.active') : t('hub.subtitle.none')}
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">{t('hub.parents')}</p>
          <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
            {parents.map((p) => <ParentBadge key={p.id} profile={p} />)}
          </div>
        </div>
        <div className="flex items-center pl-8"><div className="w-px h-6 bg-border" /></div>
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">{t('hub.learners')}</p>
          <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
            {childIds.map((id) => <ChildCard key={id} childId={id} />)}
          </div>
        </div>
      </div>

      {/* Family Agenda */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <h2 className="font-semibold text-foreground">{t('hub.agenda')}</h2>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{t('hub.agendaSoon')}</span>
        </div>
        <div className="oak-card divide-y divide-border">
          {AGENDA_ITEMS.map((item) => (
            <div key={item.id} className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <div className={cn('w-1.5 h-1.5 rounded-full shrink-0', item.type === 'quiz' ? 'bg-primary' : 'bg-amber-400')} />
                <span className="text-sm font-medium text-foreground">{item.child}</span>
                <span className="text-sm text-muted-foreground">— {item.type === 'quiz' ? 'Assessment' : 'Assignment'}: {item.subject}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" /> {item.date}
              </div>
            </div>
          ))}
          <div className="px-4 py-3 text-xs text-muted-foreground text-center">{t('hub.agendaNote')}</div>
        </div>
      </div>
    </div>
  )
}
