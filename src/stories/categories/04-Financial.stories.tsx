import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { CategoryPage } from "./CategoryPage";

const CODA = "https://coda.io/d/Development-Plans_dHCab2qMnp2/Reusable-Components_suHonxkL";
const GH = "https://github.com/sitetracker/strk/tree/preprod/src/main/default/lwc";

const Page = () => (
  <CategoryPage
    phase={3}
    category="Financial & Budget"
    icon="💰"
    description="Components for budget management, cost projections, financial summaries, and journal entries. Most are domain-specific to financial workflows."
    codaUrl={CODA}
    components={[
      { name: "stBudgetGrid", label: "ST Budget Grid", description: "Budget grid for displaying and editing budget lines with summary rows.", status: "planned", reusable: true, githubPath: `${GH}/stBudgetGrid` },
      { name: "stCostProjection", label: "ST Cost Projection", description: "Cost projection grid for project cost management.", status: "planned", reusable: true, githubPath: `${GH}/stCostProjection` },
      { name: "stFinancialSummaryGrid", label: "ST Financial Summary Grid", description: "Financial summary grid with ETC adjustments and summary rows.", status: "planned", reusable: true, githubPath: `${GH}/stFinancialSummaryGrid` },
      { name: "stFinancialSummaryGraph", label: "ST Financial Summary Graph", description: "Graph visualization for financial summary data.", status: "domain-specific", reusable: false, githubPath: `${GH}/stFinancialSummaryGraph` },
      { name: "stFinancialJournalEntryDataTable", label: "ST Financial Journal Entry Table", description: "Data table for financial journal entries.", status: "domain-specific", reusable: false, githubPath: `${GH}/stFinancialJournalEntryDataTable` },
      { name: "stProjectFinances", label: "ST Project Finances", description: "Project finances overview component.", status: "domain-specific", reusable: false, githubPath: `${GH}/stProjectFinances` },
    ]}
  />
);

const meta = { title: "Categories/Financial & Budget", component: Page, parameters: { layout: "fullscreen", options: { showPanel: false }, docs: { page: null }, hideToolbar: true } } satisfies Meta<typeof Page>;
export default meta;
export const Overview: StoryObj<typeof meta> = { render: () => <Page /> };
