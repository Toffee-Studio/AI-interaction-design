/** @jsxImportSource @emotion/react */
'use client'

import React, { useRef } from 'react'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import type { toneMap } from '../tokens'

export type ToffeeTheme = {
  /** Override CSS variables for each tone. Merged on top of defaults. */
  tones?: Partial<{
    [K in keyof typeof toneMap]: Partial<(typeof toneMap)[K]>
  }>
}

export interface ToffeeProviderProps {
  children: React.ReactNode
  /** Optional theme overrides */
  theme?: ToffeeTheme
  /** Emotion cache key — change only if you have multiple providers */
  cacheKey?: string
  /**
   * Pass `useServerInsertedHTML` from `next/navigation` to enable
   * Emotion SSR style injection in the Next.js App Router.
   *
   * @example
   * import { useServerInsertedHTML } from 'next/navigation'
   * <ToffeeProvider useServerInsertedHTML={useServerInsertedHTML}>
   *   {children}
   * </ToffeeProvider>
   */
  useServerInsertedHTML?: (serverInsertedCallback: () => React.ReactNode) => void
}

/**
 * ToffeeProvider wraps Emotion's CacheProvider.
 *
 * For Next.js App Router users, pass `useServerInsertedHTML` from `next/navigation`
 * to prevent flash-of-unstyled-content during SSR streaming.
 *
 * In Vite/CRA/other environments, omit `useServerInsertedHTML` — it works as a plain provider.
 *
 * @example
 * // app/layout.tsx (Next.js App Router)
 * 'use client'
 * import { useServerInsertedHTML } from 'next/navigation'
 * import { ToffeeProvider } from '@toffee/interactions'
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <ToffeeProvider useServerInsertedHTML={useServerInsertedHTML}>
 *       {children}
 *     </ToffeeProvider>
 *   )
 * }
 */
export function ToffeeProvider({
  children,
  theme: _theme,
  cacheKey = 'toffee',
  useServerInsertedHTML,
}: ToffeeProviderProps) {
  const cacheRef = useRef<ReturnType<typeof createCache> | null>(null)
  const insertedRef = useRef(new Set<string>())

  if (cacheRef.current === null) {
    const cache = createCache({ key: cacheKey, prepend: true })
    cache.compat = true

    const origInsert = cache.insert.bind(cache)
    cache.insert = (...args) => {
      const [selector] = args
      if (selector && !insertedRef.current.has(selector)) {
        insertedRef.current.add(selector)
      }
      return origInsert(...args)
    }

    cacheRef.current = cache
  }

  // Next.js App Router: inject collected styles into <head> during SSR streaming
  if (useServerInsertedHTML) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useServerInsertedHTML(() => {
      const names = [...insertedRef.current]
      if (names.length === 0) return null
      insertedRef.current.clear()

      const cache = cacheRef.current!
      let styles = ''
      for (const key of Object.keys(cache.inserted)) {
        const rule = cache.inserted[key]
        if (typeof rule === 'string') {
          styles += rule
        }
      }

      if (!styles) return null

      return (
        <style
          key={cacheKey}
          data-emotion={`${cacheKey} ${names.join(' ')}`}
          dangerouslySetInnerHTML={{ __html: styles }}
        />
      )
    })
  }

  return (
    <CacheProvider value={cacheRef.current!}>
      {children}
    </CacheProvider>
  )
}
