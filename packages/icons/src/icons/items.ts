import { createPixelIcon } from "../createPixelIcon";
import { p } from "../palette";

/* Item icons — original pixel artwork in an abstract block style (PRD §56). */

export const DiamondIcon = /*#__PURE__*/ createPixelIcon("DiamondIcon", {
  palette: { k: p.outline, l: p.diamondLight, b: p.diamond, d: p.diamondDark, w: p.white },
  pixels: [
    "................",
    "....kkkkkkkk....",
    "...kllllllllk...",
    "..klbbbbbbbblk..",
    ".klbbwwbbbbbblk.",
    "klbbbwbbbbbbbblk",
    "klbbbbbbbbbbbbdk",
    ".klbbbbbbbbbbdk.",
    "..klbbbbbbbbdk..",
    "...klbbbbbbdk...",
    "....klbbbbdk....",
    ".....klbbdk.....",
    ".....klbbdk.....",
    "......kldk......",
    ".......kk.......",
    "................",
  ],
});

export const EmeraldIcon = /*#__PURE__*/ createPixelIcon("EmeraldIcon", {
  palette: { k: p.outline, l: p.emeraldLight, b: p.emerald, d: p.emeraldDark, w: p.white },
  pixels: [
    ".......kk.......",
    "......kllk......",
    "....kklbblkk....",
    "...kllbbbbllk...",
    "..klbbbwbbbblk..",
    "..klbbwbbbbbdk..",
    "..klbbwbbbbbdk..",
    "..klbbbbbbbbdk..",
    "..klbbbbbbbbdk..",
    "..klbbbbbbbbdk..",
    "..klbbbbbbbbdk..",
    "..klbbbbbbbbdk..",
    "...kldbbbbddk...",
    "....kklbbdkk....",
    "......kldk......",
    ".......kk.......",
  ],
});

const ingotPixels = [
  "................",
  "................",
  "................",
  "................",
  "....kkkkkkkk....",
  "...kllllllllk...",
  "..kllwwllllllk..",
  ".kllllllllllllk.",
  "kbbbbbbbbbbbbbdk",
  "kbbbbbbbbbbbbbdk",
  "kbbbbbbbbbbbbbdk",
  "kddddddddddddddk",
  ".kkkkkkkkkkkkkk.",
  "................",
  "................",
  "................",
] as const;

export const GoldIcon = /*#__PURE__*/ createPixelIcon("GoldIcon", {
  palette: { k: p.outline, l: p.goldLight, b: p.gold, d: p.goldDark, w: p.white },
  pixels: ingotPixels,
});

export const IronIcon = /*#__PURE__*/ createPixelIcon("IronIcon", {
  palette: { k: p.outline, l: p.ironLight, b: p.iron, d: p.ironDark, w: p.white },
  pixels: ingotPixels,
});

export const RedstoneIcon = /*#__PURE__*/ createPixelIcon("RedstoneIcon", {
  palette: { k: p.outline, l: p.redstoneLight, b: p.redstone, d: p.redstoneDark },
  pixels: [
    "................",
    ".........kk.....",
    "...kkkk.kllk....",
    "..kllllklbblk...",
    "..klbbdklbbdk...",
    "..klbbdkkldk....",
    "..klddbllkk.....",
    "...kkklbblkkk...",
    "....kklbbblllk..",
    "...kllkldbbbdk..",
    "..klbblkklbbdk..",
    "..klbbdkkldddk..",
    "...kldk..kkkk...",
    "....kk..........",
    "................",
    "................",
  ],
});

export const CoalIcon = /*#__PURE__*/ createPixelIcon("CoalIcon", {
  palette: { k: p.outline, l: p.coalLight, b: p.coal, d: p.coalDark },
  pixels: [
    "................",
    ".......kkkk.....",
    "....kkkllllk....",
    "...klllbbbblk...",
    "..klbbbbbbbblk..",
    "..klbbbbbblbblk.",
    ".klbblbbbbbbbdk.",
    ".klbbbbbbbbbbdk.",
    ".klbbbbbbbbbbdk.",
    ".klbbbbbblbbbdk.",
    "..klbblbbbbbbdk.",
    "..klbbbbbbbbdk..",
    "...klbbbbbbdk...",
    "...klddddddk....",
    "....kkkkkkk.....",
    "................",
  ],
});

const swordPixels = [
  "................",
  "............kkk.",
  "...........kwwk.",
  "..........kwwgk.",
  ".........kwwgk..",
  "........kwwgk...",
  ".......kwwgk....",
  "..kk..kwwgk.....",
  "..khkkwwgk......",
  "...khwwgk.......",
  "...kkhgk........",
  "..kbkkhk........",
  ".kbk..khk.......",
  "kbk....kk.......",
  "kkk.............",
  "................",
] as const;

export const SwordIcon = /*#__PURE__*/ createPixelIcon("SwordIcon", {
  palette: { k: p.outline, w: p.ironLight, g: p.ironDark, h: p.woodDark, b: p.wood },
  pixels: swordPixels,
});

export const DiamondSwordIcon = /*#__PURE__*/ createPixelIcon("DiamondSwordIcon", {
  palette: { k: p.outline, w: p.diamondLight, g: p.diamondDark, h: p.woodDark, b: p.wood },
  pixels: swordPixels,
});

export const PickaxeIcon = /*#__PURE__*/ createPixelIcon("PickaxeIcon", {
  palette: { k: p.outline, w: p.diamondLight, g: p.diamond, b: p.woodDark, B: p.wood },
  pixels: [
    "................",
    "....kkkkkkk.....",
    "..kkwwwwwwwkk...",
    ".kwwggggggwwwk..",
    ".kkk.kkkkkbgwwk.",
    ".........kBkgwk.",
    "........kBk.kgwk",
    ".......kBk..kgwk",
    "......kBk....kgk",
    ".....kBk.....kk.",
    "....kBk.........",
    "...kBk..........",
    "..kBk...........",
    ".kBk............",
    ".kk.............",
    "................",
  ],
});

export const AxeIcon = /*#__PURE__*/ createPixelIcon("AxeIcon", {
  palette: { k: p.outline, w: p.ironLight, g: p.ironDark, B: p.wood },
  pixels: [
    "................",
    "......kkk.......",
    ".....kwwwk.kk...",
    "....kwwwggkBBk..",
    "....kwwggkBBk...",
    "....kwggkBBk....",
    ".....kgkBBk.....",
    "......kBBk......",
    ".....kBBk.......",
    "....kBBk........",
    "...kBBk.........",
    "..kBBk..........",
    ".kBBk...........",
    ".kkk............",
    "................",
    "................",
  ],
});

export const ShovelIcon = /*#__PURE__*/ createPixelIcon("ShovelIcon", {
  palette: { k: p.outline, w: p.ironLight, g: p.ironDark, b: p.woodDark, B: p.wood },
  pixels: [
    "................",
    "..........kkk...",
    ".........kwwwk..",
    ".........kwwgwk.",
    "........kwwwgwk.",
    ".........kwgwk..",
    "........kBkkk...",
    ".......kbk......",
    "......kBk.......",
    ".....kbk........",
    "....kBk.........",
    "...kbk..........",
    "..kBk...........",
    ".kbk............",
    "kBk.............",
    ".k..............",
  ],
});

export const ChestIcon = /*#__PURE__*/ createPixelIcon("ChestIcon", {
  palette: { k: p.outline, l: p.woodLight, w: p.wood, d: p.woodDark, g: p.gold },
  pixels: [
    "................",
    "................",
    ".kkkkkkkkkkkkkk.",
    ".kllllllllllllk.",
    ".kwwwwwwwwwwwwk.",
    ".kwwwwwwwwwwwwk.",
    ".kddddddddddddk.",
    ".kkkkkkggkkkkkk.",
    ".kwwwwwggwwwwwk.",
    ".kwwwwwkkwwwwwk.",
    ".kwwwwwwwwwwwwk.",
    ".kwwwwwwwwwwwwk.",
    ".kwwwwwwwwwwwwk.",
    ".kddddddddddddk.",
    ".kkkkkkkkkkkkkk.",
    "................",
  ],
});

export const AppleIcon = /*#__PURE__*/ createPixelIcon("AppleIcon", {
  palette: {
    k: p.outline,
    l: p.heartLight,
    b: p.heart,
    d: p.heartDark,
    w: p.white,
    s: p.woodDark,
    g: p.grass,
  },
  pixels: [
    "................",
    "........kk......",
    ".......kskkk....",
    ".......ksggk....",
    "....kkkkskkk....",
    "...kllbbbbllk...",
    "..klbwbbbbbblk..",
    ".klbwbbbbbbbblk.",
    ".klbwbbbbbbbbdk.",
    ".klbbbbbbbbbbdk.",
    ".klbbbbbbbbbbdk.",
    ".klbbbbbbbbbbdk.",
    "..klbbbbbbbbdk..",
    "...kldbbbbddk...",
    "....kkldddkk....",
    "......kkkk......",
  ],
});

export const BreadIcon = /*#__PURE__*/ createPixelIcon("BreadIcon", {
  palette: { k: p.outline, l: p.sandLight, b: p.woodLight, d: p.wood },
  pixels: [
    "................",
    "................",
    "................",
    "................",
    ".....kkkkkk.....",
    "...kkllllllkk...",
    "..kllbbbbbbllk..",
    ".klbbdbbdbbdblk.",
    "klbbbbdbbdbbdblk",
    "klbbbbbbbbbbbbdk",
    ".klbbbbbbbbbbdk.",
    "..kldbbbbbbddk..",
    "...kkldddddkk...",
    ".....kkkkkk.....",
    "................",
    "................",
  ],
});

export const BucketIcon = /*#__PURE__*/ createPixelIcon("BucketIcon", {
  palette: { k: p.outline, w: p.iron, g: p.ironDark, b: p.water },
  pixels: [
    "................",
    "................",
    "....kkkkkkkk....",
    "...k........k...",
    "..kkkkkkkkkkkk..",
    "..kbbbbbbbbbbk..",
    "..kkkkkkkkkkkk..",
    "..kwwwwwwwwwgk..",
    "...kwwwwwwwgk...",
    "...kwwwwwwwgk...",
    "...kwwwwwwwgk...",
    "....kwwwwwgk....",
    "....kwwwwwgk....",
    "....kkkkkkkk....",
    "................",
    "................",
  ],
});

export const TorchIcon = /*#__PURE__*/ createPixelIcon("TorchIcon", {
  palette: { k: p.outline, y: p.flameCore, o: p.flame, b: p.wood, B: p.woodDark },
  pixels: [
    "................",
    "......kkkk......",
    ".....kyyyyk.....",
    ".....kyooyk.....",
    "......kook......",
    "......kbbk......",
    "......kbBk......",
    "......kbBk......",
    "......kbBk......",
    "......kbBk......",
    "......kbBk......",
    "......kbBk......",
    "......kbBk......",
    "......kkkk......",
    "................",
    "................",
  ],
});

export const FireIcon = /*#__PURE__*/ createPixelIcon("FireIcon", {
  palette: { k: p.outline, o: p.flame, y: p.flameCore, w: p.white },
  pixels: [
    ".......kk.......",
    "......kook......",
    "......koook.....",
    ".....koooook....",
    "....kkoooook....",
    "...kokooooook...",
    "..koooooyooook..",
    "..kooooyyyoook..",
    "..kooooyyyoook..",
    "..kooooyyyoook..",
    "..kooyyyyyoook..",
    "..kooyyywyoook..",
    "..koooywwyook...",
    "...kooowwook....",
    "....koooook.....",
    ".....kkkkk......",
  ],
});

export const CoinIcon = /*#__PURE__*/ createPixelIcon("CoinIcon", {
  palette: { k: p.outline, l: p.goldLight, b: p.gold, d: p.goldDark, w: p.white },
  pixels: [
    "................",
    ".....kkkkkk.....",
    "...kkllllllkk...",
    "..kllbbbbbbllk..",
    "..klbwbbbbbbdk..",
    ".klbwbddddbbblk.",
    ".klbbdbbbbdbbdk.",
    ".klbbdbbbbdbbdk.",
    ".klbbdbbbbdbbdk.",
    ".klbbdbbbbdbbdk.",
    ".klbbbddddbbbdk.",
    "..klbbbbbbbbdk..",
    "..kldbbbbbbddk..",
    "...kkldddddkk...",
    ".....kkkkkk.....",
    "................",
  ],
});

export const ClockIcon = /*#__PURE__*/ createPixelIcon("ClockIcon", {
  palette: { k: p.outline, f: p.gold, b: p.sandLight, h: p.outline },
  pixels: [
    "................",
    ".....kkkkkk.....",
    "...kkffffffkk...",
    "..kffbbbbbbffk..",
    "..kfbbbbhbbbfk..",
    ".kfbbbbbhbbbbfk.",
    ".kfbbbbbhbbbbfk.",
    ".kfbbbbbhbbbbfk.",
    ".kfbbbbbhhbbbfk.",
    ".kfbbbbbbbhbbfk.",
    ".kfbbbbbbbbbbfk.",
    "..kfbbbbbbbbfk..",
    "..kffbbbbbbffk..",
    "...kkffffffkk...",
    ".....kkkkkk.....",
    "................",
  ],
});

export const CompassIcon = /*#__PURE__*/ createPixelIcon("CompassIcon", {
  palette: { k: p.outline, f: p.ironDark, b: p.iron, r: p.redstone, h: p.stoneDark },
  pixels: [
    "................",
    ".....kkkkkk.....",
    "...kkffffffkk...",
    "..kffbbbbbbffk..",
    "..kfbbbbbrbbfk..",
    ".kfbbbbbbrbbbfk.",
    ".kfbbbbbrbbbbfk.",
    ".kfbbbbbrbbbbfk.",
    ".kfbbbbhbbbbbfk.",
    ".kfbbbbhbbbbbfk.",
    ".kfbbbhbbbbbbfk.",
    "..kfbbhbbbbbfk..",
    "..kffbbbbbbffk..",
    "...kkffffffkk...",
    ".....kkkkkk.....",
    "................",
  ],
});

/* Isometric blocks share one silhouette with different materials. */
const cubePixels = [
  "......kkkk......",
  "....kkTTTTkk....",
  "..kkTTtTTTTTkk..",
  "kkTTTTTTTtTTTTkk",
  "kLLkkTTTTTTkkRRk",
  "kLLLLkkTTkkRRRRk",
  "kLLLLLLkkRRRRRRk",
  "kLlLLLlLRRrRRRRk",
  "kLLLLlLLRRRRrRRk",
  "klLLLLLLRrRRRRRk",
  "kLLLlLLLRRRRRrRk",
  "kLLLLLLlRRrRRRRk",
  "kkLLLLLLRRRRRRkk",
  "..kkLlLLRRRrkk..",
  "....kkLLRRkk....",
  "......kkkk......",
] as const;

function cube(
  top: string,
  topSpeck: string,
  left: string,
  leftSpeck: string,
  right: string,
  rightSpeck: string,
) {
  return {
    palette: { k: p.outline, T: top, t: topSpeck, L: left, l: leftSpeck, R: right, r: rightSpeck },
    pixels: cubePixels,
  };
}

export const PlanksIcon = /*#__PURE__*/ createPixelIcon(
  "PlanksIcon",
  cube(p.woodLight, p.woodDark, p.wood, p.woodDark, p.woodDark, p.wood),
);

export const StoneIcon = /*#__PURE__*/ createPixelIcon(
  "StoneIcon",
  cube(p.stoneLight, p.stone, p.stone, p.stoneLight, p.stoneDark, p.stone),
);

export const DirtIcon = /*#__PURE__*/ createPixelIcon(
  "DirtIcon",
  cube(p.dirtLight, p.dirtDark, p.dirt, p.dirtDark, p.dirtDark, p.dirt),
);

export const SandIcon = /*#__PURE__*/ createPixelIcon(
  "SandIcon",
  cube(p.sandLight, p.sand, p.sand, p.sandDark, p.sandDark, p.sand),
);

export const ObsidianIcon = /*#__PURE__*/ createPixelIcon(
  "ObsidianIcon",
  cube(p.obsidianLight, p.amethystDark, p.obsidian, p.obsidianLight, p.obsidianDark, p.obsidian),
);

export const DiamondOreIcon = /*#__PURE__*/ createPixelIcon(
  "DiamondOreIcon",
  cube(p.stoneLight, p.diamond, p.stone, p.diamond, p.stoneDark, p.diamondDark),
);

export const BookIcon = /*#__PURE__*/ createPixelIcon("BookIcon", {
  palette: {
    k: p.outline,
    b: p.amethyst,
    l: p.amethystLight,
    d: p.amethystDark,
    p: p.sandLight,
    g: p.gold,
    w: p.goldLight,
  },
  pixels: [
    "................",
    "...kkkkkkkkkk...",
    "..kbbbbbbbbbpk..",
    "..kbllllllbbpk..",
    "..kblbbbbbbbpk..",
    "..kbbbggggbbpk..",
    "..kbbbgwwgbbpk..",
    "..kbbbggggbbpk..",
    "..kbbbbbbbbbpk..",
    "..kbbbbbbbbbpk..",
    "..kbbbbbbbbbpk..",
    "..kbbbbbbbbbpk..",
    "..kdddddddddpk..",
    "...kkkkkkkkkk...",
    "................",
    "................",
  ],
});
