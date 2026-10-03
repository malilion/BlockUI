import { createPixelIcon } from "../createPixelIcon";
import { p } from "../palette";

/* World / environment icons used by DayNightIndicator, WeatherIndicator and BiomeIndicator. */

export const SunIcon = /*#__PURE__*/ createPixelIcon("SunIcon", {
  palette: { y: p.gold, l: p.goldDark, w: p.white },
  pixels: [
    "................",
    ".......yy.......",
    "..y....yy....y..",
    "...y........y...",
    "......llll......",
    ".....lyyyyl.....",
    "....lyywyyyl....",
    ".yy.lywyyyyl.yy.",
    ".yy.lyyyyyyl.yy.",
    "....lyyyyyyl....",
    ".....lyyyyl.....",
    "......llll......",
    "...y........y...",
    "..y....yy....y..",
    ".......yy.......",
    "................",
  ],
});

export const MoonIcon = /*#__PURE__*/ createPixelIcon("MoonIcon", {
  palette: { k: p.outline, m: p.sandLight, d: p.iron },
  pixels: [
    "................",
    "................",
    ".....kkkkkk.....",
    "....kmmmmmmk....",
    "...kmmdmmmmmk...",
    "..kmmddmmmmmmk..",
    "..kmmmmmmmdmmk..",
    "..kmmmmmmddmmk..",
    "..kmdmmmmmmmmk..",
    "..kmmmmmmmmmmk..",
    "..kmmmmddmmmmk..",
    "...kmmmddmmmk...",
    "....kmmmmmmk....",
    ".....kkkkkk.....",
    "................",
    "................",
  ],
});

const CLOUD = [
  "......kkkk......",
  ".....kwwwwk.....",
  "...kkwwwwwwk....",
  "..kwwwwwwwwwkk..",
  ".kwwwwwwwwwwwwk.",
  ".kgwwwwwwwwwwgk.",
  "..kggggggggggk..",
  "...kkkkkkkkkk...",
] as const;

export const CloudIcon = /*#__PURE__*/ createPixelIcon("CloudIcon", {
  palette: { k: p.outline, w: p.white, g: p.iron },
  pixels: [
    "................",
    "................",
    "................",
    ...CLOUD,
    "................",
    "................",
    "................",
    "................",
    "................",
  ],
});

export const RainIcon = /*#__PURE__*/ createPixelIcon("RainIcon", {
  palette: { k: p.outline, w: p.white, g: p.iron, b: p.waterLight },
  pixels: [
    "................",
    ...CLOUD,
    "................",
    "...b...b...b....",
    "..b...b...b.....",
    "................",
    ".....b...b...b..",
    "....b...b...b...",
    "................",
  ],
});

export const ThunderIcon = /*#__PURE__*/ createPixelIcon("ThunderIcon", {
  palette: { k: p.outline, w: p.iron, g: p.stone, y: p.goldLight },
  pixels: [
    ...CLOUD,
    "................",
    "......yyy.......",
    ".....yyy........",
    "....yyyyyy......",
    ".......yy.......",
    "......yy........",
    ".....y..........",
    "................",
  ],
});

export const SnowIcon = /*#__PURE__*/ createPixelIcon("SnowIcon", {
  palette: { s: p.diamondLight },
  pixels: [
    "................",
    ".......ss.......",
    "....s..ss..s....",
    ".....s.ss.s.....",
    "......ssss......",
    "..s....ss....s..",
    "...s...ss...s...",
    ".ssssssssssssss.",
    ".ssssssssssssss.",
    "...s...ss...s...",
    "..s....ss....s..",
    "......ssss......",
    ".....s.ss.s.....",
    "....s..ss..s....",
    ".......ss.......",
    "................",
  ],
});

export const TreeIcon = /*#__PURE__*/ createPixelIcon("TreeIcon", {
  palette: { k: p.outline, l: p.grassLight, g: p.grass, d: p.grassDark, t: p.wood },
  pixels: [
    "................",
    ".....kkkkkk.....",
    "...kkllllllkk...",
    "..kllggllggllk..",
    "..klggggggggdk..",
    ".klggglgggggddk.",
    ".kgggggggggdddk.",
    ".kggggggggddddk.",
    "..kdgggggddddk..",
    "...kkkddddkkk...",
    "......kttk......",
    "......kttk......",
    "......kttk......",
    ".....kttttk.....",
    "....kkkkkkkk....",
    "................",
  ],
});

export const WaveIcon = /*#__PURE__*/ createPixelIcon("WaveIcon", {
  palette: { l: p.white, b: p.water, d: p.waterDark },
  pixels: [
    "................",
    "................",
    "................",
    "................",
    "................",
    "..ll......ll....",
    ".lbbl....lbbl...",
    "lbbbbl..lbbbbl..",
    "bbbbbbllbbbbbbll",
    "bbbbbbbbbbbbbbbb",
    "bbbdbbbbbbbdbbbb",
    "dddddddddddddddd",
    "................",
    "................",
    "................",
    "................",
  ],
});
