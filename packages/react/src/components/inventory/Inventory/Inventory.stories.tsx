import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { StoryMobile, StoryStack } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import {
  AppleIcon,
  BookIcon,
  CoalIcon,
  DiamondIcon,
  EmeraldIcon,
  GoldIcon,
  ObsidianIcon,
  PickaxeIcon,
  RedstoneIcon,
  TorchIcon,
} from "@malilion/block-ui-icons";
import { Hotbar } from "../Hotbar/Hotbar";
import { InventoryGrid } from "../InventoryGrid/InventoryGrid";
import { InventorySlot } from "../InventorySlot/InventorySlot";
import { ItemStack } from "../ItemStack/ItemStack";
import { Inventory, InventorySection } from "./Inventory";

const meta = {
  title: "Components/Inventory/Inventory",
  component: Inventory,
  subcomponents: { InventorySection },
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          'An inventory window that stacks sections such as the main storage grid and the hotbar. `variant="chest"` gives a wooden storage container.',
          "",
          "```tsx",
          'import { Inventory, InventorySection, InventoryGrid, Hotbar } from "@malilion/block-ui-react";',
          "",
          "<Inventory>",
          '  <InventorySection title="Storage"><InventoryGrid columns={9} rows={3}>…</InventoryGrid></InventorySection>',
          '  <InventorySection title="Hotbar"><Hotbar>…</Hotbar></InventorySection>',
          "</Inventory>",
          "```",
          "",
          "**Accessibility** — a `<section>` region named by its title; each `InventorySection` is a `group` named by its heading, so screen reader users can jump between the storage grid and the hotbar.",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Inventory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Inventory {...args}>
      <InventorySection title="Storage">
        <InventoryGrid columns={9} rows={3}>
          <InventorySlot>
            <ItemStack icon={<DiamondIcon />} amount={12} name="Diamond" />
          </InventorySlot>
          <InventorySlot>
            <ItemStack icon={<RedstoneIcon />} amount={24} name="Redstone" />
          </InventorySlot>
          <InventorySlot>
            <ItemStack icon={<CoalIcon />} amount={36} name="Coal" />
          </InventorySlot>
        </InventoryGrid>
      </InventorySection>
      <InventorySection title="Hotbar">
        <Hotbar hotkeys={false}>
          <InventorySlot>
            <ItemStack icon={<PickaxeIcon />} name="Diamond Pickaxe" />
          </InventorySlot>
          <InventorySlot>
            <ItemStack icon={<TorchIcon />} amount={17} name="Torch" />
          </InventorySlot>
          <InventorySlot>
            <ItemStack icon={<AppleIcon />} amount={8} name="Apple" />
          </InventorySlot>
        </Hotbar>
      </InventorySection>
    </Inventory>
  ),
};

export const Variants: Story = {
  render: () => (
    <StoryStack>
      <Inventory title="Default">
        <InventoryGrid columns={9} rows={1}>
          <InventorySlot>
            <ItemStack icon={<DiamondIcon />} amount={12} name="Diamond" />
          </InventorySlot>
        </InventoryGrid>
      </Inventory>
      <Inventory title="Chest" variant="chest">
        <InventoryGrid columns={9} rows={1} label="Chest contents">
          <InventorySlot>
            <ItemStack icon={<GoldIcon />} amount={16} name="Gold Ingot" />
          </InventorySlot>
        </InventoryGrid>
      </Inventory>
    </StoryStack>
  ),
};

export const Chest: Story = {
  render: () => (
    <Inventory variant="chest" title="Chest">
      <InventoryGrid columns={9} rows={3} label="Chest contents">
        <InventorySlot>
          <ItemStack icon={<DiamondIcon />} amount={32} name="Diamond" />
        </InventorySlot>
        <InventorySlot>
          <ItemStack icon={<GoldIcon />} amount={16} name="Gold Ingot" />
        </InventorySlot>
        <InventorySlot>
          <ItemStack icon={<EmeraldIcon />} amount={8} name="Emerald" />
        </InventorySlot>
        <InventorySlot>
          <ItemStack icon={<ObsidianIcon />} amount={4} name="Obsidian" />
        </InventorySlot>
        <InventorySlot rarity="epic">
          <ItemStack icon={<BookIcon />} name="Enchanted Book" />
        </InventorySlot>
      </InventoryGrid>
    </Inventory>
  ),
};

export const States: Story = {
  render: () => (
    <Inventory title="Backpack">
      <InventorySection title="Unlocked">
        <InventoryGrid columns={9} rows={1} label="Unlocked slots" defaultSelectedIndex={1}>
          <InventorySlot>
            <ItemStack icon={<TorchIcon />} amount={17} name="Torch" />
          </InventorySlot>
          <InventorySlot>
            <ItemStack icon={<AppleIcon />} amount={8} name="Apple" />
          </InventorySlot>
        </InventoryGrid>
      </InventorySection>
      <InventorySection title="Locked (upgrade required)">
        <InventoryGrid columns={9} label="Locked slots">
          {Array.from({ length: 9 }, (_, i) => (
            <InventorySlot key={i} locked />
          ))}
        </InventoryGrid>
      </InventorySection>
    </Inventory>
  ),
};

export const Sizes: Story = {
  render: () => (
    <StoryStack>
      {(["sm", "md", "lg"] as const).map((size) => (
        <Inventory key={size} title={`Slot size ${size}`} headingLevel={3}>
          <InventoryGrid columns={9} rows={1} slotSize={size} label={`Inventory ${size}`}>
            <InventorySlot>
              <ItemStack icon={<DiamondIcon />} amount={12} name="Diamond" />
            </InventorySlot>
          </InventoryGrid>
        </Inventory>
      ))}
    </StoryStack>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Inventory title="Read-only chest" variant="chest">
      <InventoryGrid columns={9} rows={1} label="Read-only contents">
        <InventorySlot disabled>
          <ItemStack icon={<EmeraldIcon />} amount={8} name="Emerald" />
        </InventorySlot>
        <InventorySlot disabled>
          <ItemStack icon={<GoldIcon />} amount={4} name="Gold Ingot" />
        </InventorySlot>
      </InventoryGrid>
    </Inventory>
  ),
};

export const Interactive: Story = {
  render: () => (
    <Inventory>
      <InventorySection title="Storage">
        <InventoryGrid columns={9} rows={1}>
          <InventorySlot>
            <ItemStack icon={<DiamondIcon />} amount={12} name="Diamond" />
          </InventorySlot>
          <InventorySlot>
            <ItemStack icon={<CoalIcon />} amount={36} name="Coal" />
          </InventorySlot>
        </InventoryGrid>
      </InventorySection>
    </Inventory>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("region", { name: "Inventory" })).toBeInTheDocument();
    const cells = canvas.getAllByRole("gridcell");
    await userEvent.click(cells[1]!);
    await expect(cells[1]).toHaveAttribute("aria-selected", "true");
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  render: (args, context) => <StoryMobile>{Default.render?.(args, context)}</StoryMobile>,
};
