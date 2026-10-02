import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { DiamondIcon, PlanksIcon } from "@block-ui/icons";
import { StoryMobile, StoryRow } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { ItemStack } from "../../inventory/ItemStack/ItemStack";
import { CraftingSlot } from "../CraftingSlot/CraftingSlot";
import { CraftingGrid } from "./CraftingGrid";

const plank = () => <ItemStack icon={<PlanksIcon />} name="Oak Planks" />;

const meta = {
  title: "Components/Crafting/CraftingGrid",
  component: CraftingGrid,
  tags: ["autodocs"],
  args: { size: 3, children: null },
  argTypes: { size: { control: "inline-radio", options: [2, 3] }, children: { control: false } },
  parameters: {
    docs: {
      description: {
        component: [
          "2 × 2 or 3 × 3 crafting input grid. Missing slots are filled with empty `CraftingSlot`s.",
          "",
          "```tsx",
          'import { CraftingGrid, CraftingSlot, ItemStack } from "@block-ui/react";',
          "",
          "<CraftingGrid size={3}>",
          "  <CraftingSlot><ItemStack icon={<PlanksIcon />} /></CraftingSlot>",
          "</CraftingGrid>",
          "```",
          "",
          "**Keyboard** — identical to `InventoryGrid` (arrow keys, Home/End, Enter).",
          "",
          '**Accessibility** — an ARIA `grid` named "Crafting grid" with one tab stop. Arrow keys move, `Home`/`End` jump, `Enter`/`Space` select — the same as `InventoryGrid`.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof CraftingGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <CraftingGrid {...args}>
      <CraftingSlot>{plank()}</CraftingSlot>
      <CraftingSlot>{plank()}</CraftingSlot>
      <CraftingSlot>{plank()}</CraftingSlot>
      <CraftingSlot>{plank()}</CraftingSlot>
      <CraftingSlot />
      <CraftingSlot>{plank()}</CraftingSlot>
      <CraftingSlot>{plank()}</CraftingSlot>
      <CraftingSlot>{plank()}</CraftingSlot>
      <CraftingSlot>{plank()}</CraftingSlot>
    </CraftingGrid>
  ),
};

export const Sizes: Story = {
  render: () => (
    <StoryRow>
      <CraftingGrid size={2}>
        <CraftingSlot>
          <ItemStack icon={<DiamondIcon />} name="Diamond" />
        </CraftingSlot>
      </CraftingGrid>
      <CraftingGrid size={3}>{null}</CraftingGrid>
    </StoryRow>
  ),
};

export const Variants: Story = {
  render: () => (
    <StoryRow>
      <CraftingGrid size={2} label="Player crafting (2 × 2)">
        <CraftingSlot>{plank()}</CraftingSlot>
      </CraftingGrid>
      <CraftingGrid size={3} label="Crafting table (3 × 3)">
        <CraftingSlot>{plank()}</CraftingSlot>
      </CraftingGrid>
    </StoryRow>
  ),
};

export const States: Story = {
  render: () => (
    <StoryRow>
      <CraftingGrid label="Empty">{null}</CraftingGrid>
      <CraftingGrid label="Partly filled" defaultSelectedIndex={4}>
        <CraftingSlot />
        <CraftingSlot />
        <CraftingSlot />
        <CraftingSlot />
        <CraftingSlot>{plank()}</CraftingSlot>
      </CraftingGrid>
    </StoryRow>
  ),
};

export const Disabled: Story = {
  render: () => (
    <CraftingGrid size={2} label="Locked grid">
      <CraftingSlot disabled>{plank()}</CraftingSlot>
      <CraftingSlot disabled />
      <CraftingSlot disabled />
      <CraftingSlot disabled />
    </CraftingGrid>
  ),
};

export const Interactive: Story = {
  render: () => <CraftingGrid size={3}>{null}</CraftingGrid>,
  play: async ({ canvasElement }) => {
    const cells = within(canvasElement).getAllByRole("gridcell");
    cells[0]!.focus();
    await userEvent.keyboard("{ArrowDown}{ArrowRight}{Enter}");
    await expect(cells[4]).toHaveFocus();
    await expect(cells[4]).toHaveAttribute("aria-selected", "true");
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  render: () => (
    <StoryMobile>
      <CraftingGrid size={3}>
        <CraftingSlot>{plank()}</CraftingSlot>
      </CraftingGrid>
    </StoryMobile>
  ),
};
