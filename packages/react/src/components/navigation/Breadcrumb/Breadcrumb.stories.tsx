import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { StoryMobile, StoryStack } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { HomeIcon } from "@malilion/block-ui-icons";
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
          'import { Breadcrumb } from "@malilion/block-ui-react";',
          "",
          '<Breadcrumb items={[{ label: "Home", href: "/" }, { label: "My World" }]} />',
          "```",
          "",
          '**Accessibility** — `<nav aria-label="Breadcrumb">` with an ordered list; the last item has `aria-current="page"`.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <StoryStack>
      <Breadcrumb {...args} label="Chevron separator" />
      <Breadcrumb {...args} label="Slash separator" separator="/" />
      <Breadcrumb
        label="Button items"
        items={[
          { label: "Home", onClick: fn() },
          { label: "Settings", onClick: fn() },
          { label: "Audio" },
        ]}
      />
    </StoryStack>
  ),
};

export const CustomSeparator: Story = { args: { separator: "/" } };

export const States: Story = {
  render: () => (
    <StoryStack>
      <Breadcrumb label="Single item" items={[{ label: "Home" }]} />
      <Breadcrumb label="Two items" items={[{ label: "Home", href: "#" }, { label: "Worlds" }]} />
      <Breadcrumb
        label="Plain text item"
        items={[{ label: "Home", href: "#" }, { label: "Archived" }, { label: "Old World" }]}
      />
    </StoryStack>
  ),
};

/** One text size; long trails wrap onto the next line. */
export const Sizes: Story = {
  args: {
    items: [
      { label: "Home", href: "#" },
      { label: "Servers", href: "#" },
      { label: "BlockCraft SMP", href: "#" },
      { label: "Worlds", href: "#" },
      { label: "Spawn Town", href: "#" },
      { label: "Marketplace" },
    ],
  },
};

/** Items without `href` or `onClick` render as plain, non-interactive text. */
export const Disabled: Story = {
  args: { items: [{ label: "Home" }, { label: "Locked area" }, { label: "Vault" }] },
};

export const Interactive: Story = {
  args: {
    items: [
      { label: "Home", onClick: fn() },
      { label: "Worlds", onClick: fn() },
      { label: "My World" },
    ],
  },
  play: async ({ canvasElement }) => {
    const nav = within(canvasElement).getByRole("navigation", { name: "Breadcrumb" });
    await userEvent.click(within(nav).getByRole("button", { name: "Worlds" }));
    await expect(within(nav).getByText("My World").parentElement).toHaveAttribute(
      "aria-current",
      "page",
    );
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  render: (args) => (
    <StoryMobile>
      <Breadcrumb {...args} items={Sizes.args!.items!} />
    </StoryMobile>
  ),
};
