import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { StoryMobile, StoryStack } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
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

export const Variants: Story = {
  render: () => (
    <StoryStack>
      <BlockToggle label="Label after (default)" defaultChecked />
      <BlockToggle label="Label before" labelPosition="start" defaultChecked />
      <BlockToggle label="With description" description="Play ambient music." />
    </StoryStack>
  ),
};

export const Interactive: Story = {
  play: async ({ canvasElement, args }) => {
    const toggle = within(canvasElement).getByRole("switch", { name: "Music" });
    await userEvent.click(toggle);
    await expect(toggle).toBeChecked();
    await expect(args.onCheckedChange).toHaveBeenLastCalledWith(true);
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  render: () => (
    <StoryMobile>
      <StoryStack>
        <BlockToggle label="Music" defaultChecked />
        <BlockToggle label="Show coordinates" description="Displays X / Y / Z in the HUD." />
      </StoryStack>
    </StoryMobile>
  ),
};
