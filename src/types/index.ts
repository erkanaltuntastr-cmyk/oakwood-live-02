export type Role = 'parent' | 'child'
export type QuestionType = 'multiple-choice' | 'gap-fill' | 'open-ended'
export type Difficulty = 'Easy' | 'Medium' | 'Hard'
export type SessionStatus = 'pending' | 'in_progress' | 'completed' | 'abandoned'

export interface Profile {
  id: string
  name: string
  role: Role
  avatar: string
  pinHash: string
  childIds?: string[]       // parents only
  yearGroup?: string        // children only
  createdAt: string
}

export interface Question {
  id: string
  type: QuestionType
  topic: string
  prompt: string
  options?: string[]        // multiple-choice only
  answer: string
  hint?: string
  explanation?: string
  difficulty: Difficulty
}

export interface QuizConfig {
  totalQuestions: number
  optionsCount: number      // 2-4 for MC
  difficulty: Difficulty | 'Mixed'
  showHint: boolean
  showExplanation: boolean
  timeLimit: number         // minutes, 0 = no limit
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
  createdBy: string         // parent profile id
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
