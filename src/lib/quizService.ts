import type { Question, QuizConfig, QuizSession, Report, Answer } from '@/types'
import { crypto } from './crypto'

// ── Question bank (from live/usecases/quizzes.js) ──────────────────────────

const QUESTION_BANK: Record<string, Omit<Question, 'id'>[]> = {
  Mathematics: [
    { type: 'multiple-choice', topic: 'Fractions', prompt: 'Which fraction is equivalent to 1/2?', options: ['2/4','2/5','3/5','4/5'], answer: '2/4', hint: 'Multiply numerator and denominator by the same number.', explanation: '1/2 = 2/4 because both are multiplied by 2.', difficulty: 'Easy' },
    { type: 'gap-fill', topic: 'Decimals', prompt: 'Fill the blank: 0.7 = ___/10', answer: '7', hint: 'Think of tenths.', explanation: '0.7 is seven tenths.', difficulty: 'Easy' },
    { type: 'open-ended', topic: 'Fractions', prompt: 'Explain how you would add 1/4 and 2/4.', answer: 'Add the numerators and keep the denominator the same.', hint: 'The denominators are the same.', explanation: 'With like denominators, add numerators: 1+2=3, so 3/4.', difficulty: 'Medium' },
    { type: 'multiple-choice', topic: 'Multiplication', prompt: 'What is 8 × 7?', options: ['54','56','58','64'], answer: '56', hint: 'Count up in 7s from 7×7=49.', explanation: '8×7=56.', difficulty: 'Easy' },
    { type: 'multiple-choice', topic: 'Area', prompt: 'A rectangle is 5cm × 3cm. What is its area?', options: ['8 cm²','15 cm²','16 cm²','20 cm²'], answer: '15 cm²', hint: 'Area = length × width.', explanation: '5×3=15 cm².', difficulty: 'Medium' },
  ],
  English: [
    { type: 'multiple-choice', topic: 'Grammar', prompt: 'Which word is a modal verb?', options: ['run','might','cat','swiftly'], answer: 'might', hint: 'Modal verbs show possibility.', explanation: 'Might is a modal verb.', difficulty: 'Easy' },
    { type: 'gap-fill', topic: 'Punctuation', prompt: "Add a comma: My friend ___ who lives nearby is visiting.", answer: ',', hint: 'Non-essential information needs commas.', explanation: 'Use commas around extra information.', difficulty: 'Medium' },
    { type: 'multiple-choice', topic: 'Vocabulary', prompt: 'What does "benevolent" mean?', options: ['Cruel','Kind and generous','Shy','Busy'], answer: 'Kind and generous', hint: 'Think of "bene" = good.', explanation: 'Benevolent means kind and generous.', difficulty: 'Medium' },
    { type: 'open-ended', topic: 'Reading', prompt: 'Write one sentence summarising a story about teamwork.', answer: '', hint: 'Keep it short and clear.', explanation: 'Summaries focus on key points.', difficulty: 'Medium' },
  ],
  Science: [
    { type: 'multiple-choice', topic: 'Forces', prompt: 'Balanced forces cause an object to:', options: ['Speed up','Slow down','Stay at constant speed','Stop immediately'], answer: 'Stay at constant speed', hint: 'Balanced means no change in motion.', explanation: 'Balanced forces = constant speed or rest.', difficulty: 'Easy' },
    { type: 'gap-fill', topic: 'Energy', prompt: 'Energy is ___, not created or destroyed.', answer: 'transferred', hint: 'Think about changes in form.', explanation: 'Energy changes form and is transferred.', difficulty: 'Easy' },
    { type: 'multiple-choice', topic: 'Plants', prompt: 'What do plants use sunlight for?', options: ['Respiration','Photosynthesis','Transpiration','Germination'], answer: 'Photosynthesis', hint: 'Photo = light.', explanation: 'Plants use sunlight in photosynthesis to make food.', difficulty: 'Easy' },
    { type: 'open-ended', topic: 'Forces', prompt: 'Describe one example of friction you see every day.', answer: '', hint: 'Think about walking or cycling.', explanation: 'Friction happens between surfaces that rub.', difficulty: 'Medium' },
  ],
  History: [
    { type: 'multiple-choice', topic: 'Ancient Egypt', prompt: 'What were ancient Egyptian rulers called?', options: ['Emperors','Pharaohs','Kings','Sultans'], answer: 'Pharaohs', hint: 'Think of pyramids.', explanation: 'Ancient Egyptian rulers were called Pharaohs.', difficulty: 'Easy' },
    { type: 'gap-fill', topic: 'World War II', prompt: 'World War II ended in _____.', answer: '1945', hint: 'It started in 1939.', explanation: 'WWII ended in 1945.', difficulty: 'Easy' },
  ],
  Geography: [
    { type: 'multiple-choice', topic: 'UK', prompt: 'What is the capital city of Scotland?', options: ['Glasgow','Edinburgh','Aberdeen','Dundee'], answer: 'Edinburgh', hint: 'It\'s home to a famous castle.', explanation: 'Edinburgh is the capital of Scotland.', difficulty: 'Easy' },
    { type: 'gap-fill', topic: 'Rivers', prompt: 'The longest river in the UK is the River _____.', answer: 'Severn', hint: 'It flows through Wales and England.', explanation: 'The River Severn is the longest river in the UK.', difficulty: 'Medium' },
  ],
}

function getBankForSubject(subject: string): Omit<Question, 'id'>[] {
  const key = Object.keys(QUESTION_BANK).find(
    (k) => k.toLowerCase() === subject.toLowerCase()
  )
  return QUESTION_BANK[key ?? 'Mathematics'] ?? QUESTION_BANK.Mathematics
}

function buildQuestion(template: Omit<Question, 'id'>, optionsCount: number): Question {
  const q = { ...template, id: crypto.uuid() }
  if (q.type === 'multiple-choice' && Array.isArray(q.options)) {
    q.options = q.options.slice(0, Math.max(2, Math.min(4, optionsCount)))
  }
  return q
}

export function generateQuestions(
  subject: string,
  topics: string[],
  config: QuizConfig
): Question[] {
  const bank = getBankForSubject(subject)
  const { counts, optionsCount } = config
  const questions: Question[] = []

  const push = (type: string, count: number) => {
    const pool = bank.filter((q) => q.type === type)
    for (let i = 0; i < count; i++) {
      const template = pool[i % (pool.length || 1)] ?? bank[i % bank.length]
      const q = buildQuestion(template, optionsCount)
      if (topics.length) q.topic = topics[i % topics.length]
      questions.push(q)
    }
  }

  push('multiple-choice', counts.multipleChoice)
  push('gap-fill', counts.gapFill)
  push('open-ended', counts.openEnded)
  return questions
}

export function checkAnswer(question: Question, value: string): boolean {
  if (question.type === 'open-ended') return false // AI grades open-ended
  return value.trim().toLowerCase() === String(question.answer).trim().toLowerCase()
}

export function calculateScore(questions: Question[], answers: Answer[]): number {
  if (!questions.length) return 0
  const correct = answers.filter((a) => a?.correct).length
  return Math.round((correct / questions.length) * 100)
}

export function buildReport(score: number): Report {
  if (score >= 85) return {
    strengths: ['Excellent coverage of core concepts.', 'Strong accuracy across question types.'],
    growth: ['Add a few stretch questions next time.'],
    critical: ['No critical gaps detected.'],
  }
  if (score >= 60) return {
    strengths: ['Good understanding of key ideas.', 'Progress is steady.'],
    growth: ['Practice mixed question types for fluency.'],
    critical: ['Focus on any missed topics in homework.'],
  }
  return {
    strengths: ['Effort shown in attempting all questions.'],
    growth: ['Revisit core definitions and examples.'],
    critical: ['Immediate review needed for foundational topics.'],
  }
}

export function createSession(
  childId: string,
  subject: string,
  topics: string[],
  config: QuizConfig
): QuizSession {
  const questions = generateQuestions(subject, topics, config)
  return {
    id: crypto.uuid(),
    childId,
    subject,
    topics,
    config,
    questions,
    answers: [],
    status: 'pending',
    assignedAt: new Date().toISOString(),
  }
}

export function defaultConfig(total = 5): QuizConfig {
  return {
    totalQuestions: total,
    optionsCount: 4,
    difficulty: 'Mixed',
    showHint: true,
    showExplanation: true,
    timeLimit: 0,
    counts: {
      multipleChoice: Math.ceil(total * 0.6),
      gapFill: Math.floor(total * 0.2),
      openEnded: total - Math.ceil(total * 0.6) - Math.floor(total * 0.2),
    },
  }
}

// Available subjects per child — later driven by curriculum data
export const SUBJECTS = [
  'Mathematics', 'English', 'Science', 'History', 'Geography',
  'Art', 'Music', 'Computing', 'PE', 'PSHE',
]

export const SUBJECT_TOPICS: Record<string, string[]> = {
  Mathematics: ['Fractions', 'Decimals', 'Multiplication', 'Division', 'Area', 'Algebra'],
  English:     ['Grammar', 'Punctuation', 'Vocabulary', 'Reading', 'Writing'],
  Science:     ['Forces', 'Energy', 'Plants', 'Animals', 'Space', 'Materials'],
  History:     ['Ancient Egypt', 'Romans', 'World War II', 'Tudors', 'Vikings'],
  Geography:   ['UK', 'Rivers', 'Climate', 'Maps', 'Biomes'],
}
