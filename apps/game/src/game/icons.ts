import {
  ArmorIcon,
  DiamondOreIcon,
  PickaxeIcon,
  SwordIcon,
  createPixelIcon,
  type PixelIconDefinition,
} from "@malilion/block-ui-icons";

/*
 * Extra pixel icons for the game, built with the library's own `createPixelIcon`.
 * Ores and logs reuse the isometric cube grid of `DiamondOreIcon`; tool tiers
 * recolor the existing pickaxe / sword / armor artwork.
 */

const OUTLINE = "#17191c";
const STONE = { base: "#737373", light: "#959595", dark: "#414141" };

const cubePixels = DiamondOreIcon.definition.pixels;

function cube(
  top: string,
  topSpeck: string,
  left: string,
  leftSpeck: string,
  right: string,
  rightSpeck: string,
): PixelIconDefinition {
  return {
    palette: { k: OUTLINE, T: top, t: topSpeck, L: left, l: leftSpeck, R: right, r: rightSpeck },
    pixels: cubePixels,
  };
}

function ore(color: string, dark: string): PixelIconDefinition {
  return cube(STONE.light, color, STONE.base, color, STONE.dark, dark);
}

function recolor(
  definition: PixelIconDefinition,
  swap: Record<string, string>,
): PixelIconDefinition {
  return { pixels: definition.pixels, palette: { ...definition.palette, ...swap } };
}

export const LogIcon = createPixelIcon(
  "LogIcon",
  cube("#aa7843", "#5e3c1c", "#5e3c1c", "#3f2812", "#4a2f15", "#2e1d0c"),
);
export const IronOreIcon = createPixelIcon("IronOreIcon", ore("#e0b896", "#a87850"));
export const GoldOreIcon = createPixelIcon("GoldOreIcon", ore("#f2c94c", "#b88a1b"));

export const WoodPickaxeIcon = createPixelIcon(
  "WoodPickaxeIcon",
  recolor(PickaxeIcon.definition, { w: "#aa7843", g: "#8a5a2b" }),
);
export const StonePickaxeIcon = createPixelIcon(
  "StonePickaxeIcon",
  recolor(PickaxeIcon.definition, { w: STONE.light, g: STONE.base }),
);
export const IronPickaxeIcon = createPixelIcon(
  "IronPickaxeIcon",
  recolor(PickaxeIcon.definition, { w: "#f0f0f0", g: "#9c9c9c" }),
);
export const StoneSwordIcon = createPixelIcon(
  "StoneSwordIcon",
  recolor(SwordIcon.definition, { w: STONE.light, g: STONE.dark }),
);
export const DiamondArmorIcon = createPixelIcon(
  "DiamondArmorIcon",
  recolor(ArmorIcon.definition, { w: "#52d9d0", l: "#a5f3ee", g: "#1e9b93" }),
);

/** Draws an 8 × 8 face at double size so it fills the 16 × 16 icon grid. */
function face(rows: string[], palette: Record<string, string>): PixelIconDefinition {
  const pixels = rows.flatMap((row) => {
    const wide = [...row].map((c) => c + c).join("");
    return [wide, wide];
  });
  return { palette, pixels };
}

export const ZombieIcon = createPixelIcon(
  "ZombieIcon",
  face(
    [
      "gggggggg",
      "gdggggdg",
      "gggggggg",
      "geeggeeg",
      "gggddggg",
      "ggdmmdgg",
      "ggmmmmgg",
      "dggggggd",
    ],
    { g: "#5d9b3d", d: "#356b28", e: "#0f230a", m: "#3f2812" },
  ),
);

export const SkeletonIcon = createPixelIcon(
  "SkeletonIcon",
  face(
    [
      "wwwwwwww",
      "wlwwwwlw",
      "weewweew",
      "weewweew",
      "wwwlewww",
      "wwwwwwww",
      "welelelw",
      "lwwwwwwl",
    ],
    { w: "#e8e4d8", l: "#a8a496", e: "#17191c" },
  ),
);

export const SpiderIcon = createPixelIcon(
  "SpiderIcon",
  face(
    [
      "dddddddd",
      "dbbbbbbd",
      "drrbbrrd",
      "dbbbbbbd",
      "dbrbbrbd",
      "dbbbbbbd",
      "dbwbbwbd",
      "dddddddd",
    ],
    { d: "#1a1a1a", b: "#3b3b3b", r: "#e0473f", w: "#d8d8d8" },
  ),
);

export const BoomSlimeIcon = createPixelIcon(
  "BoomSlimeIcon",
  face(
    [
      "...oo...",
      "..llll..",
      ".lssssl.",
      "lseesees",
      "lssssssl",
      "lssmmssl",
      ".lssssl.",
      "..dddd..",
    ],
    { o: "#e8772e", l: "#a5e07a", s: "#71b84b", e: "#17191c", m: "#b52a24", d: "#356b28" },
  ),
);

export const FireImpIcon = createPixelIcon(
  "FireImpIcon",
  face(
    [
      "r......r",
      "rr....rr",
      "rrrrrrrr",
      "ryyrryyr",
      "rrrrrrrr",
      "rrommorr",
      ".rrrrrr.",
      "..rrrr..",
    ],
    { r: "#b52a24", y: "#fce48c", o: "#e8772e", m: "#140e1c" },
  ),
);

export const VoidWraithIcon = createPixelIcon(
  "VoidWraithIcon",
  face(
    [
      "..pppp..",
      ".pkkkkp.",
      "pkkkkkkp",
      "pkmkkmkp",
      "pkkkkkkp",
      "pkkkkkkp",
      "pkpkkpkp",
      "p.p..p.p",
    ],
    { p: "#3e2d54", k: "#140e1c", m: "#be9bec" },
  ),
);

const speckPixels = [
  "................",
  "..ab.......ab...",
  "..bbd.....abbd..",
  "...dd......dd...",
  ".....ab.........",
  "....abbd.....ab.",
  ".....dd.....abbd",
  ".............dd.",
  ".ab.............",
  "abbd.....ab.....",
  ".dd.....abbd....",
  ".........dd..ab.",
  ".............bbd",
  "....ab........d.",
  "...abbd....ab...",
  "....dd.....bd...",
];

/** Ore specks drawn over the rock texture of a mine tile. */
function specks(name: string, light: string, base: string, dark: string) {
  return createPixelIcon(name, { palette: { a: light, b: base, d: dark }, pixels: speckPixels });
}

export const CoalSpecks = specks("CoalSpecks", "#4a4a4a", "#1a1a1a", "#000000");
export const IronSpecks = specks("IronSpecks", "#f2d6bd", "#d2a07a", "#8a5a3a");
export const GoldSpecks = specks("GoldSpecks", "#fce48c", "#f2c94c", "#b88a1b");
export const LapisSpecks = specks("LapisSpecks", "#7fa6ef", "#3461c9", "#1d3a85");
export const RedstoneSpecks = specks("RedstoneSpecks", "#ff7a70", "#e0473f", "#7a1814");
export const DiamondSpecks = specks("DiamondSpecks", "#e0fffc", "#52d9d0", "#1e9b93");
export const EmeraldSpecks = specks("EmeraldSpecks", "#a5f5b0", "#35b84b", "#1e7a2f");
