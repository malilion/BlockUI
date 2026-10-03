import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { BookIcon, IronIcon, PickaxeIcon } from "@malilion/block-ui-icons";
import { StoryGrid, StoryMobile } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { ItemStack } from "../../inventory/ItemStack/ItemStack";
import { Anvil } from "./Anvil";

const pick = (
  <ItemStack icon={<PickaxeIcon />} name="Iron Pickaxe" durability={40} maxDurability={250} />
);
const ingot = <ItemStack icon={<IronIcon />} name="Iron Ingot" amount={2} />;
const repaired = (
  <ItemStack icon={<PickaxeIcon />} name="Lucky Pick" durability={180} maxDurability={250} />
);

const meta = {
  title: "Components/Crafting/Anvil",
  component: Anvil,
  tags: ["autodocs"],
  args: {
    left: pick,
    right: ingot,
    result: repaired,
    defaultName: "Lucky Pick",
    cost: 5,
    playerLevel: 12,
    onNameChange: fn(),
    onTakeResult: fn(),
  },
  argTypes: {
    cost: { control: { type: "range", min: 0, max: 45 } },
    playerLevel: { control: { type: "range", min: 0, max: 45 } },
    left: { control: false },
    right: { control: false },
    result: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component: [
          "Anvil: a rename field, two inputs combining into a result, and the experience cost.",
          "",
          "```tsx",
          'import { Anvil } from "@malilion/block-ui-react";',
          "",
          '<Anvil left={pick} right={ingot} result={repaired} defaultName="Lucky Pick" cost={5} playerLevel={12} onTakeResult={take} />',
          "```",
          "",
          "**Keyboard** — `Tab` reaches the name field and the result slot; `Enter` takes the result.",
          "",
          '**Accessibility** — the name field is labelled "Item name" and disabled until an item is placed. The cost line is a polite live region and describes the result slot; when the player cannot afford it (or it is "Too Expensive!") the result cannot be taken. Cost is shown as text, not only in red.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Anvil>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <StoryGrid min="lg">
      <Anvil {...args} label="Repair" />
      <Anvil
        {...args}
        label="Enchanted book"
        right={<ItemStack icon={<BookIcon />} name="Enchanted Book" />}
        defaultName="Iron Pickaxe"
        cost={9}
      />
    </StoryGrid>
  ),
};

export const States: Story = {
  render: (args) => (
    <StoryGrid min="lg">
      <Anvil
        {...args}
        label="Empty"
        left={undefined}
        right={undefined}
        result={undefined}
        cost={undefined}
        defaultName=""
      />
      <Anvil {...args} label="Not enough levels" cost={20} playerLevel={12} />
      <Anvil {...args} label="Too expensive" cost={41} playerLevel={50} />
    </StoryGrid>
  ),
};

/** The name field grows up to 400px; slots are 52px. */
export const Sizes: Story = {
  args: { defaultName: "A very long custom name for my favourite pickaxe" },
};

export const Disabled: Story = {
  args: { left: undefined, right: undefined, result: undefined, cost: undefined, defaultName: "" },
};

export const Interactive: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name: "Item name" });
    await userEvent.clear(input);
    await userEvent.type(input, "Digger");
    await expect(args.onNameChange).toHaveBeenLastCalledWith("Digger");
    await userEvent.click(canvas.getByRole("button", { name: /^Lucky Pick/ }));
    await expect(args.onTakeResult).toHaveBeenCalled();
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
