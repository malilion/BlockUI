import { colors } from "@malilion/block-ui-tokens";

/**
 * Shared illustration palette. Most entries come straight from the design
 * tokens; a few extra shades exist only for pixel shading.
 */
export const p = {
  ...colors,
  skin: "#C8936A",
  skinDark: "#A06F4A",
  meat: "#B0602E",
  meatLight: "#D98A4E",
  meatDark: "#7A3A1A",
  bone: colors.sandLight,
  heart: "#E0473F",
  heartLight: "#FF9C94",
  heartDark: "#9E1F1A",
  ironLight: "#F0F0F0",
  flame: colors.lava,
  flameCore: colors.goldLight,
  paper: colors.sand,
  paperDark: colors.sandDark,
  coalLight: "#4A4A4A",
  coalDark: "#1A1A1A",
} as const;
