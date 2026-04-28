import type { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Mail, MapPin } from 'lucide-react'
import { useAppStore } from '@/state/store'
import { useLang } from '@/lib/useLang'
import { LANGUAGES, type Lang } from '@/lib/i18n'
import { OakwoodLogo } from '@/components/brand/OakwoodLogo'
import {
  AIIcon,
  FamilyHubIcon,
  HomeworkIcon,
  LessonsIcon,
  MessagesIcon,
  ParentFemaleIcon,
  ParentMaleIcon,
  PinIcon,
  QuizIcon,
  ReportIcon,
  ResourcesIcon,
  SettingsIcon,
  StudentPrimaryIcon,
  StudentSecondaryIcon,
  StudentYear7Icon,
  type OakwoodIconProps,
} from '@/components/brand/OakwoodIcons'
import { cn } from '@/lib/utils'

type IconComponent = (props: OakwoodIconProps) => ReactElement

const featureIcons: IconComponent[] = [
  FamilyHubIcon,
  LessonsIcon,
  QuizIcon,
  ReportIcon,
  AIIcon,
  PinIcon,
]

export function Welcome() {
  const { loadDemo, lang, setLang } = useAppStore()
  const navigate = useNavigate()
  const { t } = useLang()
  const navLinks = [
    { href: '#how', label: t('welcome.navHow') },
    { href: '#features', label: t('welcome.navFeatures') },
    { href: '#privacy', label: t('welcome.navSecurity') },
    { href: '#contact', label: t('welcome.navContact') },
  ]
  const trustNotes = [
    { icon: PinIcon, text: t('welcome.trustLocal') },
    { icon: FamilyHubIcon, text: t('welcome.trustPin') },
    { icon: LessonsIcon, text: t('welcome.trustCurriculum') },
    { icon: AIIcon, text: t('welcome.trustAI') },
  ]
  const features = [
    { title: t('welcome.featureFamilyHubTitle'), text: t('welcome.featureFamilyHubText') },
    { title: t('welcome.featureCurriculumTitle'), text: t('welcome.featureCurriculumText') },
    { title: t('welcome.featureQuizTitle'), text: t('welcome.featureQuizText') },
    { title: t('welcome.featureReportsTitle'), text: t('welcome.featureReportsText') },
    { title: t('welcome.featureAITitle'), text: t('welcome.featureAIText') },
    { title: t('welcome.featurePrivacyTitle'), text: t('welcome.featurePrivacyText') },
  ]

  return (
    <main className="oak-bg-landing oak-hero-pattern min-h-screen overflow-hidden text-oak-text">
      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-6 lg:px-8">
        <button
          aria-label="Oakwood Learning Hub"
          className="rounded-2xl text-left"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <OakwoodLogo />
        </button>

        <nav className="hidden items-center gap-7 text-sm font-semibold text-oak-muted md:flex">
          {navLinks.map((link) => (
            <a key={link.href} className="transition-colors hover:text-oak-green" href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex rounded-full border border-oak-beige bg-white/75 p-1 shadow-card backdrop-blur">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code as Lang)}
                className={cn(
                  'rounded-full px-2.5 py-1 text-xs font-semibold transition-colors',
                  lang === l.code ? 'bg-oak-green text-white' : 'text-oak-muted hover:bg-oak-beige-light hover:text-oak-text'
                )}
              >
                {l.code.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            onClick={() => navigate('/login')}
            className="hidden rounded-full border border-oak-beige bg-white/80 px-4 py-2 text-sm font-semibold text-oak-text shadow-card transition-colors hover:bg-oak-beige-light sm:inline-flex"
          >
            {t('welcome.login')}
          </button>
        </div>
      </header>

      <section
        id="how"
        className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-5 pb-16 pt-8 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-24 lg:pt-14"
      >
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-oak-beige bg-white/70 px-4 py-2 text-sm font-semibold text-oak-green shadow-card backdrop-blur">
            <AIIcon className="h-4 w-4" size={16} />
            {t('welcome.badge')}
          </div>

          <h1 className="font-display text-4xl font-semibold leading-[1.06] tracking-normal text-oak-text sm:text-5xl lg:text-6xl">
            {t('welcome.heroTitle')}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5F5951]">
            {t('welcome.heroSubtitle')}
          </p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-oak-muted">
            {t('welcome.heroSupport')}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              onClick={() => navigate('/login')}
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-oak-green px-7 py-4 text-base font-bold text-white shadow-[0_12px_30px_rgba(74,103,65,0.18)] transition hover:bg-oak-green-hover"
            >
              {t('welcome.login')}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => navigate('/register/parent')}
              className="inline-flex items-center justify-center rounded-2xl border border-oak-beige bg-white/80 px-7 py-4 text-base font-bold text-oak-text shadow-card transition hover:bg-oak-beige-light"
            >
              {t('welcome.register')}
            </button>
            <button
              onClick={() => { loadDemo(); navigate('/app/dashboard') }}
              className="inline-flex items-center justify-center rounded-2xl border border-transparent px-7 py-4 text-base font-bold text-oak-green transition hover:bg-oak-green-light"
            >
              {t('welcome.demo')}
            </button>
          </div>

          <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
            {trustNotes.map(({ icon: Icon, text }) => (
              <TrustNote key={text} icon={Icon} text={text} />
            ))}
          </div>
        </div>

        <ProductPreviewCard />
      </section>

      <section id="features" className="relative z-10 mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#769A7C]">{t('welcome.featuresEyebrow')}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-normal text-oak-text sm:text-4xl">
            {t('welcome.featuresTitle')}
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={featureIcons[index]}
              text={feature.text}
              title={feature.title}
            />
          ))}
        </div>

        <CoreIconSystem />
      </section>

      <section id="privacy" className="relative z-10 mx-auto w-full max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-oak-beige bg-white/75 p-7 shadow-[0_20px_60px_rgba(74,103,65,0.08)] backdrop-blur md:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#769A7C]">{t('welcome.privacyEyebrow')}</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-normal sm:text-4xl">{t('welcome.privacyTitle')}</h2>
            </div>
            <p className="text-base leading-8 text-[#5F5951] sm:text-lg">{t('welcome.privacyText')}</p>
          </div>
        </div>
      </section>

      <footer id="contact" className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-10 pt-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 border-t border-oak-beige pt-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <h3 className="font-display text-2xl font-semibold">{t('welcome.contactTitle')}</h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-oak-muted">{t('welcome.contactText')}</p>
            <div className="mt-4 flex flex-col gap-2 text-sm text-[#5F5951] sm:flex-row sm:gap-6">
              <span className="inline-flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#769A7C]" />
                {t('welcome.contactEmail')}
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#769A7C]" />
                {t('welcome.contactLocation')}
              </span>
            </div>
          </div>
          <button
            onClick={() => navigate('/admin')}
            className="text-left text-xs text-oak-muted/40 transition-colors hover:text-oak-muted md:text-right"
          >
            {t('welcome.admin')}
          </button>
        </div>
      </footer>
    </main>
  )
}

function TrustNote({ icon: Icon, text }: { icon: IconComponent; text: string }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-oak-beige bg-white/65 px-4 py-3 text-sm font-medium text-[#5F5951] shadow-card backdrop-blur">
      <Icon className="h-4 w-4 text-oak-green" size={18} strokeWidth={2} />
      <span>{text}</span>
    </div>
  )
}

function FeatureCard({ icon: Icon, title, text }: { icon: IconComponent; title: string; text: string }) {
  return (
    <article className="group flex min-h-64 flex-col items-center rounded-[1.5rem] border border-oak-beige bg-white/70 p-6 text-center shadow-[0_8px_30px_rgba(74,103,65,0.06)] backdrop-blur transition hover:-translate-y-0.5 hover:bg-white">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-3xl border border-oak-beige bg-white text-oak-green shadow-card">
        <Icon className="h-12 w-12" size={48} strokeWidth={1.75} />
      </div>
      <h3 className="font-display text-xl font-semibold text-oak-text">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-oak-muted">{text}</p>
    </article>
  )
}

function CoreIconSystem() {
  const { t } = useLang()
  const icons = [
    { icon: FamilyHubIcon, label: t('nav.familyHub') },
    { icon: LessonsIcon, label: t('nav.subjects') },
    { icon: QuizIcon, label: t('nav.quizzes') },
    { icon: HomeworkIcon, label: t('nav.homework') },
    { icon: ReportIcon, label: t('nav.reports') },
    { icon: AIIcon, label: t('ai.assistant') },
    { icon: ResourcesIcon, label: t('welcome.iconResources') },
    { icon: MessagesIcon, label: t('nav.messages') },
    { icon: SettingsIcon, label: t('nav.settings') },
    { icon: PinIcon, label: t('auth.pin') },
  ]

  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {icons.map(({ icon: Icon, label }) => (
        <div key={label} className="flex min-h-32 flex-col items-center justify-center rounded-3xl border border-oak-beige bg-white/65 px-4 py-5 text-center shadow-card backdrop-blur">
          <Icon className="h-14 w-14 text-oak-green" size={56} strokeWidth={1.7} />
          <p className="mt-3 text-xs font-semibold text-oak-muted">{label}</p>
        </div>
      ))}
    </div>
  )
}

function ProductPreviewCard() {
  const { t } = useLang()

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="absolute -inset-6 rounded-[3rem] bg-[#A8BFA6]/15 blur-3xl" />
      <div className="relative rounded-[2rem] border border-oak-beige bg-white/80 p-5 shadow-[0_24px_80px_rgba(74,103,65,0.14)] backdrop-blur-xl md:p-6">
        <div className="flex items-start justify-between gap-4 border-b border-oak-beige pb-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#769A7C]">{t('welcome.previewEyebrow')}</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-normal">{t('welcome.previewTitle')}</h2>
          </div>
          <div className="rounded-2xl bg-oak-green px-3 py-2 text-xs font-bold text-white">{t('welcome.previewLocal')}</div>
        </div>

        <RolePreviewStrip />

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <LearnerCard
            icon={StudentPrimaryIcon}
            name={t('welcome.previewLearnerOne')}
            score="82%"
            subject={t('welcome.previewSubjectOne')}
            year={t('welcome.previewYearOne')}
          />
          <LearnerCard
            icon={StudentYear7Icon}
            name={t('welcome.previewLearnerTwo')}
            score="76%"
            subject={t('welcome.previewSubjectTwo')}
            year={t('welcome.previewYearTwo')}
          />
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <Metric label={t('welcome.previewActiveSubjects')} value="8" />
          <Metric label={t('welcome.previewPendingAssignments')} value="3" />
          <Metric label={t('welcome.previewRecentScore')} value="79%" />
        </div>

        <div className="mt-5 rounded-3xl border border-oak-beige bg-oak-beige-light p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-oak-green shadow-card">
              <AIIcon className="h-5 w-5" size={22} />
            </div>
            <div>
              <p className="text-sm font-bold text-oak-text">{t('welcome.previewAITitle')}</p>
              <p className="mt-1 text-sm leading-6 text-oak-muted">{t('welcome.previewAI')}</p>
            </div>
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-3xl border border-oak-beige bg-white">
          <div className="flex items-center justify-between border-b border-oak-beige px-5 py-4">
            <p className="text-sm font-bold">{t('welcome.previewFlow')}</p>
            <p className="text-xs text-oak-muted">{t('welcome.previewFlowCount')}</p>
          </div>
          <div className="divide-y divide-oak-beige">
            <TaskRow icon={ReportIcon} status={t('welcome.previewTaskReportStatus')} title={t('welcome.previewTaskReport')} />
            <TaskRow icon={HomeworkIcon} status={t('welcome.previewTaskHomeworkStatus')} title={t('welcome.previewTaskHomework')} />
            <TaskRow icon={AIIcon} status={t('welcome.previewTaskPlanStatus')} title={t('welcome.previewTaskPlan')} />
          </div>
        </div>
      </div>
    </div>
  )
}

function RolePreviewStrip() {
  const { t } = useLang()
  const roles = [
    { icon: ParentMaleIcon, label: t('common.parent') },
    { icon: ParentFemaleIcon, label: t('common.guardian') },
    { icon: StudentSecondaryIcon, label: t('common.student') },
  ]

  return (
    <div className="mt-5 grid gap-3 sm:grid-cols-3">
      {roles.map(({ icon: Icon, label }) => (
        <div key={label} className="flex min-h-24 flex-col items-center justify-center rounded-3xl border border-oak-beige bg-white/75 px-3 py-4 text-center shadow-card">
          <Icon className="h-14 w-14 text-oak-green" size={56} strokeWidth={1.7} />
          <p className="mt-2 text-xs font-semibold text-oak-muted">{label}</p>
        </div>
      ))}
    </div>
  )
}

function LearnerCard({
  icon: Icon,
  name,
  year,
  subject,
  score,
}: {
  icon: IconComponent
  name: string
  year: string
  subject: string
  score: string
}) {
  const { t } = useLang()

  return (
    <div className="flex flex-col items-center rounded-3xl border border-oak-beige bg-white p-5 text-center shadow-card">
      <div className="flex flex-col items-center gap-2">
        <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-3xl border border-oak-beige bg-white/90 text-oak-green shadow-card">
          <Icon className="h-[4.5rem] w-[4.5rem]" size={72} strokeWidth={1.7} />
        </div>
        <div>
          <p className="font-bold text-oak-text">{name}</p>
          <p className="text-xs text-oak-muted">{year}</p>
        </div>
      </div>
      <div className="mt-4 w-full rounded-2xl bg-oak-warm p-3 text-center">
        <p className="text-xs text-oak-muted">{t('welcome.previewFocus')}</p>
        <p className="mt-1 text-sm font-semibold text-oak-text">{subject}</p>
      </div>
      <div className="mt-3 flex w-full items-center justify-center gap-3 text-sm">
        <span className="text-oak-muted">{t('welcome.previewLastQuiz')}</span>
        <span className="font-bold text-oak-green">{score}</span>
      </div>
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-oak-green-light px-4 py-3 text-center">
      <p className="text-xs font-medium text-oak-muted">{label}</p>
      <p className="mt-1 font-display text-2xl font-semibold text-oak-green">{value}</p>
    </div>
  )
}

function TaskRow({ icon: Icon = QuizIcon, title, status }: { icon?: IconComponent; title: string; status: string }) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-3">
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-oak-green-light text-oak-green">
          <Icon className="h-5 w-5" size={20} />
        </span>
        <p className="text-sm font-medium text-oak-text">{title}</p>
      </div>
      <span className="whitespace-nowrap rounded-full bg-oak-green-light px-2.5 py-1 text-xs font-semibold text-oak-green">{status}</span>
    </div>
  )
}
