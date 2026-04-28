import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type OakwoodBackgroundProps = {
  children: ReactNode
  className?: string
  variant?: 'app' | 'family' | 'student'
}

export function OakwoodBackground({ children, className, variant = 'app' }: OakwoodBackgroundProps) {
  return (
    <div
      className={cn(
        'min-h-full',
        variant === 'app' && 'oak-bg-app',
        variant === 'family' && 'oak-bg-family',
        variant === 'student' && 'oak-bg-student',
        className
      )}
    >
      {children}
    </div>
  )
}
