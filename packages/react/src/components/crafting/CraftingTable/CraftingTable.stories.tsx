import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChestIcon, PlanksIcon } from "@block-ui/icons";
import { useState } from "react";
import { fn } from "storybook/test";
import { ItemStack } from "../../inventory/ItemStack/ItemStack";
import { BlockPanel } from "../../layout/BlockPanel/BlockPanel";
import { CraftingGrid } from "../CraftingGrid/CraftingGrid";
import { CraftingSlot } from "../CraftingSlot/CraftingSlot";
import { CraftingTable } from "./CraftingTable";

const ring = [0, 1, 2, 3, 5, 6, 7, 8];

function ChestGrid({ filled }: { filled: boolean }) {
  return (
    <CraftingGrid size={3}>
      {Array.from({ length: 9 }, (_, i) => (
        <CraftingSlot key={i}>
          {filled && ring.includes(i) ? <ItemStack icon={<PlanksIcon />} name="Oak Planks" /> : null}
        </CraftingSlot>
      ))}
    </CraftingGrid>
  );
}

const meta = {
  title: "Components/Crafting/CraftingTable",
  component: CraftingTable,
  tags: ["autodocs"],
  args: {
    input: <ChestGrid filled />,
    result: <ItemStack icon={<ChestIcon />} amount={1} name="Chest" />,
    onTake: fn(),
  },
  argTypes: { input: { control: false }, result: { control: false } },
  parameters: {
    docs: {
      description: {
        component: [
          "Crafting layout: grid → arrow → result. Horizontal on desktop and vertical on mobile.",
          "",
          "```tsx",
          'import { CraftingTable, CraftingGrid, ItemStack } from "@block-ui/react";',
          "",
          "<CraftingTable",
          "  input={<CraftingGrid size={3}>…</CraftingGrid>}",
          "  result={<ItemStack icon={<ChestIcon />} amount={1} />}",
          "/>",
          "```",
          "",
          "Block UI does not ship a recipe engine — compute `result` in your app.",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof CraftingTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = { args: { input: <ChestGrid filled={false} />, result: undefined } };

function InteractiveDemo() {
  const [crafted, setCrafted] = useState(0);
  const [filled, setFilled] = useState(true);
  return (
    <BlockPanel title={`Crafting (${crafted} crafted)`}>
      <CraftingTable
        input={<ChestGrid filled={filled} />}
        result={filled ? <ItemStack icon={<ChestIcon />} amount={1} name="Chest" /> : undefined}
        onCraft={() => {
          setCrafted((n) => n + 1);
          setFilled(false);
        }}
        onTake={() => setFilled(true)}
      />
    </BlockPanel>
  );
}

export const Interactive: Story = { render: () => <InteractiveDemo /> };

export const Responsive: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
