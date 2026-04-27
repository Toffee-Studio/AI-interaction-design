'use client'

import React, { useState } from 'react'
import { t } from '@/theme'

interface CodeBlockProps {
  code: string
  language?: string
}

export function CodeBlock({ code, language = 'tsx' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      style={{
        position: 'relative',
        background: '#F4F4F5',
        borderRadius: t.radius,
        overflow: 'hidden',
        marginTop: 12,
        marginBottom: 20,
      }}
    >
      {/* Header bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 16px',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          fontSize: 11,
          color: 'rgba(0,0,0,0.35)',
          fontFamily: t.fontMono,
          background: '#EBEBEC',
        }}
      >
        <span>{language}</span>
        <button
          onClick={handleCopy}
          style={{
            background: 'none',
            border: '1px solid rgba(0,0,0,0.12)',
            borderRadius: 6,
            color: copied ? '#ED6325' : 'rgba(0,0,0,0.4)',
            fontSize: 11,
            fontFamily: 'inherit',
            padding: '4px 10px',
            cursor: 'pointer',
            transition: 'all 150ms ease',
          }}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      {/* Code */}
      <pre
        style={{
          margin: 0,
          padding: '16px 20px',
          overflow: 'auto',
          fontSize: 13,
          lineHeight: 1.7,
          fontFamily: t.fontMono,
          color: '#1a1a1a',
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  )
}
