import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore, ADMIN_PIN, ADMIN_USERNAME } from '@/state/store'
import { useLang } from '@/lib/useLang'
import { ArrowLeft } from 'lucide-react'

const inp =
  'w-full px-4 py-3 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors'

export function AdminPin() {
  const navigate = useNavigate()
  const { setAdminSession } = useAppStore()
  const { t } = useLang()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [fieldsReady, setFieldsReady] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [attempts, setAttempts] = useState(0)
  const [lockedUntil, setLockedUntil] = useState<number | null>(null)
  const [remaining, setRemaining] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    setUsername('')
    setPassword('')
    const timer = setTimeout(() => setFieldsReady(true), 50)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!lockedUntil) return

    intervalRef.current = setInterval(() => {
      const left = Math.ceil((lockedUntil - Date.now()) / 1000)
      if (left <= 0) {
        setLockedUntil(null)
        setAttempts(0)
        setRemaining(0)
        if (intervalRef.current) clearInterval(intervalRef.current)
      } else {
        setRemaining(left)
      }
    }, 500)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [lockedUntil])

  const isLocked = lockedUntil !== null && Date.now() < lockedUntil

  function verify() {
    if (isLocked) return

    const normalizedUsername = username.trim().toLowerCase()
    if (normalizedUsername === ADMIN_USERNAME && password === ADMIN_PIN) {
      setAdminSession(true)
      navigate('/admin/dashboard')
      return
    }

    const next = attempts + 1
    setAttempts(next)
    setError(t('auth.pinError.wrong'))
    setPassword('')

    if (next >= 5) {
      setLockedUntil(Date.now() + 30000)
      setRemaining(30)
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    verify()
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> {t('admin.back')}
      </button>

      <div className="w-full max-w-sm oak-card-elevated px-7 py-9 space-y-6">
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4">
            <span className="text-primary-foreground font-bold text-xl font-display">A</span>
          </div>
          <p className="font-semibold text-lg text-foreground">{t('admin.pin')}</p>
          <p className="text-sm text-muted-foreground mt-1">{t('admin.pinSubtitle')}</p>
        </div>

        <form autoComplete="off" onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fake-username"
            autoComplete="username"
            tabIndex={-1}
            className="hidden"
          />
          <input
            type="password"
            name="fake-password"
            autoComplete="current-password"
            tabIndex={-1}
            className="hidden"
          />
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              {t('admin.username')}
            </label>
            <input
              className={inp}
              value={username}
              readOnly={!fieldsReady}
              onChange={(e) => {
                setUsername(e.target.value)
                setError(null)
              }}
              placeholder={t('admin.usernamePlaceholder')}
              autoFocus
              autoComplete="off"
              name="admin-access-user"
              disabled={isLocked}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              {t('admin.password')}
            </label>
            <input
              className={inp}
              type="password"
              value={password}
              readOnly={!fieldsReady}
              onChange={(e) => {
                setPassword(e.target.value)
                setError(null)
              }}
              placeholder={t('admin.passwordPlaceholder')}
              autoComplete="new-password"
              name="admin-access-pass"
              disabled={isLocked}
            />
          </div>

          {error && (
            <p className="text-sm text-destructive bg-destructive/5 border border-destructive/20 rounded-xl px-3 py-2">
              {error}
            </p>
          )}
          {isLocked && (
            <p className="text-sm text-destructive">
              {t('auth.pinError.locked', { s: remaining })}
            </p>
          )}

          <button
            type="submit"
            disabled={isLocked}
            className="w-full oak-btn-primary h-12 text-sm disabled:opacity-40"
          >
            {t('admin.signInButton')}
          </button>
        </form>
      </div>
    </div>
  )
}
