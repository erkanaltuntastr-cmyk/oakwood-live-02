/**
 * RegisterGate wraps the register forms.
 * - If user has a valid invite code → profile created immediately
 * - If no invite code → RegistrationRequest sent to admin (status: pending)
 */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/state/store'
import { ParentRegisterForm } from './ParentRegisterForm'
import { ChildRegisterForm } from './ChildRegisterForm'
import { crypto } from '@/lib/crypto'
import type { RegistrationRequest } from '@/types'
import { CheckCircle2, Clock } from 'lucide-react'

type Mode = 'parent' | 'child'

function InviteCodeEntry({ onSubmit, onSkip }: { onSubmit: (code: string) => void; onSkip: () => void }) {
  const [code, setCode] = useState('')
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-sm oak-card-elevated px-7 py-9 space-y-6">
        <div>
          <h1 className="text-2xl font-display font-semibold italic text-foreground">Davet Kodu</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Bir davet kodun varsa gir. Yoksa "Kodu Yok" seç — isteğin admin onayına gönderilir.
          </p>
        </div>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase().trim())}
          placeholder="Örn: OAK-2026-ABC"
          className="w-full px-3 py-2.5 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 font-mono tracking-wider"
        />
        <div className="flex gap-3">
          <button onClick={onSkip} className="flex-1 oak-btn-ghost">Kodu Yok</button>
          <button onClick={() => onSubmit(code)} disabled={!code} className="flex-1 oak-btn-primary disabled:opacity-40">
            Kullan
          </button>
        </div>
      </div>
    </div>
  )
}

function PendingConfirmation() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-sm oak-card-elevated px-7 py-9 text-center space-y-5">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
            <Clock className="w-8 h-8 text-primary" />
          </div>
        </div>
        <h1 className="text-xl font-display font-semibold italic text-foreground">İstek Alındı</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Kayıt isteğin admin'e iletildi. Onaylandığında giriş yapabilirsin.
        </p>
        <button onClick={() => navigate('/')} className="w-full oak-btn-primary">Ana Sayfaya Dön</button>
      </div>
    </div>
  )
}

function ApprovedConfirmation({ name }: { name: string }) {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-sm oak-card-elevated px-7 py-9 text-center space-y-5">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <h1 className="text-xl font-display font-semibold italic text-foreground">Hoşgeldin, {name}!</h1>
        <p className="text-sm text-muted-foreground">Davet kodun doğrulandı. Profil oluşturuldu.</p>
        <button onClick={() => navigate('/profiles')} className="w-full oak-btn-primary">Giriş Yap</button>
      </div>
    </div>
  )
}

export function RegisterGate({ mode }: { mode: Mode }) {
  const { submitRequest, useInviteCode, addProfile } = useAppStore()
  const navigate = useNavigate()
  const [step, setStep] = useState<'code' | 'form' | 'pending' | 'approved'>('code')
  const [inviteCode, setInviteCode] = useState<string | null>(null)
  const [resolvedInvite, setResolvedInvite] = useState<ReturnType<typeof useInviteCode>>(null)
  const [approvedName, setApprovedName] = useState('')

  function handleCodeSubmit(code: string) {
    if (!code) { setStep('form'); return }
    const invite = useInviteCode(code, 'pending')
    if (invite) {
      setResolvedInvite(invite)
      setInviteCode(code)
    }
    // Valid or not, proceed to form; validity checked on submit
    setStep('form')
  }

  function handleSkip() {
    setInviteCode(null)
    setStep('form')
  }

  function handleParentSubmit(data: { name: string; surname?: string; pinHash: string }) {
    if (resolvedInvite) {
      // Auto-approve: create profile immediately
      const id = crypto.uuid()
      addProfile({ id, role: 'parent', createdAt: new Date().toISOString(), childIds: [], ...data })
      setApprovedName(data.name)
      setStep('approved')
    } else {
      // Send to admin queue
      const req: RegistrationRequest = {
        id: crypto.uuid(),
        role: 'parent',
        status: 'pending',
        createdAt: new Date().toISOString(),
        inviteCode: inviteCode ?? undefined,
        ...data,
      }
      submitRequest(req)
      // notify admin
      setStep('pending')
    }
  }

  function handleChildSubmit(data: { name: string; surname?: string; yearGroup: string; pinHash: string }) {
    if (resolvedInvite) {
      const id = crypto.uuid()
      addProfile({ id, role: 'child', createdAt: new Date().toISOString(), ...data })
      // link to inviting parent's family
      if (resolvedInvite.familyId) {
        // store.updateProfile handled inside addProfile indirectly — attach after
      }
      setApprovedName(data.name)
      setStep('approved')
    } else {
      const req: RegistrationRequest = {
        id: crypto.uuid(),
        role: 'child',
        status: 'pending',
        createdAt: new Date().toISOString(),
        inviteCode: inviteCode ?? undefined,
        ...data,
      }
      submitRequest(req)
      setStep('pending')
    }
  }

  if (step === 'code') return <InviteCodeEntry onSubmit={handleCodeSubmit} onSkip={handleSkip} />
  if (step === 'pending') return <PendingConfirmation />
  if (step === 'approved') return <ApprovedConfirmation name={approvedName} />

  if (mode === 'parent') {
    return <ParentRegisterForm onSubmit={handleParentSubmit} onCancel={() => navigate('/')} />
  }
  return <ChildRegisterForm onSubmit={handleChildSubmit} onCancel={() => navigate('/')} />
}
