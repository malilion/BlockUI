import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { DiamondSwordIcon, FireIcon } from "@malilion/block-ui-icons";
import { StoryMobile, StoryStack } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { BossBar } from "./BossBar";
import { bossBarColors, bossBarSegments } from "./BossBar.types";

const meta = {
  title: "Components/HUD/BossBar",
  component: BossBar,
  tags: ["autodocs"],
  args: { name: "Ender Dragon", value: 140, max: 200, color: "amethyst" },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 200 } },
    color: { control: "select", options: bossBarColors },
    segments: { control: "select", options: bossBarSegments },
    name: { control: "text" },
    icon: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component: [
          "Boss health bar: a centered name over a long, optionally notched bar.",
          "",
          "```tsx",
          'import { BossBar } from "@malilion/block-ui-react";',
          "",
          '<BossBar name="Ender Dragon" value={140} max={200} color="amethyst" segments={10} />',
          "```",
          "",
          '**Accessibility** — a `role="meter"` labelled by the boss name, with `aria-valuetext` as a percentage (e.g. "70%"). The bar, notches and icon are decorative.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof BossBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <StoryStack>
      {bossBarColors.map((color) => (
        <BossBar key={color} name={`${color} boss`} value={65} color={color} />
      ))}
    </StoryStack>
  ),
};

export const States: Story = {
  render: () => (
    <StoryStack>
      <BossBar name="Full health" value={100} showPercent />
      <BossBar
        name="Wither"
        value={42}
        color="obsidian"
        icon={<FireIcon size={16} />}
        showPercent
      />
      <BossBar
        name="Raid"
        value={8}
        color="redstone"
        icon={<DiamondSwordIcon size={16} />}
        showPercent
      />
      <BossBar name="Defeated" value={0} color="redstone" showPercent />
    </StoryStack>
  ),
};

/** Notch counts: 0, 6, 10, 12 or 20. */
export const Sizes: Story = {
  render: () => (
    <StoryStack>
      {bossBarSegments.map((segments) => (
        <BossBar key={segments} name={`${segments} notches`} value={70} segments={segments} />
      ))}
    </StoryStack>
  ),
};

/** A boss bar has no disabled state; an empty bar reads "0%". */
export const Disabled: Story = { args: { name: "Defeated", value: 0, color: "obsidian" } };

export const Interactive: Story = {
  play: async ({ canvasElement }) => {
    const meter = within(canvasElement).getByRole("meter", { name: "Ender Dragon" });
    await expect(meter).toHaveAttribute("aria-valuetext", "70%");
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  args: { segments: 10, showPercent: true },
  decorators: [
    (Story) => (
      <StoryMobile>
        <Story />
      </StoryMobile>
    ),
  ],
};
