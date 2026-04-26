import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/state/store'

export function Welcome() {
  const { loadDemo } = useAppStore()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="flex min-h-[580px] w-full max-w-sm flex-col rounded-3xl border border-border bg-card px-7 py-9 shadow-card-md">

        {/* Header */}
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Aile Öğrenme Platformu</p>
          <h1 className="mt-3 font-display text-4xl font-semibold italic text-foreground tracking-tight">
            Oakwood
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Çocuğunun UK müfredatındaki ilerlemesini takip et, sınavlar oluştur, ödevleri yönet.
          </p>
          <p className="mt-2 text-sm font-semibold text-muted-foreground">
            Cihazında kalır. Hesap gerekmez.
          </p>
        </div>

        <div className="mt-8 border-t border-border" />

        {/* Actions */}
        <div className="mt-8 space-y-3">

          {/* Primary — Login (always visible, always highlighted) */}
          <button
            onClick={() => navigate('/profiles')}
            className="h-14 w-full rounded-2xl bg-primary text-primary-foreground text-lg font-bold tracking-tight hover:opacity-90 transition-opacity shadow-card-md"
          >
            Giriş Yap
          </button>

          {/* Secondary — Register */}
          <button
            onClick={() => navigate('/register/parent')}
            className="h-12 w-full rounded-2xl border border-border bg-background text-foreground text-sm font-semibold hover:bg-muted transition-colors"
          >
            Kayıt Ol
          </button>

          <div className="flex items-center gap-3 py-1">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">veya</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Demo */}
          <button
            onClick={() => { loadDemo(); navigate('/app/dashboard') }}
            className="h-11 w-full rounded-xl border border-border bg-muted text-sm font-semibold text-foreground hover:bg-accent/50 transition-colors"
          >
            Demo'yu Dene
          </button>
        </div>

        {/* Footer */}
        <div className="mt-auto">
          <div className="mb-6 border-t border-border" />
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">Tasarım Gereği Gizli</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Veriler yalnızca bu cihazda saklanır.
            </p>
          </div>
          <div className="mx-auto mt-5 h-1.5 w-20 rounded-full bg-border" />
          <div className="text-center mt-4">
            <button
              onClick={() => navigate('/admin')}
              className="text-xs text-muted-foreground/40 hover:text-muted-foreground transition-colors"
            >
              admin
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
