'use client'

import React from 'react'
import { t } from '@/theme'

interface DemoBoxProps {
  children: React.ReactNode
  label?: string
}

export function DemoBox({ children, label }: DemoBoxProps) {
  return (
    <div
      style={{
        background: t.bgCard,
        border: `1px solid ${t.borderCard}`,
        borderRadius: t.radiusLg,
        padding: '32px',
        marginTop: 12,
        marginBottom: 20,
        position: 'relative',
      }}
    >
      {label && (
        <span
          style={{
            position: 'absolute',
            top: 12,
            right: 16,
            fontSize: 10,
            fontWeight: 500,
            color: t.textMuted,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}
        >
          {label}
        </span>
      )}
      {children}
    </div>
  )
}
