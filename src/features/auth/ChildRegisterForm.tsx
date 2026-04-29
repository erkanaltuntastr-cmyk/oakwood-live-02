import { useState, useRef, useEffect } from 'react'
import { Eye, EyeOff, Plus, X } from 'lucide-react'
import { searchSchools } from '@/lib/schoolSearch'
import type { ChildRegistrationFormDraft } from '@/types'

export interface ChildRegistrationData {
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
}

interface FormData extends ChildRegistrationFormDraft {}

interface ChildRegisterFormProps {
  onSubmit: (data: ChildRegistrationData) => void
  onCancel: () => void
  draft?: ChildRegistrationFormDraft | null
  onDraftChange?: (draft: ChildRegistrationFormDraft) => void
}

const inp = 'w-full px-3 py-2.5 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 transition-colors'
const inpErr = 'w-full px-3 py-2.5 text-sm border border-destructive rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-destructive/40 transition-colors'

function Label({ text, optional }: { text: string; optional?: boolean }) {
  return (
    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
      {text}{optional && <span className="ml-1 normal-case font-normal">(opsiyonel)</span>}
    </label>
  )
}

function formatDob(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 8)
  const parts: string[] = []
  if (digits.length > 0) parts.push(digits.slice(0, 2))
  if (digits.length > 2) parts.push(digits.slice(2, 4))
  if (digits.length > 4) parts.push(digits.slice(4, 8))
  return parts.join('/')
}

const YEAR_GROUPS = Array.from({ length: 13 }, (_, i) => `Year ${i + 1}`)

// ── School autocomplete ────────────────────────────────────────────────────
function SchoolInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [open, setOpen] = useState(false)
  const [activeIdx, setActiveIdx] = useState(-1)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  async function handleInput(q: string) {
    onChange(q)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (!q.trim()) { setSuggestions([]); setOpen(false); return }
    debounceRef.current = setTimeout(async () => {
      const results = await searchSchools(q)
      setSuggestions(results)
      setOpen(results.length > 0)
      setActiveIdx(-1)
    }, 150)
  }

  function pick(label: string) {
    onChange(label)
    setSuggestions([])
    setOpen(false)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open) return
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx((i) => Math.min(i + 1, suggestions.length - 1)) }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setActiveIdx((i) => Math.max(i - 1, 0)) }
    if (e.key === 'Enter' && activeIdx >= 0) { e.preventDefault(); pick(suggestions[activeIdx]) }
    if (e.key === 'Escape') setOpen(false)
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className="relative">
      <input
        className={inp}
        value={value}
        onChange={(e) => handleInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => { if (suggestions.length) setOpen(true) }}
        placeholder="Okul adı veya posta kodu yaz..."
        autoComplete="off"
      />
      {open && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-border rounded-xl shadow-card-md overflow-hidden max-h-52 overflow-y-auto">
          {suggestions.map((s, i) => (
            <button key={s} type="button" onMouseDown={() => pick(s)}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${i === activeIdx ? 'bg-accent text-primary' : 'hover:bg-muted text-foreground'}`}>
              {s}
            </button>
          ))}
          <div className="px-4 py-1.5 text-xs text-muted-foreground border-t border-border bg-muted/30">
            Kaynak: GIAS (DfE)
          </div>
        </div>
      )}
    </div>
  )
}

// ── Main form ──────────────────────────────────────────────────────────────
const EMPTY_FORM: FormData = {
  name: '', surname: '', dob: '', gender: '',
  school: '', yearGroup: '', className: '',
  nativeLanguage: '', learningLanguage: '', foreignLanguage: '',
  externalEducation: [''], specialInformation: '',
  pinHash: '', pinConfirm: '', legalConsent: false,
}

export function ChildRegisterForm({ onSubmit, onCancel, draft, onDraftChange }: ChildRegisterFormProps) {
  const [form, setForm] = useState<FormData>(draft ?? EMPTY_FORM)
  const [showPin, setShowPin] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData | 'pinConfirm', string>>>({})

  function set(key: keyof FormData, val: string | boolean) {
    setForm((f) => ({ ...f, [key]: val }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  useEffect(() => {
    onDraftChange?.(form)
  }, [form, onDraftChange])

  function validate(): boolean {
    const e: typeof errors = {}
    if (!form.name.trim() || form.name.trim().length < 2) e.name = 'Ad zorunlu (min 2 karakter)'
    if (!form.dob.trim()) e.dob = 'Dogum tarihi zorunlu'
    if (!form.school.trim()) e.school = 'Okul adi zorunlu'
    if (!form.yearGroup) e.yearGroup = 'Sınıf zorunlu'
    if (!form.nativeLanguage.trim()) e.nativeLanguage = 'Ana dili zorunlu'
    if (!form.learningLanguage.trim()) e.learningLanguage = 'Ogrenim dili zorunlu'
    if (!form.foreignLanguage.trim()) e.foreignLanguage = 'Yabanci dil zorunlu'
    if (form.dob && !/^\d{2}\/\d{2}\/\d{4}$/.test(form.dob)) e.dob = 'GG/AA/YYYY formatında gir'
    if (form.pinHash.length !== 4) e.pinHash = 'PIN 4 haneli olmalı'
    if (form.pinHash !== form.pinConfirm) e.pinConfirm = "PIN'ler eşleşmiyor"
    if (!form.legalConsent) e.legalConsent = 'Yasal koşulları kabul etmelisin'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function updateExternalEducation(index: number, value: string) {
    setForm((current) => ({
      ...current,
      externalEducation: current.externalEducation.map((item, itemIndex) => itemIndex === index ? value : item),
    }))
  }

  function addExternalEducationRow() {
    setForm((current) => ({
      ...current,
      externalEducation: [...current.externalEducation, ''],
    }))
  }

  function removeExternalEducationRow(index: number) {
    setForm((current) => ({
      ...current,
      externalEducation: current.externalEducation.filter((_, itemIndex) => itemIndex !== index),
    }))
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    if (validate()) {
      const { legalConsent, ...data } = form
      onSubmit({
        ...data,
        name: data.name.trim(),
        surname: data.surname.trim(),
        school: data.school.trim(),
        className: data.className.trim(),
        nativeLanguage: data.nativeLanguage.trim(),
        learningLanguage: data.learningLanguage.trim(),
        foreignLanguage: data.foreignLanguage.trim(),
        specialInformation: data.specialInformation.trim(),
        externalEducation: data.externalEducation.map((item) => item.trim()).filter(Boolean),
      })
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 py-12">
      <div className="w-full max-w-lg oak-card-elevated px-8 py-9">
        <h1 className="text-2xl font-display font-semibold italic text-foreground mb-1">Öğrenci Profili</h1>
        <p className="text-sm text-muted-foreground mb-8">Çocuk hesabı oluştur</p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name + Surname */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label text="Ad" />
              <input className={errors.name ? inpErr : inp} value={form.name}
                onChange={(e) => set('name', e.target.value)} placeholder="Adı" />
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
            </div>
            <div>
              <Label text="Soyad" optional />
              <input className={inp} value={form.surname}
                onChange={(e) => set('surname', e.target.value)} placeholder="Soyadı" />
            </div>
          </div>

          {/* DOB + Gender */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label text="Doğum Tarihi" />
              <input className={errors.dob ? inpErr : inp} value={form.dob} inputMode="numeric"
                onChange={(e) => set('dob', formatDob(e.target.value))} placeholder="GG/AA/YYYY" />
              {errors.dob && <p className="text-xs text-destructive mt-1">{errors.dob}</p>}
            </div>
            <div>
              <Label text="Cinsiyet" optional />
              <select className={inp} value={form.gender} onChange={(e) => set('gender', e.target.value)}>
                <option value="">—</option>
                <option value="female">Female / Girl</option>
                <option value="male">Male / Boy</option>
                <option value="nonbinary">Non-binary</option>
                <option value="prefer-not">Prefer not to say</option>
              </select>
            </div>
          </div>

          {/* School autocomplete */}
          <div>
            <Label text="Okul" />
            <SchoolInput value={form.school} onChange={(v) => set('school', v)} />
            {errors.school && <p className="text-xs text-destructive mt-1">{errors.school}</p>}
          </div>

          {/* Year group */}
          <div>
            <Label text="Sınıf (Year Group)" />
            <select className={errors.yearGroup ? inpErr : inp} value={form.yearGroup}
              onChange={(e) => set('yearGroup', e.target.value)}>
              <option value="">Sınıf seç...</option>
              {YEAR_GROUPS.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
            {errors.yearGroup && <p className="text-xs text-destructive mt-1">{errors.yearGroup}</p>}
          </div>

          <div>
            <Label text="Sinif Adi" optional />
            <input className={inp} value={form.className}
              onChange={(e) => set('className', e.target.value)}
              placeholder="Orn. 4B / Maple Class" />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <Label text="Cocugun Ana Dili" />
              <input
                className={errors.nativeLanguage ? inpErr : inp}
                value={form.nativeLanguage}
                onChange={(e) => set('nativeLanguage', e.target.value)}
                placeholder="Orn. Turkce"
              />
              {errors.nativeLanguage && <p className="text-xs text-destructive mt-1">{errors.nativeLanguage}</p>}
            </div>
            <div>
              <Label text="Cocugun Ogrenim Dili" />
              <input
                className={errors.learningLanguage ? inpErr : inp}
                value={form.learningLanguage}
                onChange={(e) => set('learningLanguage', e.target.value)}
                placeholder="Orn. English"
              />
              {errors.learningLanguage && <p className="text-xs text-destructive mt-1">{errors.learningLanguage}</p>}
            </div>
            <div>
              <Label text="Ogrendigi 1 Yabanci Dil" />
              <input
                className={errors.foreignLanguage ? inpErr : inp}
                value={form.foreignLanguage}
                onChange={(e) => set('foreignLanguage', e.target.value)}
                placeholder="Orn. Spanish"
              />
              {errors.foreignLanguage && <p className="text-xs text-destructive mt-1">{errors.foreignLanguage}</p>}
            </div>
          </div>

          {/* External education */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <Label text="Okul Disi Egitim" optional />
              <button
                type="button"
                onClick={addExternalEducationRow}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-primary hover:bg-accent/40 transition-colors"
                aria-label="Yeni egitim satiri ekle"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2">
              {form.externalEducation.map((item, index) => (
                <div key={`external-${index}`} className="flex items-center gap-2">
                  <input
                    className={inp}
                    value={item}
                    onChange={(e) => updateExternalEducation(index, e.target.value)}
                    placeholder="Orn. Piyano, kumon, yuzme, coding club"
                  />
                  {form.externalEducation.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeExternalEducationRow(index)}
                      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      aria-label="Bu satiri sil"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Special information */}
          <div>
            <Label text="Ozel Bilgiler" optional />
            <textarea className={inp} rows={4} value={form.specialInformation}
              onChange={(e) => set('specialInformation', e.target.value)}
              placeholder="Alerji, ogrenme notlari, hassasiyetler, destek ihtiyaclari ve bilinmesini istedigin detaylar..." />
          </div>

          {/* PIN */}
          <div className="border-t border-border pt-5">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">PIN Oluştur</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label text="PIN (4 hane)" />
                <div className="relative">
                  <input className={errors.pinHash ? inpErr : inp} type={showPin ? 'text' : 'password'}
                    inputMode="numeric" maxLength={4} placeholder="••••" value={form.pinHash}
                    onChange={(e) => set('pinHash', e.target.value.replace(/\D/g,'').slice(0,4))} />
                  <button type="button" onClick={() => setShowPin((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showPin ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
                {errors.pinHash && <p className="text-xs text-destructive mt-1">{errors.pinHash}</p>}
              </div>
              <div>
                <Label text="PIN Tekrar" />
                <input className={errors.pinConfirm ? inpErr : inp} type={showPin ? 'text' : 'password'}
                  inputMode="numeric" maxLength={4} placeholder="••••" value={form.pinConfirm}
                  onChange={(e) => {
                    setForm((current) => ({ ...current, pinConfirm: e.target.value.replace(/\D/g,'').slice(0,4) }))
                    setErrors((er) => ({ ...er, pinConfirm: undefined }))
                  }} />
                {errors.pinConfirm && <p className="text-xs text-destructive mt-1">{errors.pinConfirm}</p>}
              </div>
            </div>
          </div>

          {/* Legal consent */}
          <div className={`rounded-xl border p-4 ${errors.legalConsent ? 'border-destructive bg-destructive/5' : 'border-border bg-muted/40'}`}>
            <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
              <strong>Yasal Sorumluluk Reddi:</strong> Oakwood rehberlik sağlar; sonuçları garanti etmez.
              Veriler yalnızca bu cihazda saklanır.
            </p>
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input type="checkbox" checked={form.legalConsent}
                onChange={(e) => set('legalConsent', e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-primary" />
              <span className="text-sm text-foreground">Yasal koşulları okudum ve kabul ediyorum</span>
            </label>
            {errors.legalConsent && <p className="text-xs text-destructive mt-1">{errors.legalConsent}</p>}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onCancel} className="flex-1 oak-btn-ghost">İptal</button>
            <button type="submit" className="flex-1 oak-btn-primary">Profil Oluştur</button>
          </div>
        </form>
      </div>
    </div>
  )
}
