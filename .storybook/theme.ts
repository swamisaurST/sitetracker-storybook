import { create } from "@storybook/theming/create";

export const sithetrackerTheme = create({
  base: "dark",

  // Brand
  brandTitle: "Sitetracker Component Library",
  brandUrl: "https://sitetracker.com",
  brandTarget: "_blank",

  // Primary accent
  colorPrimary: "#22A0F5",
  colorSecondary: "#22A0F5",

  // UI chrome – deep navy shells
  appBg: "#0A1628",
  appContentBg: "#0D1E35",
  appBorderColor: "#1E3A6E",
  appBorderRadius: 6,

  // Sidebar text
  textColor: "#C8D8EC",
  textInverseColor: "#0A1628",
  textMutedColor: "#4A6380",

  // Toolbar
  barTextColor: "#8BA3C7",
  barHoverColor: "#22A0F5",
  barSelectedColor: "#22A0F5",
  barBg: "#071020",

  // Form elements
  inputBg: "#112040",
  inputBorder: "#1E3A6E",
  inputTextColor: "#C8D8EC",
  inputBorderRadius: 4,

  // Fonts
  fontBase: '"Salesforce Sans", "Inter", -apple-system, sans-serif',
  fontCode: '"SFMono-Regular", "Consolas", monospace',
});
