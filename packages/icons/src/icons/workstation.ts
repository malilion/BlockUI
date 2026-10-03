import { createPixelIcon } from "../createPixelIcon";
import { p } from "../palette";

/* Items and blocks used by EnchantingTable, BrewingStand and Anvil. */

/** Potion bottle; the liquid uses `currentColor`, so set `color` to tint it. */
export const PotionIcon = /*#__PURE__*/ createPixelIcon("PotionIcon", {
  palette: { k: p.outline, b: p.wood, w: p.white },
  pixels: [
    "................",
    "......kkkk......",
    "......kbbk......",
    ".......kk.......",
    "......kwwk......",
    "......kwwk......",
    ".....kwwwwk.....",
    "....kwxxxxwk....",
    "...kwxxxxxxwk...",
    "...kxxxwxxxxk...",
    "...kxxwxxxxxk...",
    "...kxxxxxxxxk...",
    "...kxxxxxxxxk...",
    "....kxxxxxxk....",
    ".....kkkkkk.....",
    "................",
  ],
});

export const LapisIcon = /*#__PURE__*/ createPixelIcon("LapisIcon", {
  palette: { k: p.outline, l: p.waterLight, b: p.water, d: p.waterDark, w: p.white },
  pixels: [
    "................",
    "................",
    "......kkkk......",
    ".....kllbbk.....",
    "....klbbbbbk....",
    "...klbbwbbbdk...",
    "..kbbbbbbbbddk..",
    "..kbbbbbbbbbdk..",
    "..kbbdbbbbbddk..",
    "...kbbbbbbddk...",
    "....kbbbbddk....",
    ".....kbdddk.....",
    "......kkkk......",
    "................",
    "................",
    "................",
  ],
});

export const BlazePowderIcon = /*#__PURE__*/ createPixelIcon("BlazePowderIcon", {
  palette: { y: p.goldLight, o: p.lava, l: p.white, k: p.lavaDark },
  pixels: [
    "................",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................",
    ".......yy.......",
    ".....yoyyo......",
    "....yooyoooy....",
    "...yooooyooooy..",
    "..yoooolooooooy.",
    "..kkkkkkkkkkkkk.",
    "................",
    "................",
  ],
});

export const AnvilIcon = /*#__PURE__*/ createPixelIcon("AnvilIcon", {
  palette: { k: p.outline, l: p.white, s: p.iron, d: p.ironDark },
  pixels: [
    "................",
    "................",
    "................",
    "..kkkkkkkkkkkk..",
    ".kllllllllllldk.",
    ".kssssssssssddk.",
    "..kkkssssddkkk..",
    ".....kssdk......",
    ".....kssdk......",
    "....kkssdkk.....",
    "...kssssssddk...",
    "..kssssssssddk..",
    "..kkkkkkkkkkkk..",
    "................",
    "................",
    "................",
  ],
});
