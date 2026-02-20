import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { CategoryPage } from "./CategoryPage";

const CODA = "https://coda.io/d/Development-Plans_dHCab2qMnp2/Reusable-Components_suHonxkL";
const GH = "https://github.com/sitetracker/strk/tree/preprod/src/main/default/lwc";

const Page = () => (
  <CategoryPage
    phase={2}
    category="Schedule & Timeline"
    icon="📅"
    description="Components for displaying and managing project schedules, gantt charts, and activity timelines. The reusable Gantt Chart is the primary candidate for Phase 2 documentation."
    codaUrl={CODA}
    components={[
      { name: "sitetrackerGanttChart", label: "Sitetracker Gantt Chart", description: "Generic Gantt chart using provided object records. Reusable across projects. Primary Phase 2 candidate.", status: "planned", reusable: true, githubPath: `${GH}/sitetrackerGanttChart` },
      { name: "stPowerfulProjectSchedule", label: "ST Project Schedule V2", description: "Next-generation project schedule display. Powers the advanced scheduling views.", status: "planned", reusable: false, githubPath: `${GH}/stPowerfulProjectSchedule` },
      { name: "stProjectGanttChart", label: "ST Project Gantt Chart", description: "Domain-specific Gantt chart for Project records.", status: "domain-specific", reusable: false, githubPath: `${GH}/stProjectGanttChart` },
      { name: "stProjectTimeline", label: "ST Project Timeline", description: "Iframe-based timeline component for Project records.", status: "domain-specific", reusable: false, githubPath: `${GH}/stProjectTimeline` },
      { name: "stActivityTimeline", label: "ST Activity Timeline", description: "Activity timeline display for any record page.", status: "planned", reusable: false, githubPath: `${GH}/stActivityTimeline` },
      { name: "stSchedule", label: "ST Schedule", description: "Project schedule display component.", status: "domain-specific", reusable: false, githubPath: `${GH}/stSchedule` },
      { name: "stScheduleManager", label: "ST Schedule Manager", description: "Schedule management and editing functionality.", status: "domain-specific", reusable: false, githubPath: `${GH}/stScheduleManager` },
    ]}
  />
);

const meta = { title: "Categories/Schedule & Timeline", component: Page, parameters: { layout: "fullscreen", options: { showPanel: false }, docs: { page: null }, hideToolbar: true } } satisfies Meta<typeof Page>;
export default meta;
export const Overview: StoryObj<typeof meta> = { render: () => <Page /> };
