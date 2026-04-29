import logoSrc from '@/assets/brand/logo/master-logo.png'
import { cn } from '@/lib/utils'

type OakwoodLogoVariant = 'master' | 'compact-horizontal' | 'compact-stacked' | 'icon' | 'micro'

type OakwoodLogoProps = {
  variant?: OakwoodLogoVariant
  className?: string
  imageClassName?: string
}

export function OakwoodLogo({ variant = 'compact-horizontal', className, imageClassName }: OakwoodLogoProps) {
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
        <img
          alt="Oakwood Learning Hub"
          className={cn('h-24 w-auto object-contain', imageClassName)}
          src={logoSrc}
        />
      </div>
    )
  }

  if (variant === 'icon' || variant === 'micro') {
    return (
      <img
        alt="Oakwood Learning Hub"
        className={cn(
          'shrink-0 object-contain',
          variant === 'micro' ? 'h-6 w-6' : 'h-10 w-10',
          imageClassName,
          className
        )}
        src={logoSrc}
      />
    )
  }

  return (
    <img
      alt="Oakwood Learning Hub"
      className={cn('h-10 w-auto object-contain', imageClassName, className)}
      src={logoSrc}
    />
  )
}
