import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { CategoryPage } from "./CategoryPage";

const CODA = "https://coda.io/d/Development-Plans_dHCab2qMnp2/Reusable-Components_suHonxkL#Table-6_tu4NBnpr";
const GH = "https://github.com/sitetracker/strk/tree/preprod/src/main/default/lwc";

const Page = () => (
  <CategoryPage
    phase={1}
    category="Data Display & Grid"
    icon="📊"
    description="The foundational data layer components. Covers every pattern for displaying records: from read-only paginated tables to fully editable tree grids with inline Save/Cancel. Phase 1 is complete — all 6 reusable components are documented. The 2 domain-specific Field Asset variants share the same engine but are excluded from the public library scope."
    codaUrl={CODA}
    components={[
      {
        name: "stLwcDataTable", label: "ST Data Table",
        description: "Sitetracker's primary data table. Wraps c-custom-data-table (extends lightning-datatable) with 11 column types. Adds: header bar, search, pagination, column filtering, CRUD buttons, summary row, illustration empty state.",
        status: "built", reusable: true, usages: 35,
        storyPath: "Categories/Data Display & Grid/stLwcDataTable",
        githubPath: `${GH}/stLwcDataTable`, pattern: "A — Container Wrapper",
      },
      {
        name: "stEditableDatatable", label: "ST Editable Datatable",
        description: "Highest-usage component (~38 consumers). Card wrapper with batch inline editing, column visibility manager, skeleton loading, live refresh poller, and Save/Cancel flow.",
        status: "built", reusable: true, usages: 38,
        storyPath: "Categories/Data Display & Grid/stEditableDatatable",
        githubPath: `${GH}/stEditableDatatable`, pattern: "B — Editable Card Wrapper",
      },
      {
        name: "stTreeGrid", label: "ST Tree Grid",
        description: "Wraps lightning-tree-grid in a card with expand/collapse controls, search, row actions (View/Edit/Delete), and optional column summary row. Three hierarchy modes.",
        status: "built", reusable: true, usages: 3,
        storyPath: "Categories/Data Display & Grid/stTreeGrid",
        githubPath: `${GH}/stTreeGrid`, pattern: "C — Standard Tree Grid",
      },
      {
        name: "stEditableTreeGrid", label: "ST Editable Tree Grid",
        description: "Fully custom tree engine using Light DOM (renderMode=light). NOT based on lightning-datatable. Powers Project Schedule, Gantt, Permits, Milestones. Most complex component in the library.",
        status: "built", reusable: true, usages: 22,
        storyPath: "Categories/Data Display & Grid/stEditableTreeGrid",
        githubPath: `${GH}/stEditableTreeGrid`, pattern: "D — Custom Light DOM Engine",
      },
      {
        name: "stObjectEditableTreeGrid", label: "ST Object Editable Tree Grid",
        description: "Thin Apex wrapper: resolves fieldset columns + recursive parent-field hierarchy (up to 5 levels), then delegates to stEditableTreeGrid. 0 LWC consumers detected — possibly flexipage-only.",
        status: "built", reusable: true, usages: 0,
        storyPath: "Categories/Data Display & Grid/stObjectEditableTreeGrid",
        githubPath: `${GH}/stObjectEditableTreeGrid`, pattern: "E — Apex-Resolved Wrapper",
      },
      {
        name: "stManyToMany", label: "ST Many-to-Many",
        description: "Junction object manager. Top table shows linked records. 'Add' button opens a selection modal. Handles duplicate prevention, loading states, and row deletion.",
        status: "built", reusable: true, usages: 2,
        storyPath: "Categories/Data Display & Grid/stManyToMany",
        githubPath: `${GH}/stManyToMany`, pattern: "G — Junction Manager",
      },
      {
        name: "stFieldAssetTreeGrid", label: "ST Field Asset Tree Grid",
        description: "Domain-specific wrapper for field asset install/uninstall/swap/consume/dispose workflows. Heavy business logic. Excluded from public library scope.",
        status: "domain-specific", reusable: false, usages: 1,
        githubPath: `${GH}/stFieldAssetTreeGrid`, pattern: "F — Domain Specific",
      },
      {
        name: "stFieldAssetEditableTreeGrid", label: "ST Field Asset Editable Tree Grid",
        description: "Domain-specific editable variant of Field Asset tree grid. Uses stEditableTreeGrid engine (Pattern D) with Field Asset-specific Apex and Lightning Message Service.",
        status: "domain-specific", reusable: false, usages: 1,
        githubPath: `${GH}/stFieldAssetEditableTreeGrid`, pattern: "F — Domain Specific",
      },
    ]}
  />
);

const meta = {
  title: "Categories/Data Display & Grid",
  component: Page,
  parameters: {
    layout: "fullscreen",
    options: { showPanel: false },
    docs: { page: null },
    hideToolbar: true,
  },
} satisfies Meta<typeof Page>;

export default meta;
export const Overview: StoryObj<typeof meta> = { render: () => <Page /> };
