'use client'

import React from 'react'
import { t } from '@/theme'
import { CodeBlock } from '@/components/CodeBlock'

export default function ThemingPage() {
  const thStyle: React.CSSProperties = {
    padding: '10px 16px',
    borderBottom: `1px solid ${t.borderCard}`,
    textAlign: 'left',
    fontWeight: 600,
    color: t.textSecondary,
    fontSize: 13,
  }
  const tdStyle: React.CSSProperties = {
    padding: '10px 16px',
    borderBottom: `1px solid ${t.borderCard}`,
    fontSize: 13,
  }

  return (
    <div>
      <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', color: t.textPrimary, margin: '0 0 8px' }}>
        Theming
      </h1>
      <p style={{ fontSize: 15, lineHeight: 1.7, color: t.textSecondary, margin: '0 0 40px' }}>
        Customize colors globally through ToffeeProvider or per-component via CSS variables.
      </p>

      <h2 style={{ fontSize: 18, fontWeight: 600, color: t.textPrimary, margin: '0 0 12px' }}>How it works</h2>
      <p style={{ fontSize: 14, lineHeight: 1.7, color: t.textSecondary, margin: '0 0 20px' }}>
        Each tone (neutral, brand, muted) maps to a set of CSS custom properties. Components read
        these variables from their root element. You can override any variable globally via
        ToffeeProvider or locally via inline styles.
      </p>

      <h2 style={{ fontSize: 18, fontWeight: 600, color: t.textPrimary, margin: '32px 0 12px' }}>CSS Variables</h2>
      <div style={{ background: t.bgCard, border: `1px solid ${t.borderCard}`, borderRadius: t.radius, overflow: 'hidden', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: 'rgba(0,0,0,0.02)' }}>
              <th style={thStyle}>Variable</th>
              <th style={thStyle}>Used by</th>
            </tr>
          </thead>
          <tbody>
            {[
              { var: '--toffee-shimmer-from', used: 'ShimmerText gradient start' },
              { var: '--toffee-shimmer-mid', used: 'ShimmerText gradient midpoint' },
              { var: '--toffee-shimmer-to', used: 'ShimmerText gradient end' },
              { var: '--toffee-pulse-bg', used: 'GenerativeImage placeholder background' },
              { var: '--toffee-pulse-highlight', used: 'GenerativeImage scan-line highlight' },
              { var: '--toffee-text-color', used: 'StreamingText, ShimmerText text color' },
              { var: '--toffee-orb-color', used: 'ThinkingOrb (Phase 2)' },
            ].map((row) => (
              <tr key={row.var}>
                <td style={{ ...tdStyle, color: t.accent, fontFamily: t.fontMono, fontSize: 12 }}>{row.var}</td>
                <td style={{ ...tdStyle, color: t.textSecondary }}>{row.used}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ fontSize: 18, fontWeight: 600, color: t.textPrimary, margin: '32px 0 12px' }}>Global Override via ToffeeProvider</h2>
      <p style={{ fontSize: 14, lineHeight: 1.7, color: t.textSecondary, margin: '0 0 12px' }}>
        Pass a <code style={{ color: t.accent, fontFamily: t.fontMono, fontSize: 13 }}>theme</code> prop to override CSS variables for any tone:
      </p>
      <CodeBlock code={`<ToffeeProvider\n  theme={{\n    tones: {\n      brand: {\n        '--toffee-shimmer-mid': 'rgba(234, 179, 8, 0.7)',\n        '--toffee-text-color': 'rgba(234, 179, 8, 0.8)',\n        '--toffee-orb-color': 'rgba(234, 179, 8, 0.5)',\n      },\n    },\n  }}\n>\n  {children}\n</ToffeeProvider>`} />

      <h2 style={{ fontSize: 18, fontWeight: 600, color: t.textPrimary, margin: '32px 0 12px' }}>Per-Component Override</h2>
      <p style={{ fontSize: 14, lineHeight: 1.7, color: t.textSecondary, margin: '0 0 12px' }}>
        Override variables on a single component via the <code style={{ color: t.accent, fontFamily: t.fontMono, fontSize: 13 }}>style</code> prop:
      </p>
      <CodeBlock code={`<ShimmerText\n  tone="brand"\n  style={{\n    '--toffee-shimmer-mid': 'rgba(16, 185, 129, 0.7)',\n    '--toffee-text-color': 'rgba(16, 185, 129, 0.8)',\n  } as React.CSSProperties}\n>\n  Custom green shimmer\n</ShimmerText>`} />

      <h2 style={{ fontSize: 18, fontWeight: 600, color: t.textPrimary, margin: '32px 0 12px' }}>Default Tone Values</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
        {[
          { name: 'neutral', color: 'rgba(180, 180, 180, 0.6)', desc: 'Grey / monochrome' },
          { name: 'brand', color: 'rgba(237, 99, 37, 0.7)', desc: 'Yellow / orange' },
          { name: 'muted', color: 'rgba(200, 195, 210, 0.5)', desc: 'Desaturated tint' },
        ].map((tone) => (
          <div key={tone.name} style={{ background: t.bgCard, border: `1px solid ${t.borderCard}`, borderRadius: t.radius, padding: '20px', textAlign: 'center' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: tone.color, margin: '0 auto 12px' }} />
            <div style={{ fontSize: 14, fontWeight: 600, color: t.textPrimary }}>{tone.name}</div>
            <div style={{ fontSize: 12, color: t.textMuted, marginTop: 4 }}>{tone.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
