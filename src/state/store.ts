import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Profile, QuizDraft, QuizSession } from '@/types'
export type { Profile }

interface AppState {
  // Auth
  profiles: Profile[]
  activeProfileId: string | null
  activeChildId: string | null

  // Quiz data
  quizDrafts: QuizDraft[]
  quizSessions: QuizSession[]

  // Actions
  setActiveProfile: (id: string | null) => void
  setActiveChild: (id: string | null) => void
  addProfile: (profile: Profile) => void
  updateProfile: (id: string, updates: Partial<Profile>) => void

  addQuizDraft: (draft: QuizDraft) => void
  addQuizSession: (session: QuizSession) => void
  updateQuizSession: (id: string, updates: Partial<QuizSession>) => void
}

const DEMO_PROFILES: Profile[] = [
  {
    id: 'p1', name: 'Erkan', role: 'parent', avatar: '👨', pinHash: '1234',
    childIds: ['c1', 'c2', 'c3'], createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'p2', name: 'Ebeveyn 2', role: 'parent', avatar: '👩', pinHash: '1234',
    childIds: ['c1', 'c2', 'c3'], createdAt: '2026-01-01T00:00:00Z',
  },
  { id: 'c1', name: 'Ali',  role: 'child', avatar: '🧒', pinHash: '5678', yearGroup: 'Year 5', createdAt: '2026-01-01T00:00:00Z' },
  { id: 'c2', name: 'Ayşe', role: 'child', avatar: '👧', pinHash: '5678', yearGroup: 'Year 3', createdAt: '2026-01-01T00:00:00Z' },
  { id: 'c3', name: 'Can',  role: 'child', avatar: '👦', pinHash: '5678', yearGroup: 'Year 7', createdAt: '2026-01-01T00:00:00Z' },
]

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      profiles: DEMO_PROFILES,
      activeProfileId: null,
      activeChildId: null,
      quizDrafts: [],
      quizSessions: [],

      setActiveProfile: (id) => set({ activeProfileId: id, activeChildId: null }),
      setActiveChild:   (id) => set({ activeChildId: id }),

      addProfile: (profile) =>
        set((s) => ({ profiles: [...s.profiles, profile] })),

      updateProfile: (id, updates) =>
        set((s) => ({
          profiles: s.profiles.map((p) => p.id === id ? { ...p, ...updates } : p),
        })),

      addQuizDraft: (draft) =>
        set((s) => ({ quizDrafts: [...s.quizDrafts, draft] })),

      addQuizSession: (session) =>
        set((s) => ({ quizSessions: [...s.quizSessions, session] })),

      updateQuizSession: (id, updates) =>
        set((s) => ({
          quizSessions: s.quizSessions.map((sess) =>
            sess.id === id ? { ...sess, ...updates } : sess
          ),
        })),
    }),
    { name: 'oakwood-store' }
  )
)
