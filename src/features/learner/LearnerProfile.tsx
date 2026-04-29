import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Avatar } from '@/components/Avatar'
import { OakwoodAssetIcon } from '@/components/brand/OakwoodAssetIcon'
import { useAppStore, ADMIN_ID } from '@/state/store'
import { crypto } from '@/lib/crypto'
import { SUBJECTS } from '@/lib/quizService'
import { getCurriculumSubjects, getCurriculumTopicGroups, type CurriculumRow } from '@/lib/curriculum'
import { cn } from '@/lib/utils'
import type {
  LearnerArchiveItem,
  LearnerCalendarEvent,
  LearnerNotebookEntry,
  LearnerResource,
  LearnerResourceType,
  Profile,
} from '@/types'
import { Homework } from '@/features/homework/Homework'
import { Reports } from '@/features/reports/Reports'
import { CalendarDays, ChevronRight, MessageSquare, Pencil, Plus, Trash2 } from 'lucide-react'

const inp = 'w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40'
const tabs = [
  { id: 'subjects', label: 'Dersler', icon: 'lessons' },
  { id: 'courses', label: 'Kurslar', icon: 'quiz' },
  { id: 'resources', label: 'Kaynakca', icon: 'resources' },
  { id: 'messages', label: 'Mesajlar', icon: 'messages' },
  { id: 'homework', label: 'Odevler', icon: 'homework' },
  { id: 'archive', label: 'Arsiv', icon: 'report' },
  { id: 'reports', label: 'Raporlar', icon: 'report' },
  { id: 'notebooks', label: 'Not Defterleri', icon: 'messages' },
  { id: 'calendar', label: 'Takvim', icon: 'family-hub' },
] as const

type TabId = typeof tabs[number]['id']
type LearnerTabId = TabId | 'details'

function getYearNumber(yearGroup?: string) {
  const match = yearGroup?.match(/\d+/)
  return match ? Number(match[0]) : 0
}

function getRecommendedSubjects(child: Profile) {
  const yearNumber = getYearNumber(child.yearGroup)
  const primaryCore = ['Mathematics', 'English', 'Science', 'Art', 'Music', 'Computing', 'PE', 'PSHE']
  const juniorCore = ['Mathematics', 'English', 'Science', 'History', 'Geography', 'Art', 'Music', 'Computing', 'PE', 'PSHE']
  const secondaryCore = ['Mathematics', 'English', 'Science', 'History', 'Geography', 'Computing', 'Art', 'Music', 'PE', 'PSHE']
  const base = yearNumber <= 2 ? primaryCore : yearNumber <= 6 ? juniorCore : secondaryCore
  const withLanguage = child.foreignLanguage?.trim() ? [...base, child.foreignLanguage.trim()] : base
  return Array.from(new Set(withLanguage))
}

function mergeArchiveItem(child: Profile, item: LearnerArchiveItem) {
  return [...(child.archive ?? []), item]
}

function ChildInfoEditor({ child }: { child: Profile }) {
  const { updateProfile } = useAppStore()
  const [form, setForm] = useState({
    name: child.name,
    surname: child.surname ?? '',
    dob: child.dob ?? '',
    school: child.school ?? '',
    yearGroup: child.yearGroup ?? '',
    className: child.className ?? '',
    nativeLanguage: child.nativeLanguage ?? '',
    learningLanguage: child.learningLanguage ?? '',
    foreignLanguage: child.foreignLanguage ?? '',
    specialInformation: child.specialInformation ?? child.notes ?? '',
  })
  const [saved, setSaved] = useState(false)

  function save() {
    updateProfile(child.id, {
      name: form.name.trim(),
      surname: form.surname.trim() || undefined,
      dob: form.dob.trim() || undefined,
      school: form.school.trim() || undefined,
      yearGroup: form.yearGroup.trim() || undefined,
      className: form.className.trim() || undefined,
      nativeLanguage: form.nativeLanguage.trim() || undefined,
      learningLanguage: form.learningLanguage.trim() || undefined,
      foreignLanguage: form.foreignLanguage.trim() || undefined,
      specialInformation: form.specialInformation.trim() || undefined,
      notes: form.specialInformation.trim() || undefined,
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 1800)
  }

  return (
    <section className="oak-card p-5 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-foreground">Form Bilgileri</h2>
          <p className="text-sm text-muted-foreground">Ogrenci profilindeki temel bilgileri buradan duzenleyebilirsin.</p>
        </div>
        <button onClick={save} className="oak-btn-primary px-4 py-2 text-sm">{saved ? 'Kaydedildi' : 'Kaydet'}</button>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <input className={inp} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ad" />
        <input className={inp} value={form.surname} onChange={(e) => setForm({ ...form, surname: e.target.value })} placeholder="Soyad" />
        <input className={inp} value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} placeholder="Dogum tarihi" />
        <input className={inp} value={form.school} onChange={(e) => setForm({ ...form, school: e.target.value })} placeholder="Okul adi" />
        <input className={inp} value={form.yearGroup} onChange={(e) => setForm({ ...form, yearGroup: e.target.value })} placeholder="Year group" />
        <input className={inp} value={form.className} onChange={(e) => setForm({ ...form, className: e.target.value })} placeholder="Sinif adi" />
        <input className={inp} value={form.nativeLanguage} onChange={(e) => setForm({ ...form, nativeLanguage: e.target.value })} placeholder="Ana dili" />
        <input className={inp} value={form.learningLanguage} onChange={(e) => setForm({ ...form, learningLanguage: e.target.value })} placeholder="Ogrenim dili" />
        <input className={inp} value={form.foreignLanguage} onChange={(e) => setForm({ ...form, foreignLanguage: e.target.value })} placeholder="1 yabanci dil" />
      </div>

      <textarea
        className={inp}
        rows={4}
        value={form.specialInformation}
        onChange={(e) => setForm({ ...form, specialInformation: e.target.value })}
        placeholder="Ozel bilgiler"
      />
    </section>
  )
}

function SubjectCards({ child }: { child: Profile }) {
  const navigate = useNavigate()
  const activeSubjects = child.subjects ?? []
  const fallbackSubjects = getRecommendedSubjects(child)
  const [curriculumSubjects, setCurriculumSubjects] = useState<string[]>([])

  useEffect(() => {
    let active = true
    getCurriculumSubjects(child.yearGroup)
      .then((subjects) => {
        if (active) setCurriculumSubjects(subjects)
      })
      .catch(() => {
        if (active) setCurriculumSubjects([])
      })
    return () => {
      active = false
    }
  }, [child.yearGroup])

  const recommended = curriculumSubjects.length > 0 ? curriculumSubjects : fallbackSubjects

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-base font-semibold text-foreground">Dersler</h2>
        <p className="text-sm text-muted-foreground">Yas grubuna uygun dersler burada. Kartin icine girerek o derse ait alanlari gorebilirsin.</p>
      </div>
      <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(180px,1fr))]">
        {recommended.map((subject) => {
          const active = activeSubjects.find((item) => item.name === subject)?.active ?? false
          return (
            <button
              key={subject}
              onClick={() => navigate(`/app/learner/${child.id}/subject/${encodeURIComponent(subject)}`)}
              className={cn(
                'rounded-2xl border px-4 py-4 text-left transition-colors',
                active ? 'border-primary bg-accent/40 shadow-card' : 'border-border bg-card hover:border-primary/30'
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <OakwoodAssetIcon type="lessons" className="h-5 w-5" size={20} alt="Lessons icon" />
                  <span className="font-medium text-foreground">{subject}</span>
                </div>
                <ChevronRight className={cn('h-4 w-4', active ? 'text-primary' : 'text-muted-foreground')} />
              </div>
              <p className="mt-3 text-xs text-muted-foreground">{active ? 'Bu derse ait detaylara git' : 'Derse gir ve profiline ekle'}</p>
            </button>
          )
        })}
      </div>
    </section>
  )
}

function LearnerSubjectPage({ child, subject }: { child: Profile; subject: string }) {
  const navigate = useNavigate()
  const { homework, quizSessions, updateProfile } = useAppStore()
  const childSubjects = child.subjects ?? []
  const subjectEntry = childSubjects.find((item) => item.name.toLowerCase() === subject.toLowerCase())
  const subjectResources = (child.resources ?? []).filter((item) => !item.archived && item.subject.toLowerCase() === subject.toLowerCase())
  const subjectNotes = (child.notebooks ?? []).filter((item) => !item.archived && item.subject.toLowerCase() === subject.toLowerCase())
  const subjectHomework = homework.filter((item) => item.childId === child.id && item.subject.toLowerCase() === subject.toLowerCase())
  const subjectReports = quizSessions
    .filter((session) => session.childId === child.id && session.subject.toLowerCase() === subject.toLowerCase() && session.status === 'completed')
    .sort((a, b) => new Date(b.completedAt ?? b.assignedAt).getTime() - new Date(a.completedAt ?? a.assignedAt).getTime())
  const [topicGroups, setTopicGroups] = useState<Array<{ mainTopic: string; rows: CurriculumRow[] }>>([])
  const [curriculumLoading, setCurriculumLoading] = useState(true)

  useEffect(() => {
    let active = true
    setCurriculumLoading(true)
    getCurriculumTopicGroups(child.yearGroup, subject)
      .then((groups) => {
        if (active) setTopicGroups(groups)
      })
      .catch(() => {
        if (active) setTopicGroups([])
      })
      .finally(() => {
        if (active) setCurriculumLoading(false)
      })
    return () => {
      active = false
    }
  }, [child.yearGroup, subject])

  function toggleSubjectMembership() {
    if (subjectEntry) {
      updateProfile(child.id, {
        subjects: childSubjects.map((item) => item.name === subject ? { ...item, active: !item.active } : item),
      })
      return
    }

    updateProfile(child.id, {
      subjects: [...childSubjects, { name: subject, active: true }],
    })
  }

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-5 shadow-card lg:flex-row lg:items-center lg:justify-between">
        <div>
          <button onClick={() => navigate(`/app/learner/${child.id}`)} className="mb-3 text-sm text-muted-foreground hover:text-foreground">
            Ogrenciye don
          </button>
          <div className="flex items-center gap-3">
            <OakwoodAssetIcon type="lessons" className="h-8 w-8" size={32} alt="Lessons icon" />
            <div>
              <h1 className="text-2xl font-display font-semibold italic text-foreground">{subject}</h1>
              <p className="mt-1 text-sm text-muted-foreground">{child.name} icin ders merkezi</p>
            </div>
          </div>
        </div>
        <button onClick={toggleSubjectMembership} className="oak-btn-primary px-4 py-2 text-sm">
          {subjectEntry?.active ? 'Dersi Pasife Al' : 'Dersi Aktif Et'}
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="oak-card p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Durum</p>
          <p className="mt-2 text-lg font-semibold text-foreground">{subjectEntry?.active ? 'Aktif' : 'Hazir'}</p>
          <p className="mt-1 text-sm text-muted-foreground">Kart tiklamasi artik dersin icine getiriyor; aktif/pasif kontrolu burada.</p>
        </div>
        <div className="oak-card p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Kaynak Sayisi</p>
          <p className="mt-2 text-lg font-semibold text-foreground">{subjectResources.length}</p>
          <p className="mt-1 text-sm text-muted-foreground">Bu derse bagli aktif kaynaklar.</p>
        </div>
        <div className="oak-card p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Odevler</p>
          <p className="mt-2 text-lg font-semibold text-foreground">{subjectHomework.length}</p>
          <p className="mt-1 text-sm text-muted-foreground">Bekleyen ve tamamlanan tum odevler.</p>
        </div>
      </div>

      <section className="oak-card p-5">
        <h2 className="text-base font-semibold text-foreground">Mufredat Konulari</h2>
        <div className="mt-3 space-y-4">
          {curriculumLoading && <p className="text-sm text-muted-foreground">Mufredat yukleniyor...</p>}
          {!curriculumLoading && topicGroups.length === 0 && (
            <p className="text-sm text-muted-foreground">Bu ders icin curriculum kaydi bulunamadi.</p>
          )}
          {topicGroups.map((group) => (
            <div key={group.mainTopic} className="rounded-2xl border border-border p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="font-semibold text-foreground">{group.mainTopic}</h3>
                <span className="text-xs text-muted-foreground">{group.rows.length} statutory focus</span>
              </div>
              <div className="space-y-3">
                {group.rows.map((row, index) => (
                  <div key={`${group.mainTopic}-${index}`} className="rounded-xl bg-muted/40 px-3 py-3">
                    <p className="text-sm text-foreground">{row.subtopic}</p>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                      {row.estimatedWeek && <span className="rounded-full bg-background px-2 py-1">Hafta {row.estimatedWeek}</span>}
                      {row.difficulty && <span className="rounded-full bg-background px-2 py-1">Zorluk {row.difficulty}/5</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="oak-card p-5">
          <h2 className="text-base font-semibold text-foreground">Kaynakca</h2>
          <div className="mt-3 space-y-3">
            {subjectResources.length === 0 && <p className="text-sm text-muted-foreground">Bu derse ait kaynak yok.</p>}
            {subjectResources.map((resource) => (
              <div key={resource.id} className="rounded-2xl border border-border p-3">
                <p className="font-medium text-foreground">{resource.title}</p>
                <p className="mt-1 text-xs uppercase text-muted-foreground">{resource.type}</p>
                <p className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">{resource.content}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="oak-card p-5">
          <h2 className="text-base font-semibold text-foreground">Not Defteri</h2>
          <div className="mt-3 space-y-3">
            {subjectNotes.length === 0 && <p className="text-sm text-muted-foreground">Bu derse ait not yok.</p>}
            {subjectNotes.map((note) => (
              <div key={note.id} className="rounded-2xl border border-border p-3">
                <p className="font-medium text-foreground">{note.title}</p>
                <p className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">{note.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="oak-card p-5">
          <h2 className="text-base font-semibold text-foreground">Odevler</h2>
          <div className="mt-3 space-y-3">
            {subjectHomework.length === 0 && <p className="text-sm text-muted-foreground">Bu derse ait odev yok.</p>}
            {subjectHomework.map((item) => (
              <div key={item.id} className="rounded-2xl border border-border p-3">
                <p className="font-medium text-foreground">{item.content}</p>
                <p className="mt-1 text-xs text-muted-foreground">{item.status === 'completed' ? 'Tamamlandi' : 'Bekliyor'}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="oak-card p-5">
          <h2 className="text-base font-semibold text-foreground">Raporlar</h2>
          <div className="mt-3 space-y-3">
            {subjectReports.length === 0 && <p className="text-sm text-muted-foreground">Bu derse ait rapor yok.</p>}
            {subjectReports.map((report) => (
              <div key={report.id} className="rounded-2xl border border-border p-3">
                <p className="font-medium text-foreground">{report.subject}</p>
                <p className="mt-1 text-sm text-muted-foreground">Skor: {report.score ?? 0}%</p>
                <p className="mt-1 text-xs text-muted-foreground">{new Date(report.completedAt ?? report.assignedAt).toLocaleDateString('tr-TR')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function CoursesPanel({ child }: { child: Profile }) {
  const { updateProfile } = useAppStore()
  const [course, setCourse] = useState('')
  const courses = child.externalEducation ?? []

  function addCourse() {
    const next = course.trim()
    if (!next) return
    updateProfile(child.id, { externalEducation: [...courses, next] })
    setCourse('')
  }

  function removeCourse(index: number) {
    updateProfile(child.id, { externalEducation: courses.filter((_, itemIndex) => itemIndex !== index) })
  }

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-base font-semibold text-foreground">Kurslar</h2>
        <p className="text-sm text-muted-foreground">Kayit formundaki kurslar burada gelir; ekleyebilir ve silebilirsin.</p>
      </div>
      <div className="flex gap-2">
        <input className={inp} value={course} onChange={(e) => setCourse(e.target.value)} placeholder="Yeni kurs ekle" />
        <button onClick={addCourse} className="oak-btn-primary px-4 py-2 text-sm"><Plus className="h-4 w-4" /></button>
      </div>
      <div className="space-y-2">
        {courses.length === 0 && <div className="oak-card p-4 text-sm text-muted-foreground">Bu ogrenci icin kurs tanimli degil.</div>}
        {courses.map((item, index) => (
          <div key={`${item}-${index}`} className="oak-card flex items-center justify-between gap-3 px-4 py-3">
            <span className="text-sm text-foreground">{item}</span>
            <button onClick={() => removeCourse(index)} className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

function ResourcesPanel({ child }: { child: Profile }) {
  const { updateProfile } = useAppStore()
  const [showForm, setShowForm] = useState(false)
  const subjectOptions = (child.subjects ?? []).map((subject) => subject.name)
  const [form, setForm] = useState({
    subject: subjectOptions[0] ?? getRecommendedSubjects(child)[0] ?? SUBJECTS[0],
    title: '',
    type: 'text' as LearnerResourceType,
    content: '',
  })

  const resources = (child.resources ?? []).filter((resource) => !resource.archived)

  function addResource() {
    if (!form.title.trim() || !form.content.trim()) return
    const nextResource: LearnerResource = {
      id: crypto.uuid(),
      subject: form.subject,
      title: form.title.trim(),
      type: form.type,
      content: form.content.trim(),
      createdAt: new Date().toISOString(),
    }
    updateProfile(child.id, { resources: [...(child.resources ?? []), nextResource] })
    setForm({ ...form, title: '', content: '' })
    setShowForm(false)
  }

  function archiveResource(resource: LearnerResource) {
    updateProfile(child.id, {
      resources: (child.resources ?? []).map((item) => item.id === resource.id ? { ...item, archived: true } : item),
      archive: mergeArchiveItem(child, {
        id: crypto.uuid(),
        title: resource.title,
        category: 'resource',
        detail: `${resource.subject} · ${resource.type}`,
        createdAt: new Date().toISOString(),
      }),
    })
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-foreground">Kaynakca</h2>
          <p className="text-sm text-muted-foreground">Derse gore belge, resim, link veya text kaynagi ekleyebilirsin.</p>
        </div>
        <button onClick={() => setShowForm((value) => !value)} className="oak-btn-primary px-4 py-2 text-sm">Kaynakca Yarat</button>
      </div>

      {showForm && (
        <div className="oak-card space-y-3 p-4">
          <div className="grid gap-3 md:grid-cols-3">
            <select className={inp} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}>
              {[...new Set([...subjectOptions, ...getRecommendedSubjects(child)])].map((subject) => <option key={subject} value={subject}>{subject}</option>)}
            </select>
            <input className={inp} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Kaynak basligi" />
            <select className={inp} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as LearnerResourceType })}>
              <option value="text">Text</option>
              <option value="link">Link</option>
              <option value="image">Resim</option>
              <option value="document">Belge</option>
            </select>
          </div>
          <textarea
            className={inp}
            rows={4}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            placeholder={form.type === 'text' ? 'Icerik yaz...' : 'Link veya dosya adresi yaz...'}
          />
          <div className="flex gap-2">
            <button onClick={() => setShowForm(false)} className="oak-btn-ghost px-4 py-2 text-sm">Vazgec</button>
            <button onClick={addResource} className="oak-btn-primary px-4 py-2 text-sm">Ekle</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {resources.length === 0 && <div className="oak-card p-4 text-sm text-muted-foreground">Henuz kaynak eklenmedi.</div>}
        {resources.map((resource) => (
          <div key={resource.id} className="oak-card flex items-start justify-between gap-4 p-4">
            <div className="min-w-0">
              <div className="mb-1 flex items-center gap-2">
                <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-primary">{resource.subject}</span>
                <span className="text-xs uppercase tracking-wide text-muted-foreground">{resource.type}</span>
              </div>
              <p className="font-medium text-foreground">{resource.title}</p>
              <p className="mt-1 whitespace-pre-wrap text-sm text-muted-foreground">{resource.content}</p>
            </div>
            <button onClick={() => archiveResource(resource)} className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

function LearnerMessagesPanel({ child, familyParents, siblings }: { child: Profile; familyParents: Profile[]; siblings: Profile[] }) {
  const { directMessages, adminMessages, sendDirectMessage, sendAdminMessage } = useAppStore()
  const [tab, setTab] = useState<'family' | 'admin'>('family')
  const [selectedId, setSelectedId] = useState<string | null>(familyParents[0]?.id ?? siblings[0]?.id ?? null)
  const [text, setText] = useState('')
  const contacts = [...familyParents, ...siblings]

  const familyConversation = selectedId
    ? directMessages
      .filter((message) => (
        (message.fromId === child.id && message.toId === selectedId) ||
        (message.fromId === selectedId && message.toId === child.id)
      ))
      .sort((a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime())
    : []

  const adminConversation = adminMessages
    .filter((message) => (
      (message.fromId === child.id && message.toId === ADMIN_ID) ||
      (message.fromId === ADMIN_ID && message.toId === child.id)
    ))
    .sort((a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime())

  function sendFamilyMessage() {
    if (!selectedId || !text.trim()) return
    sendDirectMessage({
      id: crypto.uuid(),
      fromId: child.id,
      toId: selectedId,
      text: text.trim(),
      sentAt: new Date().toISOString(),
      read: false,
    })
    setText('')
  }

  function sendAdminThread() {
    if (!text.trim()) return
    const now = new Date().toISOString()
    sendAdminMessage({
      id: crypto.uuid(),
      fromId: child.id,
      toId: ADMIN_ID,
      text: text.trim(),
      sentAt: now,
      read: false,
    })
    familyParents.forEach((parent) => {
      sendDirectMessage({
        id: crypto.uuid(),
        fromId: child.id,
        toId: parent.id,
        text: `[Admin CC] ${text.trim()}`,
        sentAt: now,
        read: false,
      })
    })
    setText('')
  }

  const messages = tab === 'family' ? familyConversation : adminConversation

  return (
    <section className="space-y-4">
      <div className="flex gap-1 rounded-xl bg-muted p-1 w-fit">
        <button onClick={() => setTab('family')} className={cn('rounded-lg px-4 py-2 text-sm font-medium', tab === 'family' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground')}>
          Aile Ici
        </button>
        <button onClick={() => setTab('admin')} className={cn('rounded-lg px-4 py-2 text-sm font-medium', tab === 'admin' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground')}>
          Admin
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
        {tab === 'family' && (
          <div className="space-y-2">
            {contacts.length === 0 && <div className="oak-card p-4 text-sm text-muted-foreground">Aile ici kisi bulunmuyor.</div>}
            {contacts.map((contact) => (
              <button key={contact.id} onClick={() => setSelectedId(contact.id)} className={cn('oak-card flex w-full items-center gap-3 p-3 text-left', selectedId === contact.id && 'border-primary bg-accent/30')}>
                <Avatar profile={contact} size="sm" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{contact.name} {contact.surname}</p>
                  <p className="text-xs text-muted-foreground">{contact.role === 'parent' ? 'Veli' : 'Kardes'}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        <div className="oak-card flex min-h-[460px] flex-col overflow-hidden">
          <div className="border-b border-border px-4 py-3">
            <p className="text-sm font-semibold text-foreground">
              {tab === 'family'
                ? contacts.find((contact) => contact.id === selectedId)?.name ?? 'Aile ici mesajlar'
                : 'Admin yazismasi'}
            </p>
            {tab === 'admin' && <p className="mt-1 text-xs text-muted-foreground">Admin mesajlarinda velilere otomatik CC gider.</p>}
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.length === 0 && <p className="text-sm text-muted-foreground">Bu kanalda henuz mesaj yok.</p>}
            {messages.map((message) => {
              const mine = message.fromId === child.id
              return (
                <div key={message.id} className={cn('flex', mine ? 'justify-end' : 'justify-start')}>
                  <div className={cn('max-w-[80%] rounded-2xl px-3.5 py-2 text-sm', mine ? 'bg-primary text-primary-foreground' : 'border border-border bg-muted text-foreground')}>
                    <p>{message.text}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="border-t border-border p-4">
            <div className="flex gap-2">
              <input
                className={inp}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (tab === 'family' ? sendFamilyMessage() : sendAdminThread())}
                placeholder={tab === 'family' ? 'Aile icinde mesaj yaz...' : 'Admine mesaj yaz...'}
              />
              <button onClick={() => (tab === 'family' ? sendFamilyMessage() : sendAdminThread())} className="oak-btn-primary px-4 py-2 text-sm">
                <MessageSquare className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ArchivePanel({ child }: { child: Profile }) {
  const archiveItems = child.archive ?? []
  const archivedResources = (child.resources ?? []).filter((resource) => resource.archived)
  const archivedNotes = (child.notebooks ?? []).filter((entry) => entry.archived)

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-base font-semibold text-foreground">Arsiv</h2>
        <p className="text-sm text-muted-foreground">Arsivlenen kaynaklar ve notlar burada tutulur.</p>
      </div>
      <div className="space-y-3">
        {[...archiveItems].reverse().map((item) => (
          <div key={item.id} className="oak-card p-4">
            <p className="font-medium text-foreground">{item.title}</p>
            <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">{item.category}</p>
            {item.detail && <p className="mt-2 text-sm text-muted-foreground">{item.detail}</p>}
          </div>
        ))}
        {archivedResources.map((resource) => (
          <div key={resource.id} className="oak-card p-4">
            <p className="font-medium text-foreground">{resource.title}</p>
            <p className="mt-1 text-xs text-muted-foreground">Kaynakca · {resource.subject}</p>
          </div>
        ))}
        {archivedNotes.map((entry) => (
          <div key={entry.id} className="oak-card p-4">
            <p className="font-medium text-foreground">{entry.title}</p>
            <p className="mt-1 text-xs text-muted-foreground">Not defteri · {entry.subject}</p>
          </div>
        ))}
        {archiveItems.length === 0 && archivedResources.length === 0 && archivedNotes.length === 0 && (
          <div className="oak-card p-4 text-sm text-muted-foreground">Arsiv henuz bos.</div>
        )}
      </div>
    </section>
  )
}

function NotebookPanel({ child }: { child: Profile }) {
  const { updateProfile } = useAppStore()
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState((child.subjects ?? [])[0]?.name ?? getRecommendedSubjects(child)[0] ?? SUBJECTS[0])
  const [body, setBody] = useState('')
  const entries = (child.notebooks ?? []).filter((entry) => !entry.archived)

  function addEntry() {
    if (!title.trim() || !body.trim()) return
    const nextEntry: LearnerNotebookEntry = {
      id: crypto.uuid(),
      subject,
      title: title.trim(),
      body: body.trim(),
      createdAt: new Date().toISOString(),
    }
    updateProfile(child.id, { notebooks: [...(child.notebooks ?? []), nextEntry] })
    setTitle('')
    setBody('')
  }

  function archiveEntry(entry: LearnerNotebookEntry) {
    updateProfile(child.id, {
      notebooks: (child.notebooks ?? []).map((item) => item.id === entry.id ? { ...item, archived: true, updatedAt: new Date().toISOString() } : item),
      archive: mergeArchiveItem(child, {
        id: crypto.uuid(),
        title: entry.title,
        category: 'note',
        detail: entry.subject,
        createdAt: new Date().toISOString(),
      }),
    })
  }

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-base font-semibold text-foreground">Not Defterleri</h2>
        <p className="text-sm text-muted-foreground">Derse gore not tutabilir, sonra arsive alabilirsin.</p>
      </div>
      <div className="oak-card space-y-3 p-4">
        <div className="grid gap-3 md:grid-cols-[200px_minmax(0,1fr)]">
          <select className={inp} value={subject} onChange={(e) => setSubject(e.target.value)}>
            {[...new Set([...(child.subjects ?? []).map((item) => item.name), ...getRecommendedSubjects(child)])].map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
          <input className={inp} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Not basligi" />
        </div>
        <textarea className={inp} rows={5} value={body} onChange={(e) => setBody(e.target.value)} placeholder="Notunu yaz..." />
        <button onClick={addEntry} className="oak-btn-primary px-4 py-2 text-sm">Notu Kaydet</button>
      </div>
      <div className="space-y-3">
        {entries.length === 0 && <div className="oak-card p-4 text-sm text-muted-foreground">Henuz not yok.</div>}
        {entries.map((entry) => (
          <div key={entry.id} className="oak-card flex items-start justify-between gap-4 p-4">
            <div className="min-w-0">
              <div className="mb-1 flex items-center gap-2">
                <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-primary">{entry.subject}</span>
                <span className="text-xs text-muted-foreground">{new Date(entry.createdAt).toLocaleDateString('tr-TR')}</span>
              </div>
              <p className="font-medium text-foreground">{entry.title}</p>
              <p className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">{entry.body}</p>
            </div>
            <button onClick={() => archiveEntry(entry)} className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

function CalendarPanel({ child }: { child: Profile }) {
  const { updateProfile } = useAppStore()
  const [form, setForm] = useState({ title: '', date: '', note: '' })
  const events = [...(child.calendarEvents ?? [])].sort((a, b) => a.date.localeCompare(b.date))

  function addEvent() {
    if (!form.title.trim() || !form.date) return
    const nextEvent: LearnerCalendarEvent = {
      id: crypto.uuid(),
      title: form.title.trim(),
      date: form.date,
      note: form.note.trim() || undefined,
      createdAt: new Date().toISOString(),
    }
    updateProfile(child.id, { calendarEvents: [...(child.calendarEvents ?? []), nextEvent] })
    setForm({ title: '', date: '', note: '' })
  }

  function removeEvent(id: string) {
    updateProfile(child.id, { calendarEvents: (child.calendarEvents ?? []).filter((event) => event.id !== id) })
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <CalendarDays className="h-4 w-4 text-muted-foreground" />
        <div>
          <h2 className="text-base font-semibold text-foreground">Takvim</h2>
          <p className="text-sm text-muted-foreground">Ogrenciye ozel tarih ve hatirlatmalar.</p>
        </div>
      </div>
      <div className="oak-card space-y-3 p-4">
        <div className="grid gap-3 md:grid-cols-2">
          <input className={inp} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Etkinlik basligi" />
          <input className={inp} type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
        </div>
        <textarea className={inp} rows={3} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="Not" />
        <button onClick={addEvent} className="oak-btn-primary px-4 py-2 text-sm">Takvime Ekle</button>
      </div>
      <div className="space-y-3">
        {events.length === 0 && <div className="oak-card p-4 text-sm text-muted-foreground">Takvimde etkinlik yok.</div>}
        {events.map((event) => (
          <div key={event.id} className="oak-card flex items-center justify-between gap-4 p-4">
            <div>
              <p className="font-medium text-foreground">{event.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{event.date}</p>
              {event.note && <p className="mt-2 text-sm text-muted-foreground">{event.note}</p>}
            </div>
            <button onClick={() => removeEvent(event.id)} className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

export function LearnerProfile() {
  const { childId, subjectName } = useParams()
  const navigate = useNavigate()
  const { profiles, activeProfileId, activeChildId, setActiveChild } = useAppStore()
  const [activeTab, setActiveTab] = useState<LearnerTabId>('details')

  const activeProfile = profiles.find((profile) => profile.id === activeProfileId)
  const child = profiles.find((profile) => profile.id === childId && profile.role === 'child')

  useEffect(() => {
    if (childId && childId !== activeChildId) {
      setActiveChild(childId)
    }
  }, [childId, activeChildId, setActiveChild])

  const familyParents = useMemo(() => (
    profiles.filter((profile) => profile.role === 'parent' && profile.childIds?.includes(childId ?? ''))
  ), [profiles, childId])
  const siblingIds = familyParents.flatMap((parent) => parent.childIds ?? []).filter((id) => id !== childId)
  const siblings = profiles.filter((profile) => siblingIds.includes(profile.id))
  const decodedSubjectName = subjectName ? decodeURIComponent(subjectName) : null

  if (!child) {
    return (
      <div className="space-y-4">
        <p className="text-lg font-display italic text-foreground">Ogrenci bulunamadi.</p>
        <button onClick={() => navigate('/app/children')} className="oak-btn-primary px-4 py-2 text-sm">Ogrencilere Don</button>
      </div>
    )
  }

  if (decodedSubjectName) {
    return <LearnerSubjectPage child={child} subject={decodedSubjectName} />
  }

  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-5 shadow-card lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <Avatar profile={child} size="xl" />
          <div>
            <p className="text-2xl font-display font-semibold italic text-foreground">{child.name} {child.surname}</p>
            <p className="mt-1 text-sm text-muted-foreground">{child.yearGroup ?? 'Year group yok'} {child.school ? `· ${child.school}` : ''}</p>
            <p className="mt-1 text-xs text-muted-foreground">Aile merkezi icindeki ogrenci sayfasi</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setActiveTab('details')} className="oak-btn-primary px-4 py-2 text-sm"><Pencil className="mr-2 inline h-4 w-4" />Duzenle</button>
          {activeProfile?.role === 'parent' && (
            <button onClick={() => navigate('/app/children')} className="oak-btn-ghost px-4 py-2 text-sm">Tum Ogrenciler</button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition-colors',
              activeTab === tab.id ? 'border-primary bg-accent text-primary' : 'border-border bg-card text-muted-foreground hover:text-foreground'
            )}
          >
            <OakwoodAssetIcon type={tab.icon} className="h-4 w-4" size={16} alt={`${tab.label} icon`} />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'details' && <ChildInfoEditor child={child} />}
      {activeTab === 'subjects' && <SubjectCards child={child} />}
      {activeTab === 'courses' && <CoursesPanel child={child} />}
      {activeTab === 'resources' && <ResourcesPanel child={child} />}
      {activeTab === 'messages' && <LearnerMessagesPanel child={child} familyParents={familyParents} siblings={siblings} />}
      {activeTab === 'homework' && <Homework />}
      {activeTab === 'archive' && <ArchivePanel child={child} />}
      {activeTab === 'reports' && <Reports />}
      {activeTab === 'notebooks' && <NotebookPanel child={child} />}
      {activeTab === 'calendar' && <CalendarPanel child={child} />}
    </div>
  )
}
