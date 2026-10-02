import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { StoryMobile, StoryStack } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { BlockRadio, BlockRadioGroup } from "./BlockRadio";

const modes = [
  { value: "survival", label: "Survival" },
  { value: "creative", label: "Creative" },
  { value: "adventure", label: "Adventure" },
];

const meta = {
  title: "Components/Forms/BlockRadio",
  component: BlockRadioGroup,
  subcomponents: { BlockRadio },
  tags: ["autodocs"],
  args: { label: "Game mode", options: modes, defaultValue: "survival", onValueChange: fn() },
  argTypes: { orientation: { control: "inline-radio", options: ["vertical", "horizontal"] } },
  parameters: {
    docs: {
      description: {
        component: [
          "Radio group rendered as a `<fieldset>` with pixel octagon radios.",
          "",
          "```tsx",
          'import { BlockRadioGroup } from "@malilion/block-ui-react";',
          "",
          '<BlockRadioGroup label="Game mode" options={modes} defaultValue="survival" />',
          "```",
          "",
          "**Accessibility** — native radios share a `name`, so arrow keys move the selection; the label is the `<legend>`.",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof BlockRadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <StoryStack>
      <BlockRadioGroup {...args} label="Vertical" />
      <BlockRadioGroup {...args} label="Horizontal" orientation="horizontal" />
    </StoryStack>
  ),
};

export const WithDescriptions: Story = {
  args: {
    options: [
      { value: "peaceful", label: "Peaceful", description: "No hostile mobs." },
      { value: "normal", label: "Normal", description: "The intended experience." },
      { value: "hard", label: "Hard", description: "Hunger can kill you.", disabled: true },
    ],
    defaultValue: "normal",
    label: "Difficulty",
  },
};

export const ErrorState: Story = { args: { defaultValue: undefined, error: "Pick a game mode." } };

export const Disabled: Story = { args: { disabled: true } };

export const States: Story = {
  render: (args) => (
    <StoryStack>
      <BlockRadioGroup {...args} label="Selected" />
      <BlockRadioGroup {...args} label="Nothing selected" defaultValue={undefined} />
      <BlockRadioGroup {...args} label="Error" defaultValue={undefined} error="Pick a game mode." />
      <BlockRadioGroup
        {...args}
        label="One option disabled"
        options={[...modes.slice(0, 2), { value: "adventure", label: "Adventure", disabled: true }]}
      />
    </StoryStack>
  ),
};

/** One size; long option labels wrap. */
export const Sizes: Story = {
  args: {
    orientation: "horizontal",
    options: [
      { value: "s", label: "S" },
      { value: "m", label: "A medium option" },
      { value: "l", label: "A much longer option label that wraps" },
    ],
    defaultValue: "m",
    label: "Label length",
  },
};

export const Interactive: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText("Creative"));
    await expect(canvas.getByRole("radio", { name: "Creative" })).toBeChecked();
    await userEvent.keyboard("{ArrowDown}");
    await expect(canvas.getByRole("radio", { name: "Adventure" })).toBeChecked();
    await expect(args.onValueChange).toHaveBeenLastCalledWith("adventure");
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  render: (args) => (
    <StoryMobile>
      <BlockRadioGroup {...args} orientation="horizontal" />
    </StoryMobile>
  ),
};
