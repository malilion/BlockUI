import { createPixelIcon } from "../createPixelIcon";
import { p } from "../palette";

/* Full-color navigation icons (sidebar, hotbar navigation). */

export const HomeIcon = /*#__PURE__*/ createPixelIcon("HomeIcon", {
  palette: {
    k: p.outline,
    r: p.redstoneLight,
    R: p.redstone,
    w: p.wood,
    d: p.woodDark,
    b: p.diamond,
  },
  pixels: [
    "................",
    ".......kk.......",
    "......krrk......",
    ".....krrRRk.....",
    "....krrrrRRk....",
    "...krrrrrrRRk...",
    "..krrrrrrrrRRk..",
    ".kkkkkkkkkkkkkk.",
    "..kwwwwwwwwwwk..",
    "..kwbbwwwwddwk..",
    "..kwbbwwwwddwk..",
    "..kwwwwwwwddwk..",
    "..kwwwwwwwddwk..",
    "..kwwwwwwwddwk..",
    "..kkkkkkkkkkkk..",
    "................",
  ],
});

export const InventoryIcon = /*#__PURE__*/ createPixelIcon("InventoryIcon", {
  palette: { k: p.outline, w: p.wood, l: p.woodLight, d: p.woodDark, g: p.gold },
  pixels: [
    "................",
    "......kkkk......",
    ".....kddddk.....",
    ".....kd..dk.....",
    "...kkkkkkkkkk...",
    "..kllllllllllk..",
    "..kwwwwwwwwwwk..",
    "..kwwwwwwwwwwk..",
    "..kkkkkggkkkkk..",
    "..kwwwwggwwwwk..",
    "..kwwwwwwwwwwk..",
    "..kwwwwwwwwwwk..",
    "..kwwwwwwwwwwk..",
    "..kddddddddddk..",
    "...kkkkkkkkkk...",
    "................",
  ],
});

/** A 3 × 3 crafting grid holding a pickaxe recipe. */
export const CraftingIcon = /*#__PURE__*/ createPixelIcon("CraftingIcon", {
  palette: { k: p.woodDark, w: p.woodLight, b: p.diamond, s: p.sandDark },
  pixels: [
    "................",
    "................",
    "..kkkkkkkkkkkkk.",
    "..kwwwkwwwkwwwk.",
    "..kwbwkwbwkwbwk.",
    "..kwwwkwwwkwwwk.",
    "..kkkkkkkkkkkkk.",
    "..kwwwkwswkwwwk.",
    "..kwwwkwswkwwwk.",
    "..kwwwkwswkwwwk.",
    "..kkkkkkkkkkkkk.",
    "..kwwwkwswkwwwk.",
    "..kwwwkwswkwwwk.",
    "..kwwwkwswkwwwk.",
    "..kkkkkkkkkkkkk.",
    "................",
  ],
});

const grassBlockPixels = [
  "......kkkk......",
  "....kkggggkk....",
  "..kkggGgggggkk..",
  "kkgggggggGggggkk",
  "kLLkkggggggkkRRk",
  "kLLLLkkggkkRRRRk",
  "kLLLLLLkkRRRRRRk",
  "kLeLLeLLRRfRRfRk",
  "keeLeeeeffRffffk",
  "keeeeeeefffffffk",
  "keeeeheefffffhfk",
  "keeeeeeefffffffk",
  "kkeeeeeeffffffkk",
  "..kkeeeeffffkk..",
  "....kkeeffkk....",
  "......kkkk......",
] as const;

const grassBlockPalette = {
  k: p.outline,
  g: p.grass,
  G: p.grassLight,
  L: p.grass,
  R: p.grassDark,
  e: p.dirt,
  f: p.dirtDark,
  h: p.dirtDark,
} as const;

export const WorldIcon = /*#__PURE__*/ createPixelIcon("WorldIcon", {
  palette: grassBlockPalette,
  pixels: grassBlockPixels,
});

export const GrassBlockIcon = /*#__PURE__*/ createPixelIcon("GrassBlockIcon", {
  palette: grassBlockPalette,
  pixels: grassBlockPixels,
});

export const QuestIcon = /*#__PURE__*/ createPixelIcon("QuestIcon", {
  palette: { k: p.outline, P: p.paperDark, p: p.paper, d: p.woodDark },
  pixels: [
    "................",
    "..kkkkkkkkkkkk..",
    ".kPPPPPPPPPPPPk.",
    ".kkkkkkkkkkkkkk.",
    "..kppppppppppk..",
    "..kpddddddddpk..",
    "..kppppppppppk..",
    "..kpddddddpppk..",
    "..kppppppppppk..",
    "..kpddddddddpk..",
    "..kppppppppppk..",
    "..kpdddddppppk..",
    "..kppppppppppk..",
    ".kkkkkkkkkkkkkk.",
    ".kPPPPPPPPPPPPk.",
    "..kkkkkkkkkkkk..",
  ],
});

/** A blocky adventurer head — original artwork. */
export const PlayerIcon = /*#__PURE__*/ createPixelIcon("PlayerIcon", {
  palette: {
    k: p.outline,
    h: p.dirtDark,
    s: p.skin,
    d: p.skinDark,
    w: p.white,
    b: p.waterDark,
    m: p.dirtDark,
    c: p.grass,
    C: p.grassDark,
  },
  pixels: [
    "................",
    "..kkkkkkkkkkkk..",
    "..khhhhhhhhhhk..",
    "..khhhhhhhhhhk..",
    "..khsssssssshk..",
    "..kssssssssssk..",
    "..kswwsssswwsk..",
    "..ksbwsssswbsk..",
    "..kssssddssssk..",
    "..ksssmmmmsssk..",
    "..kssssssssssk..",
    "..kkkkkkkkkkkk..",
    ".kccccccccccCCk.",
    ".kccccccccccCCk.",
    ".kccccccccccCCk.",
    ".kkkkkkkkkkkkkk.",
  ],
});

export const AchievementIcon = /*#__PURE__*/ createPixelIcon("AchievementIcon", {
  palette: { k: p.outline, Y: p.goldLight, g: p.gold, y: p.goldDark, w: p.wood },
  pixels: [
    "................",
    "...kkkkkkkkkk...",
    ".kkkYggggggykkk.",
    ".kgkYggggggykgk.",
    ".kgkYggggggykgk.",
    ".kkkYggggggykkk.",
    "...kYggggggyk...",
    "....kggggggk....",
    ".....kggggk.....",
    "......kyyk......",
    "......kggk......",
    ".....kyyyyk.....",
    "....kkkkkkkk....",
    "....kwwwwwwk....",
    "....kkkkkkkk....",
    "................",
  ],
});

export const SettingsIcon = /*#__PURE__*/ createPixelIcon("SettingsIcon", {
  palette: { k: p.outline, l: p.stoneLight, b: p.stone, d: p.stoneDark },
  pixels: [
    ".......kk.......",
    "......kllk......",
    "...kkkkldkkkk...",
    "..kllllbbllllk..",
    "..klbbbbbbbbdk..",
    "..klbbbbbbbbdk..",
    ".kklbbkkkkbbdkk.",
    "kllbbbk..kbbbllk",
    "kldbbbk..kbbbddk",
    ".kklbbkkkkbbdkk.",
    "..klbbbbbbbbdk..",
    "..klbbbbbbbbdk..",
    "..kldddbbddddk..",
    "...kkkkldkkkk...",
    "......kldk......",
    ".......kk.......",
  ],
});
