'use client'

import React, { useState, useEffect } from 'react'
import { ShimmerText, StreamingText } from '@toffee.studio/ai-interaction-design/client'
import { t } from '@/theme'
import { GradientButton } from '@/components/GradientButton'
import { IconArrowRight, IconGitHub } from '@/components/Icons'

// ─── Responsive hook ─────────────────────────────────────────────────────────

function useIsMobile(breakpoint = 768) {
  const [mobile, setMobile] = useState(false)
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < breakpoint)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [breakpoint])
  return mobile
}

// ─── Rotating text for the shimmer card ──────────────────────────────────────

const rotatingTexts = ['Generating ideas', 'Thinking harder', 'Researching deeply']

function useRotatingText(texts: string[], intervalMs = 2800) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % texts.length), intervalMs)
    return () => clearInterval(id)
  }, [texts.length, intervalMs])
  return texts[index]
}

// ─── Sparkle icon ────────────────────────────────────────────────────────────

function SparklesIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="url(#sparkleGrad)" stroke="none">
      <defs>
        <linearGradient id="sparkleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={t.orange} />
          <stop offset="100%" stopColor={t.yellow} />
        </linearGradient>
      </defs>
      <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z" />
      <path d="M19 15l.5 2 2 .5-2 .5-.5 2-.5-2-2-.5 2-.5.5-2z" />
      <path d="M5 18l.5 1.5 1.5.5-1.5.5L5 22l-.5-1.5L3 20l1.5-.5L5 18z" />
    </svg>
  )
}

// ─── Circular loading spinner ────────────────────────────────────────────────

function LoadingSpinner() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <circle cx="12" cy="12" r="10" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="2.5" />
      <path d="M12 2a10 10 0 0 1 10 10" fill="none" stroke="rgba(120,120,120,0.5)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

// ─── Effect card data ────────────────────────────────────────────────────────

interface EffectCardData {
  title: string
  description: string
  href: string
  image: string
  isShimmer?: boolean
  isStreaming?: boolean
}

const effectCards: EffectCardData[] = [
  {
    title: 'ShimmerText',
    description: 'A moving gradient shimmer over text — ideal for AI thinking labels, loading states, and generative content previews.',
    href: '/effects/shimmer-text',
    image: '/Shimmeringtextcard.jpg',
    isShimmer: true,
  },
  {
    title: 'StreamingText',
    description: 'Token-by-token text reveal that mimics ChatGPT and Claude streaming — with caret cursor and speed control.',
    href: '/effects/streaming-text',
    image: '/Streamingeffectimage.jpg',
    isStreaming: true,
  },
]

// ─── Streaming chat input box ────────────────────────────────────────────────

const streamingMessages = [
  'Can you create folders in Google Docs?',
  'How does React Server Components work?',
  'Explain gradient shimmer animations.',
]

function StreamingChatBox() {
  const [msgIdx, setMsgIdx] = useState(0)
  const [key, setKey] = useState(0)

  // Cycle to next message when streaming completes
  const handleComplete = () => {
    setTimeout(() => {
      setMsgIdx((i) => (i + 1) % streamingMessages.length)
      setKey((k) => k + 1)
    }, 1200)
  }

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: 20,
        border: '1px solid rgba(0,0,0,0.07)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.10), 0 1px 2px rgba(0,0,0,0.04)',
        padding: '16px 16px 12px',
        width: '100%',
      }}
    >
      {/* Streaming text area */}
      <div
        style={{
          fontSize: 14,
          fontWeight: 500,
          color: '#111111',
          lineHeight: 1.5,
          minHeight: 22,
          marginBottom: 14,
          paddingLeft: 2,
        }}
      >
        <StreamingText
          key={key}
          text={streamingMessages[msgIdx] ?? ''}
          speed="fast"
          tone="neutral"
          showCaret
          onComplete={handleComplete}
        />
      </div>

      {/* Bottom toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {/* Attachment */}
        <button style={toolBtn}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66L9.41 17.41a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
          </svg>
        </button>
        {/* Globe */}
        <button style={toolBtn}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="2" y1="12" x2="22" y2="12"/>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
        </button>
        {/* Model chip */}
        <button
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            padding: '4px 10px',
            borderRadius: 20,
            border: '1px solid rgba(0,0,0,0.10)',
            background: 'transparent',
            fontSize: 12,
            fontWeight: 500,
            color: '#444',
            cursor: 'pointer',
            fontFamily: t.font,
          }}
        >
          {/* OpenAI-style icon */}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
          </svg>
          GPT 5.0
        </button>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Voice button */}
        <button
          style={{
            width: 34,
            height: 34,
            borderRadius: '50%',
            background: '#111111',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#ffffff',
            flexShrink: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <line x1="12" y1="19" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="8" y1="23" x2="16" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

const toolBtn: React.CSSProperties = {
  width: 30,
  height: 30,
  borderRadius: '50%',
  border: '1px solid rgba(0,0,0,0.10)',
  background: 'transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  color: '#555',
  padding: 0,
}

// ─── Quick Install ───────────────────────────────────────────────────────────

const INSTALL_CMD = 'npm install @toffee.studio/ai-interaction-design @emotion/react'

function QuickInstall() {
  const [copied, setCopied] = useState(false)
  const isMobile = useIsMobile()

  const handleCopy = async () => {
    await navigator.clipboard.writeText(INSTALL_CMD)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      style={{
        display: isMobile ? 'flex' : 'inline-flex',
        alignItems: 'center',
        gap: 10,
        background: 'linear-gradient(135deg, #F4F4F5 0%, #EBEBEC 100%)',
        border: '1px solid rgba(0,0,0,0.07)',
        borderRadius: 10,
        padding: '10px 14px',
        marginBottom: 32,
        width: isMobile ? '100%' : 'auto',
        maxWidth: '100%',
        boxSizing: 'border-box' as const,
      }}
    >
      <code
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          color: '#2a2a2a',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          flex: 1,
          minWidth: 0,
        }}
      >
        {INSTALL_CMD}
      </code>
      <button
        onClick={handleCopy}
        title="Copy"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: copied ? t.orange : 'rgba(0,0,0,0.35)',
          flexShrink: 0,
          transition: 'color 150ms ease',
          borderRadius: 5,
        }}
      >
        {copied ? (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        )}
      </button>
    </div>
  )
}

// ─── Effect Card Component ───────────────────────────────────────────────────

function EffectCard({ card }: { card: EffectCardData }) {
  const currentText = useRotatingText(rotatingTexts)
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={card.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 10,
        overflow: 'hidden',
        border: `1px solid ${hovered ? 'rgba(0,0,0,0.12)' : t.borderCard}`,
        background: '#ffffff',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'all 350ms cubic-bezier(0.4, 0, 0.2, 1)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 12px 40px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.06)'
          : '0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      {/* Image area — 60% */}
      <div
        style={{
          position: 'relative',
          height: 220,
          backgroundImage: `url(${card.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Glassmorphism chat box overlay */}
        {card.isShimmer && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '75%',
              background: 'linear-gradient(162deg, rgba(255,255,255,0.95) 0%, rgba(240,240,240,0.55) 100%)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderRadius: 14,
              border: '1px solid linear-gradient(135deg, rgba(200,200,200,0.5), rgba(180,180,180,0.25))',
              borderColor: 'rgba(200,200,200,0.4)',
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.4)',
            }}
          >
            {/* Sparkle icon */}
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 10,
               
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <SparklesIcon />
            </div>

            {/* Text + spinner */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>
                <ShimmerText tone="brand" speed="slow" variant="strong">
                  {currentText}
                </ShimmerText>
              </div>
            </div>

            {/* Loading spinner */}
            <div style={{ flexShrink: 0 }}>
              <LoadingSpinner />
            </div>
          </div>
        )}

        {/* Streaming chat input overlay */}
        {card.isStreaming && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 9%',
            }}
          >
            <StreamingChatBox />
          </div>
        )}

        {/* Placeholder chat box for other cards */}
        {!card.isShimmer && !card.isStreaming && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '75%',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(240,240,240,0.35) 100%)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderRadius: 14,
              borderColor: 'rgba(200,200,200,0.4)',
              border: '1px solid rgba(200,200,200,0.4)',
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.4)',
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: 'rgba(255,255,255,0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <SparklesIcon />
            </div>
            <div style={{ fontSize: 13, fontWeight: 500, color: 'rgba(0,0,0,0.45)' }}>
              Coming soon...
            </div>
          </div>
        )}
      </div>

      {/* Content area — 40% */}
      <div style={{ padding: '20px 22px 24px', flex: 1 }}>
        <h3
          style={{
            fontSize: 16,
            fontWeight: 650,
            color: t.textPrimary,
            margin: '0 0 6px',
            letterSpacing: '-0.01em',
          }}
        >
          {card.title}
        </h3>
        <p
          style={{
            fontSize: 13,
            lineHeight: 1.55,
            color: t.textSecondary,
            margin: 0,
          }}
        >
          {card.description}
        </p>
      </div>
    </a>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const isMobile = useIsMobile()

  return (
    <div>
      {/* Hero */}
      <div style={{ marginBottom: 64 }}>
        <div
          style={{
            display: 'inline-block',
            borderRadius: 8,
            padding: 1,
            background: 'linear-gradient(135deg, #D4D4D8, #A1A1AA)',
            marginBottom: 20,
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 500,
              color: '#888888',
              background: '#F4F4F5',
              borderRadius: 7,
              padding: '5px 14px',
              letterSpacing: '0.04em',
            }}
          >
          v0.1.0 — Open Source
          </div>
        </div>

        <h1
          style={{
            fontSize: isMobile ? 36 : 60,
            fontWeight: 500,
            lineHeight: '1.1em',
            letterSpacing: '-0.03em',
            color: t.textPrimary,
            margin: '0 0 20px',
          }}
        >
          Your toolkit for{' '}
          <br />
          seamless{' '}
          <span
            style={{
              background: `linear-gradient(164deg, ${t.yellow}, ${t.orange})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: t.fontSerif,
              fontStyle: 'italic',
              fontWeight: 400,
            }}
          >
            AI interaction design .
          </span>
        </h1>

        <p
          style={{
            fontSize: 16,
            lineHeight: 1.4,
            color: t.textSecondary,
            maxWidth: 520,
            margin: '0 0 32px',
          }}
        >
          Build and ship AI interactions in minutes. Easily install and integrate with React and Next.js using simple, developer-friendly components.
        </p>

        <p
          style={{
            fontSize: 13,
            lineHeight: 1.7,
            color: t.textSecondary,
            maxWidth: 520,
            margin: '0 0 24px',
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <img
              src="/toffee-logo.svg"
              alt="Toffee"
              style={{ width: 16, height: 16, display: 'block' }}
            />
            by Toffee studio
          </span>
        </p>

        {/* ── Quick install ── */}
        <QuickInstall />

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <GradientButton href="/installation">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            Read the docs
          </GradientButton>
          <GradientButton
            href="https://github.com/Toffee-Studio/AI-interaction-design"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconGitHub size={16} color="#fff" />
            GitHub
          </GradientButton>
        </div>
      </div>

      {/* ── Effect Cards ── */}
      <div style={{ marginBottom: 48 }}>
        <h2
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: t.textMuted,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.06em',
            marginBottom: 16,
          }}
        >
          Effects
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: 20,
          }}
        >
          {effectCards.map((card) => (
            <EffectCard key={card.title} card={card} />
          ))}
        </div>
      </div>

      {/* ── Features grid ── */}
      <div style={{ marginBottom: 48 }}>
        <h2
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: t.textMuted,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.06em',
            marginBottom: 16,
          }}
        >
          Why Toffee
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr', gap: 16 }}>
          {[
            {
              title: 'Unified API',
              desc: 'Every component shares variant, speed, tone, reducedMotion, and render slots.',
              icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
              ),
            },
            {
              title: 'Next.js Ready',
              desc: 'ToffeeProvider handles Emotion SSR with useServerInsertedHTML — zero FOUC.',
              icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 19.5h20L12 2zm0 3.5l7.5 13h-15L12 5.5z"/>
                </svg>
              ),
            },
            {
              title: 'Accessible',
              desc: 'Respects prefers-reduced-motion by default. Override per-component or globally.',
              icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="4" r="2"/>
                  <path d="M12 8c-4 0-7 1.5-7 4v1h4v7h6v-7h4v-1c0-2.5-3-4-7-4z"/>
                </svg>
              ),
            },
            {
              title: 'Design Tokens',
              desc: 'Speed, tone, and easing tokens keep animations consistent across your app.',
              icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2a5 5 0 1 0 0 10A5 5 0 0 0 12 2zm0 12c-5.33 0-8 2.67-8 4v2h16v-2c0-1.33-2.67-4-8-4z"/>
                  <circle cx="18" cy="8" r="3"/>
                </svg>
              ),
            },
            {
              title: 'Render Slots',
              desc: 'before, after, and overlay slots give you full control without forking.',
              icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="3" y="3" width="8" height="8" rx="1"/>
                  <rect x="13" y="3" width="8" height="8" rx="1"/>
                  <rect x="3" y="13" width="8" height="8" rx="1"/>
                  <rect x="13" y="13" width="8" height="8" rx="1"/>
                </svg>
              ),
            },
            {
              title: 'Tree-Shakeable',
              desc: 'Dual ESM + CJS builds. Server-safe index, client-only components.',
              icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3 6h6l-5 4 2 6-6-4-6 4 2-6-5-4h6l3-6z"/>
                </svg>
              ),
            },
          ].map((f) => (
            <div
              key={f.title}
              style={{
                background: t.bgSidebar,
                border: `1px solid ${t.borderCard}`,
                borderRadius: t.radiusLg,
                padding: '22px',
              }}
            >
              {/* Icon box */}
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 9,
                  background: '#ffffff',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#111111',
                  marginBottom: 14,
                }}
              >
                {f.icon}
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: t.textPrimary, marginBottom: 5 }}>
                {f.title}
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.6, color: t.textSecondary }}>
                {f.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
