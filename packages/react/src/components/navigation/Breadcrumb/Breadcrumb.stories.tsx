import type { Meta, StoryObj } from "@storybook/react-vite";
import { HomeIcon } from "@block-ui/icons";
import { Breadcrumb } from "./Breadcrumb";

const meta = {
  title: "Components/Navigation/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  args: {
    items: [
      { label: "Home", href: "#", icon: <HomeIcon size={16} /> },
      { label: "Worlds", href: "#" },
      { label: "My World" },
    ],
  },
  parameters: {
    docs: {
      description: {
        component: [
          "Breadcrumb trail with pixel chevrons.",
          "",
          "```tsx",
          'import { Breadcrumb } from "@block-ui/react";',
          "",
          '<Breadcrumb items={[{ label: "Home", href: "/" }, { label: "My World" }]} />',
          "```",
          "",
          "**Accessibility** — `<nav aria-label=\"Breadcrumb\">` with an ordered list; the last item has `aria-current=\"page\"`.",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomSeparator: Story = { args: { separator: "/" } };
