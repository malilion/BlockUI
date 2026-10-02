import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { StoryMobile, StoryStack } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { ChestIcon, PlanksIcon } from "@block-ui/icons";
import { useState } from "react";
import { ItemStack } from "../../inventory/ItemStack/ItemStack";
import { BlockPanel } from "../../layout/BlockPanel/BlockPanel";
import { CraftingGrid } from "../CraftingGrid/CraftingGrid";
import { CraftingSlot } from "../CraftingSlot/CraftingSlot";
import { CraftingTable } from "./CraftingTable";

const ring = [0, 1, 2, 3, 5, 6, 7, 8];

function ChestGrid({ filled }: { filled: boolean }) {
  return (
    <CraftingGrid size={3}>
      {Array.from({ length: 9 }, (_, i) => (
        <CraftingSlot key={i}>
          {filled && ring.includes(i) ? (
            <ItemStack icon={<PlanksIcon />} name="Oak Planks" />
          ) : null}
        </CraftingSlot>
      ))}
    </CraftingGrid>
  );
}

const meta = {
  title: "Components/Crafting/CraftingTable",
  component: CraftingTable,
  tags: ["autodocs"],
  args: {
    input: <ChestGrid filled />,
    result: <ItemStack icon={<ChestIcon />} amount={1} name="Chest" />,
    onTake: fn(),
  },
  argTypes: { input: { control: false }, result: { control: false } },
  parameters: {
    docs: {
      description: {
        component: [
          "Crafting layout: grid → arrow → result. Horizontal on desktop and vertical on mobile.",
          "",
          "```tsx",
          'import { CraftingTable, CraftingGrid, ItemStack } from "@block-ui/react";',
          "",
          "<CraftingTable",
          "  input={<CraftingGrid size={3}>…</CraftingGrid>}",
          "  result={<ItemStack icon={<ChestIcon />} amount={1} />}",
          "/>",
          "```",
          "",
          "Block UI does not ship a recipe engine — compute `result` in your app.",
          "",
          '**Accessibility** — a `group` named "Crafting table". The arrow is decorative; the input grid and the result slot are labelled, and the result is a live region. The Craft button uses `aria-disabled` until a result exists.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof CraftingTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const States: Story = {
  render: () => (
    <StoryStack>
      <CraftingTable
        label="Ready"
        input={<ChestGrid filled />}
        result={<ItemStack icon={<ChestIcon />} name="Chest" />}
        onCraft={fn()}
      />
      <CraftingTable label="Empty" input={<ChestGrid filled={false} />} onCraft={fn()} />
    </StoryStack>
  ),
};

export const Empty: Story = { args: { input: <ChestGrid filled={false} />, result: undefined } };

function InteractiveDemo() {
  const [crafted, setCrafted] = useState(0);
  const [filled, setFilled] = useState(true);
  return (
    <BlockPanel title={`Crafting (${crafted} crafted)`}>
      <CraftingTable
        input={<ChestGrid filled={filled} />}
        result={filled ? <ItemStack icon={<ChestIcon />} amount={1} name="Chest" /> : undefined}
        onCraft={() => {
          setCrafted((n) => n + 1);
          setFilled(false);
        }}
        onTake={() => setFilled(true)}
      />
    </BlockPanel>
  );
}

export const Interactive: Story = {
  render: () => <InteractiveDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Craft" }));
    await expect(canvas.getByRole("heading", { name: "Crafting (1 crafted)" })).toBeInTheDocument();
    await expect(canvas.getByRole("button", { name: "Craft" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
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

export const Variants: Story = {
  render: () => (
    <StoryStack>
      <CraftingTable
        label="3 × 3 table"
        input={<ChestGrid filled />}
        result={<ItemStack icon={<ChestIcon />} name="Chest" />}
      />
      <CraftingTable
        label="2 × 2 with Craft button"
        input={
          <CraftingGrid size={2}>
            <CraftingSlot>
              <ItemStack icon={<PlanksIcon />} name="Oak Planks" />
            </CraftingSlot>
          </CraftingGrid>
        }
        onCraft={fn()}
        canCraft={false}
      />
    </StoryStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <StoryStack>
      <CraftingTable
        label="Small slots"
        input={
          <CraftingGrid size={3} slotSize="sm">
            {null}
          </CraftingGrid>
        }
      />
      <CraftingTable label="Large slots (default)" input={<ChestGrid filled={false} />} />
    </StoryStack>
  ),
};

/** Without a result the Craft button is disabled (`aria-disabled`). */
export const Disabled: Story = {
  args: { input: <ChestGrid filled={false} />, result: undefined, onCraft: fn() },
};
