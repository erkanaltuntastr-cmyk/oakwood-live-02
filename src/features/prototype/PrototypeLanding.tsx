import { ArrowRight, Mail, MapPin, Shield, Sparkles, BookOpen, Users, BarChart3, MessageCircle } from 'lucide-react'
import { OakwoodAssetIcon, type OakwoodAssetIconType } from '@/components/brand/OakwoodAssetIcon'
import { cn } from '@/lib/utils'

import masterLogo from '@/assets/brand/logo/master-logo.png'
import familyHubBg from '@/assets/brand/backgrounds/family-hub-bg.png'

const navLinks = [
  { href: '#how', label: 'How It Works' },
  { href: '#features', label: 'Features' },
  { href: '#privacy', label: 'Privacy' },
  { href: '#contact', label: 'Contact' },
]

const features: Array<{ icon: OakwoodAssetIconType; title: string; description: string }> = [
  {
    icon: 'family-hub',
    title: 'Family Hub',
    description: 'A central space where parents and children come together. Track progress, manage schedules, and stay connected as a family.',
  },
  {
    icon: 'lessons',
    title: 'Curriculum-Aligned Lessons',
    description: 'Complete coverage of the England National Curriculum from Reception to Year 11, organised by key stage and subject.',
  },
  {
    icon: 'quiz',
    title: 'Smart Assessments',
    description: 'AI-powered quizzes that adapt to your child&apos;s level, identifying strengths and areas for improvement.',
  },
  {
    icon: 'report',
    title: 'Progress Reports',
    description: 'Clear, visual reports that help you understand exactly where your child is in their learning journey.',
  },
  {
    icon: 'ai',
    title: 'AI Study Assistant',
    description: 'A friendly AI helper that answers questions, explains concepts, and provides personalised study suggestions.',
  },
  {
    icon: 'pin',
    title: 'Local-First Privacy',
    description: 'Your family&apos;s data stays on your device. No cloud accounts required, no data shared with third parties.',
  },
]

const trustPoints = [
  { icon: Shield, text: 'Data stored locally on your device' },
  { icon: Users, text: 'Separate profiles for each family member' },
  { icon: BookOpen, text: 'Full National Curriculum coverage' },
  { icon: Sparkles, text: 'AI assistance without the cloud' },
]

export function PrototypeLanding() {
  return (
    <div className="min-h-screen bg-oak-warm text-oak-text">
      {/* Hero Background */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: `url(${familyHubBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
        }}
      />

      {/* Header */}
      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-6 lg:px-10">
        <a href="#" className="flex items-center gap-3">
          <img src={masterLogo} alt="Oakwood Learning Hub" className="h-12 w-auto" />
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-oak-muted lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-oak-green"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button className="hidden rounded-2xl border border-oak-beige bg-white/80 px-5 py-2.5 text-sm font-semibold text-oak-text shadow-card transition-colors hover:bg-oak-beige-light sm:inline-flex">
            Sign In
          </button>
          <button className="rounded-2xl bg-oak-green px-5 py-2.5 text-sm font-semibold text-white shadow-card transition-colors hover:bg-oak-green-hover">
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="how"
        className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-16 px-6 pb-20 pt-12 lg:grid-cols-2 lg:px-10 lg:pb-28 lg:pt-16"
      >
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-oak-beige bg-white/70 px-5 py-2.5 text-sm font-semibold text-oak-green shadow-card backdrop-blur">
            <OakwoodAssetIcon type="ai" className="h-5 w-5" size={20} alt="AI icon" />
            AI-Powered Family Learning
          </div>

          <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-oak-text sm:text-5xl lg:text-6xl">
            Supporting families,
            <br />
            <span className="italic text-oak-green">empowering students</span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#5F5951]">
            Oakwood Learning Hub brings the England National Curriculum home. A calm, intelligent platform where parents guide and children thrive.
          </p>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-oak-muted">
            No subscriptions. No cloud accounts. Your family&apos;s learning journey, kept private and local.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <button className="group inline-flex items-center justify-center gap-2.5 rounded-2xl bg-oak-green px-8 py-4 text-base font-bold text-white shadow-[0_12px_30px_rgba(74,103,65,0.18)] transition hover:bg-oak-green-hover">
              Start Your Family Hub
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="inline-flex items-center justify-center rounded-2xl border border-oak-beige bg-white/80 px-8 py-4 text-base font-bold text-oak-text shadow-card transition hover:bg-oak-beige-light">
              Try Demo Mode
            </button>
          </div>

          {/* Trust Points */}
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {trustPoints.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-3 rounded-2xl border border-oak-beige bg-white/65 px-4 py-3.5 text-sm font-medium text-[#5F5951] shadow-card backdrop-blur"
              >
                <Icon className="h-4 w-4 text-oak-green" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Visual - Product Preview */}
        <div className="relative mx-auto w-full max-w-xl lg:mx-0">
          <div className="absolute -inset-8 rounded-[3rem] bg-[#A8BFA6]/20 blur-3xl" />
          <div className="relative rounded-[2rem] border border-oak-beige bg-white/85 p-6 shadow-[0_24px_80px_rgba(74,103,65,0.14)] backdrop-blur-xl md:p-8">
            {/* Preview Header */}
            <div className="flex items-start justify-between gap-4 border-b border-oak-beige pb-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-oak-green">Family Dashboard</p>
                <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight">Welcome, Thompson Family</h2>
              </div>
              <div className="rounded-2xl bg-oak-green px-3 py-2 text-xs font-bold text-white">Local Mode</div>
            </div>

            {/* Role Avatars */}
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                { icon: 'parent-male' as OakwoodAssetIconType, label: 'Dad', role: 'Parent' },
                { icon: 'parent-female' as OakwoodAssetIconType, label: 'Mum', role: 'Parent' },
                { icon: 'student-year7' as OakwoodAssetIconType, label: 'Emma', role: 'Year 7' },
              ].map(({ icon, label, role }) => (
                <div
                  key={label}
                  className="flex flex-col items-center justify-center rounded-3xl border border-oak-beige bg-white/80 px-4 py-5 text-center shadow-card"
                >
                  <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-oak-beige bg-white">
                    <OakwoodAssetIcon type={icon} className="h-14 w-14" size={56} alt={`${label} avatar`} />
                  </div>
                  <p className="mt-3 text-sm font-semibold text-oak-text">{label}</p>
                  <p className="text-xs text-oak-muted">{role}</p>
                </div>
              ))}
            </div>

            {/* Learner Cards */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <LearnerPreviewCard
                icon="student-primary"
                name="Oliver"
                year="Year 4"
                focus="Mathematics"
                score="82%"
              />
              <LearnerPreviewCard
                icon="student-year7"
                name="Emma"
                year="Year 7"
                focus="Science"
                score="76%"
              />
            </div>

            {/* Stats */}
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <StatCard label="Active Subjects" value="8" />
              <StatCard label="Pending Tasks" value="3" />
              <StatCard label="Weekly Score" value="79%" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-oak-green">Everything You Need</p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-oak-text sm:text-4xl">
            Built for Real Family Learning
          </h2>
          <p className="mt-4 text-base leading-relaxed text-oak-muted">
            From curriculum tracking to AI-powered study help, Oakwood provides all the tools your family needs to succeed.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>

        {/* Icon Showcase */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { icon: 'family-hub' as OakwoodAssetIconType, label: 'Family Hub' },
            { icon: 'lessons' as OakwoodAssetIconType, label: 'Lessons' },
            { icon: 'quiz' as OakwoodAssetIconType, label: 'Quizzes' },
            { icon: 'homework' as OakwoodAssetIconType, label: 'Homework' },
            { icon: 'report' as OakwoodAssetIconType, label: 'Reports' },
            { icon: 'ai' as OakwoodAssetIconType, label: 'AI Helper' },
            { icon: 'resources' as OakwoodAssetIconType, label: 'Resources' },
            { icon: 'messages' as OakwoodAssetIconType, label: 'Messages' },
            { icon: 'settings' as OakwoodAssetIconType, label: 'Settings' },
            { icon: 'pin' as OakwoodAssetIconType, label: 'Security' },
          ].map(({ icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center rounded-3xl border border-oak-beige bg-white/65 px-4 py-6 text-center shadow-card backdrop-blur"
            >
              <OakwoodAssetIcon type={icon} className="h-14 w-14" size={56} alt={`${label} icon`} />
              <p className="mt-3 text-xs font-semibold text-oak-muted">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Privacy Section */}
      <section id="privacy" className="relative z-10 mx-auto w-full max-w-7xl px-6 py-16 lg:px-10">
        <div className="rounded-[2rem] border border-oak-beige bg-white/80 p-8 shadow-[0_20px_60px_rgba(74,103,65,0.08)] backdrop-blur md:p-12">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-oak-green">Privacy First</p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Your Family&apos;s Data Stays Yours
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-base leading-relaxed text-[#5F5951]">
                Oakwood Learning Hub runs entirely on your device. No accounts, no cloud storage, no data collection. Your children&apos;s learning progress, quiz results, and personal notes never leave your computer.
              </p>
              <p className="text-base leading-relaxed text-oak-muted">
                We believe that family education should be private. When AI features are used, all processing happens locally or through privacy-preserving methods.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-12 pt-8 lg:px-10">
        <div className="grid gap-10 border-t border-oak-beige pt-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <h3 className="font-display text-2xl font-semibold">Get in Touch</h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-oak-muted">
              Have questions about Oakwood Learning Hub? We&apos;d love to hear from you. Reach out anytime.
            </p>
            <div className="mt-5 flex flex-col gap-3 text-sm text-[#5F5951] sm:flex-row sm:gap-8">
              <span className="inline-flex items-center gap-2">
                <Mail className="h-4 w-4 text-oak-green" />
                hello@oakwoodhub.co.uk
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-oak-green" />
                United Kingdom
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <img src={masterLogo} alt="Oakwood Learning Hub" className="h-10 w-auto opacity-60" />
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-oak-muted">
          Supporting families, empowering students, advancing education.
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: OakwoodAssetIconType; title: string; description: string }) {
  return (
    <article className="group flex min-h-72 flex-col items-center rounded-[1.5rem] border border-oak-beige bg-white/70 p-7 text-center shadow-card backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:shadow-card-md">
      <div className="mb-6 flex h-18 w-18 items-center justify-center rounded-3xl border border-oak-beige bg-white shadow-card">
        <OakwoodAssetIcon type={icon} className="h-12 w-12" size={48} alt={`${title} icon`} />
      </div>
      <h3 className="font-display text-xl font-semibold text-oak-text">{title}</h3>
      <p className="mt-4 text-sm leading-relaxed text-oak-muted">{description}</p>
    </article>
  )
}

function LearnerPreviewCard({
  icon,
  name,
  year,
  focus,
  score,
}: {
  icon: OakwoodAssetIconType
  name: string
  year: string
  focus: string
  score: string
}) {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-oak-beige bg-white p-5 text-center shadow-card">
      <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-oak-beige bg-white/90">
        <OakwoodAssetIcon type={icon} className="h-[4.5rem] w-[4.5rem]" size={72} alt={`${name} avatar`} />
      </div>
      <div className="mt-3">
        <p className="font-semibold text-oak-text">{name}</p>
        <p className="text-xs text-oak-muted">{year}</p>
      </div>
      <div className="mt-4 w-full rounded-2xl bg-oak-warm p-3 text-center">
        <p className="text-xs text-oak-muted">Current Focus</p>
        <p className="mt-1 text-sm font-semibold text-oak-text">{focus}</p>
      </div>
      <div className="mt-3 flex w-full items-center justify-center gap-3 text-sm">
        <span className="text-oak-muted">Last Quiz</span>
        <span className="font-bold text-oak-green">{score}</span>
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-oak-green-light px-4 py-4 text-center">
      <p className="text-xs font-medium text-oak-muted">{label}</p>
      <p className="mt-1 font-display text-2xl font-semibold text-oak-green">{value}</p>
    </div>
  )
}
