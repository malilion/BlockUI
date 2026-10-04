import type { ChatMessageType, ToastVariant, WeatherType } from "@malilion/block-ui-react";
import {
  achievements,
  blockDef,
  item,
  itemIds,
  layerFor,
  monsters,
  quests,
  recipeCost,
  recipes,
  smeltable,
  SMELT_SECONDS,
  tierNames,
  trades,
  type AchievementId,
  type BlockId,
  type ItemId,
  type MonsterId,
  type Stats,
  type ToolStats,
} from "./data";

export const COLS = 9;
export const ROWS = 7;
export const HOTBAR_SIZE = 9;
export const MAX_HEALTH = 20;
export const MAX_HUNGER = 20;
export const DAY_START = 6;
const HOURS_PER_TICK = 0.1; // one in-game day = 240 seconds

export interface Cell {
  block: BlockId;
  dmg: number;
}

export interface Monster {
  id: MonsterId;
  hp: number;
  cooldown: number;
  fuse?: number;
}

export interface FurnaceState {
  input: ItemId | null;
  queued: number;
  fuelItem: ItemId | null;
  fuelCount: number;
  burnLeft: number;
  burnMax: number;
  progress: number;
  output: ItemId | null;
  outputCount: number;
}

export interface ChatLine {
  id: string;
  author?: string;
  text: string;
  time: string;
  type: ChatMessageType;
}

export interface ToastMsg {
  id: string;
  variant: ToastVariant;
  title?: string;
  message: string;
}

export interface GameState {
  version: 1;
  seed: number;
  seq: number;
  tick: number;
  world: Cell[];
  depth: number;
  health: number;
  hunger: number;
  exhaustion: number;
  armor: number;
  armorItem: ItemId | null;
  xp: number;
  level: number;
  coins: number;
  time: number;
  day: number;
  weather: WeatherType;
  inventory: Partial<Record<ItemId, number>>;
  durability: Partial<Record<ItemId, number>>;
  hotbar: Array<ItemId | null>;
  selected: number;
  monster: Monster | null;
  furnace: FurnaceState;
  stats: Stats;
  claimed: string[];
  achievements: Partial<Record<AchievementId, number>>;
  tradeUses: Record<string, number>;
  chat: ChatLine[];
  toasts: ToastMsg[];
  dead: string | null;
}

export type Action =
  | { type: "tick" }
  | { type: "mine"; index: number }
  | { type: "select"; index: number }
  | { type: "eat" }
  | { type: "attack" }
  | { type: "craft"; id: ItemId }
  | { type: "trade"; id: string }
  | { type: "furnaceLoad"; id: ItemId }
  | { type: "furnaceFuel"; id: ItemId }
  | { type: "furnaceTake" }
  | { type: "descend" }
  | { type: "ascend" }
  | { type: "claim"; id: string }
  | { type: "respawn" }
  | { type: "chat"; text: string }
  | { type: "toastsShown" }
  | { type: "reset" };

/* ───────────────────────────── Random ───────────────────────────── */

/** mulberry32 — the seed lives in state so the reducer stays pure. */
function random(s: GameState): number {
  let t = (s.seed = (s.seed + 0x6d2b79f5) | 0);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

const randInt = (s: GameState, min: number, max: number) =>
  min + Math.floor(random(s) * (max - min + 1));
function pick<T>(s: GameState, list: readonly T[]): T {
  return list[Math.floor(random(s) * list.length)] as T;
}

/* ───────────────────────────── World ───────────────────────────── */

function generateWorld(s: GameState, depth: number): Cell[] {
  const layer = layerFor(depth);
  const oreEntries = Object.entries(layer.ores) as Array<[BlockId, number]>;
  const cells: Cell[] = [];
  for (let r = 0; r < ROWS; r += 1) {
    for (let c = 0; c < COLS; c += 1) {
      let block: BlockId = "rock";
      if (depth === 0 && r === 0) block = random(s) < 0.4 ? "tree" : "grass";
      else if (depth === 0 && r <= 2) block = random(s) < 0.15 ? "sand" : "dirt";
      else if (depth > 0 && r > 0 && depth < 5 && random(s) < 0.07) block = "air";
      else if (depth === 1 && random(s) < 0.08) block = "dirt";
      else {
        let roll = random(s) * 100;
        for (const [ore, weight] of oreEntries) {
          if (roll < weight) {
            block = ore;
            break;
          }
          roll -= weight;
        }
      }
      cells.push({ block, dmg: 0 });
    }
  }
  return cells;
}

export function isExposed(world: Cell[], index: number): boolean {
  const r = Math.floor(index / COLS);
  const c = index % COLS;
  if (r === 0) return true;
  const neighbours = [
    index - COLS,
    index + COLS,
    c > 0 ? index - 1 : -1,
    c < COLS - 1 ? index + 1 : -1,
  ];
  return neighbours.some((n) => n >= 0 && world[n]?.block === "air");
}

export function canDescend(world: Cell[]): boolean {
  return world.slice((ROWS - 1) * COLS).some((cell) => cell.block === "air");
}

export const isNight = (time: number) => time >= 19 || time < 5;

/* ───────────────────────────── Helpers ───────────────────────────── */

export const xpToNext = (level: number) => 10 + level * 6;

function clock(time: number) {
  const h = Math.floor(time);
  const m = Math.floor((time - h) * 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function chat(s: GameState, text: string, type: ChatMessageType = "system", author?: string) {
  s.seq += 1;
  s.chat = [...s.chat, { id: `c${s.seq}`, text, type, author, time: clock(s.time) }].slice(-80);
}

function notify(s: GameState, variant: ToastVariant, message: string, title?: string, id?: string) {
  s.seq += 1;
  s.toasts = [...s.toasts, { id: id ?? `t${s.seq}`, variant, message, title }];
}

function unlock(s: GameState, id: AchievementId) {
  if (s.achievements[id] !== undefined) return;
  s.achievements[id] = s.day;
  notify(s, "success", achievements[id].description, `成就:${achievements[id].title}`);
  chat(s, `獲得成就![${achievements[id].title}]`);
}

export function selectedItem(s: GameState): ItemId | null {
  return s.hotbar[s.selected] ?? null;
}

export function selectedTool(s: GameState): ToolStats | undefined {
  const id = selectedItem(s);
  return id ? item(id).tool : undefined;
}

function addXp(s: GameState, amount: number) {
  s.xp += amount;
  while (s.xp >= xpToNext(s.level)) {
    s.xp -= xpToNext(s.level);
    s.level += 1;
    notify(s, "success", `你達到了等級 ${s.level}。`, "升級了!");
    if (s.level >= 10) unlock(s, "level10");
  }
}

function addItem(s: GameState, id: ItemId, amount: number) {
  const def = item(id);
  s.inventory[id] = (s.inventory[id] ?? 0) + amount;
  s.stats.collected[id] = (s.stats.collected[id] ?? 0) + amount;
  if (def.tool && s.durability[id] === undefined) s.durability[id] = def.tool.durability;
  if ((def.tool || def.food) && !s.hotbar.includes(id)) {
    const free = s.hotbar.indexOf(null);
    if (free !== -1) s.hotbar[free] = id;
  }
  if (id === "diamond") unlock(s, "diamond");
}

function omit<T extends object>(record: T, key: keyof T): T {
  const { [key]: _removed, ...rest } = record;
  return rest as T;
}

function removeItem(s: GameState, id: ItemId, amount: number) {
  const left = (s.inventory[id] ?? 0) - amount;
  if (left > 0) {
    s.inventory[id] = left;
    return;
  }
  s.inventory = omit(s.inventory, id);
  s.durability = omit(s.durability, id);
  s.hotbar = s.hotbar.map((slot) => (slot === id ? null : slot));
}

function wearTool(s: GameState) {
  const id = selectedItem(s);
  if (!id || !item(id).tool) return;
  const left = (s.durability[id] ?? 1) - 1;
  s.durability[id] = left;
  if (left <= 0) {
    removeItem(s, id, 1);
    notify(s, "warning", `你的${item(id).name}壞掉了!`);
    chat(s, `你的${item(id).name}壞掉了。`);
  }
}

function hurt(s: GameState, amount: number, cause: string) {
  const taken = Math.max(1, Math.round(amount * (1 - s.armor / 25)));
  s.health = Math.max(0, s.health - taken);
  if (s.health === 0) {
    s.dead = cause;
    s.monster = null;
    s.stats.deaths += 1;
    chat(s, `礦工${cause}。`, "death");
    unlock(s, "died");
  }
}

function changeDepth(s: GameState, depth: number) {
  const before = layerFor(s.depth);
  s.depth = depth;
  s.world = generateWorld(s, depth);
  s.monster = null;
  s.stats.maxDepth = Math.max(s.stats.maxDepth, depth);
  const after = layerFor(depth);
  if (after.name !== before.name) {
    notify(s, "info", `Y = ${yLevel(depth)}`, `進入:${after.name}`);
  }
  chat(s, `你現在位於 Y ${yLevel(depth)}(${after.name})。`);
  if (depth >= 5) unlock(s, "nether");
  if (depth >= 7) unlock(s, "end");
}

export const yLevel = (depth: number) => 64 - depth * 12;

/* ───────────────────────────── Setup ───────────────────────────── */

export function newGame(seed = Date.now() | 0): GameState {
  const s: GameState = {
    version: 1,
    seed,
    seq: 0,
    tick: 0,
    world: [],
    depth: 0,
    health: MAX_HEALTH,
    hunger: MAX_HUNGER,
    exhaustion: 0,
    armor: 0,
    armorItem: null,
    xp: 0,
    level: 0,
    coins: 0,
    time: DAY_START + 1,
    day: 1,
    weather: "clear",
    inventory: {},
    durability: {},
    hotbar: Array.from({ length: HOTBAR_SIZE }, () => null),
    selected: 0,
    monster: null,
    furnace: {
      input: null,
      queued: 0,
      fuelItem: null,
      fuelCount: 0,
      burnLeft: 0,
      burnMax: 0,
      progress: 0,
      output: null,
      outputCount: 0,
    },
    stats: {
      mined: 0,
      minedByBlock: {},
      collected: {},
      crafted: {},
      smelted: 0,
      kills: 0,
      deaths: 0,
      maxDepth: 0,
      traded: 0,
    },
    claimed: [],
    achievements: {},
    tradeUses: {},
    chat: [],
    toasts: [],
    dead: null,
  };
  s.world = generateWorld(s, 0);
  addItem(s, "apple", 3);
  s.stats.collected = {};
  chat(s, "歡迎來到方塊礦工!先徒手砍樹開始吧。");
  chat(s, "輸入 /help 查看指令。");
  return s;
}

/* ───────────────────────────── Reducer ───────────────────────────── */

export function reducer(state: GameState, action: Action): GameState {
  if (action.type === "toastsShown") return state.toasts.length ? { ...state, toasts: [] } : state;
  if (action.type === "reset") return newGame();
  if (state.dead && action.type !== "respawn") return state;

  const s = structuredClone(state);

  switch (action.type) {
    case "tick":
      tick(s);
      break;
    case "select":
      s.selected = action.index;
      break;
    case "mine":
      mine(s, action.index);
      break;
    case "eat": {
      const id = selectedItem(s);
      const food = id ? item(id).food : undefined;
      if (!id || !food) {
        notify(s, "info", "請先在快捷列選擇食物。", undefined, "eat-hint");
        break;
      }
      if (s.hunger >= MAX_HUNGER) {
        notify(s, "info", "你還不餓。", undefined, "eat-hint");
        break;
      }
      s.hunger = Math.min(MAX_HUNGER, s.hunger + food);
      removeItem(s, id, 1);
      chat(s, `你吃了${item(id).name}(+${food} 飢餓值)。`);
      break;
    }
    case "attack":
      attack(s);
      break;
    case "craft":
      craft(s, action.id);
      break;
    case "trade":
      trade(s, action.id);
      break;
    case "furnaceLoad": {
      const f = s.furnace;
      if (f.input && f.input !== action.id) {
        notify(s, "info", "請等目前這批熔煉完成。", undefined, "furnace");
        break;
      }
      const have = s.inventory[action.id] ?? 0;
      if (!have) break;
      f.input = action.id;
      f.queued += have;
      removeItem(s, action.id, have);
      break;
    }
    case "furnaceFuel": {
      const f = s.furnace;
      if (f.fuelItem && f.fuelItem !== action.id && f.fuelCount > 0) {
        notify(s, "info", "燃料格裡已經放了別的東西。", undefined, "furnace");
        break;
      }
      const have = s.inventory[action.id] ?? 0;
      if (!have) break;
      f.fuelItem = action.id;
      f.fuelCount += have;
      removeItem(s, action.id, have);
      break;
    }
    case "furnaceTake": {
      const f = s.furnace;
      if (!f.output || !f.outputCount) break;
      addItem(s, f.output, f.outputCount);
      f.output = f.queued ? f.output : null;
      f.outputCount = 0;
      break;
    }
    case "descend":
      if (!canDescend(s.world)) {
        notify(s, "info", "先挖一條通道到最底排。", undefined, "descend");
        break;
      }
      s.exhaustion += 4;
      changeDepth(s, s.depth + 1);
      break;
    case "ascend":
      if (s.depth > 0) changeDepth(s, s.depth - 1);
      break;
    case "claim": {
      const quest = quests.find((q) => q.id === action.id);
      if (!quest || s.claimed.includes(quest.id) || quest.progress(s.stats) < quest.max) break;
      s.claimed.push(quest.id);
      s.coins += quest.coins;
      addXp(s, quest.xp);
      notify(s, "success", `+${quest.xp} 經驗、+${quest.coins} 金幣`, `任務完成:${quest.title}`);
      break;
    }
    case "respawn":
      s.dead = null;
      s.health = MAX_HEALTH;
      s.hunger = MAX_HUNGER;
      s.coins = Math.floor(s.coins / 2);
      changeDepth(s, 0);
      chat(s, "你在地表重生了,失去一半的金幣。");
      break;
    case "chat":
      command(s, action.text);
      break;
  }
  return s;
}

function mine(s: GameState, index: number) {
  const cell = s.world[index];
  if (!cell || cell.block === "air" || !isExposed(s.world, index)) return;
  const def = blockDef(cell.block, s.depth);
  const tool = selectedTool(s);

  if (def.tier > 0 && !(tool?.kind === "pickaxe" && tool.tier >= def.tier)) {
    notify(
      s,
      "warning",
      `${def.name}需要${tierNames[def.tier]}或更好的工具。`,
      "太硬了!",
      "need-tool",
    );
    return;
  }

  cell.dmg += tool && tool.kind === def.tool ? tool.power : 1;
  s.exhaustion += 1;
  if (tool) wearTool(s);

  if (cell.dmg < def.hardness) return;

  const mined = cell.block;
  cell.block = "air";
  cell.dmg = 0;
  s.stats.mined += 1;
  s.stats.minedByBlock[mined] = (s.stats.minedByBlock[mined] ?? 0) + 1;
  for (const [id, min, max, chance] of def.drops) {
    if (random(s) <= chance) addItem(s, id, randInt(s, min, max));
  }
  if (def.xp) addXp(s, def.xp);
  unlock(s, "firstBlock");
}

function attack(s: GameState) {
  const m = s.monster;
  if (!m) return;
  const tool = selectedTool(s);
  const damage = tool?.damage ?? 1;
  if (tool) wearTool(s);
  m.hp -= damage;
  s.exhaustion += 1;
  if (m.hp > 0) return;

  const def = monsters[m.id];
  s.monster = null;
  s.stats.kills += 1;
  s.coins += def.coins;
  addXp(s, def.xp);
  const loot = random(s) < 0.15;
  if (loot) addItem(s, "emerald", 1);
  notify(
    s,
    "success",
    `+${def.xp} 經驗、+${def.coins} 金幣${loot ? "、+1 綠寶石" : ""}`,
    `擊敗了${def.name}`,
  );
  chat(s, `你擊敗了${def.name}。`);
  unlock(s, "firstKill");
}

function craft(s: GameState, id: ItemId) {
  const recipe = recipes.find((r) => r.id === id);
  if (!recipe) return;
  const def = item(id);
  if (def.tool && s.inventory[id]) {
    notify(s, "info", `你已經有${def.name}了。`, undefined, "craft");
    return;
  }
  if (def.armor !== undefined && s.armor >= def.armor) {
    notify(s, "info", "你已經穿著同等或更好的盔甲。", undefined, "craft");
    return;
  }
  const cost = recipeCost(recipe);
  for (const [need, n] of cost) {
    if ((s.inventory[need] ?? 0) < n) {
      notify(s, "warning", `缺少${item(need).name}。`, undefined, "craft");
      return;
    }
  }
  for (const [need, n] of cost) removeItem(s, need, n);
  if (def.armor !== undefined) {
    s.armor = def.armor;
    s.armorItem = id;
    s.stats.collected[id] = 1;
  } else {
    addItem(s, id, recipe.amount);
  }
  s.stats.crafted[id] = (s.stats.crafted[id] ?? 0) + recipe.amount;
  notify(s, "success", `${def.name}${recipe.amount > 1 ? ` ×${recipe.amount}` : ""}`, "合成完成");
  unlock(s, "firstCraft");
}

function trade(s: GameState, id: string) {
  const t = trades.find((x) => x.id === id);
  if (!t) return;
  const [giveId, giveN] = t.give;
  const have = giveId === "coins" ? s.coins : (s.inventory[giveId] ?? 0);
  if (have < giveN) {
    notify(
      s,
      "warning",
      `${giveId === "coins" ? "金幣" : item(giveId).name}不夠。`,
      undefined,
      "trade",
    );
    return;
  }
  if (giveId === "coins") s.coins -= giveN;
  else removeItem(s, giveId, giveN);
  const [getId, getN] = t.get;
  if (getId === "coins") s.coins += getN;
  else addItem(s, getId, getN);
  s.tradeUses[id] = (s.tradeUses[id] ?? 0) + 1;
  s.stats.traded += 1;
  unlock(s, "trader");
}

function tick(s: GameState) {
  s.tick += 1;
  s.time += HOURS_PER_TICK;
  if (s.time >= 24) {
    s.time -= 24;
    s.day += 1;
    chat(s, `第 ${s.day} 天開始了。`);
  }
  if (Math.abs(s.time - DAY_START) < HOURS_PER_TICK / 2) {
    s.weather = pick(s, ["clear", "clear", "cloudy", "rain", "thunder"] as const);
  }
  const night = isNight(s.time);
  if (Math.abs(s.time - 19) < HOURS_PER_TICK / 2) {
    notify(s, "warning", "怪物在地表遊蕩,快合成一把劍!", "夜幕降臨", "night");
    chat(s, "夜幕降臨……");
  }

  // Hunger and health
  if (s.tick % 20 === 0) s.exhaustion += 3;
  while (s.exhaustion >= 12) {
    s.exhaustion -= 12;
    s.hunger = Math.max(0, s.hunger - 1);
  }
  if (s.hunger >= 16 && s.health < MAX_HEALTH && s.tick % 3 === 0) {
    s.health += 1;
    s.exhaustion += 2;
  }
  if (s.hunger === 0 && s.health > 1 && s.tick % 4 === 0) {
    s.health -= 1;
    if (s.health <= 4) notify(s, "error", "快吃點東西!", "挨餓中", "starving");
  }

  // Monsters
  const layer = layerFor(s.depth);
  if (!s.monster) {
    const chance = night ? layer.spawn.night : layer.spawn.day;
    if (s.tick > 10 && random(s) < chance) spawnMonster(s);
  } else {
    const m = s.monster;
    const def = monsters[m.id];
    if (m.fuse !== undefined) {
      m.fuse -= 1;
      if (m.fuse <= 0) {
        s.monster = null;
        hurt(s, def.damage, `被${def.name}炸飛了`);
        if (!s.dead) notify(s, "error", `${def.name}爆炸了!`, "轟!");
      }
    } else {
      m.cooldown -= 1;
      if (m.cooldown <= 0) {
        m.cooldown = def.speed;
        hurt(s, def.damage, `被${def.name}殺死了`);
      }
    }
  }

  // Furnace
  const f = s.furnace;
  if (f.input && f.queued > 0) {
    if (f.burnLeft <= 0 && f.fuelItem && f.fuelCount > 0) {
      f.fuelCount -= 1;
      f.burnLeft = f.burnMax = item(f.fuelItem).fuel ?? 1;
      if (f.fuelCount === 0) f.fuelItem = null;
    }
    if (f.burnLeft > 0) {
      f.progress += 1;
      if (f.progress >= SMELT_SECONDS) {
        const out = smeltable[f.input];
        f.progress = 0;
        f.queued -= 1;
        f.burnLeft -= 1;
        if (out && (!f.output || f.output === out)) {
          f.output = out;
          f.outputCount += 1;
          s.stats.smelted += 1;
          unlock(s, "firstSmelt");
        }
        if (f.queued === 0) f.input = null;
      }
    }
  }
}

function spawnMonster(s: GameState) {
  if (s.monster) return;
  const id = pick(s, layerFor(s.depth).monsters);
  const def = monsters[id];
  s.monster = { id, hp: def.hp, cooldown: def.speed, fuse: def.fuse };
  notify(
    s,
    "error",
    def.fuse ? "它快爆炸了,趕快打倒它!" : "趁它傷到你之前攻擊它!",
    `出現了一隻${def.name}!`,
    "monster",
  );
  chat(s, `出現了一隻${def.name}!`);
}

function command(s: GameState, raw: string) {
  const text = raw.trim();
  if (!text) return;
  if (!text.startsWith("/")) {
    chat(s, text, "chat", "礦工");
    return;
  }
  chat(s, text, "chat", "礦工");
  const [cmd, ...args] = text.slice(1).split(/\s+/);
  switch (cmd?.toLowerCase()) {
    case "help":
      chat(
        s,
        "指令:/time day|night(白天/夜晚)· /summon(召喚怪物)· /heal(回滿)· /give <物品> [數量] · /weather clear|rain|thunder(天氣)· /items(物品列表)",
      );
      break;
    case "time":
      s.time = args[0] === "night" ? 19.5 : DAY_START + 1;
      chat(s, `時間設為 ${clock(s.time)}。`);
      break;
    case "heal":
      s.health = MAX_HEALTH;
      s.hunger = MAX_HUNGER;
      chat(s, "已回滿生命和飢餓值。");
      break;
    case "weather": {
      const w = args[0] as WeatherType | undefined;
      if (w && ["clear", "cloudy", "rain", "thunder", "snow"].includes(w)) {
        s.weather = w;
        chat(s, `天氣已設為 ${w}。`);
      }
      break;
    }
    case "summon":
      spawnMonster(s);
      break;
    case "items":
      chat(s, `物品 ID:${itemIds.join(", ")}`);
      break;
    case "give": {
      const query = (args[0] ?? "").toLowerCase();
      const id = itemIds.find(
        (x) => x.toLowerCase() === query || item(x).name.toLowerCase().replace(/\s/g, "") === query,
      );
      if (!id) {
        chat(s, `找不到物品「${args[0] ?? ""}」,試試 /items。`);
        break;
      }
      const amount = Math.max(1, Math.min(64, Number(args[1]) || 1));
      if (item(id).armor !== undefined) {
        s.armor = Math.max(s.armor, item(id).armor ?? 0);
        s.armorItem = id;
      } else {
        addItem(s, id, item(id).stack === 1 ? 1 : amount);
      }
      chat(s, `給予 ${amount} × ${item(id).name}。`);
      break;
    }
    default:
      chat(s, `未知指令「/${cmd ?? ""}」,輸入 /help 查看。`);
  }
}

/* ───────────────────────────── Persistence ───────────────────────────── */

const SAVE_KEY = "block-miner-save-v1";

export function loadGame(): GameState | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as GameState;
    if (parsed.version !== 1 || !Array.isArray(parsed.world)) return null;
    return { ...parsed, toasts: [] };
  } catch {
    return null;
  }
}

export function saveGame(state: GameState) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify({ ...state, toasts: [] }));
  } catch {
    // Storage may be unavailable (private mode); the game still runs.
  }
}
