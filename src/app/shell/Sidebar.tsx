import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, BookOpen, ClipboardList,
  FileText, BarChart3, MessageSquare,
  Users, Settings, LogOut, ChevronRight,
} from 'lucide-react'
import { useAppStore } from '@/state/store'
import { Avatar } from '@/components/Avatar'
import { useLang } from '@/lib/useLang'
import { cn } from '@/lib/utils'

export function Sidebar() {
  const { profiles, activeProfileId, activeChildId, setActiveProfile } = useAppStore()
  const navigate = useNavigate()
  const { t } = useLang()

  const profile  = profiles.find((p) => p.id === activeProfileId)
  const isParent = profile?.role === 'parent'
  const activeChild = isParent && activeChildId
    ? profiles.find((p) => p.id === activeChildId)
    : null

  const parentNav = [
    { to: '/app/dashboard', icon: LayoutDashboard, label: t('nav.familyHub') },
    { to: '/app/children',  icon: Users,           label: t('nav.children') },
    { to: '/app/subjects',  icon: BookOpen,         label: t('nav.subjects') },
    { to: '/app/quizzes',   icon: ClipboardList,    label: t('nav.quizzes') },
    { to: '/app/homework',  icon: FileText,         label: t('nav.homework') },
    { to: '/app/reports',   icon: BarChart3,        label: t('nav.reports') },
    { to: '/app/messages',  icon: MessageSquare,    label: t('nav.messages') },
  ]

  const childNav = [
    { to: '/app/dashboard', icon: LayoutDashboard, label: t('nav.today') },
    { to: '/app/quizzes',   icon: ClipboardList,   label: t('nav.myAssessments') },
    { to: '/app/homework',  icon: FileText,        label: t('nav.myAssignments') },
    { to: '/app/subjects',  icon: BookOpen,        label: t('nav.mySubjects') },
    { to: '/app/reports',   icon: BarChart3,       label: t('nav.myProgress') },
  ]

  const nav = isParent ? parentNav : childNav

  return (
    <aside className="w-60 flex flex-col shrink-0 border-r border-border bg-white h-full">
      {/* Logo */}
      <div className="h-16 flex items-center gap-3 px-6 border-b border-border">
        <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-sm">O</span>
        </div>
        <span className="font-display font-semibold text-lg text-foreground tracking-tight italic">
          Oakwood
        </span>
      </div>

      {/* Active profile */}
      {profile && (
        <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border">
          <Avatar profile={profile} size="sm" />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">{profile.name}</p>
            <p className="text-xs text-muted-foreground">{isParent ? t('nav.parent') : t('nav.student')}</p>
          </div>
        </div>
      )}

      {/* Active child chip — parents only */}
      {isParent && (
        <button
          onClick={() => navigate('/app/children')}
          className="flex items-center justify-between px-5 py-3 border-b border-border hover:bg-muted transition-colors group"
        >
          <div className="flex items-center gap-2.5">
            {activeChild ? (
              <>
                <Avatar profile={activeChild} size="sm" />
                <div className="text-left">
                  <p className="text-xs font-semibold text-foreground leading-none">{activeChild.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{t('nav.selectedLearner')}</p>
                </div>
              </>
            ) : (
              <p className="text-xs text-muted-foreground">{t('nav.noLearner')}</p>
            )}
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground shrink-0" />
        </button>
      )}

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {nav.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => cn('oak-nav-item', isActive && 'active')}
          >
            <Icon className="w-4 h-4 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-border space-y-0.5">
        <NavLink to="/app/settings" className={({ isActive }) => cn('oak-nav-item', isActive && 'active')}>
          <Settings className="w-4 h-4" /> {t('nav.settings')}
        </NavLink>
        <button
          onClick={() => { setActiveProfile(null); navigate('/') }}
          className="w-full oak-nav-item text-left hover:!text-destructive hover:!bg-destructive/5"
        >
          <LogOut className="w-4 h-4" /> {t('nav.signOut')}
        </button>
      </div>
    </aside>
  )
}
