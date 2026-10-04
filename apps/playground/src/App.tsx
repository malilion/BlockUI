import { useState, type ReactNode } from "react";
import {
  BlockUIProvider,
  BlockSidebar,
  SidebarItem,
  BlockPanel,
  PlayerCard,
  WorldCard,
  BlockButton,
  IconButton,
  PlayerHUD,
  Inventory,
  InventorySection,
  InventoryGrid,
  InventorySlot,
  ItemStack,
  Hotbar,
  DurabilityBar,
  ItemTooltip,
  CraftingTable,
  CraftingGrid,
  CraftingResult,
  Furnace,
  BlockInput,
  BlockTextarea,
  BlockSelect,
  BlockCheckbox,
  BlockRadio,
  BlockToggle,
  BlockSlider,
  QuestCard,
  AchievementCard,
  ServerCard,
  BlockAlert,
  toast,
  BlockModal,
  ConfirmDialog,
  BlockProgress,
  BlockLoading,
  HealthBar,
  ArmorBar,
  HungerBar,
  XPBar,
  HotbarNavigation,
  BlockBadge,
  BlockTabs,
  Breadcrumb,
  BlockTable,
  BlockPagination,
  BlockMenu,
  BlockTooltip,
  BlockStack,
  BlockDivider,
  BossBar,
  Scoreboard,
  CoordinatesHUD,
  BiomeIndicator,
  DayNightIndicator,
  WeatherIndicator,
  EnchantingTable,
  BrewingStand,
  Anvil,
  TradingUI,
  RecipeBook,
  ServerBrowser,
  WorldBrowser,
  ChatWindow,
  CommandConsole,
  SkillTree,
  MiniMap,
  Avatar,
  Accordion,
  Drawer,
  EmptyState,
  Skeleton,
  NumberInput,
  ContextMenu,
  Popover,
  Kbd,
  BlockStepper,
  type ChatMessage,
  type ConsoleEntry,
  blockButtonVariants,
  type BlockTableColumn,
  type BlockTableSort,
} from "@malilion/block-ui-react";
import type { BlockThemeName } from "@malilion/block-ui-themes";
import { themeNames } from "@malilion/block-ui-themes";
import {
  HomeIcon,
  InventoryIcon,
  CraftingIcon,
  SettingsIcon,
  SearchIcon,
  SwordIcon,
  PickaxeIcon,
  FoodIcon,
  EmeraldIcon,
  GoldIcon,
  RedstoneIcon,
  DiamondIcon,
  CoalIcon,
  TorchIcon,
  AppleIcon,
  QuestIcon,
  WorldIcon,
  PlayIcon,
  CloseIcon,
  MenuIcon,
  PlusIcon,
  LapisIcon,
  PotionIcon,
  BlazePowderIcon,
  BreadIcon,
  BookIcon,
  IronIcon,
  DiamondSwordIcon,
  AxeIcon,
  HeartIcon,
  FireIcon,
} from "@malilion/block-ui-icons";
import styles from "./App.module.css";

/** Block Miner, the demo game built on the published packages (deployed next to Storybook). */
const GAME_URL = "https://malilion.github.io/BlockUI/game/";

const TABS = ["Dashboard", "Inventory", "Crafting", "Cards", "Servers", "Feedback"] as const;
type TabName = (typeof TABS)[number];

const themeOptions = themeNames.map((name) => ({
  value: name,
  label: name.charAt(0).toUpperCase() + name.slice(1),
}));

function slot(
  name: string,
  icon: ReactNode,
  extra?: {
    amount?: number;
    durability?: number;
    maxDurability?: number;
    rarity?: "common" | "uncommon" | "rare" | "epic";
  },
) {
  return (
    <InventorySlot
      rarity={extra?.rarity}
      tooltip={<ItemTooltip name={name} rarity={extra?.rarity} />}
    >
      <ItemStack
        icon={icon}
        name={name}
        amount={extra?.amount}
        durability={extra?.durability}
        maxDurability={extra?.maxDurability}
      />
    </InventorySlot>
  );
}

function DashboardSection() {
  return (
    <BlockPanel title="Dashboard" icon={<HomeIcon size={24} />}>
      <div className={styles.section}>
        <PlayerCard name="BlockMaster_42" level={42} status="Online" xp={1250} maxXp={2000} />
        <WorldCard
          name="Emerald Valley"
          gameMode="Survival"
          day={156}
          seed="834591283"
          lastPlayed="2 hours ago"
        />
      </div>
      <div className={styles.col}>
        <h3 className={styles.heading}>Quick Actions</h3>
        <div className={styles.row}>
          {blockButtonVariants.map((variant) => (
            <BlockButton key={variant} variant={variant}>
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </BlockButton>
          ))}
        </div>
        <div className={styles.row}>
          <IconButton icon={<SearchIcon size={16} />} label="Search" />
          <Popover
            title="Quick Settings"
            content={
              <div className={styles.col}>
                <BlockToggle label="Show coordinates" defaultChecked />
                <BlockToggle label="Auto-jump" />
              </div>
            }
          >
            <IconButton icon={<SettingsIcon size={16} />} label="Settings" />
          </Popover>
        </div>
      </div>
      <div className={styles.col}>
        <h3 className={styles.heading}>Badges</h3>
        <div className={styles.row}>
          <BlockBadge variant="emerald" dot>
            Online
          </BlockBadge>
          <BlockBadge variant="redstone" dot>
            Offline
          </BlockBadge>
          <BlockBadge variant="gold" dot>
            AFK
          </BlockBadge>
          <BlockBadge variant="redstone" icon={<DiamondIcon size={16} />}>
            Admin
          </BlockBadge>
          <BlockBadge variant="water" icon={<SwordIcon size={16} />}>
            Moderator
          </BlockBadge>
          <BlockBadge variant="amethyst">VIP</BlockBadge>
        </div>
        <div className={styles.row}>
          <Avatar name="BlockMaster_42" status="online" size="lg" />
          <Avatar name="Steve" status="away" size="lg" />
          <Avatar name="Alex" status="busy" size="lg" />
          <Avatar name="Notch" status="offline" size="lg" />
        </div>
      </div>
      <div className={styles.col}>
        <h3 className={styles.heading}>Game Rules</h3>
        <BlockTabs
          label="Game rules"
          items={[
            {
              id: "survival",
              label: "Survival",
              icon: <PickaxeIcon size={16} />,
              content: "Gather resources, craft tools and keep your hunger up.",
            },
            {
              id: "creative",
              label: "Creative",
              icon: <EmeraldIcon size={16} />,
              content: "Unlimited blocks, flying and no damage.",
            },
            {
              id: "hardcore",
              label: "Hardcore",
              icon: <RedstoneIcon size={16} />,
              content: "One life. The world is deleted when you die.",
            },
          ]}
        />
      </div>
      <div className={styles.col}>
        <h3 className={styles.heading}>World Settings</h3>
        <Accordion
          defaultValue={["difficulty"]}
          items={[
            {
              id: "difficulty",
              title: "Difficulty",
              content: "Normal — hostile mobs deal standard damage.",
            },
            {
              id: "rules",
              title: "Game rules",
              content: "Keep inventory: off · Daylight cycle: on",
            },
            { id: "border", title: "World border", content: "60,000,000 blocks wide." },
          ]}
        />
      </div>
      <div className={styles.col}>
        <h3 className={styles.heading}>Create World</h3>
        <CreateWorldSteps />
      </div>
      <div className={styles.col}>
        <h3 className={styles.heading}>Current Status</h3>
        <PlayerHUD
          player={{
            health: 16,
            maxHealth: 20,
            armor: 12,
            maxArmor: 20,
            hunger: 18,
            maxHunger: 20,
            level: 42,
            xp: 1250,
            maxXp: 2000,
          }}
        />
        <HealthBar value={16} max={20} showText />
        <ArmorBar value={12} max={20} showText />
        <HungerBar value={18} max={20} showText />
        <XPBar value={1250} max={2000} level={42} showValue />
      </div>
      <div className={styles.col}>
        <h3 className={styles.heading}>World HUD</h3>
        <BossBar name="Ender Dragon" value={140} max={200} segments={10} showPercent />
        <div className={styles.row}>
          <CoordinatesHUD x={120} y={64} z={-340} facing="north" copyable />
          <BiomeIndicator type="forest" name="Dark Forest" />
          <DayNightIndicator time={14.5} day={156} />
          <WeatherIndicator weather="rain" remaining="4 min" />
        </div>
        <MiniMap
          tiles={[
            "wwwwssgggggff",
            "wwwssggggggff",
            "wwssgggddgggf",
            "wssggggddgggt",
            "ssggggggggttt",
            "sgggggggggttn",
            "gggggggggttnn",
            "ffggggggttnnn",
            "fffgggggtnnnn",
          ]}
          heading={45}
          markers={[
            { id: "home", x: -3, y: -2, label: "Home", kind: "home" },
            { id: "alex", x: 4, y: 2, label: "Alex", kind: "player" },
          ]}
        />
        <div>
          <Scoreboard
            title="Kills"
            highlightId="BlockMaster_42"
            entries={[
              { name: "BlockMaster_42", score: 42 },
              { name: "Steve", score: 128 },
              { name: "Alex", score: 302 },
              { name: "Jeb", score: 64 },
            ]}
            showRank
          />
        </div>
      </div>
      <div className={styles.col}>
        <h3 className={styles.heading}>Form</h3>
        <div className={styles.grid}>
          <BlockInput label="Username" placeholder="Enter username..." />
          <BlockTextarea label="Bio" placeholder="Tell us about yourself..." />
          <BlockSelect
            label="Server Region"
            options={[
              { value: "us-east", label: "US East" },
              { value: "eu-west", label: "EU West" },
              { value: "asia", label: "Asia" },
            ]}
          />
          <BlockCheckbox label="Enable PvP" />
          <BlockRadio name="difficulty" value="peaceful" label="Peaceful" defaultChecked />
          <BlockRadio name="difficulty" value="survival" label="Survival" />
          <BlockToggle label="Fullscreen Mode" />
          <BlockSlider label="Render Distance" min={2} max={32} defaultValue={12} />
          <NumberInput label="Max Players" min={1} max={100} defaultValue={20} />
        </div>
      </div>
    </BlockPanel>
  );
}

function InventorySectionView() {
  return (
    <div className={styles.col}>
      <Inventory title="Inventory" icon={<InventoryIcon size={24} />}>
        <InventorySection title="Storage">
          <p className={styles.hint}>
            Right-click an item, or press <Kbd size="sm" keys={["Shift", "F10"]} />, for actions.
          </p>
          <ContextMenu
            label="Item actions"
            items={[
              { id: "split", label: "Split stack" },
              { id: "equip", label: "Equip" },
              { type: "separator" },
              { id: "drop", label: "Drop", danger: true, shortcut: "Q" },
            ]}
            onSelect={(id) => toast.info(`Item action: ${id}`)}
          >
            <InventoryGrid columns={9} rows={3}>
              {slot("Diamond Sword", <SwordIcon size={16} />, {
                durability: 1200,
                maxDurability: 1561,
                rarity: "rare",
              })}
              {slot("Iron Pickaxe", <PickaxeIcon size={16} />, {
                durability: 10,
                maxDurability: 250,
              })}
              {slot("Emerald", <EmeraldIcon size={16} />, { amount: 64 })}
              <InventorySlot />
              {slot("Gold Ingot", <GoldIcon size={16} />, { amount: 12 })}
              {slot("Torch", <TorchIcon size={16} />, { amount: 17 })}
              {slot("Apple", <AppleIcon size={16} />, { amount: 8 })}
            </InventoryGrid>
          </ContextMenu>
        </InventorySection>
        <InventorySection title="Hotbar">
          <Hotbar slots={9} selectedIndex={0}>
            {slot("Diamond Sword", <SwordIcon size={16} />)}
            {slot("Iron Pickaxe", <PickaxeIcon size={16} />)}
            {slot("Bread", <FoodIcon size={16} />, { amount: 64 })}
          </Hotbar>
        </InventorySection>
        <InventorySection title="Durability">
          <div className={styles.durability}>
            <DurabilityBar value={25} max={100} />
          </div>
        </InventorySection>
      </Inventory>
      <Inventory title="Chest" variant="chest">
        <InventorySection title="Storage">
          <InventoryGrid columns={9} rows={3} label="Chest">
            {slot("Coal", <CoalIcon size={16} />, { amount: 36 })}
            {slot("Diamond", <DiamondIcon size={16} />, { amount: 7, rarity: "rare" })}
            {slot("Redstone", <RedstoneIcon size={16} />, { amount: 24 })}
          </InventoryGrid>
        </InventorySection>
      </Inventory>
    </div>
  );
}

function CraftingSection() {
  return (
    <BlockPanel title="Crafting" icon={<CraftingIcon size={24} />}>
      <div className={styles.section}>
        <div className={styles.col}>
          <h3 className={styles.heading}>Crafting Table</h3>
          <CraftingTable
            input={
              <CraftingGrid size={3}>
                <InventorySlot />
                {slot("Gold Ingot", <GoldIcon size={16} />)}
                <InventorySlot />
                <InventorySlot />
                {slot("Diamond Sword", <SwordIcon size={16} />)}
              </CraftingGrid>
            }
            result={
              <CraftingResult>
                <ItemStack icon={<GoldIcon size={16} />} amount={1} name="Gilded Sword" />
              </CraftingResult>
            }
          />
        </div>
        <div className={styles.col}>
          <h3 className={styles.heading}>Furnace</h3>
          <Furnace
            input={
              <InventorySlot>
                <ItemStack icon={<SwordIcon size={16} />} name="Iron Sword" />
              </InventorySlot>
            }
            fuel={
              <InventorySlot>
                <ItemStack icon={<CoalIcon size={16} />} name="Coal" amount={8} />
              </InventorySlot>
            }
            result={
              <InventorySlot>
                <ItemStack icon={<GoldIcon size={16} />} name="Gold Ingot" />
              </InventorySlot>
            }
            burning
            progress={50}
            fuelLevel={30}
          />
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.col}>
          <h3 className={styles.heading}>Enchanting Table</h3>
          <EnchantingTable
            item={<ItemStack icon={<DiamondSwordIcon size={16} />} name="Diamond Sword" />}
            lapis={<ItemStack icon={<LapisIcon size={16} />} name="Lapis Lazuli" amount={2} />}
            lapisCount={2}
            playerLevel={20}
            options={[
              { id: "unbreaking", level: 4, lapisCost: 1, clue: "Unbreaking I…?" },
              { id: "sharpness", level: 17, lapisCost: 2, clue: "Sharpness II…?" },
              { id: "fire", level: 30, lapisCost: 3, clue: "Fire Aspect II…?" },
            ]}
            onEnchant={(id) => toast.success(`Enchanted: ${id}`)}
          />
        </div>
        <div className={styles.col}>
          <h3 className={styles.heading}>Brewing Stand</h3>
          <BrewingStand
            ingredient={<ItemStack icon={<RedstoneIcon size={16} />} name="Redstone" />}
            fuel={<ItemStack icon={<BlazePowderIcon size={16} />} name="Blaze Powder" amount={3} />}
            bottles={[
              <ItemStack
                key="1"
                icon={<PotionIcon size={16} className={styles.potion} />}
                name="Water Bottle"
              />,
              <ItemStack
                key="2"
                icon={<PotionIcon size={16} className={styles.potion} />}
                name="Water Bottle"
              />,
            ]}
            progress={60}
            fuelLevel={55}
          />
        </div>
        <div className={styles.col}>
          <h3 className={styles.heading}>Anvil</h3>
          <Anvil
            left={<ItemStack icon={<PickaxeIcon size={16} />} name="Iron Pickaxe" />}
            right={<ItemStack icon={<IronIcon size={16} />} name="Iron Ingot" amount={2} />}
            result={<ItemStack icon={<PickaxeIcon size={16} />} name="Lucky Pick" />}
            defaultName="Lucky Pick"
            cost={5}
            playerLevel={20}
            onTakeResult={() => toast.success("Repaired!")}
          />
        </div>
      </div>
      <div className={styles.col}>
        <h3 className={styles.heading}>Trading</h3>
        <TradingUI
          profession="Armorer"
          level={3}
          levelProgress={55}
          trades={[
            {
              id: "bread",
              cost: <ItemStack icon={<EmeraldIcon size={16} />} name="Emerald" />,
              result: <ItemStack icon={<BreadIcon size={16} />} name="Bread" amount={6} />,
              label: "1 emerald for 6 bread",
            },
            {
              id: "sword",
              cost: <ItemStack icon={<EmeraldIcon size={16} />} name="Emerald" amount={12} />,
              cost2: <ItemStack icon={<BookIcon size={16} />} name="Book" />,
              result: <ItemStack icon={<DiamondSwordIcon size={16} />} name="Diamond Sword" />,
              label: "12 emeralds and a book for a diamond sword",
            },
            {
              id: "map",
              cost: <ItemStack icon={<EmeraldIcon size={16} />} name="Emerald" amount={8} />,
              result: <ItemStack icon={<QuestIcon size={16} />} name="Explorer Map" />,
              label: "8 emeralds for an explorer map",
              uses: 4,
              maxUses: 4,
            },
          ]}
          onTrade={(id) => toast.success(`Traded: ${id}`)}
        />
      </div>
      <div className={styles.col}>
        <h3 className={styles.heading}>Recipe Book</h3>
        <RecipeBook
          defaultValue="pick"
          recipes={[
            {
              id: "pick",
              name: "Iron Pickaxe",
              category: "tools",
              result: <ItemStack icon={<PickaxeIcon size={16} />} name="Iron Pickaxe" />,
              ingredients: [
                <ItemStack key="a" icon={<IronIcon size={16} />} name="Iron Ingot" />,
                <ItemStack key="b" icon={<IronIcon size={16} />} name="Iron Ingot" />,
                <ItemStack key="c" icon={<IronIcon size={16} />} name="Iron Ingot" />,
                null,
                <ItemStack key="d" icon={<TorchIcon size={16} />} name="Stick" />,
                null,
                null,
                <ItemStack key="e" icon={<TorchIcon size={16} />} name="Stick" />,
                null,
              ],
            },
            {
              id: "sword",
              name: "Diamond Sword",
              category: "combat",
              result: <ItemStack icon={<DiamondSwordIcon size={16} />} name="Diamond Sword" />,
              craftable: false,
            },
            {
              id: "torch",
              name: "Torch",
              category: "building",
              result: <ItemStack icon={<TorchIcon size={16} />} name="Torch" amount={4} />,
            },
            {
              id: "bread",
              name: "Bread",
              category: "food",
              result: <ItemStack icon={<BreadIcon size={16} />} name="Bread" />,
            },
          ]}
          onCraft={(id) => toast.success(`Crafted: ${id}`)}
        />
      </div>
    </BlockPanel>
  );
}

function CardsSection() {
  return (
    <BlockPanel title="Cards" icon={<QuestIcon size={24} />}>
      <div className={styles.section}>
        <QuestCard
          title="Find Diamonds"
          description="Mine 10 diamonds."
          progress={7}
          max={10}
          xp={120}
          coins={500}
        />
        <AchievementCard
          title="Getting an Upgrade"
          description="Construct a better pickaxe."
          icon={<PickaxeIcon size={32} />}
          unlocked
          unlockedAt="2 days ago"
        />
        <PlayerCard name="Steve" level={28} status="Online" xp={1240} maxXp={2000} />
        <ServerCard
          name="Hypixel Network"
          onlinePlayers={45000}
          maxPlayers={100000}
          ping={32}
          motd="Welcome to Hypixel!"
        />
        <WorldCard
          name="My World"
          gameMode="Survival"
          day={128}
          seed="123456789"
          lastPlayed="yesterday"
        />
      </div>
      <div className={styles.col}>
        <h3 className={styles.heading}>Skill Tree</h3>
        <SkillTreeDemo />
      </div>
    </BlockPanel>
  );
}

interface Server {
  id: string;
  name: string;
  mode: string;
  players: number;
  ping: number;
}

const SERVER_MODES = ["Survival", "Creative", "Skyblock", "Minigames", "Hardcore"];
const SERVERS: Server[] = Array.from({ length: 23 }, (_, i) => ({
  id: `server-${i + 1}`,
  name: `Block Realm ${String(i + 1).padStart(2, "0")}`,
  mode: SERVER_MODES[i % SERVER_MODES.length] ?? "Survival",
  players: (i * 137) % 1000,
  ping: 12 + ((i * 53) % 240),
}));
const PAGE_SIZE = 6;

function pingVariant(ping: number) {
  if (ping < 80) return "emerald";
  if (ping < 160) return "gold";
  return "redstone";
}

function compareServers(a: Server, b: Server, sort: BlockTableSort) {
  const key = sort.key as keyof Server;
  const order = String(a[key]).localeCompare(String(b[key]), undefined, { numeric: true });
  return sort.direction === "asc" ? order : -order;
}

function ServersSection() {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<BlockTableSort | null>(null);
  const pageCount = Math.ceil(SERVERS.length / PAGE_SIZE);
  // Sort the whole list, then page it (as a server API would) — hence `manualSort`.
  const sorted = sort ? [...SERVERS].sort((a, b) => compareServers(a, b, sort)) : SERVERS;
  const rows = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const columns: BlockTableColumn<Server>[] = [
    { key: "name", header: "Server", sortable: true, rowHeader: true },
    { key: "mode", header: "Mode", sortable: true },
    { key: "players", header: "Players", sortable: true, align: "end" },
    {
      key: "ping",
      header: "Ping",
      sortable: true,
      align: "end",
      cell: (server) => (
        <BlockBadge size="sm" dot variant={pingVariant(server.ping)}>
          {server.ping} ms
        </BlockBadge>
      ),
    },
    {
      key: "actions",
      header: <span className="block-visually-hidden">Actions</span>,
      align: "end",
      cell: (server) => (
        <BlockMenu
          label={`Actions for ${server.name}`}
          icon={<MenuIcon size={16} />}
          iconOnly
          size="sm"
          align="end"
          items={[
            { id: "join", label: "Join", icon: <PlayIcon size={16} /> },
            { id: "favorite", label: "Add to favorites", icon: <PlusIcon size={16} /> },
            { type: "separator" },
            { id: "remove", label: "Remove", icon: <CloseIcon size={16} />, danger: true },
          ]}
          onSelect={(id) => toast.info(`${id} → ${server.name}`)}
        />
      ),
    },
  ];

  return (
    <>
      <BlockPanel title="Servers" icon={<WorldIcon size={24} />}>
        <BlockStack gap={4}>
          <BlockStack direction="row" justify="between" align="center" wrap stackOnMobile>
            <BlockStack direction="row" gap={2} align="center">
              <BlockTooltip content="Add a server by address">
                <IconButton icon={<PlusIcon size={16} />} label="Add server" />
              </BlockTooltip>
              <BlockTooltip content="Search the server list">
                <IconButton icon={<SearchIcon size={16} />} label="Search servers" />
              </BlockTooltip>
              <BlockDivider orientation="vertical" />
              <BlockMenu
                label="Region"
                icon={<WorldIcon size={16} />}
                items={[
                  { id: "all", label: "All regions" },
                  { id: "us", label: "US East" },
                  { id: "eu", label: "EU West" },
                  { id: "asia", label: "Asia" },
                ]}
                onSelect={(id) => toast.info(`Region: ${id}`)}
              />
            </BlockStack>
            <BlockBadge variant="emerald" dot>
              {SERVERS.length} servers
            </BlockBadge>
          </BlockStack>
          <BlockTable
            caption="Server list"
            hideCaption
            columns={columns}
            rows={rows}
            getRowKey={(server) => server.id}
            sort={sort}
            onSortChange={(next) => {
              setSort(next);
              setPage(1);
            }}
            manualSort
            striped
          />
          <BlockPagination
            label="Server list pages"
            pageCount={pageCount}
            page={page}
            onPageChange={setPage}
          />
          <BlockDivider label="or" />
          <BlockStack direction="row" gap={2} wrap>
            <BlockButton variant="grass" startIcon={<PlayIcon size={16} />}>
              Direct connect
            </BlockButton>
            <BlockButton>Refresh</BlockButton>
          </BlockStack>
        </BlockStack>
      </BlockPanel>
      <BlockPanel title="Community" icon={<WorldIcon size={24} />}>
        <div className={styles.col}>
          <h3 className={styles.heading}>Server Browser</h3>
          <ServerBrowser
            servers={SERVERS.slice(0, 5).map((server) => ({
              id: server.id,
              name: server.name,
              motd: server.mode,
              onlinePlayers: server.players,
              maxPlayers: 1000,
              ping: server.ping,
            }))}
            onJoin={(id) => toast.info(`Joining ${id}`)}
            onRefresh={() => toast.info("Refreshing…")}
          />
          <h3 className={styles.heading}>World Browser</h3>
          <WorldBrowser
            worlds={[
              {
                id: "valley",
                name: "Emerald Valley",
                gameMode: "Survival",
                day: 156,
                lastPlayed: "2 hours ago",
                lastPlayedAt: 3,
              },
              {
                id: "plot",
                name: "Build Plot",
                gameMode: "Creative",
                day: 12,
                lastPlayed: "yesterday",
                lastPlayedAt: 2,
              },
              {
                id: "abyss",
                name: "Abyss",
                gameMode: "Hardcore",
                day: 3,
                lastPlayed: "last week",
                lastPlayedAt: 1,
              },
            ]}
            onPlay={(id) => toast.success(`Loading ${id}`)}
            onCreate={() => toast.info("Create world")}
          />
          <div className={styles.section}>
            <div className={styles.col}>
              <h3 className={styles.heading}>Chat</h3>
              <ChatDemo />
            </div>
            <div className={styles.col}>
              <h3 className={styles.heading}>Console</h3>
              <ConsoleDemo />
            </div>
          </div>
        </div>
      </BlockPanel>
    </>
  );
}

function CreateWorldSteps() {
  const [step, setStep] = useState(1);
  const steps = [
    { id: "name", label: "Name", description: "Emerald Valley" },
    { id: "mode", label: "Game mode", description: "Survival" },
    { id: "terrain", label: "Terrain", description: "Default" },
    { id: "create", label: "Create" },
  ];
  return (
    <div className={styles.col}>
      <BlockStepper
        steps={steps}
        current={step}
        onStepClick={setStep}
        label="Create world progress"
      />
      <div className={styles.row}>
        <BlockButton disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>
          Back
        </BlockButton>
        <BlockButton
          variant="grass"
          disabled={step >= steps.length}
          onClick={() => setStep((s) => s + 1)}
        >
          {step >= steps.length - 1 ? "Create" : "Next"}
        </BlockButton>
      </div>
    </div>
  );
}

function ChatDemo() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "1", type: "join", text: "Alex joined the game" },
    { id: "2", author: "Alex", text: "anyone up for mining?" },
    { id: "3", type: "death", text: "Steve was blown up by Creeper" },
  ]);
  return (
    <ChatWindow
      messages={messages}
      size="sm"
      onSend={(text) =>
        setMessages((previous) => [
          ...previous,
          { id: String(previous.length + 1), author: "BlockMaster_42", text },
        ])
      }
    />
  );
}

function ConsoleDemo() {
  const [entries, setEntries] = useState<ConsoleEntry[]>([
    { id: "1", kind: "input", text: "/time set day" },
    { id: "2", kind: "success", text: "Set the time to 1000" },
  ]);
  return (
    <CommandConsole
      entries={entries}
      size="sm"
      commands={[
        { name: "time", usage: "set <value>", description: "Change the time" },
        { name: "weather", usage: "<clear|rain|thunder>", description: "Change the weather" },
        { name: "give", usage: "<player> <item>", description: "Give an item" },
      ]}
      onRun={(command) =>
        setEntries((previous) => [
          ...previous,
          { id: String(previous.length + 1), kind: "input", text: command },
          { id: String(previous.length + 2), kind: "success", text: "Done." },
        ])
      }
    />
  );
}

function SkillTreeDemo() {
  const [unlocked, setUnlocked] = useState(["mining"]);
  return (
    <SkillTree
      unlocked={unlocked}
      points={3}
      onUnlock={(id) => setUnlocked((previous) => [...previous, id])}
      skills={[
        {
          id: "mining",
          label: "Mining",
          icon: <PickaxeIcon />,
          row: 1,
          column: 2,
          description: "Break stone faster.",
        },
        {
          id: "lumber",
          label: "Lumberjack",
          icon: <AxeIcon />,
          row: 2,
          column: 1,
          requires: ["mining"],
        },
        {
          id: "health",
          label: "Vitality",
          icon: <HeartIcon />,
          row: 2,
          column: 3,
          requires: ["mining"],
        },
        {
          id: "fire",
          label: "Fire Aspect",
          icon: <FireIcon />,
          row: 3,
          column: 2,
          requires: ["lumber", "health"],
        },
      ]}
    />
  );
}

function FeedbackSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <BlockPanel title="Feedback" icon={<RedstoneIcon size={24} />}>
      <div className={styles.col}>
        <h3 className={styles.heading}>Alerts</h3>
        <div className={styles.col}>
          <BlockAlert variant="success">Successfully saved world.</BlockAlert>
          <BlockAlert variant="info">New update available.</BlockAlert>
          <BlockAlert variant="warning">Low disk space.</BlockAlert>
          <BlockAlert variant="error">Failed to connect to server.</BlockAlert>
        </div>
        <h3 className={styles.heading}>Toasts &amp; Modals</h3>
        <div className={styles.row}>
          <BlockButton onClick={() => toast.success("Achievement Unlocked!")}>
            Toast Success
          </BlockButton>
          <BlockButton onClick={() => toast.error("Connection Lost!")}>Toast Error</BlockButton>
          <BlockButton onClick={() => toast.info("Player joined the game")}>Toast Info</BlockButton>
          <BlockButton onClick={() => toast.warning("Durability low")}>Toast Warning</BlockButton>
          <BlockButton onClick={() => setModalOpen(true)}>Open Modal</BlockButton>
          <BlockButton variant="redstone" onClick={() => setConfirmOpen(true)}>
            Delete World
          </BlockButton>
          <BlockButton onClick={() => setDrawerOpen(true)}>Open Drawer</BlockButton>
        </div>
        <Drawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title="Video Settings"
          footer={
            <BlockButton variant="grass" onClick={() => setDrawerOpen(false)}>
              Done
            </BlockButton>
          }
        >
          <div className={styles.col}>
            <BlockToggle label="Smooth lighting" defaultChecked />
            <BlockToggle label="Fullscreen" />
            <NumberInput label="Max frame rate" min={30} max={240} step={10} defaultValue={120} />
          </div>
        </Drawer>
        <BlockModal open={modalOpen} onClose={() => setModalOpen(false)} title="Confirm Action">
          <p>Are you sure you want to delete this world? This action cannot be undone.</p>
          <div className={styles.modalActions}>
            <BlockButton variant="stone" onClick={() => setModalOpen(false)}>
              Cancel
            </BlockButton>
            <BlockButton variant="redstone" onClick={() => setModalOpen(false)}>
              Delete
            </BlockButton>
          </div>
        </BlockModal>
        <ConfirmDialog
          open={confirmOpen}
          title="Delete World"
          description="This world will be lost forever."
          variant="danger"
          confirmText="Delete"
          onConfirm={() => {
            toast.success("World deleted");
            setConfirmOpen(false);
          }}
          onCancel={() => setConfirmOpen(false)}
        />
        <h3 className={styles.heading}>Progress &amp; Loading</h3>
        <div className={styles.col}>
          <BlockProgress value={75} max={100} label="Downloading terrain..." />
          <BlockLoading label="Generating world..." />
        </div>
        <h3 className={styles.heading}>Empty &amp; Loading States</h3>
        <div className={styles.section}>
          <EmptyState
            title="No backups yet"
            description="Back up your world to restore it later."
            action={<BlockButton variant="grass">Create backup</BlockButton>}
            size="sm"
          />
          <div className={styles.col} aria-busy="true">
            <div className={styles.row}>
              <Skeleton variant="avatar" />
              <Skeleton lines={2} width="60%" />
            </div>
            <Skeleton variant="block" height="64px" />
          </div>
        </div>
      </div>
    </BlockPanel>
  );
}

function tabIcon(tab: TabName) {
  switch (tab) {
    case "Dashboard":
      return <HomeIcon size={20} />;
    case "Inventory":
      return <InventoryIcon size={20} />;
    case "Crafting":
      return <CraftingIcon size={20} />;
    case "Cards":
      return <QuestIcon size={20} />;
    case "Servers":
      return <WorldIcon size={20} />;
    case "Feedback":
      return <RedstoneIcon size={20} />;
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabName>("Dashboard");
  const [theme, setTheme] = useState<BlockThemeName>("grassland");

  const renderSection = () => {
    switch (activeTab) {
      case "Dashboard":
        return <DashboardSection />;
      case "Inventory":
        return <InventorySectionView />;
      case "Crafting":
        return <CraftingSection />;
      case "Cards":
        return <CardsSection />;
      case "Servers":
        return <ServersSection />;
      case "Feedback":
        return <FeedbackSection />;
    }
  };

  const themeSelect = (
    <BlockSelect
      value={theme}
      onChange={(event) => setTheme(event.target.value as BlockThemeName)}
      options={themeOptions}
      aria-label="Select Theme"
    />
  );

  return (
    <BlockUIProvider theme={theme} className={styles.root}>
      <div className={styles.layout}>
        <BlockSidebar
          label="Playground Navigation"
          footer={
            <a
              className={`${styles.gameLink} ${styles.gameLinkWide}`}
              href={GAME_URL}
              target="_blank"
              rel="noreferrer"
            >
              <PlayIcon size={16} />
              <span>Play Block Miner</span>
            </a>
          }
        >
          {TABS.map((tab) => (
            <SidebarItem
              key={tab}
              active={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              icon={tabIcon(tab)}
            >
              {tab}
            </SidebarItem>
          ))}
        </BlockSidebar>
        <main className={styles.main}>
          <header className={styles.topBar}>
            <p className={styles.brand}>Block UI</p>
            <div className={styles.topActions}>
              <a className={styles.gameLink} href={GAME_URL} target="_blank" rel="noreferrer">
                <PlayIcon size={16} />
                <span>Play Block Miner</span>
              </a>
              {themeSelect}
            </div>
          </header>
          <Breadcrumb
            className={styles.breadcrumb}
            items={[
              {
                label: "Block UI",
                icon: <HomeIcon size={16} />,
                onClick: () => setActiveTab("Dashboard"),
              },
              { label: activeTab },
            ]}
          />
          {renderSection()}
        </main>
      </div>
      <HotbarNavigation
        items={TABS.map((tab) => ({
          id: tab,
          label: tab,
          icon: tabIcon(tab),
        }))}
        value={activeTab}
        onValueChange={(id) => setActiveTab(id as TabName)}
        maxItems={TABS.length}
        fixed
        mobileOnly
      />
    </BlockUIProvider>
  );
}
