'use client'

import React, { useState, useRef, useEffect } from 'react'
import {
  GenerativeImage,
  createPixelEffect,
  type PixelEffectInstance,
} from '@toffee.studio/ai-interaction-design/client'
import { t } from '@/theme'
import { PropsTable } from '@/components/PropsTable'
import { PropShowcase } from '@/components/PropShowcase'

const IMG = '/AI generation effect .jpg'

// ─── React Preview wrappers ───────────────────────────────────────────────────

function PixelPreview({
  gap = 4, particleSize = 4,
  loadingDuration = 1500, assemblyDuration = 2000,
  easeSpeed = 0.06, glow = false, glowRadius = 6,
}: {
  gap?: number; particleSize?: number
  loadingDuration?: number; assemblyDuration?: number
  easeSpeed?: number; glow?: boolean; glowRadius?: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const instanceRef = useRef<PixelEffectInstance | null>(null)
  const [key, setKey] = useState(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    instanceRef.current?.destroy()
    instanceRef.current = null
    let cancelled = false

    createPixelEffect({
      container: el, image: IMG,
      gap, particleSize, loadingDuration, assemblyDuration, easeSpeed, glow, glowRadius,
    }).then((inst) => {
      if (cancelled) { inst.destroy(); return }
      instanceRef.current = inst
      inst.start()
    }).catch(() => {})

    return () => { cancelled = true; instanceRef.current?.destroy(); instanceRef.current = null }
  }, [gap, particleSize, loadingDuration, assemblyDuration, easeSpeed, glow, glowRadius, key])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, width: '100%' }}>
      <div ref={containerRef} style={{ width: 200, height: 251, borderRadius: 8, overflow: 'hidden', background: '#E8E8E8', position: 'relative' }} />
      <button
        onClick={() => instanceRef.current ? instanceRef.current.replay() : setKey((k) => k + 1)}
        style={{ padding: '5px 14px', borderRadius: 6, border: `1px solid ${t.borderCard}`, background: '#F4F4F5', color: t.textSecondary, fontSize: 11, fontFamily: t.font, cursor: 'pointer' }}
        onMouseEnter={(e) => { e.currentTarget.style.background = '#EBEBEC' }}
        onMouseLeave={(e) => { e.currentTarget.style.background = '#F4F4F5' }}
      >
        ↻ Replay
      </button>
    </div>
  )
}

function BlurPreview({ speed, tone }: { speed?: 'slow' | 'normal' | 'fast'; tone?: 'neutral' | 'brand' | 'muted' }) {
  const [key, setKey] = useState(0)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, width: '100%' }}>
      <GenerativeImage key={key} src={`${IMG}?v=${key}`} alt="AI generated" width={200} height={251} speed={speed ?? 'slow'} tone={tone ?? 'neutral'} />
      <button onClick={() => setKey((k) => k + 1)} style={{ padding: '5px 14px', borderRadius: 6, border: `1px solid ${t.borderCard}`, background: '#F4F4F5', color: t.textSecondary, fontSize: 11, fontFamily: t.font, cursor: 'pointer' }}
        onMouseEnter={(e) => { e.currentTarget.style.background = '#EBEBEC' }}
        onMouseLeave={(e) => { e.currentTarget.style.background = '#F4F4F5' }}
      >↻ Replay</button>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GenerativeImagePage() {
  return (
    <div>
      <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', color: t.textPrimary, margin: '0 0 8px' }}>
        GenerativeImage
      </h1>
      <p style={{ fontSize: 15, lineHeight: 1.7, color: t.textSecondary, margin: '0 0 40px' }}>
        Image reveal effects that mimic AI generation — particles drift freely then assemble into the image from top to bottom, resolving into the original.
      </p>

      {/* ── Effects ── */}
      <PropShowcase chatUI={false} height={380} title="Effects"
        description="Blur uses CSS animations. Pixel uses a Canvas 2D particle engine with a loading → assembly → reveal flow."
        variants={[
          { label: 'blur', preview: <BlurPreview />, tsx: `<GenerativeImage\n  src="/ai-output.jpg"\n  alt="AI generated"\n  width={400}\n  height={300}\n  effect="blur"\n  speed="slow"\n/>` },
          { label: 'pixel', preview: <PixelPreview />, tsx: `import { createPixelEffect } from '@toffee.studio/ai-interaction-design/client'\n\nconst effect = await createPixelEffect({\n  container: el,\n  image: '/ai-output.jpg',\n  gap: 4,\n  particleSize: 4,\n  loadingDuration: 1500,\n  assemblyDuration: 2000,\n})\n\neffect.start()` },
        ]}
      />

      {/* ── Loading Duration ── */}
      <PropShowcase chatUI={false} height={380} title="Loading Duration"
        description="How long particles drift before assembly begins."
        variants={[
          { label: '500ms', preview: <PixelPreview loadingDuration={500} />, tsx: `createPixelEffect({ loadingDuration: 500 })` },
          { label: '1500ms', preview: <PixelPreview loadingDuration={1500} />, tsx: `createPixelEffect({ loadingDuration: 1500 })` },
          { label: '3000ms', preview: <PixelPreview loadingDuration={3000} />, tsx: `createPixelEffect({ loadingDuration: 3000 })` },
        ]}
      />

      {/* ── Assembly Duration ── */}
      <PropShowcase chatUI={false} height={380} title="Assembly Duration"
        description="How long the top-to-bottom assembly wave takes."
        variants={[
          { label: '1000ms', preview: <PixelPreview assemblyDuration={1000} />, tsx: `createPixelEffect({ assemblyDuration: 1000 })` },
          { label: '2000ms', preview: <PixelPreview assemblyDuration={2000} />, tsx: `createPixelEffect({ assemblyDuration: 2000 })` },
          { label: '4000ms', preview: <PixelPreview assemblyDuration={4000} />, tsx: `createPixelEffect({ assemblyDuration: 4000 })` },
        ]}
      />

      {/* ── Pixel Density ── */}
      <PropShowcase chatUI={false} height={380} title="Pixel Density"
        description="Lower gap = more particles = finer detail."
        variants={[
          { label: 'gap: 2', preview: <PixelPreview gap={2} particleSize={2} />, tsx: `createPixelEffect({ gap: 2, particleSize: 2 })` },
          { label: 'gap: 4', preview: <PixelPreview gap={4} particleSize={4} />, tsx: `createPixelEffect({ gap: 4, particleSize: 4 })` },
          { label: 'gap: 8', preview: <PixelPreview gap={8} particleSize={8} />, tsx: `createPixelEffect({ gap: 8, particleSize: 8 })` },
        ]}
      />

      {/* ── Ease Speed ── */}
      <PropShowcase chatUI={false} height={380} title="Ease Speed"
        description="How quickly particles settle into position. Higher = snappier."
        variants={[
          { label: '0.03 (gentle)', preview: <PixelPreview easeSpeed={0.03} />, tsx: `createPixelEffect({ easeSpeed: 0.03 })` },
          { label: '0.06 (default)', preview: <PixelPreview easeSpeed={0.06} />, tsx: `createPixelEffect({ easeSpeed: 0.06 })` },
          { label: '0.15 (snappy)', preview: <PixelPreview easeSpeed={0.15} />, tsx: `createPixelEffect({ easeSpeed: 0.15 })` },
        ]}
      />

      {/* ── Glow ── */}
      <PropShowcase chatUI={false} height={380} title="Glow"
        description="Particles emit a soft colored light matching their pixel color. Creates a neon/firefly feel."
        variants={[
          { label: 'glow on', preview: <PixelPreview glow glowRadius={6} />, tsx: `createPixelEffect({ glow: true, glowRadius: 6 })` },
          { label: 'glow off', preview: <PixelPreview glow={false} />, tsx: `createPixelEffect({ glow: false })` },
          { label: 'strong glow', preview: <PixelPreview glow glowRadius={12} />, tsx: `createPixelEffect({ glow: true, glowRadius: 12 })` },
        ]}
      />

      {/* ── Props ── */}
      <h2 style={{ fontSize: 16, fontWeight: 600, color: t.textPrimary, margin: '40px 0 8px' }}>createPixelEffect Options</h2>
      <PropsTable rows={[
        { name: 'container', type: 'HTMLElement', defaultVal: '—', description: 'DOM element for canvas (required)' },
        { name: 'image', type: 'string', defaultVal: '—', description: 'Image URL (required)' },
        { name: 'gap', type: 'number', defaultVal: '4', description: 'Pixel sampling gap' },
        { name: 'particleSize', type: 'number', defaultVal: '4', description: 'Particle size (px)' },
        { name: 'loadingDuration', type: 'number', defaultVal: '1500', description: 'Drift phase duration (ms)' },
        { name: 'assemblyDuration', type: 'number', defaultVal: '2000', description: 'Assembly wave duration (ms)' },
        { name: 'easeSpeed', type: 'number', defaultVal: '0.06', description: 'Particle easing factor (0–1)' },
        { name: 'overflow', type: 'number', defaultVal: '0.15', description: 'How far particles can exceed bounds (fraction)' },
        { name: 'glow', type: 'boolean', defaultVal: 'false', description: 'Particles emit colored light matching their pixel' },
        { name: 'glowRadius', type: 'number', defaultVal: '6', description: 'Glow blur radius (px)' },
        { name: 'maxCanvasWidth', type: 'number', defaultVal: '320', description: 'Caps particle count by downscaling the source image before sampling' },
        { name: 'onComplete', type: '() => void', defaultVal: '—', description: 'Called when real image is visible' },
      ]} />

      <h2 style={{ fontSize: 16, fontWeight: 600, color: t.textPrimary, margin: '40px 0 8px' }}>Instance Methods</h2>
      <PropsTable rows={[
        { name: 'start()', type: '() => void', defaultVal: '—', description: 'Begin the animation' },
        { name: 'stop()', type: '() => void', defaultVal: '—', description: 'Pause the animation' },
        { name: 'replay()', type: '() => void', defaultVal: '—', description: 'Reset and replay from loading phase' },
        { name: 'destroy()', type: '() => void', defaultVal: '—', description: 'Clean up canvas and DOM' },
      ]} />
    </div>
  )
}
