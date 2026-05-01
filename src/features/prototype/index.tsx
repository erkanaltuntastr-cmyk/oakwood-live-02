import { NavLink, Routes, Route, Navigate } from 'react-router-dom'
import { PrototypeLanding } from './PrototypeLanding'
import { PrototypeLogin } from './PrototypeLogin'
import { PrototypeProfileSelect } from './PrototypeProfileSelect'
import { PrototypeParentDashboard } from './PrototypeParentDashboard'
import { PrototypeStudentDashboard } from './PrototypeStudentDashboard'
import { cn } from '@/lib/utils'

const prototypePages = [
  { path: 'landing', label: 'Landing Page', component: PrototypeLanding },
  { path: 'login', label: 'Login', component: PrototypeLogin },
  { path: 'profiles', label: 'Profile Select', component: PrototypeProfileSelect },
  { path: 'parent-dashboard', label: 'Parent Dashboard', component: PrototypeParentDashboard },
  { path: 'student-dashboard', label: 'Student Dashboard', component: PrototypeStudentDashboard },
]

export function PrototypeIndex() {
  return (
    <div className="min-h-screen bg-oak-warm">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-oak-beige shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 h-14 overflow-x-auto">
            <span className="text-xs font-bold text-oak-green uppercase tracking-wider shrink-0 mr-4">
              Prototype Preview
            </span>
            {prototypePages.map(({ path, label }) => (
              <NavLink
                key={path}
                to={`/prototype/${path}`}
                className={({ isActive }) => cn(
                  'px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
                  isActive
                    ? 'bg-oak-green text-white'
                    : 'text-oak-muted hover:bg-oak-beige-light hover:text-oak-text'
                )}
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-14">
        <Routes>
          {prototypePages.map(({ path, component: Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          <Route path="*" element={<Navigate to="/prototype/landing" replace />} />
        </Routes>
      </div>
    </div>
  )
}

export { PrototypeLanding } from './PrototypeLanding'
export { PrototypeLogin } from './PrototypeLogin'
export { PrototypeProfileSelect } from './PrototypeProfileSelect'
export { PrototypeParentDashboard } from './PrototypeParentDashboard'
export { PrototypeStudentDashboard } from './PrototypeStudentDashboard'
