'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

export interface UseStreamingTextOptions {
  /** The full target text to stream in */
  text: string
  /**
   * How many characters to reveal per tick.
   * Defaults to 1 (character by character).
   */
  chunkSize?: number
  /**
   * Delay between ticks in milliseconds.
   * Defaults to 30ms (approx. GPT streaming cadence).
   */
  tickMs?: number
  /** Called when the full text has been revealed */
  onComplete?: () => void
  /** If true, streaming starts immediately on mount */
  autoStart?: boolean
}

export interface UseStreamingTextResult {
  /** The currently revealed portion of the text */
  displayedText: string
  /** True when all text has been revealed */
  done: boolean
  /** 0–1 progress ratio */
  progress: number
  /** Manually start or restart streaming */
  start: () => void
  /** Pause streaming */
  pause: () => void
  /** Reset to beginning */
  reset: () => void
}

/**
 * Headless hook for token-by-token text streaming.
 * Use this directly when you want full control over rendering,
 * or use the <StreamingText> component for the default UI.
 *
 * @example
 * const { displayedText, done } = useStreamingText({ text: responseText })
 */
export function useStreamingText({
  text,
  chunkSize = 1,
  tickMs = 30,
  onComplete,
  autoStart = true,
}: UseStreamingTextOptions): UseStreamingTextResult {
  const [cursor, setCursor] = useState(0)
  const [running, setRunning] = useState(autoStart)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  // Reset when text changes
  useEffect(() => {
    setCursor(0)
    setRunning(autoStart)
  }, [text, autoStart])

  useEffect(() => {
    if (!running || cursor >= text.length) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      if (cursor >= text.length && running) {
        setRunning(false)
        onCompleteRef.current?.()
      }
      return
    }

    intervalRef.current = setInterval(() => {
      setCursor((c) => {
        const next = Math.min(c + chunkSize, text.length)
        return next
      })
    }, tickMs)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [running, cursor, text.length, chunkSize, tickMs])

  const start = useCallback(() => {
    if (cursor >= text.length) setCursor(0)
    setRunning(true)
  }, [cursor, text.length])

  const pause = useCallback(() => setRunning(false), [])

  const reset = useCallback(() => {
    setRunning(false)
    setCursor(0)
  }, [])

  return {
    displayedText: text.slice(0, cursor),
    done: cursor >= text.length,
    progress: text.length === 0 ? 1 : cursor / text.length,
    start,
    pause,
    reset,
  }
}
