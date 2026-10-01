import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChestIcon, PlusIcon } from "@block-ui/icons";
import { StoryGrid } from "../../../stories/StoryLayout";
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

export const WithActions: Story = {
  args: {
    title: "Chest",
    icon: <ChestIcon size={24} />,
    actions: <IconButton icon={<PlusIcon size={16} />} label="Add item" size="sm" />,
  },
};
