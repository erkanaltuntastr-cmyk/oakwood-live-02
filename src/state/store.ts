import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Profile, QuizDraft, QuizSession } from '@/types'
import type { HomeworkItem } from '@/lib/homeworkService'
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
}

// Demo data sourced from live/src/usecases/demoSeed.js
const DEMO: Profile[] = [
  {
    id: 'p1',
    role: 'parent',
    name: 'Jamie',
    surname: 'Oakwood',
    initials: 'JO',
    color: 'bg-violet-500',
    pinHash: '1234',
    familyName: 'Blackwood',
    postcode: 'NW1 4AB',
    childIds: ['c1', 'c2'],
    createdAt: '2026-01-01T00:00:00Z',
    isDemo: true,
  },
  {
    id: 'p2',
    role: 'parent',
    name: 'Alex',
    surname: 'Blackwood',
    initials: 'AB',
    color: 'bg-sky-500',
    pinHash: '1234',
    familyName: 'Blackwood',
    postcode: 'NW1 4AB',
    childIds: ['c1', 'c2'],
    createdAt: '2026-01-01T00:00:00Z',
    isDemo: true,
  },
  {
    id: 'c1',
    role: 'child',
    name: 'Amelia',
    surname: 'Blackwood',
    initials: 'AM',
    color: 'bg-rose-400',
    pinHash: '5678',
    yearGroup: 'Year 5',
    school: 'Oakwood Primary',
    dob: '14/03/2015',
    notes: 'Confident reader, building confidence in fractions.',
    hobbies: ['Reading', 'Drawing', 'Swimming'],
    subjects: [
      { name: 'Mathematics', active: true },
      { name: 'English', active: true },
      { name: 'Science', active: false },
    ],
    createdAt: '2026-01-01T00:00:00Z',
    isDemo: true,
  },
  {
    id: 'c2',
    role: 'child',
    name: 'Oliver',
    surname: 'Blackwood',
    initials: 'OL',
    color: 'bg-emerald-500',
    pinHash: '5678',
    yearGroup: 'Year 7',
    school: 'Oakwood Academy',
    dob: '21/11/2013',
    notes: 'Enjoys experiments, needs support with algebra.',
    hobbies: ['Football', 'Science experiments', 'Gaming'],
    subjects: [
      { name: 'Mathematics', active: true },
      { name: 'Science', active: true },
      { name: 'English', active: false },
    ],
    createdAt: '2026-01-01T00:00:00Z',
    isDemo: true,
  },
]

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      profiles: DEMO,
      activeProfileId: null,
      activeChildId: null,
      quizDrafts: [],
      quizSessions: [],
      homework: [],
      directMessages: [
        { id: 'm1', fromId: 'p1', toId: 'p2', text: "Bu hafta Oliver'ın ödevleri var mıydı?", sentAt: new Date(Date.now() - 3600000).toISOString(), read: true },
        { id: 'm2', fromId: 'p2', toId: 'p1', text: 'Evet, matematik ve İngilizce var. Ben bakıyorum.', sentAt: new Date(Date.now() - 1800000).toISOString(), read: true },
      ],
      noteThreads: [
        {
          id: 't1', subject: 'Mathematics', topic: 'Fractions', authorId: 'p1',
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          replies: [
            { id: 'r1', authorId: 'p1', text: 'Amelia kesirlerle biraz zorlanıyor, bu hafta daha fazla alıştırma yaptıralım.', createdAt: new Date(Date.now() - 86400000 * 2).toISOString() },
            { id: 'r2', authorId: 'p2', text: 'Tamam, ben de akşamları 15 dk bakarım.', createdAt: new Date(Date.now() - 86400000).toISOString() },
          ],
        },
      ],

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
    }),
    { name: 'oakwood-v2' }
  )
)
