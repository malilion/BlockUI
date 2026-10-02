import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { StoryMobile, StoryRow } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { BlockButton } from "../../actions/BlockButton/BlockButton";
import { BlockToaster } from "./Toast";
import { useEffect } from "react";
import { toast } from "./store";
import type { ToastOptions } from "./Toast.types";

const meta = {
  title: "Components/Feedback/Toast",
  component: BlockToaster,
  tags: ["autodocs"],
  parameters: {
    docs: {
      // Toasts are position: fixed — render each docs story in its own frame.
      story: { inline: false, height: "360px" },
      description: {
        component: [
          "Imperative toasts. `<BlockUIProvider>` already renders the `<BlockToaster />` region.",
          "",
          "```ts",
          'import { toast } from "@block-ui/react";',
          "",
          'toast.success("World saved.");',
          'toast.info("Update available.");',
          'toast.warning("Low hunger.");',
          'toast.error("Connection failed.", { duration: 0 });',
          "```",
          "",
          "**Behaviour** — auto close (default 4 s, `duration: 0` keeps it), manual close button, stacking (newest last, `limit` 5), hover/focus pauses the timer, `Escape` dismisses the focused toast. Rendered inside an ARIA live region.",
          "",
          '**Accessibility** — the toast region is a labelled `region` ("Notifications") with a polite live list. Success and info toasts are `status`; warning and error toasts are `alert`. Every toast has a labelled dismiss button, hovering or focusing pauses the timer, and `Escape` closes the focused toast.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof BlockToaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Error (sticky)" }));
    const region = canvas.getByRole("region", { name: "Notifications" });
    await expect(await within(region).findByRole("alert")).toHaveTextContent("Connection failed.");
    await userEvent.click(within(region).getByRole("button", { name: "Dismiss notification" }));
    await expect(within(region).queryByRole("alert")).not.toBeInTheDocument();
  },
  render: () => (
    <StoryRow>
      <BlockButton
        variant="emerald"
        onClick={() => toast.success("World saved.", { title: "Success!" })}
      >
        Success
      </BlockButton>
      <BlockButton
        variant="diamond"
        onClick={() => toast.info("Update available.", { title: "Info" })}
      >
        Info
      </BlockButton>
      <BlockButton
        variant="gold"
        onClick={() => toast.warning("Low hunger.", { title: "Warning" })}
      >
        Warning
      </BlockButton>
      <BlockButton
        variant="redstone"
        onClick={() => toast.error("Connection failed.", { title: "Error", duration: 0 })}
      >
        Error (sticky)
      </BlockButton>
      <BlockButton onClick={() => toast.dismiss()}>Dismiss all</BlockButton>
    </StoryRow>
  ),
};

/** Shows the given toasts while the story is mounted (sticky, so they stay visible). */
function ShowToasts({ toasts }: { toasts: Array<[keyof typeof kinds, string, ToastOptions?]> }) {
  useEffect(() => {
    const ids = toasts.map(([kind, message, options]) =>
      kinds[kind](message, { duration: 0, ...options }),
    );
    return () => ids.forEach((id) => toast.dismiss(id));
  }, [toasts]);
  return null;
}

const kinds = {
  success: toast.success,
  info: toast.info,
  warning: toast.warning,
  error: toast.error,
};

const defaultToasts: Array<[keyof typeof kinds, string, ToastOptions?]> = [
  ["success", "World saved."],
];
export const Default: Story = { render: () => <ShowToasts toasts={defaultToasts} /> };

const variantToasts: Array<[keyof typeof kinds, string, ToastOptions?]> = [
  ["success", "World saved.", { title: "Success!" }],
  ["info", "Update available.", { title: "Info" }],
  ["warning", "Low hunger.", { title: "Warning" }],
  ["error", "Connection failed.", { title: "Error" }],
];
export const Variants: Story = { render: () => <ShowToasts toasts={variantToasts} /> };

const stateToasts: Array<[keyof typeof kinds, string, ToastOptions?]> = [
  ["info", "Message only."],
  ["success", "With a title.", { title: "Achievement get!" }],
  [
    "error",
    "With an action.",
    { title: "Disconnected", action: <BlockButton size="sm">Retry</BlockButton> },
  ],
];
export const States: Story = { render: () => <ShowToasts toasts={stateToasts} /> };

const sizeToasts: Array<[keyof typeof kinds, string, ToastOptions?]> = [
  ["info", "Short."],
  [
    "info",
    "Toasts are 380px wide (full width on phones); longer messages wrap onto several lines instead of growing wider.",
  ],
];
/** One width: 380px on desktop, full width minus the gutter on phones. */
export const Sizes: Story = { render: () => <ShowToasts toasts={sizeToasts} /> };

const stickyToasts: Array<[keyof typeof kinds, string, ToastOptions?]> = [
  [
    "warning",
    "This toast will not close by itself.",
    { title: "Auto-close disabled", duration: 0 },
  ],
];
/** `duration: 0` disables auto-close; the toast stays until dismissed. */
export const Disabled: Story = { render: () => <ShowToasts toasts={stickyToasts} /> };

export const Responsive: Story = {
  globals: mobileViewport,
  render: () => (
    <StoryMobile>
      <ShowToasts toasts={variantToasts} />
    </StoryMobile>
  ),
};
