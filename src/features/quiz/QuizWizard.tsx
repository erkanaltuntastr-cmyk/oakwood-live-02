import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { QuizWizardShell } from './QuizWizardShell'
import { useAppStore } from '@/state/store'
import { createSession, defaultConfig, SUBJECTS, SUBJECT_TOPICS } from '@/lib/quizService'
import type { QuizConfig } from '@/types'
import { cn } from '@/lib/utils'

// ── Step 1: Subject + Topic ────────────────────────────────────────────────

function StepSubject({
  subject, setSubject, topics, setTopics,
}: {
  subject: string; setSubject: (s: string) => void
  topics: string[]; setTopics: (t: string[]) => void
}) {
  const available = SUBJECT_TOPICS[subject] ?? []

  function toggleTopic(t: string) {
    setTopics(topics.includes(t) ? topics.filter((x) => x !== t) : [...topics, t])
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-foreground mb-3">Ders</p>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {SUBJECTS.map((s) => (
            <button
              key={s}
              onClick={() => { setSubject(s); setTopics([]) }}
              className={cn(
                'px-3 py-2 rounded-xl text-sm font-medium border transition-colors',
                subject === s
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {available.length > 0 && (
        <div>
          <p className="text-sm font-medium text-foreground mb-3">
            Konular <span className="text-muted-foreground font-normal">(opsiyonel, boş = tümü)</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {available.map((t) => (
              <button
                key={t}
                onClick={() => toggleTopic(t)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-sm border transition-colors',
                  topics.includes(t)
                    ? 'bg-accent text-primary border-primary/30 font-medium'
                    : 'border-border text-muted-foreground hover:bg-muted'
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Step 2: Settings ──────────────────────────────────────────────────────

function StepSettings({ config, setConfig }: { config: QuizConfig; setConfig: (c: QuizConfig) => void }) {
  const total = config.counts.multipleChoice + config.counts.gapFill + config.counts.openEnded

  function setCount(key: keyof QuizConfig['counts'], val: number) {
    setConfig({ ...config, counts: { ...config.counts, [key]: Math.max(0, val) } })
  }

  return (
    <div className="space-y-5">
      {/* Question type counts */}
      <div className="grid grid-cols-3 gap-4">
        {([
          ['multipleChoice', 'Çoktan Seçmeli'],
          ['gapFill', 'Boşluk Doldurma'],
          ['openEnded', 'Açık Uçlu'],
        ] as [keyof QuizConfig['counts'], string][]).map(([key, label]) => (
          <div key={key} className="text-center">
            <p className="text-xs text-muted-foreground mb-2">{label}</p>
            <div className="flex items-center justify-center gap-2">
              <button onClick={() => setCount(key, config.counts[key] - 1)}
                className="w-7 h-7 rounded-lg border border-border hover:bg-muted text-lg leading-none">−</button>
              <span className="w-6 text-center font-semibold text-foreground">{config.counts[key]}</span>
              <button onClick={() => setCount(key, config.counts[key] + 1)}
                className="w-7 h-7 rounded-lg border border-border hover:bg-muted text-lg leading-none">+</button>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-center text-muted-foreground">Toplam: {total} soru</p>

      {/* Options */}
      <div className="grid grid-cols-2 gap-4 border-t border-border pt-5">
        {[
          { label: 'İpucu göster', key: 'showHint' as const },
          { label: 'Açıklama göster', key: 'showExplanation' as const },
        ].map(({ label, key }) => (
          <label key={key} className="flex items-center gap-3 cursor-pointer">
            <div
              onClick={() => setConfig({ ...config, [key]: !config[key] })}
              className={cn(
                'w-10 h-6 rounded-full transition-colors cursor-pointer relative',
                config[key] ? 'bg-primary' : 'bg-muted border border-border'
              )}
            >
              <div className={cn(
                'absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all',
                config[key] ? 'left-5' : 'left-1'
              )} />
            </div>
            <span className="text-sm text-foreground">{label}</span>
          </label>
        ))}
      </div>

      {/* MC options count */}
      <div className="flex items-center gap-3 pt-1">
        <span className="text-sm text-foreground">Seçenek sayısı:</span>
        {[2, 3, 4].map((n) => (
          <button
            key={n}
            onClick={() => setConfig({ ...config, optionsCount: n })}
            className={cn(
              'w-8 h-8 rounded-lg border text-sm font-medium transition-colors',
              config.optionsCount === n
                ? 'bg-primary text-primary-foreground border-primary'
                : 'border-border hover:bg-muted'
            )}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Step 3: Preview ───────────────────────────────────────────────────────

function StepPreview({ subject, topics, config }: { subject: string; topics: string[]; config: QuizConfig }) {
  const total = config.counts.multipleChoice + config.counts.gapFill + config.counts.openEnded
  return (
    <div className="space-y-4">
      <div className="oak-card p-5 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Ders</span>
          <span className="font-medium text-foreground">{subject}</span>
        </div>
        {topics.length > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Konular</span>
            <span className="font-medium text-foreground text-right max-w-48">{topics.join(', ')}</span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Toplam soru</span>
          <span className="font-medium text-foreground">{total}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">İpucu</span>
          <span className="font-medium text-foreground">{config.showHint ? 'Açık' : 'Kapalı'}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Açıklama</span>
          <span className="font-medium text-foreground">{config.showExplanation ? 'Açık' : 'Kapalı'}</span>
        </div>
      </div>
      <p className="text-xs text-muted-foreground text-center">
        "Sınavı Oluştur" butonuna basınca sorular otomatik oluşturulur.
      </p>
    </div>
  )
}

// ── Main wizard ───────────────────────────────────────────────────────────

export function QuizWizard() {
  const { activeChildId, activeProfileId, addQuizSession } = useAppStore()
  const navigate = useNavigate()

  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [subject, setSubject] = useState('Mathematics')
  const [topics, setTopics] = useState<string[]>([])
  const [config, setConfig] = useState<QuizConfig>(defaultConfig(5))

  const childId = activeChildId ?? activeProfileId ?? ''

  function handleSubmit() {
    const session = createSession(childId, subject, topics, config)
    addQuizSession(session)
    navigate(`/app/quiz/session/${session.id}`)
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-display font-semibold text-foreground">Yeni Sınav</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {activeChildId
            ? `Seçili çocuk için sınav oluşturuluyor`
            : 'Bir çocuk seçmeden önce Aile Merkezi\'ne git'}
        </p>
      </div>

      <QuizWizardShell
        step={step}
        onBack={() => setStep((s) => Math.max(1, s - 1) as 1 | 2 | 3)}
        onNext={() => setStep((s) => Math.min(3, s + 1) as 1 | 2 | 3)}
        onSubmit={handleSubmit}
      >
        {step === 1 && <StepSubject subject={subject} setSubject={setSubject} topics={topics} setTopics={setTopics} />}
        {step === 2 && <StepSettings config={config} setConfig={setConfig} />}
        {step === 3 && <StepPreview subject={subject} topics={topics} config={config} />}
      </QuizWizardShell>
    </div>
  )
}
