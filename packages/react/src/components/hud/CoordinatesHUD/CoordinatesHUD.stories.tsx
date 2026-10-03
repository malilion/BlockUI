import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { StoryMobile, StoryStack } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { CoordinatesHUD } from "./CoordinatesHUD";
import { facings } from "./CoordinatesHUD.types";

const meta = {
  title: "Components/HUD/CoordinatesHUD",
  component: CoordinatesHUD,
  tags: ["autodocs"],
  args: { x: 120, y: 64, z: -340, facing: "north" },
  argTypes: {
    facing: { control: "select", options: [undefined, ...facings] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    precision: { control: { type: "number", min: 0, max: 3 } },
  },
  parameters: {
    docs: {
      description: {
        component: [
          "Debug-screen style position read-out with facing and an optional copy button.",
          "",
          "```tsx",
          'import { CoordinatesHUD } from "@malilion/block-ui-react";',
          "",
          '<CoordinatesHUD x={120} y={64} z={-340} facing="north" copyable />',
          "```",
          "",
          '**Accessibility** — a `role="group"` named "Coordinates" whose text reads naturally ("X 120 Y 64 Z −340, Facing north"). The copy button is a real button ("Copy coordinates") and a polite status announces "Coordinates copied". Copied text uses plain ASCII (`120 64 -340`).',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof CoordinatesHUD>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <StoryStack>
      <CoordinatesHUD x={120} y={64} z={-340} />
      <CoordinatesHUD x={120} y={64} z={-340} facing="east" />
      <CoordinatesHUD x={120.456} y={64} z={-340.5} precision={2} facing="south" />
      <CoordinatesHUD x={120} y={64} z={-340} facing="west" copyable />
    </StoryStack>
  ),
};

export const States: Story = {
  render: () => (
    <StoryStack>
      <CoordinatesHUD x={0} y={-59} z={0} facing="north" label="Bedrock level" />
      <CoordinatesHUD x={-29999984} y={320} z={29999984} facing="west" label="World border" />
    </StoryStack>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <StoryStack>
      <CoordinatesHUD {...args} size="sm" />
      <CoordinatesHUD {...args} size="md" />
      <CoordinatesHUD {...args} size="lg" />
    </StoryStack>
  ),
};

/** A read-out has no disabled state; omit `copyable` for a static display. */
export const Disabled: Story = { args: { copyable: false } };

export const Interactive: Story = {
  args: { copyable: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("group", { name: "Coordinates" })).toHaveTextContent("Z −340");
    await userEvent.tab();
    await expect(canvas.getByRole("button", { name: "Copy coordinates" })).toHaveFocus();
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  args: { copyable: true, x: -1204.5, z: 88213.25, precision: 1 },
  decorators: [
    (Story) => (
      <StoryMobile>
        <Story />
      </StoryMobile>
    ),
  ],
};
