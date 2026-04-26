import { useState } from 'react'

interface FormErrors {
  name?: string
  pin?: string
  pinConfirm?: string
}

interface ParentRegisterFormProps {
  onSubmit: (data: { name: string; surname?: string; pinHash: string }) => void
  onCancel: () => void
}

const inp = 'w-full px-3 py-2.5 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 transition-colors'
const inpErr = 'w-full px-3 py-2.5 text-sm border border-destructive rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-destructive/40 transition-colors'

export function ParentRegisterForm({ onSubmit, onCancel }: ParentRegisterFormProps) {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [pin, setPin] = useState('')
  const [pinConfirm, setPinConfirm] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})

  function validate(): boolean {
    const e: FormErrors = {}
    if (!name.trim() || name.trim().length < 2) e.name = 'Ad en az 2 karakter olmalı'
    if (pin.length !== 4) e.pin = 'PIN 4 haneli olmalı'
    if (pin !== pinConfirm) e.pinConfirm = "PIN'ler eşleşmiyor"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    if (validate()) onSubmit({ name: name.trim(), surname: surname.trim() || undefined, pinHash: pin })
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md oak-card-elevated p-8">
        <h1 className="text-2xl font-display font-semibold italic text-foreground mb-1">Veli Kaydı</h1>
        <p className="text-sm text-muted-foreground mb-7">Aile profili oluştur</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Ad *</label>
              <input className={errors.name ? inpErr : inp} value={name}
                onChange={(e) => { setName(e.target.value); setErrors((er) => ({ ...er, name: undefined })) }}
                placeholder="Adınızı girin" />
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Soyad</label>
              <input className={inp} value={surname} onChange={(e) => setSurname(e.target.value)} placeholder="Soyad" />
            </div>
          </div>

          <div className="border-t border-border pt-5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">PIN Oluştur</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">PIN (4 hane) *</label>
                <input className={errors.pin ? inpErr : inp} type="password" inputMode="numeric"
                  maxLength={4} placeholder="••••" value={pin}
                  onChange={(e) => { setPin(e.target.value.replace(/\D/g, '').slice(0, 4)); setErrors((er) => ({ ...er, pin: undefined })) }} />
                {errors.pin && <p className="text-xs text-destructive mt-1">{errors.pin}</p>}
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">PIN Tekrar *</label>
                <input className={errors.pinConfirm ? inpErr : inp} type="password" inputMode="numeric"
                  maxLength={4} placeholder="••••" value={pinConfirm}
                  onChange={(e) => { setPinConfirm(e.target.value.replace(/\D/g, '').slice(0, 4)); setErrors((er) => ({ ...er, pinConfirm: undefined })) }} />
                {errors.pinConfirm && <p className="text-xs text-destructive mt-1">{errors.pinConfirm}</p>}
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onCancel} className="flex-1 oak-btn-ghost">İptal</button>
            <button type="submit" className="flex-1 oak-btn-primary">Kaydol</button>
          </div>
        </form>
      </div>
    </div>
  )
}
