import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { CategoryPage } from "./CategoryPage";

const CODA = "https://coda.io/d/Development-Plans_dHCab2qMnp2/Reusable-Components_suHonxkL";
const GH = "https://github.com/sitetracker/strk/tree/preprod/src/main/default/lwc";

const Page = () => (
  <CategoryPage
    phase={4}
    category="Trackers"
    icon="📌"
    description="Tracker management components supporting tab views, containers, modal windows, and folder sharing for the Sitetracker Tracker feature."
    codaUrl={CODA}
    components={[
      { name: "stTrackerTabView", label: "ST Tracker Tab View", description: "Tracker tab view with folder management capabilities.", status: "planned", reusable: true, githubPath: `${GH}/stTrackerTabView` },
      { name: "stTrackerContainer", label: "ST Tracker Container", description: "Container component for Tracker feature.", status: "planned", reusable: true, githubPath: `${GH}/stTrackerContainer` },
      { name: "stTrackerModalWindow", label: "ST Tracker Modal Window", description: "Modal window for Tracker interactions.", status: "planned", reusable: true, githubPath: `${GH}/stTrackerModalWindow` },
      { name: "stTrackerFolderShare", label: "ST Tracker Folder Share", description: "Folder sharing functionality within Trackers.", status: "planned", reusable: true, githubPath: `${GH}/stTrackerFolderShare` },
    ]}
  />
);

const meta = { title: "Categories/Trackers", component: Page, parameters: { layout: "fullscreen", options: { showPanel: false }, docs: { page: null }, hideToolbar: true } } satisfies Meta<typeof Page>;
export default meta;
export const Overview: StoryObj<typeof meta> = { render: () => <Page /> };
