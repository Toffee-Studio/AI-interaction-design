'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { ToffeeProvider } from '@toffee.studio/ai-interaction-design'
import { Sidebar, SIDEBAR_WIDTH, SIDEBAR_COLLAPSED_WIDTH } from '@/components/Sidebar'
import { t } from '@/theme'

const MOBILE_BREAKPOINT = 768

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
            </main>
          </div>
        </ToffeeProvider>
      </body>
    </html>
  )
}
