import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import {
  BookIcon,
  ChestIcon,
  CloseIcon,
  MenuIcon,
  PlayIcon,
  SettingsIcon,
  WorldIcon,
} from "@malilion/block-ui-icons";
import { StoryMobile, StoryRow } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { BlockMenu } from "./BlockMenu";
import type { BlockMenuEntry } from "./BlockMenu.types";

const worldItems: BlockMenuEntry[] = [
  { id: "play", label: "Play", icon: <PlayIcon size={16} />, shortcut: "Enter" },
  { id: "edit", label: "Edit", icon: <SettingsIcon size={16} /> },
  { id: "backup", label: "Make backup", icon: <ChestIcon size={16} />, disabled: true },
  { type: "separator" },
  { id: "delete", label: "Delete world", icon: <CloseIcon size={16} />, danger: true },
];

const meta = {
  title: "Components/Actions/BlockMenu",
  component: BlockMenu,
  tags: ["autodocs"],
  args: { label: "World", icon: <WorldIcon size={16} />, items: worldItems, onSelect: fn() },
  argTypes: {
    align: { control: "inline-radio", options: ["start", "end"] },
    placement: { control: "inline-radio", options: ["bottom", "top"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    icon: { control: false },
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
          "Dropdown menu button for a list of actions — icons, shortcuts, separators and destructive items.",
          "",
          "```tsx",
          'import { BlockMenu } from "@malilion/block-ui-react";',
          "",
          "<BlockMenu",
          '  label="World"',
          "  items={[",
          '    { id: "play", label: "Play", onSelect: play },',
          '    { type: "separator" },',
          '    { id: "delete", label: "Delete world", danger: true },',
          "  ]}",
          "  onSelect={(id) => console.log(id)}",
          "/>",
          "```",
          "",
          "The menu renders in the `BlockUIProvider` overlay layer with fixed positioning (flipping above the trigger when there is no room below), so it works inside tables and other scroll containers. For choosing a form value use `BlockSelect`; a menu is for commands.",
          "",
          "**Keyboard** — `Enter`, `Space` or `↓` open on the first item, `↑` on the last. Inside: `↑`/`↓` move (wrapping, skipping disabled items), `Home`/`End` jump, a letter jumps to the next matching item, `Enter`/`Space` choose, `Esc` closes, and `Tab` closes and moves on from the trigger.",
          "",
          '**Accessibility** — WAI-ARIA menu button: the trigger has `aria-haspopup="menu"`, `aria-expanded` and `aria-controls`; the `menu` is labelled by the trigger and its items are `menuitem`s with roving focus. Disabled items use `aria-disabled`. Focus returns to the trigger after choosing or `Esc`. Shortcut hints are visual only.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof BlockMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <StoryRow>
      <BlockMenu {...args} label="Stone" />
      <BlockMenu {...args} label="Grass" variant="grass" />
      <BlockMenu {...args} label="More actions" icon={<MenuIcon size={24} />} iconOnly />
      <BlockMenu {...args} label="Aligned end" align="end" />
    </StoryRow>
  ),
};

export const States: Story = {
  render: (args) => (
    <StoryRow>
      <BlockMenu {...args} label="Closed" />
      <BlockMenu
        {...args}
        label="Text only"
        icon={undefined}
        items={[
          { id: "new", label: "New world" },
          { id: "join", label: "Join server" },
          { id: "guide", label: "Guide", icon: <BookIcon size={16} /> },
        ]}
      />
      <BlockMenu {...args} label="Opens upward" placement="top" />
    </StoryRow>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <StoryRow>
      <BlockMenu {...args} size="sm" label="Small" />
      <BlockMenu {...args} size="md" label="Medium" />
      <BlockMenu {...args} size="lg" label="Large" />
    </StoryRow>
  ),
};

export const Disabled: Story = { args: { disabled: true } };

export const Interactive: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "World" });
    await userEvent.click(trigger);
    const play = await canvas.findByRole("menuitem", { name: "Play" });
    await waitFor(() => expect(play).toHaveFocus());
    await userEvent.keyboard("{ArrowDown}");
    await expect(canvas.getByRole("menuitem", { name: "Edit" })).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await expect(args.onSelect).toHaveBeenCalledWith("edit");
    await waitFor(() => expect(trigger).toHaveFocus());
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  render: (args) => (
    <StoryMobile>
      <StoryRow>
        <BlockMenu {...args} label="World" />
        <BlockMenu {...args} label="More" icon={<MenuIcon size={24} />} iconOnly align="end" />
      </StoryRow>
    </StoryMobile>
  ),
};
