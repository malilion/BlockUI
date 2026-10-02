import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { PlayerIcon, SearchIcon } from "@block-ui/icons";
import { StoryMobile, StoryStack } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { BlockInput } from "./BlockInput";

const meta = {
  title: "Components/Forms/BlockInput",
  component: BlockInput,
  tags: ["autodocs"],
  args: { label: "Player Name", placeholder: "Steve" },
  decorators: [
    (Story) => (
      <StoryStack narrow>
        <Story />
      </StoryStack>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: [
          "Text input rendered as a sunken inventory-slot well.",
          "",
          "```tsx",
          'import { BlockInput } from "@block-ui/react";',
          "",
          '<BlockInput label="Player Name" placeholder="Steve" />',
          "```",
          "",
          "**Accessibility** — the label is a real `<label>`; `error` sets `aria-invalid` and is linked with `aria-describedby` together with `helperText`.",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof BlockInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: { label: "Search", placeholder: "Search items…", startIcon: <SearchIcon size={16} /> },
};

export const States: Story = {
  render: () => (
    <StoryStack>
      <BlockInput label="Default" placeholder="Steve" startIcon={<PlayerIcon size={16} />} />
      <BlockInput label="Helper" placeholder="My World" helperText="Shown on the world list." />
      <BlockInput label="Error" defaultValue="??" error="Only letters and numbers." />
      <BlockInput
        label="Success"
        defaultValue="BlockCraft SMP"
        success
        helperText="Name available."
      />
      <BlockInput label="Disabled" defaultValue="Locked" disabled />
    </StoryStack>
  ),
};

export const Disabled: Story = { args: { disabled: true, defaultValue: "Steve" } };

export const Required: Story = {
  args: { required: true, helperText: "Required to join a server." },
};

export const Variants: Story = {
  render: () => (
    <StoryStack>
      <BlockInput label="Text" placeholder="Steve" />
      <BlockInput label="Email" type="email" placeholder="steve@example.com" />
      <BlockInput label="Password" type="password" defaultValue="diamonds" />
      <BlockInput label="Number" type="number" defaultValue={64} />
      <BlockInput
        label="Search"
        type="search"
        startIcon={<SearchIcon size={16} />}
        placeholder="Search items…"
      />
    </StoryStack>
  ),
};

/** Text controls have one height and stretch to their container. */
export const Sizes: Story = {
  render: () => (
    <StoryStack>
      <BlockInput label="Narrow (200px)" wrapperClassName="block-story-w-200" placeholder="Steve" />
      <BlockInput label="Full width" placeholder="Steve" />
    </StoryStack>
  ),
};

export const Interactive: Story = {
  args: { label: "Player Name", placeholder: "Steve" },
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByLabelText("Player Name");
    await userEvent.type(input, "Alex");
    await expect(input).toHaveValue("Alex");
  },
};

export const Responsive: Story = {
  globals: mobileViewport,
  render: () => (
    <StoryMobile>
      <BlockInput label="Player Name" placeholder="Steve" helperText="3–16 characters." />
    </StoryMobile>
  ),
};
