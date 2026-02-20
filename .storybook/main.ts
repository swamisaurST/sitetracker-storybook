import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  staticDirs: [
    {
      from: "../node_modules/@salesforce-ux/design-system/assets",
      to: "/assets",
    },
  ],
  viteFinal: async (config, { configType }) => {
    if (configType === "PRODUCTION") {
      config.base = "/sitetracker-storybook/";
    }
    return config;
  },
};

export default config;
