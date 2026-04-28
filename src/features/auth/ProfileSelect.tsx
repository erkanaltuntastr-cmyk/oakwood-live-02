import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/state/store'
import { Avatar } from '@/components/Avatar'
import { useLang } from '@/lib/useLang'
import { ArrowLeft } from 'lucide-react'
import { OakwoodLogo } from '@/components/brand/OakwoodLogo'
import { OakwoodAssetIcon } from '@/components/brand/OakwoodAssetIcon'
import type { Profile } from '@/types'

function ProfileCard({ profile, onClick }: { profile: Profile; onClick: () => void }) {
  const { t } = useLang()
  return (
    <button onClick={onClick}
      className="group flex min-h-[260px] flex-col items-center justify-center gap-5 rounded-3xl bg-white/85 border border-[#EAE4D9] p-8 shadow-sm hover:shadow-md hover:border-primary/40 hover:scale-[1.03] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30">
      <div className="flex min-h-[112px] min-w-[112px] items-center justify-center">
        <Avatar profile={profile} size="xl" />
      </div>
      <div className="text-center">
        <p className="font-semibold text-[#2D2926] text-base leading-tight">{profile.name}</p>
        {profile.surname && <p className="text-sm text-[#7C766C] leading-tight">{profile.surname}</p>}
        <p className="text-xs font-medium text-primary mt-1.5 uppercase tracking-wide">
          {profile.role === 'parent' ? t('common.parent') : profile.yearGroup ?? t('common.student')}
        </p>
      </div>
    </button>
  )
}

function EmptyState() {
  const navigate = useNavigate()
  const { t } = useLang()
  return (
    <div className="flex flex-col items-center gap-6 py-16 text-center max-w-xs mx-auto">
      <div className="w-20 h-20 rounded-3xl bg-accent flex items-center justify-center">
        <OakwoodAssetIcon type="family-hub" className="h-12 w-12" size={52} alt="Family hub icon" />
      </div>
      <div>
        <p className="text-lg font-semibold text-[#2D2926]">{t('auth.noProfiles')}</p>
        <p className="text-sm text-[#7C766C] mt-2 leading-relaxed">{t('auth.noProfilesSub')}</p>
      </div>
      <div className="w-full space-y-3">
        <button onClick={() => navigate('/register/parent')} className="w-full oak-btn-primary h-12 text-sm font-semibold">
          {t('auth.createParent')}
        </button>
        <button onClick={() => navigate('/')} className="w-full oak-btn-ghost h-10 text-sm">
          {t('common.back')}
        </button>
      </div>
    </div>
  )
}

export function ProfileSelect() {
  const { profiles } = useAppStore()
  const navigate = useNavigate()
  const { t } = useLang()

  const parents  = profiles.filter((p) => p.role === 'parent')
  const children = profiles.filter((p) => p.role === 'child')
  const hasProfiles = profiles.length > 0

  return (
    <div className="min-h-screen oak-bg-family flex flex-col">
      <div className="flex items-center justify-between px-8 py-5 border-b border-[#EAE4D9]">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sm text-[#7C766C] hover:text-[#2D2926] transition-colors">
          <ArrowLeft className="w-4 h-4" /> {t('auth.back')}
        </button>
        <OakwoodLogo imageClassName="h-9 w-9" />
        <div className="w-16" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">
        {!hasProfiles ? <EmptyState /> : (
          <div className="w-full max-w-3xl space-y-12">
            <p className="text-center text-base text-[#7C766C]">{t('auth.whoIsEntering')}</p>

            {parents.length > 0 && (
              <section className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-[#EAE4D9]" />
                  <p className="text-xs font-bold text-[#7C766C] uppercase tracking-[0.15em]">{t('auth.parents')}</p>
                  <div className="h-px flex-1 bg-[#EAE4D9]" />
                </div>
                <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
                  {parents.map((p) => <ProfileCard key={p.id} profile={p} onClick={() => navigate(`/pin/${p.id}`)} />)}
                </div>
              </section>
            )}

            {children.length > 0 && (
              <section className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-[#EAE4D9]" />
                  <p className="text-xs font-bold text-[#7C766C] uppercase tracking-[0.15em]">{t('auth.students')}</p>
                  <div className="h-px flex-1 bg-[#EAE4D9]" />
                </div>
                <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
                  {children.map((p) => <ProfileCard key={p.id} profile={p} onClick={() => navigate(`/pin/${p.id}`)} />)}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
