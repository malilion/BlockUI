import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { BlockRadio, BlockRadioGroup } from "./BlockRadio";

const modes = [
  { value: "survival", label: "Survival" },
  { value: "creative", label: "Creative" },
  { value: "adventure", label: "Adventure" },
];

const meta = {
  title: "Components/Forms/BlockRadio",
  component: BlockRadioGroup,
  subcomponents: { BlockRadio },
  tags: ["autodocs"],
  args: { label: "Game mode", options: modes, defaultValue: "survival", onValueChange: fn() },
  argTypes: { orientation: { control: "inline-radio", options: ["vertical", "horizontal"] } },
  parameters: {
    docs: {
      description: {
        component: [
          "Radio group rendered as a `<fieldset>` with pixel octagon radios.",
          "",
          "```tsx",
          'import { BlockRadioGroup } from "@block-ui/react";',
          "",
          '<BlockRadioGroup label="Game mode" options={modes} defaultValue="survival" />',
          "```",
          "",
          "**Accessibility** — native radios share a `name`, so arrow keys move the selection; the label is the `<legend>`.",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof BlockRadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Horizontal: Story = { args: { orientation: "horizontal" } };

export const WithDescriptions: Story = {
  args: {
    options: [
      { value: "peaceful", label: "Peaceful", description: "No hostile mobs." },
      { value: "normal", label: "Normal", description: "The intended experience." },
      { value: "hard", label: "Hard", description: "Hunger can kill you.", disabled: true },
    ],
    defaultValue: "normal",
    label: "Difficulty",
  },
};

export const ErrorState: Story = { args: { defaultValue: undefined, error: "Pick a game mode." } };

export const Disabled: Story = { args: { disabled: true } };
