import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { StoryMobile, StoryRow, StoryStack } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { BiomeIndicator } from "./BiomeIndicator";
import { biomeTypes } from "./BiomeIndicator.types";

const meta = {
  title: "Components/HUD/BiomeIndicator",
  component: BiomeIndicator,
  tags: ["autodocs"],
  args: { type: "forest" },
  argTypes: {
    type: { control: "select", options: biomeTypes },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    name: { control: "text" },
    icon: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component: [
          "Current biome read-out — a pixel icon, a biome-colored stripe and the name.",
          "",
          "```tsx",
          'import { BiomeIndicator } from "@malilion/block-ui-react";',
          "",
          '<BiomeIndicator type="snowy" name="Snowy Taiga" announce />',
          "```",
          "",
          '**Accessibility** — the biome is plain text ("Biome Snowy Taiga"); the icon and stripe are decorative, so color is never the only cue. With `announce`, it becomes a polite `role="status"` so screen readers hear biome changes.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof BiomeIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <StoryRow>
      {biomeTypes.map((type) => (
        <BiomeIndicator key={type} type={type} />
      ))}
    </StoryRow>
  ),
};

export const States: Story = {
  render: () => (
    <StoryRow>
      <BiomeIndicator type="forest" name="Dark Forest" />
      <BiomeIndicator type="snowy" name="Snowy Taiga" />
      <BiomeIndicator type="nether" name="Crimson Forest" />
      <BiomeIndicator type="ocean" name="Deep Lukewarm Ocean" announce />
    </StoryRow>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <StoryStack>
      <div>
        <BiomeIndicator {...args} size="sm" />
      </div>
      <div>
        <BiomeIndicator {...args} size="md" />
      </div>
      <div>
        <BiomeIndicator {...args} size="lg" />
      </div>
    </StoryStack>
  ),
};

/** A read-out has no disabled state; the end and cave biomes use the darkest accents. */
export const Disabled: Story = { args: { type: "cave" } };

export const Interactive: Story = {
  args: { type: "desert", announce: true },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("status")).toHaveTextContent("Biome Desert");
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  render: () => (
    <StoryMobile>
      <StoryRow>
        <BiomeIndicator type="jungle" size="sm" />
        <BiomeIndicator type="mountains" name="Windswept Gravelly Hills" size="sm" />
      </StoryRow>
    </StoryMobile>
  ),
};
