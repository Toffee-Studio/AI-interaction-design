'use client'

import React, { useState } from 'react'
import { StreamingText, useStreamingText } from '@toffee.studio/ai-interaction-design/client'
import { t } from '@/theme'
import { DemoBox } from '@/components/DemoBox'
import { CodeBlock } from '@/components/CodeBlock'
import { PropsTable } from '@/components/PropsTable'

const sampleText =
  'Toffee Interactions provides AI-style interaction components for React and Next.js. Each component shares a unified API with design tokens for speed, tone, and motion preferences.'

function HeadlessDemo() {
  const { displayedText, done, progress, start, pause, reset } = useStreamingText({
    text: sampleText,
    tickMs: 25,
    autoStart: false,
  })

  const btnStyle: React.CSSProperties = {
    padding: '6px 14px',
    borderRadius: 6,
    border: `1px solid ${t.border}`,
    background: t.bgCard,
    color: t.textSecondary,
    fontSize: 12,
    fontFamily: t.font,
    cursor: 'pointer',
  }

  return (
    <div>
      <div style={{ fontSize: 14, lineHeight: 1.7, color: t.textSecondary, minHeight: 60 }}>
        {displayedText || <span style={{ color: t.textMuted }}>Press Start to begin streaming...</span>}
        {done && <span style={{ color: t.accent, marginLeft: 4 }}>✓</span>}
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 16, alignItems: 'center' }}>
        <button style={btnStyle} onClick={start}>{done ? 'Restart' : 'Start'}</button>
        <button style={btnStyle} onClick={pause}>Pause</button>
        <button style={btnStyle} onClick={reset}>Reset</button>
        <span style={{ fontSize: 11, color: t.textMuted, marginLeft: 8 }}>{Math.round(progress * 100)}%</span>
      </div>
    </div>
  )
}

function RestartableStreamingText({
  text, tone, speed, variant, label,
}: {
  text: string; tone: 'neutral' | 'brand' | 'muted'; speed: 'slow' | 'normal' | 'fast'
  variant?: 'default' | 'soft' | 'strong'; label: string
}) {
  const [key, setKey] = useState(0)
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        <span style={{ fontSize: 11, color: t.textMuted }}>{label}</span>
        <button
          onClick={() => setKey((k) => k + 1)}
          style={{
            padding: '2px 8px', borderRadius: 4, border: `1px solid ${t.border}`,
            background: 'none', color: t.textMuted, fontSize: 10, fontFamily: t.font, cursor: 'pointer',
          }}
        >
          ↻ replay
        </button>
      </div>
      <StreamingText key={key} text={text} tone={tone} speed={speed} variant={variant} showCaret />
    </div>
  )
}

export default function StreamingTextPage() {
  return (
    <div>
      <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', color: t.textPrimary, margin: '0 0 8px' }}>
        StreamingText
      </h1>
      <p style={{ fontSize: 15, lineHeight: 1.7, color: t.textSecondary, margin: '0 0 40px' }}>
        Token-by-token text reveal — mimics ChatGPT / Claude streaming output with a blinking caret.
      </p>

      <h2 style={{ fontSize: 16, fontWeight: 600, color: t.textPrimary, margin: '0 0 8px' }}>Basic Usage</h2>
      <DemoBox label="Preview">
        <div style={{ fontSize: 15, lineHeight: 1.7 }}>
          <RestartableStreamingText text="The quick brown fox jumps over the lazy dog. This sentence demonstrates the streaming text effect." tone="brand" speed="fast" label="brand · fast" />
        </div>
      </DemoBox>
      <CodeBlock code={`import { StreamingText } from '@toffee.studio/ai-interaction-design/client'\n\n<StreamingText\n  text="The quick brown fox jumps over the lazy dog."\n  speed="fast"\n  tone="brand"\n  showCaret\n/>`} />

      <h2 style={{ fontSize: 16, fontWeight: 600, color: t.textPrimary, margin: '32px 0 8px' }}>Tones</h2>
      <DemoBox label="neutral / brand / muted">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontSize: 15, lineHeight: 1.7 }}>
          <RestartableStreamingText text="Neutral tone streams with a monochrome palette." tone="neutral" speed="fast" label="neutral" />
          <RestartableStreamingText text="Brand tone uses the primary yellow/orange hue." tone="brand" speed="fast" label="brand" />
          <RestartableStreamingText text="Muted tone provides a subtle, desaturated look." tone="muted" speed="fast" label="muted" />
        </div>
      </DemoBox>

      <h2 style={{ fontSize: 16, fontWeight: 600, color: t.textPrimary, margin: '32px 0 8px' }}>Speeds</h2>
      <DemoBox label="slow / normal / fast">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontSize: 15, lineHeight: 1.7 }}>
          <RestartableStreamingText text="This text streams slowly, one character at a time." tone="brand" speed="slow" label="slow" />
          <RestartableStreamingText text="This text streams at a normal pace." tone="brand" speed="normal" label="normal" />
          <RestartableStreamingText text="This text streams quickly, like a fast AI response." tone="brand" speed="fast" label="fast" />
        </div>
      </DemoBox>

      <h2 style={{ fontSize: 16, fontWeight: 600, color: t.textPrimary, margin: '32px 0 8px' }}>With Overlay Slot</h2>
      <DemoBox label="overlay render prop">
        <div style={{ fontSize: 15, lineHeight: 1.7 }}>
          <StreamingText
            text="Streaming with a progress overlay that shows completion status."
            speed="fast" tone="brand" showCaret
            slots={{
              overlay: ({ done, progress }) => (
                <span style={{ display: 'inline-block', marginLeft: 8, fontSize: 11, color: done ? '#22c55e' : t.textMuted, fontFamily: t.fontMono }}>
                  {done ? '✓ Complete' : `${Math.round(progress * 100)}%`}
                </span>
              ),
            }}
          />
        </div>
      </DemoBox>
      <CodeBlock code={`<StreamingText\n  text="Streaming with a progress overlay..."\n  speed="fast"\n  tone="brand"\n  showCaret\n  slots={{\n    overlay: ({ done, progress }) =>\n      done\n        ? <span>✓ Complete</span>\n        : <span>{Math.round(progress * 100)}%</span>,\n  }}\n/>`} />

      <h2 style={{ fontSize: 16, fontWeight: 600, color: t.textPrimary, margin: '32px 0 8px' }}>Headless: useStreamingText</h2>
      <p style={{ fontSize: 14, color: t.textSecondary, margin: '0 0 12px' }}>
        Full control over streaming with start, pause, and reset. Build your own UI.
      </p>
      <DemoBox label="Headless hook demo">
        <HeadlessDemo />
      </DemoBox>
      <CodeBlock code={`import { useStreamingText } from '@toffee.studio/ai-interaction-design/client'\n\nconst { displayedText, done, progress, start, pause, reset } =\n  useStreamingText({\n    text: 'Your full text here...',\n    tickMs: 25,\n    autoStart: false,\n  })`} />

      <h2 style={{ fontSize: 16, fontWeight: 600, color: t.textPrimary, margin: '32px 0 8px' }}>Props</h2>
      <PropsTable
        rows={[
          { name: 'text', type: 'string', defaultVal: '—', description: 'Full text to stream (required)' },
          { name: 'chunkSize', type: 'number', defaultVal: '1', description: 'Characters revealed per tick' },
          { name: 'tickMs', type: 'number', defaultVal: 'from speed', description: 'Milliseconds between ticks' },
          { name: 'showCaret', type: 'boolean', defaultVal: 'true', description: 'Show blinking cursor while streaming' },
          { name: 'autoStart', type: 'boolean', defaultVal: 'true', description: 'Begin streaming on mount' },
          { name: 'onComplete', type: '() => void', defaultVal: '—', description: 'Called when streaming finishes' },
          { name: 'variant', type: "'default' | 'soft' | 'strong'", defaultVal: "'default'", description: 'Visual intensity' },
          { name: 'speed', type: "'slow' | 'normal' | 'fast' | number", defaultVal: "'normal'", description: 'Animation speed' },
          { name: 'tone', type: "'neutral' | 'brand' | 'muted'", defaultVal: "'neutral'", description: 'Color palette' },
          { name: 'reducedMotion', type: "boolean | 'auto'", defaultVal: "'auto'", description: 'Motion override' },
          { name: 'slots.overlay', type: '({displayedText, progress, done}) => ReactNode', defaultVal: '—', description: 'Live state render prop' },
        ]}
      />
    </div>
  )
}
