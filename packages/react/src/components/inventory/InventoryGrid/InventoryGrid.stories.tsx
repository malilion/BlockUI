import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { StoryMobile } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import {
  AppleIcon,
  BreadIcon,
  BucketIcon,
  CoalIcon,
  DiamondIcon,
  DirtIcon,
  GrassBlockIcon,
  IronIcon,
  PickaxeIcon,
  PlanksIcon,
  RedstoneIcon,
  SandIcon,
  StoneIcon,
  SwordIcon,
  TorchIcon,
} from "@block-ui/icons";
import type { ReactNode } from "react";
import { InventorySlot } from "../InventorySlot/InventorySlot";
import { ItemStack } from "../ItemStack/ItemStack";
import { ItemTooltip } from "../ItemTooltip/ItemTooltip";
import { InventoryGrid } from "./InventoryGrid";

interface Item {
  name: string;
  icon: ReactNode;
  amount?: number;
  durability?: number;
  maxDurability?: number;
}

const items: Item[] = [
  { name: "Oak Planks", icon: <PlanksIcon />, amount: 64 },
  { name: "Stone", icon: <StoneIcon />, amount: 32 },
  { name: "Diamond", icon: <DiamondIcon />, amount: 12 },
  { name: "Redstone", icon: <RedstoneIcon />, amount: 8 },
  { name: "Iron Ingot", icon: <IronIcon />, amount: 16 },
  { name: "Diamond Pickaxe", icon: <PickaxeIcon />, durability: 126, maxDurability: 1561 },
  { name: "Iron Sword", icon: <SwordIcon />, durability: 200, maxDurability: 250 },
  { name: "Apple", icon: <AppleIcon />, amount: 8 },
  { name: "Bread", icon: <BreadIcon />, amount: 24 },
  { name: "Bucket", icon: <BucketIcon /> },
  { name: "Dirt", icon: <DirtIcon />, amount: 64 },
  { name: "Grass Block", icon: <GrassBlockIcon />, amount: 48 },
  { name: "Sand", icon: <SandIcon />, amount: 12 },
  { name: "Coal", icon: <CoalIcon />, amount: 36 },
  { name: "Torch", icon: <TorchIcon />, amount: 17 },
];

const meta = {
  title: "Components/Inventory/InventoryGrid",
  component: InventoryGrid,
  tags: ["autodocs"],
  args: {
    columns: 5,
    rows: 3,
    slotSize: "lg",
    defaultSelectedIndex: 2,
    onSelectedIndexChange: fn(),
    children: null,
  },
  argTypes: {
    slotSize: { control: "inline-radio", options: ["sm", "md", "lg"] },
    children: { control: false },
  },
  render: (args) => (
    <InventoryGrid {...args}>
      {items.map((item) => (
        <InventorySlot
          key={item.name}
          tooltip={
            <ItemTooltip
              name={item.name}
              stats={
                item.maxDurability
                  ? [{ label: "Durability", value: `${item.durability} / ${item.maxDurability}` }]
                  : undefined
              }
            />
          }
        >
          <ItemStack {...item} maxAmount={64} />
        </InventorySlot>
      ))}
    </InventoryGrid>
  ),
  parameters: {
    docs: {
      description: {
        component: [
          "Inventory grid built on CSS Grid with ARIA `grid` semantics. Slots keep a 1:1 ratio and shrink on small screens.",
          "",
          "```tsx",
          'import { InventoryGrid, InventorySlot, ItemStack } from "@block-ui/react";',
          "",
          "<InventoryGrid columns={9}>",
          "  {items.map((item) => (",
          "    <InventorySlot key={item.id}>",
          "      <ItemStack {...item} />",
          "    </InventorySlot>",
          "  ))}",
          "</InventoryGrid>",
          "```",
          "",
          "**Keyboard** — one tab stop; `←↑→↓` move, `Home`/`End` jump within the row (`Ctrl` for the whole grid), `Enter`/`Space` select, `Escape` closes a tooltip.",
          "",
          '**Accessibility** — ARIA `grid` with `row`/`gridcell` children and a single tab stop (roving `tabindex`). The selected cell has `aria-selected`; disabled and locked cells have `aria-disabled`. Each cell is named after its item ("Diamond, × 12") or announced as "Empty slot".',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof InventoryGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = { args: { columns: 9, rows: 3, slotSize: "md" } };

export const Sizes: Story = { args: { columns: 5, rows: 1, slotSize: "sm" } };

export const Responsive: Story = {
  args: { columns: 9, rows: 2, slotSize: "lg" },
  globals: mobileViewport,
  decorators: [
    (Story) => (
      <StoryMobile>
        <Story />
      </StoryMobile>
    ),
  ],
};

export const States: Story = {
  args: { columns: 5, rows: 1, slotSize: "lg", defaultSelectedIndex: 0 },
  render: (args) => (
    <InventoryGrid {...args}>
      <InventorySlot>
        <ItemStack icon={<DiamondIcon />} amount={12} name="Selected" />
      </InventorySlot>
      <InventorySlot rarity="epic">
        <ItemStack icon={<RedstoneIcon />} amount={8} name="Epic" />
      </InventorySlot>
      <InventorySlot disabled>
        <ItemStack icon={<CoalIcon />} amount={36} name="Disabled" />
      </InventorySlot>
      <InventorySlot locked>
        <ItemStack icon={<IronIcon />} amount={16} name="Locked" />
      </InventorySlot>
    </InventoryGrid>
  ),
};

/** Disabled and locked slots stay in the keyboard path but cannot be selected. */
export const Disabled: Story = {
  args: { columns: 3, rows: 1, slotSize: "lg" },
  render: (args) => (
    <InventoryGrid {...args}>
      <InventorySlot disabled>
        <ItemStack icon={<DiamondIcon />} name="Diamond" />
      </InventorySlot>
      <InventorySlot locked />
      <InventorySlot locked />
    </InventoryGrid>
  ),
};

export const Interactive: Story = {
  args: { columns: 5, rows: 3, slotSize: "lg", defaultSelectedIndex: null },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const cells = canvas.getAllByRole("gridcell");
    cells[0]!.focus();
    await userEvent.keyboard("{ArrowRight}{ArrowDown}");
    await expect(cells[6]).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await expect(cells[6]).toHaveAttribute("aria-selected", "true");
    await expect(args.onSelectedIndexChange).toHaveBeenLastCalledWith(6);
  },
};
