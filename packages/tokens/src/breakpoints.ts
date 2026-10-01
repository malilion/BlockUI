export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
} as const;

export type Breakpoint = keyof typeof breakpoints;

/** Media queries matching PRD §50 (mobile < 768, tablet 768–1023, desktop ≥ 1024). */
export const media = {
  mobile: "(max-width: 767.98px)",
  tablet: "(min-width: 768px) and (max-width: 1023.98px)",
  desktop: "(min-width: 1024px)",
} as const;
