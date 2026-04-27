/** @jsxImportSource @emotion/react */
'use client'

import React, { useState } from 'react'
import { css } from '@emotion/react'
import type { ToffeeBaseProps, SlotProps } from '../../types'
import { resolveToneVars } from '../../tokens/tone'
import { resolveSpeed } from '../../tokens/speed'
import {
  shimmerKeyframe,
  shimmerKeyframeRtl,
  shimmerKeyframeDiagonal,
  shimmerKeyframeOnce,
  shimmerGradient,
} from '../../primitives/animations'

export interface ShimmerTextState {
  isAnimating: boolean
}

export interface ShimmerTextProps extends ToffeeBaseProps {
  /** The text content to display with shimmer effect */
  children: React.ReactNode

  /**
   * Direction of the shimmer sweep.
   * - `ltr` — left to right (default)
   * - `rtl` — right to left
   * - `diagonal` — top-left to bottom-right, great for large headings
   */
  direction?: 'ltr' | 'rtl' | 'diagonal'

  /**
   * Width of the shimmer light band.
   * - `narrow` — sharp, laser-like sweep
   * - `normal` — balanced (default)
   * - `wide` — soft, broad glow
   */
  shimmerWidth?: 'narrow' | 'normal' | 'wide'

  /**
   * When the shimmer plays.
   * - `loop` — repeats forever (default)
   * - `once` — plays once on mount, then settles to static text
   * - `hover` — only plays while the user hovers
   */
  repeat?: 'loop' | 'once' | 'hover'

  /**
   * Delay in ms before the animation starts.
   * Useful for staggering multiple ShimmerText elements.
   */
  delay?: number

  /**
   * Override the shimmer highlight color directly.
   * Accepts any valid CSS color string.
   * Takes precedence over tone CSS variables.
   */
  shimmerColor?: string

  /** Render slots: before, after, overlay */
  slots?: SlotProps<ShimmerTextState>
}

/**
 * ShimmerText renders its children with a moving gradient shimmer —
 * ideal for "AI thinking" labels, loading placeholders, or generative content previews.
 *
 * @example
 * <ShimmerText variant="strong" speed="slow" tone="brand" direction="diagonal" shimmerWidth="wide">
 *   Generating response...
 * </ShimmerText>
 */
export function ShimmerText({
  children,
  variant = 'default',
  speed = 'normal',
  tone = 'brand',
  reducedMotion = 'auto',
  direction = 'ltr',
  shimmerWidth = 'normal',
  repeat = 'loop',
  delay = 0,
  shimmerColor,
  className,
  style,
  as: Tag = 'span',
  slots,
}: ShimmerTextProps) {
  const duration = resolveSpeed(speed)
  const toneVars = resolveToneVars(tone)
  const [hovered, setHovered] = useState(false)
  const [onceDone, setOnceDone] = useState(false)

  // Pick the right keyframe based on direction
  const keyframeMap = {
    ltr: shimmerKeyframe,
    rtl: shimmerKeyframeRtl,
    diagonal: shimmerKeyframeDiagonal,
  }
  const activeKeyframe = repeat === 'once' ? shimmerKeyframeOnce : keyframeMap[direction]

  // Gradient angle based on direction
  const angleMap = {
    ltr: '90deg',
    rtl: '270deg',
    diagonal: '135deg',
  }
  const angle = angleMap[direction]

  const opacityByVariant = {
    default: 1,
    soft: 0.65,
    strong: 1,
  } as const

  // If shimmerColor is provided, inject it as CSS variable overrides
  const colorOverrides = shimmerColor
    ? ({
        '--toffee-shimmer-from': 'transparent',
        '--toffee-shimmer-mid': shimmerColor,
        '--toffee-shimmer-to': 'transparent',
        '--toffee-text-color': shimmerColor,
      } as React.CSSProperties)
    : {}

  // Determine if animation should be active
  const shouldAnimate =
    repeat === 'loop' ||
    (repeat === 'hover' && hovered) ||
    (repeat === 'once' && !onceDone)

  const iterationCount = repeat === 'once' ? 1 : 'infinite'

  const shimmerStyles = css`
    display: inline-block;
    background-image: ${shimmerGradient(angle, shimmerWidth)},
      linear-gradient(
        90deg,
        var(--toffee-text-color, rgba(100, 100, 100, 0.7)) 0%,
        var(--toffee-text-color, rgba(100, 100, 100, 0.7)) 100%
      );
    background-size: 300% 100%, 100% 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
    opacity: ${opacityByVariant[variant]};
    animation-name: ${shouldAnimate ? activeKeyframe : 'none'};
    animation-duration: ${duration}ms;
    animation-timing-function: linear;
    animation-iteration-count: ${iterationCount};
    animation-delay: ${delay}ms;
    animation-fill-mode: ${repeat === 'once' ? 'forwards' : 'none'};

    @media (prefers-reduced-motion: reduce) {
      animation: none;
      background-image: none;
      -webkit-text-fill-color: unset;
      color: var(--toffee-text-color, rgba(100, 100, 100, 0.7));
    }
  `

  const reducedStyles =
    reducedMotion === true
      ? css`
          animation: none !important;
          background-image: none !important;
          -webkit-text-fill-color: unset !important;
          color: var(--toffee-text-color, rgba(100, 100, 100, 0.7)) !important;
        `
      : null

  const forcedStyles =
    reducedMotion === false
      ? css`
          @media (prefers-reduced-motion: reduce) {
            animation-name: ${activeKeyframe} !important;
            animation-duration: ${duration}ms !important;
            animation-timing-function: linear !important;
            animation-iteration-count: ${iterationCount} !important;
            background-image: ${shimmerGradient(angle, shimmerWidth)} !important;
            -webkit-text-fill-color: transparent !important;
          }
        `
      : null

  const state: ShimmerTextState = { isAnimating: shouldAnimate && reducedMotion !== true }

  const handleAnimationEnd = () => {
    if (repeat === 'once') setOnceDone(true)
  }

  return (
    <span
      style={{ ...toneVars, ...colorOverrides, ...style } as React.CSSProperties}
      className={className}
      onMouseEnter={() => repeat === 'hover' && setHovered(true)}
      onMouseLeave={() => repeat === 'hover' && setHovered(false)}
    >
      {slots?.before}
      <Tag
        css={[shimmerStyles, reducedStyles, forcedStyles]}
        onAnimationEnd={handleAnimationEnd}
      >
        {children}
      </Tag>
      {slots?.after}
      {slots?.overlay?.(state)}
    </span>
  )
}
