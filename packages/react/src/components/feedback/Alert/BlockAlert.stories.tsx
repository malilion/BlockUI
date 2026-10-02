import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { StoryMobile, StoryStack } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { BlockButton } from "../../actions/BlockButton/BlockButton";
import { BlockAlert } from "./BlockAlert";
import { alertVariants } from "./BlockAlert.types";

const meta = {
  title: "Components/Feedback/BlockAlert",
  component: BlockAlert,
  tags: ["autodocs"],
  args: { variant: "warning", title: "Warning", children: "Low hunger!" },
  argTypes: { variant: { control: "inline-radio", options: alertVariants } },
  decorators: [
    (Story) => (
      <StoryStack narrow>
        <Story />
      </StoryStack>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: [
          "Inline status message in four variants.",
          "",
          "```tsx",
          'import { BlockAlert } from "@block-ui/react";',
          "",
          '<BlockAlert variant="warning" title="Warning">Low hunger!</BlockAlert>',
          "```",
          "",
          '**Accessibility** — `warning` / `error` use `role="alert"`; `success` / `info` use `role="status"`. The dismiss button has an accessible label.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof BlockAlert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <StoryStack>
      <BlockAlert variant="success" title="Success!" onClose={fn()}>
        Your world has been saved.
      </BlockAlert>
      <BlockAlert variant="info" title="Info" onClose={fn()}>
        A new update is available.
      </BlockAlert>
      <BlockAlert variant="warning" title="Warning" onClose={fn()}>
        Low hunger!
      </BlockAlert>
      <BlockAlert variant="error" title="Error" onClose={fn()}>
        Failed to connect to server.
      </BlockAlert>
    </StoryStack>
  ),
};

export const WithAction: Story = {
  args: {
    variant: "error",
    title: "Connection lost",
    children: "The server stopped responding.",
    action: (
      <BlockButton size="sm" variant="stone">
        Retry
      </BlockButton>
    ),
  },
};

export const States: Story = {
  render: () => (
    <StoryStack>
      <BlockAlert variant="info" title="Title and text">
        A new update is available.
      </BlockAlert>
      <BlockAlert variant="info">Text only.</BlockAlert>
      <BlockAlert variant="success" title="Dismissible" onClose={fn()}>
        Your world has been saved.
      </BlockAlert>
      <BlockAlert variant="warning" icon={false} title="No icon">
        Low hunger!
      </BlockAlert>
    </StoryStack>
  ),
};

/** One size; text wraps and the alert fills its container. */
export const Sizes: Story = {
  render: () => (
    <StoryStack>
      <BlockAlert variant="info">Short.</BlockAlert>
      <BlockAlert variant="info" title="Long message">
        A much longer message wraps across several lines while the icon and the dismiss button stay
        aligned to the top.
      </BlockAlert>
    </StoryStack>
  ),
};

/** Alerts are not interactive; a disabled action inside an alert looks like this. */
export const Disabled: Story = {
  args: {
    variant: "error",
    title: "Connection lost",
    children: "Retrying in 30 seconds…",
    action: (
      <BlockButton size="sm" disabled>
        Retry
      </BlockButton>
    ),
  },
};

export const Interactive: Story = {
  args: { variant: "success", title: "Saved", children: "World saved.", onClose: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("status", { name: "Saved" })).toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: "Dismiss" }));
    await expect(args.onClose).toHaveBeenCalledOnce();
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  decorators: [
    (Story) => (
      <StoryMobile>
        <Story />
      </StoryMobile>
    ),
  ],
};
