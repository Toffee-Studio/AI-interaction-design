import type { ToffeeBaseProps } from '../types'

/** Named speed presets in milliseconds */
export const speedMap = {
  slow: 2000,
  normal: 1200,
  fast: 600,
} as const satisfies Record<string, number>

/**
 * Resolves a `speed` prop value to a millisecond duration.
 */
export function resolveSpeed(speed: ToffeeBaseProps['speed'] = 'normal'): number {
  if (typeof speed === 'number') return speed
  return speedMap[speed]
}
