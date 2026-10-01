import "@fontsource/silkscreen/400.css";
import "@fontsource/silkscreen/700.css";
import "@block-ui/react/styles.css";
import "./preview.css";
import { BlockUIProvider } from "@block-ui/react";
import { themeNames, type BlockThemeName } from "@block-ui/themes";
import type { Preview } from "@storybook/react-vite";

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Block UI theme",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: [...themeNames],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "grassland",
  },
  decorators: [
    (Story, context) => (
      <BlockUIProvider theme={context.globals.theme as BlockThemeName} className="sb-block-root">
        <Story />
      </BlockUIProvider>
    ),
  ],
  parameters: {
    layout: "padded",
    controls: {
      expanded: true,
      matchers: { color: /(background|color)$/i },
    },
    a11y: {
      test: "error",
    },
    backgrounds: { disable: true },
    options: {
      storySort: {
        order: [
          "Introduction",
          "Foundations",
          ["Colors", "Typography", "Spacing", "Shadows", "Themes", "Icons"],
          "Components",
          [
            "Actions",
            "Forms",
            "Inventory",
            "Crafting",
            "Cards",
            "Feedback",
            "HUD",
            "Navigation",
            "Layout",
          ],
          "Patterns",
        ],
      },
    },
  },
};

export default preview;
