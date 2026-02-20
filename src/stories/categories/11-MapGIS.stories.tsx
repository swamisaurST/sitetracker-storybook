import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { CategoryPage } from "./CategoryPage";

const CODA = "https://coda.io/d/Development-Plans_dHCab2qMnp2/Reusable-Components_suHonxkL";
const GH = "https://github.com/sitetracker/strk/tree/preprod/src/main/default/lwc";

const Page = () => (
  <CategoryPage
    phase={4}
    category="Map & GIS"
    icon="🗺️"
    description="Geospatial components for map display, marker management, GIS layer sync, and coverage mapping. These components integrate with external mapping providers."
    codaUrl={CODA}
    components={[
      { name: "stMapContainer", label: "ST Map Container", description: "Primary map display container component.", status: "planned", reusable: true, githubPath: `${GH}/stMapContainer` },
      { name: "stMapMarker", label: "ST Map Marker", description: "Map marker component for placing pins on the map.", status: "planned", reusable: true, githubPath: `${GH}/stMapMarker` },
      { name: "stMapLayerClone", label: "ST Map Layer Clone", description: "Map layer cloning functionality for GIS operations.", status: "planned", reusable: true, githubPath: `${GH}/stMapLayerClone` },
      { name: "stMapObjectConfigurationSyncMapper", label: "ST Map Object Config Sync Mapper", description: "Maps object configurations for GIS sync operations.", status: "domain-specific", reusable: false, githubPath: `${GH}/stMapObjectConfigurationSyncMapper` },
      { name: "stSyncLayer", label: "ST Sync Layer", description: "GIS layer synchronization functionality.", status: "domain-specific", reusable: false, githubPath: `${GH}/stSyncLayer` },
      { name: "stSyncRecord", label: "ST Sync Record", description: "Individual record sync with GIS data.", status: "domain-specific", reusable: false, githubPath: `${GH}/stSyncRecord` },
      { name: "stCoverageMap", label: "ST Coverage Map", description: "Coverage map visualization component.", status: "domain-specific", reusable: false, githubPath: `${GH}/stCoverageMap` },
    ]}
  />
);

const meta = { title: "Categories/Map & GIS", component: Page, parameters: { layout: "fullscreen", options: { showPanel: false }, docs: { page: null }, hideToolbar: true } } satisfies Meta<typeof Page>;
export default meta;
export const Overview: StoryObj<typeof meta> = { render: () => <Page /> };
