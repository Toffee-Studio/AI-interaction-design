import { describe, it, expect } from 'vitest'
import { resolveSpeed, speedMap } from '../tokens/speed'
import { resolveToneVars } from '../tokens/tone'

describe('resolveSpeed', () => {
  it('returns correct ms for named presets', () => {
    expect(resolveSpeed('slow')).toBe(speedMap.slow)
    expect(resolveSpeed('normal')).toBe(speedMap.normal)
    expect(resolveSpeed('fast')).toBe(speedMap.fast)
  })

  it('passes through numeric values unchanged', () => {
    expect(resolveSpeed(800)).toBe(800)
    expect(resolveSpeed(0)).toBe(0)
  })

  it('defaults to normal when undefined', () => {
    expect(resolveSpeed(undefined)).toBe(speedMap.normal)
  })
})

describe('resolveToneVars', () => {
  it('returns CSS variable object for each tone', () => {
    const neutral = resolveToneVars('neutral')
    expect(neutral['--toffee-shimmer-mid']).toBeDefined()

    const brand = resolveToneVars('brand')
    expect(brand['--toffee-orb-color']).toBeDefined()

    const muted = resolveToneVars('muted')
    expect(muted['--toffee-text-color']).toBeDefined()
  })

  it('defaults to neutral when undefined', () => {
    const result = resolveToneVars(undefined)
    expect(result).toEqual(resolveToneVars('neutral'))
  })
})
