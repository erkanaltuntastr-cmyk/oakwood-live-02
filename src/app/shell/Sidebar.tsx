import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, BookOpen, ClipboardList,
  FileText, BarChart3, MessageSquare,
  Users, Settings, LogOut, ChevronRight,
} from 'lucide-react'
import { useAppStore } from '@/state/store'
import { Avatar } from '@/components/Avatar'
import { cn } from '@/lib/utils'

const parentNav = [
  { to: '/app/dashboard', icon: LayoutDashboard, label: 'Aile Merkezi' },
  { to: '/app/children',  icon: Users,           label: 'Çocuklar' },
  { to: '/app/subjects',  icon: BookOpen,         label: 'Dersler' },
  { to: '/app/quizzes',   icon: ClipboardList,    label: 'Sınavlar' },
  { to: '/app/homework',  icon: FileText,         label: 'Ödevler' },
  { to: '/app/reports',   icon: BarChart3,        label: 'Raporlar' },
  { to: '/app/messages',  icon: MessageSquare,    label: 'Mesajlar' },
]

const childNav = [
  { to: '/app/dashboard', icon: LayoutDashboard, label: 'Bugün' },
  { to: '/app/quizzes',   icon: ClipboardList,   label: 'Sınavlarım' },
  { to: '/app/homework',  icon: FileText,        label: 'Ödevlerim' },
  { to: '/app/subjects',  icon: BookOpen,        label: 'Derslerim' },
  { to: '/app/reports',   icon: BarChart3,       label: 'Sonuçlarım' },
]

export function Sidebar() {
  const { profiles, activeProfileId, activeChildId, setActiveProfile } = useAppStore()
  const navigate = useNavigate()
  const profile  = profiles.find((p) => p.id === activeProfileId)
  const isParent = profile?.role === 'parent'
  const nav      = isParent ? parentNav : childNav
  const activeChild = isParent && activeChildId
    ? profiles.find((p) => p.id === activeChildId)
    : null

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
            <p className="text-xs text-muted-foreground">{isParent ? 'Veli' : 'Çocuk'}</p>
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
                  <p className="text-xs text-muted-foreground mt-0.5">Seçili çocuk</p>
                </div>
              </>
            ) : (
              <p className="text-xs text-muted-foreground">Çocuk seçilmedi</p>
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
            className={({ isActive }) =>
              cn('oak-nav-item', isActive && 'active')
            }
          >
            <Icon className="w-4 h-4 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-border space-y-0.5">
        <NavLink
          to="/app/settings"
          className={({ isActive }) => cn('oak-nav-item', isActive && 'active')}
        >
          <Settings className="w-4 h-4" /> Ayarlar
        </NavLink>
        <button
          onClick={() => { setActiveProfile(null); navigate('/') }}
          className="w-full oak-nav-item text-left hover:!text-destructive hover:!bg-destructive/5"
        >
          <LogOut className="w-4 h-4" /> Çıkış
        </button>
      </div>
    </aside>
  )
}
