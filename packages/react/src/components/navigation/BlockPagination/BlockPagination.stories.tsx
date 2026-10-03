import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { StoryLabel, StoryMobile, StoryStack } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { BlockPagination } from "./BlockPagination";

const meta = {
  title: "Components/Navigation/BlockPagination",
  component: BlockPagination,
  tags: ["autodocs"],
  args: { pageCount: 12, defaultPage: 1, onPageChange: fn() },
  argTypes: {
    variant: { control: "inline-radio", options: ["full", "compact"] },
    size: { control: "inline-radio", options: ["sm", "md"] },
  },
  parameters: {
    docs: {
      description: {
        component: [
          "Page navigation for long lists — server browsers, world lists, tables.",
          "",
          "```tsx",
          'import { BlockPagination } from "@malilion/block-ui-react";',
          "",
          "const [page, setPage] = useState(1);",
          "<BlockPagination pageCount={12} page={page} onPageChange={setPage} />",
          "```",
          "",
          "**Keyboard** — every page and arrow is a button in the tab order; `Enter`/`Space` activate. Arrows at either end stay focusable but inert.",
          "",
          '**Accessibility** — a `<nav>` landmark (default name "Pagination") containing a list. The current page has `aria-current="page"`, page buttons are named "Page N", arrows "Previous page" / "Next page", and ellipses are `aria-hidden`. The compact variant announces "Page N of M" through a polite live region.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof BlockPagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <StoryStack>
      <StoryLabel>Full</StoryLabel>
      <BlockPagination {...args} label="Full pagination" />
      <StoryLabel>Compact</StoryLabel>
      <BlockPagination {...args} label="Compact pagination" variant="compact" />
    </StoryStack>
  ),
};

export const States: Story = {
  render: (args) => (
    <StoryStack>
      <StoryLabel>First page</StoryLabel>
      <BlockPagination {...args} label="First page" defaultPage={1} />
      <StoryLabel>Middle page</StoryLabel>
      <BlockPagination {...args} label="Middle page" defaultPage={6} />
      <StoryLabel>Last page</StoryLabel>
      <BlockPagination {...args} label="Last page" defaultPage={12} />
      <StoryLabel>Few pages</StoryLabel>
      <BlockPagination {...args} label="Few pages" pageCount={4} />
      <StoryLabel>More siblings and boundaries</StoryLabel>
      <BlockPagination
        {...args}
        label="Wide pagination"
        pageCount={40}
        defaultPage={20}
        siblingCount={2}
        boundaryCount={2}
      />
    </StoryStack>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <StoryStack>
      <BlockPagination {...args} label="Small pagination" size="sm" />
      <BlockPagination {...args} label="Medium pagination" size="md" />
    </StoryStack>
  ),
};

export const Disabled: Story = { args: { disabled: true, defaultPage: 4 } };

export const Interactive: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Page 2" }));
    await userEvent.click(canvas.getByRole("button", { name: "Next page" }));
    await expect(args.onPageChange).toHaveBeenLastCalledWith(3);
    await expect(canvas.getByRole("button", { name: "Page 3" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  },
};

/** On phones, use `variant="compact"` or `size="sm"` with `siblingCount={0}`. */
export const Responsive: Story = {
  globals: mobileViewport,
  render: (args) => (
    <StoryMobile>
      <StoryStack>
        <BlockPagination {...args} label="Compact pagination" variant="compact" />
        <BlockPagination
          {...args}
          label="Small pagination"
          size="sm"
          siblingCount={0}
          defaultPage={6}
        />
      </StoryStack>
    </StoryMobile>
  ),
};
