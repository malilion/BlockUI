import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryRow } from "../../../stories/StoryLayout";
import { BlockButton } from "../../actions/BlockButton/BlockButton";
import { BlockToaster } from "./Toast";
import { toast } from "./store";

const meta = {
  title: "Components/Feedback/Toast",
  component: BlockToaster,
  tags: ["autodocs"],
  parameters: {
    docs: {
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
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof BlockToaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  render: () => (
    <StoryRow>
      <BlockButton variant="emerald" onClick={() => toast.success("World saved.", { title: "Success!" })}>
        Success
      </BlockButton>
      <BlockButton variant="diamond" onClick={() => toast.info("Update available.", { title: "Info" })}>
        Info
      </BlockButton>
      <BlockButton variant="gold" onClick={() => toast.warning("Low hunger.", { title: "Warning" })}>
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
