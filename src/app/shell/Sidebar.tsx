import { NavLink, useNavigate } from 'react-router-dom'
import {
  LogOut, ChevronRight,
} from 'lucide-react'
import { useAppStore } from '@/state/store'
import { Avatar } from '@/components/Avatar'
import { OakwoodLogo } from '@/components/brand/OakwoodLogo'
import { OakwoodAssetIcon, type OakwoodAssetIconType } from '@/components/brand/OakwoodAssetIcon'
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
    { to: '/app/dashboard', icon: 'family-hub', label: t('nav.familyHub') },
    { to: '/app/children',  icon: 'family-hub', label: t('nav.children') },
    { to: '/app/subjects',  icon: 'lessons',    label: t('nav.subjects') },
    { to: '/app/quizzes',   icon: 'quiz',       label: t('nav.quizzes') },
    { to: '/app/homework',  icon: 'homework',   label: t('nav.homework') },
    { to: '/app/reports',   icon: 'report',     label: t('nav.reports') },
    { to: '/app/messages',  icon: 'messages',   label: t('nav.messages') },
  ]

  const childNav = [
    { to: '/app/dashboard', icon: 'family-hub', label: t('nav.today') },
    { to: '/app/quizzes',   icon: 'quiz',       label: t('nav.myAssessments') },
    { to: '/app/homework',  icon: 'homework',   label: t('nav.myAssignments') },
    { to: '/app/subjects',  icon: 'lessons',    label: t('nav.mySubjects') },
    { to: '/app/reports',   icon: 'report',     label: t('nav.myProgress') },
  ]

  const nav = isParent ? parentNav : childNav

  return (
    <aside className="w-72 flex flex-col shrink-0 border-r border-border bg-white h-full">
      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b border-border">
        <OakwoodLogo imageClassName="h-9 w-9" />
      </div>

      {/* Active profile */}
      {profile && (
        <div className="px-4 py-4 border-b border-border">
          <div className="flex items-center gap-3 rounded-2xl border border-oak-beige bg-white/90 px-3 py-3 shadow-card">
            <Avatar profile={profile} size="md" />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{profile.name}</p>
              <p className="text-xs text-muted-foreground">{isParent ? t('nav.parent') : t('nav.student')}</p>
            </div>
          </div>
        </div>
      )}

      {/* Active child chip — parents only */}
      {isParent && (
        <button
          onClick={() => navigate(activeChild ? `/app/learner/${activeChild.id}` : '/app/children')}
          className="w-full px-4 py-4 text-left border-b border-border hover:bg-muted/40 transition-colors group"
        >
          <div className="flex w-full items-center justify-between gap-3 rounded-2xl border border-oak-beige bg-white/80 px-3 py-3 shadow-card">
            <div className="flex min-w-0 items-center gap-3">
              {activeChild ? (
                <>
                  <Avatar profile={activeChild} size="md" />
                  <div className="min-w-0 text-left">
                    <p className="text-xs font-semibold text-foreground leading-none">{activeChild.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{t('nav.selectedLearner')}</p>
                  </div>
                </>
              ) : (
                <p className="text-xs text-muted-foreground">{t('nav.noLearner')}</p>
              )}
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground shrink-0" />
          </div>
        </button>
      )}

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {nav.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => cn('oak-nav-item', isActive && 'active')}
          >
            <OakwoodAssetIcon type={icon as OakwoodAssetIconType} className="w-5 h-5 shrink-0" size={20} alt={`${label} icon`} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-border space-y-0.5">
        <NavLink to="/app/settings" className={({ isActive }) => cn('oak-nav-item', isActive && 'active')}>
          <OakwoodAssetIcon type="settings" className="w-5 h-5" size={20} alt="Settings icon" /> {t('nav.settings')}
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
