import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/state/store'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'

const inp = 'w-full px-4 py-3 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors'

export function LoginForm() {
  const navigate = useNavigate()
  const { profiles, setActiveProfile, setActiveChild } = useAppStore()

  const [name, setName] = useState('')
  const [pin, setPin] = useState('')
  const [showPin, setShowPin] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notFound, setNotFound] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setNotFound(false)

    if (!name.trim()) { setError('Ad zorunlu'); return }
    if (pin.length !== 4) { setError('PIN 4 haneli olmalı'); return }

    // Find profile by name (case-insensitive)
    const match = profiles.find(
      (p) => p.name.toLowerCase() === name.trim().toLowerCase() && p.pinHash === pin
    )

    if (match) {
      setActiveProfile(match.id)
      // If parent, go to dashboard (family hub)
      // If child, select self as activeChild too
      if (match.role === 'child') setActiveChild(match.id)
      navigate('/app/dashboard')
    } else {
      // Check if name exists but wrong PIN
      const nameExists = profiles.some(
        (p) => p.name.toLowerCase() === name.trim().toLowerCase()
      )
      if (nameExists) {
        setError('PIN yanlış. Tekrar dene.')
      } else {
        setNotFound(true)
      }
    }
  }

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

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h2 className="text-2xl font-display font-semibold italic text-foreground">Giriş Yap</h2>
            <p className="text-sm text-muted-foreground mt-1">Profil adın ve PIN'ini gir.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Ad
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setError(null); setNotFound(false) }}
                placeholder="Profilindeki adını yaz"
                className={inp}
                autoFocus
              />
            </div>

            {/* PIN */}
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                PIN
              </label>
              <div className="relative">
                <input
                  type={showPin ? 'text' : 'password'}
                  inputMode="numeric"
                  maxLength={4}
                  value={pin}
                  onChange={(e) => { setPin(e.target.value.replace(/\D/g, '').slice(0, 4)); setError(null); setNotFound(false) }}
                  placeholder="••••"
                  className={`${inp} text-center tracking-[0.5em] pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPin((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-destructive bg-destructive/5 border border-destructive/20 rounded-xl px-3 py-2">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full oak-btn-primary h-12 text-sm mt-2"
            >
              Giriş Yap
            </button>
          </form>

          {/* Not found state */}
          {notFound && (
            <div className="mt-6 rounded-2xl border border-border bg-muted/50 p-5 text-center space-y-3">
              <p className="text-sm font-semibold text-foreground">
                "{name}" adında bir profil bulunamadı.
              </p>
              <p className="text-xs text-muted-foreground">
                Henüz kayıt olmadıysan yeni bir profil oluşturabilirsin.
              </p>
              <button
                onClick={() => navigate('/register/parent')}
                className="w-full oak-btn-primary h-10 text-sm"
              >
                Kayıt Ol
              </button>
              <button
                onClick={() => { setName(''); setPin(''); setNotFound(false) }}
                className="w-full oak-btn-ghost h-9 text-sm"
              >
                Tekrar Dene
              </button>
            </div>
          )}

          {/* Divider + register link (always shown) */}
          {!notFound && (
            <div className="mt-8 text-center space-y-2">
              <p className="text-xs text-muted-foreground">Hesabın yok mu?</p>
              <button
                onClick={() => navigate('/register/parent')}
                className="text-sm font-semibold text-primary hover:opacity-80 transition-opacity"
              >
                Kayıt Ol
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
