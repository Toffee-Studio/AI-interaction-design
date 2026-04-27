'use client'

// Client-side animated components (must be used inside a Client Component in Next.js)
export { ShimmerText } from './components/ShimmerText'
export type { ShimmerTextProps, ShimmerTextState } from './components/ShimmerText'

export { StreamingText } from './components/StreamingText'
export type { StreamingTextProps, StreamingTextState } from './components/StreamingText'

export { GenerativeImage } from './components/GenerativeImage'
export type { GenerativeImageProps, GenerativeImageState } from './components/GenerativeImage'

// Headless hooks
export { useStreamingText } from './hooks/useStreamingText'
export type { UseStreamingTextOptions, UseStreamingTextResult } from './hooks/useStreamingText'

export { useReducedMotion } from './hooks/useReducedMotion'

// Re-export primitives for advanced custom usage
export {
  shimmerKeyframe,
  pulseKeyframe,
  fadeInKeyframe,
  unblurKeyframe,
  shimmerGradient,
  buildAnimation,
} from './primitives'
export type { BuildAnimationOptions } from './primitives'
