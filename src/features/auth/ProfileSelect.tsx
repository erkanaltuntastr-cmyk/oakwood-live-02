import { useNavigate } from 'react-router-dom'
import { useAppStore, type Profile } from '@/state/store'
import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react'

function ProfileCard({ profile, onClick }: { profile: Profile; onClick: () => void }) {
  const isParent = profile.role === 'parent'
  return (
    <button
      onClick={onClick}
      className={cn(
        'group flex flex-col items-center gap-4 p-6 rounded-2xl border transition-all duration-200',
        'hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-ring',
        isParent
          ? 'border-primary/20 bg-primary/5 hover:bg-primary/10 hover:border-primary/40'
          : 'border-orange-200 bg-orange-50/50 hover:bg-orange-50 hover:border-orange-300'
      )}
    >
      <div className="text-6xl select-none">{profile.avatar}</div>
      <div className="text-center">
        <p className="font-semibold text-foreground text-lg">{profile.name}</p>
        <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
          {isParent ? 'Veli' : 'Çocuk'}
        </p>
      </div>
    </button>
  )
}

function AddCard({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-4 p-6 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-500 hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring"
    >
      <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
        <Plus className="w-6 h-6" />
      </div>
      <p className="text-sm font-medium">{label}</p>
    </button>
  )
}

export function ProfileSelect() {
  const { profiles } = useAppStore()
  const navigate = useNavigate()

  const parents = profiles.filter((p) => p.role === 'parent')
  const children = profiles.filter((p) => p.role === 'child')

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Oakwood</h1>
        <p className="text-muted-foreground mt-2">Kim giriyorsun?</p>
      </div>

      {/* Parents */}
      <div className="mb-10 w-full max-w-2xl">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-4 text-center">
          Veliler
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {parents.map((p) => (
            <ProfileCard key={p.id} profile={p} onClick={() => navigate(`/pin/${p.id}`)} />
          ))}
          <AddCard label="Veli Ekle" onClick={() => navigate('/register/parent')} />
        </div>
      </div>

      {/* Children */}
      <div className="w-full max-w-2xl">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-4 text-center">
          Çocuklar
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {children.map((p) => (
            <ProfileCard key={p.id} profile={p} onClick={() => navigate(`/pin/${p.id}`)} />
          ))}
          <AddCard label="Çocuk Ekle" onClick={() => navigate('/register/child')} />
        </div>
      </div>
    </div>
  )
}
