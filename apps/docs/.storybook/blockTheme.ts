import { colors, fontFamily } from "@block-ui/tokens";
import { grassland } from "@block-ui/themes";
import { create } from "storybook/theming/create";

/** Dark Storybook chrome + docs theme that matches Block UI's grassland theme. */
export const blockTheme = create({
  base: "dark",
  brandTitle: "Block UI",
  brandUrl: "https://github.com/malilion/BlockUI",
  brandImage: "./logo.svg",
  brandTarget: "_blank",

  colorPrimary: grassland.primary,
  colorSecondary: grassland.primaryDark,

  appBg: grassland.surfaceAlt,
  appContentBg: grassland.background,
  appPreviewBg: grassland.background,
  appBorderColor: colors.outline,
  appBorderRadius: 0,

  fontBase: fontFamily.body,
  fontCode: fontFamily.mono,

  textColor: grassland.text,
  textInverseColor: colors.outline,
  textMutedColor: grassland.textMuted,

  barTextColor: grassland.textMuted,
  barSelectedColor: grassland.primaryLight,
  barHoverColor: grassland.primaryLight,
  barBg: grassland.surfaceHeader,

  buttonBg: grassland.surface,
  buttonBorder: colors.outline,
  booleanBg: grassland.slot,
  booleanSelectedBg: grassland.primaryDark,

  inputBg: grassland.slot,
  inputBorder: colors.outline,
  inputTextColor: grassland.text,
  inputBorderRadius: 0,
});
