'use client'

import { useEffect, useState } from 'react'
import type { ToffeeBaseProps } from '../types'

/**
 * Resolves whether reduced motion should be applied.
 *
 * - `'auto'`  — reads `prefers-reduced-motion` from the OS/browser
 * - `true`    — always returns true
 * - `false`   — always returns false
 */
export function useReducedMotion(
  reducedMotion: ToffeeBaseProps['reducedMotion'] = 'auto',
): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    if (reducedMotion !== 'auto') return

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReduced(mq.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [reducedMotion])

  if (reducedMotion === true) return true
  if (reducedMotion === false) return false
  return prefersReduced
}
