import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, fn, userEvent, within } from "storybook/test";
import { GrassBlockIcon, PlayIcon, SettingsIcon, WorldIcon } from "@malilion/block-ui-icons";
import { StoryMobile, StoryStack } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { BlockButton } from "../../actions/BlockButton/BlockButton";
import { BlockStepper } from "./BlockStepper";
import type { BlockStep } from "./BlockStepper.types";

const steps: BlockStep[] = [
  { id: "name", label: "Name", description: "Name your world", icon: <WorldIcon size={16} /> },
  {
    id: "mode",
    label: "Game mode",
    description: "Survival or creative",
    icon: <SettingsIcon size={16} />,
  },
  {
    id: "terrain",
    label: "Terrain",
    description: "Seed and world type",
    icon: <GrassBlockIcon size={16} />,
  },
  { id: "create", label: "Create", description: "Generate and play", icon: <PlayIcon size={16} /> },
];

function Wizard({ onStepClick }: { onStepClick?: (index: number) => void }) {
  const [current, setCurrent] = useState(1);
  return (
    <StoryStack>
      <BlockStepper
        steps={steps}
        current={current}
        onStepClick={(index) => {
          onStepClick?.(index);
          setCurrent(index);
        }}
      />
      <BlockButton variant="grass" onClick={() => setCurrent((c) => Math.min(c + 1, steps.length))}>
        Next
      </BlockButton>
    </StoryStack>
  );
}

const meta = {
  title: "Components/Navigation/BlockStepper",
  component: BlockStepper,
  tags: ["autodocs"],
  args: { steps, current: 1, onStepClick: fn() },
  argTypes: {
    current: { control: { type: "range", min: 0, max: 4 } },
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
    steps: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component: [
          "Multi-step progress for flows like creating a world or setting up a server. Completed steps show a check and become buttons when `onStepClick` is set.",
          "",
          "```tsx",
          'import { BlockStepper } from "@malilion/block-ui-react";',
          "",
          '<BlockStepper steps={[{ id: "name", label: "Name" }, { id: "mode", label: "Game mode" }]} current={1} onStepClick={setStep} />',
          "```",
          "",
          '**Accessibility** — a `<nav>` ("Progress") containing an ordered list; the current step has `aria-current="step"` and completed steps add "(completed)" for screen readers, so progress never depends on colour or the check icon.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof BlockStepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <StoryStack>
      <BlockStepper {...args} label="Horizontal progress" />
      <BlockStepper {...args} label="Vertical progress" orientation="vertical" />
    </StoryStack>
  ),
};

export const States: Story = {
  render: (args) => (
    <StoryStack>
      <BlockStepper {...args} label="First step" current={0} />
      <BlockStepper {...args} label="Last step" current={3} />
      <BlockStepper {...args} label="All done" current={4} />
    </StoryStack>
  ),
};

/** Steps share the width equally; descriptions hide on phones in horizontal mode. */
export const Sizes: Story = {
  args: { steps: steps.map(({ description: _description, ...step }) => step) },
};

/** Without `onStepClick` completed steps are not clickable. */
export const Disabled: Story = { args: { onStepClick: undefined, current: 2 } };

export const Interactive: Story = {
  render: (args) => <Wizard onStepClick={args.onStepClick} />,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Next" }));
    await expect(canvas.getAllByRole("listitem")[2]).toHaveAttribute("aria-current", "step");
    await userEvent.click(canvas.getByRole("button", { name: /Name/ }));
    await expect(args.onStepClick).toHaveBeenCalledWith(0);
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
