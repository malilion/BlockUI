import type { Meta, StoryObj } from "@storybook/react-vite";
import { PlayerProfilePage } from "./PlayerProfilePage";
import source from "./PlayerProfilePage.tsx?raw";

const meta = {
  title: "Patterns/Player Profile",
  tags: ["!autodocs"],
  parameters: { layout: "fullscreen", a11y: { config: { rules: [] } } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const PlayerProfile: Story = {
  name: "Player Profile",
  render: () => <PlayerProfilePage />,
  parameters: { docs: { source: { code: source } } },
};
