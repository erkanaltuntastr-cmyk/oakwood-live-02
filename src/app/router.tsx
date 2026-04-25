import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { ProfileSelect } from '@/features/auth/ProfileSelect'
import { PinEntry } from '@/features/auth/PinEntry'
import { ParentRegisterForm } from '@/features/auth/ParentRegisterForm'
import { ChildRegisterForm } from '@/features/auth/ChildRegisterForm'
import { AppShell } from '@/app/shell/AppShell'
import { useAppStore } from '@/state/store'
import { crypto } from '@/lib/crypto'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const activeProfileId = useAppStore((s) => s.activeProfileId)
  if (!activeProfileId) return <Navigate to="/" replace />
  return <>{children}</>
}

function RegisterParent() {
  const { addProfile } = useAppStore()
  const navigate = useNavigate()
  return (
    <ParentRegisterForm
      onSubmit={(data) => {
        addProfile({ id: crypto.uuid(), role: 'parent', ...data })
        navigate('/')
      }}
      onCancel={() => navigate('/')}
    />
  )
}

function RegisterChild() {
  const { addProfile, activeProfileId, profiles } = useAppStore()
  const navigate = useNavigate()
  const parent = profiles.find((p) => p.id === activeProfileId)

  return (
    <ChildRegisterForm
      onSubmit={(data) => {
        const childId = crypto.uuid()
        addProfile({ id: childId, role: 'child', ...data })
        // link child to parent
        if (parent) {
          addProfile({ ...parent, childIds: [...(parent.childIds ?? []), childId] })
        }
        navigate('/')
      }}
      onCancel={() => navigate('/')}
    />
  )
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProfileSelect />} />
        <Route path="/pin/:profileId" element={<PinEntry />} />
        <Route path="/register/parent" element={<RegisterParent />} />
        <Route path="/register/child" element={<RegisterChild />} />
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
