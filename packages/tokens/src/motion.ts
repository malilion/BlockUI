/** Snappy, mechanical motion. Nothing above 160ms by default (PRD §17). */
export const motion = {
  instant: "80ms",
  fast: "120ms",
  normal: "160ms",
} as const;

export const easing = {
  /** Pixel-step easing for mechanical feedback. */
  step: "steps(2, end)",
  snap: "cubic-bezier(0.2, 0, 0, 1)",
  linear: "linear",
} as const;

export type MotionToken = keyof typeof motion;
