import { cn } from '@/lib/utils'
import type { Profile } from '@/types'

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
  profile: Pick<Profile, 'id' | 'name' | 'surname' | 'initials' | 'color'>
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const SIZES = {
  sm: 'w-7 h-7 text-xs',
  md: 'w-9 h-9 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-xl',
}

export function Avatar({ profile, size = 'md', className }: AvatarProps) {
  const initials = getInitials(profile)
  const color = profile.color ?? getColor(profile.id)

  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center font-semibold text-white shrink-0 select-none',
        color,
        SIZES[size],
        className
      )}
    >
      {initials}
    </div>
  )
}
