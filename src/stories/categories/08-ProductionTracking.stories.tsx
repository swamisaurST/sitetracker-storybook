import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { CategoryPage } from "./CategoryPage";

const CODA = "https://coda.io/d/Development-Plans_dHCab2qMnp2/Reusable-Components_suHonxkL";
const GH = "https://github.com/sitetracker/strk/tree/preprod/src/main/default/lwc";

const Page = () => (
  <CategoryPage
    phase={4}
    category="Production Tracking"
    icon="🏭"
    description="Components for tracking production progress against plan — including grid views, chart visualizations, and planned vs. actual comparisons."
    codaUrl={CODA}
    components={[
      { name: "stProductionTracking", label: "ST Production Tracking", description: "Production tracking grid with plan lines, allocations, and work logs management.", status: "planned", reusable: true, githubPath: `${GH}/stProductionTracking` },
      { name: "stProductionTrackingGraph", label: "ST Production Tracking Graph", description: "Graph visualization of production tracking data.", status: "domain-specific", reusable: false, githubPath: `${GH}/stProductionTrackingGraph` },
      { name: "stPTPlannedvsActualGraph", label: "ST Planned vs Actual Graph", description: "Planned vs Actual comparison graph for production tracking.", status: "domain-specific", reusable: false, githubPath: `${GH}/stPTPlannedvsActualGraph` },
    ]}
  />
);

const meta = { title: "Categories/Production Tracking", component: Page, parameters: { layout: "fullscreen", options: { showPanel: false }, docs: { page: null }, hideToolbar: true } } satisfies Meta<typeof Page>;
export default meta;
export const Overview: StoryObj<typeof meta> = { render: () => <Page /> };
