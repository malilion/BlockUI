import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { SearchIcon, WorldIcon } from "@malilion/block-ui-icons";
import { StoryMobile, StoryStack } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { BlockButton } from "../../actions/BlockButton/BlockButton";
import { EmptyState } from "./EmptyState";

const onCreate = fn();

const meta = {
  title: "Components/Feedback/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  args: {
    title: "No worlds yet",
    description: "Create a world to start your adventure.",
    action: (
      <BlockButton variant="grass" onClick={onCreate}>
        Create world
      </BlockButton>
    ),
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md"] },
    title: { control: "text" },
    description: { control: "text" },
    action: { control: false },
    icon: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component: [
          "Placeholder for an empty list, search or inventory: an icon, a title, a short description and an action.",
          "",
          "```tsx",
          'import { EmptyState } from "@malilion/block-ui-react";',
          "",
          '<EmptyState title="No worlds yet" description="Create one to start." action={<BlockButton>Create world</BlockButton>} />',
          "```",
          "",
          "**Accessibility** — the title is a real heading (`headingLevel`, default 3) so it shows up in the page outline; the icon is decorative.",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <StoryStack>
      <EmptyState
        title="No worlds yet"
        icon={<WorldIcon size={48} />}
        description="Create a world to start."
      />
      <EmptyState
        title="No results"
        icon={<SearchIcon size={48} />}
        description="Try another search term."
      />
    </StoryStack>
  ),
};

export const States: Story = {
  render: () => (
    <StoryStack>
      <EmptyState title="Chest is empty" />
      <EmptyState title="Server offline" description="Check back later." />
    </StoryStack>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <StoryStack>
      <EmptyState {...args} size="sm" />
      <EmptyState {...args} size="md" />
    </StoryStack>
  ),
};

/** Without an action the state is informational only. */
export const Disabled: Story = { args: { action: undefined } };

export const Interactive: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("heading", { name: "No worlds yet" })).toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: "Create world" }));
    await expect(onCreate).toHaveBeenCalled();
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
