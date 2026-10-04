import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { StoryMobile, StoryStack } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { NumberInput } from "./NumberInput";

const meta = {
  title: "Components/Forms/NumberInput",
  component: NumberInput,
  tags: ["autodocs"],
  args: { label: "Stack size", defaultValue: 16, min: 1, max: 64, onValueChange: fn() },
  argTypes: {
    step: { control: { type: "number", min: 0.01 } },
  },
  parameters: {
    docs: {
      description: {
        component: [
          "Number field with − / + buttons for stack sizes, trade amounts or coordinates.",
          "",
          "```tsx",
          'import { NumberInput } from "@malilion/block-ui-react";',
          "",
          '<NumberInput label="Stack size" min={1} max={64} value={amount} onValueChange={setAmount} />',
          "```",
          "",
          "Typed text is committed (clamped to `min` / `max` and rounded to the step’s precision) on `Enter` or blur.",
          "",
          "**Keyboard** — `↑`/`↓` step, `Page Up`/`Page Down` step ×10, `Home`/`End` jump to min / max.",
          "",
          '**Accessibility** — WAI-ARIA spinbutton (`aria-valuenow` / `aria-valuemin` / `aria-valuemax`) with a visible label and helper / error text via `aria-describedby`. The − / + buttons are named "Decrease" / "Increase", kept out of the tab order (the keys do the same) and disabled at the limits.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <StoryStack narrow>
      <NumberInput label="Stack size" defaultValue={16} min={1} max={64} />
      <NumberInput label="Price (emeralds)" defaultValue={2.5} min={0} step={0.5} />
      <NumberInput label="Y coordinate" defaultValue={-59} min={-64} max={320} />
    </StoryStack>
  ),
};

export const States: Story = {
  render: () => (
    <StoryStack narrow>
      <NumberInput label="Empty" placeholder="0" />
      <NumberInput label="At maximum" defaultValue={64} max={64} helperText="A full stack." />
      <NumberInput label="With error" defaultValue={0} error="Pick at least 1 item." />
      <NumberInput label="Valid" defaultValue={12} success />
    </StoryStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <StoryStack>
      <NumberInput label="Narrow" defaultValue={8} wrapperClassName="block-story-w-200" />
      <NumberInput label="Wide" defaultValue={8} wrapperClassName="block-story-w-480" />
    </StoryStack>
  ),
};

export const Disabled: Story = { args: { disabled: true } };

export const Interactive: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("spinbutton", { name: "Stack size" });
    await userEvent.click(input);
    await userEvent.keyboard("{ArrowUp}{PageUp}");
    await expect(input).toHaveValue("27");
    await userEvent.keyboard("{End}");
    await expect(args.onValueChange).toHaveBeenLastCalledWith(64);
    await expect(canvas.getByRole("button", { name: "Increase" })).toBeDisabled();
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
