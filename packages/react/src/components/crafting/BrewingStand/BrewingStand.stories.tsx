import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { BlazePowderIcon, FireIcon, PotionIcon } from "@malilion/block-ui-icons";
import { StoryGrid, StoryMobile } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { ItemStack } from "../../inventory/ItemStack/ItemStack";
import { BrewingStand } from "./BrewingStand";

const wart = <ItemStack icon={<FireIcon />} name="Nether Wart" />;
const blaze = <ItemStack icon={<BlazePowderIcon />} name="Blaze Powder" amount={4} />;
const potion = (name: string, className: string) => (
  <ItemStack icon={<PotionIcon className={className} />} name={name} />
);
const water = potion("Water Bottle", "block-story-potion-water");
const awkward = potion("Awkward Potion", "block-story-potion-awkward");

const meta = {
  title: "Components/Crafting/BrewingStand",
  component: BrewingStand,
  tags: ["autodocs"],
  args: {
    ingredient: wart,
    fuel: blaze,
    bottles: [water, water, water],
    progress: 45,
    fuelLevel: 70,
  },
  argTypes: {
    progress: { control: { type: "range", min: 0, max: 100 } },
    fuelLevel: { control: { type: "range", min: 0, max: 100 } },
    ingredient: { control: false },
    fuel: { control: false },
    bottles: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component: [
          "Brewing stand: fuel with its gauge, the ingredient, a progress bar filling downwards and three bottles. States are derived like the Furnace: idle, brewing, complete, no fuel.",
          "",
          "```tsx",
          'import { BrewingStand } from "@malilion/block-ui-react";',
          "",
          "<BrewingStand ingredient={wart} fuel={blaze} bottles={[water, water, water]} progress={45} fuelLevel={70} />",
          "```",
          "",
          "`PotionIcon` fills with `currentColor` — set `color` (or a class) to tint the liquid.",
          "",
          '**Accessibility** — a labelled group with a "Brewing progress" progressbar, a "Fuel" meter and named slots ("Left bottle: empty"). The status line is a polite live region.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof BrewingStand>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <StoryGrid min="lg">
      <BrewingStand {...args} label="Three bottles" />
      <BrewingStand {...args} label="One bottle" bottles={[undefined, water]} />
    </StoryGrid>
  ),
};

export const States: Story = {
  render: () => (
    <StoryGrid min="lg">
      <BrewingStand label="Idle" />
      <BrewingStand label="No fuel" ingredient={wart} bottles={[water, water]} fuelLevel={0} />
      <BrewingStand
        label="Brewing"
        ingredient={wart}
        fuel={blaze}
        bottles={[water]}
        progress={60}
        fuelLevel={50}
      />
      <BrewingStand
        label="Complete"
        fuel={blaze}
        bottles={[awkward, awkward, awkward]}
        progress={100}
        fuelLevel={45}
      />
    </StoryGrid>
  ),
};

/** Fixed layout: a 40px fuel slot, 52px ingredient and bottle slots. */
export const Sizes: Story = { args: { progress: 0, fuelLevel: 100 } };

export const Disabled: Story = {
  args: { ingredient: undefined, fuel: undefined, bottles: [], progress: 0, fuelLevel: 0 },
};

export const Interactive: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("progressbar", { name: "Brewing progress" })).toHaveAttribute(
      "aria-valuenow",
      "45",
    );
    await expect(canvas.getByText("Brewing 45%")).toBeInTheDocument();
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
