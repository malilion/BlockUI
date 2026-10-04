import { useEffect, useReducer, useState } from "react";
import {
  BiomeIndicator,
  BlockBadge,
  BlockButton,
  BlockModal,
  BlockPanel,
  BlockTabs,
  BlockUIProvider,
  BossBar,
  ConfirmDialog,
  CoordinatesHUD,
  DayNightIndicator,
  Hotbar,
  IconButton,
  InventorySlot,
  Kbd,
  PlayerHUD,
  WeatherIndicator,
  toast,
  zhTWMessages,
} from "@malilion/block-ui-react";
import {
  AchievementIcon,
  ArrowIcon,
  ChestIcon,
  CoinIcon,
  CraftingIcon,
  FireIcon,
  HeartIcon,
  InfoIcon,
  PickaxeIcon,
  QuestIcon,
  SettingsIcon,
  WorldIcon,
} from "@malilion/block-ui-icons";
import { item, layerFor, monsters, quests } from "./game/data";
import {
  canDescend,
  COLS,
  isNight,
  loadGame,
  MAX_HEALTH,
  MAX_HUNGER,
  newGame,
  reducer,
  saveGame,
  selectedItem,
  xpToNext,
  yLevel,
  type ToastMsg,
} from "./game/engine";
import { MineField } from "./components/MineField";
import {
  AchievementPanel,
  ChatPanel,
  CraftingPanel,
  FurnacePanel,
  InventoryPanel,
  QuestPanel,
  Stack,
  Tooltip,
  TraderPanel,
} from "./components/panels";
import styles from "./App.module.css";

function showToast({ id, variant, message, title }: ToastMsg) {
  const options = { id, title, duration: 3200 };
  if (variant === "success") toast.success(message, options);
  else if (variant === "warning") toast.warning(message, options);
  else if (variant === "error") toast.error(message, options);
  else toast.info(message, options);
}

export default function App() {
  const [saved] = useState(loadGame);
  const [state, dispatch] = useReducer(reducer, saved ?? newGame());
  const [welcome, setWelcome] = useState(!saved);
  const [confirmReset, setConfirmReset] = useState(false);
  const [tab, setTab] = useState("inventory");

  const paused = welcome || confirmReset;
  const layer = layerFor(state.depth);
  const night = isNight(state.time);
  const held = selectedItem(state);
  const monster = state.monster;
  const claimable = quests.filter(
    (q) => !state.claimed.includes(q.id) && q.progress(state.stats) >= q.max,
  ).length;

  // Game clock
  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      if (!document.hidden) dispatch({ type: "tick" });
    }, 1000);
    return () => window.clearInterval(id);
  }, [paused]);

  // Toasts queued by the reducer
  useEffect(() => {
    if (!state.toasts.length) return;
    state.toasts.forEach(showToast);
    dispatch({ type: "toastsShown" });
  }, [state.toasts]);

  // Autosave
  useEffect(() => saveGame(state), [state]);

  // E = eat, F = attack, ↓ = descend
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target instanceof Element ? e.target : null;
      if (
        paused ||
        e.metaKey ||
        e.ctrlKey ||
        e.altKey ||
        target?.closest("input, textarea, select, [role=dialog]")
      )
        return;
      const key = e.key.toLowerCase();
      if (key === "e") dispatch({ type: "eat" });
      else if (key === "f") dispatch({ type: "attack" });
      else return;
      e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paused]);

  const heldDef = held ? item(held) : null;
  const MonsterIcon = monster ? monsters[monster.id].icon : null;

  return (
    <BlockUIProvider
      theme={layer.theme}
      messages={zhTWMessages}
      className={styles.app}
      data-night={night || undefined}
    >
      <header className={styles.topbar}>
        <div className={styles.brand}>
          <PickaxeIcon size={32} />
          <div>
            <h1 className={styles.title}>方塊礦工</h1>
            <p className={styles.subtitle}>用 Block UI 打造的小遊戲</p>
          </div>
        </div>
        <div className={styles.status}>
          <DayNightIndicator time={state.time} day={state.day} size="sm" />
          <WeatherIndicator weather={state.weather} night={night} size="sm" />
          <BiomeIndicator type={layer.biome} name={layer.name} size="sm" />
          <CoordinatesHUD
            x={0}
            y={yLevel(state.depth)}
            z={state.depth * 16}
            facing="north"
            size="sm"
          />
          <BlockBadge variant="gold" icon={<CoinIcon size={16} />}>
            {state.coins}
          </BlockBadge>
          <IconButton
            label="遊戲說明"
            variant="stone"
            size="sm"
            icon={<InfoIcon />}
            onClick={() => setWelcome(true)}
          />
          <IconButton
            label="建立新世界"
            variant="redstone"
            size="sm"
            icon={<SettingsIcon />}
            onClick={() => setConfirmReset(true)}
          />
        </div>
      </header>

      <main className={styles.layout}>
        <section className={styles.play} aria-label="世界">
          <BlockPanel
            title={`${layer.name} · Y ${yLevel(state.depth)}`}
            icon={<WorldIcon />}
            actions={
              <div className={styles.actions}>
                <BlockButton
                  size="sm"
                  variant="stone"
                  disabled={state.depth === 0}
                  onClick={() => dispatch({ type: "ascend" })}
                >
                  ▲ 往上
                </BlockButton>
                <BlockButton
                  size="sm"
                  variant={canDescend(state.world) ? "diamond" : "stone"}
                  disabled={!canDescend(state.world)}
                  title={canDescend(state.world) ? "往下一層" : "請先挖到最底排"}
                  onClick={() => dispatch({ type: "descend" })}
                >
                  ▼ 往下挖
                </BlockButton>
              </div>
            }
          >
            <div className={styles.worldWrap}>
              {monster && MonsterIcon && (
                <div className={styles.monster} role="region" aria-label="怪物">
                  <MonsterIcon size={48} className={styles.monsterIcon} />
                  <BossBar
                    className={styles.bossbar}
                    name={`${monsters[monster.id].name}${monster.fuse !== undefined ? ` — ${monster.fuse} 秒後爆炸` : ""}`}
                    value={monster.hp}
                    max={monsters[monster.id].hp}
                    color={monsters[monster.id].color}
                    segments={10}
                  />
                  <BlockButton
                    variant="redstone"
                    startIcon={<ArrowIcon />}
                    onClick={() => dispatch({ type: "attack" })}
                  >
                    攻擊 <Kbd size="sm">F</Kbd>
                  </BlockButton>
                </div>
              )}
              <MineField
                world={state.world}
                depth={state.depth}
                onMine={(index) => dispatch({ type: "mine", index })}
              />
              {night && state.depth === 0 && <div className={styles.nightTint} aria-hidden />}
            </div>
            <p className={styles.tip}>
              點擊空地旁的方塊來挖掘,挖到最底排就能往下一層。
              {heldDef ? (
                <>
                  手持<strong>{heldDef.name}</strong>。
                </>
              ) : (
                <>目前空手。</>
              )}
            </p>
          </BlockPanel>

          <div className={styles.hud}>
            <PlayerHUD
              player={{
                name: "礦工",
                health: state.health,
                maxHealth: MAX_HEALTH,
                hunger: state.hunger,
                maxHunger: MAX_HUNGER,
                armor: state.armor,
                maxArmor: 20,
                level: state.level,
                xp: state.xp,
                maxXp: xpToNext(state.level),
              }}
            />
            <Hotbar
              selectedIndex={state.selected}
              onSelect={(index) => dispatch({ type: "select", index })}
              label="快捷列"
            >
              {state.hotbar.map((id, i) =>
                id ? (
                  <InventorySlot
                    key={`${id}-${i}`}
                    rarity={item(id).rarity}
                    tooltip={<Tooltip id={id} durability={state.durability[id]} />}
                  >
                    <Stack id={id} amount={state.inventory[id]} durability={state.durability[id]} />
                  </InventorySlot>
                ) : (
                  <InventorySlot key={`empty-${i}`} />
                ),
              )}
            </Hotbar>
            <div className={styles.keys}>
              <span>
                <Kbd size="sm">1</Kbd>–<Kbd size="sm">9</Kbd> 選擇
              </span>
              <span>
                <Kbd size="sm">E</Kbd> 吃東西
              </span>
              <span>
                <Kbd size="sm">F</Kbd> 攻擊
              </span>
              {heldDef?.food && (
                <BlockButton
                  size="sm"
                  variant="grass"
                  startIcon={<HeartIcon size={16} />}
                  onClick={() => dispatch({ type: "eat" })}
                >
                  吃{heldDef.name}
                </BlockButton>
              )}
            </div>
          </div>
        </section>

        <aside className={styles.side} aria-label="遊戲選單">
          <BlockTabs
            value={tab}
            onValueChange={setTab}
            label="遊戲選單"
            items={[
              {
                id: "inventory",
                label: "背包",
                icon: <ChestIcon />,
                content: <InventoryPanel state={state} dispatch={dispatch} />,
              },
              {
                id: "craft",
                label: "合成",
                icon: <CraftingIcon />,
                content: <CraftingPanel state={state} dispatch={dispatch} />,
              },
              {
                id: "furnace",
                label: "熔煉",
                icon: <FireIcon />,
                content: <FurnacePanel state={state} dispatch={dispatch} />,
              },
              {
                id: "trade",
                label: "交易",
                icon: <CoinIcon />,
                content: <TraderPanel state={state} dispatch={dispatch} />,
              },
              {
                id: "quests",
                label: claimable ? `任務 (${claimable})` : "任務",
                icon: <QuestIcon />,
                content: <QuestPanel state={state} dispatch={dispatch} />,
              },
              {
                id: "stats",
                label: "統計",
                icon: <AchievementIcon />,
                content: <AchievementPanel state={state} dispatch={dispatch} />,
              },
              {
                id: "chat",
                label: "聊天",
                icon: <InfoIcon />,
                content: <ChatPanel state={state} dispatch={dispatch} />,
              },
            ]}
          />
        </aside>
      </main>

      <footer className={styles.footer}>
        使用 <code>@malilion/block-ui-react</code> + <code>@malilion/block-ui-icons</code> 打造 ·{" "}
        {COLS}×7 世界 · 進度自動儲存
      </footer>

      <BlockModal
        open={welcome}
        onClose={() => setWelcome(false)}
        title="方塊礦工"
        description="挖礦、合成、熔煉、求生——畫面上每個介面都是 Block UI 元件。"
        icon={<PickaxeIcon size={32} />}
        footer={
          <BlockButton variant="grass" onClick={() => setWelcome(false)}>
            開始挖礦
          </BlockButton>
        }
      >
        <ol className={styles.howto}>
          <li>點擊地表上的樹把它砍下來(有斧頭會更快)。</li>
          <li>
            打開<strong>合成</strong>分頁:把原木做成木板,再做一把木鎬。
          </li>
          <li>在快捷列選擇木鎬(按鍵 1–9),開始往石頭裡挖。</li>
          <li>
            升級工具:石頭 → 鐵 → 鑽石。在<strong>熔煉</strong>分頁用煤炭把鐵礦和金礦煉成錠。
          </li>
          <li>
            挖一條通道到最底排,再按<strong>往下挖</strong>:洞穴、深板岩、地獄和終界都在等著你。
          </li>
          <li>
            夜晚和地底會出現怪物,合成一把劍後按 <Kbd size="sm">F</Kbd> 攻擊。按{" "}
            <Kbd size="sm">E</Kbd> 吃東西。
          </li>
          <li>完成任務領取獎勵,把寶石賣給商人換金幣。</li>
        </ol>
      </BlockModal>

      <BlockModal
        open={state.dead !== null}
        onClose={() => dispatch({ type: "respawn" })}
        title="你死了!"
        description={`礦工${state.dead ?? ""}。`}
        icon={<HeartIcon size={32} />}
        role="alertdialog"
        closeOnOverlayClick={false}
        hideCloseButton
        footer={
          <BlockButton variant="grass" onClick={() => dispatch({ type: "respawn" })}>
            重生
          </BlockButton>
        }
      >
        <p className={styles.dead}>物品會保留,但會失去一半的金幣。等級:{state.level}</p>
      </BlockModal>

      <ConfirmDialog
        open={confirmReset}
        title="要建立新世界嗎?"
        description="目前的進度會被刪除。"
        variant="danger"
        confirmText="建立新世界"
        onConfirm={() => {
          dispatch({ type: "reset" });
          setConfirmReset(false);
          setWelcome(true);
        }}
        onCancel={() => setConfirmReset(false)}
      />
    </BlockUIProvider>
  );
}
