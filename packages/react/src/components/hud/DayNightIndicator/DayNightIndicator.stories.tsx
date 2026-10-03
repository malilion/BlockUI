import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { StoryMobile, StoryStack } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { DayNightIndicator } from "./DayNightIndicator";

const meta = {
  title: "Components/HUD/DayNightIndicator",
  component: DayNightIndicator,
  tags: ["autodocs"],
  args: { time: 14.5, day: 156 },
  argTypes: {
    time: { control: { type: "range", min: 0, max: 24, step: 0.25 } },
    format: { control: "inline-radio", options: ["24h", "12h"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
  parameters: {
    docs: {
      description: {
        component: [
          "Day / night read-out: a pixel sky arc where the sun (06:00–18:00) or moon travels, plus the day counter, clock and phase (dawn, day, dusk, night).",
          "",
          "```tsx",
          'import { DayNightIndicator } from "@malilion/block-ui-react";',
          "",
          '<DayNightIndicator time={14.5} day={156} format="24h" />',
          "```",
          "",
          "`time` is in hours (0–24, fractions allowed). For game ticks, pass `(ticks / 1000 + 6) % 24`.",
          "",
          '**Accessibility** — a `role="group"` named "Time of day" whose text gives the day, clock and phase ("Day 156 14:30 Day"); the sky arc is decorative.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof DayNightIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <StoryStack>
      <DayNightIndicator time={14.5} day={156} />
      <DayNightIndicator time={14.5} day={156} format="12h" />
      <DayNightIndicator time={14.5} showDial={false} />
    </StoryStack>
  ),
};

/** Dawn, noon, dusk and midnight. */
export const States: Story = {
  render: () => (
    <StoryStack>
      <DayNightIndicator time={6} day={12} />
      <DayNightIndicator time={12} day={12} />
      <DayNightIndicator time={18} day={12} />
      <DayNightIndicator time={0} day={13} />
    </StoryStack>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <StoryStack>
      <div>
        <DayNightIndicator {...args} size="sm" />
      </div>
      <div>
        <DayNightIndicator {...args} size="md" />
      </div>
      <div>
        <DayNightIndicator {...args} size="lg" />
      </div>
    </StoryStack>
  ),
};

/** A read-out has no disabled state; hide the arc for a text-only clock. */
export const Disabled: Story = { args: { showDial: false } };

export const Interactive: Story = {
  args: { time: 22.25, day: 3, format: "12h" },
  play: async ({ canvasElement }) => {
    const group = within(canvasElement).getByRole("group", { name: "Time of day" });
    await expect(group).toHaveTextContent("10:15 PM");
    await expect(group).toHaveAttribute("data-phase", "night");
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  args: { size: "sm" },
  decorators: [
    (Story) => (
      <StoryMobile>
        <Story />
      </StoryMobile>
    ),
  ],
};
