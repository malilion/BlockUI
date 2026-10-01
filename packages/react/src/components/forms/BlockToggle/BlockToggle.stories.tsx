import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { StoryStack } from "../../../stories/StoryLayout";
import { BlockToggle } from "./BlockToggle";

const meta = {
  title: "Components/Forms/BlockToggle",
  component: BlockToggle,
  tags: ["autodocs"],
  args: { label: "Music", onCheckedChange: fn() },
  argTypes: { size: { control: "inline-radio", options: ["sm", "md"] } },
  parameters: {
    docs: {
      description: {
        component: [
          "On/off switch with a sliding block knob.",
          "",
          "```tsx",
          'import { BlockToggle } from "@block-ui/react";',
          "",
          '<BlockToggle label="Music" defaultChecked onCheckedChange={setMusic} />',
          "```",
          "",
          '**Accessibility** — native checkbox with `role="switch"`; `Space` toggles.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof BlockToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const States: Story = {
  render: () => (
    <StoryStack>
      <BlockToggle label="Off" />
      <BlockToggle label="On" defaultChecked />
      <BlockToggle label="With description" description="Play ambient music." defaultChecked />
      <BlockToggle label="Disabled" disabled />
      <BlockToggle label="Disabled on" disabled defaultChecked />
    </StoryStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <StoryStack>
      <BlockToggle label="Small" size="sm" defaultChecked />
      <BlockToggle label="Medium" size="md" defaultChecked />
    </StoryStack>
  ),
};

export const Disabled: Story = { args: { disabled: true } };
