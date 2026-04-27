'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { ToffeeProvider } from '@toffee.studio/ai-interaction-design'
import { Sidebar, SIDEBAR_WIDTH, SIDEBAR_COLLAPSED_WIDTH } from '@/components/Sidebar'
import { t } from '@/theme'

const MOBILE_BREAKPOINT = 768

const footerLink: React.CSSProperties = {
  display: 'block',
  fontSize: 13,
  color: 'rgba(255,255,255,0.45)',
  textDecoration: 'none',
  marginBottom: 10,
  transition: 'color 150ms ease',
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function FooterLink({ href, label, external }: { href: string; label: string; external?: boolean }) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      style={footerLink}
      onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.9)' }}
      onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)' }}
    >
      {label}
    </a>
  )
}

function Footer({ isMobile }: { isMobile: boolean }) {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer
      style={{
        marginTop: 80,
        marginLeft: isMobile ? -20 : -64,
        marginRight: isMobile ? -20 : -64,
        marginBottom: isMobile ? -120 : -48,
        background: '#1a1a1a',
        padding: isMobile ? '48px 24px 40px' : '56px 64px 40px',
      }}
    >
      {/* Top row */}
      <div
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          gap: isMobile ? 40 : 48,
          marginBottom: 48,
        }}
      >
        {/* Brand + subscribe */}
        <div style={{ maxWidth: 300, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <img src="/toffee-logo.svg" alt="Toffee" style={{ width: 26, height: 26, filter: 'brightness(0) invert(1)' }} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1 }}>toffee</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 3, letterSpacing: '0.04em' }}>studio</div>
            </div>
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.65, color: 'rgba(255,255,255,0.4)', margin: '0 0 24px' }}>
            AI interaction design components for React and Next.js. Shimmer, stream, and reveal — all with a unified API.
          </p>

          {/* Subscribe */}
          <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: 10 }}>
            Stay updated
          </div>
          {subscribed ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              You&apos;re subscribed!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: 0 }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                style={{
                  flex: 1,
                  padding: '9px 14px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  borderRight: 'none',
                  borderRadius: '8px 0 0 8px',
                  color: '#ffffff',
                  fontSize: 13,
                  fontFamily: 'inherit',
                  outline: 'none',
                  minWidth: 0,
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)' }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)' }}
              />
              <button
                type="submit"
                style={{
                  padding: '9px 16px',
                  background: 'rgba(255,255,255,0.10)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  borderRadius: '0 8px 8px 0',
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: 12,
                  fontWeight: 600,
                  fontFamily: 'inherit',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap' as const,
                  transition: 'background 150ms ease, color 150ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.18)'
                  e.currentTarget.style.color = '#ffffff'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.10)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
                }}
              >
                Subscribe
              </button>
            </form>
          )}
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: isMobile ? 40 : 64, flexWrap: 'wrap' as const }}>
          {/* Library */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: 14 }}>
              Library
            </div>
            <FooterLink href="/installation" label="Installation" />
            <FooterLink href="/effects/shimmer-text" label="ShimmerText" />
            <FooterLink href="/effects/streaming-text" label="StreamingText" />
            <FooterLink href="/shared-props" label="Shared Props" />
            <FooterLink href="/theming" label="Theming" />
          </div>

          {/* Resources */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: 14 }}>
              Resources
            </div>
            <FooterLink href="https://github.com/Toffee-Studio/AI-interaction-design" label="GitHub" external />
            <FooterLink href="https://www.npmjs.com/package/@toffee.studio/ai-interaction-design" label="npm" external />
            <FooterLink href="#" label="Changelog" />
            <FooterLink href="https://github.com/Toffee-Studio/AI-interaction-design/blob/main/packages/interactions/LICENSE" label="License (MIT)" external />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 24 }} />

      {/* Bottom row */}
      <div
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-start' : 'center',
          gap: 12,
        }}
      >
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>
          © 2026 Toffee Studio. MIT License.
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <a href="https://github.com/Toffee-Studio/AI-interaction-design" target="_blank" rel="noopener noreferrer"
            style={{ color: 'rgba(255,255,255,0.25)', display: 'flex', transition: 'color 150ms ease' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.25)' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>
          <a href="https://www.npmjs.com/package/@toffee.studio/ai-interaction-design" target="_blank" rel="noopener noreferrer"
            style={{ color: 'rgba(255,255,255,0.25)', display: 'flex', transition: 'color 150ms ease' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.25)' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M0 0v24h24V0H0zm19.2 19.2H4.8V4.8h14.4v14.4zm-2.4-2.4H12v-9.6H7.2v9.6H4.8V7.2h14.4v9.6h-2.4z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT
      setIsMobile(mobile)
      if (mobile) setSidebarOpen(false)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const toggleSidebar = useCallback(() => setSidebarOpen((prev) => !prev), [])
  const closeSidebar = useCallback(() => setSidebarOpen(false), [])

  const currentMargin = isMobile
    ? 0
    : sidebarOpen
      ? SIDEBAR_WIDTH
      : SIDEBAR_COLLAPSED_WIDTH

  return (
    <html lang="en">
      <head>
        <title>Toffee Interactions — AI interaction components for React</title>
        <meta
          name="description"
          content="Shimmer text, streaming text, generative image reveals — AI interaction design components for React and Next.js."
        />
        <meta name="theme-color" content="#f5f0eb" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Favicon — SVG (modern browsers) */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        {/* Fallback PNG favicon for older browsers */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        {/* Apple touch icon */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          background: t.bg,
          color: t.textPrimary,
          fontFamily: t.font,
          WebkitFontSmoothing: 'antialiased',
          overflow: 'hidden',
          overflowX: 'hidden',
        }}
      >
        <ToffeeProvider useServerInsertedHTML={useServerInsertedHTML}>
          <div style={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
            {/* Mobile overlay backdrop */}
            {isMobile && sidebarOpen && (
              <div
                onClick={closeSidebar}
                style={{
                  position: 'fixed',
                  inset: 0,
                  background: 'rgba(0,0,0,0.3)',
                  zIndex: 99,
                  transition: 'opacity 300ms ease',
                }}
              />
            )}

            <Sidebar
              isOpen={sidebarOpen}
              isMobile={isMobile}
              onToggle={toggleSidebar}
            />

            <main
              id="main-content"
              style={{
                flex: 1,
                marginLeft: currentMargin,
                padding: isMobile ? '72px 20px 120px' : '48px 64px',
                background: '#ffffff',
                minHeight: '100vh',
                transition: 'margin-left 300ms cubic-bezier(0.4, 0, 0.2, 1), margin-right 350ms cubic-bezier(0.4, 0, 0.2, 1)',
                overflowY: 'auto',
                maxHeight: '100vh',
              }}
            >
              {/* Mobile top bar */}
              {isMobile && (
                <div
                  style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 56,
                    background: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 16px',
                    zIndex: 98,
                    boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
                  }}
                >
                  <button
                    onClick={toggleSidebar}
                    aria-label="Toggle menu"
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 8,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: t.textPrimary,
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <line x1="3" y1="12" x2="21" y2="12" />
                      <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                  </button>
                  <span style={{ fontSize: 15, fontWeight: 700, marginLeft: 8, letterSpacing: '-0.02em' }}>
                    toffee
                  </span>
                  <span style={{ fontSize: 10, color: t.textMuted, marginLeft: 6, marginTop: 2 }}>
                    interactions
                  </span>
                </div>
              )}

              {children}

              {/* ── Footer ── */}
              <Footer isMobile={isMobile} />
            </main>
          </div>
        </ToffeeProvider>
      </body>
    </html>
  )
}
