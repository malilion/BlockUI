import type { Meta, StoryObj } from "@storybook/react-vite";
import { GrassBlockIcon } from "@block-ui/icons";
import { useState } from "react";
import { fn } from "storybook/test";
import { BlockButton } from "../../actions/BlockButton/BlockButton";
import { toast } from "../Toast/store";
import { ConfirmDialog } from "./ConfirmDialog";

const meta = {
  title: "Components/Feedback/ConfirmDialog",
  component: ConfirmDialog,
  tags: ["autodocs"],
  args: {
    open: true,
    title: "Delete World",
    description: "Are you sure you want to delete this world? This action cannot be undone.",
    confirmText: "Delete",
    cancelText: "Cancel",
    variant: "danger",
    icon: <GrassBlockIcon size={48} />,
    onConfirm: fn(),
    onCancel: fn(),
  },
  argTypes: { variant: { control: "inline-radio", options: ["default", "danger"] }, icon: { control: false } },
  parameters: {
    docs: {
      description: {
        component: [
          "Confirmation dialog built on `BlockModal` with `role=\"alertdialog\"`.",
          "",
          "```tsx",
          "<ConfirmDialog",
          '  title="Delete World"',
          '  description="This action cannot be undone."',
          '  confirmText="Delete"',
          '  cancelText="Cancel"',
          '  variant="danger"',
          "/>",
          "```",
          "",
          "For `danger` the Cancel button receives initial focus so Enter never destroys data by accident.",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof ConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Danger: Story = {};

function Demo() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <>
      <BlockButton variant="redstone" onClick={() => setOpen(true)}>
        Delete World
      </BlockButton>
      <ConfirmDialog
        open={open}
        loading={loading}
        variant="danger"
        title="Delete World"
        description="This action cannot be undone."
        confirmText="Delete"
        icon={<GrassBlockIcon size={48} />}
        onCancel={() => setOpen(false)}
        onConfirm={() => {
          setLoading(true);
          window.setTimeout(() => {
            setLoading(false);
            setOpen(false);
            toast.success("World deleted.");
          }, 900);
        }}
      />
    </>
  );
}

export const Interactive: Story = { render: () => <Demo /> };
