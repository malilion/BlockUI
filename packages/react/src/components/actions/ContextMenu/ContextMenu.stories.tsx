import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { expect, fireEvent, fn, userEvent, within } from "storybook/test";
import { ArmorIcon, CloseIcon, DiamondSwordIcon, PickaxeIcon } from "@malilion/block-ui-icons";
import { StoryMobile, StoryRow } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { InventorySlot } from "../../inventory/InventorySlot/InventorySlot";
import { ItemStack } from "../../inventory/ItemStack/ItemStack";
import { ContextMenu } from "./ContextMenu";
import type { BlockMenuEntry } from "../BlockMenu/BlockMenu.types";

const items: BlockMenuEntry[] = [
  { id: "split", label: "Split stack", shortcut: "Right-click" },
  { id: "equip", label: "Equip", icon: <ArmorIcon size={16} /> },
  { id: "enchant", label: "Enchant", disabled: true },
  { type: "separator" },
  { id: "drop", label: "Drop", icon: <CloseIcon size={16} />, danger: true, shortcut: "Q" },
];

const slot = (name: string, icon: ReactNode) => (
  <InventorySlot size="lg" label={name} onClick={() => {}}>
    <ItemStack icon={icon} name={name} />
  </InventorySlot>
);

const meta = {
  title: "Components/Actions/ContextMenu",
  component: ContextMenu,
  tags: ["autodocs"],
  args: {
    items,
    label: "Item actions",
    onSelect: fn(),
    children: slot("Diamond Sword", <DiamondSwordIcon />),
  },
  argTypes: { items: { control: false }, children: { control: false } },
  parameters: {
    docs: {
      description: {
        component: [
          "Right-click menu for an area — inventory slots, list rows, map markers. It opens at the pointer and shares the menu (items, separators, shortcuts, danger, disabled) with `BlockMenu`.",
          "",
          "```tsx",
          'import { ContextMenu } from "@malilion/block-ui-react";',
          "",
          '<ContextMenu label="Item actions" items={[{ id: "drop", label: "Drop", danger: true }]} onSelect={handle}>',
          "  <InventorySlot …/>",
          "</ContextMenu>",
          "```",
          "",
          "**Keyboard** — focus a control inside and press `Shift+F10` or the `Menu` key. In the menu: `↑`/`↓`, `Home`/`End`, type-ahead, `Enter`/`Space` choose, `Esc` closes; focus returns to the control.",
          "",
          '**Accessibility** — a labelled `role="menu"` of `menuitem`s rendered in the overlay layer. Right-click is never the only way in: offer the same actions elsewhere (e.g. a `BlockMenu`) for touch users.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <StoryRow>
      <ContextMenu {...args}>{slot("Diamond Sword", <DiamondSwordIcon />)}</ContextMenu>
      <ContextMenu {...args} items={items.slice(0, 2)}>
        {slot("Iron Pickaxe", <PickaxeIcon />)}
      </ContextMenu>
    </StoryRow>
  ),
};

export const States: Story = {
  render: (args) => (
    <StoryRow>
      <ContextMenu {...args} label="With a disabled item">
        {slot("Diamond Sword", <DiamondSwordIcon />)}
      </ContextMenu>
      <ContextMenu {...args} disabled label="Browser menu">
        {slot("Iron Pickaxe", <PickaxeIcon />)}
      </ContextMenu>
    </StoryRow>
  ),
};

/** The menu is 200–320px wide and flips to stay inside the viewport. */
export const Sizes: Story = {
  args: {
    items: [
      ...items,
      { id: "rename", label: "Rename at an anvil to give this item a custom name" },
    ],
  },
};

/** `disabled` leaves the browser's own context menu. */
export const Disabled: Story = { args: { disabled: true } };

export const Interactive: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const target = canvas.getByRole("button", { name: "Diamond Sword" });
    await fireEvent.contextMenu(target, { clientX: 40, clientY: 40 });
    const body = within(document.body);
    await expect(await body.findByRole("menu", { name: "Item actions" })).toBeInTheDocument();
    await userEvent.keyboard("{End}{Enter}");
    await expect(args.onSelect).toHaveBeenCalledWith("drop");
    await expect(target).toHaveFocus();
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
