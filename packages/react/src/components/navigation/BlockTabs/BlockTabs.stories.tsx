import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppleIcon, DiamondIcon, GrassBlockIcon, SwordIcon } from "@block-ui/icons";
import { fn } from "storybook/test";
import { BlockTabs } from "./BlockTabs";

const meta = {
  title: "Components/Navigation/BlockTabs",
  component: BlockTabs,
  tags: ["autodocs"],
  args: {
    label: "Creative inventory",
    onValueChange: fn(),
    items: [
      {
        id: "blocks",
        label: "Blocks",
        icon: <GrassBlockIcon size={16} />,
        content: "Building blocks, ores and stone.",
      },
      {
        id: "combat",
        label: "Combat",
        icon: <SwordIcon size={16} />,
        content: "Swords, bows and armor.",
      },
      {
        id: "food",
        label: "Food",
        icon: <AppleIcon size={16} />,
        content: "Apples, bread and more.",
      },
      {
        id: "rare",
        label: "Rare",
        icon: <DiamondIcon size={16} />,
        content: "Locked.",
        disabled: true,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        component: [
          "Creative-inventory style tabs.",
          "",
          "```tsx",
          'import { BlockTabs } from "@block-ui/react";',
          "",
          '<BlockTabs label="Inventory" items={[{ id: "blocks", label: "Blocks", content: <BlockList /> }]} />',
          "```",
          "",
          "**Keyboard** — `←`/`→` move and activate (wrapping), `Home`/`End` jump, disabled tabs are skipped, `Tab` moves into the panel.",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof BlockTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FullWidth: Story = { args: { fullWidth: true } };
