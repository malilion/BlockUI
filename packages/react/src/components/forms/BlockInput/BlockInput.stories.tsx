import type { Meta, StoryObj } from "@storybook/react-vite";
import { PlayerIcon, SearchIcon } from "@block-ui/icons";
import { StoryStack } from "../../../stories/StoryLayout";
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
      <BlockInput label="Success" defaultValue="BlockCraft SMP" success helperText="Name available." />
      <BlockInput label="Disabled" defaultValue="Locked" disabled />
    </StoryStack>
  ),
};

export const Disabled: Story = { args: { disabled: true, defaultValue: "Steve" } };

export const Required: Story = { args: { required: true, helperText: "Required to join a server." } };
