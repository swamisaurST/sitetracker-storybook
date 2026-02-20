import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { CategoryPage } from "./CategoryPage";

const CODA = "https://coda.io/d/Development-Plans_dHCab2qMnp2/Reusable-Components_suHonxkL";
const GH = "https://github.com/sitetracker/strk/tree/preprod/src/main/default/lwc";

const Page = () => (
  <CategoryPage
    phase={3}
    category="Inventory & Asset"
    icon="📦"
    description="Components for viewing, reserving, and managing field inventory and assets. The Inventory Wrapper is a key routing component that switches between 1GP and 2GP inventory implementations."
    codaUrl={CODA}
    components={[
      { name: "stInventoryWrapper", label: "ST Inventory Wrapper", description: "Routes to 2GP Inventory if available, otherwise falls back to 1GP component. Key abstraction layer.", status: "planned", reusable: true, githubPath: `${GH}/stInventoryWrapper` },
      { name: "stSiteInventory", label: "ST Site Inventory", description: "Displays inventory for a Site record.", status: "domain-specific", reusable: false, githubPath: `${GH}/stSiteInventory` },
      { name: "stReserveInventory", label: "ST Reserve Inventory", description: "Displays Job inventory and allows inventory reservation.", status: "domain-specific", reusable: false, githubPath: `${GH}/stReserveInventory` },
      { name: "stKitItemTree", label: "ST Kit Item Tree", description: "Kit item tree structure for inventory kit management.", status: "domain-specific", reusable: false, githubPath: `${GH}/stKitItemTree` },
      { name: "stSearchInventory", label: "ST Search Inventory", description: "Inventory search functionality component.", status: "planned", reusable: true, githubPath: `${GH}/stSearchInventory` },
    ]}
  />
);

const meta = { title: "Categories/Inventory & Asset", component: Page, parameters: { layout: "fullscreen", options: { showPanel: false }, docs: { page: null }, hideToolbar: true } } satisfies Meta<typeof Page>;
export default meta;
export const Overview: StoryObj<typeof meta> = { render: () => <Page /> };
