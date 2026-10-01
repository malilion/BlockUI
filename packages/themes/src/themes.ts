import { colors } from "@block-ui/tokens";
import type { BlockTheme, BlockThemeName } from "./types.js";

const shared = {
  border: colors.outline,
  text: colors.textPrimary,
  focus: colors.gold,
  overlay: "rgba(8, 9, 11, 0.72)",
} as const;

export const grassland: BlockTheme = {
  ...shared,
  background: "#1B1E22",
  surface: "#34373C",
  surfaceAlt: "#26292D",
  surfaceHeader: "#2A2D31",
  slot: "#1E2024",
  slotHover: "#2C2F34",
  textMuted: colors.textSecondary,
  primary: colors.grass,
  primaryLight: colors.grassLight,
  primaryDark: colors.grassDark,
  onPrimary: colors.onGrass,
  secondary: colors.wood,
  secondaryLight: colors.woodLight,
  secondaryDark: colors.woodDark,
  onSecondary: colors.onWood,
  texture: "stone",
};

export const cave: BlockTheme = {
  ...shared,
  background: "#121417",
  surface: "#2A2C30",
  surfaceAlt: "#1E2023",
  surfaceHeader: "#232528",
  slot: "#16181A",
  slotHover: "#25272B",
  textMuted: "#BFC4CA",
  primary: colors.gold,
  primaryLight: colors.goldLight,
  primaryDark: colors.goldDark,
  onPrimary: colors.onGold,
  secondary: colors.stone,
  secondaryLight: colors.stoneLight,
  secondaryDark: colors.stoneDark,
  onSecondary: colors.onStone,
  focus: colors.diamond,
  texture: "stone",
};

export const deepslate: BlockTheme = {
  ...shared,
  background: colors.background,
  surface: colors.deepslate,
  surfaceAlt: "#1F1F21",
  surfaceHeader: "#232325",
  slot: "#18181A",
  slotHover: "#2A2A2D",
  textMuted: colors.textSecondary,
  primary: colors.diamond,
  primaryLight: colors.diamondLight,
  primaryDark: colors.diamondDark,
  onPrimary: colors.onDiamond,
  secondary: colors.stone,
  secondaryLight: colors.stoneLight,
  secondaryDark: colors.stoneDark,
  onSecondary: colors.onStone,
  texture: "deepslate",
};

export const nether: BlockTheme = {
  ...shared,
  background: "#190C0C",
  surface: "#3A1818",
  surfaceAlt: "#281010",
  surfaceHeader: "#2F1313",
  slot: "#1E0B0B",
  slotHover: "#331616",
  textMuted: "#E8C9C5",
  primary: colors.lava,
  primaryLight: colors.lavaLight,
  primaryDark: colors.lavaDark,
  onPrimary: colors.onLava,
  secondary: colors.gold,
  secondaryLight: colors.goldLight,
  secondaryDark: colors.goldDark,
  onSecondary: colors.onGold,
  focus: colors.goldLight,
  texture: "netherrack",
};

export const end: BlockTheme = {
  ...shared,
  background: "#0E0A14",
  surface: colors.obsidian,
  surfaceAlt: "#1A1324",
  surfaceHeader: "#1E1629",
  slot: "#120D19",
  slotHover: "#2A1F38",
  textMuted: "#D2C8E0",
  primary: colors.amethyst,
  primaryLight: colors.amethystLight,
  primaryDark: colors.amethystDark,
  onPrimary: colors.onAmethyst,
  secondary: colors.sand,
  secondaryLight: colors.sandLight,
  secondaryDark: colors.sandDark,
  onSecondary: colors.onSand,
  focus: colors.diamond,
  texture: "endStone",
};

export const themes: Record<BlockThemeName, BlockTheme> = {
  grassland,
  cave,
  deepslate,
  nether,
  end,
};

export const defaultThemeName: BlockThemeName = "grassland";
