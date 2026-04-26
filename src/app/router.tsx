import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Welcome } from '@/features/auth/Welcome'
import { ProfileSelect } from '@/features/auth/ProfileSelect'
import { LoginForm } from '@/features/auth/LoginForm'
import { PinEntry } from '@/features/auth/PinEntry'
import { RegisterGate } from '@/features/auth/RegisterGate'
import { PostRegister } from '@/features/auth/PostRegister'
import { AdminPin } from '@/features/admin/AdminPin'
import { AdminPanel } from '@/features/admin/AdminPanel'
import { AppShell } from '@/app/shell/AppShell'
import { useAppStore } from '@/state/store'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const activeProfileId = useAppStore((s) => s.activeProfileId)
  if (!activeProfileId) return <Navigate to="/" replace />
  return <>{children}</>
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const isAdminSession = useAppStore((s) => s.isAdminSession)
  if (!isAdminSession) return <Navigate to="/admin" replace />
  return <>{children}</>
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/"                    element={<Welcome />} />
        <Route path="/login"               element={<LoginForm />} />
        <Route path="/profiles"            element={<ProfileSelect />} />
        <Route path="/pin/:profileId"      element={<PinEntry />} />
        <Route path="/register/parent"     element={<RegisterGate mode="parent" />} />
        <Route path="/register/child"      element={<RegisterGate mode="child" />} />
        <Route path="/post-register"       element={<PostRegister />} />

        {/* Admin */}
        <Route path="/admin"               element={<AdminPin />} />
        <Route path="/admin/dashboard"     element={<AdminRoute><AdminPanel /></AdminRoute>} />

        {/* App (authenticated) */}
        <Route path="/app/*" element={<ProtectedRoute><AppShell /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
