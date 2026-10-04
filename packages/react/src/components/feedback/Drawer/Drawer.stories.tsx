import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, fn, userEvent, within } from "storybook/test";
import { StoryMobile, StoryRow } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { BlockButton } from "../../actions/BlockButton/BlockButton";
import { BlockToggle } from "../../forms/BlockToggle/BlockToggle";
import { Drawer } from "./Drawer";
import type { DrawerProps } from "./Drawer.types";

function DrawerDemo({
  label = "Open settings",
  ...props
}: Partial<DrawerProps> & { label?: string }) {
  const [open, setOpen] = useState(props.open ?? false);
  return (
    <>
      <BlockButton onClick={() => setOpen(true)}>{label}</BlockButton>
      <Drawer
        title="Settings"
        {...props}
        open={open}
        onClose={() => {
          props.onClose?.();
          setOpen(false);
        }}
        footer={
          <BlockButton variant="grass" onClick={() => setOpen(false)}>
            Done
          </BlockButton>
        }
      >
        <BlockToggle label="Smooth lighting" defaultChecked />
        <BlockToggle label="Fullscreen" />
      </Drawer>
    </>
  );
}

const meta = {
  title: "Components/Feedback/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  args: { open: false, title: "Settings", onClose: fn() },
  argTypes: {
    side: { control: "inline-radio", options: ["left", "right", "bottom"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
  parameters: {
    docs: {
      description: {
        component: [
          "Panel that slides in from an edge — settings, filters, a mobile menu or an inventory sidebar.",
          "",
          "```tsx",
          'import { Drawer } from "@malilion/block-ui-react";',
          "",
          '<Drawer open={open} onClose={() => setOpen(false)} title="Settings" side="right">…</Drawer>',
          "```",
          "",
          "**Keyboard** — focus moves into the drawer and stays there (`Tab` wraps); `Esc` closes and returns focus to the opener.",
          "",
          '**Accessibility** — a modal `dialog` (`aria-modal="true"`) labelled by its title, rendered in the provider overlay layer. The page behind stops scrolling until the last overlay closes. The close button is named "Close".',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: (args) => <DrawerDemo onClose={args.onClose} /> };

export const Variants: Story = {
  render: () => (
    <StoryRow>
      <DrawerDemo label="From the right" side="right" />
      <DrawerDemo label="From the left" side="left" />
      <DrawerDemo label="From the bottom" side="bottom" />
    </StoryRow>
  ),
};

export const States: Story = {
  render: () => (
    <StoryRow>
      <DrawerDemo label="Escape disabled" closeOnEscape={false} />
      <DrawerDemo label="Overlay click disabled" closeOnOverlayClick={false} />
    </StoryRow>
  ),
};

export const Sizes: Story = {
  render: () => (
    <StoryRow>
      <DrawerDemo label="Small (280px)" size="sm" />
      <DrawerDemo label="Medium (360px)" size="md" />
      <DrawerDemo label="Large (520px)" size="lg" />
    </StoryRow>
  ),
};

/** A closed drawer renders nothing. */
export const Disabled: Story = { args: { open: false } };

export const Interactive: Story = {
  render: (args) => <DrawerDemo onClose={args.onClose} />,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Open settings" }));
    const dialog = await within(document.body).findByRole("dialog", { name: "Settings" });
    await expect(dialog).toBeInTheDocument();
    await userEvent.keyboard("{Escape}");
    await expect(args.onClose).toHaveBeenCalled();
    await expect(canvas.getByRole("button", { name: "Open settings" })).toHaveFocus();
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  render: () => (
    <StoryMobile>
      <DrawerDemo label="Open menu" side="bottom" />
    </StoryMobile>
  ),
};
