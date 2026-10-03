import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { DashboardPage } from "./DashboardPage";
import source from "./DashboardPage.tsx?raw";

const meta = {
  title: "Patterns/Dashboard",
  tags: ["!autodocs"],
  parameters: { layout: "fullscreen", a11y: { config: { rules: [] } } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dashboard: Story = {
  render: () => <DashboardPage />,
  parameters: { docs: { source: { code: source } } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("heading", { level: 1, name: "Dashboard" })).toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: "Continue" }));
    await expect(await canvas.findByText("Game continued.")).toBeInTheDocument();
  },
};
