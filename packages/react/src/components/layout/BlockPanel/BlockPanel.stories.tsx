import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn, userEvent, within } from "storybook/test";
import { ChestIcon, PlusIcon } from "@block-ui/icons";
import { StoryGrid, StoryMobile, StoryStack } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { IconButton } from "../../actions/IconButton/IconButton";
import { BlockPanel } from "./BlockPanel";

const meta = {
  title: "Components/Layout/BlockPanel",
  component: BlockPanel,
  tags: ["autodocs"],
  args: {
    title: "Player Profile",
    children: "Panels are the main building block of every Block UI screen.",
  },
  argTypes: { variant: { control: "inline-radio", options: ["stone", "inset", "plain"] } },
  parameters: {
    docs: {
      description: {
        component: [
          "Textured stone container with a pixel border, bevel and title strip.",
          "",
          "```tsx",
          'import { BlockPanel } from "@block-ui/react";',
          "",
          '<BlockPanel title="Inventory">…</BlockPanel>',
          "```",
          "",
          "**Accessibility** — a titled panel is a `<section>` labelled by its heading, so it shows up as a landmark region.",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof BlockPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <StoryGrid>
      <BlockPanel {...args} title="Stone" variant="stone" />
      <BlockPanel {...args} title="Inset" variant="inset" />
      <BlockPanel {...args} title="Plain" variant="plain" />
    </StoryGrid>
  ),
};

export const States: Story = {
  render: () => (
    <StoryGrid>
      <BlockPanel title="Titled">A titled panel is a labelled region.</BlockPanel>
      <BlockPanel title="With icon" icon={<ChestIcon size={24} />}>
        Icon before the title.
      </BlockPanel>
      <BlockPanel>Untitled panel.</BlockPanel>
      <BlockPanel title="Flush" flush>
        <span>Edge-to-edge content</span>
      </BlockPanel>
    </StoryGrid>
  ),
};

export const WithActions: Story = {
  args: {
    title: "Chest",
    icon: <ChestIcon size={24} />,
    actions: <IconButton icon={<PlusIcon size={16} />} label="Add item" size="sm" />,
  },
};

/** Panels fill their container; title levels change only semantics, not size. */
export const Sizes: Story = {
  render: () => (
    <StoryStack>
      <BlockPanel title="280px" className="block-story-w-280">
        Narrow panel.
      </BlockPanel>
      <BlockPanel title="Full width">Wide panel.</BlockPanel>
    </StoryStack>
  ),
};

/** Panels have no disabled state; disable the controls inside them. */
export const Disabled: Story = {
  args: {
    title: "Locked settings",
    actions: <IconButton icon={<PlusIcon size={16} />} label="Add item" size="sm" disabled />,
    children: "Ask an admin to unlock these settings.",
  },
};

export const Interactive: Story = {
  args: {
    title: "Chest",
    actions: <IconButton icon={<PlusIcon size={16} />} label="Add item" size="sm" onClick={fn()} />,
  },
  play: async ({ canvasElement }) => {
    const region = within(canvasElement).getByRole("region", { name: "Chest" });
    await userEvent.click(within(region).getByRole("button", { name: "Add item" }));
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  decorators: [
    (Story) => (
      <StoryMobile>
        <Story />
      </StoryMobile>
    ),
  ],
};
