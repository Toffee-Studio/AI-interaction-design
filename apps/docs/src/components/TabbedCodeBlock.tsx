'use client'

import React, { useState } from 'react'
import { t } from '@/theme'

type CodeTab = 'tsx' | 'jsx' | 'react'

interface TabbedCodeBlockProps {
  /** TSX code (default tab) */
  tsx: string
  /** JSX code — auto-generated from TSX if not provided */
  jsx?: string
  /** React.createElement style — auto-generated if not provided */
  react?: string
}

/** Strip TS type annotations for a rough TSX → JSX conversion */
function tsxToJsx(tsx: string): string {
  return tsx
    // Remove type assertions like `as const`, `as React.CSSProperties`
    .replace(/\s+as\s+[\w.<>\[\]|&'"]+/g, '')
    // Remove generic type params on components like <ShimmerText<Foo>>
    .replace(/<(\w+)<[^>]+>>/g, '<$1>')
    // Remove interface/type lines
    .replace(/^.*(?:interface|type)\s+\w+.*$/gm, '')
    // Remove `: TypeName` annotations on props
    .replace(/:\s*(?:React\.(?:CSSProperties|ReactNode|ElementType)|string|number|boolean|'[^']*'(?:\s*\|\s*'[^']*')*)\b/g, '')
    // Clean up empty lines left behind
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

/** Convert TSX/JSX to React.createElement style */
function toCreateElement(tsx: string): string {
  return `// React.createElement equivalent
// For complex JSX, use the TSX or JSX tab instead.
// This is a simplified representation.

import { createElement } from 'react'
import { ShimmerText } from '@toffee.studio/ai-interaction-design/client'

${tsx
  .replace(/import\s+.*\n?/g, '')
  .replace(/<ShimmerText/g, 'createElement(ShimmerText,')
  .replace(/>\n?\s*([\w\s.{}]+)\n?\s*<\/ShimmerText>/g, ', "$1")')
  .replace(/\n{3,}/g, '\n\n')
  .trim()}`
}

export function TabbedCodeBlock({ tsx, jsx, react }: TabbedCodeBlockProps) {
  const [activeTab, setActiveTab] = useState<CodeTab>('tsx')
  const [copied, setCopied] = useState(false)

  const resolvedJsx = jsx ?? tsxToJsx(tsx)
  const resolvedReact = react ?? toCreateElement(tsx)

  const codeMap: Record<CodeTab, string> = {
    tsx: tsx,
    jsx: resolvedJsx,
    react: resolvedReact,
  }

  const code = codeMap[activeTab]

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const tabs: { key: CodeTab; label: string }[] = [
    { key: 'tsx', label: 'TSX' },
    { key: 'jsx', label: 'JSX' },
    { key: 'react', label: 'React' },
  ]

  return (
    <div
      style={{
        background: '#FAF8F6',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: t.radius,
        borderBottomRightRadius: t.radius,
        overflow: 'hidden',
        flex: 1,
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column' as const,
      }}
    >
      {/* Header with tabs + copy */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 12px',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
          background: '#F3F0ED',
          height: 36,
        }}
      >
        <div style={{ display: 'flex', gap: 0 }}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: activeTab === tab.key ? `2px solid ${t.textPrimary}` : '2px solid transparent',
                color: activeTab === tab.key ? t.textPrimary : 'rgba(0,0,0,0.35)',
                fontSize: 11,
                fontWeight: activeTab === tab.key ? 600 : 400,
                fontFamily: t.fontMono,
                padding: '8px 12px',
                cursor: 'pointer',
                transition: 'color 150ms ease, border-color 150ms ease',
                marginBottom: -1,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button
          onClick={handleCopy}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            background: 'none',
            border: '1px solid rgba(0,0,0,0.1)',
            borderRadius: 6,
            color: copied ? '#ED6325' : 'rgba(0,0,0,0.4)',
            fontSize: 11,
            fontFamily: 'inherit',
            padding: '3px 10px',
            cursor: 'pointer',
            transition: 'all 150ms ease',
          }}
        >
          {copied ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      {/* Code */}
      <pre
        style={{
          margin: 0,
          padding: '14px 16px',
          overflow: 'auto',
          fontSize: 12.5,
          lineHeight: 1.65,
          fontFamily: t.fontMono,
          color: '#1a1a1a',
          flex: 1,
          minHeight: 0,
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  )
}
