import type { Dispatch } from "react";
import {
  AchievementCard,
  BlockBadge,
  BlockButton,
  BlockStack,
  ChatWindow,
  Furnace,
  InventoryGrid,
  InventorySlot,
  ItemStack,
  ItemTooltip,
  QuestCard,
  RecipeBook,
  Scoreboard,
  TradingUI,
  type Recipe,
  type Trade,
} from "@malilion/block-ui-react";
import { CoinIcon, CraftingIcon, FireIcon, SwordIcon } from "@malilion/block-ui-icons";
import {
  achievements,
  blocks,
  item,
  itemIds,
  quests,
  recipeCost,
  recipes,
  smeltable,
  trades,
  type AchievementId,
  type ItemId,
} from "../game/data";
import type { Action, GameState } from "../game/engine";
import styles from "./panels.module.css";

interface PanelProps {
  state: GameState;
  dispatch: Dispatch<Action>;
}

/* ───────────────────────────── Shared ───────────────────────────── */

export function Stack({
  id,
  amount,
  durability,
}: {
  id: ItemId;
  amount?: number;
  durability?: number;
}) {
  const def = item(id);
  const Icon = def.icon;
  return (
    <ItemStack
      icon={<Icon />}
      amount={amount}
      maxAmount={def.stack > 1 ? def.stack : undefined}
      name={def.name}
      durability={def.tool ? durability : undefined}
      maxDurability={def.tool?.durability}
    />
  );
}

function CoinStack({ amount }: { amount: number }) {
  return <ItemStack icon={<CoinIcon />} amount={amount} name="金幣" />;
}

export function Tooltip({ id, durability }: { id: ItemId; durability?: number }) {
  const def = item(id);
  const stats = [
    ...(def.tool
      ? [
          { label: "挖掘力", value: def.tool.power },
          { label: "攻擊力", value: def.tool.damage },
          {
            label: "耐久度",
            value: `${durability ?? def.tool.durability} / ${def.tool.durability}`,
          },
        ]
      : []),
    ...(def.food ? [{ label: "飢餓值", value: `+${def.food}` }] : []),
    ...(def.fuel ? [{ label: "燃料", value: `${def.fuel} 個物品` }] : []),
  ];
  return (
    <ItemTooltip name={def.name} rarity={def.rarity} description={def.description} stats={stats} />
  );
}

/* ───────────────────────────── Inventory ───────────────────────────── */

export function InventoryPanel({ state }: PanelProps) {
  const owned = itemIds.filter((id) => (state.inventory[id] ?? 0) > 0);
  return (
    <BlockStack gap={4}>
      <InventoryGrid
        columns={9}
        rows={Math.max(3, Math.ceil(owned.length / 9))}
        slotSize="sm"
        label="背包"
      >
        {owned.map((id) => (
          <InventorySlot
            key={id}
            rarity={item(id).rarity}
            tooltip={<Tooltip id={id} durability={state.durability[id]} />}
          >
            <Stack id={id} amount={state.inventory[id]} durability={state.durability[id]} />
          </InventorySlot>
        ))}
      </InventoryGrid>
      <div className={styles.equipment}>
        <span className={styles.label}>盔甲</span>
        <InventorySlot
          size="sm"
          label={state.armorItem ? item(state.armorItem).name : "沒有盔甲"}
          tooltip={state.armorItem ? <Tooltip id={state.armorItem} /> : undefined}
        >
          {state.armorItem ? <Stack id={state.armorItem} /> : null}
        </InventorySlot>
        <span className={styles.hint}>
          {state.armor
            ? `抵擋 ${Math.round((state.armor / 25) * 100)}% 傷害`
            : "合成盔甲來抵擋傷害"}
        </span>
      </div>
      <p className={styles.hint}>工具和食物會自動放進快捷列,滑鼠移到格子上可查看詳情。</p>
    </BlockStack>
  );
}

/* ───────────────────────────── Crafting ───────────────────────────── */

export function CraftingPanel({ state, dispatch }: PanelProps) {
  const list: Recipe[] = recipes.map((r) => {
    const def = item(r.id);
    const affordable = [...recipeCost(r)].every(([id, n]) => (state.inventory[id] ?? 0) >= n);
    const owned =
      (def.tool && state.inventory[r.id]) || (def.armor !== undefined && state.armor >= def.armor);
    return {
      id: r.id,
      name: def.name,
      category: r.category,
      result: <Stack id={r.id} amount={r.amount} />,
      ingredients: r.pattern.map((id) => (id ? <Stack id={id} /> : null)),
      craftable: affordable && !owned,
    };
  });
  return (
    <RecipeBook
      recipes={list}
      categories={[
        { id: "materials", label: "材料", icon: <CraftingIcon /> },
        { id: "tools", label: "工具", icon: <CraftingIcon /> },
        { id: "combat", label: "戰鬥", icon: <SwordIcon /> },
      ]}
      defaultValue="planks"
      onCraft={(id) => dispatch({ type: "craft", id: id as ItemId })}
    />
  );
}

/* ───────────────────────────── Furnace ───────────────────────────── */

export function FurnacePanel({ state, dispatch }: PanelProps) {
  const f = state.furnace;
  const ores = (Object.keys(smeltable) as ItemId[]).filter((id) => state.inventory[id]);
  const fuels = itemIds.filter((id) => item(id).fuel && state.inventory[id]);
  const burning = f.burnLeft > 0 && f.queued > 0;
  return (
    <BlockStack gap={4}>
      <Furnace
        input={f.input ? <Stack id={f.input} amount={f.queued} /> : undefined}
        fuel={f.fuelItem ? <Stack id={f.fuelItem} amount={f.fuelCount} /> : undefined}
        result={
          f.output && f.outputCount ? <Stack id={f.output} amount={f.outputCount} /> : undefined
        }
        progress={(f.progress / 3) * 100}
        burning={burning}
        fuelLevel={f.burnMax ? (f.burnLeft / f.burnMax) * 100 : 0}
        onTakeResult={() => dispatch({ type: "furnaceTake" })}
      />
      <div className={styles.buttonRow}>
        <span className={styles.label}>熔煉</span>
        {ores.length === 0 && <span className={styles.hint}>請先挖到鐵礦或金礦。</span>}
        {ores.map((id) => (
          <BlockButton
            key={id}
            size="sm"
            variant="stone"
            startIcon={<ItemIcon id={id} />}
            onClick={() => dispatch({ type: "furnaceLoad", id })}
          >
            {item(id).name} ×{state.inventory[id]}
          </BlockButton>
        ))}
      </div>
      <div className={styles.buttonRow}>
        <span className={styles.label}>燃料</span>
        {fuels.length === 0 && <span className={styles.hint}>煤炭、原木或木板。</span>}
        {fuels.map((id) => (
          <BlockButton
            key={id}
            size="sm"
            variant="wood"
            startIcon={<ItemIcon id={id} />}
            onClick={() => dispatch({ type: "furnaceFuel", id })}
          >
            {item(id).name} ×{state.inventory[id]}
          </BlockButton>
        ))}
      </div>
      {f.output && f.outputCount > 0 && (
        <BlockButton
          variant="gold"
          startIcon={<FireIcon />}
          onClick={() => dispatch({ type: "furnaceTake" })}
        >
          取出 {f.outputCount} × {item(f.output).name}
        </BlockButton>
      )}
    </BlockStack>
  );
}

function ItemIcon({ id }: { id: ItemId }) {
  const Icon = item(id).icon;
  return <Icon size={16} />;
}

/* ───────────────────────────── Trader ───────────────────────────── */

export function TraderPanel({ state, dispatch }: PanelProps) {
  const level = Math.min(5, 1 + Math.floor(state.stats.traded / 5));
  const list: Trade[] = trades.map((t) => {
    const render = ([id, n]: [ItemId | "coins", number]) =>
      id === "coins" ? <CoinStack amount={n} /> : <Stack id={id} amount={n} />;
    const name = ([id, n]: [ItemId | "coins", number]) =>
      `${n} ${id === "coins" ? "金幣" : item(id).name}`;
    return {
      id: t.id,
      cost: render(t.give),
      result: render(t.get),
      label: `用 ${name(t.give)} 換 ${name(t.get)}`,
      uses: state.tradeUses[t.id] ?? 0,
      maxUses: t.maxUses,
    };
  });
  return (
    <BlockStack gap={3}>
      <BlockBadge variant="gold" icon={<CoinIcon size={16} />}>
        {state.coins} 金幣
      </BlockBadge>
      <TradingUI
        trades={list}
        profession="流浪商人"
        level={level}
        levelProgress={((state.stats.traded % 5) / 5) * 100}
        onTrade={(id) => dispatch({ type: "trade", id })}
      />
    </BlockStack>
  );
}

/* ───────────────────────────── Quests ───────────────────────────── */

export function QuestPanel({ state, dispatch }: PanelProps) {
  const sorted = [...quests].sort(
    (a, b) => Number(state.claimed.includes(a.id)) - Number(state.claimed.includes(b.id)),
  );
  return (
    <div className={styles.cards}>
      {sorted.map((q) => (
        <QuestCard
          key={q.id}
          title={q.title}
          description={q.description}
          progress={Math.min(q.max, q.progress(state.stats))}
          max={q.max}
          xp={q.xp}
          coins={q.coins}
          claimed={state.claimed.includes(q.id)}
          onClaim={() => dispatch({ type: "claim", id: q.id })}
        />
      ))}
    </div>
  );
}

/* ───────────────────────────── Achievements & stats ───────────────────────────── */

export function AchievementPanel({ state }: PanelProps) {
  const ids = Object.keys(achievements) as AchievementId[];
  const entries = [
    { id: "mined", name: "挖掘方塊", score: state.stats.mined },
    { id: "kills", name: "擊敗怪物", score: state.stats.kills },
    { id: "smelted", name: "熔煉金屬錠", score: state.stats.smelted },
    { id: "diamonds", name: "找到鑽石", score: state.stats.collected.diamond ?? 0 },
    { id: "depth", name: "最深層數", score: state.stats.maxDepth },
    { id: "level", name: "等級", score: state.level },
    { id: "deaths", name: "死亡次數", score: state.stats.deaths },
  ];
  const ores = (Object.keys(blocks) as Array<keyof typeof blocks>).filter((b) => blocks[b].overlay);
  return (
    <BlockStack gap={4}>
      <Scoreboard title="統計" entries={entries} sort="none" />
      <Scoreboard
        title="已挖礦石"
        entries={ores.map((b) => ({
          id: b,
          name: blocks[b].name,
          score: state.stats.minedByBlock[b] ?? 0,
        }))}
        emptyText="還沒有紀錄"
      />
      <div className={styles.cards}>
        {ids.map((id) => {
          const a = achievements[id];
          const Icon = a.icon;
          const day = state.achievements[id];
          return (
            <AchievementCard
              key={id}
              title={a.title}
              description={a.description}
              icon={<Icon />}
              unlocked={day !== undefined}
              unlockedAt={day !== undefined ? `第 ${day} 天` : undefined}
            />
          );
        })}
      </div>
    </BlockStack>
  );
}

/* ───────────────────────────── Chat ───────────────────────────── */

export function ChatPanel({ state, dispatch }: PanelProps) {
  return (
    <ChatWindow
      messages={state.chat}
      onSend={(text) => dispatch({ type: "chat", text })}
      placeholder="聊天,或輸入 /help"
      showTimestamps
      size="lg"
    />
  );
}
