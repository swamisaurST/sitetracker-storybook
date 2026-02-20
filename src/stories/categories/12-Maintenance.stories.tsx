import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { CategoryPage } from "./CategoryPage";

const CODA = "https://coda.io/d/Development-Plans_dHCab2qMnp2/Reusable-Components_suHonxkL";
const GH = "https://github.com/sitetracker/strk/tree/preprod/src/main/default/lwc";

const Page = () => (
  <CategoryPage
    phase={4}
    category="Maintenance"
    icon="🔧"
    description="Components for managing maintenance profiles, ad hoc maintenance cycles, and schedule groups. ST Maintenance Central is the primary hub."
    codaUrl={CODA}
    components={[
      { name: "stMaintenanceCentral", label: "ST Maintenance Central", description: "Central hub for managing Maintenance Profiles, Ad Hoc Maintenance Cycles, and Schedule Groups.", status: "planned", reusable: true, githubPath: `${GH}/stMaintenanceCentral` },
      { name: "stMaintenanceSchedule", label: "ST Maintenance Schedule", description: "Maintenance schedule management and editing.", status: "domain-specific", reusable: false, githubPath: `${GH}/stMaintenanceSchedule` },
    ]}
  />
);

const meta = { title: "Categories/Maintenance", component: Page, parameters: { layout: "fullscreen", options: { showPanel: false }, docs: { page: null }, hideToolbar: true } } satisfies Meta<typeof Page>;
export default meta;
export const Overview: StoryObj<typeof meta> = { render: () => <Page /> };
