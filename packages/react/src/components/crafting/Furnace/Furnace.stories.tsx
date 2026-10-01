import type { Meta, StoryObj } from "@storybook/react-vite";
import { CoalIcon, IronIcon, StoneIcon } from "@block-ui/icons";
import { useEffect, useState } from "react";
import { fn } from "storybook/test";
import { StoryGrid } from "../../../stories/StoryLayout";
import { ItemStack } from "../../inventory/ItemStack/ItemStack";
import { BlockPanel } from "../../layout/BlockPanel/BlockPanel";
import { Furnace } from "./Furnace";

const ore = <ItemStack icon={<StoneIcon />} amount={3} name="Iron Ore" />;
const coal = <ItemStack icon={<CoalIcon />} amount={12} name="Coal" />;
const ingot = <ItemStack icon={<IronIcon />} amount={3} name="Iron Ingot" />;

const meta = {
  title: "Components/Crafting/Furnace",
  component: Furnace,
  tags: ["autodocs"],
  args: { input: ore, fuel: coal, burning: true, progress: 45, fuelLevel: 70, onTakeResult: fn() },
  argTypes: {
    input: { control: false },
    fuel: { control: false },
    result: { control: false },
    progress: { control: { type: "range", min: 0, max: 100 } },
    fuelLevel: { control: { type: "range", min: 0, max: 100 } },
  },
  parameters: {
    docs: {
      description: {
        component: [
          "Furnace with input, fuel, flame, progress arrow and result. The state (Idle, Burning, Processing, Complete, No Fuel) is derived from the props and announced through a live status line.",
          "",
          "```tsx",
          'import { Furnace, ItemStack } from "@block-ui/react";',
          "",
          "<Furnace input={ore} fuel={coal} burning progress={45} />",
          "```",
          "",
          "**Accessibility** — the arrow is a `progressbar`; slots are grouped as Input / Fuel / Result.",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Furnace>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const States: Story = {
  render: () => (
    <StoryGrid>
      <BlockPanel title="Idle">
        <Furnace />
      </BlockPanel>
      <BlockPanel title="Burning">
        <Furnace input={ore} fuel={coal} burning />
      </BlockPanel>
      <BlockPanel title="Processing">
        <Furnace input={ore} fuel={coal} burning progress={60} fuelLevel={40} />
      </BlockPanel>
      <BlockPanel title="Complete">
        <Furnace fuel={coal} result={ingot} progress={100} />
      </BlockPanel>
      <BlockPanel title="No fuel">
        <Furnace input={ore} />
      </BlockPanel>
    </StoryGrid>
  ),
};

function Smelting() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setProgress((p) => (p >= 100 ? 0 : p + 5)), 200);
    return () => window.clearInterval(id);
  }, []);
  return (
    <Furnace
      input={progress < 100 ? ore : undefined}
      fuel={coal}
      result={progress >= 100 ? ingot : undefined}
      burning={progress < 100}
      progress={progress}
      fuelLevel={100 - progress}
    />
  );
}

export const Interactive: Story = { render: () => <Smelting /> };
