import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { CategoryPage } from "./CategoryPage";

const CODA = "https://coda.io/d/Development-Plans_dHCab2qMnp2/Reusable-Components_suHonxkL";
const GH = "https://github.com/sitetracker/strk/tree/preprod/src/main/default/lwc";

const Page = () => (
  <CategoryPage
    phase={4}
    category="Approval & Workflow"
    icon="✅"
    description="Components powering the approval step lifecycle, approval consoles, and notification management. ST Approvals (the console) is the primary reusable candidate."
    codaUrl={CODA}
    components={[
      { name: "stApprovalConsole", label: "ST Approvals", description: "Approval console for managing approval workflows. Marked reusable in inventory.", status: "planned", reusable: true, githubPath: `${GH}/stApprovalConsole` },
      { name: "stApprovalStepsContainer", label: "ST Approval Steps Container", description: "Container for approval step flow components.", status: "domain-specific", reusable: false, githubPath: `${GH}/stApprovalStepsContainer` },
      { name: "stApprovalManager", label: "ST Approval Manager", description: "Core approval management logic component.", status: "domain-specific", reusable: false, githubPath: `${GH}/stApprovalManager` },
      { name: "stNotifManager", label: "ST Notification Manager", description: "Notification management component for workflow events.", status: "domain-specific", reusable: false, githubPath: `${GH}/stNotifManager` },
    ]}
  />
);

const meta = { title: "Categories/Approval & Workflow", component: Page, parameters: { layout: "fullscreen", options: { showPanel: false }, docs: { page: null }, hideToolbar: true } } satisfies Meta<typeof Page>;
export default meta;
export const Overview: StoryObj<typeof meta> = { render: () => <Page /> };
