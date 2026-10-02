import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { StoryMobile, StoryStack } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
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
          'import { BlockTextarea } from "@malilion/block-ui-react";',
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
      <BlockTextarea
        label="Error"
        defaultValue="!!!"
        error="Please write at least 10 characters."
      />
      <BlockTextarea label="Disabled" defaultValue="Read only notes" disabled />
    </StoryStack>
  ),
};

export const Disabled: Story = { args: { disabled: true } };

export const Variants: Story = {
  render: () => (
    <StoryStack>
      <BlockTextarea label="Plain" />
      <BlockTextarea label="With counter" maxLength={140} />
      <BlockTextarea label="With helper" helperText="Shown on the world list." />
    </StoryStack>
  ),
};

/** Use `rows` for height; width follows the container. */
export const Sizes: Story = {
  render: () => (
    <StoryStack>
      <BlockTextarea label="2 rows" rows={2} />
      <BlockTextarea label="4 rows (default)" />
      <BlockTextarea label="8 rows" rows={8} />
    </StoryStack>
  ),
};

export const Interactive: Story = {
  args: { label: "Notes", maxLength: 50 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText("Notes"), "Bring torches");
    await expect(canvas.getByText("13 / 50")).toBeInTheDocument();
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  render: () => (
    <StoryMobile>
      <BlockTextarea label="World description" maxLength={140} />
    </StoryMobile>
  ),
};
