import { ArrowRight, Mail, MapPin, Shield, Sparkles, BookOpen, Users, BarChart3 } from 'lucide-react'
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

// Category accent colors
const categoryAccents = {
  lessons: { bg: 'bg-[#a8bfa6]/20', border: 'border-[#769a7c]/30', text: 'text-[#4a6741]' },
  homework: { bg: 'bg-[#d9a68c]/20', border: 'border-[#d9a68c]/40', text: 'text-[#8b5a3c]' },
  quiz: { bg: 'bg-[#f0d58c]/25', border: 'border-[#c9a85d]/40', text: 'text-[#8b6914]' },
  report: { bg: 'bg-[#36563d]/10', border: 'border-[#36563d]/20', text: 'text-[#36563d]' },
  ai: { bg: 'bg-[#c9a85d]/15', border: 'border-[#c9a85d]/30', text: 'text-[#8b6914]' },
  pin: { bg: 'bg-[#36563d]/10', border: 'border-[#36563d]/20', text: 'text-[#36563d]' },
  messages: { bg: 'bg-[#7daaa0]/20', border: 'border-[#7daaa0]/30', text: 'text-[#4a7a72]' },
  resources: { bg: 'bg-[#7daaa0]/15', border: 'border-[#7daaa0]/25', text: 'text-[#4a7a72]' },
  'family-hub': { bg: 'bg-[#a8bfa6]/25', border: 'border-[#769a7c]/30', text: 'text-[#4a6741]' },
  settings: { bg: 'bg-[#d8cbb2]/30', border: 'border-[#d8cbb2]/50', text: 'text-[#5F5951]' },
}

const features: Array<{ icon: OakwoodAssetIconType; title: string; description: string; accent: keyof typeof categoryAccents }> = [
  {
    icon: 'family-hub',
    title: 'Family Hub',
    description: 'A central space where parents and children come together. Track progress, manage schedules, and stay connected as a family.',
    accent: 'family-hub',
  },
  {
    icon: 'lessons',
    title: 'Curriculum-Aligned Lessons',
    description: 'Complete coverage of the England National Curriculum from Reception to Year 11, organised by key stage and subject.',
    accent: 'lessons',
  },
  {
    icon: 'quiz',
    title: 'Smart Assessments',
    description: "AI-powered quizzes that adapt to your child's level, identifying strengths and areas for improvement.",
    accent: 'quiz',
  },
  {
    icon: 'report',
    title: 'Progress Reports',
    description: "Clear, visual reports that help you understand exactly where your child is in their learning journey.",
    accent: 'report',
  },
  {
    icon: 'ai',
    title: 'AI Study Assistant',
    description: 'A friendly AI helper that answers questions, explains concepts, and provides personalised study suggestions.',
    accent: 'ai',
  },
  {
    icon: 'pin',
    title: 'Local-First Privacy',
    description: "Your family's data stays on your device. No cloud accounts required, no data shared with third parties.",
    accent: 'pin',
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
    <div className="min-h-screen bg-[#fff8f5] text-[#333333]">
      {/* Hero Background - Increased opacity */}
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: `url(${familyHubBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
        }}
      />

      {/* Header */}
      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-5 lg:px-10">
        <a href="#" className="flex items-center gap-3">
          <img src={masterLogo} alt="Oakwood Learning Hub" className="h-14 w-auto" />
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-[#5F5951] lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-[#36563d]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button className="hidden rounded-2xl border border-[#d8cbb2] bg-white px-5 py-2.5 text-sm font-semibold text-[#333333] shadow-sm transition-colors hover:bg-[#fdfbf7] sm:inline-flex">
            Sign In
          </button>
          <button className="rounded-2xl bg-[#36563d] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#4a6741]">
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="how"
        className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-6 pb-20 pt-8 lg:grid-cols-2 lg:px-10 lg:pb-28 lg:pt-12"
      >
        <div className="max-w-2xl">
          {/* Large Logo Display */}
          <div className="mb-8">
            <img 
              src={masterLogo} 
              alt="Oakwood Learning Hub" 
              className="h-24 w-auto lg:h-32"
            />
          </div>

          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[#c9a85d]/40 bg-[#f0d58c]/20 px-5 py-2.5 text-sm font-semibold text-[#36563d] shadow-sm">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#c9a85d]/20">
              <OakwoodAssetIcon type="ai" className="h-5 w-5" size={20} alt="AI icon" />
            </div>
            AI-Powered Family Learning
          </div>

          <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-[#333333] sm:text-5xl lg:text-6xl">
            Supporting families,
            <br />
            <span className="italic text-[#36563d]">empowering students</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#5F5951]">
            Oakwood Learning Hub brings the England National Curriculum home. A calm, intelligent platform where parents guide and children thrive.
          </p>

          <p className="mt-3 max-w-xl text-base leading-relaxed text-[#6b6560]">
            Designed for private, family-first learning workflows.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <button className="group inline-flex items-center justify-center gap-2.5 rounded-2xl bg-[#36563d] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#36563d]/25 transition hover:bg-[#4a6741]">
              Start Your Family Hub
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="inline-flex items-center justify-center rounded-2xl border-2 border-[#d8cbb2] bg-white px-8 py-4 text-base font-bold text-[#333333] shadow-sm transition hover:bg-[#fdfbf7] hover:border-[#c9a85d]">
              Try Demo Mode
            </button>
          </div>

          {/* Trust Points */}
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {trustPoints.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-3 rounded-2xl border border-[#a8bfa6]/40 bg-[#a8bfa6]/15 px-4 py-3.5 text-sm font-medium text-[#4a6741]"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#36563d]/10">
                  <Icon className="h-4 w-4 text-[#36563d]" />
                </div>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Visual - Family Hub Preview */}
        <div className="relative mx-auto w-full max-w-xl lg:mx-0">
          {/* Background Glow */}
          <div className="absolute -inset-8 rounded-[3rem] bg-[#a8bfa6]/30 blur-3xl" />

          {/* Dashboard Preview Card */}
          <div className="relative rounded-[2rem] border-2 border-[#d8cbb2] bg-white p-6 shadow-xl md:p-8">
            {/* Preview Header */}
            <div className="flex items-start justify-between gap-4 border-b-2 border-[#d8cbb2]/60 pb-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#36563d]">Family Dashboard</p>
                <h2 className="mt-2 font-display text-xl font-semibold tracking-tight text-[#333333]">Welcome, Thompson Family</h2>
              </div>
              <div className="rounded-xl bg-[#36563d] px-3 py-2 text-xs font-bold text-white">Local Mode</div>
            </div>

            {/* Role Avatars */}
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                { icon: 'parent-male' as OakwoodAssetIconType, label: 'Dad', role: 'Parent', accent: 'bg-[#a8bfa6]/25' },
                { icon: 'parent-female' as OakwoodAssetIconType, label: 'Mum', role: 'Parent', accent: 'bg-[#a8bfa6]/25' },
                { icon: 'student-year7' as OakwoodAssetIconType, label: 'Emma', role: 'Year 7', accent: 'bg-[#f0d58c]/25' },
              ].map(({ icon, label, role, accent }) => (
                <div
                  key={label}
                  className={cn("flex flex-col items-center justify-center rounded-2xl border border-[#d8cbb2] px-3 py-4 text-center", accent)}
                >
                  <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl border-2 border-[#d8cbb2] bg-white">
                    <OakwoodAssetIcon type={icon} className="h-14 w-14" size={56} alt={`${label} avatar`} />
                  </div>
                  <p className="mt-2 text-sm font-semibold text-[#333333]">{label}</p>
                  <p className="text-xs text-[#6b6560]">{role}</p>
                </div>
              ))}
            </div>

            {/* Stats Row */}
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <StatCard label="Active Subjects" value="8" accent="lessons" />
              <StatCard label="Pending Tasks" value="3" accent="homework" />
              <StatCard label="Weekly Score" value="79%" accent="quiz" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#36563d]">Everything You Need</p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-[#333333] sm:text-4xl">
            Built for Real Family Learning
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#6b6560]">
            From curriculum tracking to AI-powered study help, Oakwood provides all the tools your family needs to succeed.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>

        {/* Icon Showcase */}
        <div className="mt-14 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {[
            { icon: 'family-hub' as OakwoodAssetIconType, label: 'Family Hub', accent: 'family-hub' as keyof typeof categoryAccents },
            { icon: 'lessons' as OakwoodAssetIconType, label: 'Lessons', accent: 'lessons' as keyof typeof categoryAccents },
            { icon: 'quiz' as OakwoodAssetIconType, label: 'Quizzes', accent: 'quiz' as keyof typeof categoryAccents },
            { icon: 'homework' as OakwoodAssetIconType, label: 'Homework', accent: 'homework' as keyof typeof categoryAccents },
            { icon: 'report' as OakwoodAssetIconType, label: 'Reports', accent: 'report' as keyof typeof categoryAccents },
            { icon: 'ai' as OakwoodAssetIconType, label: 'AI Helper', accent: 'ai' as keyof typeof categoryAccents },
            { icon: 'resources' as OakwoodAssetIconType, label: 'Resources', accent: 'resources' as keyof typeof categoryAccents },
            { icon: 'messages' as OakwoodAssetIconType, label: 'Messages', accent: 'messages' as keyof typeof categoryAccents },
            { icon: 'settings' as OakwoodAssetIconType, label: 'Settings', accent: 'settings' as keyof typeof categoryAccents },
            { icon: 'pin' as OakwoodAssetIconType, label: 'Security', accent: 'pin' as keyof typeof categoryAccents },
          ].map(({ icon, label, accent }) => (
            <div
              key={label}
              className={cn(
                "flex flex-col items-center justify-center rounded-2xl border-2 px-4 py-6 text-center transition-all hover:scale-[1.02]",
                categoryAccents[accent].bg,
                categoryAccents[accent].border
              )}
            >
              <div className={cn(
                "flex h-16 w-16 items-center justify-center rounded-2xl border-2",
                categoryAccents[accent].border,
                "bg-white"
              )}>
                <OakwoodAssetIcon type={icon} className="h-11 w-11" size={44} alt={`${label} icon`} />
              </div>
              <p className={cn("mt-3 text-sm font-semibold", categoryAccents[accent].text)}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Privacy Section */}
      <section id="privacy" className="relative z-10 mx-auto w-full max-w-7xl px-6 py-16 lg:px-10">
        <div className="rounded-[2rem] border-2 border-[#36563d]/20 bg-[#36563d]/5 p-8 shadow-lg md:p-12">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="flex items-start gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2 border-[#36563d]/30 bg-white shadow-md">
                <OakwoodAssetIcon type="pin" className="h-10 w-10" size={40} alt="Privacy icon" />
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#36563d]">Privacy First</p>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#333333] sm:text-4xl">
                  Your Family's Data Stays Yours
                </h2>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-base leading-relaxed text-[#5F5951]">
                Oakwood Learning Hub runs entirely on your device. No accounts, no cloud storage, no data collection. Your children's learning progress, quiz results, and personal notes never leave your computer.
              </p>
              <p className="text-base leading-relaxed text-[#6b6560]">
                We believe that family education should be private. When AI features are used, all processing happens locally or through privacy-preserving methods.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-12 pt-8 lg:px-10">
        <div className="grid gap-10 border-t-2 border-[#d8cbb2] pt-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <img src={masterLogo} alt="Oakwood Learning Hub" className="h-12 w-auto mb-4" />
            <h3 className="font-display text-2xl font-semibold text-[#333333]">Get in Touch</h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#6b6560]">
              Have questions about Oakwood Learning Hub? We'd love to hear from you. Reach out anytime.
            </p>
            <div className="mt-5 flex flex-col gap-3 text-sm text-[#5F5951] sm:flex-row sm:gap-8">
              <span className="inline-flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#36563d]/10">
                  <Mail className="h-4 w-4 text-[#36563d]" />
                </div>
                hello@oakwoodhub.co.uk
              </span>
              <span className="inline-flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#36563d]/10">
                  <MapPin className="h-4 w-4 text-[#36563d]" />
                </div>
                United Kingdom
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className="flex items-center gap-4 text-sm text-[#6b6560]">
              <a href="#" className="hover:text-[#36563d] transition-colors">Terms</a>
              <a href="#" className="hover:text-[#36563d] transition-colors">Privacy</a>
              <a href="#" className="hover:text-[#36563d] transition-colors">Support</a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-[#6b6560] font-medium">
          Supporting families, empowering students, advancing education.
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description, accent }: { icon: OakwoodAssetIconType; title: string; description: string; accent: keyof typeof categoryAccents }) {
  return (
    <article className={cn(
      "group flex min-h-72 flex-col items-center rounded-[1.5rem] border-2 p-7 text-center shadow-md transition hover:-translate-y-1 hover:shadow-lg",
      categoryAccents[accent].bg,
      categoryAccents[accent].border
    )}>
      <div className={cn(
        "mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border-2 bg-white shadow-md",
        categoryAccents[accent].border
      )}>
        <OakwoodAssetIcon type={icon} className="h-14 w-14" size={56} alt={`${title} icon`} />
      </div>
      <h3 className={cn("font-display text-xl font-semibold", categoryAccents[accent].text)}>{title}</h3>
      <p className="mt-4 text-sm leading-relaxed text-[#5F5951]">{description}</p>
    </article>
  )
}

function StatCard({ label, value, accent }: { label: string; value: string; accent: keyof typeof categoryAccents }) {
  return (
    <div className={cn(
      "rounded-xl border-2 px-4 py-4 text-center",
      categoryAccents[accent].bg,
      categoryAccents[accent].border
    )}>
      <p className="text-xs font-medium text-[#6b6560]">{label}</p>
      <p className={cn("mt-1 font-display text-2xl font-bold", categoryAccents[accent].text)}>{value}</p>
    </div>
  )
}
