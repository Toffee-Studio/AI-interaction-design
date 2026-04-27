import type React from 'react'

/**
 * Render slot contract shared by all Toffee components.
 * `overlay` is a render prop that receives the component's live state.
 */
export interface SlotProps<State = Record<string, unknown>> {
  /** Rendered before the component's main content */
  before?: React.ReactNode
  /** Rendered after the component's main content */
  after?: React.ReactNode
  /** Render prop — receives live animation/load state */
  overlay?: (state: State) => React.ReactNode
}

/**
 * Base props shared by every Toffee component.
 */
export interface ToffeeBaseProps {
  /**
   * Visual style variant.
   * - `default`  standard appearance
   * - `soft`     reduced opacity / subtle
   * - `strong`   high-contrast / pronounced
   */
  variant?: 'default' | 'soft' | 'strong'

  /**
   * Animation speed. Accepts a named preset or an explicit duration in milliseconds.
   * - `'slow'`   2000 ms
   * - `'normal'` 1200 ms  (default)
   * - `'fast'`   600 ms
   * - `number`   exact ms
   */
  speed?: 'slow' | 'normal' | 'fast' | number

  /**
   * Color tone applied via CSS variables.
   * - `'neutral'`  grey / monochrome
   * - `'brand'`    primary brand hue (overridable via ToffeeProvider theme)
   * - `'muted'`    lower saturation tint
   */
  tone?: 'neutral' | 'brand' | 'muted'

  /**
   * Controls reduced-motion behaviour.
   * - `'auto'`  respects the OS/browser `prefers-reduced-motion` media query (default)
   * - `true`    force reduced motion regardless of OS setting
   * - `false`   force full animation regardless of OS setting
   */
  reducedMotion?: boolean | 'auto'

  /** Additional CSS class applied to the root element */
  className?: string

  /** Inline styles applied to the root element */
  style?: React.CSSProperties

  /** Render the root as a different HTML element or React component */
  as?: React.ElementType
}
