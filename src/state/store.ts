import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Role = 'parent' | 'child'

export interface Profile {
  id: string
  name: string
  role: Role
  avatar: string
  pinHash: string
  childIds?: string[] // only for parents: linked child profile IDs
}

interface AppState {
  profiles: Profile[]
  activeProfileId: string | null
  activeChildId: string | null // parent seçtikten sonra hangi çocukla çalışıyor
  setActiveProfile: (id: string | null) => void
  setActiveChild: (id: string | null) => void
  addProfile: (profile: Profile) => void
}

const DEMO_PROFILES: Profile[] = [
  {
    id: 'p1',
    name: 'Erkan',
    role: 'parent',
    avatar: '👨',
    pinHash: '1234',
    childIds: ['c1', 'c2', 'c3'],
  },
  {
    id: 'p2',
    name: 'Ebeveyn 2',
    role: 'parent',
    avatar: '👩',
    pinHash: '1234',
    childIds: ['c1', 'c2', 'c3'],
  },
  { id: 'c1', name: 'Ali', role: 'child', avatar: '🧒', pinHash: '5678' },
  { id: 'c2', name: 'Ayşe', role: 'child', avatar: '👧', pinHash: '5678' },
  { id: 'c3', name: 'Can', role: 'child', avatar: '👦', pinHash: '5678' },
]

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      profiles: DEMO_PROFILES,
      activeProfileId: null,
      activeChildId: null,
      setActiveProfile: (id) => set({ activeProfileId: id, activeChildId: null }),
      setActiveChild: (id) => set({ activeChildId: id }),
      addProfile: (profile) => set((s) => ({ profiles: [...s.profiles, profile] })),
    }),
    { name: 'parentapp-store' }
  )
)
