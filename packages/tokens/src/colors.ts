/**
 * Block UI color tokens.
 *
 * Base values follow the PRD palette. Each "material" also carries a light
 * highlight, a dark shade (used by the pixel bevel) and an `on` color that is
 * guaranteed to reach WCAG AA (4.5:1) against the base.
 *
 * Deviation from PRD: `stone` is #737373 instead of #777777 so that white text
 * on stone reaches 4.5:1 (#777777 only reaches 4.48:1).
 */
export const colors = {
  grass: "#5D9B3D",
  grassLight: "#7EBE55",
  grassDark: "#356B28",
  onGrass: "#0F230A",

  dirt: "#79553A",
  dirtLight: "#98704F",
  dirtDark: "#553A27",
  onDirt: "#FFFFFF",

  wood: "#8A5A2B",
  woodLight: "#AA7843",
  woodDark: "#5E3C1C",
  onWood: "#FFFFFF",

  stone: "#737373",
  stoneLight: "#959595",
  stoneDark: "#414141",
  onStone: "#FFFFFF",

  deepslate: "#292929",
  deepslateLight: "#3B3B3B",
  deepslateDark: "#1A1A1A",
  onDeepslate: "#FFFFFF",

  sand: "#D8C78E",
  sandLight: "#EDE1B4",
  sandDark: "#A8955C",
  onSand: "#1F1A0B",

  water: "#3B82C4",
  waterLight: "#62A3DE",
  waterDark: "#24568A",
  onWater: "#050E18",

  diamond: "#52D9D0",
  diamondLight: "#A5F3EE",
  diamondDark: "#1E9B93",
  onDiamond: "#0B1F1E",

  emerald: "#35B84B",
  emeraldLight: "#71DD80",
  emeraldDark: "#1E7A2F",
  onEmerald: "#0B1F0E",

  gold: "#F2C94C",
  goldLight: "#FCE48C",
  goldDark: "#B88A1B",
  onGold: "#2A1A05",

  redstone: "#B52A24",
  redstoneLight: "#E0473F",
  redstoneDark: "#7A1814",
  onRedstone: "#FFFFFF",

  obsidian: "#251B31",
  obsidianLight: "#3E2D54",
  obsidianDark: "#140E1C",
  onObsidian: "#FFFFFF",

  nether: "#702929",
  netherLight: "#954040",
  netherDark: "#4A1919",
  onNether: "#FFFFFF",

  amethyst: "#9A6BD6",
  amethystLight: "#BE9BEC",
  amethystDark: "#6A44A0",
  onAmethyst: "#160C24",

  lava: "#E8772E",
  lavaLight: "#FFAE4A",
  lavaDark: "#A8461A",
  onLava: "#200C03",

  iron: "#D8D8D8",
  ironDark: "#9C9C9C",
  coal: "#2E2E2E",

  outline: "#17191C",
  white: "#FFFFFF",
  black: "#000000",

  textPrimary: "#FFFFFF",
  textSecondary: "#C9CDD2",
  textDisabled: "#8A9097",

  background: "#1D2025",
} as const;

export type ColorToken = keyof typeof colors;

/** Materials usable as component variants (buttons, badges, progress, cards). */
export const materials = [
  "grass",
  "dirt",
  "wood",
  "stone",
  "deepslate",
  "sand",
  "water",
  "diamond",
  "emerald",
  "gold",
  "redstone",
  "obsidian",
  "nether",
  "amethyst",
  "lava",
] as const;

export type Material = (typeof materials)[number];

/** Item rarity → material mapping used by slots and tooltips. */
export const rarityColors = {
  common: "textPrimary",
  uncommon: "gold",
  rare: "diamond",
  epic: "amethyst",
  legendary: "lava",
} as const satisfies Record<string, ColorToken>;

export type Rarity = keyof typeof rarityColors;
