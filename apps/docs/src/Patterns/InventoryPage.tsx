// Pattern page from the Block UI docs. It uses the docs' Shell layout (sidebar on
// desktop, hotbar on phones) and patterns.module.css — both live next to this file in
// https://github.com/malilion/BlockUI/tree/main/apps/docs/src/Patterns
import {
  AppleIcon,
  BreadIcon,
  BucketIcon,
  CoalIcon,
  DiamondIcon,
  DiamondSwordIcon,
  DirtIcon,
  GoldIcon,
  GrassBlockIcon,
  IronIcon,
  PickaxeIcon,
  PlanksIcon,
  RedstoneIcon,
  StoneIcon,
  TorchIcon,
} from "@malilion/block-ui-icons";
import {
  Hotbar,
  Inventory,
  InventoryGrid,
  InventorySection,
  InventorySlot,
  ItemStack,
  ItemTooltip,
} from "@malilion/block-ui-react";
import type { ReactNode } from "react";
import styles from "./patterns.module.css";
import { Shell } from "./Shell";

function slot(
  name: string,
  icon: ReactNode,
  amount?: number,
  extra?: { durability?: number; max?: number },
) {
  return (
    <InventorySlot
      key={name}
      tooltip={
        <ItemTooltip
          name={name}
          stats={
            extra?.max
              ? [{ label: "Durability", value: `${extra.durability} / ${extra.max}` }]
              : undefined
          }
        />
      }
    >
      <ItemStack
        icon={icon}
        name={name}
        amount={amount}
        maxAmount={64}
        durability={extra?.durability}
        maxDurability={extra?.max}
      />
    </InventorySlot>
  );
}

export function InventoryPage() {
  return (
    <Shell active="inventory" title="Inventory">
      <div className={styles.grid2}>
        <Inventory>
          <InventorySection title="Storage">
            <InventoryGrid columns={9} rows={3}>
              {[
                slot("Oak Planks", <PlanksIcon />, 64),
                slot("Stone", <StoneIcon />, 32),
                slot("Diamond", <DiamondIcon />, 12),
                slot("Redstone", <RedstoneIcon />, 8),
                slot("Iron Ingot", <IronIcon />, 16),
                slot("Gold Ingot", <GoldIcon />, 7),
                slot("Coal", <CoalIcon />, 36),
                slot("Dirt", <DirtIcon />, 64),
                slot("Grass Block", <GrassBlockIcon />, 48),
                slot("Apple", <AppleIcon />, 8),
                slot("Bread", <BreadIcon />, 24),
                slot("Bucket", <BucketIcon />),
              ]}
            </InventoryGrid>
          </InventorySection>
          <InventorySection title="Hotbar">
            <Hotbar>
              {[
                slot("Diamond Sword", <DiamondSwordIcon />),
                slot("Diamond Pickaxe", <PickaxeIcon />, undefined, { durability: 126, max: 1561 }),
                slot("Torch", <TorchIcon />, 17),
              ]}
            </Hotbar>
          </InventorySection>
        </Inventory>
        <Inventory variant="chest" title="Chest">
          <InventoryGrid columns={9} rows={3} label="Chest contents">
            {[
              slot("Diamond", <DiamondIcon />, 32),
              slot("Gold Ingot", <GoldIcon />, 16),
              slot("Redstone", <RedstoneIcon />, 24),
            ]}
          </InventoryGrid>
        </Inventory>
      </div>
    </Shell>
  );
}
