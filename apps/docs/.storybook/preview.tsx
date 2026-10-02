import "@fontsource/silkscreen/400.css";
import "@fontsource/silkscreen/700.css";
import "@block-ui/react/styles.css";
import "./preview.css";
import { BlockUIProvider } from "@block-ui/react";
import { themeNames, type BlockThemeName } from "@block-ui/themes";
import type { Preview } from "@storybook/react-vite";
import { blockTheme } from "./blockTheme";

const PAGE_RULES = ["bypass", "landmark-one-main", "page-has-heading-one", "region"];

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
    docs: {
      theme: blockTheme,
    },
    controls: {
      expanded: true,
      matchers: { color: /(background|color)$/i },
    },
    a11y: {
      test: "error",
      config: {
        // A component preview is not a page: page-level rules apply only to
        // Foundations and Patterns, which re-enable them.
        rules: PAGE_RULES.map((id) => ({ id, enabled: false })),
      },
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
