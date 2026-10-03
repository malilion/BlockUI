import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import {
  AppleIcon,
  ArmorIcon,
  BookIcon,
  BreadIcon,
  CompassIcon,
  DiamondSwordIcon,
  EmeraldIcon,
} from "@malilion/block-ui-icons";
import { StoryMobile, StoryStack } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { ItemStack } from "../../inventory/ItemStack/ItemStack";
import { TradingUI } from "./TradingUI";
import type { Trade } from "./TradingUI.types";

const emeralds = (amount: number) => (
  <ItemStack icon={<EmeraldIcon />} name="Emerald" amount={amount} />
);
const trades: Trade[] = [
  {
    id: "bread",
    cost: emeralds(1),
    result: <ItemStack icon={<BreadIcon />} name="Bread" amount={6} />,
    label: "1 emerald for 6 bread",
  },
  {
    id: "apple",
    cost: emeralds(1),
    result: <ItemStack icon={<AppleIcon />} name="Apple" amount={4} />,
    label: "1 emerald for 4 apples",
  },
  {
    id: "sword",
    cost: emeralds(12),
    cost2: <ItemStack icon={<BookIcon />} name="Book" />,
    result: <ItemStack icon={<DiamondSwordIcon />} name="Diamond Sword" />,
    label: "12 emeralds and a book for a diamond sword",
    uses: 2,
    maxUses: 12,
  },
  {
    id: "armor",
    cost: emeralds(20),
    result: <ItemStack icon={<ArmorIcon />} name="Iron Chestplate" />,
    label: "20 emeralds for an iron chestplate",
  },
  {
    id: "map",
    cost: emeralds(8),
    result: <ItemStack icon={<CompassIcon />} name="Explorer Map" />,
    label: "8 emeralds for an explorer map",
    uses: 4,
    maxUses: 4,
  },
];

const meta = {
  title: "Components/Crafting/TradingUI",
  component: TradingUI,
  tags: ["autodocs"],
  args: {
    trades,
    profession: "Armorer",
    level: 3,
    levelProgress: 55,
    onTrade: fn(),
    onValueChange: fn(),
  },
  argTypes: {
    level: { control: { type: "range", min: 1, max: 5 } },
    levelProgress: { control: { type: "range", min: 0, max: 100 } },
    trades: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component: [
          "Villager trading: a list of offers beside the selected offer's payment and result slots, with the villager's profession and level.",
          "",
          "```tsx",
          'import { TradingUI } from "@malilion/block-ui-react";',
          "",
          "<TradingUI",
          '  profession="Armorer"',
          "  level={3}",
          "  levelProgress={55}",
          '  trades={[{ id: "bread", cost: emeralds(1), result: bread, label: "1 emerald for 6 bread" }]}',
          "  onTrade={(id) => trade(id)}",
          "/>",
          "```",
          "",
          "**Keyboard** — `Tab` into the offer list, `↑`/`↓` move the selection, `Home`/`End` jump, then `Tab` to the Trade button.",
          "",
          '**Accessibility** — the offers are a WAI-ARIA `listbox`; each `option` is named by its `label` and "(sold out)" when used up. Sold-out offers can still be selected to inspect, but the Trade button becomes "Sold out" with `aria-disabled`. The villager level bar is a named progressbar.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof TradingUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <StoryStack>
      <TradingUI {...args} label="Armorer" />
      <TradingUI {...args} label="No villager header" profession={undefined} level={undefined} />
    </StoryStack>
  ),
};

export const States: Story = {
  render: (args) => (
    <StoryStack>
      <TradingUI {...args} label="Sold out selected" defaultValue="map" />
      <TradingUI {...args} label="Master" profession="Librarian" level={5} levelProgress={100} />
    </StoryStack>
  ),
};

/** The offer list scrolls after about eight offers. */
export const Sizes: Story = {
  args: {
    trades: Array.from({ length: 12 }, (_, i) => ({
      id: `t${i}`,
      cost: emeralds(i + 1),
      result: <ItemStack icon={<BreadIcon />} name="Bread" amount={i + 2} />,
      label: `${i + 1} emeralds for ${i + 2} bread`,
    })),
  },
};

export const Disabled: Story = { args: { defaultValue: "map" } };

export const Interactive: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("option", { name: /bread/ }));
    await userEvent.keyboard("{ArrowDown}{ArrowDown}");
    await expect(canvas.getByRole("option", { name: /diamond sword/ })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await userEvent.click(canvas.getByRole("button", { name: "Trade" }));
    await expect(args.onTrade).toHaveBeenCalledWith("sword");
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
