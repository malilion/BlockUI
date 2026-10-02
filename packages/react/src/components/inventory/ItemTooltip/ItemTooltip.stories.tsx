import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { StoryMobile, StoryRow } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { PickaxeIcon } from "@block-ui/icons";
import { InventorySlot } from "../InventorySlot/InventorySlot";
import { ItemStack } from "../ItemStack/ItemStack";
import { ItemTooltip } from "./ItemTooltip";
import { itemRarities } from "./ItemTooltip.types";

const meta = {
  title: "Components/Inventory/ItemTooltip",
  component: ItemTooltip,
  tags: ["autodocs"],
  args: {
    name: "Diamond Pickaxe",
    rarity: "Rare",
    enchantments: ["Efficiency IV", "Unbreaking III"],
    stats: [
      { label: "Attack Damage", value: "+5" },
      { label: "Durability", value: "126 / 1561" },
    ],
  },
  parameters: {
    docs: {
      description: {
        component: [
          "Item details card with a rarity-colored name, enchantments and stats.",
          "",
          "```tsx",
          'import { ItemTooltip } from "@block-ui/react";',
          "",
          '<ItemTooltip name="Diamond Pickaxe" rarity="Rare" enchantments={["Efficiency IV"]} />',
          "```",
          "",
          "Pass it to `InventorySlot`'s `tooltip` prop to show it on hover / focus.",
          "",
          '**Accessibility** — rendered by `InventorySlot` with `role="tooltip"` and linked to the slot through `aria-describedby`, so screen readers read it as the slot\'s description. It opens on hover and on keyboard focus and closes with `Escape`. Rarity is also written as text, never shown by color alone.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof ItemTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <StoryRow>
      {itemRarities.map((rarity) => (
        <ItemTooltip
          key={rarity}
          name={`${rarity} item`}
          rarity={rarity}
          description="Rarity colors the name."
        />
      ))}
    </StoryRow>
  ),
};

export const States: Story = {
  render: () => (
    <StoryRow>
      <ItemTooltip name="Name only" />
      <ItemTooltip name="With rarity" rarity="Rare" />
      <ItemTooltip name="Enchanted" rarity="Epic" enchantments={["Sharpness V", "Looting III"]} />
      <ItemTooltip name="With stats" stats={[{ label: "Damage", value: 7 }]} />
    </StoryRow>
  ),
};

export const Minimal: Story = {
  args: {
    name: "Bread",
    rarity: undefined,
    enchantments: [],
    stats: [],
    description: "Restores 5 hunger.",
  },
};

/** Width grows with content between 180px and 280px. */
export const Sizes: Story = {
  render: () => (
    <StoryRow>
      <ItemTooltip name="Stick" />
      <ItemTooltip
        name="Netherite Sword of the Long Night"
        rarity="Legendary"
        description="A very long description wraps inside the 280px maximum width so tooltips stay readable."
      />
    </StoryRow>
  ),
};

/** Tooltips have no disabled state; a disabled slot still shows its tooltip on focus. */
export const Disabled: Story = {
  render: () => (
    <InventorySlot
      disabled
      onClick={() => undefined}
      tooltip={<ItemTooltip name="Locked Chest" />}
      label="Locked chest slot"
    />
  ),
};

export const Interactive: Story = {
  render: () => (
    <InventorySlot
      onClick={() => undefined}
      tooltip={
        <ItemTooltip name="Diamond Pickaxe" rarity="Rare" enchantments={["Efficiency IV"]} />
      }
    >
      <ItemStack icon={<PickaxeIcon />} name="Diamond Pickaxe" />
    </InventorySlot>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const slot = canvas.getByRole("button", { name: "Diamond Pickaxe" });
    await userEvent.hover(slot);
    await expect(canvas.getByRole("tooltip", { hidden: true })).toBeVisible();
    await userEvent.unhover(slot);
    slot.focus();
    await expect(canvas.getByRole("tooltip", { hidden: true })).toBeVisible();
    await userEvent.keyboard("{Escape}");
    await expect(canvas.getByRole("tooltip", { hidden: true })).not.toBeVisible();
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  render: (args) => (
    <StoryMobile>
      <ItemTooltip {...args} />
    </StoryMobile>
  ),
};
