import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { CompassIcon, SettingsIcon, WorldIcon } from "@malilion/block-ui-icons";
import { StoryMobile, StoryStack } from "../../../stories/StoryLayout";
import { mobileViewport } from "../../../stories/storyGlobals";
import { Accordion } from "./Accordion";
import type { AccordionItem } from "./Accordion.types";

const items: AccordionItem[] = [
  {
    id: "video",
    title: "Video settings",
    icon: <SettingsIcon size={16} />,
    content: "Render distance, smooth lighting and frame rate.",
  },
  {
    id: "world",
    title: "World options",
    icon: <WorldIcon size={16} />,
    content: "Difficulty, game rules and world border.",
  },
  {
    id: "controls",
    title: "Controls",
    icon: <CompassIcon size={16} />,
    content: "Key bindings and mouse sensitivity.",
  },
  { id: "beta", title: "Experimental", content: "Not available in this version.", disabled: true },
];

const meta = {
  title: "Components/Layout/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  args: { items, defaultValue: ["video"], onValueChange: fn() },
  argTypes: {
    type: { control: "inline-radio", options: ["single", "multiple"] },
    items: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component: [
          "Collapsible sections — settings groups, FAQs, long forms.",
          "",
          "```tsx",
          'import { Accordion } from "@malilion/block-ui-react";',
          "",
          '<Accordion items={[{ id: "video", title: "Video settings", content: <VideoSettings /> }]} />',
          "```",
          "",
          "**Keyboard** — `Enter`/`Space` toggle a section; `↑`/`↓` move between headers (wrapping, skipping disabled ones), `Home`/`End` jump.",
          "",
          "**Accessibility** — WAI-ARIA accordion: each header is a button inside a heading (`headingLevel`) with `aria-expanded` / `aria-controls`; each open panel is a `region` labelled by its header. Collapsed panels are removed from the accessibility tree.",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <StoryStack>
      <Accordion {...args} type="single" />
      <Accordion
        {...args}
        type="multiple"
        items={items.map((item) => ({ ...item, title: `${item.title} (multiple)` }))}
        defaultValue={["video", "world"]}
      />
    </StoryStack>
  ),
};

export const States: Story = {
  render: (args) => (
    <StoryStack>
      <Accordion {...args} defaultValue={[]} />
      <Accordion {...args} items={items.map(({ icon: _icon, ...item }) => item)} />
    </StoryStack>
  ),
};

/** Headers are 44px tall; panels grow with their content. */
export const Sizes: Story = {
  args: {
    items: [
      { id: "long", title: "A long section", content: "Lorem ipsum ".repeat(60) },
      ...items.slice(1, 2),
    ],
    defaultValue: ["long"],
  },
};

export const Disabled: Story = {
  args: { items: items.map((item) => ({ ...item, disabled: true })), defaultValue: [] },
};

export const Interactive: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "World options" }));
    await expect(canvas.getByRole("region", { name: "World options" })).toBeInTheDocument();
    await expect(args.onValueChange).toHaveBeenLastCalledWith(["world"]);
    await userEvent.keyboard("{ArrowDown}");
    await expect(canvas.getByRole("button", { name: "Controls" })).toHaveFocus();
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
