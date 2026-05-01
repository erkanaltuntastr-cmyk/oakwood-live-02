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
    <div className="flex h-screen overflow-hidden bg-oak-warm">
      {/* Sidebar */}
      <aside className="w-72 flex flex-col shrink-0 border-r border-oak-beige bg-white h-full">
        {/* Logo */}
        <div className="h-16 flex items-center px-5 border-b border-oak-beige">
          <img src={masterLogo} alt="Oakwood Learning Hub" className="h-10 w-auto" />
        </div>

        {/* Active Profile */}
        <div className="px-4 py-4 border-b border-oak-beige">
          <div className="flex items-center gap-3 rounded-2xl border border-oak-beige bg-white/90 px-3 py-3 shadow-card">
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-oak-beige bg-white">
              <OakwoodAssetIcon type={parentProfile.icon} className="h-9 w-9" size={36} alt="Profile" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-oak-text truncate">{parentProfile.name}</p>
              <p className="text-xs text-oak-muted">Parent</p>
            </div>
          </div>
        </div>

        {/* Selected Child */}
        <button className="w-full px-4 py-4 text-left border-b border-oak-beige hover:bg-oak-beige-light/50 transition-colors group">
          <div className="flex w-full items-center justify-between gap-3 rounded-2xl border border-oak-beige bg-white/80 px-3 py-3 shadow-card">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-oak-beige bg-white">
                <OakwoodAssetIcon type={children[0].icon} className="h-9 w-9" size={36} alt="Child" />
              </div>
              <div className="min-w-0 text-left">
                <p className="text-xs font-semibold text-oak-text leading-none">{children[0].name}</p>
                <p className="text-xs text-oak-muted mt-0.5">Selected Learner</p>
              </div>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-oak-muted group-hover:text-oak-text shrink-0" />
          </div>
        </button>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {navItems.map(({ icon, label, active }) => (
            <button
              key={label}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors',
                active
                  ? 'bg-oak-green-light text-oak-green font-medium'
                  : 'text-oak-muted hover:bg-oak-beige-light hover:text-oak-text'
              )}
            >
              <OakwoodAssetIcon type={icon as OakwoodAssetIconType} className="w-5 h-5 shrink-0" size={20} alt={label} />
              {label}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-oak-beige space-y-0.5">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-oak-muted hover:bg-oak-beige-light hover:text-oak-text transition-colors">
            <OakwoodAssetIcon type="settings" className="w-5 h-5" size={20} alt="Settings" />
            Settings
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-oak-muted hover:bg-red-50 hover:text-red-600 transition-colors">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Topbar */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-oak-beige bg-white/80 backdrop-blur shrink-0">
          <div className="flex items-center gap-4">
            <h1 className="font-display text-xl font-semibold text-oak-text">Family Hub</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-oak-beige-light text-sm text-oak-muted hover:bg-oak-beige transition-colors">
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline text-xs bg-white px-1.5 py-0.5 rounded border border-oak-beige">⌘K</kbd>
            </button>
            <button className="relative p-2 rounded-xl hover:bg-oak-beige-light transition-colors">
              <Bell className="w-5 h-5 text-oak-muted" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-oak-green rounded-full" />
            </button>
            <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-oak-green-light text-oak-green hover:bg-oak-green hover:text-white transition-colors">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">AI Help</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6 lg:p-8">
          <div className="max-w-6xl space-y-8">
            {/* Welcome */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-oak-text italic">
                Good afternoon, {parentProfile.name}
              </h2>
              <p className="text-oak-muted mt-1">
                Here&apos;s what&apos;s happening with your family&apos;s learning today.
              </p>
            </div>

            {/* Children Overview */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-oak-muted uppercase tracking-wider">Your Children</h3>
                <button className="text-sm text-oak-green hover:underline">View All</button>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                {children.map((child) => (
                  <ChildCard key={child.id} child={child} />
                ))}
              </div>
            </section>

            {/* Stats Row */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard icon={BookOpen} label="Active Subjects" value="8" trend="+2 this term" />
              <StatCard icon={CheckCircle2} label="Completed Tasks" value="24" trend="This week" />
              <StatCard icon={AlertCircle} label="Pending Items" value="3" trend="Due soon" urgent />
              <StatCard icon={TrendingUp} label="Family Average" value="79%" trend="+5% from last week" positive />
            </div>

            {/* Two Column Layout */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Upcoming Events */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-4 h-4 text-oak-muted" />
                  <h3 className="font-semibold text-oak-text">Upcoming</h3>
                  <span className="text-xs text-oak-muted bg-oak-beige-light px-2 py-0.5 rounded-full">
                    {upcomingEvents.length} items
                  </span>
                </div>
                <div className="rounded-2xl border border-oak-beige bg-white shadow-card overflow-hidden">
                  <div className="divide-y divide-oak-beige">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="flex items-center justify-between px-4 py-3.5 hover:bg-oak-beige-light/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            'w-2 h-2 rounded-full shrink-0',
                            event.type === 'quiz' ? 'bg-oak-green' : 'bg-amber-400'
                          )} />
                          <div>
                            <p className="text-sm font-medium text-oak-text">
                              {event.child} &mdash; {event.type === 'quiz' ? 'Assessment' : 'Homework'}
                            </p>
                            <p className="text-xs text-oak-muted">{event.subject}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-oak-muted">
                          <Clock className="w-3 h-3" />
                          {event.date}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-3 text-xs text-oak-muted text-center border-t border-oak-beige bg-oak-beige-light/30">
                    View full calendar
                  </div>
                </div>
              </section>

              {/* Recent Activity */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4 text-oak-muted" />
                  <h3 className="font-semibold text-oak-text">Recent Activity</h3>
                </div>
                <div className="rounded-2xl border border-oak-beige bg-white shadow-card overflow-hidden">
                  <div className="divide-y divide-oak-beige">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between px-4 py-3.5 hover:bg-oak-beige-light/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-oak-green-light flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-oak-green" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-oak-text">
                              {activity.child} {activity.action.toLowerCase()}
                            </p>
                            <p className="text-xs text-oak-muted">{activity.subject}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          {activity.score && (
                            <p className="text-sm font-semibold text-oak-green">{activity.score}</p>
                          )}
                          <p className="text-xs text-oak-muted">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-3 text-xs text-oak-muted text-center border-t border-oak-beige bg-oak-beige-light/30">
                    View all activity
                  </div>
                </div>
              </section>
            </div>

            {/* AI Assistant Card */}
            <section className="rounded-2xl border border-oak-beige bg-white shadow-card p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-oak-green-light border border-oak-green/20">
                  <OakwoodAssetIcon type="ai" className="h-7 w-7" size={28} alt="AI Assistant" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-oak-text">AI Study Assistant</h3>
                  <p className="mt-1 text-sm text-oak-muted leading-relaxed">
                    Get personalised insights about your children&apos;s progress, study recommendations, and answers to curriculum questions.
                  </p>
                  <button className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-oak-green text-white text-sm font-medium hover:bg-oak-green-hover transition-colors">
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
  return (
    <div className="rounded-2xl border border-oak-beige bg-white shadow-card overflow-hidden hover:shadow-card-md transition-shadow">
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-oak-beige bg-white shadow-card shrink-0">
            <OakwoodAssetIcon type={child.icon} className="h-[4.5rem] w-[4.5rem]" size={72} alt={child.name} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold text-oak-text text-lg">{child.name}</h4>
                <p className="text-sm text-oak-muted">{child.yearGroup} &bull; {child.school}</p>
              </div>
              <button className="p-1.5 rounded-lg hover:bg-oak-beige-light transition-colors">
                <ChevronRight className="w-4 h-4 text-oak-muted" />
              </button>
            </div>
            <div className="mt-3 flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-oak-green" />
                <span className="text-oak-text font-medium">{child.recentScore}%</span>
                <span className="text-oak-muted">recent</span>
              </div>
              <div className="flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                <span className="text-oak-text font-medium">{child.pendingHomework}</span>
                <span className="text-oak-muted">pending</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-5 pb-4">
        <div className="flex flex-wrap gap-2">
          {child.subjects.slice(0, 4).map((subject) => (
            <span key={subject} className="px-2.5 py-1 rounded-lg bg-oak-beige-light text-xs font-medium text-oak-muted">
              {subject}
            </span>
          ))}
          {child.subjects.length > 4 && (
            <span className="px-2.5 py-1 rounded-lg bg-oak-green-light text-xs font-medium text-oak-green">
              +{child.subjects.length - 4} more
            </span>
          )}
        </div>
      </div>
      <div className="px-5 py-3 border-t border-oak-beige bg-oak-beige-light/30 flex items-center justify-between">
        <span className="text-xs text-oak-muted">Next: {child.nextQuiz} assessment</span>
        <button className="text-xs font-semibold text-oak-green hover:underline">View Progress</button>
      </div>
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  positive,
  urgent,
}: {
  icon: typeof BookOpen
  label: string
  value: string
  trend: string
  positive?: boolean
  urgent?: boolean
}) {
  return (
    <div className="rounded-2xl border border-oak-beige bg-white p-5 shadow-card">
      <div className="flex items-center justify-between mb-3">
        <Icon className={cn('w-5 h-5', urgent ? 'text-amber-500' : positive ? 'text-oak-green' : 'text-oak-muted')} />
      </div>
      <p className={cn('font-display text-3xl font-semibold', urgent ? 'text-amber-600' : 'text-oak-text')}>{value}</p>
      <p className="text-sm text-oak-muted mt-1">{label}</p>
      <p className={cn('text-xs mt-2', positive ? 'text-oak-green' : 'text-oak-muted')}>{trend}</p>
    </div>
  )
}
