'use client'

import React, { useState } from 'react'
import { t } from '@/theme'
import { TabbedCodeBlock } from './TabbedCodeBlock'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ShowcaseVariant {
  /** Tab label shown in the variant switcher */
  label: string
  /** Live preview React node */
  preview: React.ReactNode
  /** TSX code string */
  tsx: string
  /** Optional JSX override (auto-generated from TSX if omitted) */
  jsx?: string
  /** Optional React.createElement override */
  react?: string
}

interface PropShowcaseProps {
  /** Section title */
  title: string
  /** Optional description below the title */
  description?: React.ReactNode
  /** Variant tabs — each gets its own preview + code */
  variants: ShowcaseVariant[]
}

// Fixed height for all showcase sections
const SHOWCASE_HEIGHT = 280

// ─── Icons ───────────────────────────────────────────────────────────────────

/** Chat bubble icon — shown when chat UI is off, click to turn on */
function ChatBubbleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

/** Grid/canvas icon — shown when chat UI is on, click to turn off */
function GridIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  )
}

// ─── Component ───────────────────────────────────────────────────────────────

export function PropShowcase({ title, description, variants }: PropShowcaseProps) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [chatUI, setChatUI] = useState(true)
  const active = variants[activeIdx]

  return (
    <div style={{ marginBottom: 36 }}>
      {/* Section heading */}
      <h2
        style={{
          fontSize: 16,
          fontWeight: 600,
          color: t.textPrimary,
          margin: '40px 0 6px',
        }}
      >
        {title}
      </h2>
      {description && (
        <p style={{ fontSize: 14, color: t.textSecondary, margin: '0 0 14px', lineHeight: 1.6 }}>
          {description}
        </p>
      )}

      {/* Variant tabs */}
      {variants.length > 1 && (
        <div
          style={{
            display: 'flex',
            gap: 2,
            background: '#F4F4F5',
            borderRadius: 10,
            padding: 3,
            marginBottom: 14,
            width: 'fit-content',
          }}
        >
          {variants.map((v, i) => (
            <button
              key={v.label}
              onClick={() => setActiveIdx(i)}
              style={{
                padding: '6px 16px',
                borderRadius: 8,
                border: 'none',
                background: activeIdx === i ? '#ffffff' : 'transparent',
                boxShadow: activeIdx === i ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                color: activeIdx === i ? t.textPrimary : t.textMuted,
                fontSize: 12,
                fontWeight: activeIdx === i ? 600 : 400,
                fontFamily: t.fontMono,
                cursor: 'pointer',
                transition: 'all 180ms ease',
                whiteSpace: 'nowrap',
              }}
            >
              {v.label}
            </button>
          ))}
        </div>
      )}

      {/* Side-by-side: preview left, code right */}
      <div
        style={{
          display: 'flex',
          gap: 0,
          borderRadius: t.radiusLg,
          overflow: 'hidden',
          border: `1px solid ${t.borderCard}`,
          background: '#ffffff',
          height: SHOWCASE_HEIGHT,
        }}
      >
        {/* Preview pane — dotted background */}
        <div
          style={{
            flex: '1 1 50%',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRight: `1px solid ${t.borderCard}`,
            backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)',
            backgroundSize: '16px 16px',
            backgroundColor: '#FAFAFA',
            padding: chatUI ? '24px 20px' : '32px 28px',
            overflow: 'hidden',
          }}
        >
          {/* Toggle chat UI button — top left */}
          <button
            onClick={() => setChatUI((v) => !v)}
            title={chatUI ? 'Switch to plain preview' : 'Switch to chat UI'}
            aria-label={chatUI ? 'Switch to plain preview' : 'Switch to chat UI'}
            style={{
              position: 'absolute',
              top: 8,
              left: 8,
              width: 28,
              height: 28,
              borderRadius: 7,
              border: '1px solid rgba(0,0,0,0.08)',
              background: chatUI ? '#ffffff' : 'transparent',
              boxShadow: chatUI ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: chatUI ? t.textPrimary : t.textMuted,
              transition: 'all 180ms ease',
              padding: 0,
              zIndex: 2,
            }}
          >
            {chatUI ? <GridIcon /> : <ChatBubbleIcon />}
          </button>

          {/* Content — either chat card or raw preview */}
          {chatUI ? (
            <div
              style={{
                background: '#ffffff',
                borderRadius: 12,
                padding: '16px 22px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03)',
                maxWidth: '85%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {active.preview}
            </div>
          ) : (
            active.preview
          )}
        </div>

        {/* Code pane */}
        <div
          style={{
            flex: '1 1 50%',
            minWidth: 0,
            display: 'flex',
          }}
        >
          <TabbedCodeBlock
            tsx={active.tsx}
            jsx={active.jsx}
            react={active.react}
          />
        </div>
      </div>
    </div>
  )
}
