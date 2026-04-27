import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/state/store'
import { useLang } from '@/lib/useLang'
import { LANGUAGES, type Lang } from '@/lib/i18n'

export function Welcome() {
  const { loadDemo, lang, setLang } = useAppStore()
  const navigate = useNavigate()
  const { t } = useLang()

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="flex min-h-[600px] w-full max-w-sm flex-col rounded-3xl border border-border bg-card px-7 py-9 shadow-card-md">

        {/* Lang switcher — top right */}
        <div className="flex justify-end mb-2">
          <div className="flex gap-1">
            {LANGUAGES.map((l) => (
              <button key={l.code} onClick={() => setLang(l.code as Lang)}
                className={`text-xs px-2 py-1 rounded-lg transition-colors ${lang === l.code ? 'bg-primary text-primary-foreground font-semibold' : 'text-muted-foreground hover:bg-muted'}`}>
                {l.flag} {l.code.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Header */}
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{t('app.tagline')}</p>
          <h1 className="mt-3 font-display text-4xl font-semibold italic text-foreground tracking-tight">
            {t('app.name')}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t('welcome.subtitle')}</p>
          <p className="mt-2 text-sm font-semibold text-muted-foreground">{t('welcome.localFirst')}</p>
        </div>

        <div className="mt-8 border-t border-border" />

        {/* Actions */}
        <div className="mt-8 space-y-3">
          <button onClick={() => navigate('/login')}
            className="h-14 w-full rounded-2xl bg-primary text-primary-foreground text-lg font-bold tracking-tight hover:opacity-90 transition-opacity shadow-card-md">
            {t('welcome.login')}
          </button>
          <button onClick={() => navigate('/register/parent')}
            className="h-12 w-full rounded-2xl border border-border bg-background text-foreground text-sm font-semibold hover:bg-muted transition-colors">
            {t('welcome.register')}
          </button>
          <div className="flex items-center gap-3 py-1">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <button onClick={() => { loadDemo(); navigate('/app/dashboard') }}
            className="h-11 w-full rounded-xl border border-border bg-muted text-sm font-semibold text-foreground hover:bg-accent/50 transition-colors">
            {t('welcome.demo')}
          </button>
        </div>

        {/* Footer */}
        <div className="mt-auto">
          <div className="mb-6 border-t border-border" />
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">{t('app.privacy')}</p>
            <p className="mt-1 text-xs text-muted-foreground">{t('app.privacySub')}</p>
          </div>
          <div className="mx-auto mt-5 h-1.5 w-20 rounded-full bg-border" />
          <div className="text-center mt-4">
            <button onClick={() => navigate('/admin')}
              className="text-xs text-muted-foreground/40 hover:text-muted-foreground transition-colors">
              {t('welcome.admin')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
