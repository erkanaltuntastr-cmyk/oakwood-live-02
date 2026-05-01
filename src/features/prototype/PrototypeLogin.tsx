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
    <div className="min-h-screen bg-oak-warm flex">
      {/* Left Panel - Form */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-oak-beige">
          <button className="flex items-center gap-2 text-sm text-oak-muted hover:text-oak-text transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
          <img src={masterLogo} alt="Oakwood Learning Hub" className="h-10 w-auto" />
          <div className="w-24" />
        </div>

        {/* Form Area */}
        <div className="flex-1 flex items-center justify-center px-8 py-12">
          <div className="w-full max-w-md">
            {/* Heading */}
            <div className="mb-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-oak-beige bg-white shadow-card">
                  <OakwoodAssetIcon type="pin" className="h-9 w-9" size={36} alt="Security icon" />
                </div>
                <div>
                  <h1 className="font-display text-3xl font-semibold text-oak-text">Welcome Back</h1>
                  <p className="text-sm text-oak-muted mt-1">Sign in to your Family Hub</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-oak-muted uppercase tracking-wider mb-3">
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
                  className="w-full px-5 py-4 text-base border border-oak-beige rounded-2xl bg-white text-oak-text placeholder:text-oak-muted/60 focus:outline-none focus:ring-2 focus:ring-oak-green/30 focus:border-oak-green/50 transition-all"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-oak-muted uppercase tracking-wider mb-3">
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
                    className="w-full px-5 py-4 text-center text-2xl tracking-[0.5em] border border-oak-beige rounded-2xl bg-white text-oak-text placeholder:text-oak-muted/40 focus:outline-none focus:ring-2 focus:ring-oak-green/30 focus:border-oak-green/50 transition-all pr-14"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-oak-muted hover:text-oak-text transition-colors"
                  >
                    {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className={cn(
                  'text-sm rounded-2xl px-4 py-3 border',
                  error.includes('successful')
                    ? 'bg-oak-green-light text-oak-green border-oak-green/20'
                    : 'bg-red-50 text-red-600 border-red-200'
                )}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-oak-green text-white font-semibold py-4 rounded-2xl hover:bg-oak-green-hover transition-colors shadow-card text-base"
              >
                Sign In
              </button>
            </form>

            {/* Alternative Actions */}
            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-oak-beige" />
                <span className="text-xs text-oak-muted uppercase tracking-wider">or</span>
                <div className="flex-1 h-px bg-oak-beige" />
              </div>

              <button className="w-full flex items-center justify-center gap-3 border border-oak-beige bg-white/80 px-5 py-4 rounded-2xl text-sm font-semibold text-oak-text hover:bg-oak-beige-light transition-colors">
                <Users className="w-4 h-4" />
                Choose from Profiles
              </button>

              <div className="text-center space-y-3 pt-4">
                <p className="text-sm text-oak-muted">New to Oakwood Learning Hub?</p>
                <button className="text-sm font-semibold text-oak-green hover:underline transition-colors">
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
        <div className="absolute inset-0 bg-gradient-to-br from-oak-green/30 via-transparent to-oak-green/20" />

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center p-12 text-center">
          <div className="rounded-[2rem] border border-white/20 bg-white/80 p-8 shadow-[0_24px_80px_rgba(74,103,65,0.2)] backdrop-blur-xl max-w-sm">
            <div className="flex justify-center mb-6">
              <div className="grid grid-cols-3 gap-3">
                <OakwoodAssetIcon type="parent-male" className="h-16 w-16 rounded-2xl border border-oak-beige bg-white p-1" size={64} alt="Parent icon" />
                <OakwoodAssetIcon type="parent-female" className="h-16 w-16 rounded-2xl border border-oak-beige bg-white p-1" size={64} alt="Parent icon" />
                <OakwoodAssetIcon type="student-year7" className="h-16 w-16 rounded-2xl border border-oak-beige bg-white p-1" size={64} alt="Student icon" />
              </div>
            </div>
            <h3 className="font-display text-xl font-semibold text-oak-text">
              Your Family&apos;s Learning Hub
            </h3>
            <p className="mt-3 text-sm text-oak-muted leading-relaxed">
              Keep your children&apos;s education organised, track progress together, and celebrate every achievement as a family.
            </p>
          </div>

          {/* Trust Badge */}
          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/60 px-5 py-2.5 text-sm font-medium text-oak-text backdrop-blur">
            <OakwoodAssetIcon type="pin" className="h-4 w-4" size={16} alt="Security" />
            Private &amp; Secure
          </div>
        </div>
      </div>
    </div>
  )
}
