import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { StoryStack } from "../../../stories/StoryLayout";
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

export const AllVariants: Story = {
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
