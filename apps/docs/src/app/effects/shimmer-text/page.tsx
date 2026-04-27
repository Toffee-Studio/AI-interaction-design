'use client'

import React, { useState, useEffect } from 'react'
import { ShimmerText } from '@toffee.studio/ai-interaction-design/client'
import { t } from '@/theme'
import { CodeBlock } from '@/components/CodeBlock'
import { PropsTable } from '@/components/PropsTable'
import { PropShowcase } from '@/components/PropShowcase'
import {
  PropsEditor,
  PROPS_EDITOR_WIDTH,
  defaultShimmerState,
  type ShimmerTextEditorState,
} from '@/components/PropsEditor'

// ─── Gradient preset styles ──────────────────────────────────────────────────

const geminiStyle: React.CSSProperties = {
  '--toffee-shimmer-from': 'rgba(136, 96, 255, 0)',
  '--toffee-shimmer-mid': 'rgba(168, 192, 255, 0.9)',
  '--toffee-shimmer-to': 'rgba(136, 96, 255, 0)',
  '--toffee-text-color': 'rgba(136, 96, 255, 0.9)',
} as React.CSSProperties

const emeraldStyle: React.CSSProperties = {
  '--toffee-shimmer-from': 'rgba(60, 135, 73, 0)',
  '--toffee-shimmer-mid': 'rgba(168, 208, 96, 0.9)',
  '--toffee-shimmer-to': 'rgba(60, 135, 73, 0)',
  '--toffee-text-color': 'rgba(60, 135, 73, 0.9)',
} as React.CSSProperties

export default function ShimmerTextPage() {
  const [editorOpen, setEditorOpen] = useState(false)
  const [editorState, setEditorState] = useState<ShimmerTextEditorState>(defaultShimmerState)
  const [editorKey, setEditorKey] = useState(0)

  // Push main content when editor opens
  useEffect(() => {
    const main = document.getElementById('main-content')
    if (main) {
      main.style.marginRight = editorOpen ? `${PROPS_EDITOR_WIDTH}px` : '0px'
    }
    return () => {
      if (main) main.style.marginRight = '0px'
    }
  }, [editorOpen])

  // Build style overrides for the live editor preview
  const editorStyleOverrides: React.CSSProperties = editorState.colorPreset !== 'Toffee'
    ? {
        '--toffee-shimmer-from': 'transparent',
        '--toffee-shimmer-mid': editorState.shimmerColor,
        '--toffee-shimmer-to': 'transparent',
        '--toffee-text-color': editorState.textColor,
      } as React.CSSProperties
    : {}

  return (
    <div>
      {/* ── Header with Run button ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', color: t.textPrimary, margin: 0 }}>
          ShimmerText
        </h1>
        <button
          onClick={() => { setEditorOpen(true); setEditorKey((k) => k + 1) }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 20px',
            background: 'linear-gradient(180deg, #2a2a2a 0%, #111111 100%)',
            color: '#ffffff',
            border: 'none',
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 600,
            fontFamily: t.font,
            cursor: 'pointer',
            transition: 'transform 150ms ease, box-shadow 150ms ease',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)'
            e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)'
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5,3 19,12 5,21" />
          </svg>
          Run
        </button>
      </div>
      <p style={{ fontSize: 15, lineHeight: 1.7, color: t.textSecondary, margin: '0 0 40px' }}>
        A moving gradient shimmer over text — ideal for &ldquo;AI thinking&rdquo; labels, loading placeholders,
        or generative content previews.
      </p>

      {/* ── Live Editor Preview ── */}
      {editorOpen && (
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: t.textPrimary, margin: '0 0 8px' }}>Live Editor</h2>
          <div
            style={{
              background: '#F4F4F5',
              borderRadius: 16,
              padding: '48px 40px',
              minHeight: 180,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                background: '#ffffff',
                borderRadius: 16,
                padding: '32px 40px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)',
                maxWidth: 520,
                width: '100%',
              }}
            >
              <div style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.3 }}>
                <ShimmerText
                  key={editorKey}
                  tone={editorState.colorPreset === 'Toffee' ? 'brand' : 'neutral'}
                  variant={editorState.variant}
                  speed={editorState.customSpeed}
                  direction={editorState.direction}
                  shimmerWidth={editorState.shimmerWidth}
                  repeat={editorState.repeat}
                  delay={editorState.delay}
                  style={editorStyleOverrides}
                  slots={editorState.showSlots ? {
                    before: <span style={{ marginRight: 8 }}>🤖</span>,
                    after: <span style={{ marginLeft: 8 }}>✦</span>,
                  } : undefined}
                >
                  {editorState.text}
                </ShimmerText>
              </div>
            </div>
          </div>
          <CodeBlock code={`<ShimmerText
  variant="${editorState.variant}"
  speed={${editorState.customSpeed}}
  direction="${editorState.direction}"
  shimmerWidth="${editorState.shimmerWidth}"
  repeat="${editorState.repeat}"${editorState.delay > 0 ? `\n  delay={${editorState.delay}}` : ''}${editorState.colorPreset !== 'Toffee' ? `\n  shimmerColor="${editorState.shimmerColor}"` : `\n  tone="brand"`}
>
  ${editorState.text}
</ShimmerText>`} />
        </div>
      )}

      {/* ── Basic Usage ── */}
      <PropShowcase
        title="Basic Usage"
        variants={[
          {
            label: 'brand',
            preview: (
              <div style={{ fontSize: 17, fontWeight: 600 }}>
                <ShimmerText tone="brand" speed="slow" variant="strong">
                  Generating response...
                </ShimmerText>
              </div>
            ),
            tsx: `import { ShimmerText } from '@toffee.studio/ai-interaction-design/client'

<ShimmerText tone="brand" speed="slow" variant="strong">
  Generating response...
</ShimmerText>`,
          },
          {
            label: 'neutral',
            preview: (
              <div style={{ fontSize: 17, fontWeight: 600 }}>
                <ShimmerText tone="neutral" speed="slow" variant="strong">
                  Generating response...
                </ShimmerText>
              </div>
            ),
            tsx: `import { ShimmerText } from '@toffee.studio/ai-interaction-design/client'

<ShimmerText tone="neutral" speed="slow" variant="strong">
  Generating response...
</ShimmerText>`,
          },
          {
            label: 'muted',
            preview: (
              <div style={{ fontSize: 17, fontWeight: 600 }}>
                <ShimmerText tone="muted" speed="slow" variant="strong">
                  Generating response...
                </ShimmerText>
              </div>
            ),
            tsx: `import { ShimmerText } from '@toffee.studio/ai-interaction-design/client'

<ShimmerText tone="muted" speed="slow" variant="strong">
  Generating response...
</ShimmerText>`,
          },
        ]}
      />

      {/* ── Gradient Presets ── */}
      <PropShowcase
        title="Gradient Presets"
        description={
          <>
            Three ready-to-use color palettes. Use{' '}
            <code style={{ fontFamily: t.fontMono, fontSize: 12, color: t.accent }}>shimmerColor</code>{' '}
            or CSS variable overrides to match your brand.
          </>
        }
        variants={[
          {
            label: 'Midnight',
            preview: (
              <div style={{ fontSize: 17, fontWeight: 600 }}>
                <ShimmerText tone="neutral" speed="slow" variant="strong" shimmerWidth="wide">
                  AI interaction design
                </ShimmerText>
              </div>
            ),
            tsx: `<ShimmerText
  tone="neutral"
  speed="slow"
  variant="strong"
  shimmerWidth="wide"
>
  AI interaction design
</ShimmerText>`,
          },
          {
            label: 'Gemini',
            preview: (
              <div style={{ fontSize: 17, fontWeight: 600 }}>
                <ShimmerText
                  tone="neutral"
                  speed="slow"
                  variant="strong"
                  shimmerWidth="wide"
                  style={geminiStyle}
                >
                  AI interaction design
                </ShimmerText>
              </div>
            ),
            tsx: `<ShimmerText
  speed="slow"
  variant="strong"
  shimmerWidth="wide"
  style={{
    '--toffee-shimmer-from': 'rgba(136, 96, 255, 0)',
    '--toffee-shimmer-mid': 'rgba(168, 192, 255, 0.9)',
    '--toffee-shimmer-to': 'rgba(136, 96, 255, 0)',
    '--toffee-text-color': 'rgba(136, 96, 255, 0.9)',
  }}
>
  AI interaction design
</ShimmerText>`,
          },
          {
            label: 'Emerald',
            preview: (
              <div style={{ fontSize: 17, fontWeight: 600 }}>
                <ShimmerText
                  tone="neutral"
                  speed="slow"
                  variant="strong"
                  shimmerWidth="wide"
                  style={emeraldStyle}
                >
                  AI interaction design
                </ShimmerText>
              </div>
            ),
            tsx: `<ShimmerText
  speed="slow"
  variant="strong"
  shimmerWidth="wide"
  style={{
    '--toffee-shimmer-from': 'rgba(60, 135, 73, 0)',
    '--toffee-shimmer-mid': 'rgba(168, 208, 96, 0.9)',
    '--toffee-shimmer-to': 'rgba(60, 135, 73, 0)',
    '--toffee-text-color': 'rgba(60, 135, 73, 0.9)',
  }}
>
  AI interaction design
</ShimmerText>`,
          },
        ]}
      />

      {/* ── Direction ── */}
      <PropShowcase
        title="Direction"
        variants={[
          {
            label: 'ltr',
            preview: (
              <div style={{ fontSize: 16, fontWeight: 600 }}>
                <ShimmerText tone="brand" speed="normal" variant="strong" direction="ltr">
                  Thinking deeply...
                </ShimmerText>
              </div>
            ),
            tsx: `<ShimmerText direction="ltr">
  Thinking deeply...
</ShimmerText>`,
          },
          {
            label: 'rtl',
            preview: (
              <div style={{ fontSize: 16, fontWeight: 600 }}>
                <ShimmerText tone="brand" speed="normal" variant="strong" direction="rtl">
                  Thinking deeply...
                </ShimmerText>
              </div>
            ),
            tsx: `<ShimmerText direction="rtl">
  Thinking deeply...
</ShimmerText>`,
          },
          {
            label: 'diagonal',
            preview: (
              <div style={{ fontSize: 16, fontWeight: 600 }}>
                <ShimmerText tone="brand" speed="normal" variant="strong" direction="diagonal">
                  Thinking deeply...
                </ShimmerText>
              </div>
            ),
            tsx: `<ShimmerText direction="diagonal">
  Thinking deeply...
</ShimmerText>`,
          },
        ]}
      />

      {/* ── Shimmer Width ── */}
      <PropShowcase
        title="Shimmer Width"
        variants={[
          {
            label: 'narrow',
            preview: (
              <div style={{ fontSize: 16, fontWeight: 600 }}>
                <ShimmerText tone="brand" speed="slow" variant="strong" shimmerWidth="narrow">
                  Analyzing your data
                </ShimmerText>
              </div>
            ),
            tsx: `<ShimmerText shimmerWidth="narrow">
  Analyzing your data
</ShimmerText>`,
          },
          {
            label: 'normal',
            preview: (
              <div style={{ fontSize: 16, fontWeight: 600 }}>
                <ShimmerText tone="brand" speed="slow" variant="strong" shimmerWidth="normal">
                  Analyzing your data
                </ShimmerText>
              </div>
            ),
            tsx: `<ShimmerText shimmerWidth="normal">
  Analyzing your data
</ShimmerText>`,
          },
          {
            label: 'wide',
            preview: (
              <div style={{ fontSize: 16, fontWeight: 600 }}>
                <ShimmerText tone="brand" speed="slow" variant="strong" shimmerWidth="wide">
                  Analyzing your data
                </ShimmerText>
              </div>
            ),
            tsx: `<ShimmerText shimmerWidth="wide">
  Analyzing your data
</ShimmerText>`,
          },
        ]}
      />

      {/* ── Repeat ── */}
      <PropShowcase
        title="Repeat"
        description={
          <>
            Control when the shimmer plays. Reload the page to see{' '}
            <code style={{ fontFamily: t.fontMono, fontSize: 12, color: t.accent }}>once</code> again.
          </>
        }
        variants={[
          {
            label: 'loop',
            preview: (
              <div style={{ fontSize: 16, fontWeight: 600 }}>
                <ShimmerText tone="brand" speed="normal" variant="strong" repeat="loop">
                  Always shimmering
                </ShimmerText>
              </div>
            ),
            tsx: `<ShimmerText repeat="loop">
  Always shimmering
</ShimmerText>`,
          },
          {
            label: 'once',
            preview: (
              <div style={{ fontSize: 16, fontWeight: 600 }}>
                <ShimmerText tone="brand" speed="slow" variant="strong" repeat="once">
                  Revealed on load
                </ShimmerText>
              </div>
            ),
            tsx: `<ShimmerText repeat="once">
  Revealed on load
</ShimmerText>`,
          },
          {
            label: 'hover',
            preview: (
              <div style={{ fontSize: 16, fontWeight: 600 }}>
                <ShimmerText tone="brand" speed="fast" variant="strong" repeat="hover">
                  Hover over me
                </ShimmerText>
              </div>
            ),
            tsx: `<ShimmerText repeat="hover">
  Hover over me
</ShimmerText>`,
          },
        ]}
      />

      {/* ── Delay & Stagger ── */}
      <PropShowcase
        title="Delay & Stagger"
        description={
          <>
            Use <code style={{ fontFamily: t.fontMono, fontSize: 12, color: t.accent }}>delay</code> to
            cascade multiple elements for a polished entrance.
          </>
        }
        variants={[
          {
            label: 'staggered',
            preview: (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['Generating', 'your', 'response...'].map((word, i) => (
                  <div key={word} style={{ fontSize: 18, fontWeight: 700 }}>
                    <ShimmerText
                      tone="brand"
                      speed="slow"
                      variant="strong"
                      shimmerWidth="wide"
                      direction="diagonal"
                      delay={i * 200}
                    >
                      {word}
                    </ShimmerText>
                  </div>
                ))}
              </div>
            ),
            tsx: `{['Generating', 'your', 'response...'].map((word, i) => (
  <ShimmerText
    key={word}
    tone="brand"
    speed="slow"
    variant="strong"
    shimmerWidth="wide"
    direction="diagonal"
    delay={i * 200}
  >
    {word}
  </ShimmerText>
))}`,
          },
          {
            label: '0ms',
            preview: (
              <div style={{ fontSize: 16, fontWeight: 600 }}>
                <ShimmerText tone="brand" speed="slow" variant="strong" delay={0}>
                  No delay
                </ShimmerText>
              </div>
            ),
            tsx: `<ShimmerText delay={0}>
  No delay
</ShimmerText>`,
          },
          {
            label: '500ms',
            preview: (
              <div style={{ fontSize: 16, fontWeight: 600 }}>
                <ShimmerText tone="brand" speed="slow" variant="strong" delay={500}>
                  Half-second delay
                </ShimmerText>
              </div>
            ),
            tsx: `<ShimmerText delay={500}>
  Half-second delay
</ShimmerText>`,
          },
        ]}
      />

      {/* ── Variants ── */}
      <PropShowcase
        title="Variants"
        description="Visual intensity — soft reduces opacity, strong boosts contrast."
        variants={[
          {
            label: 'default',
            preview: (
              <div style={{ fontSize: 16, fontWeight: 600 }}>
                <ShimmerText tone="brand" speed="normal" variant="default">
                  Analyzing your request
                </ShimmerText>
              </div>
            ),
            tsx: `<ShimmerText variant="default">
  Analyzing your request
</ShimmerText>`,
          },
          {
            label: 'soft',
            preview: (
              <div style={{ fontSize: 16, fontWeight: 600 }}>
                <ShimmerText tone="brand" speed="normal" variant="soft">
                  Analyzing your request
                </ShimmerText>
              </div>
            ),
            tsx: `<ShimmerText variant="soft">
  Analyzing your request
</ShimmerText>`,
          },
          {
            label: 'strong',
            preview: (
              <div style={{ fontSize: 16, fontWeight: 600 }}>
                <ShimmerText tone="brand" speed="normal" variant="strong">
                  Analyzing your request
                </ShimmerText>
              </div>
            ),
            tsx: `<ShimmerText variant="strong">
  Analyzing your request
</ShimmerText>`,
          },
        ]}
      />

      {/* ── Tones ── */}
      <PropShowcase
        title="Tones"
        description="Color palette via CSS variables. Each tone maps to a set of shimmer colors."
        variants={[
          {
            label: 'neutral',
            preview: (
              <div style={{ fontSize: 16, fontWeight: 600 }}>
                <ShimmerText tone="neutral" speed="normal">
                  Processing data...
                </ShimmerText>
              </div>
            ),
            tsx: `<ShimmerText tone="neutral">
  Processing data...
</ShimmerText>`,
          },
          {
            label: 'brand',
            preview: (
              <div style={{ fontSize: 16, fontWeight: 600 }}>
                <ShimmerText tone="brand" speed="normal">
                  Processing data...
                </ShimmerText>
              </div>
            ),
            tsx: `<ShimmerText tone="brand">
  Processing data...
</ShimmerText>`,
          },
          {
            label: 'muted',
            preview: (
              <div style={{ fontSize: 16, fontWeight: 600 }}>
                <ShimmerText tone="muted" speed="normal">
                  Processing data...
                </ShimmerText>
              </div>
            ),
            tsx: `<ShimmerText tone="muted">
  Processing data...
</ShimmerText>`,
          },
        ]}
      />

      {/* ── Speeds ── */}
      <PropShowcase
        title="Speeds"
        description="Control animation duration. Pass a preset name or a number in milliseconds."
        variants={[
          {
            label: 'slow',
            preview: (
              <div style={{ fontSize: 16, fontWeight: 600 }}>
                <ShimmerText tone="brand" speed="slow">
                  Thinking deeply...
                </ShimmerText>
              </div>
            ),
            tsx: `<ShimmerText speed="slow">
  Thinking deeply...
</ShimmerText>`,
          },
          {
            label: 'normal',
            preview: (
              <div style={{ fontSize: 16, fontWeight: 600 }}>
                <ShimmerText tone="brand" speed="normal">
                  Thinking deeply...
                </ShimmerText>
              </div>
            ),
            tsx: `<ShimmerText speed="normal">
  Thinking deeply...
</ShimmerText>`,
          },
          {
            label: 'fast',
            preview: (
              <div style={{ fontSize: 16, fontWeight: 600 }}>
                <ShimmerText tone="brand" speed="fast">
                  Thinking deeply...
                </ShimmerText>
              </div>
            ),
            tsx: `<ShimmerText speed="fast">
  Thinking deeply...
</ShimmerText>`,
          },
        ]}
      />

      {/* ── Props Table ── */}
      <h2 style={{ fontSize: 16, fontWeight: 600, color: t.textPrimary, margin: '40px 0 8px' }}>Props</h2>
      <PropsTable
        rows={[
          { name: 'children', type: 'ReactNode', defaultVal: '—', description: 'Text content to display with shimmer' },
          { name: 'variant', type: "'default' | 'soft' | 'strong'", defaultVal: "'default'", description: 'Visual intensity — soft reduces opacity, strong boosts contrast' },
          { name: 'speed', type: "'slow' | 'normal' | 'fast' | number", defaultVal: "'normal'", description: 'Animation speed (ms if number)' },
          { name: 'tone', type: "'neutral' | 'brand' | 'muted'", defaultVal: "'brand'", description: 'Color palette via CSS variables' },
          { name: 'direction', type: "'ltr' | 'rtl' | 'diagonal'", defaultVal: "'ltr'", description: 'Shimmer sweep direction' },
          { name: 'shimmerWidth', type: "'narrow' | 'normal' | 'wide'", defaultVal: "'normal'", description: 'Width of the light band — narrow is sharp, wide is a soft glow' },
          { name: 'repeat', type: "'loop' | 'once' | 'hover'", defaultVal: "'loop'", description: 'When the shimmer plays — loop forever, once on mount, or on hover' },
          { name: 'delay', type: 'number', defaultVal: '0', description: 'Delay in ms before animation starts — use for stagger effects' },
          { name: 'shimmerColor', type: 'string', defaultVal: '—', description: 'Custom CSS color for the shimmer highlight — overrides tone variables' },
          { name: 'reducedMotion', type: "boolean | 'auto'", defaultVal: "'auto'", description: "Motion override. 'auto' reads OS preference" },
          { name: 'className', type: 'string', defaultVal: '—', description: 'Extra CSS class on root' },
          { name: 'as', type: 'React.ElementType', defaultVal: "'span'", description: 'Polymorphic root element' },
          { name: 'slots.before', type: 'ReactNode', defaultVal: '—', description: 'Content before shimmer' },
          { name: 'slots.after', type: 'ReactNode', defaultVal: '—', description: 'Content after shimmer' },
          { name: 'slots.overlay', type: '(state) => ReactNode', defaultVal: '—', description: 'Render prop — receives { isAnimating }' },
        ]}
      />

      {/* ── Props Editor Panel ── */}
      <PropsEditor
        isOpen={editorOpen}
        onClose={() => setEditorOpen(false)}
        state={editorState}
        onChange={(s) => { setEditorState(s); setEditorKey((k) => k + 1) }}
      />
    </div>
  )
}
