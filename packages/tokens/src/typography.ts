export const fontFamily = {
  /** Pixel display font for headings, buttons, labels and counters. */
  display: '"Silkscreen", "Press Start 2P", "Courier New", ui-monospace, monospace',
  /** Readable body font. Pixel fonts are reserved for short labels (PRD §5.3). */
  body: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans TC", "Helvetica Neue", Arial, sans-serif',
  mono: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace',
} as const;

export const fontSize = {
  xs: "11px",
  sm: "12px",
  md: "14px",
  lg: "16px",
  xl: "20px",
  "2xl": "24px",
  "3xl": "32px",
} as const;

export const fontWeight = {
  regular: "400",
  medium: "500",
  bold: "700",
} as const;

export const lineHeight = {
  tight: "1.15",
  normal: "1.45",
  relaxed: "1.6",
} as const;

export const letterSpacing = {
  normal: "0",
  wide: "0.04em",
  wider: "0.08em",
} as const;

export const typography = {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
} as const;
