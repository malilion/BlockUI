import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { InventoryPage } from "./InventoryPage";
import source from "./InventoryPage.tsx?raw";

const meta = {
  title: "Patterns/Inventory Screen",
  tags: ["!autodocs"],
  parameters: { layout: "fullscreen", a11y: { config: { rules: [] } } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const InventoryScreen: Story = {
  name: "Inventory Screen",
  render: () => <InventoryPage />,
  parameters: { docs: { source: { code: source } } },
  play: async ({ canvasElement }) => {
    const grid = within(canvasElement).getByRole("grid", { name: "Inventory" });
    const cells = within(grid).getAllByRole("gridcell");
    cells[0]!.focus();
    await userEvent.keyboard("{ArrowRight}{Enter}");
    await expect(cells[1]).toHaveAttribute("aria-selected", "true");
  },
};
