import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { StoryMobile, StoryRow, StoryStack } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { WeatherIndicator } from "./WeatherIndicator";
import { weatherTypes } from "./WeatherIndicator.types";

const meta = {
  title: "Components/HUD/WeatherIndicator",
  component: WeatherIndicator,
  tags: ["autodocs"],
  args: { weather: "rain", remaining: "4 min" },
  argTypes: {
    weather: { control: "select", options: weatherTypes },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    name: { control: "text" },
    remaining: { control: "text" },
  },
  parameters: {
    docs: {
      description: {
        component: [
          "Current weather read-out with a pixel icon and optional time remaining. Rain and snow icons drift, thunder flashes (both stop with reduced motion).",
          "",
          "```tsx",
          'import { WeatherIndicator } from "@malilion/block-ui-react";',
          "",
          '<WeatherIndicator weather="thunder" remaining="2 min" announce />',
          "```",
          "",
          '**Accessibility** — the weather is plain text ("Weather Thunderstorm · 2 min left"); the icon is decorative. With `announce`, it becomes a polite `role="status"` so screen readers hear weather changes. Animations respect `prefers-reduced-motion`.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof WeatherIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <StoryRow>
      {weatherTypes.map((weather) => (
        <WeatherIndicator key={weather} weather={weather} />
      ))}
    </StoryRow>
  ),
};

export const States: Story = {
  render: () => (
    <StoryRow>
      <WeatherIndicator weather="clear" />
      <WeatherIndicator weather="clear" night name="Clear night" />
      <WeatherIndicator weather="thunder" remaining="2 min" />
      <WeatherIndicator weather="snow" name="Blizzard" remaining="10 min" />
    </StoryRow>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <StoryStack>
      <div>
        <WeatherIndicator {...args} size="sm" />
      </div>
      <div>
        <WeatherIndicator {...args} size="md" />
      </div>
      <div>
        <WeatherIndicator {...args} size="lg" />
      </div>
    </StoryStack>
  ),
};

/** A read-out has no disabled state; clear weather is the calm default. */
export const Disabled: Story = { args: { weather: "clear", remaining: undefined } };

export const Interactive: Story = {
  args: { weather: "thunder", announce: true },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("status")).toHaveTextContent(
      "Weather Thunderstorm",
    );
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  render: () => (
    <StoryMobile>
      <StoryRow>
        <WeatherIndicator weather="rain" size="sm" remaining="4 min" />
        <WeatherIndicator weather="snow" size="sm" />
      </StoryRow>
    </StoryMobile>
  ),
};
