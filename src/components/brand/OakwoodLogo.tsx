import logoSrc from '@/assets/brand/oakwood-logo.png'
import { cn } from '@/lib/utils'
import { OakTreeIcon } from './OakwoodIcons'

type OakwoodLogoVariant = 'master' | 'compact-horizontal' | 'compact-stacked' | 'icon' | 'micro'

type OakwoodLogoProps = {
  variant?: OakwoodLogoVariant
  className?: string
  imageClassName?: string
}

export function OakwoodLogo({ variant = 'compact-horizontal', className, imageClassName }: OakwoodLogoProps) {
  if (variant === 'icon' || variant === 'micro') {
    return (
      <OakTreeIcon
        className={cn('shrink-0 text-oak-green', variant === 'micro' ? 'h-6 w-6' : 'h-10 w-10', imageClassName, className)}
        size={variant === 'micro' ? 24 : 40}
        strokeWidth={2}
      />
    )
  }

  if (variant === 'master') {
    return (
      <img
        alt="Oakwood Learning Hub"
        className={cn('mx-auto w-full max-w-[260px] object-contain', imageClassName, className)}
        src={logoSrc}
      />
    )
  }

  if (variant === 'compact-stacked') {
    return (
      <div className={cn('flex flex-col items-center text-center', className)}>
        <img alt="" className={cn('h-24 w-24 object-contain', imageClassName)} src={logoSrc} />
        <p className="font-display text-2xl font-semibold italic text-foreground">Oakwood</p>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Learning Hub</p>
      </div>
    )
  }

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-oak-beige bg-white/75 shadow-card', imageClassName)}>
        <OakTreeIcon className="h-8 w-8 text-oak-green" size={32} strokeWidth={2} />
      </div>
      <div className="leading-none">
        <p className="font-display text-lg font-semibold italic text-foreground">Oakwood</p>
        <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">Learning Hub</p>
      </div>
    </div>
  )
}
