import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/state/store'
import { Avatar } from '@/components/Avatar'
import { cn } from '@/lib/utils'
import { ArrowLeft, UserPlus } from 'lucide-react'
import type { Profile } from '@/types'

// ── Profile card ─────────────────────────────────────────────────────────────
function ProfileCard({ profile, onClick }: { profile: Profile; onClick: () => void }) {
  const isParent = profile.role === 'parent'
  return (
    <button
      onClick={onClick}
      className={cn(
        'group flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all duration-200',
        'hover:scale-[1.03] hover:shadow-card-md focus:outline-none focus:ring-2 focus:ring-ring',
        isParent
          ? 'border-border hover:border-primary/50 bg-card'
          : 'border-border hover:border-primary/30 bg-card'
      )}
    >
      <Avatar profile={profile} size="lg" />
      <div className="text-center">
        <p className="font-semibold text-foreground text-sm leading-tight">{profile.name}</p>
        {profile.surname && <p className="text-xs text-muted-foreground">{profile.surname}</p>}
        <p className="text-xs text-muted-foreground mt-1 font-medium">
          {isParent ? 'Veli' : profile.yearGroup ?? 'Çocuk'}
        </p>
      </div>
    </button>
  )
}

// ── Empty state ───────────────────────────────────────────────────────────────
function EmptyState() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12 max-w-xs mx-auto text-center">
      <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center">
        <UserPlus className="w-8 h-8 text-primary" />
      </div>
      <div>
        <p className="font-semibold text-foreground">Henüz profil yok</p>
        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
          İlk olarak bir veli profili oluştur. Sonra çocuk profilleri ekleyebilirsin.
        </p>
      </div>
      <div className="w-full space-y-3">
        <button
          onClick={() => navigate('/register/parent')}
          className="w-full oak-btn-primary h-12 text-sm"
        >
          Veli Profili Oluştur
        </button>
        <button
          onClick={() => navigate('/')}
          className="w-full oak-btn-ghost h-10 text-sm"
        >
          Geri Dön
        </button>
      </div>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export function ProfileSelect() {
  const { profiles } = useAppStore()
  const navigate = useNavigate()

  const parents  = profiles.filter((p) => p.role === 'parent')
  const children = profiles.filter((p) => p.role === 'child')
  const hasProfiles = profiles.length > 0

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-border">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Geri
        </button>
        <h1 className="font-display font-semibold italic text-foreground text-lg">Oakwood</h1>
        <div className="w-16" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8">
        {!hasProfiles ? (
          <EmptyState />
        ) : (
          <div className="w-full max-w-2xl space-y-10">
            <p className="text-center text-sm text-muted-foreground">Kim giriyorsun?</p>

            {/* Parents */}
            {parents.length > 0 && (
              <section>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 text-center">
                  Veliler
                </p>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {parents.map((p) => (
                    <ProfileCard key={p.id} profile={p} onClick={() => navigate(`/pin/${p.id}`)} />
                  ))}
                </div>
              </section>
            )}

            {/* Children */}
            {children.length > 0 && (
              <section>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 text-center">
                  Çocuklar
                </p>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {children.map((p) => (
                    <ProfileCard key={p.id} profile={p} onClick={() => navigate(`/pin/${p.id}`)} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
