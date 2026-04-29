import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  Profile,
  QuizDraft,
  QuizSession,
  RegistrationRequest,
  InviteCode,
  AdminMessage,
  RegistrationFlowDraft,
} from '@/types'
import type { HomeworkItem } from '@/lib/homeworkService'
import type { Lang } from '@/lib/i18n'
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

export const ADMIN_PIN = '1453'
export const ADMIN_ID  = 'admin'
export const ADMIN_USERNAME = 'admin'

export interface PersistedAppState {
  lang: Lang
  profiles: Profile[]
  activeProfileId: string | null
  activeChildId: string | null
  isAdminSession: boolean
  quizDrafts: QuizDraft[]
  quizSessions: QuizSession[]
  homework: HomeworkItem[]
  directMessages: DirectMessage[]
  noteThreads: NoteThread[]
  registrationRequests: RegistrationRequest[]
  inviteCodes: InviteCode[]
  adminMessages: AdminMessage[]
  registrationDraft: RegistrationFlowDraft | null
}

interface AppState {
  lang: Lang
  profiles: Profile[]
  activeProfileId: string | null
  activeChildId: string | null
  isAdminSession: boolean
  quizDrafts: QuizDraft[]
  quizSessions: QuizSession[]
  homework: HomeworkItem[]
  directMessages: DirectMessage[]
  noteThreads: NoteThread[]
  registrationRequests: RegistrationRequest[]
  inviteCodes: InviteCode[]
  adminMessages: AdminMessage[]
  registrationDraft: RegistrationFlowDraft | null

  setLang:               (lang: Lang) => void
  setActiveProfile:      (id: string | null) => void
  setActiveChild:        (id: string | null) => void
  setAdminSession:       (on: boolean) => void
  addProfile:            (profile: Profile) => void
  updateProfile:         (id: string, updates: Partial<Profile>) => void
  deleteProfile:         (id: string) => void
  addQuizDraft:          (draft: QuizDraft) => void
  addQuizSession:        (session: QuizSession) => void
  updateQuizSession:     (id: string, updates: Partial<QuizSession>) => void
  addHomework:           (items: HomeworkItem[]) => void
  completeHomework:      (id: string) => void
  sendDirectMessage:     (msg: DirectMessage) => void
  markRead:              (fromId: string, toId: string) => void
  addNoteThread:         (thread: NoteThread) => void
  addNoteReply:          (threadId: string, reply: NoteThread['replies'][0]) => void
  // Registration
  submitRequest:         (req: RegistrationRequest) => void
  reviewRequest:         (id: string, status: 'approved' | 'rejected', note?: string) => void
  approveAndAdd:         (reqId: string) => void
  // Invites
  addInviteCode:         (code: InviteCode) => void
  useInviteCode:         (code: string, usedBy: string) => InviteCode | null
  // Admin messages
  sendAdminMessage:      (msg: AdminMessage) => void
  markAdminRead:         (fromId: string, toId: string) => void
  // Demo / reset
  loadDemo:              () => void
  resetAll:              () => void
  setRegistrationDraft:  (draft: RegistrationFlowDraft | null) => void
  patchRegistrationDraft:(updates: Partial<RegistrationFlowDraft>) => void
  clearRegistrationDraft:(mode?: RegistrationFlowDraft['mode']) => void
  replacePersistedState: (state: Partial<PersistedAppState>) => void
}

const EMPTY_STATE: PersistedAppState = {
  lang: 'en' as Lang,
  profiles: [] as Profile[],
  activeProfileId: null as string | null,
  activeChildId: null as string | null,
  isAdminSession: false,
  quizDrafts: [] as QuizDraft[],
  quizSessions: [] as QuizSession[],
  homework: [] as HomeworkItem[],
  directMessages: [] as DirectMessage[],
  noteThreads: [] as NoteThread[],
  registrationRequests: [] as RegistrationRequest[],
  inviteCodes: [] as InviteCode[],
  adminMessages: [] as AdminMessage[],
  registrationDraft: null,
}

function buildProfileFromRequest(req: RegistrationRequest): Profile {
  return {
    id: `u_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    role: req.role,
    name: req.name,
    surname: req.surname,
    pinHash: req.pinHash,
    dob: req.dob,
    gender: req.gender,
    yearGroup: req.yearGroup,
    school: req.school,
    className: req.className,
    nativeLanguage: req.nativeLanguage,
    learningLanguage: req.learningLanguage,
    foreignLanguage: req.foreignLanguage,
    externalEducation: req.externalEducation,
    specialInformation: req.specialInformation,
    notes: req.specialInformation,
    childIds: req.role === 'parent' ? [] : undefined,
    createdAt: new Date().toISOString(),
  }
}

export function extractPersistedState(state: AppState): PersistedAppState {
  return {
    lang: state.lang,
    profiles: state.profiles,
    activeProfileId: state.activeProfileId,
    activeChildId: state.activeChildId,
    isAdminSession: state.isAdminSession,
    quizDrafts: state.quizDrafts,
    quizSessions: state.quizSessions,
    homework: state.homework,
    directMessages: state.directMessages,
    noteThreads: state.noteThreads,
    registrationRequests: state.registrationRequests,
    inviteCodes: state.inviteCodes,
    adminMessages: state.adminMessages,
    registrationDraft: state.registrationDraft,
  }
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      ...EMPTY_STATE,

      setLang: (lang) => set({ lang }),
      setActiveProfile: (id) => set({ activeProfileId: id, activeChildId: null }),
      setActiveChild:   (id) => set({ activeChildId: id }),
      setAdminSession:  (on) => set({ isAdminSession: on }),

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

      // Registration requests
      submitRequest: (req) =>
        set((s) => ({ registrationRequests: [...s.registrationRequests, req] })),

      reviewRequest: (id, status, note) =>
        set((s) => ({
          registrationRequests: s.registrationRequests.map((r) =>
            r.id === id ? { ...r, status, reviewNote: note, reviewedAt: new Date().toISOString() } : r
          ),
        })),

      approveAndAdd: (reqId) =>
        set((s) => {
          const req = s.registrationRequests.find((r) => r.id === reqId)
          if (!req || req.status !== 'pending') return {}

          const relatedRequests = req.familyRequestId
            ? s.registrationRequests.filter((r) => r.familyRequestId === req.familyRequestId && r.status === 'pending')
            : [req]

          const createdProfiles = relatedRequests.map((request) => buildProfileFromRequest(request))
          const childProfiles = createdProfiles.filter((profile) => profile.role === 'child')

          const normalizedProfiles = createdProfiles.map((profile) =>
            profile.role === 'parent'
              ? { ...profile, childIds: childProfiles.map((child) => child.id) }
              : profile
          )

          return {
            profiles: [...s.profiles, ...normalizedProfiles],
            registrationRequests: s.registrationRequests.map((r) =>
              relatedRequests.some((related) => related.id === r.id)
                ? { ...r, status: 'approved', reviewedAt: new Date().toISOString() }
                : r
            ),
          }
        }),

      // Invite codes
      addInviteCode: (code) =>
        set((s) => ({ inviteCodes: [...s.inviteCodes, code] })),

      useInviteCode: (code, usedBy) => {
        let found: InviteCode | null = null
        set((s) => {
          const ic = s.inviteCodes.find((c) => c.code === code && !c.used)
          if (!ic) return {}
          found = ic
          return {
            inviteCodes: s.inviteCodes.map((c) =>
              c.id === ic.id ? { ...c, used: true, usedBy } : c
            ),
          }
        })
        return found
      },

      // Admin messages
      sendAdminMessage: (msg) =>
        set((s) => ({ adminMessages: [...s.adminMessages, msg] })),

      markAdminRead: (fromId, toId) =>
        set((s) => ({
          adminMessages: s.adminMessages.map((m) =>
            m.fromId === fromId && m.toId === toId ? { ...m, read: true } : m
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
          registrationRequests: [],
          inviteCodes: [],
          adminMessages: [],
          registrationDraft: null,
        }),

      // Full reset
      resetAll: () => set({ ...EMPTY_STATE }),

      setRegistrationDraft: (registrationDraft) => set({ registrationDraft }),

      patchRegistrationDraft: (updates) =>
        set((s) => ({
          registrationDraft: s.registrationDraft
            ? { ...s.registrationDraft, ...updates }
            : null,
        })),

      clearRegistrationDraft: (mode) =>
        set((s) => ({
          registrationDraft: !mode || s.registrationDraft?.mode === mode
            ? null
            : s.registrationDraft,
        })),

      replacePersistedState: (state) =>
        set({
          ...EMPTY_STATE,
          ...state,
        }),
    }),
    { name: 'oakwood-v5' }   // v5: i18n (lang field)
  )
)
