import {
  Calendar,
  ChevronRight,
  Clock,
  Bell,
  TrendingUp,
  CheckCircle2,
  Play,
  BookOpen,
  LogOut,
  Search,
  Sparkles,
  Target,
  Flame,
  Star,
} from 'lucide-react'
import { OakwoodAssetIcon, type OakwoodAssetIconType } from '@/components/brand/OakwoodAssetIcon'
import { cn } from '@/lib/utils'

import masterLogo from '@/assets/brand/logo/master-logo.png'
import studentBg from '@/assets/brand/backgrounds/student-learning-bg.png'

// Mock data
const studentProfile = {
  name: 'Emma',
  yearGroup: 'Year 7',
  school: 'Oakwood Secondary',
  icon: 'student-year7' as OakwoodAssetIconType,
  streak: 12,
  totalPoints: 2450,
}

const todaysLessons = [
  { id: 1, subject: 'Mathematics', topic: 'Algebra: Solving Equations', duration: '25 min', status: 'continue', progress: 65 },
  { id: 2, subject: 'Science', topic: 'Forces and Motion', duration: '30 min', status: 'new', progress: 0 },
  { id: 3, subject: 'English', topic: 'Creative Writing', duration: '20 min', status: 'completed', progress: 100 },
]

const upcomingTasks = [
  { id: 1, type: 'quiz', subject: 'Mathematics', title: 'Algebra Assessment', due: 'Tomorrow' },
  { id: 2, type: 'homework', subject: 'English', title: 'Essay: My Favourite Book', due: 'Friday' },
  { id: 3, type: 'quiz', subject: 'Science', title: 'Forces Quiz', due: 'Monday' },
]

const subjectProgress = [
  { subject: 'Mathematics', progress: 78, trend: '+5%' },
  { subject: 'English', progress: 85, trend: '+3%' },
  { subject: 'Science', progress: 72, trend: '+8%' },
  { subject: 'History', progress: 68, trend: '+2%' },
]

const achievements = [
  { icon: Flame, label: '12 Day Streak', color: 'text-orange-500 bg-orange-50' },
  { icon: Star, label: 'Quiz Master', color: 'text-amber-500 bg-amber-50' },
  { icon: Target, label: '10 Goals Met', color: 'text-oak-green bg-oak-green-light' },
]

const navItems = [
  { icon: 'family-hub', label: 'Today', active: true },
  { icon: 'quiz', label: 'My Assessments' },
  { icon: 'homework', label: 'My Homework' },
  { icon: 'lessons', label: 'My Subjects' },
  { icon: 'report', label: 'My Progress' },
]

export function PrototypeStudentDashboard() {
  return (
    <div className="flex h-screen overflow-hidden bg-oak-warm">
      {/* Sidebar */}
      <aside className="w-72 flex flex-col shrink-0 border-r border-oak-beige bg-white h-full">
        {/* Logo */}
        <div className="h-16 flex items-center px-5 border-b border-oak-beige">
          <img src={masterLogo} alt="Oakwood Learning Hub" className="h-10 w-auto" />
        </div>

        {/* Student Profile */}
        <div className="px-4 py-4 border-b border-oak-beige">
          <div className="flex items-center gap-3 rounded-2xl border border-oak-beige bg-white/90 px-3 py-3 shadow-card">
            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-oak-beige bg-white">
              <OakwoodAssetIcon type={studentProfile.icon} className="h-12 w-12" size={48} alt="Profile" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-oak-text truncate">{studentProfile.name}</p>
              <p className="text-xs text-oak-muted">{studentProfile.yearGroup}</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="px-4 py-4 border-b border-oak-beige">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-orange-50 px-3 py-2.5 text-center">
              <div className="flex items-center justify-center gap-1">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="font-bold text-oak-text">{studentProfile.streak}</span>
              </div>
              <p className="text-xs text-oak-muted mt-0.5">Day Streak</p>
            </div>
            <div className="rounded-xl bg-oak-green-light px-3 py-2.5 text-center">
              <div className="flex items-center justify-center gap-1">
                <Star className="w-4 h-4 text-oak-green" />
                <span className="font-bold text-oak-text">{studentProfile.totalPoints.toLocaleString()}</span>
              </div>
              <p className="text-xs text-oak-muted mt-0.5">Points</p>
            </div>
          </div>
        </div>

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
            <h1 className="font-display text-xl font-semibold text-oak-text">Today&apos;s Learning</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-oak-beige-light text-sm text-oak-muted hover:bg-oak-beige transition-colors">
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Search</span>
            </button>
            <button className="relative p-2 rounded-xl hover:bg-oak-beige-light transition-colors">
              <Bell className="w-5 h-5 text-oak-muted" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-oak-green rounded-full" />
            </button>
            <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-oak-green text-white hover:bg-oak-green-hover transition-colors">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Ask AI</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto">
          <div
            className="min-h-full p-6 lg:p-8"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(255,248,245,0.88), rgba(255,248,245,0.95)), url(${studentBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="max-w-6xl space-y-8">
              {/* Welcome */}
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-display text-2xl font-semibold text-oak-text">
                    Good afternoon, {studentProfile.name}!
                  </h2>
                  <p className="text-oak-muted mt-1">
                    You&apos;re doing great! Keep up the excellent work.
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-3">
                  {achievements.map(({ icon: Icon, label, color }) => (
                    <div key={label} className={cn('flex items-center gap-2 px-3 py-2 rounded-xl', color.split(' ')[1])}>
                      <Icon className={cn('w-4 h-4', color.split(' ')[0])} />
                      <span className="text-xs font-medium text-oak-text">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Today's Lessons */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-oak-muted" />
                    <h3 className="font-semibold text-oak-text">Today&apos;s Lessons</h3>
                  </div>
                  <button className="text-sm text-oak-green hover:underline">View All Subjects</button>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {todaysLessons.map((lesson) => (
                    <LessonCard key={lesson.id} lesson={lesson} />
                  ))}
                </div>
              </section>

              {/* Two Column Layout */}
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Upcoming Tasks */}
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-4 h-4 text-oak-muted" />
                    <h3 className="font-semibold text-oak-text">Upcoming Tasks</h3>
                    <span className="text-xs text-oak-muted bg-oak-beige-light px-2 py-0.5 rounded-full">
                      {upcomingTasks.length} tasks
                    </span>
                  </div>
                  <div className="rounded-2xl border border-oak-beige bg-white shadow-card overflow-hidden">
                    <div className="divide-y divide-oak-beige">
                      {upcomingTasks.map((task) => (
                        <div key={task.id} className="flex items-center justify-between px-4 py-3.5 hover:bg-oak-beige-light/50 transition-colors">
                          <div className="flex items-center gap-3">
                            <OakwoodAssetIcon
                              type={task.type === 'quiz' ? 'quiz' : 'homework'}
                              className="w-6 h-6"
                              size={24}
                              alt={task.type}
                            />
                            <div>
                              <p className="text-sm font-medium text-oak-text">{task.title}</p>
                              <p className="text-xs text-oak-muted">{task.subject}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3 text-oak-muted" />
                            <span className={cn(
                              'text-xs font-medium',
                              task.due === 'Tomorrow' ? 'text-amber-600' : 'text-oak-muted'
                            )}>
                              {task.due}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-3 text-xs text-oak-muted text-center border-t border-oak-beige bg-oak-beige-light/30">
                      View all tasks
                    </div>
                  </div>
                </section>

                {/* Subject Progress */}
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-4 h-4 text-oak-muted" />
                    <h3 className="font-semibold text-oak-text">My Progress</h3>
                  </div>
                  <div className="rounded-2xl border border-oak-beige bg-white shadow-card overflow-hidden">
                    <div className="divide-y divide-oak-beige">
                      {subjectProgress.map(({ subject, progress, trend }) => (
                        <div key={subject} className="px-4 py-3.5">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-oak-text">{subject}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-oak-green">{trend}</span>
                              <span className="text-sm font-semibold text-oak-text">{progress}%</span>
                            </div>
                          </div>
                          <div className="h-2 bg-oak-beige-light rounded-full overflow-hidden">
                            <div
                              className="h-full bg-oak-green rounded-full transition-all"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-3 text-xs text-oak-muted text-center border-t border-oak-beige bg-oak-beige-light/30">
                      View full report
                    </div>
                  </div>
                </section>
              </div>

              {/* AI Study Help */}
              <section className="rounded-2xl border border-oak-beige bg-white shadow-card p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-oak-green-light border border-oak-green/20">
                    <OakwoodAssetIcon type="ai" className="h-9 w-9" size={36} alt="AI Study Help" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-oak-text text-lg">Need Help with Your Studies?</h3>
                    <p className="mt-1 text-sm text-oak-muted leading-relaxed">
                      I can help explain difficult concepts, check your homework answers, or create practice questions for any subject!
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-oak-green text-white text-sm font-medium hover:bg-oak-green-hover transition-colors">
                        <Sparkles className="w-4 h-4" />
                        Ask a Question
                      </button>
                      <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-oak-beige bg-white text-sm font-medium text-oak-text hover:bg-oak-beige-light transition-colors">
                        Create Practice Quiz
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Resources Quick Access */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <OakwoodAssetIcon type="resources" className="w-4 h-4" size={16} alt="Resources" />
                  <h3 className="font-semibold text-oak-text">Quick Access</h3>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    { icon: 'quiz', label: 'Take a Quiz', desc: 'Test your knowledge' },
                    { icon: 'homework', label: 'Homework', desc: '2 assignments due' },
                    { icon: 'lessons', label: 'Lessons', desc: 'Continue learning' },
                    { icon: 'report', label: 'My Reports', desc: 'View progress' },
                  ].map(({ icon, label, desc }) => (
                    <button
                      key={label}
                      className="flex items-center gap-4 rounded-2xl border border-oak-beige bg-white p-4 shadow-card hover:shadow-card-md hover:border-oak-green/30 transition-all group"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-oak-beige-light group-hover:bg-oak-green-light transition-colors">
                        <OakwoodAssetIcon type={icon as OakwoodAssetIconType} className="h-7 w-7" size={28} alt={label} />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-semibold text-oak-text">{label}</p>
                        <p className="text-xs text-oak-muted">{desc}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-oak-muted ml-auto group-hover:text-oak-green transition-colors" />
                    </button>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function LessonCard({ lesson }: { lesson: typeof todaysLessons[0] }) {
  const isCompleted = lesson.status === 'completed'
  const isContinue = lesson.status === 'continue'

  return (
    <div className={cn(
      'rounded-2xl border bg-white shadow-card overflow-hidden transition-all hover:shadow-card-md',
      isCompleted ? 'border-oak-green/30' : 'border-oak-beige'
    )}>
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <OakwoodAssetIcon type="lessons" className="w-5 h-5" size={20} alt="Lesson" />
            <span className="text-sm font-medium text-oak-green">{lesson.subject}</span>
          </div>
          {isCompleted && (
            <CheckCircle2 className="w-5 h-5 text-oak-green" />
          )}
        </div>
        <h4 className="font-semibold text-oak-text">{lesson.topic}</h4>
        <p className="text-xs text-oak-muted mt-1">{lesson.duration}</p>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-oak-muted">Progress</span>
            <span className="font-medium text-oak-text">{lesson.progress}%</span>
          </div>
          <div className="h-2 bg-oak-beige-light rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full transition-all',
                isCompleted ? 'bg-oak-green' : 'bg-oak-green/70'
              )}
              style={{ width: `${lesson.progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Action */}
      <div className="px-5 py-3 border-t border-oak-beige bg-oak-beige-light/30">
        <button className={cn(
          'w-full flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium transition-colors',
          isCompleted
            ? 'bg-oak-green-light text-oak-green'
            : 'bg-oak-green text-white hover:bg-oak-green-hover'
        )}>
          {isCompleted ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              Completed
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              {isContinue ? 'Continue' : 'Start Lesson'}
            </>
          )}
        </button>
      </div>
    </div>
  )
}
