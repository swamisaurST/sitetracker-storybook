import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { CategoryPage } from "./CategoryPage";

const CODA = "https://coda.io/d/Development-Plans_dHCab2qMnp2/Reusable-Components_suHonxkL";
const GH = "https://github.com/sitetracker/strk/tree/preprod/src/main/default/lwc";

const Page = () => (
  <CategoryPage
    phase={4}
    category="Modules"
    icon="🧱"
    description="Standalone feature modules — forms, pollers, specialized grids, and panels. These tend to be domain-specific and tied to specific Sitetracker features like Time Tracking and Material Requests."
    codaUrl={CODA}
    components={[
      { name: "stTaskForm", label: "ST Task Form", description: "Form for creating a new Task record assigned to a Contact linked to an Account.", status: "domain-specific", reusable: false, githubPath: `${GH}/stTaskForm` },
      { name: "stEnhancedTimetracker", label: "ST Enhanced Timetracker", description: "Enhanced time tracking component.", status: "domain-specific", reusable: false, githubPath: `${GH}/stEnhancedTimetracker` },
      { name: "stMaterialRequestTable", label: "ST Material Request Table", description: "Displays requested material for a given job.", status: "domain-specific", reusable: false, githubPath: `${GH}/stMaterialRequestTable` },
      { name: "stTjEditableTreeGridContainer", label: "ST Ticket and Job Tree", description: "Ticket and job tree grid container.", status: "domain-specific", reusable: false, githubPath: `${GH}/stTjEditableTreeGridContainer` },
      { name: "stPunchDockedPanel", label: "ST Punch Docked Panel", description: "Docked panel for punch-in/out functionality.", status: "domain-specific", reusable: false, githubPath: `${GH}/stPunchDockedPanel` },
      { name: "stProjectTemplateMilestoneModal", label: "ST Template Milestone Modal", description: "Template designer milestone modal for project templates.", status: "domain-specific", reusable: false, githubPath: `${GH}/stProjectTemplateMilestoneModal` },
      { name: "stLiveRefreshPoller", label: "ST Live Refresh Poller", description: "Live refresh polling component for real-time data updates.", status: "domain-specific", reusable: false, githubPath: `${GH}/stLiveRefreshPoller` },
    ]}
  />
);

const meta = { title: "Categories/Modules", component: Page, parameters: { layout: "fullscreen", options: { showPanel: false }, docs: { page: null }, hideToolbar: true } } satisfies Meta<typeof Page>;
export default meta;
export const Overview: StoryObj<typeof meta> = { render: () => <Page /> };
