import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { ServerBrowserPage } from "./ServerBrowserPage";
import source from "./ServerBrowserPage.tsx?raw";

const meta = {
  title: "Patterns/Server Browser",
  tags: ["!autodocs"],
  parameters: { layout: "fullscreen", a11y: { config: { rules: [] } } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ServerBrowser: Story = {
  name: "Server Browser",
  render: () => <ServerBrowserPage />,
  parameters: { docs: { source: { code: source } } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText("Search servers"), "red");
    await expect(canvas.getByText("1 server")).toBeInTheDocument();
    await expect(canvas.getByText("Redstone Lab")).toBeInTheDocument();
  },
};
