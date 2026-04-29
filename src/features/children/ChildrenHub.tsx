import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/state/store'
import { Avatar } from '@/components/Avatar'
import { useLang } from '@/lib/useLang'
import { TrendingUp, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { OakwoodAssetIcon } from '@/components/brand/OakwoodAssetIcon'

const MOCK_SUMMARY: Record<string, { quizzes: number; homework: number; avg: number }> = {
  c1: { quizzes: 4, homework: 2, avg: 85 },
  c2: { quizzes: 2, homework: 3, avg: 72 },
}

function ChildCard({ childId, isActive, onSelect }: { childId: string; isActive: boolean; onSelect: () => void }) {
  const { profiles } = useAppStore()
  const { t } = useLang()
  const child = profiles.find((p) => p.id === childId)
  if (!child) return null

  const summary = MOCK_SUMMARY[childId] ?? { quizzes: 0, homework: 0, avg: 0 }
  const avgColor = summary.avg >= 85 ? 'text-green-600' : summary.avg >= 70 ? 'text-amber-600' : 'text-red-500'

  return (
    <button onClick={onSelect}
      className={cn('group w-full rounded-3xl border p-6 text-center transition-all duration-150 hover:shadow-card-md',
        isActive ? 'border-primary bg-accent/20 shadow-card' : 'border-border bg-card hover:border-primary/40')}>
      <div className="relative flex flex-col items-center">
        <Avatar profile={child} size="xl" />
        <div className="mt-4">
            <p className="font-semibold text-foreground text-base">{child.name} {child.surname}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{child.yearGroup} {child.school ? `· ${child.school}` : ''}</p>
            {isActive && <span className="text-xs text-primary font-medium">{t('children.selected')}</span>}
        </div>
        <ChevronRight className={cn('absolute right-0 top-0 h-4 w-4 transition-colors', isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground')} />
      </div>
      <div className="mt-5 flex flex-wrap justify-center gap-3">
        <div className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
          <OakwoodAssetIcon type="quiz" className="w-4 h-4" size={16} alt="Quiz icon" />
          <span>{t('children.assessments', { n: summary.quizzes })}</span>
        </div>
        <div className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
          <OakwoodAssetIcon type="homework" className="w-4 h-4" size={16} alt="Homework icon" />
          <span>{t('children.assignments', { n: summary.homework })}</span>
        </div>
        <div className={cn('flex items-center justify-center gap-1.5 text-sm font-medium', avgColor)}>
          <TrendingUp className="w-3.5 h-3.5" />
          <span>{t('children.average', { n: summary.avg })}</span>
        </div>
      </div>
    </button>
  )
}

export function ChildrenHub() {
  const { profiles, activeProfileId, activeChildId, setActiveChild } = useAppStore()
  const navigate = useNavigate()
  const { t } = useLang()

  const parent   = profiles.find((p) => p.id === activeProfileId)
  const childIds = parent?.childIds ?? []

  function handleSelect(childId: string) { setActiveChild(childId); navigate(`/app/learner/${childId}`) }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-display font-semibold text-foreground italic">{t('children.title')}</h1>
        <p className="text-muted-foreground mt-1 text-sm">{t('children.subtitle')}</p>
      </div>
      {childIds.length === 0 ? (
        <div className="oak-card p-10 text-center text-muted-foreground text-sm">{t('children.empty')}</div>
      ) : (
        <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
          {childIds.map((id) => (
            <ChildCard key={id} childId={id} isActive={id === activeChildId} onSelect={() => handleSelect(id)} />
          ))}
        </div>
      )}
    </div>
  )
}
