import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { StoryMobile, StoryStack } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { BlockSelect } from "./BlockSelect";

const modes = [
  { value: "survival", label: "Survival" },
  { value: "creative", label: "Creative" },
  { value: "adventure", label: "Adventure" },
  { value: "spectator", label: "Spectator", disabled: true },
];

const meta = {
  title: "Components/Forms/BlockSelect",
  component: BlockSelect,
  tags: ["autodocs"],
  args: { label: "Game mode", options: modes, defaultValue: "survival" },
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
          "Native select with a pixel chevron. Using the native element keeps platform keyboard support and mobile pickers.",
          "",
          "```tsx",
          'import { BlockSelect } from "@block-ui/react";',
          "",
          '<BlockSelect label="Game mode" options={[{ value: "survival", label: "Survival" }]} />',
          "```",
          "",
          "**Accessibility** — a real `<select>` with a `<label>`, so screen readers, the keyboard and native mobile pickers all work; `error` sets `aria-invalid` and is linked with `aria-describedby`.",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof BlockSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Placeholder: Story = {
  args: { placeholder: "Choose a mode…", defaultValue: undefined },
};

export const States: Story = {
  render: () => (
    <StoryStack>
      <BlockSelect
        label="Error"
        options={modes}
        placeholder="Choose…"
        error="A game mode is required."
      />
      <BlockSelect label="Success" options={modes} defaultValue="creative" success />
      <BlockSelect label="Disabled" options={modes} defaultValue="survival" disabled />
    </StoryStack>
  ),
};

export const Disabled: Story = { args: { disabled: true } };

export const Variants: Story = {
  render: () => (
    <StoryStack>
      <BlockSelect label="Options prop" options={modes} defaultValue="creative" />
      <BlockSelect label="With placeholder" options={modes} placeholder="Choose a mode…" />
      <BlockSelect label="Option children" defaultValue="hard">
        <option value="easy">Easy</option>
        <option value="normal">Normal</option>
        <option value="hard">Hard</option>
      </BlockSelect>
    </StoryStack>
  ),
};

/** Selects have one height and stretch to their container. */
export const Sizes: Story = {
  render: () => (
    <StoryStack>
      <BlockSelect label="Narrow (200px)" wrapperClassName="block-story-w-200" options={modes} />
      <BlockSelect label="Full width" options={modes} />
    </StoryStack>
  ),
};

export const Interactive: Story = {
  args: { label: "Game mode", options: modes, defaultValue: "survival" },
  play: async ({ canvasElement }) => {
    const select = within(canvasElement).getByLabelText("Game mode");
    await userEvent.selectOptions(select, "adventure");
    await expect(select).toHaveValue("adventure");
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  render: () => (
    <StoryMobile>
      <BlockSelect label="Game mode" options={modes} defaultValue="survival" />
    </StoryMobile>
  ),
};
