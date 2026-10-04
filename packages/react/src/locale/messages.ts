/**
 * Every built-in string Block UI renders. Components read these from
 * `<BlockUIProvider messages={…}>`; explicit props (`label`, `placeholder`,
 * `statusLabels`, …) still win over the provider.
 *
 * Interpolated strings are functions so each locale controls word order.
 */
export interface BlockUIMessages {
  common: {
    close: string;
    dismiss: string;
    progress: string;
    result: string;
    fuel: string;
    input: string;
    emptySlot: string;
    lockedSlot: string;
    /** Accessible name of an empty labelled slot, e.g. "Fuel: empty". */
    emptyNamed: (name: string) => string;
    sortBy: string;
    name: string;
    loading: string;
    /** `aria-valuetext` of a points / health bar. */
    amount: (value: string, max: string) => string;
  };
  rarity: Record<"common" | "uncommon" | "rare" | "epic" | "legendary", string>;
  contextMenu: { label: string };
  avatar: { statuses: Record<"online" | "away" | "busy" | "offline", string> };
  achievementCard: {
    label: string;
    view: string;
    locked: string;
    unlocked: string;
    unlockedOn: (date: string) => string;
  };
  playerCard: { label: string; profile: string; level: (level: string) => string };
  questCard: {
    label: string;
    claim: string;
    claimed: string;
    inProgress: string;
    reward: string;
    xp: string;
    coins: string;
  };
  serverCard: {
    label: string;
    join: string;
    offline: string;
    online: string;
    version: string;
    ping: string;
    pingValue: (ms: string) => string;
  };
  serverBrowser: {
    label: string;
    search: string;
    mostPlayers: string;
    lowestPing: string;
    onlineOnly: string;
    refresh: string;
    addServer: string;
    servers: string;
    empty: string;
    count: (count: number) => string;
  };
  worldCard: {
    label: string;
    day: (day: string) => string;
    play: (name: string) => string;
    seed: string;
    lastPlayed: string;
  };
  worldBrowser: {
    label: string;
    search: string;
    gameMode: string;
    allModes: string;
    lastPlayed: string;
    createWorld: string;
    worlds: string;
    empty: string;
    count: (count: number) => string;
  };
  anvil: {
    label: string;
    itemName: string;
    item: string;
    material: string;
    tooExpensive: string;
    cost: (cost: string) => string;
    notEnoughLevels: string;
  };
  brewingStand: {
    label: string;
    status: Record<"idle" | "brewing" | "complete" | "noFuel", string>;
    bottles: [string, string, string];
    ingredient: string;
    progress: string;
  };
  craftingGrid: { label: string };
  craftingResult: { label: string };
  craftingTable: { label: string; craft: string };
  enchantingTable: {
    label: string;
    item: string;
    lapis: string;
    enchantments: string;
    unknown: string;
    placeItem: string;
    notEnoughLevels: string;
    notEnoughLapis: string;
    unavailable: string;
    optionDetail: (level: string, lapisCost: string) => string;
  };
  furnace: {
    label: string;
    status: Record<"idle" | "burning" | "processing" | "complete" | "noFuel", string>;
    progress: string;
  };
  recipeBook: {
    label: string;
    search: string;
    all: string;
    categories: string;
    craftableOnly: string;
    recipes: string;
    noMatch: string;
    selectRecipe: string;
    pattern: string;
    makes: (name: string) => string;
    missingIngredients: string;
    missingSuffix: (name: string) => string;
    craft: string;
    count: (count: number) => string;
  };
  tradingUI: {
    label: string;
    trades: string;
    levels: [string, string, string, string, string];
    progressTo: (level: string) => string;
    payment: string;
    secondPayment: string;
    trade: string;
    soldOut: string;
    soldOutSuffix: string;
  };
  blockTable: { empty: string };
  skillTree: {
    label: string;
    skills: string;
    details: string;
    points: string;
    states: Record<"locked" | "available" | "unlocked", string>;
    requires: (names: string) => string;
    unlock: (cost: number) => string;
    needs: (cost: number) => string;
  };
  confirmDialog: { confirm: string; cancel: string };
  toast: { region: string; dismiss: string };
  numberInput: { decrease: string; increase: string };
  hud: {
    health: string;
    armor: string;
    hunger: string;
    experience: string;
    playerStatus: string;
    xpValue: (value: string, max: string) => string;
    level: (level: string) => string;
  };
  biomeIndicator: {
    biome: string;
    names: Record<
      | "plains"
      | "forest"
      | "desert"
      | "snowy"
      | "ocean"
      | "jungle"
      | "mountains"
      | "swamp"
      | "cave"
      | "nether"
      | "end",
      string
    >;
  };
  coordinatesHUD: {
    label: string;
    facing: string;
    facings: Record<"north" | "south" | "east" | "west", string>;
    copy: string;
    copyLabel: string;
    copied: string;
  };
  dayNightIndicator: {
    label: string;
    day: string;
    phases: Record<"dawn" | "day" | "dusk" | "night", string>;
    am: string;
    pm: string;
  };
  weatherIndicator: {
    weather: string;
    names: Record<"clear" | "cloudy" | "rain" | "thunder" | "snow", string>;
    clearNight: string;
    remaining: string;
  };
  miniMap: {
    label: string;
    directions: [string, string, string, string, string, string, string, string];
    here: (label: string) => string;
    facing: (direction: string) => string;
    northShort: string;
    distance: (label: string, blocks: number, direction: string) => string;
  };
  scoreboard: {
    empty: string;
    rank: string;
    name: string;
    score: string;
    more: (count: number) => string;
  };
  durability: { label: string; value: (value: string, max: string) => string };
  hotbar: { label: string };
  inventory: { title: string; label: string };
  pagination: {
    label: string;
    previous: string;
    next: string;
    page: (page: number) => string;
    pageOf: (page: number, count: number) => string;
  };
  sidebar: { label: string };
  stepper: { label: string };
  breadcrumb: { label: string };
  hotbarNavigation: { label: string };
  chatWindow: {
    label: string;
    placeholder: string;
    messages: (label: string) => string;
    whispers: (author: string) => string;
    message: string;
    send: string;
  };
  commandConsole: {
    label: string;
    output: (label: string) => string;
    suggestions: string;
    command: string;
  };
}

/** Recursively optional, for overriding part of a locale. */
export type BlockUIMessagesOverride = {
  [K in keyof BlockUIMessages]?: Partial<BlockUIMessages[K]>;
};

const plural = (n: number, one: string, many: string) => (n === 1 ? one : many);

export const enMessages: BlockUIMessages = {
  common: {
    close: "Close",
    dismiss: "Dismiss",
    progress: "Progress",
    result: "Result",
    fuel: "Fuel",
    input: "Input",
    emptySlot: "Empty slot",
    lockedSlot: "Locked slot",
    emptyNamed: (name) => `${name}: empty`,
    sortBy: "Sort by",
    name: "Name",
    loading: "Loading…",
    amount: (value, max) => `${value} of ${max}`,
  },
  rarity: {
    common: "Common",
    uncommon: "Uncommon",
    rare: "Rare",
    epic: "Epic",
    legendary: "Legendary",
  },
  contextMenu: { label: "Context menu" },
  avatar: { statuses: { online: "online", away: "away", busy: "busy", offline: "offline" } },
  achievementCard: {
    label: "Achievement",
    view: "View",
    locked: "Locked",
    unlocked: "Unlocked",
    unlockedOn: (date) => `Unlocked on ${date}`,
  },
  playerCard: { label: "Player", profile: "Profile", level: (level) => `Level ${level}` },
  questCard: {
    label: "Quest",
    claim: "Claim",
    claimed: "Claimed",
    inProgress: "In progress",
    reward: "Reward",
    xp: "XP",
    coins: "coins",
  },
  serverCard: {
    label: "Server",
    join: "Join",
    offline: "Offline",
    online: "Online",
    version: "Version",
    ping: "Ping",
    pingValue: (ms) => `${ms} ms`,
  },
  serverBrowser: {
    label: "Server browser",
    search: "Search servers",
    mostPlayers: "Most players",
    lowestPing: "Lowest ping",
    onlineOnly: "Online only",
    refresh: "Refresh",
    addServer: "Add server",
    servers: "Servers",
    empty: "No servers found",
    count: (count) => `${count} ${plural(count, "server", "servers")}`,
  },
  worldCard: {
    label: "World",
    day: (day) => `Day ${day}`,
    play: (name) => `Play ${name}`,
    seed: "Seed:",
    lastPlayed: "Last played",
  },
  worldBrowser: {
    label: "World browser",
    search: "Search worlds",
    gameMode: "Game mode",
    allModes: "All modes",
    lastPlayed: "Last played",
    createWorld: "Create world",
    worlds: "Worlds",
    empty: "No worlds yet",
    count: (count) => `${count} ${plural(count, "world", "worlds")}`,
  },
  anvil: {
    label: "Anvil",
    itemName: "Item name",
    item: "Item",
    material: "Material",
    tooExpensive: "Too Expensive!",
    cost: (cost) => `Enchantment Cost: ${cost}`,
    notEnoughLevels: " (not enough levels)",
  },
  brewingStand: {
    label: "Brewing stand",
    status: { idle: "Idle", brewing: "Brewing", complete: "Complete", noFuel: "No fuel" },
    bottles: ["Left bottle", "Middle bottle", "Right bottle"],
    ingredient: "Ingredient",
    progress: "Brewing progress",
  },
  craftingGrid: { label: "Crafting grid" },
  craftingResult: { label: "Crafting result" },
  craftingTable: { label: "Crafting table", craft: "Craft" },
  enchantingTable: {
    label: "Enchanting table",
    item: "Item",
    lapis: "Lapis",
    enchantments: "Enchantments",
    unknown: "Unknown enchantment",
    placeItem: "Place an item",
    notEnoughLevels: "Not enough levels",
    notEnoughLapis: "Not enough lapis",
    unavailable: "Unavailable",
    optionDetail: (level, lapisCost) => `, level ${level}, ${lapisCost} lapis`,
  },
  furnace: {
    label: "Furnace",
    status: {
      idle: "Idle",
      burning: "Burning",
      processing: "Smelting",
      complete: "Complete",
      noFuel: "No fuel",
    },
    progress: "Smelting progress",
  },
  recipeBook: {
    label: "Recipe book",
    search: "Search recipes",
    all: "All",
    categories: "Categories",
    craftableOnly: "Craftable only",
    recipes: "Recipes",
    noMatch: "No recipes match.",
    selectRecipe: "Select a recipe",
    pattern: "Pattern",
    makes: (name) => `Makes ${name}`,
    missingIngredients: "Missing ingredients",
    missingSuffix: (name) => `${name} (missing ingredients)`,
    craft: "Craft",
    count: (count) => `${count} ${plural(count, "recipe", "recipes")}`,
  },
  tradingUI: {
    label: "Trading",
    trades: "Trades",
    levels: ["Novice", "Apprentice", "Journeyman", "Expert", "Master"],
    progressTo: (level) => `Progress to ${level}`,
    payment: "Payment",
    secondPayment: "Second payment",
    trade: "Trade",
    soldOut: "Sold out",
    soldOutSuffix: " (sold out)",
  },
  blockTable: { empty: "No data" },
  skillTree: {
    label: "Skill tree",
    skills: "Skills",
    details: "Skill details",
    points: "Skill points:",
    states: { locked: "locked", available: "available", unlocked: "unlocked" },
    requires: (names) => `Requires: ${names}`,
    unlock: (cost) => `Unlock (${cost} ${plural(cost, "point", "points")})`,
    needs: (cost) => `Needs ${cost} ${plural(cost, "point", "points")}`,
  },
  confirmDialog: { confirm: "Confirm", cancel: "Cancel" },
  toast: { region: "Notifications", dismiss: "Dismiss notification" },
  numberInput: { decrease: "Decrease", increase: "Increase" },
  hud: {
    health: "Health",
    armor: "Armor",
    hunger: "Hunger",
    experience: "Experience",
    playerStatus: "Player status",
    xpValue: (value, max) => `${value} / ${max} XP`,
    level: (level) => `Level ${level}`,
  },
  biomeIndicator: {
    biome: "Biome",
    names: {
      plains: "Plains",
      forest: "Forest",
      desert: "Desert",
      snowy: "Snowy",
      ocean: "Ocean",
      jungle: "Jungle",
      mountains: "Mountains",
      swamp: "Swamp",
      cave: "Cave",
      nether: "Nether",
      end: "End",
    },
  },
  coordinatesHUD: {
    label: "Coordinates",
    facing: "Facing",
    facings: { north: "north", south: "south", east: "east", west: "west" },
    copy: "Copy",
    copyLabel: "Copy coordinates",
    copied: "Coordinates copied",
  },
  dayNightIndicator: {
    label: "Time of day",
    day: "Day",
    phases: { dawn: "Dawn", day: "Day", dusk: "Dusk", night: "Night" },
    am: "AM",
    pm: "PM",
  },
  weatherIndicator: {
    weather: "Weather",
    names: {
      clear: "Clear",
      cloudy: "Cloudy",
      rain: "Rain",
      thunder: "Thunderstorm",
      snow: "Snow",
    },
    clearNight: "Clear",
    remaining: "left",
  },
  miniMap: {
    label: "Mini map",
    directions: [
      "north",
      "north-east",
      "east",
      "south-east",
      "south",
      "south-west",
      "west",
      "north-west",
    ],
    here: (label) => `${label}: here`,
    facing: (direction) => `Facing ${direction}.`,
    northShort: "N",
    distance: (label, blocks, direction) =>
      `${label}: ${blocks} ${plural(blocks, "block", "blocks")} ${direction}`,
  },
  scoreboard: {
    empty: "No scores yet",
    rank: "Rank",
    name: "Name",
    score: "Score",
    more: (count) => `+${count} more`,
  },
  durability: {
    label: "Durability",
    value: (value, max) => `durability ${value} of ${max}`,
  },
  hotbar: { label: "Hotbar" },
  inventory: { title: "Inventory", label: "Inventory" },
  pagination: {
    label: "Pagination",
    previous: "Previous page",
    next: "Next page",
    page: (page) => `Page ${page}`,
    pageOf: (page, count) => `Page ${page} of ${count}`,
  },
  sidebar: { label: "Main" },
  stepper: { label: "Progress" },
  breadcrumb: { label: "Breadcrumb" },
  hotbarNavigation: { label: "Quick navigation" },
  chatWindow: {
    label: "Chat",
    placeholder: "Type a message…",
    messages: (label) => `${label} messages`,
    whispers: (author) => `${author} whispers: `,
    message: "Message",
    send: "Send",
  },
  commandConsole: {
    label: "Console",
    output: (label) => `${label} output`,
    suggestions: "Command suggestions",
    command: "Command",
  },
};

/** Merges a partial override onto a full locale (one level deep per section). */
export function mergeMessages(
  base: BlockUIMessages,
  override?: BlockUIMessagesOverride,
): BlockUIMessages {
  if (!override) return base;
  const merged = { ...base } as Record<string, unknown>;
  for (const key of Object.keys(override) as Array<keyof BlockUIMessages>) {
    merged[key] = { ...base[key], ...override[key] };
  }
  return merged as unknown as BlockUIMessages;
}
