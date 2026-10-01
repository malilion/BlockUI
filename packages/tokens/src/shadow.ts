import { colors } from "./colors.js";

/** Pixel border + bevel used by every block surface (PRD §16). */
export const border = {
  width: "3px",
  widthThin: "2px",
  color: colors.outline,
} as const;

export const shadow = {
  bevelLight: "rgba(255, 255, 255, 0.14)",
  bevelDark: "rgba(0, 0, 0, 0.38)",
  /** Raised block: light top-left, dark bottom-right. */
  bevel: "inset 3px 3px 0 rgba(255, 255, 255, 0.14), inset -3px -3px 0 rgba(0, 0, 0, 0.38)",
  /** Sunken block (slots, inputs): dark top-left, light bottom-right. */
  inset: "inset 3px 3px 0 rgba(0, 0, 0, 0.38), inset -3px -3px 0 rgba(255, 255, 255, 0.1)",
  /** Hard pixel drop shadow — never blurred. */
  drop: "4px 4px 0 rgba(0, 0, 0, 0.45)",
  text: "2px 2px 0 rgba(0, 0, 0, 0.55)",
  textLight: "1px 1px 0 rgba(255, 255, 255, 0.35)",
} as const;
