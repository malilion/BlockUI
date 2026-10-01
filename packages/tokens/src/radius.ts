/** Block UI never rounds more than 6px (PRD §15). */
export const radius = {
  none: "0px",
  xs: "2px",
  sm: "4px",
  md: "6px",
} as const;

export const MAX_RADIUS_PX = 6;

export type RadiusToken = keyof typeof radius;
