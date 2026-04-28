import { useState, useEffect } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useAppStore } from '@/state/store'

interface FormData {
  name: string
  surname: string
  username: string
  spaceName: string   // replaces familyName — the learning hub name
  email: string
  postcode: string
  dob: string
  gsm: string
  profession: string
  placeOfBirth: string
  gender: string
  aiBio: string
  pinHash: string
  legalConsent: boolean
}

interface ParentRegisterFormProps {
  onSubmit: (data: Omit<FormData, 'legalConsent'>) => void
  onCancel: () => void
}

const inp = 'w-full px-3 py-2.5 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 transition-colors'
const inpErr = 'w-full px-3 py-2.5 text-sm border border-destructive rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-destructive/40 transition-colors'

function Label({ text, optional }: { text: string; optional?: boolean }) {
  return (
    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
      {text}{optional && <span className="ml-1 normal-case font-normal">(optional)</span>}
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

/** Generate a unique username suggestion based on name+surname */
function suggestUsername(name: string, surname: string, existing: string[]): string {
  const base = name.trim().toLowerCase().replace(/\s+/g, '')
  if (!base) return ''
  const taken = (u: string) => existing.some((e) => e.toLowerCase() === u.toLowerCase())
  if (!taken(base)) return base
  const s1 = `${base}${surname[0]?.toLowerCase() ?? ''}`.trim()
  if (s1 !== base && !taken(s1)) return s1
  const s2 = `${base}${surname.slice(0, 2)?.toLowerCase() ?? ''}`.trim()
  if (s2 !== s1 && !taken(s2)) return s2
  return `${base}${Math.floor(Math.random() * 90) + 10}`
}

export function ParentRegisterForm({ onSubmit, onCancel }: ParentRegisterFormProps) {
  const { profiles } = useAppStore()
  const existingUsernames = profiles.map((p) => p.name)

  const [form, setForm] = useState<FormData>({
    name: '', surname: '', username: '', spaceName: '',
    email: '', postcode: '', dob: '', gsm: '',
    profession: '', placeOfBirth: '', gender: '',
    aiBio: '', pinHash: '', legalConsent: false,
  })
  const [pinConfirm, setPinConfirm] = useState('')
  const [showPin, setShowPin] = useState(false)
  const [usernameTouched, setUsernameTouched] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData | 'pinConfirm', string>>>({})

  // Auto-suggest username when name/surname changes (if user hasn't edited it manually)
  useEffect(() => {
    if (!usernameTouched && form.name) {
      const suggestion = suggestUsername(form.name, form.surname, existingUsernames)
      setForm((f) => ({ ...f, username: suggestion }))
    }
  }, [form.name, form.surname, usernameTouched])

  function set(key: keyof FormData, val: string | boolean) {
    setForm((f) => ({ ...f, [key]: val }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  function validate(): boolean {
    const e: typeof errors = {}
    if (!form.name.trim() || form.name.trim().length < 2) e.name = 'First name required (min 2 chars)'
    if (!form.surname.trim()) e.surname = 'Last name required'
    if (!form.username.trim() || form.username.trim().length < 2) e.username = 'Username required (min 2 chars)'
    if (form.dob && !/^\d{2}\/\d{2}\/\d{4}$/.test(form.dob)) e.dob = 'Use DD/MM/YYYY'
    if (form.pinHash.length !== 4) e.pinHash = 'PIN must be 4 digits'
    if (form.pinHash !== pinConfirm) e.pinConfirm = 'PINs do not match'
    if (!form.legalConsent) e.legalConsent = 'You must accept the terms to continue'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    if (validate()) {
      const { legalConsent, ...data } = form
      onSubmit({ ...data, name: data.name.trim(), surname: data.surname.trim(), username: data.username.trim() })
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 py-12">
      <div className="w-full max-w-lg oak-card-elevated px-8 py-9">
        <h1 className="text-2xl font-display font-semibold italic text-foreground mb-1">Parent / Guardian Profile</h1>
        <p className="text-sm text-muted-foreground mb-8">Create a family account</p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name + Surname */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label text="First Name" />
              <input className={errors.name ? inpErr : inp} value={form.name}
                onChange={(e) => set('name', e.target.value)} placeholder="Your first name" />
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
            </div>
            <div>
              <Label text="Last Name" />
              <input className={errors.surname ? inpErr : inp} value={form.surname}
                onChange={(e) => set('surname', e.target.value)} placeholder="Your last name" />
              {errors.surname && <p className="text-xs text-destructive mt-1">{errors.surname}</p>}
            </div>
          </div>

          {/* Username — auto-suggested, editable */}
          <div>
            <Label text="Username" />
            <div className="relative">
              <input className={errors.username ? inpErr : inp} value={form.username}
                onChange={(e) => { setUsernameTouched(true); set('username', e.target.value.toLowerCase().replace(/\s+/g, '')) }}
                placeholder="e.g. jamie" />
              {!usernameTouched && form.username && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-primary bg-accent/60 px-1.5 py-0.5 rounded">Suggested</span>
              )}
            </div>
            {errors.username && <p className="text-xs text-destructive mt-1">{errors.username}</p>}
            <p className="text-xs text-muted-foreground mt-1">This is what you'll type to sign in.</p>
          </div>

          {/* Family Tree name */}
          <div>
            <Label text="Family Tree Name" optional />
            <input className={inp} value={form.spaceName}
              onChange={(e) => set('spaceName', e.target.value)}
              placeholder="e.g. The Blackwood Academy, Oakwood Circle..." />
            <p className="text-xs text-muted-foreground mt-1">
              Give your Oakwood Family Tree a name. This appears in your Family Hub.
            </p>
          </div>

          {/* Email + Postcode */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label text="Email" optional />
              <input className={inp} type="email" value={form.email}
                onChange={(e) => set('email', e.target.value)} placeholder="you@example.com" />
            </div>
            <div>
              <Label text="Postcode" optional />
              <input className={inp} value={form.postcode}
                onChange={(e) => set('postcode', e.target.value.toUpperCase())} placeholder="e.g. NW1 4AB" />
            </div>
          </div>

          {/* DOB + Gender */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label text="Date of Birth" optional />
              <input className={errors.dob ? inpErr : inp} value={form.dob} inputMode="numeric"
                onChange={(e) => set('dob', formatDob(e.target.value))} placeholder="DD/MM/YYYY" />
              {errors.dob && <p className="text-xs text-destructive mt-1">{errors.dob}</p>}
            </div>
            <div>
              <Label text="Gender" optional />
              <select className={inp} value={form.gender} onChange={(e) => set('gender', e.target.value)}>
                <option value="">—</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="nonbinary">Non-binary</option>
                <option value="prefer-not">Prefer not to say</option>
              </select>
            </div>
          </div>

          {/* GSM + Profession */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label text="Mobile" optional />
              <input className={inp} value={form.gsm}
                onChange={(e) => set('gsm', e.target.value)} placeholder="+44 7700 000000" />
            </div>
            <div>
              <Label text="Occupation" optional />
              <input className={inp} value={form.profession}
                onChange={(e) => set('profession', e.target.value)} placeholder="Your occupation" />
            </div>
          </div>

          {/* Place of birth */}
          <div>
            <Label text="Place of Birth" optional />
            <input className={inp} value={form.placeOfBirth}
              onChange={(e) => set('placeOfBirth', e.target.value)} placeholder="City / Country" />
          </div>

          {/* AI Bio */}
          <div>
            <Label text="AI Context" optional />
            <textarea className={inp} rows={3} value={form.aiBio}
              onChange={(e) => set('aiBio', e.target.value)}
              placeholder="Learning styles, strengths, challenges... Helps the AI give more personalised guidance." />
          </div>

          {/* PIN */}
          <div className="border-t border-border pt-5">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Create PIN</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label text="PIN (4 digits)" />
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
                <Label text="Confirm PIN" />
                <input className={errors.pinConfirm ? inpErr : inp} type={showPin ? 'text' : 'password'}
                  inputMode="numeric" maxLength={4} placeholder="••••" value={pinConfirm}
                  onChange={(e) => { setPinConfirm(e.target.value.replace(/\D/g,'').slice(0,4)); setErrors((er) => ({ ...er, pinConfirm: undefined })) }} />
                {errors.pinConfirm && <p className="text-xs text-destructive mt-1">{errors.pinConfirm}</p>}
              </div>
            </div>
          </div>

          {/* Legal consent */}
          <div className={`rounded-xl border p-4 ${errors.legalConsent ? 'border-destructive bg-destructive/5' : 'border-border bg-muted/40'}`}>
            <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
              <strong>Legal Disclaimer:</strong> Oakwood provides guidance based on your input. We do not guarantee outcomes or accept liability for decisions you make. Data is stored on this device only.
            </p>
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input type="checkbox" checked={form.legalConsent}
                onChange={(e) => set('legalConsent', e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-primary" />
              <span className="text-sm text-foreground">I have read and accept the terms</span>
            </label>
            {errors.legalConsent && <p className="text-xs text-destructive mt-1">{errors.legalConsent}</p>}
          </div>

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onCancel} className="flex-1 oak-btn-ghost">Cancel</button>
            <button type="submit" className="flex-1 oak-btn-primary">Create Profile</button>
          </div>
        </form>
      </div>
    </div>
  )
}
