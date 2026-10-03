import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import { mobileViewport } from "../../../stories/storyGlobals";
import { GrassBlockIcon } from "@malilion/block-ui-icons";
import { useState, type ComponentProps } from "react";
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
  argTypes: {
    variant: { control: "inline-radio", options: ["default", "danger"] },
    icon: { control: false },
  },
  parameters: {
    docs: {
      // Overlays are position: fixed — render each docs story in its own frame.
      story: { inline: false, height: "420px" },
      description: {
        component: [
          'Confirmation dialog built on `BlockModal` with `role="alertdialog"`.',
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
          "",
          '**Accessibility** — a `BlockModal` with `role="alertdialog"`, labelled by the title and described by the description. Focus is trapped and returns to the trigger; for `danger` the initial focus is Cancel so Enter never deletes anything by accident.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof ConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
    title: "Save World",
    description: "Save and return to the title screen?",
    confirmText: "Save",
  },
};

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

const interactiveSource = `import { useState } from "react";
// toast() shows up in the <BlockToaster /> that <BlockUIProvider> renders.
import { BlockButton, ConfirmDialog, toast } from "@malilion/block-ui-react";
import { GrassBlockIcon } from "@malilion/block-ui-icons";

export function DeleteWorld() {
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
}`;

export const Interactive: Story = {
  render: () => <Demo />,
  parameters: { docs: { source: { code: interactiveSource } } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Delete World" }));
    const dialog = await canvas.findByRole("alertdialog", { name: "Delete World" });
    await waitFor(() =>
      expect(within(dialog).getByRole("button", { name: "Cancel" })).toHaveFocus(),
    );
    await userEvent.click(within(dialog).getByRole("button", { name: "Cancel" }));
    await expect(canvas.queryByRole("alertdialog")).not.toBeInTheDocument();
  },
};

/** Two variants: `default` (grass confirm) and `danger` (redstone confirm, Cancel focused first). */
const variantsSource = `import { useState } from "react";
import { BlockButton, ConfirmDialog } from "@malilion/block-ui-react";

export function ConfirmVariants() {
  const [variant, setVariant] = useState<"default" | "danger" | null>(null);
  return (
    <>
      <BlockButton variant="grass" onClick={() => setVariant("default")}>
        Default
      </BlockButton>
      <BlockButton variant="redstone" onClick={() => setVariant("danger")}>
        Danger
      </BlockButton>
      <ConfirmDialog
        open={variant !== null}
        variant={variant ?? "default"}
        title="Delete World"
        description="Are you sure you want to delete this world? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => setVariant(null)}
        onCancel={() => setVariant(null)}
      />
    </>
  );
}`;

export const Variants: Story = {
  render: (args) => <VariantsDemo {...args} />,
  parameters: { docs: { source: { code: variantsSource } } },
};

function VariantsDemo(args: ComponentProps<typeof ConfirmDialog>) {
  const [variant, setVariant] = useState<"default" | "danger" | null>(null);
  return (
    <>
      <BlockButton variant="grass" onClick={() => setVariant("default")}>
        Default
      </BlockButton>{" "}
      <BlockButton variant="redstone" onClick={() => setVariant("danger")}>
        Danger
      </BlockButton>
      <ConfirmDialog
        {...args}
        open={variant !== null}
        variant={variant ?? "default"}
        onConfirm={() => setVariant(null)}
        onCancel={() => setVariant(null)}
      />
    </>
  );
}

export const States: Story = {
  args: {
    children: <p>Type the world name to confirm. Your 128 days of progress will be lost.</p>,
  },
};

/** One size (`sm` modal). Long text wraps inside it. */
export const Sizes: Story = {
  args: {
    description:
      "Deleting this world removes every chunk, player inventory, advancement and statistic. Backups older than seven days are also removed. This action cannot be undone.",
  },
};

/** While `loading`, both actions are blocked and Escape / overlay clicks are ignored. */
export const Disabled: Story = { args: { loading: true } };

export const Responsive: Story = { globals: mobileViewport };
