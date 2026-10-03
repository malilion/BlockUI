import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { DiamondSwordIcon, LapisIcon, PickaxeIcon } from "@malilion/block-ui-icons";
import { StoryMobile, StoryStack } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { ItemStack } from "../../inventory/ItemStack/ItemStack";
import { EnchantingTable } from "./EnchantingTable";
import type { EnchantOption } from "./EnchantingTable.types";

const sword = <ItemStack icon={<DiamondSwordIcon />} name="Diamond Sword" />;
const lapis = (amount: number) => (
  <ItemStack icon={<LapisIcon />} name="Lapis Lazuli" amount={amount} />
);
const options: EnchantOption[] = [
  { id: "unbreaking", level: 4, lapisCost: 1, clue: "Unbreaking I…?", runes: "ᒷ⍑ ᓭℸ ̣ ⊣ʖ" },
  { id: "sharpness", level: 17, lapisCost: 2, clue: "Sharpness II…?", runes: "ᓵᔑ ʖ!¡ ⍊╎" },
  { id: "fire", level: 30, lapisCost: 3, clue: "Fire Aspect II…?", runes: "ℸ ̣ ᓭ⍑ ʖᒷ ∴" },
];

const meta = {
  title: "Components/Crafting/EnchantingTable",
  component: EnchantingTable,
  tags: ["autodocs"],
  args: {
    item: sword,
    lapis: lapis(3),
    lapisCount: 3,
    playerLevel: 24,
    options,
    onEnchant: fn(),
  },
  argTypes: {
    playerLevel: { control: { type: "range", min: 0, max: 40 } },
    lapisCount: { control: { type: "range", min: 0, max: 3 } },
    item: { control: false },
    lapis: { control: false },
    options: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component: [
          "Enchanting table: item and lapis slots beside up to three enchantment offers (rune text, a clue, the required level and lapis cost).",
          "",
          "```tsx",
          'import { EnchantingTable } from "@malilion/block-ui-react";',
          "",
          "<EnchantingTable",
          '  item={<ItemStack icon={<DiamondSwordIcon />} name="Diamond Sword" />}',
          "  lapisCount={3}",
          "  playerLevel={24}",
          '  options={[{ id: "sharpness", level: 17, lapisCost: 2, clue: "Sharpness II…?" }]}',
          "  onEnchant={(id) => enchant(id)}",
          "/>",
          "```",
          "",
          "**Keyboard** — each offer is a button in the tab order; `Enter`/`Space` enchant.",
          "",
          '**Accessibility** — offers are buttons named by clue, level and lapis ("Sharpness II…?, level 17, 2 lapis"). Unaffordable offers stay focusable with `aria-disabled` and say why ("Not enough levels" / "Not enough lapis"). Rune text, lapis icons and the floating book are decorative.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof EnchantingTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <StoryStack>
      <EnchantingTable {...args} label="Sword" />
      <EnchantingTable
        {...args}
        label="Pickaxe"
        item={<ItemStack icon={<PickaxeIcon />} name="Iron Pickaxe" />}
        options={[
          { id: "eff", level: 6, lapisCost: 1, clue: "Efficiency I…?" },
          { id: "fortune", level: 21, lapisCost: 2, clue: "Fortune II…?" },
          { id: "silk", level: 30, lapisCost: 3, clue: "Silk Touch…?" },
        ]}
      />
    </StoryStack>
  ),
};

export const States: Story = {
  render: (args) => (
    <StoryStack>
      <EnchantingTable
        {...args}
        label="Empty table"
        item={undefined}
        lapis={undefined}
        lapisCount={0}
      />
      <EnchantingTable {...args} label="Low level" playerLevel={10} />
      <EnchantingTable {...args} label="One lapis" lapis={lapis(1)} lapisCount={1} />
    </StoryStack>
  ),
};

/** Always three offers; the list stretches up to 420px. */
export const Sizes: Story = {
  args: { options: options.slice(0, 1) },
};

export const Disabled: Story = {
  args: { playerLevel: 0, lapisCount: 0, lapis: undefined },
};

export const Interactive: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const fire = canvas.getByRole("button", { name: /Fire Aspect II/ });
    await expect(fire).toHaveAttribute("aria-disabled", "true");
    await userEvent.click(canvas.getByRole("button", { name: /Sharpness II/ }));
    await expect(args.onEnchant).toHaveBeenCalledWith("sharpness");
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  decorators: [
    (Story) => (
      <StoryMobile>
        <Story />
      </StoryMobile>
    ),
  ],
};
