import type { Meta, StoryObj } from "@storybook/react-vite";
import { CoalIcon, DiamondIcon, IronIcon, PickaxeIcon } from "@malilion/block-ui-icons";
import {
  BiomeIndicator,
  BlockPagination,
  BlockPanel,
  BlockUIProvider,
  ChatWindow,
  CoordinatesHUD,
  DayNightIndicator,
  Furnace,
  InventoryGrid,
  InventorySlot,
  ItemStack,
  PlayerHUD,
  QuestCard,
  WeatherIndicator,
  zhTWMessages,
  type BlockUIMessages,
  type BlockUIMessagesOverride,
  type ChatMessage,
} from "@malilion/block-ui-react";
import styles from "./foundations.module.css";
import { CodeBlock } from "./CodeBlock";

const meta = {
  title: "Foundations/Localization",
  tags: ["!autodocs"],
  parameters: {
    layout: "padded",
    a11y: { config: { rules: [] } },
    // The page has its own Usage code blocks.
    docs: { codePanel: false },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const usage = [
  `import { BlockUIProvider, zhTWMessages } from "@malilion/block-ui-react";

// Every built-in string of every component switches to Traditional Chinese.
<BlockUIProvider messages={zhTWMessages}>
  <App />
</BlockUIProvider>`,
  `// Override a few strings — the rest stays English.
<BlockUIProvider messages={{ questCard: { claim: "Collect" }, chatWindow: { send: "Post" } }}>
  <App />
</BlockUIProvider>`,
  `import { enMessages, type BlockUIMessages } from "@malilion/block-ui-react";

// A full locale is typed, so a missing key is a compile error.
// Strings with values are functions: each language picks its own word order.
export const jaMessages: BlockUIMessages = {
  ...enMessages,
  worldCard: { ...enMessages.worldCard, day: (day) => \`\${day}日目\` },
  // …
};`,
];

interface Column {
  id: string;
  title: string;
  lang: string;
  messages?: BlockUIMessages | BlockUIMessagesOverride;
  /** Text this page writes itself (item names, chat lines) — not part of the locale. */
  content: { pickaxe: string; diamond: string; coal: string; ore: string; remaining: string };
  quest: { title: string; description: string };
  chat: ChatMessage[];
}

const columns: Column[] = [
  {
    id: "en",
    title: "English (default)",
    lang: "en",
    content: {
      pickaxe: "Pickaxe",
      diamond: "Diamond",
      coal: "Coal",
      ore: "Iron Ore",
      remaining: "4 min",
    },
    quest: { title: "Find Diamonds", description: "Mine 10 diamonds." },
    chat: [
      { id: "1", type: "join", text: "Alex joined the game" },
      { id: "2", author: "Alex", text: "Meet at spawn?" },
      { id: "3", type: "whisper", author: "Steve", text: "On my way" },
    ],
  },
  {
    id: "zh-TW",
    title: "繁體中文 · zhTWMessages",
    lang: "zh-Hant-TW",
    messages: zhTWMessages,
    content: { pickaxe: "鎬", diamond: "鑽石", coal: "煤炭", ore: "鐵礦", remaining: "4 分鐘" },
    quest: { title: "尋找鑽石", description: "挖到 10 顆鑽石。" },
    chat: [
      { id: "1", type: "join", text: "Alex 加入了遊戲" },
      { id: "2", author: "Alex", text: "重生點集合?" },
      { id: "3", type: "whisper", author: "Steve", text: "馬上到" },
    ],
  },
];

function LocalizedPreview({ column }: { column: Column }) {
  const { content } = column;
  return (
    <BlockUIProvider
      theme="grassland"
      toaster={false}
      messages={column.messages}
      lang={column.lang}
      className={styles.themeCard}
    >
      <BlockPanel title={column.title} headingLevel={2}>
        <div className={styles.scale}>
          <div className={styles.row}>
            <DayNightIndicator time={20.5} day={12} size="sm" />
            <WeatherIndicator weather="thunder" remaining={content.remaining} size="sm" />
          </div>
          <div className={styles.row}>
            <BiomeIndicator type="forest" size="sm" />
            <CoordinatesHUD x={128} y={64} z={-42} facing="north" size="sm" />
          </div>
          <PlayerHUD
            player={{
              name: "Steve",
              health: 14,
              hunger: 18,
              armor: 8,
              level: 12,
              xp: 40,
              maxXp: 100,
            }}
          />
          <InventoryGrid
            columns={4}
            rows={1}
            slotSize="sm"
            label={`${column.id} inventory`}
            defaultSelectedIndex={0}
          >
            <InventorySlot>
              <ItemStack
                icon={<PickaxeIcon />}
                name={content.pickaxe}
                durability={120}
                maxDurability={250}
              />
            </InventorySlot>
            <InventorySlot>
              <ItemStack icon={<DiamondIcon />} amount={12} maxAmount={64} name={content.diamond} />
            </InventorySlot>
          </InventoryGrid>
          <QuestCard
            title={column.quest.title}
            description={column.quest.description}
            progress={7}
            max={10}
            xp={120}
            coins={500}
            onClaim={() => {}}
          />
          <Furnace
            input={<ItemStack icon={<IronIcon />} amount={6} name={content.ore} />}
            fuel={<ItemStack icon={<CoalIcon />} amount={3} name={content.coal} />}
            progress={45}
            burning
            fuelLevel={70}
          />
          <BlockPagination pageCount={12} defaultPage={4} label={`${column.id} pagination`} />
          <ChatWindow
            messages={column.chat}
            onSend={() => {}}
            size="sm"
            label={column.id === "en" ? "Chat (English)" : "聊天(中文)"}
          />
        </div>
      </BlockPanel>
    </BlockUIProvider>
  );
}

function LocalizationPage() {
  return (
    <main className={styles.page}>
      <section>
        <h1>Localization</h1>
        <p className={styles.intro}>
          Every built-in string — button labels, empty states, accessible names, status and
          interpolated texts such as “Day 12” — comes from <code>BlockUIProvider</code>’s{" "}
          <code>messages</code>. English is the default and <code>zhTWMessages</code> ships with the
          package. Props such as <code>label</code>, <code>placeholder</code> or{" "}
          <code>statusLabels</code> still win. Use the <strong>Language</strong> toolbar button to
          switch every component story.
        </p>
      </section>
      <section>
        <h2>Usage</h2>
        {usage.map((code) => (
          <CodeBlock key={code} code={code} label="Copy usage example" />
        ))}
      </section>
      <div className={styles.themes}>
        {columns.map((column) => (
          <LocalizedPreview key={column.id} column={column} />
        ))}
      </div>
    </main>
  );
}

export const Localization: Story = { render: () => <LocalizationPage /> };
