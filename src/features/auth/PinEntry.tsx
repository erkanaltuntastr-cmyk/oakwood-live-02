import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppStore } from '@/state/store'
import { cn } from '@/lib/utils'
import { ArrowLeft, Delete } from 'lucide-react'

const MAX_ATTEMPTS = 5
const LOCKOUT_SECONDS = 30

export function PinEntry() {
  const { profileId } = useParams<{ profileId: string }>()
  const navigate = useNavigate()
  const { profiles, setActiveProfile } = useAppStore()
  const profile = profiles.find((p) => p.id === profileId)

  const [pin, setPin] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [lockedUntil, setLockedUntil] = useState<number | null>(null)
  const [remaining, setRemaining] = useState(0)
  const [shake, setShake] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!profile) navigate('/')
  }, [profile, navigate])

  useEffect(() => {
    if (lockedUntil) {
      intervalRef.current = setInterval(() => {
        const left = Math.ceil((lockedUntil - Date.now()) / 1000)
        if (left <= 0) {
          setLockedUntil(null)
          setAttempts(0)
          setRemaining(0)
          clearInterval(intervalRef.current!)
        } else {
          setRemaining(left)
        }
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

  function handleDelete() {
    setPin((p) => p.slice(0, -1))
  }

  function verify(value: string) {
    if (value === profile!.pinHash) {
      setActiveProfile(profile!.id)
      navigate('/app/dashboard')
    } else {
      const nextAttempts = attempts + 1
      setAttempts(nextAttempts)
      setShake(true)
      setTimeout(() => { setShake(false); setPin('') }, 500)
      if (nextAttempts >= MAX_ATTEMPTS) {
        setLockedUntil(Date.now() + LOCKOUT_SECONDS * 1000)
        setRemaining(LOCKOUT_SECONDS)
      }
    }
  }

  if (!profile) return null

  const dots = Array.from({ length: 4 }, (_, i) => i < pin.length)

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 text-sm"
      >
        <ArrowLeft className="w-4 h-4" /> Geri
      </button>

      <div className="flex flex-col items-center gap-8 w-full max-w-xs">
        <div className="text-center">
          <div className="text-5xl mb-3">{profile.avatar}</div>
          <p className="font-semibold text-lg text-foreground">{profile.name}</p>
          <p className="text-sm text-muted-foreground mt-1">PIN'ini gir</p>
        </div>

        {/* PIN dots */}
        <div className={cn('flex gap-4', shake && 'animate-bounce')}>
          {dots.map((filled, i) => (
            <div
              key={i}
              className={cn(
                'w-4 h-4 rounded-full border-2 transition-all duration-150',
                filled
                  ? 'bg-foreground border-foreground scale-110'
                  : 'border-muted-foreground'
              )}
            />
          ))}
        </div>

        {isLocked && (
          <p className="text-destructive text-sm text-center">
            Çok fazla yanlış deneme. {remaining}s bekle.
          </p>
        )}

        {!isLocked && attempts > 0 && attempts < MAX_ATTEMPTS && (
          <p className="text-destructive text-sm text-center">
            Yanlış PIN. {MAX_ATTEMPTS - attempts} hakkın kaldı.
          </p>
        )}

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-3 w-full">
          {['1','2','3','4','5','6','7','8','9','','0','⌫'].map((key, i) => {
            if (key === '') return <div key={i} />
            return (
              <button
                key={key}
                onClick={() => key === '⌫' ? handleDelete() : handleDigit(key)}
                disabled={isLocked}
                className={cn(
                  'h-14 rounded-xl text-xl font-medium transition-all',
                  'bg-secondary hover:bg-secondary/70 active:scale-95',
                  'disabled:opacity-30 disabled:cursor-not-allowed',
                  key === '⌫' && 'flex items-center justify-center'
                )}
              >
                {key === '⌫' ? <Delete className="w-5 h-5" /> : key}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
