import type { Meta, StoryObj } from "@storybook/react-vite";
import { SettingsIcon } from "@block-ui/icons";
import { useState } from "react";
import { fn } from "storybook/test";
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
          "**Accessibility** — `role=\"dialog\"` + `aria-modal`, labelled by the title; focus is trapped (`Tab` cycles), `Escape` closes, the overlay closes on click, and focus returns to the trigger. Bottom sheet on mobile.",
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
      <BlockButton variant="grass" onClick={() => setOpen(true)} startIcon={<SettingsIcon size={16} />}>
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

export const Sizes: Story = { render: () => <ModalDemo size="lg" /> };

export const OpenByDefault: Story = {
  args: { open: true, children: "Static open modal for visual testing." },
};
