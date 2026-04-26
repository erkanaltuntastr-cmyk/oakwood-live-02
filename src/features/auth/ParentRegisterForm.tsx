import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface FormData {
  name: string
  surname: string
  familyName: string
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
const label = 'block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5'

function Label({ text, optional }: { text: string; optional?: boolean }) {
  return (
    <label className={label}>
      {text}{optional && <span className="ml-1 normal-case font-normal">(opsiyonel)</span>}
    </label>
  )
}

// DOB mask: DD/MM/YYYY
function formatDob(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 8)
  const parts: string[] = []
  if (digits.length > 0) parts.push(digits.slice(0, 2))
  if (digits.length > 2) parts.push(digits.slice(2, 4))
  if (digits.length > 4) parts.push(digits.slice(4, 8))
  return parts.join('/')
}

export function ParentRegisterForm({ onSubmit, onCancel }: ParentRegisterFormProps) {
  const [form, setForm] = useState<FormData>({
    name: '', surname: '', familyName: '', email: '',
    postcode: '', dob: '', gsm: '', profession: '',
    placeOfBirth: '', gender: '', aiBio: '',
    pinHash: '', legalConsent: false,
  })
  const [pinConfirm, setPinConfirm] = useState('')
  const [showPin, setShowPin] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData | 'pinConfirm', string>>>({})

  function set(key: keyof FormData, val: string | boolean) {
    setForm((f) => ({ ...f, [key]: val }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  function validate(): boolean {
    const e: typeof errors = {}
    if (!form.name.trim() || form.name.trim().length < 2) e.name = 'Ad zorunlu (min 2 karakter)'
    if (!form.surname.trim()) e.surname = 'Soyad zorunlu'
    if (form.dob && !/^\d{2}\/\d{2}\/\d{4}$/.test(form.dob)) e.dob = 'GG/AA/YYYY formatında gir'
    if (form.pinHash.length !== 4) e.pinHash = 'PIN 4 haneli olmalı'
    if (form.pinHash !== pinConfirm) errors.pinConfirm = "PIN'ler eşleşmiyor"
    if (!form.legalConsent) e.legalConsent = 'Yasal koşulları kabul etmelisin'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    if (validate()) {
      const { legalConsent, ...data } = form
      onSubmit({ ...data, name: data.name.trim(), surname: data.surname.trim() })
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 py-12">
      <div className="w-full max-w-lg oak-card-elevated px-8 py-9">
        <h1 className="text-2xl font-display font-semibold italic text-foreground mb-1">Veli Profili</h1>
        <p className="text-sm text-muted-foreground mb-8">Aile hesabı oluştur</p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name + Surname */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label text="Ad" />
              <input className={errors.name ? inpErr : inp} value={form.name}
                onChange={(e) => set('name', e.target.value)} placeholder="Adınız" />
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
            </div>
            <div>
              <Label text="Soyad" />
              <input className={errors.surname ? inpErr : inp} value={form.surname}
                onChange={(e) => set('surname', e.target.value)} placeholder="Soyadınız" />
              {errors.surname && <p className="text-xs text-destructive mt-1">{errors.surname}</p>}
            </div>
          </div>

          {/* Family Name */}
          <div>
            <Label text="Aile Adı" optional />
            <input className={inp} value={form.familyName}
              onChange={(e) => set('familyName', e.target.value)} placeholder="Örn: Blackwood" />
          </div>

          {/* Email + Postcode */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label text="E-posta" optional />
              <input className={inp} type="email" value={form.email}
                onChange={(e) => set('email', e.target.value)} placeholder="mail@örnek.com" />
            </div>
            <div>
              <Label text="Posta Kodu" optional />
              <input className={inp} value={form.postcode}
                onChange={(e) => set('postcode', e.target.value.toUpperCase())} placeholder="NW1 4AB" />
            </div>
          </div>

          {/* DOB + Gender */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label text="Doğum Tarihi" optional />
              <input className={errors.dob ? inpErr : inp} value={form.dob} inputMode="numeric"
                onChange={(e) => set('dob', formatDob(e.target.value))} placeholder="GG/AA/YYYY" />
              {errors.dob && <p className="text-xs text-destructive mt-1">{errors.dob}</p>}
            </div>
            <div>
              <Label text="Cinsiyet" optional />
              <select className={inp} value={form.gender} onChange={(e) => set('gender', e.target.value)}>
                <option value="">Belirtmek istemiyorum</option>
                <option value="female">Kadın</option>
                <option value="male">Erkek</option>
                <option value="nonbinary">Non-binary</option>
              </select>
            </div>
          </div>

          {/* GSM + Profession */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label text="GSM" optional />
              <input className={inp} value={form.gsm}
                onChange={(e) => set('gsm', e.target.value)} placeholder="+44 7700 000000" />
            </div>
            <div>
              <Label text="Meslek" optional />
              <input className={inp} value={form.profession}
                onChange={(e) => set('profession', e.target.value)} placeholder="Mesleğiniz" />
            </div>
          </div>

          {/* Place of birth */}
          <div>
            <Label text="Doğum Yeri" optional />
            <input className={inp} value={form.placeOfBirth}
              onChange={(e) => set('placeOfBirth', e.target.value)} placeholder="Şehir / Ülke" />
          </div>

          {/* AI Bio */}
          <div>
            <Label text="AI Bağlamı" optional />
            <textarea className={inp} rows={3} value={form.aiBio}
              onChange={(e) => set('aiBio', e.target.value)}
              placeholder="Öğrenme stili, güçlü yönler, zorluklar... Bu bilgiler AI asistanın sana daha iyi yardım etmesini sağlar." />
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
                  inputMode="numeric" maxLength={4} placeholder="••••" value={pinConfirm}
                  onChange={(e) => { setPinConfirm(e.target.value.replace(/\D/g,'').slice(0,4)); setErrors((er) => ({ ...er, pinConfirm: undefined })) }} />
                {errors.pinConfirm && <p className="text-xs text-destructive mt-1">{errors.pinConfirm}</p>}
              </div>
            </div>
          </div>

          {/* Legal consent */}
          <div className={`rounded-xl border p-4 ${errors.legalConsent ? 'border-destructive bg-destructive/5' : 'border-border bg-muted/40'}`}>
            <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
              <strong>Yasal Sorumluluk Reddi:</strong> Oakwood, girdiğiniz bilgiler doğrultusunda rehberlik sağlar.
              Sonuçları garanti etmez ve aldığınız kararların sorumluluğunu kabul etmez. Verileriniz yalnızca bu cihazda saklanır.
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
