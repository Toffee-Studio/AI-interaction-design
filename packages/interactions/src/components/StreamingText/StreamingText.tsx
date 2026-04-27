/** @jsxImportSource @emotion/react */
'use client'

import React from 'react'
import { css, keyframes } from '@emotion/react'
import type { ToffeeBaseProps, SlotProps } from '../../types'
import { resolveToneVars } from '../../tokens/tone'
import { resolveSpeed } from '../../tokens/speed'
import { useStreamingText } from '../../hooks/useStreamingText'
import type { UseStreamingTextOptions } from '../../hooks/useStreamingText'

export interface StreamingTextState {
  displayedText: string
  progress: number
  done: boolean
}

export interface StreamingTextProps
  extends ToffeeBaseProps,
    Pick<UseStreamingTextOptions, 'text' | 'chunkSize' | 'tickMs' | 'onComplete' | 'autoStart'> {
  /** Render slots: before, after, overlay (receives { displayedText, progress, done }) */
  slots?: SlotProps<StreamingTextState>
  /**
   * Whether to show a blinking caret cursor while streaming.
   * Defaults to true.
   */
  showCaret?: boolean
}

const caretBlink = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
`

/**
 * StreamingText reveals text character-by-character, mimicking AI token streaming.
 * Pair with `useStreamingText` for headless control.
 *
 * @example
 * <StreamingText
 *   text="The quick brown fox jumps over the lazy dog."
 *   speed="fast"
 *   tone="brand"
 *   showCaret
 * />
 */
export function StreamingText({
  text,
  chunkSize,
  tickMs,
  onComplete,
  autoStart = true,
  showCaret = true,
  variant = 'default',
  speed = 'normal',
  tone = 'brand',
  reducedMotion = 'auto',
  className,
  style,
  as: Tag = 'span',
  slots,
}: StreamingTextProps) {
  // Map speed → tickMs if not explicitly provided
  const resolvedTickMs = tickMs ?? Math.round(resolveSpeed(speed) / 60)

  const { displayedText, done, progress } = useStreamingText({
    text,
    ...(chunkSize !== undefined && { chunkSize }),
    tickMs: resolvedTickMs,
    ...(onComplete !== undefined && { onComplete }),
    autoStart,
  })

  const toneVars = resolveToneVars(tone)

  const opacityByVariant = { default: 1, soft: 0.7, strong: 1 } as const
  const fontWeightByVariant = { default: 'inherit', soft: 'inherit', strong: 'bold' } as const

  const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(2px); }
    to   { opacity: 1; transform: translateY(0); }
  `

  const containerStyles = css`
    display: inline;
    opacity: ${opacityByVariant[variant ?? 'default']};
    font-weight: ${fontWeightByVariant[variant ?? 'default']};
    color: var(--toffee-text-color, inherit);
    animation: ${fadeIn} 200ms ease-out;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  `

  const reducedOverride =
    reducedMotion === true
      ? css`animation: none !important;`
      : reducedMotion === false
        ? css`
            @media (prefers-reduced-motion: reduce) {
              animation: ${fadeIn} 200ms ease-out !important;
            }
          `
        : null

  const caretStyles = css`
    display: inline-block;
    width: 2px;
    height: 1em;
    vertical-align: text-bottom;
    background: var(--toffee-text-color, currentColor);
    margin-left: 2px;
    border-radius: 1px;
    animation: ${caretBlink} 1s step-end infinite;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
      opacity: 1;
    }
  `

  const state: StreamingTextState = { displayedText, progress, done }

  return (
    <span
      style={{ ...toneVars, ...style } as React.CSSProperties}
      className={className}
      aria-live="polite"
      aria-label={text}
    >
      {slots?.before}
      <Tag css={[containerStyles, reducedOverride]}>
        {displayedText}
        {showCaret && !done && (
          <span css={caretStyles} aria-hidden="true" />
        )}
      </Tag>
      {slots?.after}
      {slots?.overlay?.(state)}
    </span>
  )
}
