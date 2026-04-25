import type { QuizSession } from '@/types'
import { crypto } from './crypto'

export type HomeworkType = 'memory' | 'formula' | 'mistake' | 'review'
export type HomeworkStatus = 'pending' | 'completed'

export interface HomeworkItem {
  id: string
  childId: string
  subject: string
  type: HomeworkType
  title: string
  content: string
  status: HomeworkStatus
  createdAt: string
  completedAt?: string
  sessionId?: string   // which quiz triggered this
}

// Sourced from live/data/mock-homework.json
const HOMEWORK_BANK: Record<string, { memoryCards: string[]; formulaSheets: string[]; commonMistakes: string[] }> = {
  Mathematics: {
    memoryCards: [
      'Equivalent fractions are different fractions that show the same value.',
      'To add fractions with the same denominator, add the numerators and keep the denominator.',
      'Multiply the numerator and denominator by the same number to find equivalent fractions.',
    ],
    formulaSheets: [
      'Fraction of a number = (numerator ÷ denominator) × whole.',
      'Percentage = (part ÷ whole) × 100.',
      'Ratio sharing: total parts = sum of ratio numbers.',
    ],
    commonMistakes: [
      'Adding denominators when adding fractions.',
      'Mixing up numerator/denominator positions.',
      'Forgetting to simplify fractions.',
    ],
  },
  English: {
    memoryCards: [
      'Relative clauses add extra information using who, which, that, whose, where, when.',
      'Modal verbs include might, could, should, would and show possibility.',
      'Inference means using clues in the text to reach a conclusion.',
    ],
    formulaSheets: [
      'Sentence checklist: capital letter, punctuation, sense, and flow.',
      'Use commas to separate non-essential relative clauses.',
      'Summaries should be brief and focused on key points.',
    ],
    commonMistakes: [
      'Forgetting commas around extra information.',
      'Using the wrong relative pronoun.',
      'Copying too much text in a summary.',
    ],
  },
  Science: {
    memoryCards: [
      'Balanced forces mean an object stays still or moves at constant speed.',
      'Friction is a force that opposes motion between surfaces.',
      'Energy is transferred, not created or destroyed.',
    ],
    formulaSheets: [
      'Weight = mass × gravitational field strength.',
      'Efficiency = (useful output ÷ total input) × 100.',
    ],
    commonMistakes: [
      'Confusing mass and weight.',
      'Thinking friction only happens when objects are moving.',
    ],
  },
}

function getBankForSubject(subject: string) {
  const key = Object.keys(HOMEWORK_BANK).find(
    (k) => k.toLowerCase() === subject.toLowerCase()
  )
  return HOMEWORK_BANK[key ?? 'Mathematics'] ?? HOMEWORK_BANK.Mathematics
}

export function generateHomeworkFromSession(session: QuizSession): HomeworkItem[] {
  const bank = getBankForSubject(session.subject)
  const now = new Date().toISOString()

  const make = (type: HomeworkType, title: string, items: string[]): HomeworkItem[] =>
    items.map((content) => ({
      id: crypto.uuid(),
      childId: session.childId,
      subject: session.subject,
      type,
      title,
      content,
      status: 'pending',
      createdAt: now,
      sessionId: session.id,
    }))

  // Pick items based on wrong answers
  const wrongTopics = session.questions
    .filter((_, i) => !session.answers[i]?.correct)
    .map((q) => q.topic)

  const items: HomeworkItem[] = []

  // Always add memory cards + formula sheets
  items.push(...make('memory', 'Hafıza Kartları', bank.memoryCards.slice(0, 2)))
  items.push(...make('formula', 'Formüller & Notlar', bank.formulaSheets.slice(0, 2)))

  // Add mistake review if there were wrong answers
  if (wrongTopics.length > 0) {
    items.push(...make('mistake', 'Dikkat: Yaygın Hatalar', bank.commonMistakes))
    items.push({
      id: crypto.uuid(),
      childId: session.childId,
      subject: session.subject,
      type: 'review',
      title: 'Tekrar Çalış',
      content: `Şu konuları tekrar gözden geçir: ${[...new Set(wrongTopics)].join(', ')}`,
      status: 'pending',
      createdAt: now,
      sessionId: session.id,
    })
  }

  return items
}
