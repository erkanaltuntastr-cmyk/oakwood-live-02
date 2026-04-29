export type Role = 'parent' | 'child' | 'admin'
export type RequestStatus = 'pending' | 'approved' | 'rejected'
export type RegistrationMode = 'parent' | 'child'
export type RegistrationStep = 'code' | 'parent' | 'child'

export interface RegistrationRequest {
  id: string
  name: string
  surname?: string
  role: 'parent' | 'child'
  familyRequestId?: string
  dob?: string
  gender?: string
  school?: string
  yearGroup?: string
  className?: string
  nativeLanguage?: string
  learningLanguage?: string
  foreignLanguage?: string
  externalEducation?: string[]
  specialInformation?: string
  pinHash: string
  inviteCode?: string
  status: RequestStatus
  createdAt: string
  reviewedAt?: string
  reviewNote?: string
}

export interface ParentRegistrationFormDraft {
  name: string
  surname: string
  username: string
  spaceName: string
  email: string
  postcode: string
  dob: string
  gsm: string
  profession: string
  placeOfBirth: string
  gender: string
  aiBio: string
  pinHash: string
  pinConfirm: string
  legalConsent: boolean
  usernameTouched: boolean
}

export interface ChildRegistrationFormDraft {
  name: string
  surname: string
  dob: string
  gender: string
  school: string
  yearGroup: string
  className: string
  nativeLanguage: string
  learningLanguage: string
  foreignLanguage: string
  externalEducation: string[]
  specialInformation: string
  pinHash: string
  pinConfirm: string
  legalConsent: boolean
}

export interface RegistrationFlowDraft {
  mode: RegistrationMode
  step: RegistrationStep
  inviteCode: string
  resolvedInviteId?: string
  parentForm?: ParentRegistrationFormDraft
  childForm?: ChildRegistrationFormDraft
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

export type LearnerResourceType = 'text' | 'link' | 'image' | 'document'

export interface LearnerResource {
  id: string
  subject: string
  title: string
  type: LearnerResourceType
  content: string
  createdAt: string
  archived?: boolean
}

export interface LearnerArchiveItem {
  id: string
  title: string
  category: 'resource' | 'course' | 'message' | 'note' | 'general'
  detail?: string
  createdAt: string
}

export interface LearnerNotebookEntry {
  id: string
  subject: string
  title: string
  body: string
  createdAt: string
  updatedAt?: string
  archived?: boolean
}

export interface LearnerCalendarEvent {
  id: string
  title: string
  date: string
  note?: string
  createdAt: string
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
  className?: string
  yearGroup?: string
  school?: string
  nativeLanguage?: string
  learningLanguage?: string
  foreignLanguage?: string
  notes?: string
  externalEducation?: string[]
  specialInformation?: string
  hobbies?: string[]
  resources?: LearnerResource[]
  archive?: LearnerArchiveItem[]
  notebooks?: LearnerNotebookEntry[]
  calendarEvents?: LearnerCalendarEvent[]
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
