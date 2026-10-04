import "@fontsource/silkscreen/400.css";
import "@fontsource/silkscreen/700.css";
import "@malilion/block-ui-react/styles.css";
import "./preview.css";
import { BlockUIProvider, zhTWMessages, type BlockUIMessages } from "@malilion/block-ui-react";
import { themeNames, type BlockThemeName } from "@malilion/block-ui-themes";
import type { Preview } from "@storybook/react-vite";
import { blockTheme } from "./blockTheme";
import { sourceSnippet } from "./sourceSnippet";

/** Locales offered in the toolbar; `lang` keeps screen readers on the right voice. */
const LOCALES: Record<string, { lang: string; messages?: BlockUIMessages }> = {
  en: { lang: "en" },
  "zh-TW": { lang: "zh-Hant-TW", messages: zhTWMessages },
};

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
    locale: {
      description: "Built-in component text (BlockUIProvider messages)",
      toolbar: {
        title: "Language",
        icon: "globe",
        items: [
          { value: "en", title: "English" },
          { value: "zh-TW", title: "繁體中文" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "grassland",
    locale: "en",
  },
  decorators: [
    (Story, context) => {
      const locale = LOCALES[context.globals.locale as string] ?? LOCALES.en;
      return (
        <BlockUIProvider
          theme={context.globals.theme as BlockThemeName}
          messages={locale?.messages}
          lang={locale?.lang}
          className="sb-block-root"
        >
          <Story />
        </BlockUIProvider>
      );
    },
  ],
  parameters: {
    layout: "padded",
    docs: {
      theme: blockTheme,
      // Show the rendered JSX (not the story object) and make it paste-ready.
      source: { type: "dynamic", excludeDecorators: true, transform: sourceSnippet },
      // A "Code" tab in the addon panel, so the canvas view has copyable code too.
      codePanel: true,
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
          ["Colors", "Typography", "Spacing", "Shadows", "Themes", "Localization", "Icons"],
          "Components",
          [
            "Actions",
            "Forms",
            "Inventory",
            "Crafting",
            "Cards",
            "Display",
            "Feedback",
            "HUD",
            "Navigation",
            "Social",
            "Layout",
          ],
          "Patterns",
        ],
      },
    },
  },
};

export default preview;
