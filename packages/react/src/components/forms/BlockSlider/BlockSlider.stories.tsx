import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fireEvent, fn, within } from "storybook/test";
import { StoryMobile, StoryStack } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { BlockSlider } from "./BlockSlider";

const meta = {
  title: "Components/Forms/BlockSlider",
  component: BlockSlider,
  tags: ["autodocs"],
  args: { label: "Render distance", defaultValue: 50, onValueChange: fn() },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "grass", "water", "diamond", "emerald", "gold", "redstone"],
    },
  },
  decorators: [
    (Story) => (
      <StoryStack narrow>
        <Story />
      </StoryStack>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: [
          "Range slider with a pixel track and a block thumb.",
          "",
          "```tsx",
          'import { BlockSlider } from "@malilion/block-ui-react";',
          "",
          '<BlockSlider label="FOV" min={30} max={110} formatValue={(v) => `${v}°`} />',
          "```",
          "",
          '**Accessibility** — native `<input type="range">`: arrow keys, Home/End and PageUp/PageDown work; `aria-valuetext` uses `formatValue`.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof BlockSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <StoryStack>
      {(["grass", "water", "diamond", "emerald", "gold", "redstone"] as const).map((variant, i) => (
        <BlockSlider key={variant} label={variant} variant={variant} defaultValue={20 + i * 12} />
      ))}
    </StoryStack>
  ),
};

export const Formatted: Story = {
  args: { label: "FOV", min: 30, max: 110, defaultValue: 70, formatValue: (v: number) => `${v}°` },
  parameters: {
    docs: {
      source: {
        code: '<BlockSlider label="FOV" min={30} max={110} defaultValue={70} formatValue={(v) => `${v}°`} />',
      },
    },
  },
};

export const Disabled: Story = { args: { disabled: true } };

export const States: Story = {
  render: () => (
    <StoryStack>
      <BlockSlider label="Minimum" defaultValue={0} />
      <BlockSlider label="Middle" defaultValue={50} />
      <BlockSlider label="Maximum" defaultValue={100} />
      <BlockSlider label="Error" defaultValue={90} error="Too high for this server." />
      <BlockSlider label="Disabled" defaultValue={30} disabled />
    </StoryStack>
  ),
};

/** One track height; the slider stretches to its container. */
export const Sizes: Story = {
  render: () => (
    <StoryStack>
      <BlockSlider label="Narrow (200px)" wrapperClassName="block-story-w-200" defaultValue={40} />
      <BlockSlider label="Full width" defaultValue={40} />
    </StoryStack>
  ),
};

export const Interactive: Story = {
  args: { label: "Volume", defaultValue: 50, step: 10 },
  play: async ({ canvasElement, args }) => {
    const slider = within(canvasElement).getByRole("slider", { name: "Volume" });
    // Native range inputs step on real arrow keys; simulated events change the value directly.
    fireEvent.change(slider, { target: { value: "60" } });
    await expect(slider).toHaveValue("60");
    await expect(args.onValueChange).toHaveBeenLastCalledWith(60);
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  render: () => (
    <StoryMobile>
      <BlockSlider
        label="Render distance"
        min={2}
        max={32}
        defaultValue={12}
        formatValue={(v) => `${v} chunks`}
      />
    </StoryMobile>
  ),
  parameters: {
    docs: {
      source: {
        code: [
          "<BlockSlider",
          '  label="Render distance"',
          "  min={2}",
          "  max={32}",
          "  defaultValue={12}",
          "  formatValue={(v) => `${v} chunks`}",
          "/>",
        ].join("\n"),
      },
    },
  },
};
