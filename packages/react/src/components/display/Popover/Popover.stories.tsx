import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { CompassIcon, SettingsIcon } from "@malilion/block-ui-icons";
import { StoryMobile, StoryRow } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { BlockButton } from "../../actions/BlockButton/BlockButton";
import { IconButton } from "../../actions/IconButton/IconButton";
import { BlockToggle } from "../../forms/BlockToggle/BlockToggle";
import { NumberInput } from "../../forms/NumberInput/NumberInput";
import { BlockStack } from "../../layout/BlockStack/BlockStack";
import { Popover } from "./Popover";

const teleport = (
  <BlockStack gap={2}>
    <BlockStack direction="row" gap={2}>
      <NumberInput label="X" defaultValue={120} />
      <NumberInput label="Z" defaultValue={-340} />
    </BlockStack>
    <BlockButton variant="grass" size="sm">
      Teleport
    </BlockButton>
  </BlockStack>
);

const meta = {
  title: "Components/Display/Popover",
  component: Popover,
  tags: ["autodocs"],
  args: {
    title: "Teleport",
    content: teleport,
    onOpenChange: fn(),
    children: <BlockButton startIcon={<CompassIcon size={16} />}>Teleport…</BlockButton>,
  },
  argTypes: {
    placement: { control: "inline-radio", options: ["top", "bottom", "left", "right"] },
    align: { control: "inline-radio", options: ["start", "center", "end"] },
    content: { control: false },
    children: { control: false },
  },
  decorators: [
    (Story) => (
      <div className="block-story-menu-stage">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: [
          "Click-to-open floating panel for interactive content — quick settings, a teleport form, filters. Use `BlockTooltip` for short, non-interactive hints.",
          "",
          "```tsx",
          'import { Popover } from "@malilion/block-ui-react";',
          "",
          '<Popover title="Teleport" content={<TeleportForm />}>',
          "  <BlockButton>Teleport…</BlockButton>",
          "</Popover>",
          "```",
          "",
          "**Keyboard** — `Enter`/`Space` on the trigger opens it and focus moves to the first control inside; `Esc` closes and returns focus to the trigger; tabbing out closes it.",
          "",
          '**Accessibility** — a non-modal `dialog` labelled by its `title` (or `label`), rendered in the overlay layer and placed with viewport flip. The trigger gets `aria-haspopup="dialog"`, `aria-expanded` and `aria-controls`.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <StoryRow>
      {(["bottom", "top", "right", "left"] as const).map((placement) => (
        <Popover key={placement} {...args} placement={placement} title={`Placed ${placement}`}>
          <BlockButton>{placement}</BlockButton>
        </Popover>
      ))}
    </StoryRow>
  ),
};

export const States: Story = {
  render: () => (
    <StoryRow>
      <Popover
        label="Video settings"
        content={
          <BlockStack gap={2}>
            <BlockToggle label="Smooth lighting" defaultChecked />
            <BlockToggle label="Clouds" />
          </BlockStack>
        }
      >
        <IconButton icon={<SettingsIcon size={16} />} label="Video settings" />
      </Popover>
      <Popover title="Open by default" content="Popovers can start open." defaultOpen>
        <BlockButton>Open</BlockButton>
      </Popover>
    </StoryRow>
  ),
};

/** The panel is 200–360px wide and scrolls when taller than the viewport. */
export const Sizes: Story = {
  args: { content: "A short note.", title: "Tip" },
};

/** A disabled trigger cannot open the popover. */
export const Disabled: Story = {
  args: { children: <BlockButton disabled>Teleport…</BlockButton> },
};

export const Interactive: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Teleport…" });
    await userEvent.click(trigger);
    const dialog = await within(document.body).findByRole("dialog", { name: "Teleport" });
    await expect(dialog).toBeInTheDocument();
    await expect(args.onOpenChange).toHaveBeenLastCalledWith(true);
    await userEvent.keyboard("{Escape}");
    await expect(trigger).toHaveFocus();
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
