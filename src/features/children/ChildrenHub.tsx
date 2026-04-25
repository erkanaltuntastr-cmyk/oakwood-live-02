import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/state/store'
import { ClipboardList, FileText, TrendingUp, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mock summary per child — will be replaced by real data in Faz 1
const MOCK_SUMMARY: Record<string, { quizzes: number; homework: number; avg: number }> = {
  c1: { quizzes: 4, homework: 2, avg: 85 },
  c2: { quizzes: 2, homework: 3, avg: 72 },
  c3: { quizzes: 6, homework: 1, avg: 91 },
}

function ChildCard({
  childId,
  isActive,
  onSelect,
}: {
  childId: string
  isActive: boolean
  onSelect: () => void
}) {
  const { profiles } = useAppStore()
  const child = profiles.find((p) => p.id === childId)
  if (!child) return null

  const summary = MOCK_SUMMARY[childId] ?? { quizzes: 0, homework: 0, avg: 0 }
  const avgColor =
    summary.avg >= 85 ? 'text-green-600' : summary.avg >= 70 ? 'text-amber-600' : 'text-red-500'

  return (
    <button
      onClick={onSelect}
      className={cn(
        'w-full text-left rounded-xl border p-5 transition-all duration-150 hover:shadow-md group',
        isActive
          ? 'border-primary bg-primary/5 shadow-sm'
          : 'border-border bg-card hover:border-primary/40'
      )}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Avatar + name */}
        <div className="flex items-center gap-3">
          <div className={cn(
            'w-12 h-12 rounded-full flex items-center justify-center text-2xl shrink-0 border',
            isActive ? 'border-primary/30 bg-primary/10' : 'border-border bg-muted'
          )}>
            {child.avatar}
          </div>
          <div>
            <p className="font-semibold text-foreground text-base">{child.name}</p>
            {isActive && (
              <span className="text-xs text-primary font-medium">Seçili</span>
            )}
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground mt-1 group-hover:text-foreground transition-colors shrink-0" />
      </div>

      {/* Stats */}
      <div className="mt-4 flex gap-4">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <ClipboardList className="w-3.5 h-3.5" />
          <span>{summary.quizzes} sınav</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <FileText className="w-3.5 h-3.5" />
          <span>{summary.homework} ödev</span>
        </div>
        <div className={cn('flex items-center gap-1.5 text-sm font-medium', avgColor)}>
          <TrendingUp className="w-3.5 h-3.5" />
          <span>%{summary.avg}</span>
        </div>
      </div>
    </button>
  )
}

export function ChildrenHub() {
  const { profiles, activeProfileId, activeChildId, setActiveChild } = useAppStore()
  const navigate = useNavigate()

  const parent = profiles.find((p) => p.id === activeProfileId)
  const childIds = parent?.childIds ?? []

  function handleSelect(childId: string) {
    setActiveChild(childId)
    navigate('/app/dashboard')
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Aile</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Bir çocuk seç — dersler, sınavlar ve ödevler o çocuk için gösterilecek.
        </p>
      </div>

      {childIds.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground text-sm">
          Henüz çocuk eklenmemiş.
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {childIds.map((id) => (
            <ChildCard
              key={id}
              childId={id}
              isActive={id === activeChildId}
              onSelect={() => handleSelect(id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
