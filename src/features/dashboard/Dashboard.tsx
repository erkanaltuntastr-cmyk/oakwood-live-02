import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/state/store'
import { Avatar } from '@/components/Avatar'
import { useLang } from '@/lib/useLang'
import { cn } from '@/lib/utils'
import { BookOpen, Calendar, ChevronRight, Clock } from 'lucide-react'

const AGENDA_ITEMS = [
  { id: 1, child: 'Amelia', type: 'quiz', subject: 'Mathematics', date: 'Tomorrow' },
  { id: 2, child: 'Oliver', type: 'hw',   subject: 'English',     date: 'Friday' },
  { id: 3, child: 'Amelia', type: 'quiz', subject: 'Science',     date: 'Monday' },
]

function ParentBadge({ profile }: { profile: { id: string; name: string; surname?: string; initials?: string; color?: string } }) {
  const { t } = useLang()
  return (
    <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-border bg-card shadow-card">
      <Avatar profile={profile} size="md" />
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

  function handleSelect() { setActiveChild(childId); navigate('/app/dashboard') }

  return (
    <div className={cn('rounded-2xl border bg-card transition-all duration-150',
      isActive ? 'border-primary shadow-card-md' : 'border-border hover:border-primary/30 hover:shadow-card')}>
      <button onClick={handleSelect} className="w-full flex items-center justify-between px-4 py-3.5 group">
        <div className="flex items-center gap-3">
          <Avatar profile={child} size="lg" />
          <div className="text-left">
            <p className="font-semibold text-foreground">{child.name} {child.surname}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{child.yearGroup} {child.school ? `· ${child.school}` : ''}</p>
            {isActive && <span className="text-xs text-primary font-medium">{t('hub.selected')}</span>}
          </div>
        </div>
        <ChevronRight className={cn('w-4 h-4 transition-colors shrink-0', isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground')} />
      </button>

      {subjects.length > 0 && (
        <div className="px-4 pb-4 border-t border-border/60">
          <p className="text-xs text-muted-foreground mt-2.5 mb-2 uppercase tracking-wider font-medium">{t('hub.activeSubjects')}</p>
          <div className="flex flex-col gap-1">
            {subjects.map((s) => (
              <div key={s} className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="w-3 h-3 shrink-0" /> {s}
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
          <div className="flex flex-wrap gap-3">
            {parents.map((p) => <ParentBadge key={p.id} profile={p} />)}
          </div>
        </div>
        <div className="flex items-center pl-8"><div className="w-px h-6 bg-border" /></div>
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">{t('hub.learners')}</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
