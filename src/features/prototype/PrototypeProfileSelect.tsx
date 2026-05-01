import { ArrowLeft, Plus } from 'lucide-react'
import { OakwoodAssetIcon, type OakwoodAssetIconType } from '@/components/brand/OakwoodAssetIcon'

import masterLogo from '@/assets/brand/logo/master-logo.png'
import familyHubBg from '@/assets/brand/backgrounds/family-hub-bg.png'

interface ProfileData {
  id: string
  name: string
  surname?: string
  role: 'parent' | 'child'
  icon: OakwoodAssetIconType
  yearGroup?: string
}

const mockProfiles: ProfileData[] = [
  { id: '1', name: 'James', surname: 'Thompson', role: 'parent', icon: 'parent-male' },
  { id: '2', name: 'Sarah', surname: 'Thompson', role: 'parent', icon: 'parent-female' },
  { id: '3', name: 'Oliver', role: 'child', icon: 'student-primary', yearGroup: 'Year 4' },
  { id: '4', name: 'Emma', role: 'child', icon: 'student-year7', yearGroup: 'Year 7' },
  { id: '5', name: 'William', role: 'child', icon: 'student-secondary', yearGroup: 'Year 10' },
]

export function PrototypeProfileSelect() {
  const parents = mockProfiles.filter((p) => p.role === 'parent')
  const children = mockProfiles.filter((p) => p.role === 'child')

  return (
    <div className="min-h-screen bg-oak-warm flex flex-col">
      {/* Background */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `url(${familyHubBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-oak-beige">
        <button className="flex items-center gap-2 text-sm text-oak-muted hover:text-oak-text transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <img src={masterLogo} alt="Oakwood Learning Hub" className="h-10 w-auto" />
        <div className="w-16" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 py-12">
        <div className="w-full max-w-4xl">
          {/* Title */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-3xl border border-oak-beige bg-white shadow-card mb-6">
              <OakwoodAssetIcon type="family-hub" className="h-10 w-10" size={40} alt="Family Hub" />
            </div>
            <h1 className="font-display text-3xl font-semibold text-oak-text sm:text-4xl">
              Who&apos;s Learning Today?
            </h1>
            <p className="mt-3 text-base text-oak-muted">
              Select your profile to continue to your dashboard
            </p>
          </div>

          {/* Parents Section */}
          {parents.length > 0 && (
            <section className="mb-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px flex-1 bg-oak-beige" />
                <p className="text-xs font-bold text-oak-muted uppercase tracking-[0.18em]">Parents &amp; Guardians</p>
                <div className="h-px flex-1 bg-oak-beige" />
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {parents.map((profile) => (
                  <ProfileCard key={profile.id} profile={profile} />
                ))}
              </div>
            </section>
          )}

          {/* Students Section */}
          {children.length > 0 && (
            <section className="mb-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px flex-1 bg-oak-beige" />
                <p className="text-xs font-bold text-oak-muted uppercase tracking-[0.18em]">Students</p>
                <div className="h-px flex-1 bg-oak-beige" />
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {children.map((profile) => (
                  <ProfileCard key={profile.id} profile={profile} />
                ))}
              </div>
            </section>
          )}

          {/* Add Profile */}
          <div className="flex justify-center mt-8">
            <button className="inline-flex items-center gap-2 rounded-2xl border border-oak-beige bg-white/80 px-6 py-3 text-sm font-semibold text-oak-muted hover:text-oak-text hover:border-oak-green/30 hover:bg-white transition-all shadow-card">
              <Plus className="w-4 h-4" />
              Add Family Member
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center pb-8">
        <p className="text-xs text-oak-muted">
          All data is stored locally on this device
        </p>
      </div>
    </div>
  )
}

function ProfileCard({ profile }: { profile: ProfileData }) {
  const isParent = profile.role === 'parent'

  return (
    <button className="group flex flex-col items-center justify-center gap-4 rounded-3xl bg-white/90 border border-oak-beige p-8 shadow-card hover:shadow-card-md hover:border-oak-green/40 hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-oak-green/30 min-h-[280px]">
      {/* Avatar */}
      <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-[1.5rem] border border-oak-beige bg-white shadow-card group-hover:border-oak-green/30 transition-colors">
        <OakwoodAssetIcon
          type={profile.icon}
          className="h-24 w-24"
          size={96}
          alt={`${profile.name} avatar`}
        />
      </div>

      {/* Info */}
      <div className="text-center">
        <p className="text-lg font-semibold text-oak-text">{profile.name}</p>
        {profile.surname && (
          <p className="text-sm text-oak-muted">{profile.surname}</p>
        )}
        <p className="mt-2 text-xs font-medium text-oak-green uppercase tracking-wide">
          {isParent ? 'Parent' : profile.yearGroup}
        </p>
      </div>
    </button>
  )
}
