import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryStack } from "../../../stories/StoryLayout";
import { BlockTextarea } from "./BlockTextarea";

const meta = {
  title: "Components/Forms/BlockTextarea",
  component: BlockTextarea,
  tags: ["autodocs"],
  args: { label: "Textarea", placeholder: "Write something…" },
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
          "Multi-line text field. Set `maxLength` to show a live counter.",
          "",
          "```tsx",
          'import { BlockTextarea } from "@block-ui/react";',
          "",
          '<BlockTextarea label="World description" maxLength={140} />',
          "```",
          "",
          "**Accessibility** — labelled `<textarea>` with `aria-invalid` / `aria-describedby` for errors and helper text.",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof BlockTextarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCounter: Story = { args: { maxLength: 140, label: "World description" } };

export const States: Story = {
  render: () => (
    <StoryStack>
      <BlockTextarea label="Helper" helperText="Markdown is not supported." />
      <BlockTextarea label="Error" defaultValue="!!!" error="Please write at least 10 characters." />
      <BlockTextarea label="Disabled" defaultValue="Read only notes" disabled />
    </StoryStack>
  ),
};

export const Disabled: Story = { args: { disabled: true } };
