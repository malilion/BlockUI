import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { CraftingPage } from "./CraftingPage";
import source from "./CraftingPage.tsx?raw";

const meta = {
  title: "Patterns/Crafting Screen",
  tags: ["!autodocs"],
  parameters: { layout: "fullscreen", a11y: { config: { rules: [] } } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const CraftingScreen: Story = {
  name: "Crafting Screen",
  render: () => <CraftingPage />,
  parameters: { docs: { source: { code: source } } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Craft" }));
    await expect(
      canvas.getByRole("heading", { name: "Crafting table · 1 crafted" }),
    ).toBeInTheDocument();
  },
};
