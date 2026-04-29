'use client'

import React, { useState, useEffect } from 'react'
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
  /**
   * Override preview/code pane height in px. Default: 280.
   */
  height?: number
  /**
   * When passed, locks the chat-card UI on/off and hides the toggle button.
   * Omit to let the user toggle freely (default: starts on).
   */
  chatUI?: boolean
}

const SHOWCASE_HEIGHT = 280
const MOBILE_BREAKPOINT = 768

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

/** Code icon — shown on mobile to reveal the code pane */
function CodeIcon({ active }: { active: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ opacity: active ? 1 : 0.6 }}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}

// ─── Component ───────────────────────────────────────────────────────────────

export function PropShowcase({ title, description, variants, height, chatUI: chatUIProp }: PropShowcaseProps) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [chatUIState, setChatUI] = useState(chatUIProp !== undefined ? chatUIProp : true)
  const [isMobile, setIsMobile] = useState(false)
  const [showCode, setShowCode] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const chatUI = chatUIProp !== undefined ? chatUIProp : chatUIState
  const showToggle = chatUIProp === undefined
  const active = variants[activeIdx]
  const paneHeight = height ?? SHOWCASE_HEIGHT

  return (
    <div style={{ marginBottom: 36 }}>
      {/* Section heading */}
      <h2 style={{ fontSize: 16, fontWeight: 600, color: t.textPrimary, margin: '40px 0 6px' }}>
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

      {/* ── Desktop layout: side-by-side ── */}
      {!isMobile && (
        <div
          style={{
            display: 'flex',
            gap: 0,
            borderRadius: t.radiusLg,
            overflow: 'hidden',
            border: `1px solid ${t.borderCard}`,
            background: '#ffffff',
            height: paneHeight,
          }}
        >
          {/* Preview pane */}
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
            {showToggle && (
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
            )}

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
          <div style={{ flex: '1 1 50%', minWidth: 0, display: 'flex' }}>
            <TabbedCodeBlock tsx={active.tsx} jsx={active.jsx} react={active.react} />
          </div>
        </div>
      )}

      {/* ── Mobile layout: preview only, code toggled by icon ── */}
      {isMobile && (
        <div
          style={{
            borderRadius: t.radiusLg,
            overflow: 'hidden',
            border: `1px solid ${t.borderCard}`,
            background: '#ffffff',
          }}
        >
          {/* Preview pane */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)',
              backgroundSize: '16px 16px',
              backgroundColor: '#FAFAFA',
              padding: chatUI ? '24px 20px' : '32px 28px',
              height: paneHeight,
              overflow: 'hidden',
            }}
          >
            {/* Code toggle icon — top right */}
            <button
              onClick={() => setShowCode((v) => !v)}
              title={showCode ? 'Hide code' : 'Show code'}
              aria-label={showCode ? 'Hide code' : 'Show code'}
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                width: 28,
                height: 28,
                borderRadius: 7,
                border: '1px solid rgba(0,0,0,0.08)',
                background: showCode ? t.textPrimary : '#ffffff',
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: showCode ? '#ffffff' : t.textPrimary,
                transition: 'all 180ms ease',
                padding: 0,
                zIndex: 2,
              }}
            >
              <CodeIcon active={showCode} />
            </button>

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

          {/* Code pane — shown below preview when toggled */}
          {showCode && (
            <div
              style={{
                borderTop: `1px solid ${t.borderCard}`,
                display: 'flex',
                maxHeight: 280,
                overflow: 'hidden',
              }}
            >
              <TabbedCodeBlock tsx={active.tsx} jsx={active.jsx} react={active.react} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
