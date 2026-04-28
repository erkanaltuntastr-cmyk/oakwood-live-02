import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type OakwoodIconProps = {
  size?: number
  className?: string
  strokeWidth?: number
  variant?: 'line' | 'filled' | 'soft'
}

type IconFrameProps = OakwoodIconProps & {
  children: ReactNode
  viewBox?: string
}

function OakwoodSvg({
  size = 24,
  className,
  strokeWidth = 1.85,
  children,
  viewBox = '0 0 64 64',
}: IconFrameProps) {
  return (
    <svg
      aria-hidden="true"
      className={cn('text-primary', className)}
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      viewBox={viewBox}
      width={size}
    >
      {children}
    </svg>
  )
}

function LeafCluster({ side = 'right', y = 35 }: { side?: 'left' | 'right'; y?: number }) {
  const flip = side === 'left' ? -1 : 1
  const origin = side === 'left' ? 25 : 39

  return (
    <g stroke="var(--oakwood-sage-line, #8FAE8F)">
      <path d={`M${origin} ${y + 10}c${8 * flip}-8 ${11 * flip}-13 ${13 * flip}-21`} />
      <path d={`M${origin + 4 * flip} ${y + 5}c${5 * flip}-1 ${8 * flip}-3 ${10 * flip}-7`} />
      <path d={`M${origin + 2 * flip} ${y + 9}c${5 * flip} 1 ${9 * flip} 0 ${12 * flip}-3`} />
      <path d={`M${origin + 7 * flip} ${y - 1}c2-3 4-5 7-6`} />
      <path d={`M${origin + 8 * flip} ${y + 3}c3 0 5-1 7-3`} />
      <ellipse cx={origin + 11 * flip} cy={y - 6} fill="var(--oakwood-beige-line, #CDBF9F)" rx="1.3" ry="2.6" stroke="none" transform={`rotate(${24 * flip} ${origin + 11 * flip} ${y - 6})`} />
      <ellipse cx={origin + 14 * flip} cy={y - 1} fill="var(--oakwood-sage-line, #8FAE8F)" rx="1.3" ry="2.6" stroke="none" transform={`rotate(${70 * flip} ${origin + 14 * flip} ${y - 1})`} />
      <ellipse cx={origin + 10 * flip} cy={y + 6} fill="var(--oakwood-sage-line, #8FAE8F)" rx="1.3" ry="2.5" stroke="none" transform={`rotate(${72 * flip} ${origin + 10 * flip} ${y + 6})`} />
    </g>
  )
}

function RootNetwork({ y = 52 }: { y?: number }) {
  return (
    <g stroke="var(--oakwood-beige-line, #CDBF9F)">
      <path d={`M32 ${y - 5}v6`} />
      <path d={`M32 ${y}c-5 0-9 2-13 5`} />
      <path d={`M32 ${y}c5 0 9 2 13 5`} />
      <path d={`M25 ${y + 3}c-3 1-5 2-7 5`} />
      <path d={`M39 ${y + 3}c3 1 5 2 7 5`} />
      <circle cx="18" cy={y + 8} fill="var(--oakwood-sage-line, #8FAE8F)" r="1.4" stroke="none" />
      <circle cx="25" cy={y + 6} fill="var(--oakwood-sage-line, #8FAE8F)" r="1.4" stroke="none" />
      <circle cx="32" cy={y + 3} fill="var(--oakwood-sage-line, #8FAE8F)" r="1.4" stroke="none" />
      <circle cx="39" cy={y + 6} fill="var(--oakwood-sage-line, #8FAE8F)" r="1.4" stroke="none" />
      <circle cx="46" cy={y + 8} fill="var(--oakwood-beige-line, #CDBF9F)" r="1.4" stroke="none" />
    </g>
  )
}

export function OakTreeIcon(props: OakwoodIconProps) {
  return (
    <OakwoodSvg {...props}>
      <path d="M32 50c.2-11 .3-20.4.1-33" />
      <path d="M32.1 23c-7-4.3-14.4-4.2-21.2.3 2-8.3 9.1-13.2 16.9-10.6" />
      <path d="M32.1 21.8c6.4-7.5 17.4-7.4 23.3-.9-7.3-2.1-14.2-.4-19.8 5" />
      <path d="M32 32c-7.7-2.7-14.4-1.1-19.8 3.7 3-7.8 9.2-11.2 17.7-9.9" />
      <path d="M32.2 33c5.9-4.9 12.5-5.8 19.8-3-3 6.5-8.6 9.4-16.8 8.7" />
      <RootNetwork y={50} />
    </OakwoodSvg>
  )
}

export function ParentMaleIcon(props: OakwoodIconProps) {
  return (
    <OakwoodSvg {...props}>
      <path d="M14 57c1.7-10.2 7.8-16.2 18-16.2S48.2 46.8 50 57" />
      <path d="M21 26.5c.6 9.2 4.6 14 11 14s10.4-4.8 11-14" />
      <path d="M21.2 26.8c5.7-.9 10-3.7 13-8.4 2.1 4 5.6 6.5 10.4 7.4" />
      <path d="M20 24.5c1.8-8.2 7.1-12.5 14.5-11.4 5.8.9 9.8 5 10.5 11.2" />
      <path d="M17.4 56c6-4 11.3-5.8 15.8-5.4" stroke="var(--oakwood-sage-line, #8FAE8F)" />
      <LeafCluster side="right" y={33} />
    </OakwoodSvg>
  )
}

export function ParentFemaleIcon(props: OakwoodIconProps) {
  return (
    <OakwoodSvg {...props}>
      <path d="M14 57c2-9.8 8-15.5 18-15.5s16 5.7 18 15.5" />
      <path d="M22 28c.7 8 4.3 12.8 10 12.8S41.4 36 42 28" />
      <path d="M21 28c7.2-2.2 12.5-6.3 16-12.2 1.6 4.3 4.4 7.5 8.3 9.5" />
      <path d="M16.2 44c-3-12.8-.6-25.3 9.1-29.4 10.2-4.3 18.8 3.4 19.7 15.1.3 4.3-.5 8.3-2.5 12" />
      <path d="M18.3 24.5c-4.4 5.1-5.8 11-4.1 17.7" stroke="var(--oakwood-sage-line, #8FAE8F)" />
      <LeafCluster side="left" y={36} />
      <LeafCluster side="right" y={36} />
    </OakwoodSvg>
  )
}

export function StudentPrimaryIcon(props: OakwoodIconProps) {
  return (
    <OakwoodSvg {...props}>
      <path d="M17 57c1.6-9.4 6.6-14.8 15-14.8S45.4 47.6 47 57" />
      <path d="M22 29c.6 7.8 4.2 12.8 10 12.8S41.4 36.8 42 29" />
      <path d="M21.5 29.4c4.6-1.5 8.2-4.2 10.7-8.1 2.3 3.8 5.9 6.3 10.5 7.4" />
      <path d="M22.5 24.2c3.4-6.4 15.4-6.4 18.6.2" />
      <path d="M20 31.5c-4.3 1.6-7.8-.3-9-3.6 1.7-3.8 5.4-4.7 9.5-2.5" stroke="var(--oakwood-sage-line, #8FAE8F)" />
      <path d="M44 31.5c4.3 1.6 7.8-.3 9-3.6-1.7-3.8-5.4-4.7-9.5-2.5" stroke="var(--oakwood-sage-line, #8FAE8F)" />
      <path d="M23 51c6-3 12-3 18 0" stroke="var(--oakwood-beige-line, #CDBF9F)" />
      <LeafCluster side="left" y={42} />
      <LeafCluster side="right" y={42} />
    </OakwoodSvg>
  )
}

export function StudentYear7Icon(props: OakwoodIconProps) {
  return (
    <OakwoodSvg {...props}>
      <path d="M15 57c2-9.8 7.6-15.6 17-15.6S47 47.2 49 57" />
      <path d="M21.5 28.4c.9 8.4 4.6 13.1 10.5 13.1s9.7-4.7 10.5-13.1" />
      <path d="M21.2 28.8c7.4-2 13.2-6.4 17.3-13.2 1.6 4.6 4.8 8.2 9.4 10.6" />
      <path d="M17.7 44.8c-2.7-13.2.1-25.6 10.4-29.8 9.8-4 18 3.7 17.8 16.2" />
      <path d="M21 41c-2.4 3.5-2.1 7.2 1 11" stroke="var(--oakwood-sage-line, #8FAE8F)" />
      <path d="M24.5 41.2c.2 7.8-2.3 12.6-7.6 14.6" />
      <path d="M20 51.5c8-4.9 16-5.1 24-.5" stroke="var(--oakwood-beige-line, #CDBF9F)" />
      <LeafCluster side="left" y={34} />
      <LeafCluster side="right" y={34} />
      <RootNetwork y={51} />
    </OakwoodSvg>
  )
}

export function StudentSecondaryIcon(props: OakwoodIconProps) {
  return (
    <OakwoodSvg {...props}>
      <path d="M14 57c2.1-9.7 8-15.4 18-15.4S47.9 47.3 50 57" />
      <path d="M22 29c.7 8 4.3 12.7 10 12.7S41.3 37 42 29" />
      <path d="M20.8 27.6c6 .2 10.7-2.4 14.1-7.8 2 3.8 5.3 6.2 9.8 7.1" />
      <path d="M21 24c1.9-7 8.6-10.4 15.4-8.5 5 1.4 8 4.9 8.8 9.5" />
      <path d="M19 51.5c8.3-5 16.8-5.1 25.4-.1" stroke="var(--oakwood-beige-line, #CDBF9F)" />
      <path d="M18 42.5c-3.5 1.8-6.5 4.2-9 7.3" stroke="var(--oakwood-sage-line, #8FAE8F)" />
      <path d="M46 42.5c3.5 1.8 6.5 4.2 9 7.3" stroke="var(--oakwood-sage-line, #8FAE8F)" />
      <LeafCluster side="left" y={39} />
      <LeafCluster side="right" y={39} />
      <RootNetwork y={51} />
    </OakwoodSvg>
  )
}

export const StudentGirlJuniorIcon = StudentPrimaryIcon
export const StudentGirlSeniorIcon = StudentYear7Icon
export const StudentBoyJuniorIcon = StudentPrimaryIcon
export const StudentBoySeniorIcon = StudentSecondaryIcon

export function FamilyHubIcon(props: OakwoodIconProps) {
  return (
    <OakwoodSvg {...props}>
      <circle cx="22" cy="29" r="5" />
      <circle cx="42" cy="29" r="5" />
      <circle cx="32" cy="21" r="5.5" />
      <path d="M14 49c1.5-7.4 5.7-11.4 12.5-11.4" />
      <path d="M50 49c-1.5-7.4-5.7-11.4-12.5-11.4" />
      <path d="M22 38c2.7 4 6 6.8 10 8.5 4-1.7 7.3-4.5 10-8.5" stroke="var(--oakwood-sage-line, #8FAE8F)" />
      <path d="M32 16c-4.8-7.2-12.7-7.6-18.1-1.2 6.3-1.8 11.6-.6 15.8 3.5" stroke="var(--oakwood-sage-line, #8FAE8F)" />
      <path d="M32 16c4.8-7.2 12.7-7.6 18.1-1.2-6.3-1.8-11.6-.6-15.8 3.5" stroke="var(--oakwood-sage-line, #8FAE8F)" />
      <RootNetwork y={49} />
    </OakwoodSvg>
  )
}

export function LessonsIcon(props: OakwoodIconProps) {
  return (
    <OakwoodSvg {...props}>
      <path d="M10 18c7-2.1 14.4-.7 22 4v28c-7.6-4.7-15-6.1-22-4z" />
      <path d="M54 18c-7-2.1-14.4-.7-22 4v28c7.6-4.7 15-6.1 22-4z" />
      <path d="M18 28c4.3.3 8 1.5 11.2 3.5" />
      <path d="M46 28c-4.3.3-8 1.5-11.2 3.5" />
      <path d="M32 21c-4.2-7.5-11.2-9.2-18.8-4.6" stroke="var(--oakwood-sage-line, #8FAE8F)" />
      <path d="M32 21c4.2-7.5 11.2-9.2 18.8-4.6" stroke="var(--oakwood-sage-line, #8FAE8F)" />
      <LeafCluster side="right" y={32} />
    </OakwoodSvg>
  )
}

export function QuizIcon(props: OakwoodIconProps) {
  return (
    <OakwoodSvg {...props}>
      <rect height="36" rx="5" width="28" x="15" y="10" />
      <path d="M24 22c1-3.2 3.4-5 7-5 4 0 6.8 2.3 6.8 5.7 0 4.9-5.9 5.1-5.9 9.5" />
      <path d="M31.8 38h.1" />
      <circle cx="43" cy="45" r="7" />
      <path d="M40 45.2l2 2 4-5" />
      <LeafCluster side="right" y={27} />
    </OakwoodSvg>
  )
}

export function HomeworkIcon(props: OakwoodIconProps) {
  return (
    <OakwoodSvg {...props}>
      <rect height="40" rx="5" width="34" x="15" y="12" />
      <path d="M23 24l2.3 2.3 4.7-5.4" />
      <path d="M23 34l2.3 2.3 4.7-5.4" />
      <path d="M23 44l2.3 2.3 4.7-5.4" />
      <path d="M34 24h7" />
      <path d="M34 34h7" />
      <path d="M34 44h7" />
      <LeafCluster side="right" y={32} />
    </OakwoodSvg>
  )
}

export function ReportIcon(props: OakwoodIconProps) {
  return (
    <OakwoodSvg {...props}>
      <path d="M13 51h38" />
      <path d="M18 51V39" />
      <path d="M28 51V30" />
      <path d="M38 51V22" />
      <path d="M48 51V34" />
      <path d="M18 39c4.1-3.9 7.4-3.9 9.9 0-1.5 3.7-4.7 5.3-9.3 4.8" stroke="var(--oakwood-sage-line, #8FAE8F)" />
      <path d="M38 22c4.8-5.2 9-5.2 12.4.1-2 4.6-6 6.5-12 5.7" stroke="var(--oakwood-sage-line, #8FAE8F)" />
      <path d="M24 19c7.8-3.9 15.3-4 22.7-.2" stroke="var(--oakwood-beige-line, #CDBF9F)" />
    </OakwoodSvg>
  )
}

export function AIIcon(props: OakwoodIconProps) {
  return (
    <OakwoodSvg {...props}>
      <path d="M13 22c0-5.7 4.6-10.2 10.2-10.2h18.6C47.4 11.8 52 16.3 52 22v11.3c0 5.7-4.6 10.2-10.2 10.2H30L18 53v-10.2c-3.1-1.8-5-5-5-8.7z" />
      <path d="M27 22.5l2.5 6 6 2.5-6 2.5-2.5 6-2.5-6-6-2.5 6-2.5z" stroke="var(--oakwood-sage-line, #8FAE8F)" />
      <path d="M42 19l1.2 2.8L46 23l-2.8 1.2L42 27l-1.2-2.8L38 23l2.8-1.2z" stroke="var(--oakwood-beige-line, #CDBF9F)" />
      <LeafCluster side="right" y={31} />
    </OakwoodSvg>
  )
}

export function ResourcesIcon(props: OakwoodIconProps) {
  return (
    <OakwoodSvg {...props}>
      <path d="M11 22h15l4 5h23v24H11z" />
      <path d="M15 16h14l4 5h16" stroke="var(--oakwood-beige-line, #CDBF9F)" />
      <path d="M20 12h13l4 5h10" stroke="var(--oakwood-beige-line, #CDBF9F)" />
      <path d="M25 40c6.5-6.1 12.1-6 16.7.4-2.8 5.1-8 7-15.5 5.5" stroke="var(--oakwood-sage-line, #8FAE8F)" />
      <path d="M28 45c3-4.1 6.5-6.8 10.5-8.2" stroke="var(--oakwood-sage-line, #8FAE8F)" />
    </OakwoodSvg>
  )
}

export function MessagesIcon(props: OakwoodIconProps) {
  return (
    <OakwoodSvg {...props}>
      <path d="M12 24c0-6 4.8-10.8 10.8-10.8h18.4C47.2 13.2 52 18 52 24v9.4c0 6-4.8 10.8-10.8 10.8H34l-11 8.5v-8.5h-.2C16.8 44.2 12 39.4 12 33.4z" />
      <circle cx="27" cy="29" r="2.6" stroke="var(--oakwood-sage-line, #8FAE8F)" />
      <circle cx="39" cy="24" r="2.6" stroke="var(--oakwood-sage-line, #8FAE8F)" />
      <circle cx="40" cy="36" r="2.6" stroke="var(--oakwood-sage-line, #8FAE8F)" />
      <path d="M29.3 28l7.4-3" stroke="var(--oakwood-sage-line, #8FAE8F)" />
      <path d="M29.4 30.2l8.3 4.6" stroke="var(--oakwood-sage-line, #8FAE8F)" />
      <LeafCluster side="right" y={32} />
    </OakwoodSvg>
  )
}

export function SettingsIcon(props: OakwoodIconProps) {
  return (
    <OakwoodSvg {...props}>
      <path d="M32 13v-5" />
      <path d="M32 56v-5" />
      <path d="M45.4 18.6l4-4" />
      <path d="M18.6 45.4l-4 4" />
      <path d="M51 32h5" />
      <path d="M8 32h5" />
      <path d="M45.4 45.4l4 4" />
      <path d="M18.6 18.6l-4-4" />
      <circle cx="32" cy="32" r="16" />
      <circle cx="32" cy="32" r="7" />
      <path d="M34 26c5-3.8 8.8-3.5 11.2.8-1.7 3.9-5.1 5.6-10.2 5" stroke="var(--oakwood-sage-line, #8FAE8F)" />
      <path d="M28.7 34.8c2.9-3.7 6-6.1 9.3-7.2" stroke="var(--oakwood-sage-line, #8FAE8F)" />
    </OakwoodSvg>
  )
}

export function PinIcon(props: OakwoodIconProps) {
  return (
    <OakwoodSvg {...props}>
      <rect height="26" rx="5" width="34" x="15" y="28" />
      <path d="M22 28v-7.3C22 13.5 26.3 9 32 9s10 4.5 10 11.7V28" />
      <path d="M32 38v6" />
      <circle cx="32" cy="36" r="1.6" fill="currentColor" stroke="none" />
      <path d="M24 54c5.3-3.3 10.6-3.3 16 0" stroke="var(--oakwood-beige-line, #CDBF9F)" />
      <path d="M25 50c-5.4-6.4-5.3-11.8.3-16.2 4.2 2.8 6.1 6.9 5.8 12.2" stroke="var(--oakwood-sage-line, #8FAE8F)" />
    </OakwoodSvg>
  )
}
