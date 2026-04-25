import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/state/store'
import { cn } from '@/lib/utils'
import { BookOpen, Calendar, ChevronRight, Clock } from 'lucide-react'

// Mock subjects per child — replaced by real curriculum data in Faz 1
const CHILD_SUBJECTS: Record<string, string[]> = {
  c1: ['Matematik', 'İngilizce', 'Fen Bilimleri', 'Türkçe'],
  c2: ['Matematik', 'Türkçe', 'Müzik'],
  c3: ['Matematik', 'İngilizce', 'Fen Bilimleri', 'Tarih', 'Coğrafya'],
}

// Mock agenda items — replaced by real homework/quiz data in Faz 1
const AGENDA_ITEMS = [
  { id: 1, child: 'Ali', type: 'Sınav', subject: 'Matematik', date: 'Yarın' },
  { id: 2, child: 'Ayşe', type: 'Ödev', subject: 'Türkçe', date: 'Cuma' },
  { id: 3, child: 'Can', type: 'Sınav', subject: 'İngilizce', date: 'Pazartesi' },
  { id: 4, child: 'Ali', type: 'Ödev', subject: 'Fen Bilimleri', date: 'Çarşamba' },
]

function ParentBadge({ name, avatar }: { name: string; avatar: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card shadow-sm">
      <span className="text-2xl">{avatar}</span>
      <div>
        <p className="text-sm font-semibold text-foreground">{name}</p>
        <p className="text-xs text-muted-foreground">Veli</p>
      </div>
    </div>
  )
}

function ChildCard({ childId }: { childId: string }) {
  const { profiles, activeChildId, setActiveChild } = useAppStore()
  const navigate = useNavigate()
  const child = profiles.find((p) => p.id === childId)
  if (!child) return null

  const subjects = CHILD_SUBJECTS[childId] ?? []
  const isActive = childId === activeChildId

  function handleSelect() {
    setActiveChild(childId)
    navigate('/app/dashboard')
  }

  return (
    <div
      className={cn(
        'rounded-xl border bg-card transition-all duration-150',
        isActive ? 'border-primary shadow-sm' : 'border-border hover:border-primary/40 hover:shadow-sm'
      )}
    >
      {/* Child header */}
      <button
        onClick={handleSelect}
        className="w-full flex items-center justify-between px-4 py-3 group"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl">{child.avatar}</span>
          <div className="text-left">
            <p className="font-semibold text-foreground">{child.name}</p>
            {isActive && (
              <span className="text-xs text-primary font-medium">Aktif</span>
            )}
          </div>
        </div>
        <ChevronRight className={cn(
          'w-4 h-4 transition-colors',
          isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
        )} />
      </button>

      {/* Subjects */}
      {subjects.length > 0 && (
        <div className="px-4 pb-3 border-t border-border/60">
          <p className="text-xs text-muted-foreground mt-2 mb-1.5 uppercase tracking-wider font-medium">Dersler</p>
          <div className="flex flex-col gap-1">
            {subjects.map((subject) => (
              <button
                key={subject}
                onClick={() => { handleSelect() }}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-0.5 text-left"
              >
                <BookOpen className="w-3 h-3 shrink-0" />
                {subject}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function Dashboard() {
  const { profiles, activeProfileId, activeChildId } = useAppStore()
  const profile = profiles.find((p) => p.id === activeProfileId)
  const isParent = profile?.role === 'parent'

  // For child role — simple placeholder
  if (!isParent) {
    const child = profiles.find((p) => p.id === activeProfileId)
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-foreground">
          Merhaba, {child?.name} {child?.avatar}
        </h1>
        <p className="text-muted-foreground text-sm">Bugünkü görevlerin burada görünecek.</p>
      </div>
    )
  }

  const parents = profiles.filter((p) => p.role === 'parent')
  const childIds = profile?.childIds ?? []

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Aile Merkezi</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          {activeChildId
            ? 'Bir çocuk seçili — sol menüden detaylara geçebilirsin.'
            : 'Bir çocuğu seçerek başla.'}
        </p>
      </div>

      {/* Family tree */}
      <div className="space-y-4">
        {/* Parents row */}
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">Veliler</p>
          <div className="flex flex-wrap gap-3">
            {parents.map((p) => (
              <ParentBadge key={p.id} name={p.name} avatar={p.avatar} />
            ))}
          </div>
        </div>

        {/* Connector line */}
        <div className="flex items-center gap-2 text-muted-foreground/40 select-none pl-6">
          <div className="w-px h-6 bg-border ml-2" />
        </div>

        {/* Children grid */}
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">Çocuklar</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {childIds.map((id) => (
              <ChildCard key={id} childId={id} />
            ))}
          </div>
        </div>
      </div>

      {/* Family Agenda — placeholder */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <h2 className="font-semibold text-foreground">Aile Ajandası</h2>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">Yakında</span>
        </div>

        <div className="rounded-xl border border-border bg-card divide-y divide-border">
          {AGENDA_ITEMS.map((item) => (
            <div key={item.id} className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <div className={cn(
                  'w-1.5 h-1.5 rounded-full',
                  item.type === 'Sınav' ? 'bg-violet-500' : 'bg-amber-500'
                )} />
                <div>
                  <span className="text-sm font-medium text-foreground">{item.child}</span>
                  <span className="text-sm text-muted-foreground"> — {item.type}: {item.subject}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {item.date}
              </div>
            </div>
          ))}
          <div className="px-4 py-3 text-xs text-muted-foreground text-center">
            Gerçek veriler Faz 1'de bağlanacak
          </div>
        </div>
      </div>
    </div>
  )
}
