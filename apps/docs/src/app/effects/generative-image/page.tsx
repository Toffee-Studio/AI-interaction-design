'use client'

import React, { useState } from 'react'
import { GenerativeImage } from '@toffee.studio/ai-interaction-design/client'
import { t } from '@/theme'
import { DemoBox } from '@/components/DemoBox'
import { CodeBlock } from '@/components/CodeBlock'
import { PropsTable } from '@/components/PropsTable'

const SAMPLE_IMAGE = 'https://images.unsplash.com/photo-1676299081847-824916de030a?w=512&h=512&fit=crop'
const SAMPLE_IMAGE_2 = 'https://images.unsplash.com/photo-1686191128892-3b37add4c844?w=512&h=512&fit=crop'
const SAMPLE_IMAGE_3 = 'https://images.unsplash.com/photo-1684487747720-1ba29cda82c8?w=400&h=400&fit=crop'

function ReloadableImage({
  src, alt, tone, speed, variant, width, height, label,
}: {
  src: string; alt: string; tone: 'neutral' | 'brand' | 'muted'; speed: 'slow' | 'normal' | 'fast'
  variant?: 'default' | 'soft' | 'strong'; width: number; height: number; label: string
}) {
  const [key, setKey] = useState(0)
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <span style={{ fontSize: 11, color: t.textMuted }}>{label}</span>
        <button
          onClick={() => setKey((k) => k + 1)}
          style={{
            padding: '2px 8px', borderRadius: 4, border: `1px solid ${t.border}`,
            background: 'none', color: t.textMuted, fontSize: 10, fontFamily: t.font, cursor: 'pointer',
          }}
        >
          ↻ reload
        </button>
      </div>
      <GenerativeImage key={key} src={`${src}&v=${key}`} alt={alt} width={width} height={height} tone={tone} speed={speed} variant={variant} />
    </div>
  )
}

export default function GenerativeImagePage() {
  return (
    <div>
      <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', color: t.textPrimary, margin: '0 0 8px' }}>
        GenerativeImage
      </h1>
      <p style={{ fontSize: 15, lineHeight: 1.7, color: t.textSecondary, margin: '0 0 40px' }}>
        Blur-to-sharp image reveal with scan-line loading — mimics AI image generators like Midjourney or DALL-E.
      </p>

      <h2 style={{ fontSize: 16, fontWeight: 600, color: t.textPrimary, margin: '0 0 8px' }}>Basic Usage</h2>
      <DemoBox label="Preview">
        <ReloadableImage src={SAMPLE_IMAGE} alt="AI generated landscape" tone="brand" speed="slow" width={400} height={300} label="brand · slow" />
      </DemoBox>
      <CodeBlock code={`import { GenerativeImage } from '@toffee.studio/ai-interaction-design/client'\n\n<GenerativeImage\n  src="/ai-output.jpg"\n  alt="AI generated landscape"\n  width={400}\n  height={300}\n  tone="brand"\n  speed="slow"\n/>`} />

      <h2 style={{ fontSize: 16, fontWeight: 600, color: t.textPrimary, margin: '32px 0 8px' }}>Tones</h2>
      <DemoBox label="neutral / brand / muted">
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {(['neutral', 'brand', 'muted'] as const).map((tone) => (
            <ReloadableImage key={tone} src={SAMPLE_IMAGE_3} alt={`${tone} tone`} tone={tone} speed="normal" width={200} height={200} label={tone} />
          ))}
        </div>
      </DemoBox>

      <h2 style={{ fontSize: 16, fontWeight: 600, color: t.textPrimary, margin: '32px 0 8px' }}>Variants</h2>
      <DemoBox label="default / soft / strong">
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {([['default', '8px radius'], ['soft', '12px radius'], ['strong', '4px radius']] as const).map(([v, desc]) => (
            <ReloadableImage key={v} src={SAMPLE_IMAGE_2} alt={`${v} variant`} tone="brand" speed="normal" variant={v} width={200} height={200} label={`${v} (${desc})`} />
          ))}
        </div>
      </DemoBox>

      <h2 style={{ fontSize: 16, fontWeight: 600, color: t.textPrimary, margin: '32px 0 8px' }}>With Overlay Slot</h2>
      <DemoBox label="overlay badge">
        <ReloadableImage src={SAMPLE_IMAGE} alt="AI generated with badge" tone="brand" speed="slow" width={400} height={300} label="with overlay" />
        <p style={{ fontSize: 12, color: t.textMuted, marginTop: 12 }}>
          Use the overlay slot to add badges, progress indicators, or any custom UI over the image.
        </p>
      </DemoBox>
      <CodeBlock code={`<GenerativeImage\n  src="/ai-output.jpg"\n  alt="AI generated landscape"\n  width={512}\n  height={512}\n  tone="brand"\n  speed="slow"\n  slots={{\n    overlay: ({ loaded }) =>\n      loaded ? (\n        <div style={{\n          position: 'absolute',\n          bottom: 12,\n          right: 12,\n          background: 'rgba(0,0,0,0.6)',\n          color: '#fff',\n          padding: '4px 10px',\n          borderRadius: 6,\n          fontSize: 11,\n        }}>\n          ✦ Generated\n        </div>\n      ) : null,\n  }}\n/>`} />

      <h2 style={{ fontSize: 16, fontWeight: 600, color: t.textPrimary, margin: '32px 0 8px' }}>Props</h2>
      <PropsTable
        rows={[
          { name: 'src', type: 'string', defaultVal: '—', description: 'Image URL (required)' },
          { name: 'alt', type: 'string', defaultVal: '—', description: 'Accessibility label (required)' },
          { name: 'width', type: 'number | string', defaultVal: '—', description: 'Frame width (required)' },
          { name: 'height', type: 'number | string', defaultVal: '—', description: 'Frame height (required)' },
          { name: 'variant', type: "'default' | 'soft' | 'strong'", defaultVal: "'default'", description: 'Border radius style' },
          { name: 'speed', type: "'slow' | 'normal' | 'fast' | number", defaultVal: "'normal'", description: 'Reveal animation speed' },
          { name: 'tone', type: "'neutral' | 'brand' | 'muted'", defaultVal: "'neutral'", description: 'Placeholder color palette' },
          { name: 'reducedMotion', type: "boolean | 'auto'", defaultVal: "'auto'", description: 'Motion override' },
          { name: 'onLoad', type: '(e) => void', defaultVal: '—', description: 'Called when image loads' },
          { name: 'onError', type: '(e) => void', defaultVal: '—', description: 'Called on load error' },
          { name: 'slots.placeholder', type: 'ReactNode', defaultVal: 'built-in', description: 'Custom loading placeholder' },
          { name: 'slots.overlay', type: '({loaded, error, progress}) => ReactNode', defaultVal: '—', description: 'Overlay render prop' },
        ]}
      />
    </div>
  )
}
