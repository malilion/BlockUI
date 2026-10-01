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
  blockButtonVariants,
} from "@block-ui/react";
import type { BlockThemeName } from "@block-ui/themes";
import { themeNames } from "@block-ui/themes";
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
} from "@block-ui/icons";
import styles from "./App.module.css";

const TABS = ["Dashboard", "Inventory", "Crafting", "Cards", "Feedback"] as const;
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
          <IconButton icon={<SettingsIcon size={16} />} label="Settings" />
        </div>
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
    </BlockPanel>
  );
}

function FeedbackSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

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
        </div>
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
        <BlockSidebar label="Playground Navigation">
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
            {themeSelect}
          </header>
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
        fixed
        mobileOnly
      />
    </BlockUIProvider>
  );
}
