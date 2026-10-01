import { createPixelIcon } from "../createPixelIcon";
import { p } from "../palette";

/* HUD icons used by HealthBar, ArmorBar, HungerBar and XPBar. */

export const HeartIcon = /*#__PURE__*/ createPixelIcon("HeartIcon", {
  palette: { k: p.outline, w: p.heartLight, r: p.heart, d: p.heartDark },
  pixels: [
    "................",
    "................",
    "..kkkk....kkkk..",
    ".kwwrrk..krrrrk.",
    "kwwrrrrkkrrrrrdk",
    "kwrrrrrrrrrrrrdk",
    "krrrrrrrrrrrrrdk",
    "krrrrrrrrrrrrrdk",
    ".krrrrrrrrrrrdk.",
    "..krrrrrrrrrdk..",
    "...krrrrrrrdk...",
    "....krrrrrdk....",
    ".....krrrdk.....",
    "......krdk......",
    ".......kk.......",
    "................",
  ],
});

export const ArmorIcon = /*#__PURE__*/ createPixelIcon("ArmorIcon", {
  palette: { k: p.outline, w: p.iron, l: p.ironLight, g: p.ironDark },
  pixels: [
    "................",
    ".kkkkk....kkkkk.",
    "kllllgk..kwwwggk",
    "klwwwgkkkkwwwggk",
    "klwwwwwwwwwwwggk",
    "kkklwwwwwwwwwgkk",
    "..klwwwwwwwwwgk.",
    "..klwwwwwwwwwgk.",
    "..klwwwwwwwwwgk.",
    "..klwwwwwwwwwgk.",
    "..klwwwwwwwwwgk.",
    "..klwwwwwwwwwgk.",
    "..klwwwwwwwwwgk.",
    "..kgggggggggggk.",
    "..kkkkkkkkkkkkk.",
    "................",
  ],
});

export const FoodIcon = /*#__PURE__*/ createPixelIcon("FoodIcon", {
  palette: { k: p.outline, m: p.meat, l: p.meatLight, d: p.meatDark, b: p.bone },
  pixels: [
    "................",
    ".......kkkkk....",
    "......kmmmmmkk..",
    ".....kmlmmmmmdk.",
    "....kmllmmmmmdk.",
    "....kmlmmmmmmdk.",
    "....kmmmmmmmddk.",
    ".....kmmmmmddk..",
    "....kkkdddddk...",
    "...kbbkkkkkk....",
    "..kbbk..........",
    ".kbbbk..........",
    "kbbbk...........",
    ".kkk............",
    "................",
    "................",
  ],
});

export const XPOrbIcon = /*#__PURE__*/ createPixelIcon("XPOrbIcon", {
  palette: { k: p.outline, l: p.emeraldLight, b: p.emerald, d: p.emeraldDark, w: p.goldLight },
  pixels: [
    "................",
    ".......kk.......",
    ".....kkllkk.....",
    "....kllbbllk....",
    "...klblbbbblk...",
    "..klbllllbbblk..",
    "..kllwwllbbbdk..",
    ".klbbllllbbbblk.",
    ".klbblllbbbbbdk.",
    "..klbbbbbbbbdk..",
    "..klbbbbbbbbdk..",
    "...klbbbbbbdk...",
    "....kldbbddk....",
    ".....kkldkk.....",
    ".......kk.......",
    "................",
  ],
});
