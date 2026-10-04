import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { StoryLabel, StoryMobile, StoryStack } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { BlockPanel } from "../BlockPanel/BlockPanel";
import { BlockGrid } from "./BlockGrid";

const cells = (count: number) =>
  Array.from({ length: count }, (_, i) => (
    <BlockPanel key={i} variant="plain">
      Cell {i + 1}
    </BlockPanel>
  ));

const meta = {
  title: "Components/Layout/BlockGrid",
  component: BlockGrid,
  tags: ["autodocs"],
  args: { columns: 3, gap: 4, children: cells(6) },
  argTypes: {
    columns: { control: { type: "range", min: 1, max: 6 } },
    gap: { control: "select", options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12] },
    children: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component: [
          "Two-dimensional grid on the token spacing scale: a fixed number of equal columns (collapsing to one on phones), or auto-fill with a minimum item width.",
          "",
          "```tsx",
          'import { BlockGrid } from "@malilion/block-ui-react";',
          "",
          "<BlockGrid columns={3}>…</BlockGrid>",
          '<BlockGrid minItemWidth="240px" as="ul">…</BlockGrid>',
          "```",
          "",
          '**Accessibility** — purely presentational; DOM order (reading and tab order) is never rearranged. Use `as="ul"` for lists of cards.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof BlockGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <StoryStack>
      <StoryLabel>Fixed: 4 columns</StoryLabel>
      <BlockGrid columns={4}>{cells(8)}</BlockGrid>
      <StoryLabel>Auto-fill: at least 180px</StoryLabel>
      <BlockGrid minItemWidth="180px">{cells(8)}</BlockGrid>
    </StoryStack>
  ),
};

export const States: Story = {
  render: () => (
    <StoryStack>
      <StoryLabel>Uneven last row</StoryLabel>
      <BlockGrid columns={3}>{cells(5)}</BlockGrid>
      <StoryLabel>Single column</StoryLabel>
      <BlockGrid columns={1}>{cells(2)}</BlockGrid>
    </StoryStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <StoryStack>
      {([1, 4, 8] as const).map((gap) => (
        <div key={gap}>
          <StoryLabel>gap={gap}</StoryLabel>
          <BlockGrid columns={4} gap={gap}>
            {cells(4)}
          </BlockGrid>
        </div>
      ))}
    </StoryStack>
  ),
};

/** Grids have no disabled state; `stackOnMobile={false}` keeps fixed columns on phones. */
export const Disabled: Story = { args: { stackOnMobile: false } };

export const Interactive: Story = {
  args: { as: "ul", "aria-label": "Cells", children: [<li key="a">A</li>, <li key="b">B</li>] },
  play: async ({ canvasElement }) => {
    const list = within(canvasElement).getByRole("list", { name: "Cells" });
    await expect(list).toHaveAttribute("data-mode", "fixed");
    await expect(getComputedStyle(list).display).toBe("grid");
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
