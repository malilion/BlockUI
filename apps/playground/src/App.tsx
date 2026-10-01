import { useState } from "react";
import {
  BlockUIProvider,
  BlockSidebar, SidebarItem,
  BlockPanel,
  PlayerCard, WorldCard, BlockButton, IconButton, PlayerHUD,
  InventoryGrid, InventorySlot, ItemStack, Hotbar, DurabilityBar, ItemTooltip,
  CraftingTable, CraftingGrid, CraftingResult, Furnace,
  BlockInput, BlockTextarea, BlockSelect, BlockCheckbox, BlockRadio, BlockToggle, BlockSlider,
  QuestCard, AchievementCard, ServerCard,
  BlockAlert, toast, BlockToaster, BlockModal, BlockProgress, BlockLoading,
  HealthBar, ArmorBar, HungerBar, XPBar
} from "@block-ui/react";
import type { BlockThemeName } from "@block-ui/themes";
import { themeNames } from "@block-ui/themes";
import {
  HomeIcon, InventoryIcon, CraftingIcon, SettingsIcon, SearchIcon,
  SwordIcon, PickaxeIcon, ChestIcon, HeartIcon, FoodIcon,
  EmeraldIcon, GoldIcon, RedstoneIcon
} from "@block-ui/icons";
import styles from "./App.module.css";

const TABS = ["Dashboard", "Inventory", "Crafting", "Actions", "Forms", "Cards", "Feedback", "HUD"] as const;
type TabName = typeof TABS[number];

function DashboardSection() {
  return (
    <BlockPanel title="Dashboard" icon={<HomeIcon size={24} />}>
      <div className={styles.section}>
        <PlayerCard
          name="BlockMaster_42"
          level={42}
          status="Online"
          xp={1250}
          maxXp={2000}
        />
        <WorldCard
          name="Emerald Valley"
          gameMode="Survival"
          day={156}
          seed="834591283"
          lastPlayed="2 hours ago"
        />
      </div>
      <div className={styles.row} style={{ marginTop: '2rem' }}>
        <BlockButton variant="diamond">Play Game</BlockButton>
        <BlockButton variant="stone">Server List</BlockButton>
        <BlockButton variant="wood">Settings</BlockButton>
      </div>
      <div style={{ marginTop: '2rem' }}>
        <h3>Current Status</h3>
        <PlayerHUD
          player={{
            health: 16, maxHealth: 20,
            armor: 12, maxArmor: 20,
            hunger: 18, maxHunger: 20,
            level: 42, xp: 1250, maxXp: 2000
          }}
        />
      </div>
    </BlockPanel>
  );
}

function InventorySection() {
  return (
    <BlockPanel title="Inventory" icon={<InventoryIcon size={24} />}>
      <div className={styles.col}>
        <InventoryGrid columns={9} rows={3}>
          <InventorySlot tooltip={<ItemTooltip name="Diamond Sword" rarity="rare" />}>
            <ItemStack icon={<SwordIcon size={16} />} name="Diamond Sword" durability={1200} maxDurability={1561} />
          </InventorySlot>
          <InventorySlot tooltip={<ItemTooltip name="Iron Pickaxe" />}>
            <ItemStack icon={<PickaxeIcon size={16} />} name="Iron Pickaxe" durability={10} maxDurability={250} />
          </InventorySlot>
          <InventorySlot tooltip={<ItemTooltip name="Emerald" />}>
            <ItemStack icon={<EmeraldIcon size={16} />} name="Emerald" amount={64} maxAmount={64} />
          </InventorySlot>
          <InventorySlot />
          <InventorySlot tooltip={<ItemTooltip name="Gold Ingot" />}>
            <ItemStack icon={<GoldIcon size={16} />} name="Gold Ingot" amount={12} maxAmount={64} />
          </InventorySlot>
        </InventoryGrid>

        <h3 style={{ marginTop: '1rem' }}>Hotbar</h3>
        <Hotbar slots={9} selectedIndex={0}>
          <InventorySlot tooltip={<ItemTooltip name="Diamond Sword" />}>
            <ItemStack icon={<SwordIcon size={16} />} />
          </InventorySlot>
          <InventorySlot tooltip={<ItemTooltip name="Iron Pickaxe" />}>
            <ItemStack icon={<PickaxeIcon size={16} />} />
          </InventorySlot>
          <InventorySlot tooltip={<ItemTooltip name="Bread" />}>
            <ItemStack icon={<FoodIcon size={16} />} amount={64} />
          </InventorySlot>
        </Hotbar>
        
        <h3 style={{ marginTop: '1rem' }}>Durability</h3>
        <div style={{ width: '200px' }}>
          <DurabilityBar value={25} max={100} />
        </div>
      </div>
    </BlockPanel>
  );
}

function CraftingSection() {
  return (
    <BlockPanel title="Crafting" icon={<CraftingIcon size={24} />}>
      <div className={styles.section}>
        <div className={styles.col}>
          <h3>Crafting Table</h3>
          <CraftingTable 
            input={
              <CraftingGrid size={3}>
                <InventorySlot />
                <InventorySlot><ItemStack icon={<GoldIcon size={16} />} /></InventorySlot>
                <InventorySlot />
                <InventorySlot />
                <InventorySlot><ItemStack icon={<SwordIcon size={16} />} /></InventorySlot>
              </CraftingGrid>
            }
            result={<CraftingResult><ItemStack icon={<GoldIcon size={16} />} amount={1} /></CraftingResult>}
          />
        </div>
        <div className={styles.col}>
          <h3>Furnace</h3>
          <Furnace 
            input={<InventorySlot><ItemStack icon={<SwordIcon size={16} />} /></InventorySlot>}
            fuel={<InventorySlot><ItemStack icon={<EmeraldIcon size={16} />} /></InventorySlot>}
            result={<InventorySlot><ItemStack icon={<GoldIcon size={16} />} /></InventorySlot>}
            burning
            progress={50}
            fuelLevel={30}
          />
        </div>
      </div>
    </BlockPanel>
  );
}

function ActionsSection() {
  return (
    <BlockPanel title="Actions" icon={<SwordIcon size={24} />}>
      <div className={styles.col}>
        <h3>Variants</h3>
        <div className={styles.row}>
          <BlockButton variant="grass">Grass</BlockButton>
          <BlockButton variant="stone">Stone</BlockButton>
          <BlockButton variant="wood">Wood</BlockButton>
          <BlockButton variant="dirt">Dirt</BlockButton>
          <BlockButton variant="diamond">Diamond</BlockButton>
          <BlockButton variant="emerald">Emerald</BlockButton>
          <BlockButton variant="gold">Gold</BlockButton>
          <BlockButton variant="redstone">Redstone</BlockButton>
          <BlockButton variant="obsidian">Obsidian</BlockButton>
        </div>
        <h3>Sizes</h3>
        <div className={styles.row}>
          <BlockButton size="sm">Small</BlockButton>
          <BlockButton size="md">Medium</BlockButton>
          <BlockButton size="lg">Large</BlockButton>
        </div>
        <h3>Icon Buttons</h3>
        <div className={styles.row}>
          <IconButton icon={<SearchIcon size={16} />} label="Search" />
          <IconButton icon={<SettingsIcon size={16} />} label="Settings" />
        </div>
      </div>
    </BlockPanel>
  );
}

function FormsSection() {
  return (
    <BlockPanel title="Forms" icon={<SettingsIcon size={24} />}>
      <div className={styles.grid} style={{ maxWidth: '400px' }}>
        <BlockInput label="Username" placeholder="Enter username..." />
        <BlockTextarea label="Bio" placeholder="Tell us about yourself..." />
        <BlockSelect label="Server Region" options={[
          { value: 'us-east', label: 'US East' },
          { value: 'eu-west', label: 'EU West' },
          { value: 'asia', label: 'Asia' }
        ]} />
        <BlockCheckbox label="Enable PvP" />
        <BlockRadio name="difficulty" value="peaceful" label="Peaceful" defaultChecked />
        <BlockRadio name="difficulty" value="survival" label="Survival" />
        <BlockToggle label="Fullscreen Mode" />
        <BlockSlider label="Render Distance" min={2} max={32} defaultValue={12} />
      </div>
    </BlockPanel>
  );
}

function CardsSection() {
  return (
    <BlockPanel title="Cards" icon={<ChestIcon size={24} />}>
      <div className={styles.section}>
        <QuestCard
          title="Mine 10 Diamonds"
          description="Find and mine 10 diamond ores in the caves."
          progress={4}
          max={10}
          xp={500}
        />
        <AchievementCard
          title="Getting an Upgrade"
          description="Construct a better pickaxe."
          icon={<PickaxeIcon size={32} />}
          unlocked
          unlockedAt="2 days ago"
        />
        <ServerCard
          name="Hypixel Network"
          onlinePlayers={45000}
          maxPlayers={100000}
          ping={32}
          motd="Welcome to Hypixel!"
        />
      </div>
    </BlockPanel>
  );
}

function FeedbackSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <BlockPanel title="Feedback" icon={<RedstoneIcon size={24} />}>
      <div className={styles.col}>
        <h3>Alerts</h3>
        <div className={styles.col}>
          <BlockAlert variant="success">Successfully saved world.</BlockAlert>
          <BlockAlert variant="info">New update available.</BlockAlert>
          <BlockAlert variant="warning">Low disk space.</BlockAlert>
          <BlockAlert variant="error">Failed to connect to server.</BlockAlert>
        </div>
        
        <h3>Toasts & Modals</h3>
        <div className={styles.row}>
          <BlockButton onClick={() => toast.success("Achievement Unlocked!")}>Toast Success</BlockButton>
          <BlockButton onClick={() => toast.error("Connection Lost!")}>Toast Error</BlockButton>
          <BlockButton onClick={() => toast.info("Player joined the game")}>Toast Info</BlockButton>
          <BlockButton onClick={() => toast.warning("Durability low")}>Toast Warning</BlockButton>
          <BlockButton onClick={() => setModalOpen(true)}>Open Modal</BlockButton>
        </div>

        <BlockModal open={modalOpen} onClose={() => setModalOpen(false)} title="Confirm Action">
          <p>Are you sure you want to delete this world? This action cannot be undone.</p>
          <div className={styles.row} style={{ marginTop: '1rem', justifyContent: 'flex-end' }}>
            <BlockButton variant="stone" onClick={() => setModalOpen(false)}>Cancel</BlockButton>
            <BlockButton variant="redstone" onClick={() => setModalOpen(false)}>Delete</BlockButton>
          </div>
        </BlockModal>

        <h3>Progress & Loading</h3>
        <div className={styles.col}>
          <BlockProgress value={75} max={100} label="Downloading terrain..." />
          <BlockLoading label="Generating world..." />
        </div>
      </div>
    </BlockPanel>
  );
}

function HUDSection() {
  return (
    <BlockPanel title="HUD Elements" icon={<HeartIcon size={24} />}>
      <div className={styles.col}>
        <h3>Individual Bars</h3>
        <div className={styles.col} style={{ gap: '1rem' }}>
          <HealthBar value={15} max={20} showText />
          <ArmorBar value={12} max={20} showText />
          <HungerBar value={18} max={20} showText />
          <XPBar value={340} max={1000} level={12} showValue />
        </div>
      </div>
    </BlockPanel>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabName>("Dashboard");
  const [theme, setTheme] = useState<BlockThemeName>("grassland");

  const renderSection = () => {
    switch (activeTab) {
      case "Dashboard": return <DashboardSection />;
      case "Inventory": return <InventorySection />;
      case "Crafting": return <CraftingSection />;
      case "Actions": return <ActionsSection />;
      case "Forms": return <FormsSection />;
      case "Cards": return <CardsSection />;
      case "Feedback": return <FeedbackSection />;
      case "HUD": return <HUDSection />;
    }
  };

  const getIcon = (tab: TabName) => {
    switch (tab) {
      case "Dashboard": return <HomeIcon size={20} />;
      case "Inventory": return <InventoryIcon size={20} />;
      case "Crafting": return <CraftingIcon size={20} />;
      case "Actions": return <SwordIcon size={20} />;
      case "Forms": return <SettingsIcon size={20} />;
      case "Cards": return <ChestIcon size={20} />;
      case "Feedback": return <RedstoneIcon size={20} />;
      case "HUD": return <HeartIcon size={20} />;
    }
  };

  return (
    <BlockUIProvider theme={theme}>
      <div className={styles.layout}>
        <BlockSidebar 
          label="Playground Navigation"
          footer={
            <BlockSelect 
              value={theme}
              onChange={(e) => setTheme(e.target.value as BlockThemeName)}
              options={(themeNames || ["grassland", "cave", "deepslate", "nether", "end"]).map(t => ({ value: t, label: t }))}
              aria-label="Select Theme"
            />
          }
        >
          {TABS.map(tab => (
            <SidebarItem 
              key={tab} 
              active={activeTab === tab} 
              onClick={() => setActiveTab(tab)}
              icon={getIcon(tab)}
            >
              {tab}
            </SidebarItem>
          ))}
        </BlockSidebar>
        <main className={styles.main}>
          {renderSection()}
        </main>
      </div>
      <BlockToaster />
    </BlockUIProvider>
  );
}
