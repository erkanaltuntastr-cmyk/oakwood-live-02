import { useState } from 'react'

interface FormErrors {
  name?: string
  avatar?: string
  yearGroup?: string
  pin?: string
  pinConfirm?: string
}

interface ChildRegisterFormProps {
  onSubmit: (data: { name: string; avatar: string; yearGroup: string; pinHash: string }) => void
  onCancel: () => void
}

const AVATARS = ['🧒', '👧', '👦', '🧑', '👶'] as const
const YEAR_GROUPS = Array.from({ length: 13 }, (_, i) => `Year ${i + 1}`)

export function ChildRegisterForm({ onSubmit, onCancel }: ChildRegisterFormProps) {
  const [name, setName] = useState('')
  const [selectedAvatar, setSelectedAvatar] = useState<string>('')
  const [yearGroup, setYearGroup] = useState('')
  const [pin, setPin] = useState('')
  const [pinConfirm, setPinConfirm] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})

  function validate(): boolean {
    const e: FormErrors = {}
    if (!name.trim()) e.name = 'Ad gereklidir'
    else if (name.trim().length < 2) e.name = 'Ad en az 2 karakter olmalıdır'
    if (!selectedAvatar) e.avatar = 'Avatar seçimi gereklidir'
    if (!yearGroup) e.yearGroup = 'Sınıf seçimi gereklidir'
    if (pin.length !== 4) e.pin = 'PIN 4 haneli olmalıdır'
    if (pin !== pinConfirm) e.pinConfirm = "PIN'ler eşleşmiyor"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    if (validate()) onSubmit({ name: name.trim(), avatar: selectedAvatar, yearGroup, pinHash: pin })
  }

  function onPin(val: string) { setPin(val.replace(/\D/g, '').slice(0, 4)) }
  function onPinConfirm(val: string) { setPinConfirm(val.replace(/\D/g, '').slice(0, 4)) }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-orange-50 to-yellow-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-orange-100 p-8">
        <h1 className="text-2xl font-bold text-orange-600 mb-1">Hoşgeldin! 👋</h1>
        <p className="text-gray-500 text-sm mb-6">Profilini oluşturalım</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Adın nedir?</label>
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setErrors((er) => ({ ...er, name: undefined })) }}
              placeholder="Adını yaz..."
              className={`w-full px-4 py-2.5 border-2 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 ${errors.name ? 'border-red-400 bg-red-50' : 'border-orange-200 bg-orange-50'}`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Avatar */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Hangi avatarı seçersin?</label>
            <div className="flex gap-2">
              {AVATARS.map((av) => (
                <button
                  key={av}
                  type="button"
                  onClick={() => { setSelectedAvatar(av); setErrors((er) => ({ ...er, avatar: undefined })) }}
                  className={`flex-1 py-3 text-4xl rounded-xl transition-all ${selectedAvatar === av ? 'ring-4 ring-orange-400 ring-offset-2 bg-orange-100 scale-110' : 'border-2 border-orange-200 bg-orange-50 hover:bg-orange-100'}`}
                >
                  {av}
                </button>
              ))}
            </div>
            {errors.avatar && <p className="text-red-500 text-sm mt-1">{errors.avatar}</p>}
          </div>

          {/* Year Group */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Hangi sınıftasın?</label>
            <select
              value={yearGroup}
              onChange={(e) => { setYearGroup(e.target.value); setErrors((er) => ({ ...er, yearGroup: undefined })) }}
              className={`w-full px-4 py-2.5 border-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white ${errors.yearGroup ? 'border-red-400' : 'border-orange-200'}`}
            >
              <option value="">Bir sınıf seç...</option>
              {YEAR_GROUPS.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
            {errors.yearGroup && <p className="text-red-500 text-sm mt-1">{errors.yearGroup}</p>}
          </div>

          {/* PIN */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Özel PIN'in (4 hane)</label>
            <input
              type="password"
              inputMode="numeric"
              value={pin}
              onChange={(e) => { onPin(e.target.value); setErrors((er) => ({ ...er, pin: undefined })) }}
              placeholder="••••"
              maxLength={4}
              className={`w-full px-4 py-2.5 border-2 rounded-lg text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-orange-400 ${errors.pin ? 'border-red-400 bg-red-50' : 'border-orange-200 bg-orange-50'}`}
            />
            {errors.pin && <p className="text-red-500 text-sm mt-1">{errors.pin}</p>}
          </div>

          {/* PIN confirm */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">PIN'i tekrar gir</label>
            <input
              type="password"
              inputMode="numeric"
              value={pinConfirm}
              onChange={(e) => { onPinConfirm(e.target.value); setErrors((er) => ({ ...er, pinConfirm: undefined })) }}
              placeholder="••••"
              maxLength={4}
              className={`w-full px-4 py-2.5 border-2 rounded-lg text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-orange-400 ${errors.pinConfirm ? 'border-red-400 bg-red-50' : 'border-orange-200 bg-orange-50'}`}
            />
            {errors.pinConfirm && <p className="text-red-500 text-sm mt-1">{errors.pinConfirm}</p>}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2.5 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
            >
              İptal
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-orange-400 to-yellow-400 text-white font-semibold rounded-lg hover:from-orange-500 hover:to-yellow-500 transition-all shadow-sm"
            >
              Profili Oluştur
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
