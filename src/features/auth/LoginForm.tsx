import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/state/store'
import { useLang } from '@/lib/useLang'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { OakwoodLogo } from '@/components/brand/OakwoodLogo'
import { OakwoodAssetIcon } from '@/components/brand/OakwoodAssetIcon'

const inp = 'w-full px-4 py-3 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors'

export function LoginForm() {
  const navigate = useNavigate()
  const { profiles, setActiveProfile, setActiveChild } = useAppStore()
  const { t } = useLang()

  const [name, setName] = useState('')
  const [pin, setPin] = useState('')
  const [showPin, setShowPin] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notFound, setNotFound] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null); setNotFound(false)
    if (!name.trim()) { setError(t('settings.required')); return }
    if (pin.length !== 4) { setError('PIN must be 4 digits'); return }

    const match = profiles.find((p) => p.name.toLowerCase() === name.trim().toLowerCase() && p.pinHash === pin)
    if (match) {
      setActiveProfile(match.id)
      if (match.role === 'child') setActiveChild(match.id)
      navigate('/app/dashboard')
    } else {
      const nameExists = profiles.some((p) => p.name.toLowerCase() === name.trim().toLowerCase())
      if (nameExists) setError(t('auth.pinError.wrong'))
      else setNotFound(true)
    }
  }

  return (
    <div className="min-h-screen oak-bg-family flex flex-col">
      <div className="flex items-center justify-between px-6 py-5 border-b border-border">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> {t('auth.back')}
        </button>
        <OakwoodLogo imageClassName="h-9 w-9" />
        <div className="w-16" />
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <OakwoodAssetIcon type="pin" className="h-9 w-9" size={36} alt="Pin icon" />
              <h2 className="text-2xl font-display font-semibold italic text-foreground">{t('auth.signIn')}</h2>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{t('auth.signInSubtitle')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{t('auth.name')}</label>
              <input type="text" value={name}
                onChange={(e) => { setName(e.target.value); setError(null); setNotFound(false) }}
                placeholder={t('auth.namePlaceholder')} className={inp} autoFocus />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{t('auth.pin')}</label>
              <div className="relative">
                <input type={showPin ? 'text' : 'password'} inputMode="numeric" maxLength={4} value={pin}
                  onChange={(e) => { setPin(e.target.value.replace(/\D/g, '').slice(0, 4)); setError(null); setNotFound(false) }}
                  placeholder="••••" className={`${inp} text-center tracking-[0.5em] pr-12`} />
                <button type="button" onClick={() => setShowPin((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-destructive bg-destructive/5 border border-destructive/20 rounded-xl px-3 py-2">{error}</p>}

            <button type="submit" className="w-full oak-btn-primary h-12 text-sm mt-2">{t('auth.signIn')}</button>
          </form>

          {notFound && (
            <div className="mt-6 rounded-2xl border border-border bg-muted/50 p-5 text-center space-y-3">
              <p className="text-sm font-semibold text-foreground">{t('auth.notFound', { name })}</p>
              <p className="text-xs text-muted-foreground">{t('auth.notFoundSub')}</p>
              <button onClick={() => navigate('/register/parent')} className="w-full oak-btn-primary h-10 text-sm">
                {t('welcome.register')}
              </button>
              <button onClick={() => { setName(''); setPin(''); setNotFound(false) }} className="w-full oak-btn-ghost h-9 text-sm">
                {t('auth.tryAgain')}
              </button>
            </div>
          )}

          {!notFound && (
            <div className="mt-8 text-center space-y-2">
              <p className="text-xs text-muted-foreground">{t('auth.noAccount')}</p>
              <button onClick={() => navigate('/register/parent')} className="text-sm font-semibold text-primary hover:opacity-80 transition-opacity">
                {t('welcome.register')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
