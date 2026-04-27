import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppStore } from '@/state/store'
import { Avatar } from '@/components/Avatar'
import { useLang } from '@/lib/useLang'
import { cn } from '@/lib/utils'
import { ArrowLeft, Delete } from 'lucide-react'

const MAX_ATTEMPTS = 5
const LOCKOUT_SECONDS = 30

export function PinEntry() {
  const { profileId } = useParams<{ profileId: string }>()
  const navigate = useNavigate()
  const { profiles, setActiveProfile } = useAppStore()
  const { t } = useLang()
  const profile = profiles.find((p) => p.id === profileId)

  const [pin, setPin] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [lockedUntil, setLockedUntil] = useState<number | null>(null)
  const [remaining, setRemaining] = useState(0)
  const [shake, setShake] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => { if (!profile) navigate('/') }, [profile, navigate])

  useEffect(() => {
    if (lockedUntil) {
      intervalRef.current = setInterval(() => {
        const left = Math.ceil((lockedUntil - Date.now()) / 1000)
        if (left <= 0) { setLockedUntil(null); setAttempts(0); setRemaining(0); clearInterval(intervalRef.current!) }
        else setRemaining(left)
      }, 500)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [lockedUntil])

  const isLocked = lockedUntil !== null && Date.now() < lockedUntil

  function handleDigit(d: string) {
    if (isLocked || pin.length >= 4) return
    const next = pin + d
    setPin(next)
    if (next.length === 4) verify(next)
  }

  function verify(value: string) {
    if (value === profile!.pinHash) {
      setActiveProfile(profile!.id)
      navigate('/app/dashboard')
    } else {
      const next = attempts + 1
      setAttempts(next)
      setShake(true)
      setTimeout(() => { setShake(false); setPin('') }, 500)
      if (next >= MAX_ATTEMPTS) { setLockedUntil(Date.now() + LOCKOUT_SECONDS * 1000); setRemaining(LOCKOUT_SECONDS) }
    }
  }

  if (!profile) return null
  const dots = Array.from({ length: 4 }, (_, i) => i < pin.length)

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      <button onClick={() => navigate('/profiles')}
        className="absolute top-6 left-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" /> {t('auth.back')}
      </button>

      <div className="flex flex-col items-center gap-8 w-full max-w-xs">
        <div className="text-center flex flex-col items-center gap-3">
          <Avatar profile={profile} size="xl" />
          <div>
            <p className="font-semibold text-lg text-foreground">{profile.name}</p>
            <p className="text-sm text-muted-foreground mt-0.5">{t('auth.pin')}</p>
          </div>
        </div>

        <div className={cn('flex gap-4', shake && 'animate-bounce')}>
          {dots.map((filled, i) => (
            <div key={i} className={cn('w-4 h-4 rounded-full border-2 transition-all duration-150', filled ? 'bg-primary border-primary scale-110' : 'border-muted-foreground')} />
          ))}
        </div>

        {isLocked && <p className="text-destructive text-sm text-center">{t('auth.pinError.locked', { s: remaining })}</p>}
        {!isLocked && attempts > 0 && attempts < MAX_ATTEMPTS && (
          <p className="text-destructive text-sm text-center">{t('auth.pinError.wrong')}</p>
        )}

        <div className="grid grid-cols-3 gap-3 w-full">
          {['1','2','3','4','5','6','7','8','9','','0','⌫'].map((key, i) => {
            if (key === '') return <div key={i} />
            return (
              <button key={key} onClick={() => key === '⌫' ? setPin((p) => p.slice(0,-1)) : handleDigit(key)}
                disabled={isLocked}
                className="h-14 rounded-xl border border-border bg-card text-xl font-medium hover:bg-muted active:scale-95 disabled:opacity-30 transition-all flex items-center justify-center">
                {key === '⌫' ? <Delete className="w-5 h-5" /> : key}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
