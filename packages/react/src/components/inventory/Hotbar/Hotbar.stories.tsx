import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { StoryMobile, StoryStack } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import {
  AppleIcon,
  AxeIcon,
  BucketIcon,
  DiamondSwordIcon,
  PickaxeIcon,
  ShovelIcon,
  StoneIcon,
  TorchIcon,
} from "@malilion/block-ui-icons";
import { InventorySlot } from "../InventorySlot/InventorySlot";
import { ItemStack } from "../ItemStack/ItemStack";
import { Hotbar } from "./Hotbar";

const hotbarItems = [
  <ItemStack key="sword" icon={<DiamondSwordIcon />} name="Diamond Sword" />,
  <ItemStack
    key="pick"
    icon={<PickaxeIcon />}
    name="Diamond Pickaxe"
    durability={900}
    maxDurability={1561}
  />,
  <ItemStack key="axe" icon={<AxeIcon />} name="Iron Axe" />,
  <ItemStack key="shovel" icon={<ShovelIcon />} name="Iron Shovel" />,
  <ItemStack key="apple" icon={<AppleIcon />} amount={8} name="Apple" />,
  <ItemStack key="stone" icon={<StoneIcon />} amount={64} maxAmount={64} name="Stone" />,
  <ItemStack key="bucket" icon={<BucketIcon />} name="Water Bucket" />,
  <ItemStack key="torch" icon={<TorchIcon />} amount={17} name="Torch" />,
];

const meta = {
  title: "Components/Inventory/Hotbar",
  component: Hotbar,
  tags: ["autodocs"],
  args: { onSelect: fn(), children: null },
  argTypes: {
    slotSize: { control: "inline-radio", options: ["sm", "md", "lg"] },
    children: { control: false },
  },
  render: (args) => (
    <Hotbar {...args}>
      {hotbarItems.map((item) => (
        <InventorySlot key={item.key}>{item}</InventorySlot>
      ))}
    </Hotbar>
  ),
  parameters: {
    docs: {
      description: {
        component: [
          "Nine-slot quick bar with a selected slot.",
          "",
          "```tsx",
          'import { Hotbar, InventorySlot, ItemStack } from "@malilion/block-ui-react";',
          "",
          "<Hotbar selectedIndex={slot} onSelect={setSlot}>…</Hotbar>",
          "```",
          "",
          "**Keyboard** — `1`–`9` select a slot anywhere on the page (ignored while typing in fields; disable with `hotkeys={false}`), arrow keys move and wrap. Works with touch.",
          "",
          '**Accessibility** — an `InventoryGrid` labelled "Hotbar" with `aria-keyshortcuts="1 2 3 4 5 6 7 8 9"`. Number keys work from anywhere on the page but are ignored while typing in a field or with modifier keys. Slots are 1:1 touch targets that shrink with the screen.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Hotbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <StoryStack>
      {(["sm", "md", "lg"] as const).map((size) => (
        <Hotbar key={size} {...args} slotSize={size} hotkeys={false} label={`Hotbar ${size}`}>
          {hotbarItems.map((item) => (
            <InventorySlot key={item.key}>{item}</InventorySlot>
          ))}
        </Hotbar>
      ))}
    </StoryStack>
  ),
};

export const Variants: Story = {
  render: (args) => (
    <StoryStack>
      <Hotbar {...args} hotkeys={false} label="Nine slots">
        {hotbarItems.map((item) => (
          <InventorySlot key={item.key}>{item}</InventorySlot>
        ))}
      </Hotbar>
      <Hotbar {...args} hotkeys={false} slots={5} label="Five slots">
        {hotbarItems.slice(0, 5).map((item) => (
          <InventorySlot key={item.key}>{item}</InventorySlot>
        ))}
      </Hotbar>
      <Hotbar {...args} hotkeys={false} showKeys={false} label="Without key hints">
        {hotbarItems.map((item) => (
          <InventorySlot key={item.key}>{item}</InventorySlot>
        ))}
      </Hotbar>
    </StoryStack>
  ),
};

export const WithoutKeys: Story = { args: { showKeys: false, hotkeys: false } };

export const FiveSlots: Story = { args: { slots: 5 } };

export const States: Story = {
  render: (args) => (
    <Hotbar {...args} defaultSelectedIndex={4} hotkeys={false}>
      <InventorySlot>{hotbarItems[0]}</InventorySlot>
      <InventorySlot disabled>{hotbarItems[1]}</InventorySlot>
      <InventorySlot locked />
      <InventorySlot rarity="rare">{hotbarItems[3]}</InventorySlot>
      <InventorySlot>{hotbarItems[4]}</InventorySlot>
    </Hotbar>
  ),
};

/** Locked slots cannot be selected — not with clicks, arrows or number keys. */
export const Disabled: Story = {
  render: (args) => (
    <Hotbar {...args} hotkeys={false} slots={5}>
      <InventorySlot>{hotbarItems[0]}</InventorySlot>
      <InventorySlot locked />
      <InventorySlot locked />
      <InventorySlot locked />
      <InventorySlot locked />
    </Hotbar>
  ),
};

export const Interactive: Story = {
  play: async ({ canvasElement, args }) => {
    const cells = within(canvasElement).getAllByRole("gridcell");
    await userEvent.keyboard("3");
    await expect(cells[2]).toHaveAttribute("aria-selected", "true");
    await userEvent.click(cells[5]!);
    await expect(cells[5]).toHaveAttribute("aria-selected", "true");
    await userEvent.keyboard("{ArrowRight}");
    await expect(cells[6]).toHaveAttribute("aria-selected", "true");
    await expect(args.onSelect).toHaveBeenLastCalledWith(6);
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
