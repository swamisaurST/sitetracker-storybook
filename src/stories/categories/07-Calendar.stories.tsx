import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { CategoryPage } from "./CategoryPage";

const CODA = "https://coda.io/d/Development-Plans_dHCab2qMnp2/Reusable-Components_suHonxkL";
const GH = "https://github.com/sitetracker/strk/tree/preprod/src/main/default/lwc";

const Page = () => (
  <CategoryPage
    phase={3}
    category="Calendar & Scheduler"
    icon="🗓️"
    description="LWC-based calendar and scheduling components. The ST Calendar (LWC) is the main reusable entry point — it replaced the Aura-based calendar and is placed on record pages via flexipages."
    codaUrl={CODA}
    components={[
      { name: "stLwcCalendar", label: "ST Calendar (LWC)", description: "The LWC version of the Sitetracker Calendar. Reusable — can be placed on any record page.", status: "planned", reusable: true, githubPath: `${GH}/stLwcCalendar` },
      { name: "stCalendarNavigator", label: "ST Calendar Navigator", description: "Navigation controls for the calendar component.", status: "domain-specific", reusable: false, githubPath: `${GH}/stCalendarNavigator` },
      { name: "stCalendarRecordWrapper", label: "ST Calendar Record Wrapper", description: "Wraps calendar events with record-specific data.", status: "domain-specific", reusable: false, githubPath: `${GH}/stCalendarRecordWrapper` },
    ]}
  />
);

const meta = { title: "Categories/Calendar & Scheduler", component: Page, parameters: { layout: "fullscreen", options: { showPanel: false }, docs: { page: null }, hideToolbar: true } } satisfies Meta<typeof Page>;
export default meta;
export const Overview: StoryObj<typeof meta> = { render: () => <Page /> };
