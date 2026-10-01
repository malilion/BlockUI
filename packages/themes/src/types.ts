import type { TextureToken } from "@block-ui/tokens";

export const themeNames = ["grassland", "cave", "deepslate", "nether", "end"] as const;

export type BlockThemeName = (typeof themeNames)[number];

/**
 * Semantic theme contract (PRD §53) plus the extra roles components need to
 * stay fully themeable without hard-coded colors.
 */
export interface BlockTheme {
  background: string;
  surface: string;
  surfaceAlt: string;
  primary: string;
  secondary: string;
  border: string;
  text: string;
  textMuted: string;

  /** Text/icon color on top of `primary`. */
  onPrimary: string;
  primaryLight: string;
  primaryDark: string;
  /** Text/icon color on top of `secondary`. */
  onSecondary: string;
  secondaryLight: string;
  secondaryDark: string;
  /** Raised panel header strip. */
  surfaceHeader: string;
  /** Inventory slot / input well background. */
  slot: string;
  slotHover: string;
  /** Focus ring color (≥ 3:1 against surfaces). */
  focus: string;
  /** Modal backdrop. */
  overlay: string;
  /** Texture tiled behind panels and the page. */
  texture: TextureToken;
}
