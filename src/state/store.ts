import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Profile, QuizDraft, QuizSession } from '@/types'
import type { HomeworkItem } from '@/lib/homeworkService'
import { DEMO_PROFILES, DEMO_MESSAGES, DEMO_THREADS } from './demoData'
export type { Profile }

export interface DirectMessage {
  id: string
  fromId: string
  toId: string
  text: string
  sentAt: string
  read: boolean
}

export interface NoteThread {
  id: string
  subject: string
  topic: string
  authorId: string
  createdAt: string
  replies: { id: string; authorId: string; text: string; createdAt: string }[]
}

interface AppState {
  profiles: Profile[]
  activeProfileId: string | null
  activeChildId: string | null
  quizDrafts: QuizDraft[]
  quizSessions: QuizSession[]
  homework: HomeworkItem[]
  directMessages: DirectMessage[]
  noteThreads: NoteThread[]

  setActiveProfile:    (id: string | null) => void
  setActiveChild:      (id: string | null) => void
  addProfile:          (profile: Profile) => void
  updateProfile:       (id: string, updates: Partial<Profile>) => void
  deleteProfile:       (id: string) => void
  addQuizDraft:        (draft: QuizDraft) => void
  addQuizSession:      (session: QuizSession) => void
  updateQuizSession:   (id: string, updates: Partial<QuizSession>) => void
  addHomework:         (items: HomeworkItem[]) => void
  completeHomework:    (id: string) => void
  sendDirectMessage:   (msg: DirectMessage) => void
  markRead:            (fromId: string, toId: string) => void
  addNoteThread:       (thread: NoteThread) => void
  addNoteReply:        (threadId: string, reply: NoteThread['replies'][0]) => void
  loadDemo:            () => void
  resetAll:            () => void
}

const EMPTY_STATE = {
  profiles: [] as Profile[],
  activeProfileId: null as string | null,
  activeChildId: null as string | null,
  quizDrafts: [] as QuizDraft[],
  quizSessions: [] as QuizSession[],
  homework: [] as HomeworkItem[],
  directMessages: [] as DirectMessage[],
  noteThreads: [] as NoteThread[],
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      ...EMPTY_STATE,

      setActiveProfile: (id) => set({ activeProfileId: id, activeChildId: null }),
      setActiveChild:   (id) => set({ activeChildId: id }),

      addProfile: (profile) =>
        set((s) => ({ profiles: [...s.profiles, profile] })),

      updateProfile: (id, updates) =>
        set((s) => ({
          profiles: s.profiles.map((p) => p.id === id ? { ...p, ...updates } : p),
        })),

      deleteProfile: (id) =>
        set((s) => ({
          profiles: s.profiles
            .filter((p) => p.id !== id)
            .map((p) =>
              p.childIds?.includes(id)
                ? { ...p, childIds: p.childIds.filter((c) => c !== id) }
                : p
            ),
          activeChildId: s.activeChildId === id ? null : s.activeChildId,
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

      addHomework: (items) =>
        set((s) => ({ homework: [...s.homework, ...items] })),

      completeHomework: (id) =>
        set((s) => ({
          homework: s.homework.map((h) =>
            h.id === id ? { ...h, status: 'completed', completedAt: new Date().toISOString() } : h
          ),
        })),

      sendDirectMessage: (msg) =>
        set((s) => ({ directMessages: [...s.directMessages, msg] })),

      markRead: (fromId, toId) =>
        set((s) => ({
          directMessages: s.directMessages.map((m) =>
            m.fromId === fromId && m.toId === toId ? { ...m, read: true } : m
          ),
        })),

      addNoteThread: (thread) =>
        set((s) => ({ noteThreads: [...s.noteThreads, thread] })),

      addNoteReply: (threadId, reply) =>
        set((s) => ({
          noteThreads: s.noteThreads.map((t) =>
            t.id !== threadId ? t : { ...t, replies: [...t.replies, reply] }
          ),
        })),

      // Demo mode: populates store with sample family data
      loadDemo: () =>
        set({
          profiles: DEMO_PROFILES,
          activeProfileId: 'p1',
          activeChildId: 'c1',
          directMessages: DEMO_MESSAGES,
          noteThreads: DEMO_THREADS,
          quizDrafts: [],
          quizSessions: [],
          homework: [],
        }),

      // Full reset (logout / clear all)
      resetAll: () => set({ ...EMPTY_STATE }),
    }),
    { name: 'oakwood-v3' }   // bumped from v2 → clears old demo-seeded localStorage
  )
)
