'use client'

import React from 'react'

interface IconProps {
  size?: number
  color?: string
  strokeWidth?: number
}

const defaults = { size: 20, color: 'currentColor', strokeWidth: 1.5 }

/** Phosphor-style: MagnifyingGlass */
export function IconSearch({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="116" cy="116" r="68" stroke={color} strokeWidth={strokeWidth * 10} fill="none" />
      <line x1="164.49" y1="164.49" x2="224" y2="224" stroke={color} strokeWidth={strokeWidth * 10} strokeLinecap="round" />
    </svg>
  )
}

/** Phosphor-style: House */
export function IconHome({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M128 24L16 120h32v96h64v-64h32v64h64v-96h32L128 24z" stroke={color} strokeWidth={strokeWidth * 10} strokeLinejoin="round" fill="none" />
    </svg>
  )
}

/** Phosphor-style: DownloadSimple */
export function IconDownload({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="128" y1="24" x2="128" y2="168" stroke={color} strokeWidth={strokeWidth * 10} strokeLinecap="round" />
      <polyline points="80,128 128,168 176,128" stroke={color} strokeWidth={strokeWidth * 10} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="40" y1="216" x2="216" y2="216" stroke={color} strokeWidth={strokeWidth * 10} strokeLinecap="round" />
    </svg>
  )
}

/** Phosphor-style: Sparkle */
export function IconSparkle({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M128 16l20 60 60 20-60 20-20 60-20-60-60-20 60-20z" stroke={color} strokeWidth={strokeWidth * 10} strokeLinejoin="round" fill="none" />
      <path d="M200 136l10 30 30 10-30 10-10 30-10-30-30-10 30-10z" stroke={color} strokeWidth={strokeWidth * 10} strokeLinejoin="round" fill="none" />
    </svg>
  )
}

/** Phosphor-style: TextT */
export function IconTextT({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="56" y1="56" x2="200" y2="56" stroke={color} strokeWidth={strokeWidth * 10} strokeLinecap="round" />
      <line x1="128" y1="56" x2="128" y2="200" stroke={color} strokeWidth={strokeWidth * 10} strokeLinecap="round" />
      <line x1="96" y1="200" x2="160" y2="200" stroke={color} strokeWidth={strokeWidth * 10} strokeLinecap="round" />
    </svg>
  )
}

/** Phosphor-style: Cursor text / streaming */
export function IconCursorText({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M96 48a32 32 0 0132 32v96a32 32 0 01-32 32" stroke={color} strokeWidth={strokeWidth * 10} strokeLinecap="round" fill="none" />
      <path d="M160 48a32 32 0 00-32 32v96a32 32 0 0032 32" stroke={color} strokeWidth={strokeWidth * 10} strokeLinecap="round" fill="none" />
      <line x1="80" y1="128" x2="176" y2="128" stroke={color} strokeWidth={strokeWidth * 10} strokeLinecap="round" />
    </svg>
  )
}

/** Phosphor-style: Image */
export function IconImage({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="32" y="48" width="192" height="160" rx="12" stroke={color} strokeWidth={strokeWidth * 10} fill="none" />
      <circle cx="100" cy="116" r="20" stroke={color} strokeWidth={strokeWidth * 10} fill="none" />
      <path d="M224 176l-56-56-96 96" stroke={color} strokeWidth={strokeWidth * 10} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

/** Phosphor-style: SlidersHorizontal */
export function IconSliders({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="32" y1="80" x2="224" y2="80" stroke={color} strokeWidth={strokeWidth * 10} strokeLinecap="round" />
      <line x1="32" y1="176" x2="224" y2="176" stroke={color} strokeWidth={strokeWidth * 10} strokeLinecap="round" />
      <circle cx="176" cy="80" r="16" stroke={color} strokeWidth={strokeWidth * 10} fill="none" />
      <circle cx="80" cy="176" r="16" stroke={color} strokeWidth={strokeWidth * 10} fill="none" />
    </svg>
  )
}

/** Phosphor-style: Palette */
export function IconPalette({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M128 24a104 104 0 00-8 207.5c8.7.5 16-6.3 16-15v-17.5a16 16 0 0116-16h24a40 40 0 0040-40C216 75.8 178.4 24 128 24z" stroke={color} strokeWidth={strokeWidth * 10} fill="none" />
      <circle cx="100" cy="96" r="10" fill={color} />
      <circle cx="148" cy="84" r="10" fill={color} />
      <circle cx="84" cy="144" r="10" fill={color} />
    </svg>
  )
}

/** Phosphor-style: CaretRight */
export function IconCaretRight({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polyline points="96,48 176,128 96,208" stroke={color} strokeWidth={strokeWidth * 10} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

/** Phosphor-style: ArrowRight */
export function IconArrowRight({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="40" y1="128" x2="216" y2="128" stroke={color} strokeWidth={strokeWidth * 10} strokeLinecap="round" />
      <polyline points="168,80 216,128 168,176" stroke={color} strokeWidth={strokeWidth * 10} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

/** GitHub logo */
export function IconGitHub({ size = defaults.size, color = defaults.color }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )
}
