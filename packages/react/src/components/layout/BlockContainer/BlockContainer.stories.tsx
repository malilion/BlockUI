import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { StoryMobile, StoryStack } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { BlockPanel } from "../BlockPanel/BlockPanel";
import { BlockContainer } from "./BlockContainer";

const content = (label: string) => <BlockPanel variant="plain">{label}</BlockPanel>;

const meta = {
  title: "Components/Layout/BlockContainer",
  component: BlockContainer,
  tags: ["autodocs"],
  args: { size: "md", children: content("A centred, readable column (768px max).") },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg", "xl", "full"] },
    children: { control: false },
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: [
          "Centres page content at a readable max width (the breakpoint scale: 640 / 768 / 1024 / 1280px) with 16px side gutters.",
          "",
          "```tsx",
          'import { BlockContainer } from "@malilion/block-ui-react";',
          "",
          '<BlockContainer as="main" size="lg">…</BlockContainer>',
          "```",
          "",
          '**Accessibility** — presentational; pass `as="main"` (or another landmark element) when the container is the page’s main region.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof BlockContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <StoryStack>
      <BlockContainer size="sm">{content("sm — 640px")}</BlockContainer>
      <BlockContainer size="lg">{content("lg — 1024px")}</BlockContainer>
      <BlockContainer size="full">{content("full — no max width")}</BlockContainer>
    </StoryStack>
  ),
};

export const States: Story = {
  render: () => (
    <StoryStack>
      <BlockContainer size="md">{content("With 16px gutters")}</BlockContainer>
      <BlockContainer size="md" flush>
        {content("Flush — no gutters")}
      </BlockContainer>
    </StoryStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <StoryStack>
      {(["sm", "md", "lg", "xl"] as const).map((size) => (
        <BlockContainer key={size} size={size}>
          {content(size)}
        </BlockContainer>
      ))}
    </StoryStack>
  ),
};

/** Containers have no disabled state. */
export const Disabled: Story = { args: { flush: true } };

export const Interactive: Story = {
  args: { as: "section", "aria-label": "Container" },
  play: async ({ canvasElement }) => {
    const region = within(canvasElement).getByRole("region", { name: "Container" });
    await expect(getComputedStyle(region).maxWidth).toBe("768px");
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
