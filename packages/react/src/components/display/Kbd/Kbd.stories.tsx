import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { StoryMobile, StoryRow, StoryStack } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { Kbd } from "./Kbd";

const meta = {
  title: "Components/Display/Kbd",
  component: Kbd,
  tags: ["autodocs"],
  args: { children: "E" },
  argTypes: { size: { control: "inline-radio", options: ["sm", "md"] } },
  parameters: {
    docs: {
      description: {
        component: [
          "Pixel keycap for keyboard hints and shortcuts.",
          "",
          "```tsx",
          'import { Kbd } from "@malilion/block-ui-react";',
          "",
          '<p>Press <Kbd>E</Kbd> to open your inventory, <Kbd keys={["F3", "H"]} /> for advanced tooltips.</p>',
          "```",
          "",
          "**Accessibility** — native `<kbd>` elements (combinations nest one `<kbd>` per key), so screen readers announce them as keyboard input; the `+` signs are decorative.",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <StoryRow>
      <Kbd>E</Kbd>
      <Kbd>Esc</Kbd>
      <Kbd>Space</Kbd>
      <Kbd keys={["Ctrl", "C"]} />
      <Kbd keys={["F3", "B"]} />
    </StoryRow>
  ),
};

export const States: Story = {
  render: () => (
    <StoryStack>
      <p>
        Press <Kbd>E</Kbd> to open your inventory.
      </p>
      <p>
        Hold <Kbd>Shift</Kbd> to sneak, <Kbd keys={["Ctrl", "W"]} /> to sprint.
      </p>
    </StoryStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <StoryRow>
      <Kbd size="sm">Q</Kbd>
      <Kbd size="md">Q</Kbd>
      <Kbd size="sm" keys={["Ctrl", "Q"]} />
      <Kbd size="md" keys={["Ctrl", "Q"]} />
    </StoryRow>
  ),
};

/** Keycaps are static; there is no disabled state. */
export const Disabled: Story = { args: { children: "—" } };

export const Interactive: Story = {
  render: () => <Kbd keys={["Ctrl", "Shift", "C"]} />,
  play: async ({ canvasElement }) => {
    const keys = canvasElement.querySelectorAll("kbd kbd");
    await expect(keys).toHaveLength(3);
    await expect(within(canvasElement).getByText("Shift").tagName).toBe("KBD");
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  render: () => (
    <StoryMobile>
      <p>
        Tap <Kbd size="sm">E</Kbd> or use <Kbd size="sm" keys={["Ctrl", "E"]} />.
      </p>
    </StoryMobile>
  ),
};
