import { cn } from '@/lib/utils'

import parentMale from '@/assets/brand/icons/parent-male.png'
import parentFemale from '@/assets/brand/icons/parent-female.png'
import studentPrimary from '@/assets/brand/icons/student-primary.png'
import studentYear7 from '@/assets/brand/icons/student-year7.png'
import studentSecondary from '@/assets/brand/icons/student-secondary.png'
import familyHub from '@/assets/brand/icons/family-hub-icon.png'
import lessons from '@/assets/brand/icons/lessons-icon.png'
import quiz from '@/assets/brand/icons/quiz-icon.png'
import homework from '@/assets/brand/icons/homework-icon.png'
import report from '@/assets/brand/icons/report-icon.png'
import ai from '@/assets/brand/icons/ai-icon.png'
import resources from '@/assets/brand/icons/resources-icon.png'
import messages from '@/assets/brand/icons/messages-icon.png'
import settings from '@/assets/brand/icons/settings-icon.png'
import pin from '@/assets/brand/icons/pin-icon.png'

export type OakwoodAssetIconType =
  | 'parent-male'
  | 'parent-female'
  | 'student-primary'
  | 'student-year7'
  | 'student-secondary'
  | 'family-hub'
  | 'lessons'
  | 'quiz'
  | 'homework'
  | 'report'
  | 'ai'
  | 'resources'
  | 'messages'
  | 'settings'
  | 'pin'

const SRC_MAP: Record<OakwoodAssetIconType, string> = {
  'parent-male': parentMale,
  'parent-female': parentFemale,
  'student-primary': studentPrimary,
  'student-year7': studentYear7,
  'student-secondary': studentSecondary,
  'family-hub': familyHub,
  'lessons': lessons,
  'quiz': quiz,
  'homework': homework,
  'report': report,
  'ai': ai,
  'resources': resources,
  'messages': messages,
  'settings': settings,
  'pin': pin,
}

interface OakwoodAssetIconProps {
  type: OakwoodAssetIconType
  className?: string
  size?: number
  alt?: string
}

export function OakwoodAssetIcon({ type, className, size, alt }: OakwoodAssetIconProps) {
  const style = size ? { width: size, height: size } : undefined
  return (
    <img
      alt={alt ?? type}
      className={cn('object-contain', className)}
      draggable={false}
      src={SRC_MAP[type]}
      style={style}
    />
  )
}

