import { useState } from 'react'

interface FormErrors {
  name?: string
  avatar?: string
  pin?: string
  pinConfirm?: string
}

interface ParentRegisterFormProps {
  onSubmit: (data: { name: string; avatar: string; pinHash: string }) => void
  onCancel: () => void
}

const AVATARS = ['👨', '👩', '👴', '👵', '🧑'] as const

export function ParentRegisterForm({ onSubmit, onCancel }: ParentRegisterFormProps) {
  const [name, setName] = useState('')
  const [selectedAvatar, setSelectedAvatar] = useState<string>('')
  const [pin, setPin] = useState('')
  const [pinConfirm, setPinConfirm] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})

  function validate(): boolean {
    const e: FormErrors = {}
    if (!name.trim()) e.name = 'Ad gereklidir'
    else if (name.trim().length < 2) e.name = 'Ad en az 2 karakter olmalıdır'
    if (!selectedAvatar) e.avatar = 'Avatar seçimi gereklidir'
    if (pin.length !== 4) e.pin = 'PIN 4 haneli olmalıdır'
    if (pin !== pinConfirm) e.pinConfirm = "PIN'ler eşleşmiyor"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    if (validate()) onSubmit({ name: name.trim(), avatar: selectedAvatar, pinHash: pin })
  }

  function onPin(val: string) { setPin(val.replace(/\D/g, '').slice(0, 4)) }
  function onPinConfirm(val: string) { setPinConfirm(val.replace(/\D/g, '').slice(0, 4)) }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Veli Kaydı</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Ad</label>
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setErrors((er) => ({ ...er, name: undefined })) }}
              placeholder="Adınızı girin"
              className={`w-full px-4 py-2.5 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-400' : 'border-gray-300'}`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Avatar */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Avatar</label>
            <div className="flex gap-2">
              {AVATARS.map((av) => (
                <button
                  key={av}
                  type="button"
                  onClick={() => { setSelectedAvatar(av); setErrors((er) => ({ ...er, avatar: undefined })) }}
                  className={`flex-1 py-3 text-3xl rounded-lg transition-all ${selectedAvatar === av ? 'ring-2 ring-blue-500 bg-blue-50' : 'border border-gray-300 hover:bg-gray-50'}`}
                >
                  {av}
                </button>
              ))}
            </div>
            {errors.avatar && <p className="text-red-500 text-sm mt-1">{errors.avatar}</p>}
          </div>

          {/* PIN */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">PIN (4 hane)</label>
            <input
              type="password"
              inputMode="numeric"
              value={pin}
              onChange={(e) => { onPin(e.target.value); setErrors((er) => ({ ...er, pin: undefined })) }}
              placeholder="••••"
              maxLength={4}
              className={`w-full px-4 py-2.5 border rounded-lg text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.pin ? 'border-red-400' : 'border-gray-300'}`}
            />
            {errors.pin && <p className="text-red-500 text-sm mt-1">{errors.pin}</p>}
          </div>

          {/* PIN confirm */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">PIN Tekrarı</label>
            <input
              type="password"
              inputMode="numeric"
              value={pinConfirm}
              onChange={(e) => { onPinConfirm(e.target.value); setErrors((er) => ({ ...er, pinConfirm: undefined })) }}
              placeholder="••••"
              maxLength={4}
              className={`w-full px-4 py-2.5 border rounded-lg text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.pinConfirm ? 'border-red-400' : 'border-gray-300'}`}
            />
            {errors.pinConfirm && <p className="text-red-500 text-sm mt-1">{errors.pinConfirm}</p>}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              İptal
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Kaydol
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
