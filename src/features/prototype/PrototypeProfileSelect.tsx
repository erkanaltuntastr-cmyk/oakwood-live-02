import { ArrowLeft, Plus } from 'lucide-react'
import { OakwoodAssetIcon, type OakwoodAssetIconType } from '@/components/brand/OakwoodAssetIcon'
import { cn } from '@/lib/utils'

import masterLogo from '@/assets/brand/logo/master-logo.png'
import familyHubBg from '@/assets/brand/backgrounds/family-hub-bg.png'

interface ProfileData {
  id: string
  name: string
  surname?: string
  role: 'parent' | 'child'
  icon: OakwoodAssetIconType
  yearGroup?: string
  ageGroup?: 'younger' | 'older'
}

const mockProfiles: ProfileData[] = [
  { id: '1', name: 'James', surname: 'Thompson', role: 'parent', icon: 'parent-male' },
  { id: '2', name: 'Sarah', surname: 'Thompson', role: 'parent', icon: 'parent-female' },
  { id: '3', name: 'Oliver', role: 'child', icon: 'student-primary', yearGroup: 'Year 4', ageGroup: 'younger' },
  { id: '4', name: 'Emma', role: 'child', icon: 'student-year7', yearGroup: 'Year 7', ageGroup: 'older' },
  { id: '5', name: 'William', role: 'child', icon: 'student-secondary', yearGroup: 'Year 10', ageGroup: 'older' },
]

export function PrototypeProfileSelect() {
  const parents = mockProfiles.filter((p) => p.role === 'parent')
  const children = mockProfiles.filter((p) => p.role === 'child')

  return (
    <div className="min-h-screen bg-[#fff8f5] flex flex-col">
      {/* Background - Increased opacity */}
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: `url(${familyHubBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-8 py-5 border-b-2 border-[#d8cbb2]">
        <button className="flex items-center gap-2 text-sm text-[#6b6560] hover:text-[#333333] transition-colors font-medium">
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <img src={masterLogo} alt="Oakwood Learning Hub" className="h-12 w-auto" />
        <div className="w-16" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 py-12">
        <div className="w-full max-w-5xl">
          {/* Title */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-3xl border-2 border-[#a8bfa6]/50 bg-[#a8bfa6]/20 shadow-lg mb-6">
              <OakwoodAssetIcon type="family-hub" className="h-12 w-12" size={48} alt="Family Hub" />
            </div>
            <h1 className="font-display text-3xl font-semibold text-[#333333] sm:text-4xl">
              Who's Learning Today?
            </h1>
            <p className="mt-3 text-base text-[#6b6560]">
              Select your profile to continue to your dashboard
            </p>
          </div>

          {/* Parents Section */}
          {parents.length > 0 && (
            <section className="mb-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent to-[#a8bfa6]/50" />
                <p className="text-xs font-bold text-[#36563d] uppercase tracking-[0.18em] px-2">Parents &amp; Guardians</p>
                <div className="h-0.5 flex-1 bg-gradient-to-l from-transparent to-[#a8bfa6]/50" />
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 justify-center max-w-3xl mx-auto">
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
                <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent to-[#f0d58c]/50" />
                <p className="text-xs font-bold text-[#8b6914] uppercase tracking-[0.18em] px-2">Students</p>
                <div className="h-0.5 flex-1 bg-gradient-to-l from-transparent to-[#f0d58c]/50" />
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 justify-center max-w-4xl mx-auto">
                {children.map((profile) => (
                  <ProfileCard key={profile.id} profile={profile} />
                ))}
              </div>
            </section>
          )}

          {/* Add Profile */}
          <div className="flex justify-center mt-8">
            <button className="inline-flex items-center gap-2 rounded-2xl border-2 border-[#d8cbb2] bg-white px-6 py-3.5 text-sm font-bold text-[#6b6560] hover:text-[#333333] hover:border-[#36563d]/40 hover:bg-[#fdfbf7] transition-all shadow-md">
              <Plus className="w-5 h-5" />
              Add Family Member
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center pb-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#36563d]/10 px-4 py-2">
          <OakwoodAssetIcon type="pin" className="w-4 h-4" size={16} alt="Security" />
          <p className="text-xs text-[#36563d] font-medium">
            All data is stored locally on this device
          </p>
        </div>
      </div>
    </div>
  )
}

function ProfileCard({ profile }: { profile: ProfileData }) {
  const isParent = profile.role === 'parent'
  const isYounger = profile.ageGroup === 'younger'
  
  // Role-specific accent colors
  const accentStyles = isParent
    ? {
        card: 'border-[#a8bfa6]/50 bg-[#a8bfa6]/10 hover:border-[#36563d]/60 hover:bg-[#a8bfa6]/20',
        avatar: 'border-[#a8bfa6] bg-[#a8bfa6]/15',
        badge: 'text-[#36563d] bg-[#a8bfa6]/30',
      }
    : isYounger
    ? {
        card: 'border-[#d9a68c]/40 bg-[#d9a68c]/10 hover:border-[#d9a68c]/70 hover:bg-[#d9a68c]/20',
        avatar: 'border-[#d9a68c]/60 bg-[#d9a68c]/15',
        badge: 'text-[#8b5a3c] bg-[#d9a68c]/30',
      }
    : {
        card: 'border-[#c9a85d]/40 bg-[#f0d58c]/10 hover:border-[#c9a85d]/70 hover:bg-[#f0d58c]/20',
        avatar: 'border-[#c9a85d]/50 bg-[#f0d58c]/20',
        badge: 'text-[#8b6914] bg-[#f0d58c]/40',
      }

  return (
    <button className={cn(
      "group flex flex-col items-center justify-center gap-4 rounded-3xl border-2 p-8 shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#36563d]/30 min-h-[300px]",
      accentStyles.card
    )}>
      {/* Avatar */}
      <div className={cn(
        "flex h-32 w-32 items-center justify-center overflow-hidden rounded-[1.5rem] border-2 bg-white shadow-md group-hover:shadow-lg transition-all",
        accentStyles.avatar
      )}>
        <OakwoodAssetIcon
          type={profile.icon}
          className="h-28 w-28"
          size={112}
          alt={`${profile.name} avatar`}
        />
      </div>

      {/* Info */}
      <div className="text-center">
        <p className="text-xl font-semibold text-[#333333]">{profile.name}</p>
        {profile.surname && (
          <p className="text-sm text-[#6b6560] mt-0.5">{profile.surname}</p>
        )}
        <p className={cn(
          "mt-3 text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-full inline-block",
          accentStyles.badge
        )}>
          {isParent ? 'Parent' : profile.yearGroup}
        </p>
      </div>
    </button>
  )
}
