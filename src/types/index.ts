export type Role = 'parent' | 'child' | 'admin'
export type RequestStatus = 'pending' | 'approved' | 'rejected'

export interface RegistrationRequest {
  id: string
  name: string
  surname?: string
  role: 'parent' | 'child'
  yearGroup?: string
  pinHash: string
  inviteCode?: string
  status: RequestStatus
  createdAt: string
  reviewedAt?: string
  reviewNote?: string
}

export interface InviteCode {
  id: string
  code: string
  createdBy: string        // profile id
  targetRole?: 'parent' | 'child'
  familyId?: string        // parent profile id whose childIds will be updated
  expiresAt?: string
  used: boolean
  usedBy?: string
}

export interface AdminMessage {
  id: string
  fromId: string           // 'admin' or profile id
  toId: string
  text: string
  sentAt: string
  read: boolean
}
export type QuestionType = 'multiple-choice' | 'gap-fill' | 'open-ended'
export type Difficulty = 'Easy' | 'Medium' | 'Hard'
export type SessionStatus = 'pending' | 'in_progress' | 'completed' | 'abandoned'

export interface Profile {
  id: string
  role: Role
  // display
  name: string
  surname?: string
  initials?: string
  color?: string
  // auth
  pinHash: string
  // shared
  dob?: string            // DD/MM/YYYY
  gender?: string
  // parent-specific
  childIds?: string[]
  username?: string
  spaceName?: string    // name for the family's learning hub/space (replaces familyName)
  familyName?: string   // kept for backwards compat with demo data
  postcode?: string
  email?: string
  gsm?: string
  profession?: string
  placeOfBirth?: string
  aiBio?: string          // AI context / parental insights
  legalConsent?: boolean
  // child-specific
  yearGroup?: string
  school?: string
  notes?: string
  hobbies?: string[]
  subjects?: { name: string; active: boolean }[]
  // meta
  createdAt: string
  isDemo?: boolean
}

export interface Question {
  id: string
  type: QuestionType
  topic: string
  prompt: string
  options?: string[]
  answer: string
  hint?: string
  explanation?: string
  difficulty: Difficulty
}

export interface QuizConfig {
  totalQuestions: number
  optionsCount: number
  difficulty: Difficulty | 'Mixed'
  showHint: boolean
  showExplanation: boolean
  timeLimit: number
  counts: {
    multipleChoice: number
    gapFill: number
    openEnded: number
  }
}

export interface QuizDraft {
  id: string
  childId: string
  subject: string
  topics: string[]
  config: QuizConfig
  createdAt: string
  createdBy: string
}

export interface Answer {
  value: string
  correct: boolean
  timeSpent?: number
}

export interface Report {
  strengths: string[]
  growth: string[]
  critical: string[]
}

export interface QuizSession {
  id: string
  childId: string
  subject: string
  topics: string[]
  config: QuizConfig
  questions: Question[]
  answers: Answer[]
  status: SessionStatus
  score?: number
  report?: Report
  isRetake?: boolean
  assignedAt: string
  startedAt?: string
  completedAt?: string
}
