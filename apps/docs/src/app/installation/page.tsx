'use client'

import React from 'react'
import { t } from '@/theme'
import { CodeBlock } from '@/components/CodeBlock'

export default function InstallationPage() {
  const stepBadge: React.CSSProperties = {
    width: 24,
    height: 24,
    borderRadius: '50%',
    background: t.accentBg,
    color: t.accent,
    fontSize: 12,
    fontWeight: 600,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  return (
    <div>
      <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', color: t.textPrimary, margin: '0 0 8px' }}>
        Installation
      </h1>
      <p style={{ fontSize: 15, lineHeight: 1.7, color: t.textSecondary, margin: '0 0 40px' }}>
        Get up and running with Toffee Interactions in your React or Next.js project.
      </p>

      {/* Step 1 */}
      <h2 style={{ fontSize: 18, fontWeight: 600, color: t.textPrimary, margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={stepBadge}>1</span>
        Install the package
      </h2>
      <p style={{ fontSize: 14, color: t.textSecondary, margin: '0 0 12px' }}>
        Toffee uses Emotion for CSS-in-JS. Install both:
      </p>
      <CodeBlock language="bash" code={`npm install @toffee.studio/ai-interaction-design @emotion/react`} />

      {/* Step 2 */}
      <h2 style={{ fontSize: 18, fontWeight: 600, color: t.textPrimary, margin: '32px 0 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={stepBadge}>2</span>
        Add the Provider (Next.js App Router)
      </h2>
      <p style={{ fontSize: 14, color: t.textSecondary, margin: '0 0 12px' }}>
        Wrap your root layout with <code style={{ color: t.accent, fontFamily: t.fontMono, fontSize: 13 }}>ToffeeProvider</code>.
        This handles Emotion SSR style injection so there is no flash of unstyled content.
      </p>
      <CodeBlock
        code={`// app/layout.tsx
'use client'

import { useServerInsertedHTML } from 'next/navigation'
import { ToffeeProvider } from '@toffee.studio/ai-interaction-design'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ToffeeProvider
          useServerInsertedHTML={useServerInsertedHTML}
        >
          {children}
        </ToffeeProvider>
      </body>
    </html>
  )
}`}
      />

      {/* Step 3 */}
      <h2 style={{ fontSize: 18, fontWeight: 600, color: t.textPrimary, margin: '32px 0 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={stepBadge}>3</span>
        Use a component
      </h2>
      <p style={{ fontSize: 14, color: t.textSecondary, margin: '0 0 12px' }}>
        All animated components are client-only. Import from{' '}
        <code style={{ color: t.accent, fontFamily: t.fontMono, fontSize: 13 }}>@toffee.studio/ai-interaction-design/client</code>.
      </p>
      <CodeBlock
        code={`'use client'

import { ShimmerText } from '@toffee.studio/ai-interaction-design/client'

export function LoadingLabel() {
  return (
    <ShimmerText tone="brand" speed="slow">
      Generating response...
    </ShimmerText>
  )
}`}
      />

      {/* Vite / CRA */}
      <h2 style={{ fontSize: 18, fontWeight: 600, color: t.textPrimary, margin: '32px 0 12px' }}>
        Vite / Create React App
      </h2>
      <p style={{ fontSize: 14, color: t.textSecondary, margin: '0 0 12px' }}>
        For non-Next.js setups, use <code style={{ color: t.accent, fontFamily: t.fontMono, fontSize: 13 }}>ToffeeProvider</code> without
        the <code style={{ color: t.accent, fontFamily: t.fontMono, fontSize: 13 }}>useServerInsertedHTML</code> prop — it works as a plain Emotion provider.
      </p>
      <CodeBlock
        code={`import { ToffeeProvider } from '@toffee.studio/ai-interaction-design'

function App() {
  return (
    <ToffeeProvider>
      <YourApp />
    </ToffeeProvider>
  )
}`}
      />

      {/* Exports note */}
      <div
        style={{
          background: t.accentBg,
          border: `1px solid ${t.accentBorder}`,
          borderRadius: t.radius,
          padding: '16px 20px',
          marginTop: 32,
          fontSize: 13,
          lineHeight: 1.7,
          color: t.textSecondary,
        }}
      >
        <strong style={{ color: t.accent }}>Two entry points:</strong>
        <br />
        <code style={{ fontFamily: t.fontMono, fontSize: 12, color: t.textPrimary }}>@toffee.studio/ai-interaction-design</code>{' '}
        — server-safe exports (ToffeeProvider, types, tokens)
        <br />
        <code style={{ fontFamily: t.fontMono, fontSize: 12, color: t.textPrimary }}>@toffee.studio/ai-interaction-design/client</code>{' '}
        — client-only components and hooks
      </div>
    </div>
  )
}
