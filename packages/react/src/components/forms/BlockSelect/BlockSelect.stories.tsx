import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryStack } from "../../../stories/StoryLayout";
import { BlockSelect } from "./BlockSelect";

const modes = [
  { value: "survival", label: "Survival" },
  { value: "creative", label: "Creative" },
  { value: "adventure", label: "Adventure" },
  { value: "spectator", label: "Spectator", disabled: true },
];

const meta = {
  title: "Components/Forms/BlockSelect",
  component: BlockSelect,
  tags: ["autodocs"],
  args: { label: "Game mode", options: modes, defaultValue: "survival" },
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
          "Native select with a pixel chevron. Using the native element keeps platform keyboard support and mobile pickers.",
          "",
          "```tsx",
          'import { BlockSelect } from "@block-ui/react";',
          "",
          '<BlockSelect label="Game mode" options={[{ value: "survival", label: "Survival" }]} />',
          "```",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof BlockSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Placeholder: Story = {
  args: { placeholder: "Choose a mode…", defaultValue: undefined },
};

export const States: Story = {
  render: () => (
    <StoryStack>
      <BlockSelect
        label="Error"
        options={modes}
        placeholder="Choose…"
        error="A game mode is required."
      />
      <BlockSelect label="Success" options={modes} defaultValue="creative" success />
      <BlockSelect label="Disabled" options={modes} defaultValue="survival" disabled />
    </StoryStack>
  ),
};

export const Disabled: Story = { args: { disabled: true } };
