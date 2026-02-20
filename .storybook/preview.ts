import type { Preview } from "@storybook/react";
import { sithetrackerTheme } from "./theme";
import "../src/styles/slds-global.css";

const preview: Preview = {
  parameters: {
    docs: {
      theme: sithetrackerTheme,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "padded",
    options: {
      storySort: {
        order: [
          "Introduction",
          "Categories",
          [
            "Data Display & Grid",
            [
              "Overview",
              "stLwcDataTable",
              "stEditableDatatable",
              "stTreeGrid",
              "stEditableTreeGrid",
              "stObjectEditableTreeGrid",
              "stManyToMany",
            ],
            "Schedule & Timeline",
            "UI · UX Building Blocks",
            [
              "Overview",
              "stIllustration",
              "stIllustrationImage",
              "stRadioGroup",
              "stPicklistPathLWC",
              "stFieldsetContainer",
              "stLwcCard",
              "stBetaBar",
              "stLastModifiers",
            ],
            "Financial & Budget",
            "Inventory & Asset",
            "Files",
            "Calendar & Scheduler",
            "Production Tracking",
            "Approval & Workflow",
            "Trackers",
            "Map & GIS",
            "Maintenance",
            "Modules",
          ],
        ],
      },
    },
  },
};

export default preview;
