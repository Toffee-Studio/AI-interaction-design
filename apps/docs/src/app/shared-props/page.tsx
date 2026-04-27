'use client'

import React from 'react'
import { t } from '@/theme'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'

export default function SharedPropsPage() {
  return (
    <div>
      <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', color: t.textPrimary, margin: '0 0 8px' }}>
        Shared Props
      </h1>
      <p style={{ fontSize: 15, lineHeight: 1.7, color: t.textSecondary, margin: '0 0 40px' }}>
        Every Toffee component extends <code style={{ color: t.accent, fontFamily: t.fontMono, fontSize: 13 }}>ToffeeBaseProps</code>,
        giving you a consistent API across all interactions.
      </p>

      <PropsTable
        rows={[
          { name: 'variant', type: "'default' | 'soft' | 'strong'", defaultVal: "'default'", description: 'Visual style. soft = reduced opacity, strong = high contrast.' },
          { name: 'speed', type: "'slow' | 'normal' | 'fast' | number", defaultVal: "'normal'", description: 'Animation duration. slow=2000ms, normal=1200ms, fast=600ms. Pass a number for exact ms.' },
          { name: 'tone', type: "'neutral' | 'brand' | 'muted'", defaultVal: "'neutral'", description: 'Color palette applied via CSS variables. Overridable through ToffeeProvider theme.' },
          { name: 'reducedMotion', type: "boolean | 'auto'", defaultVal: "'auto'", description: "'auto' respects the OS prefers-reduced-motion setting. true/false force the behavior." },
          { name: 'className', type: 'string', defaultVal: '—', description: 'Additional CSS class applied to the root element.' },
          { name: 'style', type: 'React.CSSProperties', defaultVal: '—', description: 'Inline styles applied to the root element.' },
          { name: 'as', type: 'React.ElementType', defaultVal: 'component-specific', description: 'Render the root as a different HTML element or React component.' },
        ]}
      />

      <h2 style={{ fontSize: 20, fontWeight: 600, color: t.textPrimary, margin: '48px 0 12px' }}>Render Slots</h2>
      <p style={{ fontSize: 14, lineHeight: 1.7, color: t.textSecondary, margin: '0 0 16px' }}>
        All components accept a <code style={{ color: t.accent, fontFamily: t.fontMono, fontSize: 13 }}>slots</code> prop with three standard slots:
      </p>
      <PropsTable
        rows={[
          { name: 'slots.before', type: 'ReactNode', defaultVal: '—', description: 'Rendered before the main content.' },
          { name: 'slots.after', type: 'ReactNode', defaultVal: '—', description: 'Rendered after the main content.' },
          { name: 'slots.overlay', type: '(state) => ReactNode', defaultVal: '—', description: 'Render prop that receives the component live state (progress, done, loaded, etc.).' },
        ]}
      />
      <CodeBlock code={`// Slots example\n<ShimmerText\n  tone="brand"\n  slots={{\n    before: <Icon name="sparkle" />,\n    after: <Badge>AI</Badge>,\n    overlay: ({ isAnimating }) =>\n      isAnimating ? <Spinner /> : null,\n  }}\n>\n  Generating...\n</ShimmerText>`} />

      <h2 style={{ fontSize: 20, fontWeight: 600, color: t.textPrimary, margin: '48px 0 12px' }}>Design Tokens</h2>
      <p style={{ fontSize: 14, lineHeight: 1.7, color: t.textSecondary, margin: '0 0 16px' }}>
        Tokens are exported from the server-safe entry point for use in custom components.
      </p>

      <h3 style={{ fontSize: 15, fontWeight: 600, color: t.textPrimary, margin: '24px 0 8px' }}>Speed</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 20 }}>
        {[{ name: 'slow', ms: '2000ms' }, { name: 'normal', ms: '1200ms' }, { name: 'fast', ms: '600ms' }].map((s) => (
          <div key={s.name} style={{ background: t.bgCard, border: `1px solid ${t.borderCard}`, borderRadius: 8, padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: t.accent }}>{s.name}</div>
            <div style={{ fontSize: 12, color: t.textMuted, marginTop: 4 }}>{s.ms}</div>
          </div>
        ))}
      </div>

      <h3 style={{ fontSize: 15, fontWeight: 600, color: t.textPrimary, margin: '24px 0 8px' }}>Easing</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
        {[
          { name: 'smooth', value: 'cubic-bezier(0.4, 0, 0.6, 1)' },
          { name: 'enter', value: 'cubic-bezier(0.0, 0.0, 0.2, 1)' },
          { name: 'exit', value: 'cubic-bezier(0.4, 0, 1, 1)' },
          { name: 'spring', value: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
          { name: 'linear', value: 'linear' },
        ].map((e) => (
          <div key={e.name} style={{ background: t.bgCard, border: `1px solid ${t.borderCard}`, borderRadius: 8, padding: '12px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: t.accent }}>{e.name}</div>
            <div style={{ fontSize: 11, color: t.textMuted, marginTop: 4, fontFamily: t.fontMono }}>{e.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
