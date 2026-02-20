import { addons } from "@storybook/manager-api";
import { sithetrackerTheme } from "./theme";

addons.setConfig({
  theme: sithetrackerTheme,
  sidebar: {
    showRoots: true,
  },
});
