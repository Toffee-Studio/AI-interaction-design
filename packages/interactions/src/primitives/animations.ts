import { keyframes, css } from '@emotion/react'
import { resolveSpeed } from '../tokens/speed'
import { easingMap } from '../tokens/easing'
import type { ToffeeBaseProps } from '../types'

/** Keyframe: gradient travels left → right (ltr) */
export const shimmerKeyframe = keyframes`
  0%   { background-position: -300% center; }
  100% { background-position:  300% center; }
`

/** Keyframe: gradient travels right → left (rtl) */
export const shimmerKeyframeRtl = keyframes`
  0%   { background-position: 300% center; }
  100% { background-position: -300% center; }
`

/** Keyframe: gradient travels diagonally */
export const shimmerKeyframeDiagonal = keyframes`
  0%   { background-position: -300% -300%; }
  100% { background-position:  300%  300%; }
`

/** Keyframe: single pass — plays once then stops */
export const shimmerKeyframeOnce = keyframes`
  0%   { background-position: -300% center; opacity: 0.4; }
  40%  { opacity: 1; }
  100% { background-position:  300% center; opacity: 1; }
`

/** Keyframe: opacity breathes up and down */
export const pulseKeyframe = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
`

/** Keyframe: fade in from 0 → 1 */
export const fadeInKeyframe = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`

/** Keyframe: blur removes as opacity increases (generative reveal) */
export const unblurKeyframe = keyframes`
  from { filter: blur(16px); opacity: 0.3; }
  to   { filter: blur(0px);  opacity: 1;   }
`

// ---------------------------------------------------------------------------
// Utility: build a shimmer gradient CSS string
// ---------------------------------------------------------------------------

export function shimmerGradient(angle = '90deg', width: 'narrow' | 'normal' | 'wide' = 'normal') {
  const stops = {
    narrow: { start: '35%', mid1: '45%', mid2: '55%', end: '65%' },
    normal: { start: '20%', mid1: '40%', mid2: '60%', end: '80%' },
    wide:   { start: '5%',  mid1: '30%', mid2: '70%', end: '95%' },
  }[width]

  // Gradient with white highlight in the center for realistic AI shimmer
  return `linear-gradient(
    ${angle},
    var(--toffee-shimmer-from, rgba(120,120,120,0)) 0%,
    var(--toffee-shimmer-from, rgba(120,120,120,0)) ${stops.start},
    var(--toffee-shimmer-mid, rgba(200,200,200,0.8)) ${stops.mid1},
    rgba(255, 255, 255, 0.95) 50%,
    var(--toffee-shimmer-mid, rgba(200,200,200,0.8)) ${stops.mid2},
    var(--toffee-shimmer-to, rgba(120,120,120,0)) ${stops.end},
    var(--toffee-shimmer-to, rgba(120,120,120,0)) 100%
  )`
}

// ---------------------------------------------------------------------------
// Utility: build the shared animation CSS for a component
// ---------------------------------------------------------------------------

export interface BuildAnimationOptions {
  speed?: ToffeeBaseProps['speed']
  reducedMotion?: ToffeeBaseProps['reducedMotion']
  animation: ReturnType<typeof keyframes>
  easing?: keyof typeof easingMap
  iterationCount?: string | number
  fillMode?: string
}

export function buildAnimation({
  speed = 'normal',
  reducedMotion = 'auto',
  animation,
  easing = 'smooth',
  iterationCount = 'infinite',
  fillMode = 'none',
}: BuildAnimationOptions) {
  const duration = resolveSpeed(speed)
  const easingValue = easingMap[easing]

  const motionStyles = css`
    animation: ${animation} ${duration}ms ${easingValue} ${iterationCount} ${fillMode};
  `

  if (reducedMotion === true) {
    return css``
  }

  if (reducedMotion === false) {
    return motionStyles
  }

  return css`
    ${motionStyles}
    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  `
}
