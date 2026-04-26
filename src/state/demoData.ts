import type { Profile } from '@/types'
import type { DirectMessage, NoteThread } from '@/state/store'

export const DEMO_PROFILES: Profile[] = [
  {
    id: 'p1', role: 'parent', name: 'Jamie', surname: 'Oakwood',
    initials: 'JO', color: 'bg-violet-500', pinHash: '1234',
    familyName: 'Blackwood', postcode: 'NW1 4AB', childIds: ['c1', 'c2'],
    createdAt: '2026-01-01T00:00:00Z', isDemo: true,
  },
  {
    id: 'p2', role: 'parent', name: 'Alex', surname: 'Blackwood',
    initials: 'AB', color: 'bg-sky-500', pinHash: '1234',
    familyName: 'Blackwood', postcode: 'NW1 4AB', childIds: ['c1', 'c2'],
    createdAt: '2026-01-01T00:00:00Z', isDemo: true,
  },
  {
    id: 'c1', role: 'child', name: 'Amelia', surname: 'Blackwood',
    initials: 'AM', color: 'bg-rose-400', pinHash: '5678',
    yearGroup: 'Year 5', school: 'Oakwood Primary', dob: '14/03/2015',
    notes: 'Confident reader, building confidence in fractions.',
    hobbies: ['Reading', 'Drawing', 'Swimming'],
    subjects: [
      { name: 'Mathematics', active: true },
      { name: 'English', active: true },
      { name: 'Science', active: false },
    ],
    createdAt: '2026-01-01T00:00:00Z', isDemo: true,
  },
  {
    id: 'c2', role: 'child', name: 'Oliver', surname: 'Blackwood',
    initials: 'OL', color: 'bg-emerald-500', pinHash: '5678',
    yearGroup: 'Year 7', school: 'Oakwood Academy', dob: '21/11/2013',
    notes: 'Enjoys experiments, needs support with algebra.',
    hobbies: ['Football', 'Science experiments', 'Gaming'],
    subjects: [
      { name: 'Mathematics', active: true },
      { name: 'Science', active: true },
      { name: 'English', active: false },
    ],
    createdAt: '2026-01-01T00:00:00Z', isDemo: true,
  },
]

export const DEMO_MESSAGES: DirectMessage[] = [
  { id: 'm1', fromId: 'p1', toId: 'p2', text: "Bu hafta Oliver'ın ödevleri var mıydı?", sentAt: new Date(Date.now() - 3600000).toISOString(), read: true },
  { id: 'm2', fromId: 'p2', toId: 'p1', text: 'Evet, matematik ve İngilizce var. Ben bakıyorum.', sentAt: new Date(Date.now() - 1800000).toISOString(), read: true },
]

export const DEMO_THREADS: NoteThread[] = [
  {
    id: 't1', subject: 'Mathematics', topic: 'Fractions', authorId: 'p1',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    replies: [
      { id: 'r1', authorId: 'p1', text: 'Amelia kesirlerle biraz zorlanıyor, bu hafta daha fazla alıştırma yaptıralım.', createdAt: new Date(Date.now() - 86400000 * 2).toISOString() },
      { id: 'r2', authorId: 'p2', text: 'Tamam, ben de akşamları 15 dk bakarım.', createdAt: new Date(Date.now() - 86400000).toISOString() },
    ],
  },
]
