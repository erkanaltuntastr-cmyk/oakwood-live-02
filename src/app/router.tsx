import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { Welcome } from '@/features/auth/Welcome'
import { ProfileSelect } from '@/features/auth/ProfileSelect'
import { PinEntry } from '@/features/auth/PinEntry'
import { ParentRegisterForm } from '@/features/auth/ParentRegisterForm'
import { ChildRegisterForm } from '@/features/auth/ChildRegisterForm'
import { PostRegister } from '@/features/auth/PostRegister'
import { AppShell } from '@/app/shell/AppShell'
import { useAppStore } from '@/state/store'
import { crypto } from '@/lib/crypto'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const activeProfileId = useAppStore((s) => s.activeProfileId)
  if (!activeProfileId) return <Navigate to="/" replace />
  return <>{children}</>
}

function RegisterParent() {
  const { addProfile, setActiveProfile } = useAppStore()
  const navigate = useNavigate()
  return (
    <ParentRegisterForm
      onSubmit={(data) => {
        const id = crypto.uuid()
        addProfile({ id, role: 'parent', createdAt: new Date().toISOString(), childIds: [], ...data })
        setActiveProfile(id)
        navigate('/post-register')
      }}
      onCancel={() => navigate('/')}
    />
  )
}

function RegisterChild() {
  const { addProfile, updateProfile, activeProfileId, profiles } = useAppStore()
  const navigate = useNavigate()
  const parent = profiles.find((p) => p.id === activeProfileId)

  return (
    <ChildRegisterForm
      onSubmit={(data) => {
        const childId = crypto.uuid()
        addProfile({ id: childId, role: 'child', createdAt: new Date().toISOString(), ...data })
        if (parent) {
          updateProfile(parent.id, { childIds: [...(parent.childIds ?? []), childId] })
        }
        navigate('/app/dashboard')
      }}
      onCancel={() => navigate('/app/dashboard')}
    />
  )
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/profiles" element={<ProfileSelect />} />
        <Route path="/pin/:profileId" element={<PinEntry />} />
        <Route path="/register/parent" element={<RegisterParent />} />
        <Route path="/register/child" element={<RegisterChild />} />
        <Route path="/post-register" element={<PostRegister />} />
        <Route
          path="/app/*"
          element={
            <ProtectedRoute>
              <AppShell />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
