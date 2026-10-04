import {
  AppleIcon,
  ArmorIcon,
  AxeIcon,
  BreadIcon,
  CoalIcon,
  DiamondIcon,
  DiamondSwordIcon,
  DirtIcon,
  EmeraldIcon,
  GoldIcon,
  IronIcon,
  LapisIcon,
  ObsidianIcon,
  PickaxeIcon,
  PlanksIcon,
  RedstoneIcon,
  SandIcon,
  ShovelIcon,
  StoneIcon,
  SwordIcon,
  type PixelIcon,
} from "@malilion/block-ui-icons";
import type { BiomeType, ItemRarity } from "@malilion/block-ui-react";
import type { BlockThemeName } from "@malilion/block-ui-themes";
import {
  BoomSlimeIcon,
  CoalSpecks,
  DiamondSpecks,
  EmeraldSpecks,
  GoldSpecks,
  IronSpecks,
  LapisSpecks,
  RedstoneSpecks,
  DiamondArmorIcon,
  FireImpIcon,
  GoldOreIcon,
  IronOreIcon,
  IronPickaxeIcon,
  LogIcon,
  SkeletonIcon,
  SpiderIcon,
  StonePickaxeIcon,
  StoneSwordIcon,
  VoidWraithIcon,
  WoodPickaxeIcon,
  ZombieIcon,
} from "./icons";

/* ───────────────────────────── Items ───────────────────────────── */

export type ToolKind = "pickaxe" | "axe" | "shovel" | "sword";

export interface ToolStats {
  kind: ToolKind;
  /** Mining tier: 1 wood, 2 stone, 3 iron, 4 diamond. */
  tier: number;
  /** Damage dealt to a block per hit with the right tool. */
  power: number;
  /** Damage dealt to monsters. */
  damage: number;
  durability: number;
}

export interface ItemDef {
  name: string;
  icon: PixelIcon;
  rarity: ItemRarity;
  description: string;
  stack: number;
  food?: number;
  tool?: ToolStats;
  armor?: number;
  /** Fuel units when burned in the furnace (1 unit smelts one item). */
  fuel?: number;
}

export const items = {
  log: {
    name: "橡木原木",
    icon: LogIcon,
    rarity: "common",
    stack: 64,
    fuel: 2,
    description: "從樹上砍下來的,可以合成木板。",
  },
  planks: {
    name: "木板",
    icon: PlanksIcon,
    rarity: "common",
    stack: 64,
    fuel: 1,
    description: "所有初期工具的基礎材料。",
  },
  dirt: {
    name: "泥土",
    icon: DirtIcon,
    rarity: "common",
    stack: 64,
    description: "就是土,一文不值。",
  },
  sand: {
    name: "沙子",
    icon: SandIcon,
    rarity: "common",
    stack: 64,
    description: "在地表附近找得到。",
  },
  cobble: {
    name: "鵝卵石",
    icon: StoneIcon,
    rarity: "common",
    stack: 64,
    description: "堅硬的石頭,可做石製工具。",
  },
  coal: {
    name: "煤炭",
    icon: CoalIcon,
    rarity: "common",
    stack: 64,
    fuel: 8,
    description: "耐燒,每塊可熔煉 8 個物品。",
  },
  ironOre: {
    name: "鐵礦",
    icon: IronOreIcon,
    rarity: "uncommon",
    stack: 64,
    description: "放進熔爐熔煉。",
  },
  goldOre: {
    name: "金礦",
    icon: GoldOreIcon,
    rarity: "uncommon",
    stack: 64,
    description: "放進熔爐熔煉。",
  },
  iron: {
    name: "鐵錠",
    icon: IronIcon,
    rarity: "uncommon",
    stack: 64,
    description: "用來做鐵製工具和盔甲。",
  },
  gold: {
    name: "金錠",
    icon: GoldIcon,
    rarity: "rare",
    stack: 64,
    description: "商人最愛黃金。",
  },
  redstone: {
    name: "紅石",
    icon: RedstoneIcon,
    rarity: "uncommon",
    stack: 64,
    description: "會發光的粉末,可以賣給商人。",
  },
  lapis: {
    name: "青金石",
    icon: LapisIcon,
    rarity: "uncommon",
    stack: 64,
    description: "深藍色的寶石碎片。",
  },
  diamond: {
    name: "鑽石",
    icon: DiamondIcon,
    rarity: "epic",
    stack: 64,
    description: "最好的工具需要鑽石。",
  },
  emerald: {
    name: "綠寶石",
    icon: EmeraldIcon,
    rarity: "epic",
    stack: 64,
    description: "稀有,很值錢。",
  },
  obsidian: {
    name: "黑曜石",
    icon: ObsidianIcon,
    rarity: "rare",
    stack: 64,
    description: "只有鑽石鎬挖得動。",
  },
  apple: {
    name: "蘋果",
    icon: AppleIcon,
    rarity: "common",
    stack: 64,
    food: 4,
    description: "恢復 4 點飢餓值。",
  },
  bread: {
    name: "麵包",
    icon: BreadIcon,
    rarity: "common",
    stack: 64,
    food: 6,
    description: "恢復 6 點飢餓值。",
  },
  woodPickaxe: {
    name: "木鎬",
    icon: WoodPickaxeIcon,
    rarity: "common",
    stack: 1,
    description: "可以挖石頭和煤礦。",
    tool: { kind: "pickaxe", tier: 1, power: 2, damage: 2, durability: 60 },
  },
  stonePickaxe: {
    name: "石鎬",
    icon: StonePickaxeIcon,
    rarity: "common",
    stack: 1,
    description: "可以挖鐵礦和青金石。",
    tool: { kind: "pickaxe", tier: 2, power: 3, damage: 3, durability: 90 },
  },
  ironPickaxe: {
    name: "鐵鎬",
    icon: IronPickaxeIcon,
    rarity: "uncommon",
    stack: 1,
    description: "可以挖金礦、紅石和鑽石。",
    tool: { kind: "pickaxe", tier: 3, power: 4, damage: 4, durability: 220 },
  },
  diamondPickaxe: {
    name: "鑽石鎬",
    icon: PickaxeIcon,
    rarity: "epic",
    stack: 1,
    description: "什麼都能挖,連黑曜石也行。",
    tool: { kind: "pickaxe", tier: 4, power: 6, damage: 5, durability: 800 },
  },
  shovel: {
    name: "石鏟",
    icon: ShovelIcon,
    rarity: "common",
    stack: 1,
    description: "挖泥土、草地和沙子很快。",
    tool: { kind: "shovel", tier: 2, power: 4, damage: 2, durability: 120 },
  },
  axe: {
    name: "石斧",
    icon: AxeIcon,
    rarity: "common",
    stack: 1,
    description: "砍樹很快,也是不錯的武器。",
    tool: { kind: "axe", tier: 2, power: 4, damage: 5, durability: 120 },
  },
  stoneSword: {
    name: "石劍",
    icon: StoneSwordIcon,
    rarity: "common",
    stack: 1,
    description: "用來擊退夜晚的怪物。",
    tool: { kind: "sword", tier: 2, power: 1, damage: 6, durability: 120 },
  },
  ironSword: {
    name: "鐵劍",
    icon: SwordIcon,
    rarity: "uncommon",
    stack: 1,
    description: "可靠的好劍。",
    tool: { kind: "sword", tier: 3, power: 1, damage: 9, durability: 250 },
  },
  diamondSword: {
    name: "鑽石劍",
    icon: DiamondSwordIcon,
    rarity: "epic",
    stack: 1,
    description: "無堅不摧。",
    tool: { kind: "sword", tier: 4, power: 1, damage: 14, durability: 900 },
  },
  ironArmor: {
    name: "鐵盔甲",
    icon: ArmorIcon,
    rarity: "uncommon",
    stack: 1,
    armor: 12,
    description: "抵擋約一半傷害,合成後自動穿上。",
  },
  diamondArmor: {
    name: "鑽石盔甲",
    icon: DiamondArmorIcon,
    rarity: "epic",
    stack: 1,
    armor: 20,
    description: "抵擋大部分傷害,合成後自動穿上。",
  },
} satisfies Record<string, ItemDef>;

export type ItemId = keyof typeof items;
export const itemIds = Object.keys(items) as ItemId[];
export const item = (id: ItemId): ItemDef => items[id];

/* ───────────────────────────── Layers ───────────────────────────── */

export interface Layer {
  name: string;
  theme: BlockThemeName;
  biome: BiomeType;
  /** Base rock of the layer. */
  rock: { name: string; texture: string; hardness: number; tier: number; drops: boolean };
  /** Ore weights out of 100 for rock cells. */
  ores: Partial<Record<BlockId, number>>;
  /** Monster spawn chance per second while it is day / night. */
  spawn: { day: number; night: number };
  monsters: MonsterId[];
}

export function layerFor(depth: number): Layer {
  if (depth <= 0) {
    return {
      name: "地表",
      theme: "grassland",
      biome: "forest",
      rock: { name: "石頭", texture: "stone", hardness: 4, tier: 1, drops: true },
      ores: { coal: 14, iron: 6 },
      spawn: { day: 0, night: 0.05 },
      monsters: ["zombie", "skeleton", "spider", "boomSlime"],
    };
  }
  if (depth <= 2) {
    return {
      name: "洞穴",
      theme: "cave",
      biome: "cave",
      rock: { name: "石頭", texture: "stone", hardness: 4, tier: 1, drops: true },
      ores: { coal: 14, iron: 11, lapis: 5, gold: 4, redstone: 3, diamond: depth === 2 ? 2 : 0 },
      spawn: { day: 0.02, night: 0.05 },
      monsters: ["zombie", "skeleton", "spider", "boomSlime"],
    };
  }
  if (depth <= 4) {
    return {
      name: "深板岩",
      theme: "deepslate",
      biome: "cave",
      rock: { name: "深板岩", texture: "deepslate", hardness: 6, tier: 1, drops: true },
      ores: {
        coal: 6,
        iron: 10,
        gold: 7,
        redstone: 8,
        lapis: 6,
        diamond: 4,
        emerald: 1,
        obsidian: depth === 4 ? 4 : 0,
      },
      spawn: { day: 0.03, night: 0.06 },
      monsters: ["zombie", "skeleton", "spider", "boomSlime"],
    };
  }
  if (depth <= 6) {
    return {
      name: "地獄",
      theme: "nether",
      biome: "nether",
      rock: { name: "地獄石", texture: "netherrack", hardness: 2, tier: 1, drops: false },
      ores: { gold: 12, obsidian: 8, diamond: 3, redstone: 4 },
      spawn: { day: 0.05, night: 0.05 },
      monsters: ["fireImp", "skeleton", "boomSlime"],
    };
  }
  return {
    name: "終界",
    theme: "end",
    biome: "end",
    rock: { name: "終界石", texture: "end-stone", hardness: 5, tier: 1, drops: false },
    ores: { diamond: 7, emerald: 5, obsidian: 10 },
    spawn: { day: 0.05, night: 0.05 },
    monsters: ["voidWraith"],
  };
}

/* ───────────────────────────── Blocks ───────────────────────────── */

export type BlockId =
  | "air"
  | "grass"
  | "tree"
  | "dirt"
  | "sand"
  | "rock"
  | "coal"
  | "iron"
  | "lapis"
  | "gold"
  | "redstone"
  | "diamond"
  | "emerald"
  | "obsidian";

export interface BlockDef {
  name: string;
  hardness: number;
  tool: ToolKind | null;
  /** Minimum pickaxe tier; 0 = by hand. */
  tier: number;
  xp: number;
  /** Drops: [item, min, max, chance]. */
  drops: Array<[ItemId, number, number, number]>;
  /** Overlay drawn on top of the base texture. */
  overlay?: PixelIcon;
  texture: "grass" | "dirt" | "sand" | "sky" | "obsidian" | "rock";
}

export const blocks: Record<Exclude<BlockId, "rock" | "air">, BlockDef> = {
  grass: {
    name: "草地",
    hardness: 2,
    tool: "shovel",
    tier: 0,
    xp: 0,
    drops: [["dirt", 1, 1, 1]],
    texture: "grass",
  },
  tree: {
    name: "樹",
    hardness: 5,
    tool: "axe",
    tier: 0,
    xp: 1,
    drops: [
      ["log", 2, 3, 1],
      ["apple", 1, 1, 0.35],
    ],
    texture: "sky",
  },
  dirt: {
    name: "泥土",
    hardness: 2,
    tool: "shovel",
    tier: 0,
    xp: 0,
    drops: [["dirt", 1, 1, 1]],
    texture: "dirt",
  },
  sand: {
    name: "沙子",
    hardness: 2,
    tool: "shovel",
    tier: 0,
    xp: 0,
    drops: [["sand", 1, 1, 1]],
    texture: "sand",
  },
  coal: {
    name: "煤礦",
    hardness: 5,
    tool: "pickaxe",
    tier: 1,
    xp: 2,
    drops: [["coal", 1, 2, 1]],
    overlay: CoalSpecks,
    texture: "rock",
  },
  iron: {
    name: "鐵礦",
    hardness: 6,
    tool: "pickaxe",
    tier: 2,
    xp: 3,
    drops: [["ironOre", 1, 1, 1]],
    overlay: IronSpecks,
    texture: "rock",
  },
  lapis: {
    name: "青金石礦",
    hardness: 6,
    tool: "pickaxe",
    tier: 2,
    xp: 4,
    drops: [["lapis", 3, 5, 1]],
    overlay: LapisSpecks,
    texture: "rock",
  },
  gold: {
    name: "金礦",
    hardness: 7,
    tool: "pickaxe",
    tier: 3,
    xp: 5,
    drops: [["goldOre", 1, 1, 1]],
    overlay: GoldSpecks,
    texture: "rock",
  },
  redstone: {
    name: "紅石礦",
    hardness: 7,
    tool: "pickaxe",
    tier: 3,
    xp: 5,
    drops: [["redstone", 3, 5, 1]],
    overlay: RedstoneSpecks,
    texture: "rock",
  },
  diamond: {
    name: "鑽石礦",
    hardness: 9,
    tool: "pickaxe",
    tier: 3,
    xp: 10,
    drops: [["diamond", 1, 1, 1]],
    overlay: DiamondSpecks,
    texture: "rock",
  },
  emerald: {
    name: "綠寶石礦",
    hardness: 9,
    tool: "pickaxe",
    tier: 3,
    xp: 12,
    drops: [["emerald", 1, 1, 1]],
    overlay: EmeraldSpecks,
    texture: "rock",
  },
  obsidian: {
    name: "黑曜石",
    hardness: 16,
    tool: "pickaxe",
    tier: 4,
    xp: 6,
    drops: [["obsidian", 1, 1, 1]],
    texture: "obsidian",
  },
};

export function blockDef(id: Exclude<BlockId, "air">, depth: number): BlockDef {
  if (id !== "rock") return blocks[id];
  const { rock } = layerFor(depth);
  return {
    name: rock.name,
    hardness: rock.hardness,
    tool: "pickaxe",
    tier: rock.tier,
    xp: 1,
    drops: rock.drops ? [["cobble", 1, 1, 1]] : [],
    texture: "rock",
  };
}

export const tierNames = ["空手", "木鎬", "石鎬", "鐵鎬", "鑽石鎬"];

/* ───────────────────────────── Recipes ───────────────────────────── */

export interface RecipeDef {
  id: ItemId;
  amount: number;
  category: "materials" | "tools" | "combat";
  /** 3 × 3 pattern, row by row. */
  pattern: Array<ItemId | null>;
}

const _ = null;
export const recipes: RecipeDef[] = [
  { id: "planks", amount: 4, category: "materials", pattern: [_, _, _, _, "log", _, _, _, _] },
  {
    id: "woodPickaxe",
    amount: 1,
    category: "tools",
    pattern: ["planks", "planks", "planks", _, "planks", _, _, "planks", _],
  },
  {
    id: "stonePickaxe",
    amount: 1,
    category: "tools",
    pattern: ["cobble", "cobble", "cobble", _, "planks", _, _, "planks", _],
  },
  {
    id: "ironPickaxe",
    amount: 1,
    category: "tools",
    pattern: ["iron", "iron", "iron", _, "planks", _, _, "planks", _],
  },
  {
    id: "diamondPickaxe",
    amount: 1,
    category: "tools",
    pattern: ["diamond", "diamond", "diamond", _, "planks", _, _, "planks", _],
  },
  {
    id: "shovel",
    amount: 1,
    category: "tools",
    pattern: [_, "cobble", _, _, "planks", _, _, "planks", _],
  },
  {
    id: "axe",
    amount: 1,
    category: "tools",
    pattern: ["cobble", "cobble", _, "cobble", "planks", _, _, "planks", _],
  },
  {
    id: "stoneSword",
    amount: 1,
    category: "combat",
    pattern: [_, "cobble", _, _, "cobble", _, _, "planks", _],
  },
  {
    id: "ironSword",
    amount: 1,
    category: "combat",
    pattern: [_, "iron", _, _, "iron", _, _, "planks", _],
  },
  {
    id: "diamondSword",
    amount: 1,
    category: "combat",
    pattern: [_, "diamond", _, _, "diamond", _, _, "planks", _],
  },
  {
    id: "ironArmor",
    amount: 1,
    category: "combat",
    pattern: ["iron", _, "iron", "iron", "iron", "iron", "iron", "iron", "iron"],
  },
  {
    id: "diamondArmor",
    amount: 1,
    category: "combat",
    pattern: [
      "diamond",
      _,
      "diamond",
      "diamond",
      "diamond",
      "diamond",
      "diamond",
      "diamond",
      "diamond",
    ],
  },
];

export function recipeCost(recipe: RecipeDef): Map<ItemId, number> {
  const cost = new Map<ItemId, number>();
  for (const id of recipe.pattern) if (id) cost.set(id, (cost.get(id) ?? 0) + 1);
  return cost;
}

/* ───────────────────────────── Furnace ───────────────────────────── */

export const smeltable: Partial<Record<ItemId, ItemId>> = { ironOre: "iron", goldOre: "gold" };
export const SMELT_SECONDS = 3;

/* ───────────────────────────── Trades ───────────────────────────── */

export interface TradeDef {
  id: string;
  give: [ItemId | "coins", number];
  get: [ItemId | "coins", number];
  maxUses: number;
}

export const trades: TradeDef[] = [
  { id: "bread", give: ["coins", 3], get: ["bread", 2], maxUses: 99 },
  { id: "apple", give: ["coins", 2], get: ["apple", 2], maxUses: 99 },
  { id: "sell-gold", give: ["gold", 2], get: ["coins", 9], maxUses: 99 },
  { id: "sell-redstone", give: ["redstone", 6], get: ["coins", 6], maxUses: 99 },
  { id: "sell-lapis", give: ["lapis", 6], get: ["coins", 6], maxUses: 99 },
  { id: "sell-diamond", give: ["diamond", 1], get: ["coins", 20], maxUses: 99 },
  { id: "sell-emerald", give: ["emerald", 1], get: ["coins", 30], maxUses: 99 },
  { id: "buy-iron", give: ["coins", 12], get: ["iron", 3], maxUses: 99 },
  { id: "buy-diamond", give: ["coins", 45], get: ["diamond", 1], maxUses: 99 },
];

/* ───────────────────────────── Monsters ───────────────────────────── */

export type MonsterId = "zombie" | "skeleton" | "spider" | "boomSlime" | "fireImp" | "voidWraith";

export interface MonsterDef {
  name: string;
  icon: PixelIcon;
  hp: number;
  damage: number;
  /** Seconds between attacks. */
  speed: number;
  /** Explodes once after this many seconds instead of attacking. */
  fuse?: number;
  xp: number;
  coins: number;
  color: "amethyst" | "redstone" | "emerald" | "diamond" | "gold" | "obsidian";
}

export const monsters: Record<MonsterId, MonsterDef> = {
  zombie: {
    name: "殭屍",
    icon: ZombieIcon,
    hp: 20,
    damage: 3,
    speed: 3,
    xp: 8,
    coins: 3,
    color: "emerald",
  },
  skeleton: {
    name: "骷髏",
    icon: SkeletonIcon,
    hp: 16,
    damage: 4,
    speed: 3,
    xp: 8,
    coins: 4,
    color: "diamond",
  },
  spider: {
    name: "洞穴蜘蛛",
    icon: SpiderIcon,
    hp: 12,
    damage: 2,
    speed: 2,
    xp: 6,
    coins: 2,
    color: "redstone",
  },
  boomSlime: {
    name: "爆爆史萊姆",
    icon: BoomSlimeIcon,
    hp: 12,
    damage: 12,
    speed: 99,
    fuse: 7,
    xp: 10,
    coins: 5,
    color: "gold",
  },
  fireImp: {
    name: "火焰小鬼",
    icon: FireImpIcon,
    hp: 26,
    damage: 5,
    speed: 3,
    xp: 16,
    coins: 8,
    color: "redstone",
  },
  voidWraith: {
    name: "虛空幽魂",
    icon: VoidWraithIcon,
    hp: 40,
    damage: 6,
    speed: 3,
    xp: 25,
    coins: 14,
    color: "amethyst",
  },
};

/* ───────────────────────────── Quests & achievements ───────────────────────────── */

export interface Stats {
  mined: number;
  minedByBlock: Partial<Record<BlockId, number>>;
  collected: Partial<Record<ItemId, number>>;
  crafted: Partial<Record<ItemId, number>>;
  smelted: number;
  kills: number;
  deaths: number;
  maxDepth: number;
  traded: number;
}

export interface QuestDef {
  id: string;
  title: string;
  description: string;
  max: number;
  progress: (s: Stats) => number;
  xp: number;
  coins: number;
}

export const quests: QuestDef[] = [
  {
    id: "wood",
    title: "徒手砍樹",
    description: "在地表收集 3 個橡木原木。",
    max: 3,
    progress: (s) => s.collected.log ?? 0,
    xp: 10,
    coins: 5,
  },
  {
    id: "pickaxe",
    title: "開始挖礦吧",
    description: "合成一把木鎬。",
    max: 1,
    progress: (s) => s.crafted.woodPickaxe ?? 0,
    xp: 15,
    coins: 5,
  },
  {
    id: "stone",
    title: "石器時代",
    description: "挖掉 12 個岩石方塊。",
    max: 12,
    progress: (s) => s.minedByBlock.rock ?? 0,
    xp: 20,
    coins: 8,
  },
  {
    id: "smelt",
    title: "熱騰騰",
    description: "在熔爐熔煉 3 個金屬錠。",
    max: 3,
    progress: (s) => s.smelted,
    xp: 25,
    coins: 10,
  },
  {
    id: "deep",
    title: "深入地底",
    description: "往下挖到深板岩層。",
    max: 3,
    progress: (s) => s.maxDepth,
    xp: 40,
    coins: 15,
  },
  {
    id: "diamond",
    title: "鑽石!",
    description: "挖到一個鑽石礦。",
    max: 1,
    progress: (s) => s.minedByBlock.diamond ?? 0,
    xp: 60,
    coins: 25,
  },
  {
    id: "hunter",
    title: "怪物獵人",
    description: "擊敗 5 隻怪物。",
    max: 5,
    progress: (s) => s.kills,
    xp: 40,
    coins: 20,
  },
  {
    id: "armor",
    title: "全副武裝",
    description: "合成任一件盔甲。",
    max: 1,
    progress: (s) => (s.crafted.ironArmor ?? 0) + (s.crafted.diamondArmor ?? 0),
    xp: 40,
    coins: 15,
  },
  {
    id: "nether",
    title: "熱到不行",
    description: "一路挖進地獄。",
    max: 5,
    progress: (s) => s.maxDepth,
    xp: 80,
    coins: 40,
  },
  {
    id: "end",
    title: "結束了?",
    description: "抵達終界層。",
    max: 7,
    progress: (s) => s.maxDepth,
    xp: 150,
    coins: 80,
  },
];

export type AchievementId =
  | "firstBlock"
  | "firstCraft"
  | "firstSmelt"
  | "firstKill"
  | "diamond"
  | "trader"
  | "nether"
  | "end"
  | "level10"
  | "died";

export const achievements: Record<
  AchievementId,
  { title: string; description: string; icon: PixelIcon }
> = {
  firstBlock: { title: "踏出第一步", description: "挖掉第一個方塊。", icon: DirtIcon },
  firstCraft: { title: "工作台", description: "合成第一個物品。", icon: PlanksIcon },
  firstSmelt: { title: "來點硬傢伙", description: "熔煉出一個金屬錠。", icon: IronIcon },
  firstKill: { title: "怪物獵人", description: "擊敗一隻怪物。", icon: SwordIcon },
  diamond: { title: "鑽石!", description: "把鑽石拿在手上。", icon: DiamondIcon },
  trader: { title: "划算的交易", description: "和村民交易一次。", icon: EmeraldIcon },
  nether: {
    title: "我們得挖更深",
    description: "抵達地獄層。",
    icon: ObsidianIcon,
  },
  end: { title: "終界", description: "抵達終界層。", icon: VoidWraithIcon },
  level10: { title: "經驗老道", description: "達到等級 10。", icon: GoldIcon },
  died: { title: "哎呀", description: "第一次死亡。", icon: ZombieIcon },
};
