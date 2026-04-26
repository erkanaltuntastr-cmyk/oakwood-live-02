import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/state/store'
import { Avatar } from '@/components/Avatar'
import { ArrowLeft, UserPlus } from 'lucide-react'
import type { Profile } from '@/types'

function ProfileCard({ profile, onClick }: { profile: Profile; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-white border border-[#EAE4D9] shadow-sm hover:shadow-md hover:border-primary/40 hover:scale-[1.04] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30"
    >
      <Avatar profile={profile} size="xl" />
      <div className="text-center">
        <p className="font-semibold text-[#2D2926] text-base leading-tight">{profile.name}</p>
        {profile.surname && (
          <p className="text-sm text-[#7C766C] leading-tight">{profile.surname}</p>
        )}
        <p className="text-xs font-medium text-primary mt-1.5 uppercase tracking-wide">
          {profile.role === 'parent' ? 'Veli' : profile.yearGroup ?? 'Çocuk'}
        </p>
      </div>
    </button>
  )
}

function EmptyState() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center gap-6 py-16 text-center max-w-xs mx-auto">
      <div className="w-20 h-20 rounded-3xl bg-accent flex items-center justify-center">
        <UserPlus className="w-10 h-10 text-primary" />
      </div>
      <div>
        <p className="text-lg font-semibold text-[#2D2926]">Henüz profil yok</p>
        <p className="text-sm text-[#7C766C] mt-2 leading-relaxed">
          İlk olarak bir veli profili oluştur.<br />Sonra çocuk profilleri ekleyebilirsin.
        </p>
      </div>
      <div className="w-full space-y-3">
        <button
          onClick={() => navigate('/register/parent')}
          className="w-full oak-btn-primary h-12 text-sm font-semibold"
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

export function ProfileSelect() {
  const { profiles } = useAppStore()
  const navigate = useNavigate()

  const parents  = profiles.filter((p) => p.role === 'parent')
  const children = profiles.filter((p) => p.role === 'child')
  const hasProfiles = profiles.length > 0

  return (
    <div className="min-h-screen bg-[#FFF8F5] flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-8 py-5 border-b border-[#EAE4D9]">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm text-[#7C766C] hover:text-[#2D2926] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Geri
        </button>
        <span className="font-display font-semibold italic text-[#2D2926] text-xl">Oakwood</span>
        <div className="w-16" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">
        {!hasProfiles ? (
          <EmptyState />
        ) : (
          <div className="w-full max-w-3xl space-y-12">

            {/* Title */}
            <p className="text-center text-base text-[#7C766C]">Kim giriyorsun?</p>

            {/* Parents */}
            {parents.length > 0 && (
              <section className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-[#EAE4D9]" />
                  <p className="text-xs font-bold text-[#7C766C] uppercase tracking-[0.15em]">Veliler</p>
                  <div className="h-px flex-1 bg-[#EAE4D9]" />
                </div>
                <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
                  {parents.map((p) => (
                    <ProfileCard key={p.id} profile={p} onClick={() => navigate(`/pin/${p.id}`)} />
                  ))}
                </div>
              </section>
            )}

            {/* Children */}
            {children.length > 0 && (
              <section className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-[#EAE4D9]" />
                  <p className="text-xs font-bold text-[#7C766C] uppercase tracking-[0.15em]">Çocuklar</p>
                  <div className="h-px flex-1 bg-[#EAE4D9]" />
                </div>
                <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
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
