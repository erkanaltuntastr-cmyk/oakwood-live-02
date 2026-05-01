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

// Category accent colors
const categoryAccents = {
  lessons: { bg: 'bg-[#a8bfa6]/25', border: 'border-[#769a7c]/50', text: 'text-[#36563d]', progress: 'bg-[#4a6741]' },
  homework: { bg: 'bg-[#d9a68c]/25', border: 'border-[#d9a68c]/60', text: 'text-[#8b5a3c]', progress: 'bg-[#d9a68c]' },
  quiz: { bg: 'bg-[#f0d58c]/30', border: 'border-[#c9a85d]/60', text: 'text-[#8b6914]', progress: 'bg-[#c9a85d]' },
  report: { bg: 'bg-[#36563d]/15', border: 'border-[#36563d]/30', text: 'text-[#36563d]', progress: 'bg-[#36563d]' },
}

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
  { subject: 'Mathematics', progress: 78, trend: '+5%', color: 'bg-[#4a6741]' },
  { subject: 'English', progress: 85, trend: '+3%', color: 'bg-[#36563d]' },
  { subject: 'Science', progress: 72, trend: '+8%', color: 'bg-[#769a7c]' },
  { subject: 'History', progress: 68, trend: '+2%', color: 'bg-[#a8bfa6]' },
]

const achievements = [
  { icon: Flame, label: '12 Day Streak', color: 'text-orange-600', bg: 'bg-orange-100 border-orange-200' },
  { icon: Star, label: 'Quiz Master', color: 'text-[#8b6914]', bg: 'bg-[#f0d58c]/50 border-[#c9a85d]/50' },
  { icon: Target, label: '10 Goals Met', color: 'text-[#36563d]', bg: 'bg-[#a8bfa6]/40 border-[#769a7c]/50' },
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
    <div className="flex h-screen overflow-hidden bg-[#fff8f5]">
      {/* Sidebar */}
      <aside className="w-72 flex flex-col shrink-0 border-r-2 border-[#d8cbb2] bg-white h-full">
        {/* Logo */}
        <div className="h-18 flex items-center px-5 border-b-2 border-[#d8cbb2]">
          <img src={masterLogo} alt="Oakwood Learning Hub" className="h-12 w-auto" />
        </div>

        {/* Student Profile */}
        <div className="px-4 py-4 border-b-2 border-[#d8cbb2]">
          <div className="flex items-center gap-3 rounded-2xl border-2 border-[#c9a85d]/50 bg-[#f0d58c]/15 px-3 py-3 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border-2 border-[#c9a85d]/50 bg-white">
              <OakwoodAssetIcon type={studentProfile.icon} className="h-12 w-12" size={48} alt="Profile" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-[#333333] truncate">{studentProfile.name}</p>
              <p className="text-xs text-[#8b6914] font-medium">{studentProfile.yearGroup}</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="px-4 py-4 border-b-2 border-[#d8cbb2]">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-orange-100 border border-orange-200 px-3 py-3 text-center">
              <div className="flex items-center justify-center gap-1.5">
                <Flame className="w-5 h-5 text-orange-600" />
                <span className="font-bold text-[#333333] text-lg">{studentProfile.streak}</span>
              </div>
              <p className="text-xs text-orange-700 mt-0.5 font-medium">Day Streak</p>
            </div>
            <div className="rounded-xl bg-[#f0d58c]/40 border border-[#c9a85d]/50 px-3 py-3 text-center">
              <div className="flex items-center justify-center gap-1.5">
                <Star className="w-5 h-5 text-[#8b6914]" />
                <span className="font-bold text-[#333333] text-lg">{studentProfile.totalPoints.toLocaleString()}</span>
              </div>
              <p className="text-xs text-[#8b6914] mt-0.5 font-medium">Points</p>
            </div>
          </div>
        </div>

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
            <h1 className="font-display text-2xl font-semibold text-[#333333]">Today's Learning</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#fdfbf7] border border-[#d8cbb2] text-sm text-[#6b6560] hover:bg-[#d8cbb2]/30 transition-colors font-medium">
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Search</span>
            </button>
            <button className="relative p-2.5 rounded-xl hover:bg-[#fdfbf7] border border-transparent hover:border-[#d8cbb2] transition-all">
              <Bell className="w-5 h-5 text-[#6b6560]" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#36563d] rounded-full border-2 border-white" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#36563d] text-white hover:bg-[#4a6741] transition-colors shadow-md font-semibold">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">Ask AI</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto">
          <div
            className="min-h-full p-6 lg:p-8"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(255,248,245,0.85), rgba(255,248,245,0.92)), url(${studentBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="max-w-6xl space-y-8">
              {/* Welcome */}
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <h2 className="font-display text-2xl font-semibold text-[#333333]">
                    Good afternoon, <span className="italic text-[#36563d]">{studentProfile.name}!</span>
                  </h2>
                  <p className="text-[#6b6560] mt-1 text-base">
                    You're doing great! Keep up the excellent work.
                  </p>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  {achievements.map(({ icon: Icon, label, color, bg }) => (
                    <div key={label} className={cn('flex items-center gap-2 px-4 py-2.5 rounded-xl border-2', bg)}>
                      <Icon className={cn('w-5 h-5', color)} />
                      <span className="text-sm font-bold text-[#333333]">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Today's Lessons */}
              <section>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#a8bfa6]/40">
                      <BookOpen className="w-4 h-4 text-[#36563d]" />
                    </div>
                    <h3 className="font-semibold text-[#333333]">Today's Lessons</h3>
                  </div>
                  <button className="text-sm font-semibold text-[#36563d] hover:underline">View All Subjects</button>
                </div>
                <div className="grid gap-5 md:grid-cols-3">
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
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f0d58c]/40">
                      <Calendar className="w-4 h-4 text-[#8b6914]" />
                    </div>
                    <h3 className="font-semibold text-[#333333]">Upcoming Tasks</h3>
                    <span className="text-xs font-bold text-[#8b6914] bg-[#f0d58c]/50 px-2.5 py-1 rounded-full">
                      {upcomingTasks.length} tasks
                    </span>
                  </div>
                  <div className="rounded-2xl border-2 border-[#d8cbb2] bg-white shadow-md overflow-hidden">
                    <div className="divide-y divide-[#d8cbb2]">
                      {upcomingTasks.map((task) => (
                        <div key={task.id} className="flex items-center justify-between px-4 py-4 hover:bg-[#fdfbf7] transition-colors">
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "flex h-10 w-10 items-center justify-center rounded-xl border-2",
                              task.type === 'quiz' 
                                ? 'bg-[#f0d58c]/30 border-[#c9a85d]/50' 
                                : 'bg-[#d9a68c]/30 border-[#d9a68c]/60'
                            )}>
                              <OakwoodAssetIcon
                                type={task.type === 'quiz' ? 'quiz' : 'homework'}
                                className="w-6 h-6"
                                size={24}
                                alt={task.type}
                              />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[#333333]">{task.title}</p>
                              <p className="text-xs text-[#6b6560]">{task.subject}</p>
                            </div>
                          </div>
                          <div className={cn(
                            "flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full",
                            task.due === 'Tomorrow' 
                              ? 'bg-[#d9a68c]/40 text-[#8b5a3c]' 
                              : 'bg-[#d8cbb2]/40 text-[#6b6560]'
                          )}>
                            <Clock className="w-3 h-3" />
                            {task.due}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-3 text-xs text-[#6b6560] text-center border-t-2 border-[#d8cbb2] bg-[#fdfbf7] font-medium">
                      View all tasks
                    </div>
                  </div>
                </section>

                {/* Subject Progress */}
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#36563d]/15">
                      <TrendingUp className="w-4 h-4 text-[#36563d]" />
                    </div>
                    <h3 className="font-semibold text-[#333333]">My Progress</h3>
                  </div>
                  <div className="rounded-2xl border-2 border-[#d8cbb2] bg-white shadow-md overflow-hidden">
                    <div className="divide-y divide-[#d8cbb2]">
                      {subjectProgress.map(({ subject, progress, trend, color }) => (
                        <div key={subject} className="px-4 py-4">
                          <div className="flex items-center justify-between mb-2.5">
                            <span className="text-sm font-semibold text-[#333333]">{subject}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-[#36563d] bg-[#a8bfa6]/30 px-2 py-0.5 rounded-full">{trend}</span>
                              <span className="text-sm font-bold text-[#333333]">{progress}%</span>
                            </div>
                          </div>
                          <div className="h-3 bg-[#d8cbb2]/40 rounded-full overflow-hidden">
                            <div
                              className={cn("h-full rounded-full transition-all", color)}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-3 text-xs text-[#6b6560] text-center border-t-2 border-[#d8cbb2] bg-[#fdfbf7] font-medium">
                      View full report
                    </div>
                  </div>
                </section>
              </div>

              {/* AI Study Help */}
              <section className="rounded-2xl border-2 border-[#c9a85d]/50 bg-gradient-to-r from-[#c9a85d]/15 to-[#a8bfa6]/15 shadow-md p-6">
                <div className="flex items-start gap-5">
                  <div className="flex h-18 w-18 shrink-0 items-center justify-center rounded-2xl bg-white border-2 border-[#c9a85d]/50 shadow-md">
                    <OakwoodAssetIcon type="ai" className="h-12 w-12" size={48} alt="AI Study Help" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#333333] text-xl">Need Help with Your Studies?</h3>
                    <p className="mt-2 text-sm text-[#5F5951] leading-relaxed">
                      I can help explain difficult concepts, check your homework answers, or create practice questions for any subject!
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <button className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#36563d] text-white text-sm font-bold hover:bg-[#4a6741] transition-colors shadow-md">
                        <Sparkles className="w-5 h-5" />
                        Ask a Question
                      </button>
                      <button className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-[#d8cbb2] bg-white text-sm font-bold text-[#333333] hover:bg-[#fdfbf7] hover:border-[#c9a85d] transition-all">
                        Create Practice Quiz
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Resources Quick Access */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7daaa0]/30">
                    <OakwoodAssetIcon type="resources" className="w-5 h-5" size={20} alt="Resources" />
                  </div>
                  <h3 className="font-semibold text-[#333333]">Quick Access</h3>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    { icon: 'quiz', label: 'Take a Quiz', desc: 'Test your knowledge', accent: 'quiz' as keyof typeof categoryAccents },
                    { icon: 'homework', label: 'Homework', desc: '2 assignments due', accent: 'homework' as keyof typeof categoryAccents },
                    { icon: 'lessons', label: 'Lessons', desc: 'Continue learning', accent: 'lessons' as keyof typeof categoryAccents },
                    { icon: 'report', label: 'My Reports', desc: 'View progress', accent: 'report' as keyof typeof categoryAccents },
                  ].map(({ icon, label, desc, accent }) => (
                    <button
                      key={label}
                      className={cn(
                        "flex items-center gap-4 rounded-2xl border-2 p-4 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all group",
                        categoryAccents[accent].bg,
                        categoryAccents[accent].border
                      )}
                    >
                      <div className={cn(
                        "flex h-14 w-14 items-center justify-center rounded-xl bg-white border-2 shadow-sm",
                        categoryAccents[accent].border
                      )}>
                        <OakwoodAssetIcon type={icon as OakwoodAssetIconType} className="h-9 w-9" size={36} alt={label} />
                      </div>
                      <div className="text-left flex-1">
                        <p className={cn("text-sm font-bold", categoryAccents[accent].text)}>{label}</p>
                        <p className="text-xs text-[#6b6560]">{desc}</p>
                      </div>
                      <ChevronRight className={cn("w-5 h-5 transition-colors", categoryAccents[accent].text)} />
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
      'rounded-2xl border-2 bg-white shadow-md overflow-hidden transition-all hover:shadow-lg hover:scale-[1.01]',
      isCompleted ? 'border-[#769a7c]/60' : 'border-[#d8cbb2]'
    )}>
      <div className={cn(
        "p-5",
        isCompleted ? 'bg-[#a8bfa6]/15' : isContinue ? 'bg-[#f0d58c]/10' : 'bg-white'
      )}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg",
              isCompleted ? 'bg-[#a8bfa6]/40' : 'bg-[#a8bfa6]/25'
            )}>
              <OakwoodAssetIcon type="lessons" className="w-5 h-5" size={20} alt="Lesson" />
            </div>
            <span className="text-sm font-bold text-[#36563d]">{lesson.subject}</span>
          </div>
          {isCompleted && (
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#36563d]">
              <CheckCircle2 className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
        <h4 className="font-semibold text-[#333333] text-base">{lesson.topic}</h4>
        <p className="text-xs text-[#6b6560] mt-1 font-medium">{lesson.duration}</p>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-[#6b6560] font-medium">Progress</span>
            <span className="font-bold text-[#333333]">{lesson.progress}%</span>
          </div>
          <div className="h-3 bg-[#d8cbb2]/40 rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full transition-all',
                isCompleted ? 'bg-[#36563d]' : isContinue ? 'bg-[#c9a85d]' : 'bg-[#a8bfa6]'
              )}
              style={{ width: `${lesson.progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Action */}
      <div className="px-5 py-3 border-t-2 border-[#d8cbb2] bg-[#fdfbf7]">
        <button className={cn(
          'w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all',
          isCompleted
            ? 'bg-[#a8bfa6]/40 text-[#36563d]'
            : 'bg-[#36563d] text-white hover:bg-[#4a6741] shadow-md'
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
