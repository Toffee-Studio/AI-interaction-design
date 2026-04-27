'use client'

import React, { useState } from 'react'
import { t } from '@/theme'

// ─── Reusable control components ─────────────────────────────────────────────

interface SegmentedControlProps {
  label: string
  options: string[]
  value: string
  onChange: (v: string) => void
}

function SegmentedControl({ label, options, value, onChange }: SegmentedControlProps) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 12, fontWeight: 500, color: t.textSecondary, marginBottom: 8 }}>
        {label}
      </div>
      <div
        style={{
          display: 'flex',
          background: '#F4F4F5',
          borderRadius: 10,
          padding: 3,
          gap: 2,
        }}
      >
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            style={{
              flex: 1,
              padding: '7px 12px',
              borderRadius: 8,
              border: 'none',
              background: value === opt ? '#ffffff' : 'transparent',
              boxShadow: value === opt ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              color: value === opt ? t.textPrimary : t.textMuted,
              fontSize: 12,
              fontWeight: value === opt ? 600 : 400,
              fontFamily: t.font,
              cursor: 'pointer',
              transition: 'all 200ms ease',
              whiteSpace: 'nowrap',
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

interface SliderControlProps {
  label: string
  value: number
  min: number
  max: number
  step?: number
  unit?: string
  onChange: (v: number) => void
}

function SliderControl({ label, value, min, max, step = 1, unit = '', onChange }: SliderControlProps) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: t.textSecondary }}>{label}</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: t.textPrimary, fontFamily: t.fontMono }}>
          {value}{unit}
        </span>
      </div>
      <div style={{ position: 'relative', height: 6, background: '#F4F4F5', borderRadius: 3 }}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${((value - min) / (max - min)) * 100}%`,
            background: `linear-gradient(90deg, ${t.orange}, ${t.yellow})`,
            borderRadius: 3,
            transition: 'width 100ms ease',
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: 'pointer',
            margin: 0,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: `${((value - min) / (max - min)) * 100}%`,
            transform: 'translate(-50%, -50%)',
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: '#ffffff',
            border: `2px solid ${t.orange}`,
            boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
            pointerEvents: 'none',
            transition: 'left 100ms ease',
          }}
        />
      </div>
    </div>
  )
}

interface ToggleControlProps {
  label: string
  value: boolean
  onChange: (v: boolean) => void
}

function ToggleControl({ label, value, onChange }: ToggleControlProps) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
      }}
    >
      <span style={{ fontSize: 12, fontWeight: 500, color: t.textSecondary }}>{label}</span>
      <button
        onClick={() => onChange(!value)}
        style={{
          width: 44,
          height: 24,
          borderRadius: 12,
          border: 'none',
          background: value ? t.orange : '#E4E4E7',
          cursor: 'pointer',
          position: 'relative',
          transition: 'background 200ms ease',
          padding: 0,
        }}
      >
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: '#ffffff',
            position: 'absolute',
            top: 3,
            left: value ? 23 : 3,
            transition: 'left 200ms cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
          }}
        />
      </button>
    </div>
  )
}

interface TextInputControlProps {
  label: string
  value: string
  placeholder?: string
  onChange: (v: string) => void
}

function TextInputControl({ label, value, placeholder, onChange }: TextInputControlProps) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 12, fontWeight: 500, color: t.textSecondary, marginBottom: 8 }}>
        {label}
      </div>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          padding: '10px 14px',
          borderRadius: 10,
          border: '1px solid #E4E4E7',
          background: '#F9F9FA',
          fontSize: 13,
          fontFamily: t.font,
          color: t.textPrimary,
          outline: 'none',
          boxSizing: 'border-box',
          transition: 'border-color 200ms ease',
        }}
        onFocus={(e) => { e.currentTarget.style.borderColor = t.orange }}
        onBlur={(e) => { e.currentTarget.style.borderColor = '#E4E4E7' }}
      />
    </div>
  )
}

// ─── Color preset picker ─────────────────────────────────────────────────────

interface ColorPresetProps {
  label: string
  presets: { name: string; color: string; shimmerColor: string }[]
  value: string
  onChange: (name: string, color: string, shimmerColor: string) => void
}

function ColorPresetPicker({ label, presets, value, onChange }: ColorPresetProps) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 12, fontWeight: 500, color: t.textSecondary, marginBottom: 8 }}>
        {label}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        {presets.map((p) => (
          <button
            key={p.name}
            onClick={() => onChange(p.name, p.color, p.shimmerColor)}
            title={p.name}
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              border: value === p.name ? `2px solid ${t.textPrimary}` : '2px solid #E4E4E7',
              background: `linear-gradient(135deg, ${p.color}, ${p.shimmerColor})`,
              cursor: 'pointer',
              transition: 'border-color 200ms ease, transform 150ms ease',
              transform: value === p.name ? 'scale(1.1)' : 'scale(1)',
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Main PropsEditor panel ──────────────────────────────────────────────────

export interface ShimmerTextEditorState {
  text: string
  variant: 'default' | 'soft' | 'strong'
  speed: 'slow' | 'normal' | 'fast'
  direction: 'ltr' | 'rtl' | 'diagonal'
  shimmerWidth: 'narrow' | 'normal' | 'wide'
  repeat: 'loop' | 'once' | 'hover'
  delay: number
  customSpeed: number
  colorPreset: string
  textColor: string
  shimmerColor: string
  showSlots: boolean
}

export const defaultShimmerState: ShimmerTextEditorState = {
  text: 'AI interaction design',
  variant: 'strong',
  speed: 'slow',
  direction: 'ltr',
  shimmerWidth: 'normal',
  repeat: 'loop',
  delay: 0,
  customSpeed: 2000,
  colorPreset: 'Midnight',
  textColor: 'rgba(30, 30, 30, 0.88)',
  shimmerColor: 'rgba(180, 180, 180, 0.85)',
  showSlots: false,
}

// Color presets with enhanced shimmer colors that work with white highlight center
const colorPresets = [
  { name: 'Toffee', color: '#F6561A', shimmerColor: '#FFB050' },
  { name: 'Midnight', color: '#1e1e1e', shimmerColor: '#B4B4B4' },
  { name: 'Gemini', color: '#8860FF', shimmerColor: '#A8C0FF' },
  { name: 'Emerald', color: '#3C8749', shimmerColor: '#A8D060' },
]

export const PROPS_EDITOR_WIDTH = 300

interface PropsEditorProps {
  isOpen: boolean
  onClose: () => void
  state: ShimmerTextEditorState
  onChange: (state: ShimmerTextEditorState) => void
}

export function PropsEditor({ isOpen, onClose, state, onChange }: PropsEditorProps) {
  const update = <K extends keyof ShimmerTextEditorState>(
    key: K,
    value: ShimmerTextEditorState[K],
  ) => {
    onChange({ ...state, [key]: value })
  }

  return (
    <aside
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: PROPS_EDITOR_WIDTH,
        height: '100vh',
        background: '#ffffff',
        borderLeft: isOpen ? '1px solid #E4E4E7' : 'none',
        padding: '24px 20px',
        overflowY: 'auto',
        zIndex: 101,
        transform: isOpen ? 'translateX(0)' : `translateX(${PROPS_EDITOR_WIDTH + 2}px)`,
        visibility: isOpen ? 'visible' as const : 'hidden' as const,
        transition: 'transform 350ms cubic-bezier(0.4, 0, 0.2, 1), visibility 0ms linear ' + (isOpen ? '0ms' : '350ms'),
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 28,
          paddingBottom: 16,
          borderBottom: '1px solid #F4F4F5',
        }}
      >
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: t.textPrimary }}>
            Props Editor
          </div>
          <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>
            ShimmerText
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="Close editor"
          style={{
            background: '#F4F4F5',
            border: 'none',
            borderRadius: 8,
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: t.textSecondary,
            transition: 'background 150ms ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#E4E4E7' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = '#F4F4F5' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <TextInputControl
        label="Text Content"
        value={state.text}
        placeholder="Enter preview text..."
        onChange={(v) => update('text', v)}
      />

      <ColorPresetPicker
        label="Color Preset"
        presets={colorPresets}
        value={state.colorPreset}
        onChange={(name, color, shimmerColor) => {
          // Enhanced shimmer colors that work with white highlight center
          onChange({
            ...state,
            colorPreset: name,
            textColor: name === 'Toffee'
              ? 'rgba(246, 86, 26, 0.9)'
              : name === 'Midnight'
                ? 'rgba(30, 30, 30, 0.88)'
                : name === 'Gemini'
                  ? 'rgba(136, 96, 255, 0.9)'
                  : 'rgba(60, 135, 73, 0.9)',
            shimmerColor:
              name === 'Toffee'
                ? 'rgba(255, 176, 80, 0.9)'
                : name === 'Midnight'
                  ? 'rgba(180, 180, 180, 0.85)'
                  : name === 'Gemini'
                    ? 'rgba(168, 192, 255, 0.9)'
                    : 'rgba(168, 208, 96, 0.9)',
          })
        }}
      />

      <SegmentedControl
        label="Variant"
        options={['default', 'soft', 'strong']}
        value={state.variant}
        onChange={(v) => update('variant', v as ShimmerTextEditorState['variant'])}
      />

      <SegmentedControl
        label="Speed"
        options={['slow', 'normal', 'fast']}
        value={state.speed}
        onChange={(v) => update('speed', v as ShimmerTextEditorState['speed'])}
      />

      <SliderControl
        label="Custom Speed"
        value={state.customSpeed}
        min={200}
        max={4000}
        step={100}
        unit="ms"
        onChange={(v) => update('customSpeed', v)}
      />

      <SegmentedControl
        label="Direction"
        options={['ltr', 'rtl', 'diagonal']}
        value={state.direction}
        onChange={(v) => update('direction', v as ShimmerTextEditorState['direction'])}
      />

      <SegmentedControl
        label="Shimmer Width"
        options={['narrow', 'normal', 'wide']}
        value={state.shimmerWidth}
        onChange={(v) => update('shimmerWidth', v as ShimmerTextEditorState['shimmerWidth'])}
      />

      <SegmentedControl
        label="Repeat"
        options={['loop', 'once', 'hover']}
        value={state.repeat}
        onChange={(v) => update('repeat', v as ShimmerTextEditorState['repeat'])}
      />

      <SliderControl
        label="Delay"
        value={state.delay}
        min={0}
        max={2000}
        step={50}
        unit="ms"
        onChange={(v) => update('delay', v)}
      />

      <ToggleControl
        label="Show Slots (before/after)"
        value={state.showSlots}
        onChange={(v) => update('showSlots', v)}
      />

      {/* Live preview inside editor */}
      <div
        style={{
          marginTop: 8,
          padding: 20,
          background: '#F9F9FA',
          borderRadius: 12,
          border: '1px solid #E4E4E7',
        }}
      >
        <div style={{ fontSize: 10, fontWeight: 500, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
          Preview
        </div>
        <div style={{ fontSize: 22, fontWeight: 600, minHeight: 36 }}>
          {/* This is a static preview hint — the actual live preview is in the page */}
          <span
            style={{
              background: `linear-gradient(90deg, ${state.textColor}, ${state.shimmerColor}, ${state.textColor})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {state.text}
          </span>
        </div>
      </div>

      {/* Generated code is shown in the main content area */}
    </aside>
  )
}
