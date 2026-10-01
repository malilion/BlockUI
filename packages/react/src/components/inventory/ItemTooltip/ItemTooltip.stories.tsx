import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryRow } from "../../../stories/StoryLayout";
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
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof ItemTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Rarities: Story = {
  render: () => (
    <StoryRow>
      {itemRarities.map((rarity) => (
        <ItemTooltip key={rarity} name={`${rarity} item`} rarity={rarity} description="Rarity colors the name." />
      ))}
    </StoryRow>
  ),
};

export const Minimal: Story = { args: { name: "Bread", rarity: undefined, enchantments: [], stats: [], description: "Restores 5 hunger." } };
