import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { StoryMobile, StoryStack } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
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
          'import { BlockCheckbox } from "@malilion/block-ui-react";',
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

export const Variants: Story = {
  render: () => (
    <StoryStack>
      <BlockCheckbox label="Label only" defaultChecked />
      <BlockCheckbox label="With description" description="Mobs spawn at night." />
      <BlockCheckbox aria-label="Checkbox without visible label" />
    </StoryStack>
  ),
};

/** One size — the 24px box is the minimum comfortable target; the label extends the click area. */
export const Sizes: Story = {
  render: () => (
    <StoryStack>
      <BlockCheckbox label="Short" />
      <BlockCheckbox label="A much longer label that wraps onto a second line when space runs out on narrow screens" />
    </StoryStack>
  ),
};

export const Interactive: Story = {
  args: { label: "Enable PvP" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox", { name: "Enable PvP" });
    await userEvent.click(canvas.getByText("Enable PvP"));
    await expect(checkbox).toBeChecked();
    await userEvent.keyboard(" ");
    await expect(checkbox).not.toBeChecked();
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  render: () => (
    <StoryMobile>
      <StoryStack>
        <BlockCheckbox label="Enable PvP" description="Players can attack each other." />
        <BlockCheckbox label="Keep inventory" defaultChecked />
      </StoryStack>
    </StoryMobile>
  ),
};
