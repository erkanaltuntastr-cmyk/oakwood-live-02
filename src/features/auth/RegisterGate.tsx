/**
 * RegisterGate wraps the register forms.
 * - If user has a valid invite code → profile created immediately
 * - If no invite code → RegistrationRequest sent to admin (status: pending)
 */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/state/store'
import { ParentRegisterForm } from './ParentRegisterForm'
import { ChildRegisterForm, type ChildRegistrationData } from './ChildRegisterForm'
import { crypto } from '@/lib/crypto'
import type {
  RegistrationRequest,
  RegistrationFlowDraft,
} from '@/types'
import { CheckCircle2, Clock } from 'lucide-react'

// Default open invite code — unlimited use, auto-approves without admin review
export const DEFAULT_INVITE_CODE = 'OAKWOOD.PHA'

type Mode = 'parent' | 'child'
type ParentRegistrationData = {
  name: string
  surname?: string
  username: string
  spaceName: string
  email: string
  postcode: string
  dob: string
  gsm: string
  profession: string
  placeOfBirth: string
  gender: string
  aiBio: string
  pinHash: string
}

function InviteCodeEntry({
  code,
  onCodeChange,
  onSubmit,
  onSkip,
}: {
  code: string
  onCodeChange: (code: string) => void
  onSubmit: (code: string) => void
  onSkip: () => void
}) {
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
          onChange={(e) => onCodeChange(e.target.value.toUpperCase().trim())}
          placeholder={DEFAULT_INVITE_CODE}
          className="w-full px-3 py-2.5 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/40 font-mono tracking-wider"
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

function ApprovedConfirmation({ name, autoEnterApp }: { name: string; autoEnterApp?: boolean }) {
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
        <p className="text-sm text-muted-foreground">
          {autoEnterApp ? 'Yetişkin ve çocuk profili hazır. Ana ekrana geçebilirsin.' : 'Davet kodun doğrulandı. Profil oluşturuldu.'}
        </p>
        <button onClick={() => navigate(autoEnterApp ? '/app/dashboard' : '/profiles')} className="w-full oak-btn-primary">
          {autoEnterApp ? 'Ana Ekrana Git' : 'Giriş Yap'}
        </button>
      </div>
    </div>
  )
}

export function RegisterGate({ mode }: { mode: Mode }) {
  const {
    submitRequest,
    useInviteCode,
    addProfile,
    updateProfile,
    profiles,
    inviteCodes,
    setActiveProfile,
    setActiveChild,
    registrationDraft,
    setRegistrationDraft,
    patchRegistrationDraft,
    clearRegistrationDraft,
  } = useAppStore()
  const navigate = useNavigate()
  const activeDraft = registrationDraft?.mode === mode ? registrationDraft : null
  const [step, setStep] = useState<'code' | 'parent' | 'child' | 'pending' | 'approved'>(
    activeDraft?.step === 'parent' || activeDraft?.step === 'child' ? activeDraft.step : 'code'
  )
  const [inviteCode, setInviteCode] = useState<string>(activeDraft?.inviteCode ?? '')
  const [resolvedInvite, setResolvedInvite] = useState(() => {
    if (!activeDraft?.resolvedInviteId) return null
    if (activeDraft.resolvedInviteId === 'default') {
      return { id: 'default', code: DEFAULT_INVITE_CODE, createdBy: 'system', used: false }
    }
    return inviteCodes.find((invite) => invite.id === activeDraft.resolvedInviteId) ?? null
  })
  const [approvedName, setApprovedName] = useState('')
  const [autoEnterApp, setAutoEnterApp] = useState(false)
  const [parentDraft, setParentDraft] = useState<ParentRegistrationData | null>(
    activeDraft?.parentForm
      ? {
          name: activeDraft.parentForm.name,
          surname: activeDraft.parentForm.surname,
          username: activeDraft.parentForm.username,
          spaceName: activeDraft.parentForm.spaceName,
          email: activeDraft.parentForm.email,
          postcode: activeDraft.parentForm.postcode,
          dob: activeDraft.parentForm.dob,
          gsm: activeDraft.parentForm.gsm,
          profession: activeDraft.parentForm.profession,
          placeOfBirth: activeDraft.parentForm.placeOfBirth,
          gender: activeDraft.parentForm.gender,
          aiBio: activeDraft.parentForm.aiBio,
          pinHash: activeDraft.parentForm.pinHash,
        }
      : null
  )

  function upsertRegistrationDraft(next: RegistrationFlowDraft) {
    setRegistrationDraft(next)
  }

  function updateInviteDraft(nextCode: string, nextStep: RegistrationFlowDraft['step'] = step === 'pending' || step === 'approved' ? 'code' : step) {
    const baseDraft: RegistrationFlowDraft = activeDraft ?? {
      mode,
      step: nextStep,
      inviteCode: '',
    }
    upsertRegistrationDraft({
      ...baseDraft,
      mode,
      step: nextStep,
      inviteCode: nextCode,
      resolvedInviteId: nextCode === DEFAULT_INVITE_CODE
        ? 'default'
        : nextCode === baseDraft.inviteCode
          ? baseDraft.resolvedInviteId
          : undefined,
    })
  }

  function createChildProfile(data: ChildRegistrationData, id = crypto.uuid()) {
    return {
      id,
      role: 'child' as const,
      name: data.name,
      surname: data.surname || undefined,
      dob: data.dob,
      gender: data.gender || undefined,
      school: data.school,
      yearGroup: data.yearGroup,
      className: data.className || undefined,
      nativeLanguage: data.nativeLanguage || undefined,
      learningLanguage: data.learningLanguage || undefined,
      foreignLanguage: data.foreignLanguage || undefined,
      externalEducation: data.externalEducation,
      specialInformation: data.specialInformation || undefined,
      notes: data.specialInformation || undefined,
      pinHash: data.pinHash,
      createdAt: new Date().toISOString(),
    }
  }

  function createParentProfile(data: ParentRegistrationData, childId: string, id = crypto.uuid()) {
    return {
      id,
      role: 'parent' as const,
      createdAt: new Date().toISOString(),
      childIds: [childId],
      ...data,
    }
  }

  function handleCodeSubmit(code: string) {
    if (!code) { setStep(mode === 'parent' ? 'parent' : 'child'); return }

    // Default open code — always valid, unlimited, never consumed
    if (code.toUpperCase() === DEFAULT_INVITE_CODE) {
      setResolvedInvite({ id: 'default', code: DEFAULT_INVITE_CODE, createdBy: 'system', used: false })
      setInviteCode(code)
      upsertRegistrationDraft({
        mode,
        step: mode === 'parent' ? 'parent' : 'child',
        inviteCode: code,
        resolvedInviteId: 'default',
        parentForm: activeDraft?.parentForm,
        childForm: activeDraft?.childForm,
      })
      setStep(mode === 'parent' ? 'parent' : 'child')
      return
    }

    const invite = useInviteCode(code, 'pending')
    if (invite) {
      setResolvedInvite(invite)
      setInviteCode(code)
      upsertRegistrationDraft({
        mode,
        step: mode === 'parent' ? 'parent' : 'child',
        inviteCode: code,
        resolvedInviteId: invite.id,
        parentForm: activeDraft?.parentForm,
        childForm: activeDraft?.childForm,
      })
    } else {
      updateInviteDraft(code, mode === 'parent' ? 'parent' : 'child')
    }
    setStep(mode === 'parent' ? 'parent' : 'child')
  }

  function handleSkip() {
    setInviteCode('')
    setResolvedInvite(null)
    upsertRegistrationDraft({
      mode,
      step: mode === 'parent' ? 'parent' : 'child',
      inviteCode: '',
      parentForm: activeDraft?.parentForm,
      childForm: activeDraft?.childForm,
    })
    setStep(mode === 'parent' ? 'parent' : 'child')
  }

  function handleParentSubmit(data: ParentRegistrationData) {
    setParentDraft(data)
    patchRegistrationDraft({ step: 'child' })
    setStep('child')
  }

  function handleChildSubmit(data: ChildRegistrationData) {
    if (mode === 'parent' && parentDraft) {
      if (resolvedInvite) {
        const childId = crypto.uuid()
        const parentId = crypto.uuid()
        addProfile(createParentProfile(parentDraft, childId, parentId))
        addProfile(createChildProfile(data, childId))
        setActiveProfile(parentId)
        setActiveChild(childId)
        setApprovedName(parentDraft.name)
        setAutoEnterApp(true)
        clearRegistrationDraft(mode)
        setStep('approved')
        return
      }

      const familyRequestId = crypto.uuid()
      const now = new Date().toISOString()
      const parentRequest: RegistrationRequest = {
        id: crypto.uuid(),
        role: 'parent',
        status: 'pending',
        createdAt: now,
        familyRequestId,
        inviteCode: inviteCode ?? undefined,
        ...parentDraft,
      }
      const childRequest: RegistrationRequest = {
        id: crypto.uuid(),
        role: 'child',
        status: 'pending',
        createdAt: now,
        familyRequestId,
        inviteCode: inviteCode ?? undefined,
        name: data.name,
        surname: data.surname,
        dob: data.dob,
        gender: data.gender,
        school: data.school,
        yearGroup: data.yearGroup,
        className: data.className || undefined,
        nativeLanguage: data.nativeLanguage || undefined,
        learningLanguage: data.learningLanguage || undefined,
        foreignLanguage: data.foreignLanguage || undefined,
        externalEducation: data.externalEducation,
        specialInformation: data.specialInformation || undefined,
        pinHash: data.pinHash,
      }
      submitRequest(parentRequest)
      submitRequest(childRequest)
      clearRegistrationDraft(mode)
      setStep('pending')
      return
    }

    if (resolvedInvite) {
      const id = crypto.uuid()
      addProfile(createChildProfile(data, id))
      if (resolvedInvite.familyId) {
        const parent = profiles.find((profile) => profile.id === resolvedInvite.familyId)
        if (parent) {
          updateProfile(parent.id, { childIds: [...(parent.childIds ?? []), id] })
        }
      }
      setActiveProfile(id)
      setApprovedName(data.name)
      setAutoEnterApp(true)
      clearRegistrationDraft(mode)
      setStep('approved')
    } else {
      const req: RegistrationRequest = {
        id: crypto.uuid(),
        role: 'child',
        status: 'pending',
        createdAt: new Date().toISOString(),
        inviteCode: inviteCode ?? undefined,
        name: data.name,
        surname: data.surname,
        dob: data.dob,
        gender: data.gender,
        school: data.school,
        yearGroup: data.yearGroup,
        className: data.className || undefined,
        nativeLanguage: data.nativeLanguage || undefined,
        learningLanguage: data.learningLanguage || undefined,
        foreignLanguage: data.foreignLanguage || undefined,
        externalEducation: data.externalEducation,
        specialInformation: data.specialInformation || undefined,
        pinHash: data.pinHash,
      }
      submitRequest(req)
      clearRegistrationDraft(mode)
      setStep('pending')
    }
  }

  if (step === 'code') {
    return (
      <InviteCodeEntry
        code={inviteCode}
        onCodeChange={(code) => {
          setInviteCode(code)
          if (code !== resolvedInvite?.code) {
            setResolvedInvite(code === DEFAULT_INVITE_CODE ? { id: 'default', code: DEFAULT_INVITE_CODE, createdBy: 'system', used: false } : null)
          }
          updateInviteDraft(code, 'code')
        }}
        onSubmit={handleCodeSubmit}
        onSkip={handleSkip}
      />
    )
  }
  if (step === 'pending') return <PendingConfirmation />
  if (step === 'approved') return <ApprovedConfirmation name={approvedName} autoEnterApp={autoEnterApp} />

  if (step === 'parent') {
    return (
      <ParentRegisterForm
        draft={activeDraft?.parentForm}
        onDraftChange={(draft) => {
          upsertRegistrationDraft({
            mode,
            step: 'parent',
            inviteCode,
            resolvedInviteId: resolvedInvite?.id,
            parentForm: draft,
            childForm: activeDraft?.childForm,
          })
          const { pinConfirm, legalConsent, usernameTouched, ...parentData } = draft
          setParentDraft(parentData)
        }}
        onSubmit={handleParentSubmit}
        onCancel={() => {
          clearRegistrationDraft(mode)
          navigate('/')
        }}
      />
    )
  }
  return (
    <ChildRegisterForm
      draft={activeDraft?.childForm}
      onDraftChange={(draft) => {
        upsertRegistrationDraft({
          mode,
          step: 'child',
          inviteCode,
          resolvedInviteId: resolvedInvite?.id,
          parentForm: activeDraft?.parentForm,
          childForm: draft,
        })
      }}
      onSubmit={handleChildSubmit}
      onCancel={() => {
        if (mode === 'parent') {
          patchRegistrationDraft({ step: 'parent' })
          setStep('parent')
          return
        }
        clearRegistrationDraft(mode)
        navigate('/')
      }}
    />
  )
}
