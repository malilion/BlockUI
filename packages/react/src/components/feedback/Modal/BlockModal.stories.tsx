import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import { StoryRow } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { GrassBlockIcon, SettingsIcon } from "@block-ui/icons";
import { useState } from "react";
import { BlockButton } from "../../actions/BlockButton/BlockButton";
import { BlockInput } from "../../forms/BlockInput/BlockInput";
import { BlockToggle } from "../../forms/BlockToggle/BlockToggle";
import { BlockModal } from "./BlockModal";

const meta = {
  title: "Components/Feedback/BlockModal",
  component: BlockModal,
  tags: ["autodocs"],
  args: { open: false, title: "World Settings", onClose: fn() },
  argTypes: { size: { control: "inline-radio", options: ["sm", "md", "lg"] } },
  parameters: {
    docs: {
      // Overlays are position: fixed — render each docs story in its own frame.
      story: { inline: false, height: "420px" },
      description: {
        component: [
          "Modal dialog with a pixel frame.",
          "",
          "```tsx",
          'import { BlockModal } from "@block-ui/react";',
          "",
          '<BlockModal open={open} title="Delete World" onClose={handleClose}>…</BlockModal>',
          "```",
          "",
          '**Accessibility** — `role="dialog"` + `aria-modal`, labelled by the title; focus is trapped (`Tab` cycles), `Escape` closes, the overlay closes on click, and focus returns to the trigger. Bottom sheet on mobile.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof BlockModal>;

export default meta;
type Story = StoryObj<typeof meta>;

function ModalDemo({ size }: { size?: "sm" | "md" | "lg" }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <BlockButton
        variant="grass"
        onClick={() => setOpen(true)}
        startIcon={<SettingsIcon size={16} />}
      >
        Open settings
      </BlockButton>
      <BlockModal
        open={open}
        size={size}
        title="World Settings"
        description="Changes apply the next time the world loads."
        onClose={() => setOpen(false)}
        footer={
          <>
            <BlockButton onClick={() => setOpen(false)}>Cancel</BlockButton>
            <BlockButton variant="grass" onClick={() => setOpen(false)}>
              Save
            </BlockButton>
          </>
        }
      >
        <BlockInput label="World name" defaultValue="My World" />
        <BlockToggle label="Allow cheats" />
      </BlockModal>
    </>
  );
}

export const Default: Story = { render: () => <ModalDemo /> };

export const Sizes: Story = {
  render: () => (
    <StoryRow>
      <ModalDemo size="sm" />
      <ModalDemo size="md" />
      <ModalDemo size="lg" />
    </StoryRow>
  ),
};

export const States: Story = {
  args: {
    open: true,
    description: "Changes apply the next time the world loads.",
    children: "Open with a description and body content.",
  },
};

export const OpenByDefault: Story = {
  args: { open: true, children: "Static open modal for visual testing." },
};

export const Variants: Story = {
  args: {
    open: true,
    role: "alertdialog",
    title: "Leave World",
    icon: <GrassBlockIcon size={48} />,
    description: "Unsaved progress will be lost.",
    footer: (
      <>
        <BlockButton>Stay</BlockButton>
        <BlockButton variant="redstone">Leave</BlockButton>
      </>
    ),
  },
};

/** A blocking dialog: no close button, Escape and overlay clicks are ignored. */
export const Disabled: Story = {
  args: {
    open: true,
    title: "Saving world…",
    hideCloseButton: true,
    closeOnEscape: false,
    closeOnOverlayClick: false,
    children: "Please wait — closing is disabled until the save finishes.",
  },
};

export const Interactive: Story = {
  render: () => <ModalDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const opener = canvas.getByRole("button", { name: "Open settings" });
    await userEvent.click(opener);
    const dialog = await canvas.findByRole("dialog", { name: "World Settings" });
    // Without initialFocusRef the trap focuses the first focusable element (the Close button).
    await waitFor(() =>
      expect(within(dialog).getByRole("button", { name: "Close" })).toHaveFocus(),
    );
    await userEvent.keyboard("{Escape}");
    await expect(canvas.queryByRole("dialog")).not.toBeInTheDocument();
    await waitFor(() => expect(opener).toHaveFocus());
  },
};

/** Below 768px the dialog becomes a bottom sheet. */
export const Responsive: Story = {
  globals: mobileViewport,
  args: { open: true, children: "Bottom sheet on phones." },
};
