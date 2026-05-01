import {
  Calendar,
  ChevronRight,
  Clock,
  Bell,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  LogOut,
  Search,
  Sparkles,
} from 'lucide-react'
import { OakwoodAssetIcon, type OakwoodAssetIconType } from '@/components/brand/OakwoodAssetIcon'
import { cn } from '@/lib/utils'

import masterLogo from '@/assets/brand/logo/master-logo.png'
import familyHubBg from '@/assets/brand/backgrounds/family-hub-bg.png'

// Category accent colors
const categoryAccents = {
  lessons: { bg: 'bg-[#a8bfa6]/20', border: 'border-[#769a7c]/40', text: 'text-[#4a6741]', pill: 'bg-[#a8bfa6]/40' },
  homework: { bg: 'bg-[#d9a68c]/20', border: 'border-[#d9a68c]/50', text: 'text-[#8b5a3c]', pill: 'bg-[#d9a68c]/40' },
  quiz: { bg: 'bg-[#f0d58c]/25', border: 'border-[#c9a85d]/50', text: 'text-[#8b6914]', pill: 'bg-[#f0d58c]/50' },
  report: { bg: 'bg-[#36563d]/10', border: 'border-[#36563d]/25', text: 'text-[#36563d]', pill: 'bg-[#36563d]/20' },
  messages: { bg: 'bg-[#7daaa0]/20', border: 'border-[#7daaa0]/40', text: 'text-[#4a7a72]', pill: 'bg-[#7daaa0]/30' },
  ai: { bg: 'bg-[#c9a85d]/15', border: 'border-[#c9a85d]/40', text: 'text-[#8b6914]', pill: 'bg-[#c9a85d]/30' },
}

// Mock data
const parentProfile = { name: 'Sarah', surname: 'Thompson', icon: 'parent-female' as OakwoodAssetIconType }

const children = [
  {
    id: '1',
    name: 'Oliver',
    yearGroup: 'Year 4',
    school: 'Oakwood Primary',
    icon: 'student-primary' as OakwoodAssetIconType,
    subjects: ['Mathematics', 'English', 'Science'],
    recentScore: 82,
    pendingHomework: 2,
    nextQuiz: 'Mathematics',
    ageGroup: 'younger',
  },
  {
    id: '2',
    name: 'Emma',
    yearGroup: 'Year 7',
    school: 'Oakwood Secondary',
    icon: 'student-year7' as OakwoodAssetIconType,
    subjects: ['Mathematics', 'English', 'Science', 'History', 'Geography'],
    recentScore: 76,
    pendingHomework: 1,
    nextQuiz: 'Science',
    ageGroup: 'older',
  },
]

const upcomingEvents = [
  { id: 1, child: 'Oliver', type: 'quiz', subject: 'Mathematics', date: 'Tomorrow', time: '3:00 PM' },
  { id: 2, child: 'Emma', type: 'homework', subject: 'English Essay', date: 'Friday', time: 'Due' },
  { id: 3, child: 'Oliver', type: 'quiz', subject: 'Science', date: 'Monday', time: '4:00 PM' },
  { id: 4, child: 'Emma', type: 'quiz', subject: 'History', date: 'Tuesday', time: '3:30 PM' },
]

const recentActivity = [
  { id: 1, child: 'Emma', action: 'Completed quiz', subject: 'Science', score: '76%', time: '2 hours ago' },
  { id: 2, child: 'Oliver', action: 'Submitted homework', subject: 'English', time: '3 hours ago' },
  { id: 3, child: 'Emma', action: 'Started lesson', subject: 'Mathematics', time: '5 hours ago' },
]

const navItems = [
  { icon: 'family-hub', label: 'Family Hub', active: true },
  { icon: 'family-hub', label: 'Children' },
  { icon: 'lessons', label: 'Subjects' },
  { icon: 'quiz', label: 'Assessments' },
  { icon: 'homework', label: 'Homework' },
  { icon: 'report', label: 'Reports' },
  { icon: 'messages', label: 'Messages' },
]

export function PrototypeParentDashboard() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#fff8f5]">
      {/* Sidebar */}
      <aside className="w-72 flex flex-col shrink-0 border-r-2 border-[#d8cbb2] bg-white h-full">
        {/* Logo */}
        <div className="h-18 flex items-center px-5 border-b-2 border-[#d8cbb2]">
          <img src={masterLogo} alt="Oakwood Learning Hub" className="h-12 w-auto" />
        </div>

        {/* Active Profile */}
        <div className="px-4 py-4 border-b-2 border-[#d8cbb2]">
          <div className="flex items-center gap-3 rounded-2xl border-2 border-[#a8bfa6]/50 bg-[#a8bfa6]/15 px-3 py-3 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border-2 border-[#a8bfa6]/60 bg-white">
              <OakwoodAssetIcon type={parentProfile.icon} className="h-10 w-10" size={40} alt="Profile" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-[#333333] truncate">{parentProfile.name}</p>
              <p className="text-xs text-[#36563d] font-medium">Parent</p>
            </div>
          </div>
        </div>

        {/* Selected Child */}
        <button className="w-full px-4 py-4 text-left border-b-2 border-[#d8cbb2] hover:bg-[#fdfbf7] transition-colors group">
          <div className="flex w-full items-center justify-between gap-3 rounded-2xl border-2 border-[#d9a68c]/40 bg-[#d9a68c]/10 px-3 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border-2 border-[#d9a68c]/50 bg-white">
                <OakwoodAssetIcon type={children[0].icon} className="h-10 w-10" size={40} alt="Child" />
              </div>
              <div className="min-w-0 text-left">
                <p className="text-sm font-bold text-[#333333] leading-none">{children[0].name}</p>
                <p className="text-xs text-[#8b5a3c] mt-0.5 font-medium">Selected Learner</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#8b5a3c] group-hover:text-[#333333] shrink-0" />
          </div>
        </button>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map(({ icon, label, active }) => (
            <button
              key={label}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                active
                  ? 'bg-[#36563d] text-white shadow-md'
                  : 'text-[#6b6560] hover:bg-[#a8bfa6]/20 hover:text-[#36563d]'
              )}
            >
              <OakwoodAssetIcon type={icon as OakwoodAssetIconType} className="w-6 h-6 shrink-0" size={24} alt={label} />
              {label}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t-2 border-[#d8cbb2] space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-[#6b6560] hover:bg-[#d8cbb2]/30 hover:text-[#333333] transition-colors font-medium">
            <OakwoodAssetIcon type="settings" className="w-5 h-5" size={20} alt="Settings" />
            Settings
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-[#6b6560] hover:bg-red-50 hover:text-red-600 transition-colors font-medium">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Topbar */}
        <header className="h-18 flex items-center justify-between px-6 border-b-2 border-[#d8cbb2] bg-white shrink-0">
          <div className="flex items-center gap-4">
            <h1 className="font-display text-2xl font-semibold text-[#333333]">Family Hub</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#fdfbf7] border border-[#d8cbb2] text-sm text-[#6b6560] hover:bg-[#d8cbb2]/30 transition-colors font-medium">
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline text-xs bg-white px-1.5 py-0.5 rounded border border-[#d8cbb2]">⌘K</kbd>
            </button>
            <button className="relative p-2.5 rounded-xl hover:bg-[#fdfbf7] border border-transparent hover:border-[#d8cbb2] transition-all">
              <Bell className="w-5 h-5 text-[#6b6560]" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#36563d] rounded-full border-2 border-white" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#c9a85d]/20 border border-[#c9a85d]/40 text-[#8b6914] hover:bg-[#c9a85d]/30 transition-colors font-semibold">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">AI Help</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <main 
          className="flex-1 overflow-auto p-6 lg:p-8"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(255,248,245,0.92), rgba(255,248,245,0.97)), url(${familyHubBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-6xl space-y-8">
            {/* Welcome */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-[#333333]">
                Good afternoon, <span className="italic text-[#36563d]">{parentProfile.name}</span>
              </h2>
              <p className="text-[#6b6560] mt-1 text-base">
                Here's what's happening with your family's learning today.
              </p>
            </div>

            {/* Children Overview */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-bold text-[#36563d] uppercase tracking-wider">Your Children</h3>
                <button className="text-sm font-semibold text-[#36563d] hover:underline">View All</button>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                {children.map((child) => (
                  <ChildCard key={child.id} child={child} />
                ))}
              </div>
            </section>

            {/* Stats Row */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard icon={BookOpen} label="Active Subjects" value="8" trend="+2 this term" accent="lessons" />
              <StatCard icon={CheckCircle2} label="Completed Tasks" value="24" trend="This week" accent="report" />
              <StatCard icon={AlertCircle} label="Pending Items" value="3" trend="Due soon" accent="homework" urgent />
              <StatCard icon={TrendingUp} label="Family Average" value="79%" trend="+5% from last week" accent="quiz" positive />
            </div>

            {/* Two Column Layout */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Upcoming Events */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f0d58c]/30">
                    <Calendar className="w-4 h-4 text-[#8b6914]" />
                  </div>
                  <h3 className="font-semibold text-[#333333]">Upcoming</h3>
                  <span className="text-xs font-bold text-[#8b6914] bg-[#f0d58c]/40 px-2.5 py-1 rounded-full">
                    {upcomingEvents.length} items
                  </span>
                </div>
                <div className="rounded-2xl border-2 border-[#d8cbb2] bg-white shadow-md overflow-hidden">
                  <div className="divide-y divide-[#d8cbb2]">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="flex items-center justify-between px-4 py-4 hover:bg-[#fdfbf7] transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            'w-3 h-3 rounded-full shrink-0',
                            event.type === 'quiz' ? 'bg-[#c9a85d]' : 'bg-[#d9a68c]'
                          )} />
                          <div>
                            <p className="text-sm font-semibold text-[#333333]">
                              {event.child} — {event.type === 'quiz' ? 'Assessment' : 'Homework'}
                            </p>
                            <p className="text-xs text-[#6b6560]">{event.subject}</p>
                          </div>
                        </div>
                        <div className={cn(
                          "flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full",
                          event.date === 'Tomorrow' ? 'bg-[#d9a68c]/30 text-[#8b5a3c]' : 'bg-[#d8cbb2]/40 text-[#6b6560]'
                        )}>
                          <Clock className="w-3 h-3" />
                          {event.date}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-3 text-xs text-[#6b6560] text-center border-t-2 border-[#d8cbb2] bg-[#fdfbf7] font-medium">
                    View full calendar
                  </div>
                </div>
              </section>

              {/* Recent Activity */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#a8bfa6]/30">
                    <Clock className="w-4 h-4 text-[#36563d]" />
                  </div>
                  <h3 className="font-semibold text-[#333333]">Recent Activity</h3>
                </div>
                <div className="rounded-2xl border-2 border-[#d8cbb2] bg-white shadow-md overflow-hidden">
                  <div className="divide-y divide-[#d8cbb2]">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between px-4 py-4 hover:bg-[#fdfbf7] transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#a8bfa6]/30 flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5 text-[#36563d]" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[#333333]">
                              {activity.child} {activity.action.toLowerCase()}
                            </p>
                            <p className="text-xs text-[#6b6560]">{activity.subject}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          {activity.score && (
                            <p className="text-sm font-bold text-[#36563d]">{activity.score}</p>
                          )}
                          <p className="text-xs text-[#6b6560]">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-3 text-xs text-[#6b6560] text-center border-t-2 border-[#d8cbb2] bg-[#fdfbf7] font-medium">
                    View all activity
                  </div>
                </div>
              </section>
            </div>

            {/* AI Assistant Card */}
            <section className="rounded-2xl border-2 border-[#c9a85d]/40 bg-[#c9a85d]/10 shadow-md p-6">
              <div className="flex items-start gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white border-2 border-[#c9a85d]/50 shadow-md">
                  <OakwoodAssetIcon type="ai" className="h-10 w-10" size={40} alt="AI Assistant" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#333333] text-lg">AI Study Assistant</h3>
                  <p className="mt-1 text-sm text-[#5F5951] leading-relaxed">
                    Get personalised insights about your children's progress, study recommendations, and answers to curriculum questions.
                  </p>
                  <button className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#36563d] text-white text-sm font-bold hover:bg-[#4a6741] transition-colors shadow-md">
                    <Sparkles className="w-4 h-4" />
                    Start Conversation
                  </button>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

function ChildCard({ child }: { child: typeof children[0] }) {
  const isYounger = child.ageGroup === 'younger'
  const accentStyles = isYounger
    ? { card: 'border-[#d9a68c]/50', header: 'bg-[#d9a68c]/15', avatar: 'border-[#d9a68c]/60', badge: 'bg-[#d9a68c]/30 text-[#8b5a3c]' }
    : { card: 'border-[#c9a85d]/50', header: 'bg-[#f0d58c]/15', avatar: 'border-[#c9a85d]/50', badge: 'bg-[#f0d58c]/40 text-[#8b6914]' }

  return (
    <div className={cn("rounded-2xl border-2 bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow", accentStyles.card)}>
      <div className={cn("p-5", accentStyles.header)}>
        <div className="flex items-start gap-4">
          <div className={cn("flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border-2 bg-white shadow-md shrink-0", accentStyles.avatar)}>
            <OakwoodAssetIcon type={child.icon} className="h-[4.5rem] w-[4.5rem]" size={72} alt={child.name} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-bold text-[#333333] text-lg">{child.name}</h4>
                <p className="text-sm text-[#6b6560]">{child.yearGroup} • {child.school}</p>
              </div>
              <button className="p-2 rounded-lg hover:bg-white/80 transition-colors">
                <ChevronRight className="w-5 h-5 text-[#6b6560]" />
              </button>
            </div>
            <div className="mt-3 flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#a8bfa6]/30">
                  <TrendingUp className="w-3.5 h-3.5 text-[#36563d]" />
                </div>
                <span className="text-[#333333] font-bold">{child.recentScore}%</span>
                <span className="text-[#6b6560]">recent</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#d9a68c]/30">
                  <AlertCircle className="w-3.5 h-3.5 text-[#8b5a3c]" />
                </div>
                <span className="text-[#333333] font-bold">{child.pendingHomework}</span>
                <span className="text-[#6b6560]">pending</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-5 pb-4 pt-3">
        <div className="flex flex-wrap gap-2">
          {child.subjects.slice(0, 4).map((subject) => (
            <span key={subject} className="px-2.5 py-1 rounded-lg bg-[#d8cbb2]/40 text-xs font-medium text-[#5F5951]">
              {subject}
            </span>
          ))}
          {child.subjects.length > 4 && (
            <span className={cn("px-2.5 py-1 rounded-lg text-xs font-bold", accentStyles.badge)}>
              +{child.subjects.length - 4} more
            </span>
          )}
        </div>
      </div>
      <div className="px-5 py-3 border-t-2 border-[#d8cbb2] bg-[#fdfbf7] flex items-center justify-between">
        <span className="text-xs text-[#6b6560] font-medium">Next: {child.nextQuiz} assessment</span>
        <button className="text-xs font-bold text-[#36563d] hover:underline">View Progress</button>
      </div>
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  accent,
  positive,
  urgent,
}: {
  icon: typeof BookOpen
  label: string
  value: string
  trend: string
  accent: keyof typeof categoryAccents
  positive?: boolean
  urgent?: boolean
}) {
  return (
    <div className={cn(
      "rounded-2xl border-2 p-5 shadow-md",
      categoryAccents[accent].bg,
      categoryAccents[accent].border
    )}>
      <div className="flex items-center justify-between mb-3">
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", categoryAccents[accent].pill)}>
          <Icon className={cn('w-5 h-5', categoryAccents[accent].text)} />
        </div>
      </div>
      <p className={cn('font-display text-3xl font-bold', urgent ? 'text-[#8b5a3c]' : categoryAccents[accent].text)}>{value}</p>
      <p className="text-sm text-[#5F5951] mt-1 font-medium">{label}</p>
      <p className={cn('text-xs mt-2 font-medium', positive ? 'text-[#36563d]' : 'text-[#6b6560]')}>{trend}</p>
    </div>
  )
}
