import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  AppleIcon,
  BookIcon,
  CoalIcon,
  DiamondIcon,
  EmeraldIcon,
  GoldIcon,
  ObsidianIcon,
  PickaxeIcon,
  RedstoneIcon,
  TorchIcon,
} from "@block-ui/icons";
import { Hotbar } from "../Hotbar/Hotbar";
import { InventoryGrid } from "../InventoryGrid/InventoryGrid";
import { InventorySlot } from "../InventorySlot/InventorySlot";
import { ItemStack } from "../ItemStack/ItemStack";
import { Inventory, InventorySection } from "./Inventory";

const meta = {
  title: "Components/Inventory/Inventory",
  component: Inventory,
  subcomponents: { InventorySection },
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          'An inventory window that stacks sections such as the main storage grid and the hotbar. `variant="chest"` gives a wooden storage container.',
          "",
          "```tsx",
          'import { Inventory, InventorySection, InventoryGrid, Hotbar } from "@block-ui/react";',
          "",
          "<Inventory>",
          '  <InventorySection title="Storage"><InventoryGrid columns={9} rows={3}>…</InventoryGrid></InventorySection>',
          '  <InventorySection title="Hotbar"><Hotbar>…</Hotbar></InventorySection>',
          "</Inventory>",
          "```",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Inventory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Inventory {...args}>
      <InventorySection title="Storage">
        <InventoryGrid columns={9} rows={3}>
          <InventorySlot>
            <ItemStack icon={<DiamondIcon />} amount={12} name="Diamond" />
          </InventorySlot>
          <InventorySlot>
            <ItemStack icon={<RedstoneIcon />} amount={24} name="Redstone" />
          </InventorySlot>
          <InventorySlot>
            <ItemStack icon={<CoalIcon />} amount={36} name="Coal" />
          </InventorySlot>
        </InventoryGrid>
      </InventorySection>
      <InventorySection title="Hotbar">
        <Hotbar hotkeys={false}>
          <InventorySlot>
            <ItemStack icon={<PickaxeIcon />} name="Diamond Pickaxe" />
          </InventorySlot>
          <InventorySlot>
            <ItemStack icon={<TorchIcon />} amount={17} name="Torch" />
          </InventorySlot>
          <InventorySlot>
            <ItemStack icon={<AppleIcon />} amount={8} name="Apple" />
          </InventorySlot>
        </Hotbar>
      </InventorySection>
    </Inventory>
  ),
};

export const Chest: Story = {
  render: () => (
    <Inventory variant="chest" title="Chest">
      <InventoryGrid columns={9} rows={3} label="Chest contents">
        <InventorySlot>
          <ItemStack icon={<DiamondIcon />} amount={32} name="Diamond" />
        </InventorySlot>
        <InventorySlot>
          <ItemStack icon={<GoldIcon />} amount={16} name="Gold Ingot" />
        </InventorySlot>
        <InventorySlot>
          <ItemStack icon={<EmeraldIcon />} amount={8} name="Emerald" />
        </InventorySlot>
        <InventorySlot>
          <ItemStack icon={<ObsidianIcon />} amount={4} name="Obsidian" />
        </InventorySlot>
        <InventorySlot rarity="epic">
          <ItemStack icon={<BookIcon />} name="Enchanted Book" />
        </InventorySlot>
      </InventoryGrid>
    </Inventory>
  ),
};
