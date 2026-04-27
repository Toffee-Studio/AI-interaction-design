import type { ToffeeBaseProps } from '../types'

/**
 * CSS variable sets for each tone.
 * Components read these variables from their root element.
 * All values are overridable via ToffeeProvider's `theme` prop.
 */
/**
 * CSS variable sets for each tone.
 * 
 * The shimmer effect uses a gradient with:
 * - from/to: transparent edges that fade in/out
 * - mid: the colored glow around the white highlight center
 * 
 * The white highlight (rgba(255,255,255,0.95)) is added in the gradient function
 * at the 50% position for a realistic AI text generation effect.
 */
export const toneMap = {
  neutral: {
    '--toffee-shimmer-from': 'rgba(60, 60, 60, 0)',
    '--toffee-shimmer-mid': 'rgba(180, 180, 180, 0.85)',
    '--toffee-shimmer-to': 'rgba(60, 60, 60, 0)',
    '--toffee-pulse-bg': 'rgba(0, 0, 0, 0.08)',
    '--toffee-pulse-highlight': 'rgba(20, 20, 20, 0.35)',
    '--toffee-text-color': 'rgba(30, 30, 30, 0.88)',
    '--toffee-orb-color': 'rgba(0, 0, 0, 0.6)',
  },
  brand: {
    '--toffee-shimmer-from': 'rgba(246, 86, 26, 0)',
    '--toffee-shimmer-mid': 'rgba(255, 180, 80, 0.9)',
    '--toffee-shimmer-to': 'rgba(246, 86, 26, 0)',
    '--toffee-pulse-bg': 'rgba(246, 86, 26, 0.1)',
    '--toffee-pulse-highlight': 'rgba(255, 161, 3, 0.4)',
    '--toffee-text-color': 'rgba(246, 86, 26, 0.9)',
    '--toffee-orb-color': 'rgba(246, 86, 26, 0.6)',
  },
  muted: {
    '--toffee-shimmer-from': 'rgba(160, 155, 170, 0)',
    '--toffee-shimmer-mid': 'rgba(200, 195, 210, 0.8)',
    '--toffee-shimmer-to': 'rgba(160, 155, 170, 0)',
    '--toffee-pulse-bg': 'rgba(160, 155, 170, 0.1)',
    '--toffee-pulse-highlight': 'rgba(200, 195, 210, 0.35)',
    '--toffee-text-color': 'rgba(140, 135, 150, 0.75)',
    '--toffee-orb-color': 'rgba(160, 155, 170, 0.45)',
  },
} as const satisfies Record<string, Record<string, string>>

export type ToneName = ToffeeBaseProps['tone']

/**
 * Returns an inline style object of CSS variables for a given tone.
 */
export function resolveToneVars(
  tone: ToneName = 'neutral',
): Record<string, string> {
  return toneMap[tone ?? 'neutral'] as Record<string, string>
}
