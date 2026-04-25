import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/state/store'
import { Avatar } from '@/components/Avatar'
import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react'
import type { Profile } from '@/types'

function ProfileCard({ profile, onClick }: { profile: Profile; onClick: () => void }) {
  const isParent = profile.role === 'parent'
  return (
    <button
      onClick={onClick}
      className={cn(
        'group flex flex-col items-center gap-3 p-6 rounded-2xl border transition-all duration-200',
        'hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring',
        isParent
          ? 'border-border bg-card hover:border-primary/30 hover:bg-accent/30'
          : 'border-border bg-card hover:border-rose-300 hover:bg-rose-50/40'
      )}
    >
      <Avatar profile={profile} size="xl" />
      <div className="text-center">
        <p className="font-semibold text-foreground">{profile.name}</p>
        {profile.surname && (
          <p className="text-xs text-muted-foreground">{profile.surname}</p>
        )}
        <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
          {isParent ? 'Veli' : profile.yearGroup ?? 'Çocuk'}
        </p>
      </div>
    </button>
  )
}

function AddCard({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-dashed border-border text-muted-foreground hover:border-primary/30 hover:text-foreground hover:bg-muted/50 transition-all duration-200 focus:outline-none"
    >
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
        <Plus className="w-6 h-6" />
      </div>
      <p className="text-sm font-medium">{label}</p>
    </button>
  )
}

export function ProfileSelect() {
  const { profiles } = useAppStore()
  const navigate = useNavigate()

  const parents  = profiles.filter((p) => p.role === 'parent')
  const children = profiles.filter((p) => p.role === 'child')

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-display font-semibold italic text-foreground tracking-tight">Oakwood</h1>
        <p className="text-muted-foreground mt-2 text-sm">Kim giriyorsun?</p>
      </div>

      <div className="w-full max-w-2xl space-y-10">
        <section>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4 text-center">Veliler</p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {parents.map((p) => (
              <ProfileCard key={p.id} profile={p} onClick={() => navigate(`/pin/${p.id}`)} />
            ))}
            <AddCard label="Veli Ekle" onClick={() => navigate('/register/parent')} />
          </div>
        </section>

        <section>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4 text-center">Çocuklar</p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {children.map((p) => (
              <ProfileCard key={p.id} profile={p} onClick={() => navigate(`/pin/${p.id}`)} />
            ))}
            <AddCard label="Çocuk Ekle" onClick={() => navigate('/register/child')} />
          </div>
        </section>
      </div>
    </div>
  )
}
