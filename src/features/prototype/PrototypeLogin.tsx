import { useState } from 'react'
import { ArrowLeft, Eye, EyeOff, Users } from 'lucide-react'
import { OakwoodAssetIcon } from '@/components/brand/OakwoodAssetIcon'
import { cn } from '@/lib/utils'

import masterLogo from '@/assets/brand/logo/master-logo.png'
import familyHubBg from '@/assets/brand/backgrounds/family-hub-bg.png'

export function PrototypeLogin() {
  const [name, setName] = useState('')
  const [pin, setPin] = useState('')
  const [showPin, setShowPin] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!name.trim()) {
      setError('Please enter your name')
      return
    }
    if (pin.length !== 4) {
      setError('PIN must be 4 digits')
      return
    }
    // Demo: show success message
    setError('Demo mode - login simulation successful')
  }

  return (
    <div className="min-h-screen bg-[#fff8f5] flex">
      {/* Left Panel - Form */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b-2 border-[#d8cbb2]">
          <button className="flex items-center gap-2 text-sm text-[#6b6560] hover:text-[#333333] transition-colors font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
          <img src={masterLogo} alt="Oakwood Learning Hub" className="h-12 w-auto" />
          <div className="w-28" />
        </div>

        {/* Form Area */}
        <div className="flex-1 flex items-center justify-center px-8 py-12">
          <div className="w-full max-w-md">
            {/* Heading */}
            <div className="mb-10">
              <div className="flex items-center gap-5 mb-4">
                <div className="flex h-18 w-18 items-center justify-center rounded-2xl border-2 border-[#36563d]/30 bg-[#36563d]/10 shadow-md">
                  <OakwoodAssetIcon type="pin" className="h-12 w-12" size={48} alt="Security icon" />
                </div>
                <div>
                  <h1 className="font-display text-3xl font-semibold text-[#333333]">Welcome Back</h1>
                  <p className="text-base text-[#6b6560] mt-1">Sign in to your Family Hub</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-[#36563d] uppercase tracking-wider mb-3">
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                    setError(null)
                  }}
                  placeholder="Enter your name"
                  className="w-full px-5 py-4 text-base border-2 border-[#d8cbb2] rounded-2xl bg-white text-[#333333] placeholder:text-[#a8a29e] focus:outline-none focus:ring-2 focus:ring-[#36563d]/30 focus:border-[#36563d] transition-all"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#36563d] uppercase tracking-wider mb-3">
                  4-Digit PIN
                </label>
                <div className="relative">
                  <input
                    type={showPin ? 'text' : 'password'}
                    inputMode="numeric"
                    maxLength={4}
                    value={pin}
                    onChange={(e) => {
                      setPin(e.target.value.replace(/\D/g, '').slice(0, 4))
                      setError(null)
                    }}
                    placeholder="••••"
                    className="w-full px-5 py-4 text-center text-2xl tracking-[0.5em] border-2 border-[#d8cbb2] rounded-2xl bg-white text-[#333333] placeholder:text-[#d8cbb2] focus:outline-none focus:ring-2 focus:ring-[#36563d]/30 focus:border-[#36563d] transition-all pr-14"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6b6560] hover:text-[#333333] transition-colors"
                  >
                    {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className={cn(
                  'text-sm rounded-2xl px-4 py-3.5 border-2 font-medium',
                  error.includes('successful')
                    ? 'bg-[#a8bfa6]/20 text-[#36563d] border-[#36563d]/30'
                    : 'bg-red-50 text-red-700 border-red-200'
                )}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#36563d] text-white font-bold py-4 rounded-2xl hover:bg-[#4a6741] transition-colors shadow-lg shadow-[#36563d]/20 text-base"
              >
                Sign In
              </button>
            </form>

            {/* Alternative Actions */}
            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-[#d8cbb2]" />
                <span className="text-xs text-[#6b6560] uppercase tracking-wider font-medium">or</span>
                <div className="flex-1 h-px bg-[#d8cbb2]" />
              </div>

              <button className="w-full flex items-center justify-center gap-3 border-2 border-[#d8cbb2] bg-white px-5 py-4 rounded-2xl text-sm font-bold text-[#333333] hover:bg-[#fdfbf7] hover:border-[#c9a85d] transition-all">
                <Users className="w-5 h-5 text-[#36563d]" />
                Choose from Profiles
              </button>

              <div className="text-center space-y-3 pt-4">
                <p className="text-sm text-[#6b6560]">New to Oakwood Learning Hub?</p>
                <button className="text-sm font-bold text-[#36563d] hover:underline transition-colors">
                  Create Your Family Hub
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Visual */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-1/2 relative">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${familyHubBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#36563d]/40 via-[#4a6741]/20 to-[#36563d]/30" />

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center p-12 text-center w-full">
          <div className="rounded-[2rem] border-2 border-white/30 bg-white/90 p-8 shadow-2xl backdrop-blur-sm max-w-sm">
            {/* Large Logo */}
            <div className="flex justify-center mb-6">
              <img src={masterLogo} alt="Oakwood" className="h-16 w-auto" />
            </div>
            
            {/* Avatars */}
            <div className="flex justify-center mb-6">
              <div className="grid grid-cols-3 gap-3">
                <div className="flex h-18 w-18 items-center justify-center rounded-2xl border-2 border-[#a8bfa6]/50 bg-[#a8bfa6]/20 p-1.5">
                  <OakwoodAssetIcon type="parent-male" className="h-14 w-14" size={56} alt="Parent icon" />
                </div>
                <div className="flex h-18 w-18 items-center justify-center rounded-2xl border-2 border-[#a8bfa6]/50 bg-[#a8bfa6]/20 p-1.5">
                  <OakwoodAssetIcon type="parent-female" className="h-14 w-14" size={56} alt="Parent icon" />
                </div>
                <div className="flex h-18 w-18 items-center justify-center rounded-2xl border-2 border-[#f0d58c]/50 bg-[#f0d58c]/20 p-1.5">
                  <OakwoodAssetIcon type="student-year7" className="h-14 w-14" size={56} alt="Student icon" />
                </div>
              </div>
            </div>
            <h3 className="font-display text-xl font-semibold text-[#333333]">
              Your Family's Learning Hub
            </h3>
            <p className="mt-3 text-sm text-[#5F5951] leading-relaxed">
              Keep your children's education organised, track progress together, and celebrate every achievement as a family.
            </p>
          </div>

          {/* Trust Badge */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border-2 border-white/40 bg-white/80 px-6 py-3 text-sm font-semibold text-[#36563d] backdrop-blur-sm shadow-lg">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#36563d]/15">
              <OakwoodAssetIcon type="pin" className="h-5 w-5" size={20} alt="Security" />
            </div>
            Private &amp; Secure
          </div>
        </div>
      </div>
    </div>
  )
}
