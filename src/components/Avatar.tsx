import { cn } from '@/lib/utils'
import type { Profile } from '@/types'
import { OakwoodAssetIcon, type OakwoodAssetIconType } from '@/components/brand/OakwoodAssetIcon'

const COLORS = [
  'bg-violet-500', 'bg-sky-500', 'bg-rose-400', 'bg-emerald-500',
  'bg-amber-500', 'bg-indigo-500', 'bg-pink-500', 'bg-teal-500',
]

export function getColor(id: string): string {
  let hash = 0
  for (const c of id) hash = (hash * 31 + c.charCodeAt(0)) & 0xffffffff
  return COLORS[Math.abs(hash) % COLORS.length]
}

export function getInitials(profile: Pick<Profile, 'name' | 'surname' | 'initials'>): string {
  if (profile.initials) return profile.initials.slice(0, 2).toUpperCase()
  const parts = [profile.name, profile.surname].filter(Boolean)
  return parts.map((p) => p![0]).join('').toUpperCase().slice(0, 2)
}

interface AvatarProps {
  profile: Pick<Profile, 'id' | 'name' | 'surname' | 'initials' | 'color'> &
    Partial<Pick<Profile, 'role' | 'gender' | 'yearGroup'>>
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  fallbackInitials?: boolean
}

const SIZES = {
  sm: { shell: 'w-11 h-11', icon: 40, text: 'text-xs' },
  md: { shell: 'w-14 h-14', icon: 52, text: 'text-sm' },
  lg: { shell: 'w-[4.5rem] h-[4.5rem]', icon: 66, text: 'text-base' },
  xl: { shell: 'w-32 h-32', icon: 118, text: 'text-xl' },
}

function getYearNumber(yearGroup?: string) {
  const match = yearGroup?.match(/\d+/)
  return match ? Number(match[0]) : undefined
}

function hasFemaleGender(gender?: string) {
  return /female|woman|girl|kadın|kadin|kız|kiz/i.test(gender ?? '')
}

function hasMaleGender(gender?: string) {
  return /male|man|boy|erkek/i.test(gender ?? '')
}

function useFirstVisualVariant(id: string) {
  let hash = 0
  for (const c of id) hash = (hash * 31 + c.charCodeAt(0)) & 0xffffffff
  return Math.abs(hash) % 2 === 0
}

function getProfileIconType(profile: AvatarProps['profile']): OakwoodAssetIconType | null {
  if (profile.role === 'parent') {
    if (hasFemaleGender(profile.gender)) return 'parent-female'
    if (hasMaleGender(profile.gender)) return 'parent-male'
    return useFirstVisualVariant(profile.id) ? 'parent-female' : 'parent-male'
  }

  if (profile.role === 'child') {
    const year = getYearNumber(profile.yearGroup) ?? 0
    if (year >= 8 || hasMaleGender(profile.gender)) return 'student-secondary'
    if (year >= 7 || hasFemaleGender(profile.gender)) return 'student-year7'
    return 'student-primary'
  }

  return null
}

export function Avatar({ profile, size = 'md', className, fallbackInitials = false }: AvatarProps) {
  const initials = getInitials(profile)
  const color = profile.color ?? getColor(profile.id)
  const iconType = fallbackInitials ? null : getProfileIconType(profile)
  const sizeCfg = SIZES[size]

  return (
    <div
      className={cn(
        'flex items-center justify-center shrink-0 select-none',
        iconType
          ? 'overflow-hidden rounded-[1.35rem] border border-oak-beige bg-white/85 text-oak-green shadow-card'
          : cn('rounded-full font-semibold text-white', color, sizeCfg.text),
        sizeCfg.shell,
        className
      )}
    >
      {iconType ? (
        <OakwoodAssetIcon
          alt={`${profile.name} icon`}
          className="h-full w-full p-1"
          size={sizeCfg.icon}
          type={iconType}
        />
      ) : initials}
    </div>
  )
}
