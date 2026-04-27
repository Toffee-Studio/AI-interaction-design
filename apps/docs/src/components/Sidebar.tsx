'use client'

import React, { useState, useRef, useEffect } from 'react'
import { t } from '@/theme'
import {
  IconHome,
  IconDownload,
  IconSparkle,
  IconTextT,
  IconCursorText,
  IconImage,
  IconSliders,
  IconPalette,
  IconCaretRight,
} from './Icons'

export const SIDEBAR_WIDTH = 260
export const SIDEBAR_COLLAPSED_WIDTH = 64

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  children?: { label: string; href: string }[]
  count?: number
}

const navItems: NavItem[] = [
  { label: 'Getting Started', href: '/', icon: <IconHome size={18} /> },
  { label: 'Installation', href: '/installation', icon: <IconDownload size={18} /> },
  {
    label: 'Interactions',
    href: '#',
    icon: <IconSparkle size={18} />,
    count: 3,
    children: [
      { label: 'Shimmer Text', href: '/effects/shimmer-text' },
      { label: 'Streaming Text', href: '/effects/streaming-text' },
      { label: 'Generative Image', href: '/effects/generative-image' },
    ],
  },
  { label: 'Shared Props', href: '/shared-props', icon: <IconSliders size={18} /> },
  { label: 'Theming', href: '/theming', icon: <IconPalette size={18} /> },
]

function ExpandableSection({
  item,
  isOpen,
  onToggle,
  collapsed,
}: {
  item: NavItem
  isOpen: boolean
  onToggle: () => void
  collapsed: boolean
}) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight)
    }
  }, [item.children])

  return (
    <div>
      <button
        onClick={onToggle}
        title={collapsed ? item.label : undefined}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: collapsed ? 0 : 10,
          width: '100%',
          padding: collapsed ? '10px 0' : '10px 20px',
          justifyContent: collapsed ? 'center' : 'flex-start',
          background: 'none',
          border: 'none',
          color: isOpen ? t.navActive : t.navText,
          fontSize: 14,
          fontWeight: isOpen ? 600 : 400,
          fontFamily: t.font,
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'color 200ms ease, padding 300ms cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0, color: isOpen ? t.navActive : t.navText }}>
          {item.icon}
        </span>
        {!collapsed && (
          <>
            <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden' }}>{item.label}</span>
            {item.count !== undefined && (
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  color: t.textMuted,
                  background: 'rgba(0,0,0,0.04)',
                  borderRadius: 10,
                  padding: '2px 8px',
                  minWidth: 20,
                  textAlign: 'center',
                }}
              >
                {item.count}
              </span>
            )}
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 250ms cubic-bezier(0.4, 0, 0.2, 1)',
                color: t.textMuted,
              }}
            >
              <IconCaretRight size={14} />
            </span>
          </>
        )}
      </button>

      {/* Animated expandable children — hidden when collapsed */}
      {!collapsed && (
        <div
          style={{
            overflow: 'hidden',
            maxHeight: isOpen ? height : 0,
            transition: 'max-height 300ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <div ref={contentRef} style={{ paddingLeft: 28 }}>
            {item.children?.map((child) => (
              <a
                key={child.href}
                href={child.href}
                style={{
                  display: 'block',
                  padding: '8px 20px',
                  color: t.navText,
                  textDecoration: 'none',
                  fontSize: 13,
                  fontWeight: 400,
                  borderLeft: `1px solid ${t.border}`,
                  transition: 'color 200ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = t.navTextHover
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = t.navText
                }}
              >
                {child.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function Sidebar({
  isOpen,
  isMobile,
  onToggle,
}: {
  isOpen: boolean
  isMobile: boolean
  onToggle: () => void
}) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const collapsed = !isMobile && !isOpen

  const toggle = (label: string) => {
    setExpanded((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  const sidebarWidth = collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH

  return (
    <aside
      style={{
        position: 'fixed',
        top: 0,
        left: isMobile ? (isOpen ? 0 : -SIDEBAR_WIDTH) : 0,
        width: isMobile ? SIDEBAR_WIDTH : sidebarWidth,
        height: '100vh',
        background: t.bgSidebar,
        padding: '28px 0',
        overflowY: 'auto',
        overflowX: 'hidden',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        transition: isMobile
          ? 'left 300ms cubic-bezier(0.4, 0, 0.2, 1)'
          : 'width 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Logo / brand header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          padding: collapsed ? '4px 0' : '4px 20px',
          marginBottom: collapsed ? 8 : 32,
          flexDirection: collapsed ? 'column' : 'row',
          gap: collapsed ? 12 : 0,
        }}
      >
        <a
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            textDecoration: 'none',
            justifyContent: collapsed ? 'center' : 'flex-start',
            width: collapsed ? '100%' : 'auto',
          }}
        >
          {/* Toffee logo */}
          <svg width="34" height="34" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ flexShrink: 0 }}>
            <path d="M104.933 25.0601C106.147 22.7548 107.873 19.8627 107.873 21.4605C107.873 23.3081 108.643 25.3097 109.028 26.0796L109.503 26.7906C110.6 28.4369 112.624 29.2015 114.536 28.6919L120.533 27.0933C121.319 26.8839 122.036 26.4693 122.722 26.0328C125.563 24.2243 132.481 21.37 133.281 23.7701C134.146 26.3636 134.363 29.6041 134.418 31.0699C134.437 31.5722 134.637 32.0543 134.992 32.4097C135.876 33.293 137.357 33.0943 137.977 32.0093L138.886 30.4204C140.058 28.3691 142.947 28.1889 144.365 30.0786C144.671 30.4866 145.068 30.8184 145.524 31.0464L145.713 31.1402C147.777 32.1722 150.293 31.3344 151.544 29.3951C153.336 26.615 155.225 24.2788 155.225 24.9244C155.225 26.0792 158.69 27.2344 158.69 28.3892V32.0953C158.69 32.6926 158.857 33.278 159.174 33.7847C159.604 34.4745 159.756 35.3027 159.597 36.1001L158.893 39.6148C158.759 40.2854 158.776 40.9777 158.942 41.6411L160.224 46.7661C160.672 47.7021 160.941 48.7394 160.99 49.8345L161 49.8726C160.997 49.877 160.994 49.8809 160.991 49.8853C160.995 49.988 161 50.0912 161 50.1949V132.332C161 157.845 140.316 178.528 114.803 178.528H87.0848C61.5711 178.528 40.8876 157.845 40.8876 132.332V50.1949C40.8876 49.6913 40.9367 49.1988 41.0263 48.7212L40.8886 48.7173L40.0243 40.0826C39.8464 38.3036 40.6508 36.4744 42.2421 35.6597C43.352 35.0917 44.4551 34.7926 45.5077 35.3189C46.7349 35.9325 48.7097 33.5235 50.3485 30.9341C51.6335 28.9043 54.2181 27.8458 56.1796 29.2329C57.3196 30.0392 58.2116 30.9645 58.2118 31.854C58.2118 34.1637 59.3666 36.4737 60.5214 36.4742C61.6763 36.4742 63.9866 37.6289 65.1415 33.0093C66.2964 28.3896 67.4511 26.08 67.4511 27.2349C67.4516 28.3901 70.9159 31.8545 70.9159 33.0093C70.9163 33.6877 75.0676 34.408 78.7977 34.8951C80.9388 35.1745 82.9379 33.8591 83.7118 31.8433C84.9296 28.6712 86.4226 25.4175 87.0848 26.0796C87.6884 26.6832 88.6534 27.9771 89.4647 29.1236C90.1724 30.1235 91.2244 30.8344 92.4257 31.0747L94.3612 31.4615C95.6133 31.7119 96.9139 31.4332 97.953 30.691L103.474 26.7466C104.088 26.3087 104.581 25.7266 104.933 25.0601Z" fill="url(#paint0_linear_sidebar)"/>
            <path d="M78.6348 86.1357C87.4125 86.1357 94.5281 93.2516 94.5283 102.029C94.5283 110.807 87.4127 117.924 78.6348 117.924C69.8569 117.924 62.7412 110.807 62.7412 102.029C62.7414 93.2516 69.8571 86.1358 78.6348 86.1357ZM122.343 86.1357C131.121 86.1357 138.237 93.2524 138.237 102.03C138.237 110.808 131.121 117.924 122.343 117.924C113.565 117.924 106.449 110.808 106.449 102.03C106.449 93.2524 113.565 86.1359 122.343 86.1357Z" fill="white"/>
            <defs>
              <linearGradient id="paint0_linear_sidebar" x1="189.565" y1="187.378" x2="-8.67286" y2="36.9268" gradientUnits="userSpaceOnUse">
                <stop/>
                <stop offset="1" stopColor="#642714"/>
              </linearGradient>
            </defs>
          </svg>

          {/* Wordmark — hidden when collapsed */}
          {!collapsed && (
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: t.textPrimary,
                fontFamily: t.font,
              }}>
                toffee
              </span>
              <span style={{
                fontSize: 12,
                fontWeight: 400,
                letterSpacing: '0.04em',
                color: t.textMuted,
                marginTop: 3,
                fontFamily: t.font,
              }}>
                studio
              </span>
            </div>
          )}
        </a>

        {/* Collapse / expand toggle — desktop only */}
        {!isMobile && (
          <button
            onClick={onToggle}
            aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            title={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: t.textMuted,
              borderRadius: 6,
              transition: 'color 200ms ease, background 200ms ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = t.textPrimary
              e.currentTarget.style.background = 'rgba(0,0,0,0.04)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = t.textMuted
              e.currentTarget.style.background = 'none'
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                transform: isOpen ? 'rotate(0deg)' : 'rotate(180deg)',
                transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <line x1="9" y1="3" x2="9" y2="21" />
              <polyline points="14 8 11 12 14 16" />
            </svg>
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1 }}>
        {navItems.map((item) =>
          item.children ? (
            <ExpandableSection
              key={item.label}
              item={item}
              isOpen={!!expanded[item.label]}
              onToggle={() => toggle(item.label)}
              collapsed={collapsed}
            />
          ) : (
            <a
              key={item.label}
              href={item.href}
              title={collapsed ? item.label : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: collapsed ? 0 : 10,
                padding: collapsed ? '10px 0' : '10px 20px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                color: t.navText,
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 400,
                transition: 'color 200ms ease, padding 300ms cubic-bezier(0.4,0,0.2,1)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = t.navTextHover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = t.navText
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>{item.icon}</span>
              {!collapsed && item.label}
            </a>
          ),
        )}
      </nav>

      {/* Footer */}
      <div
        style={{
          padding: collapsed ? '16px 8px' : '16px 20px',
          borderTop: `1px solid ${t.border}`,
          fontSize: 12,
          color: t.textMuted,
          textAlign: collapsed ? 'center' : 'left',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          transition: 'padding 300ms cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        {collapsed ? 'v0.1' : 'v0.1.0 · MIT License'}
      </div>
    </aside>
  )
}
