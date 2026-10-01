import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryStack } from "../../../stories/StoryLayout";
import { BlockCheckbox } from "./BlockCheckbox";

const meta = {
  title: "Components/Forms/BlockCheckbox",
  component: BlockCheckbox,
  tags: ["autodocs"],
  args: { label: "Enable PvP" },
  parameters: {
    docs: {
      description: {
        component: [
          "Native checkbox drawn as a pixel block. Supports `indeterminate`.",
          "",
          "```tsx",
          'import { BlockCheckbox } from "@block-ui/react";',
          "",
          '<BlockCheckbox label="Enable PvP" defaultChecked />',
          "```",
          "",
          '**Accessibility** — real `<input type="checkbox">` with a `<label>`; `Space` toggles; focus ring on the box.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof BlockCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const States: Story = {
  render: () => (
    <StoryStack>
      <BlockCheckbox label="Unchecked" />
      <BlockCheckbox label="Checked" defaultChecked />
      <BlockCheckbox label="Indeterminate" indeterminate />
      <BlockCheckbox label="With description" description="Mobs spawn at night." defaultChecked />
      <BlockCheckbox label="Error" error="You must accept the server rules." />
      <BlockCheckbox label="Disabled" disabled />
      <BlockCheckbox label="Disabled checked" disabled defaultChecked />
    </StoryStack>
  ),
};

export const Disabled: Story = { args: { disabled: true } };
