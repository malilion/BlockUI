import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { PlayerIcon } from "@malilion/block-ui-icons";
import { StoryMobile, StoryRow } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { Avatar } from "./Avatar";
import { avatarStatuses } from "./Avatar.types";

const meta = {
  title: "Components/Display/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  args: { name: "BlockMaster_42", status: "online" },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg", "xl"] },
    status: { control: "select", options: [undefined, ...avatarStatuses] },
    icon: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component: [
          "Square block avatar: a pixelated skin image, or initials on a material colour picked from the name (the same player always gets the same colour), with an optional presence dot.",
          "",
          "```tsx",
          'import { Avatar } from "@malilion/block-ui-react";',
          "",
          '<Avatar name="Steve" src="/skins/steve-face.png" status="online" />',
          "```",
          "",
          '**Accessibility** — `role="img"` named by the player and status ("Steve (online)"), so presence is never shown by colour alone. Use `decorative` when the name is already printed next to it. A broken image falls back to initials (covered by the unit tests).',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <StoryRow>
      <Avatar name="Steve" />
      <Avatar name="Alex" />
      <Avatar name="Notch" />
      <Avatar name="Herobrine" />
      <Avatar name="Jeb" icon={<PlayerIcon />} />
    </StoryRow>
  ),
};

export const States: Story = {
  render: () => (
    <StoryRow>
      {avatarStatuses.map((status) => (
        <Avatar key={status} name={`Player ${status}`} status={status} size="lg" />
      ))}
    </StoryRow>
  ),
};

export const Sizes: Story = {
  render: () => (
    <StoryRow>
      <Avatar name="Steve" size="sm" status="online" />
      <Avatar name="Steve" size="md" status="online" />
      <Avatar name="Steve" size="lg" status="online" />
      <Avatar name="Steve" size="xl" status="online" />
    </StoryRow>
  ),
};

/** Offline players keep their avatar; the status dot turns grey. */
export const Disabled: Story = { args: { status: "offline" } };

export const Interactive: Story = {
  play: async ({ canvasElement }) => {
    const avatar = within(canvasElement).getByRole("img", { name: "BlockMaster_42 (online)" });
    await expect(avatar).toHaveTextContent("B4");
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  render: () => (
    <StoryMobile>
      <StoryRow>
        <Avatar name="Steve" size="sm" />
        <Avatar name="Alex" size="sm" status="away" />
        <Avatar name="Notch" size="sm" status="busy" />
      </StoryRow>
    </StoryMobile>
  ),
};
