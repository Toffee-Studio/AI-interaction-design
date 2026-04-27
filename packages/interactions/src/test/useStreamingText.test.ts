import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useStreamingText } from '../hooks/useStreamingText'

describe('useStreamingText', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  it('starts with empty displayedText', () => {
    const { result } = renderHook(() =>
      useStreamingText({ text: 'Hello', autoStart: false }),
    )
    expect(result.current.displayedText).toBe('')
    expect(result.current.done).toBe(false)
    expect(result.current.progress).toBe(0)
  })

  it('streams text character by character', () => {
    const { result } = renderHook(() =>
      useStreamingText({ text: 'Hi', tickMs: 50 }),
    )
    act(() => { vi.advanceTimersByTime(50) })
    expect(result.current.displayedText).toBe('H')

    act(() => { vi.advanceTimersByTime(50) })
    expect(result.current.displayedText).toBe('Hi')
    expect(result.current.done).toBe(true)
    expect(result.current.progress).toBe(1)
  })

  it('respects chunkSize', () => {
    const { result } = renderHook(() =>
      useStreamingText({ text: 'Hello', chunkSize: 2, tickMs: 50 }),
    )
    act(() => { vi.advanceTimersByTime(50) })
    expect(result.current.displayedText).toBe('He')
  })

  it('calls onComplete when done', () => {
    const onComplete = vi.fn()
    const { result } = renderHook(() =>
      useStreamingText({ text: 'Hi', tickMs: 50, onComplete }),
    )
    act(() => { vi.advanceTimersByTime(200) })
    expect(onComplete).toHaveBeenCalledTimes(1)
    expect(result.current.done).toBe(true)
  })

  it('can be reset', () => {
    const { result } = renderHook(() =>
      useStreamingText({ text: 'Hi', tickMs: 50 }),
    )
    act(() => { vi.advanceTimersByTime(200) })
    expect(result.current.done).toBe(true)

    act(() => { result.current.reset() })
    expect(result.current.displayedText).toBe('')
    expect(result.current.done).toBe(false)
  })
})
