/** Easing curves used by Toffee animations */
export const easingMap = {
  /** Default smooth sine wave for shimmer/pulse */
  smooth: 'cubic-bezier(0.4, 0, 0.6, 1)',
  /** Entrance easing — fast in, gentle out */
  enter: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
  /** Exit easing — gentle in, fast out */
  exit: 'cubic-bezier(0.4, 0, 1, 1)',
  /** Spring-like overshoot for reveal animations */
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  /** Linear — for continuous loops */
  linear: 'linear',
} as const satisfies Record<string, string>

export type EasingName = keyof typeof easingMap
