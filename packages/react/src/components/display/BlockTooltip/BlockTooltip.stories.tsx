import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { ChestIcon, CraftingIcon, SettingsIcon, TorchIcon } from "@malilion/block-ui-icons";
import { StoryMobile, StoryRow } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { BlockButton } from "../../actions/BlockButton/BlockButton";
import { IconButton } from "../../actions/IconButton/IconButton";
import { BlockTooltip } from "./BlockTooltip";
import { tooltipPlacements } from "./BlockTooltip.types";

const meta = {
  title: "Components/Feedback/BlockTooltip",
  component: BlockTooltip,
  tags: ["autodocs"],
  args: {
    content: "Open your inventory",
    children: <IconButton icon={<ChestIcon size={24} />} label="Inventory" />,
  },
  argTypes: {
    placement: { control: "inline-radio", options: tooltipPlacements },
    size: { control: "inline-radio", options: ["sm", "md"] },
    children: { control: false },
  },
  decorators: [
    (Story) => (
      <div className="block-story-tooltip-stage">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: [
          "Short obsidian hint for a button, link or input — shown on hover and keyboard focus.",
          "",
          "```tsx",
          'import { BlockTooltip } from "@malilion/block-ui-react";',
          "",
          '<BlockTooltip content="Open your inventory">',
          '  <IconButton icon={<ChestIcon />} label="Inventory" />',
          "</BlockTooltip>",
          "```",
          "",
          "Wrap a single focusable element. A disabled `<button>` fires no pointer events — use `aria-disabled` if a disabled control needs a tooltip.",
          "",
          "**Keyboard** — focus shows the tooltip immediately; `Esc` hides it without moving focus.",
          "",
          '**Accessibility** — `role="tooltip"` linked to the trigger with `aria-describedby`, so it supplements (never replaces) the trigger\'s accessible name. Meets WCAG 1.4.13: dismissible with `Esc`, hoverable (the pointer can move onto it) and persistent until hover or focus leaves. Keep content non-interactive.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof BlockTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <StoryRow>
      {tooltipPlacements.map((placement) => (
        <BlockTooltip key={placement} content={`Placed ${placement}`} placement={placement}>
          <BlockButton>{placement}</BlockButton>
        </BlockTooltip>
      ))}
    </StoryRow>
  ),
};

export const States: Story = {
  render: () => (
    <StoryRow>
      <BlockTooltip content="Craft items from your inventory">
        <IconButton icon={<CraftingIcon size={24} />} label="Crafting" />
      </BlockTooltip>
      <BlockTooltip content="Shows instantly" delay={0}>
        <BlockButton>No delay</BlockButton>
      </BlockTooltip>
      <BlockTooltip content="Settings are locked on this server">
        <BlockButton aria-disabled="true" startIcon={<SettingsIcon size={16} />}>
          Locked
        </BlockButton>
      </BlockTooltip>
    </StoryRow>
  ),
};

export const Sizes: Story = {
  render: () => (
    <StoryRow>
      <BlockTooltip
        size="sm"
        content="Torches light up caves and stop hostile mobs from spawning nearby."
      >
        <IconButton icon={<TorchIcon size={24} />} label="Small tooltip" />
      </BlockTooltip>
      <BlockTooltip content="Torches light up caves and stop hostile mobs from spawning nearby.">
        <IconButton icon={<TorchIcon size={24} />} label="Medium tooltip" />
      </BlockTooltip>
    </StoryRow>
  ),
};

/** `disabled` turns the tooltip off entirely — the trigger is left untouched. */
export const Disabled: Story = { args: { disabled: true } };

export const Interactive: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    await expect(canvas.getByRole("button", { name: "Inventory" })).toHaveFocus();
    await expect(canvas.getByRole("tooltip")).toHaveTextContent("Open your inventory");
    await userEvent.keyboard("{Escape}");
    await expect(canvas.queryByRole("tooltip")).not.toBeInTheDocument();
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  render: () => (
    <StoryMobile>
      <StoryRow>
        <BlockTooltip content="Left edge: flips if needed" placement="left">
          <IconButton icon={<ChestIcon size={24} />} label="Chest" />
        </BlockTooltip>
        <BlockTooltip content="Craft items" placement="bottom">
          <IconButton icon={<CraftingIcon size={24} />} label="Crafting" />
        </BlockTooltip>
      </StoryRow>
    </StoryMobile>
  ),
};
