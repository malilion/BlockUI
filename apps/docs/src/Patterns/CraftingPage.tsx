// Pattern page from the Block UI docs. It uses the docs' Shell layout (sidebar on
// desktop, hotbar on phones) and patterns.module.css — both live next to this file in
// https://github.com/malilion/BlockUI/tree/main/apps/docs/src/Patterns
import { ChestIcon, CoalIcon, IronIcon, PlanksIcon, StoneIcon } from "@malilion/block-ui-icons";
import {
  BlockPanel,
  CraftingGrid,
  CraftingSlot,
  CraftingTable,
  Furnace,
  ItemStack,
  toast,
} from "@malilion/block-ui-react";
import { useState } from "react";
import styles from "./patterns.module.css";
import { Shell } from "./Shell";

const CHEST_RECIPE = [0, 1, 2, 3, 5, 6, 7, 8];

export function CraftingPage() {
  const [filled, setFilled] = useState(true);
  const [crafted, setCrafted] = useState(0);
  return (
    <Shell active="crafting" title="Crafting">
      <div className={styles.grid2}>
        <BlockPanel title={`Crafting table · ${crafted} crafted`}>
          <CraftingTable
            input={
              <CraftingGrid size={3}>
                {Array.from({ length: 9 }, (_, i) => (
                  <CraftingSlot key={i}>
                    {filled && CHEST_RECIPE.includes(i) ? (
                      <ItemStack icon={<PlanksIcon />} name="Oak Planks" />
                    ) : null}
                  </CraftingSlot>
                ))}
              </CraftingGrid>
            }
            result={filled ? <ItemStack icon={<ChestIcon />} amount={1} name="Chest" /> : undefined}
            onCraft={() => {
              setCrafted((n) => n + 1);
              setFilled(false);
              toast.success("Crafted a chest.");
            }}
            onTake={() => setFilled(true)}
          />
        </BlockPanel>
        <BlockPanel title="Furnace">
          <Furnace
            input={<ItemStack icon={<StoneIcon />} amount={3} name="Iron Ore" />}
            fuel={<ItemStack icon={<CoalIcon />} amount={12} name="Coal" />}
            result={<ItemStack icon={<IronIcon />} amount={2} name="Iron Ingot" />}
            burning
            progress={60}
            fuelLevel={45}
          />
        </BlockPanel>
      </div>
    </Shell>
  );
}
