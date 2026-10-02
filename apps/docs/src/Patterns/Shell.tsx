import {
  AchievementIcon,
  CraftingIcon,
  HomeIcon,
  InventoryIcon,
  PlayerIcon,
  QuestIcon,
  SettingsIcon,
  WorldIcon,
} from "@block-ui/icons";
import { BlockSidebar, HotbarNavigation, SidebarItem } from "@block-ui/react";
import type { ReactNode } from "react";
import styles from "./patterns.module.css";

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: <HomeIcon size={24} /> },
  { id: "inventory", label: "Inventory", icon: <InventoryIcon size={24} /> },
  { id: "crafting", label: "Crafting", icon: <CraftingIcon size={24} /> },
  { id: "worlds", label: "Worlds", icon: <WorldIcon size={24} /> },
  { id: "quests", label: "Quests", icon: <QuestIcon size={24} /> },
  { id: "players", label: "Players", icon: <PlayerIcon size={24} /> },
  { id: "achievements", label: "Achievements", icon: <AchievementIcon size={24} /> },
  { id: "settings", label: "Settings", icon: <SettingsIcon size={24} /> },
] as const;

export type NavId = (typeof NAV)[number]["id"];

/** Responsive app shell used by the pattern pages: sidebar on desktop, hotbar on mobile. */
export function Shell({
  active,
  title,
  children,
}: {
  active: NavId;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.screen}>
      <BlockSidebar header={<strong>BLOCK UI</strong>}>
        {NAV.map((item) => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            active={item.id === active}
            href={`#${item.id}`}
          >
            {item.label}
          </SidebarItem>
        ))}
      </BlockSidebar>
      <main className={styles.main}>
        <h1 className={styles.title}>{title}</h1>
        {children}
      </main>
      <HotbarNavigation
        className={styles.mobileNav}
        fixed
        mobileOnly
        value={active}
        items={[NAV[0], NAV[1], NAV[2], NAV[4], NAV[7]].map(({ id, label, icon }) => ({
          id,
          label,
          icon,
          href: `#${id}`,
        }))}
      />
    </div>
  );
}
