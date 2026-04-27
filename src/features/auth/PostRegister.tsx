import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/state/store'
import { Avatar } from '@/components/Avatar'
import { useLang } from '@/lib/useLang'
import { Plus, ArrowRight } from 'lucide-react'

export function PostRegister() {
  const navigate = useNavigate()
  const { profiles, activeProfileId } = useAppStore()
  const { t } = useLang()
  const profile = profiles.find((p) => p.id === activeProfileId)

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm oak-card-elevated px-7 py-9 text-center">
        {profile && <div className="flex justify-center mb-5"><Avatar profile={profile} size="xl" /></div>}
        <h1 className="text-2xl font-display font-semibold italic text-foreground">
          {t('postReg.welcome', { name: profile?.name ?? '' })}
        </h1>
        <p className="text-sm text-muted-foreground mt-2 mb-8">{t('postReg.sub')}</p>
        <div className="space-y-3">
          <button onClick={() => navigate('/register/child')} className="w-full h-12 oak-btn-primary flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" /> {t('postReg.addLearner')}
          </button>
          <button onClick={() => navigate('/app/dashboard')} className="w-full h-12 oak-btn-ghost flex items-center justify-center gap-2">
            {t('postReg.toDashboard')} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
