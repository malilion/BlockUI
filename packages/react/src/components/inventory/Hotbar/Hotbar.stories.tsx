import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  AppleIcon,
  AxeIcon,
  BucketIcon,
  DiamondSwordIcon,
  PickaxeIcon,
  ShovelIcon,
  StoneIcon,
  TorchIcon,
} from "@block-ui/icons";
import { fn } from "storybook/test";
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
          'import { Hotbar, InventorySlot, ItemStack } from "@block-ui/react";',
          "",
          "<Hotbar selectedIndex={slot} onSelect={setSlot}>…</Hotbar>",
          "```",
          "",
          "**Keyboard** — `1`–`9` select a slot anywhere on the page (ignored while typing in fields; disable with `hotkeys={false}`), arrow keys move and wrap. Works with touch.",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Hotbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Large: Story = { args: { slotSize: "lg", defaultSelectedIndex: 4 } };

export const WithoutKeys: Story = { args: { showKeys: false, hotkeys: false } };

export const FiveSlots: Story = { args: { slots: 5 } };
