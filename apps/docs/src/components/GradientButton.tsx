'use client'

import React from 'react'
import { t } from '@/theme'

interface GradientButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  target?: string
  rel?: string
  style?: React.CSSProperties
}

/**
 * Black linear gradient button with dark-to-light gray gradient stroke
 * and white text.
 */
export function GradientButton({ children, href, onClick, target, rel, style: extraStyle }: GradientButtonProps) {
  const inner: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '12px 24px',
    background: t.btnBg,
    color: t.btnText,
    borderRadius: t.radius,
    fontSize: 14,
    fontWeight: 500,
    fontFamily: t.font,
    textDecoration: 'none',
    cursor: 'pointer',
    border: 'none',
    position: 'relative' as const,
    transition: 'opacity 150ms ease',
    ...extraStyle,
  }

  // Outer wrapper provides the gradient border
  const wrapper: React.CSSProperties = {
    display: 'inline-block',
    padding: 1,
    borderRadius: t.radius + 1,
    background: t.btnBorder,
  }

  if (href) {
    return (
      <span style={wrapper}>
        <a href={href} target={target} rel={rel} style={inner}>
          {children}
        </a>
      </span>
    )
  }

  return (
    <span style={wrapper}>
      <button onClick={onClick} style={inner}>
        {children}
      </button>
    </span>
  )
}
