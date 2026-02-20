import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { PicklistPath } from "./PicklistPath";
import { projectLifecycle, serviceWorkflow, opportunityStages } from "./mockData";

const meta = {
  title: "Categories/UI · UX Building Blocks/stPicklistPathLWC",
  component: PicklistPath,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          '<h3>stPicklistPathLWC</h3>' +
          '<p><strong>For Use In:</strong> Project record pages, Service Appointment pages, Opportunity views — any context where a picklist field drives a stage-based workflow and you want to visually communicate progress.</p>' +
          '<h4>Architecture</h4>' +
          '<p>Pattern <strong>Type A — Pure Wrapper</strong>. A React recreation of <code>lightning-path</code>, built on the SLDS <code>slds-path</code> blueprint. Steps are classified as:</p>' +
          '<ul>' +
          '<li><strong>slds-is-complete</strong> — all steps before the current value</li>' +
          '<li><strong>slds-is-current / slds-is-active</strong> — the step matching the current value</li>' +
          '<li><strong>slds-is-incomplete</strong> — all steps after the current value</li>' +
          '</ul>' +
          '<h4>Supported features</h4>' +
          '<ul>' +
          '<li>Any ordered list of picklist options as steps</li>' +
          '<li>Click-to-select when <code>isEditable</code> is true</li>' +
          '<li>Coaching guidance text section (optional)</li>' +
          '<li>Read-only mode</li>' +
          '<li>ARIA roles for accessibility (listbox + option)</li>' +
          '</ul>' +
          '<h4>Typical Usage</h4>' +
          '<p>Used in Project Detail, Site Detail, and Service Appointment page layouts to show the <code>Project_Status__c</code> or <code>Status</code> field as a visual path.</p>',
      },
    },
  },
  argTypes: {
    label: {
      description: "Accessible label for the path navigation region.",
      control: "text",
      table: { category: "Content" },
    },
    options: {
      description: "Ordered array of `{ label, value, description? }` path steps.",
      table: { category: "Data" },
    },
    value: {
      description: "Value of the currently active step.",
      control: "text",
      table: { category: "State" },
    },
    isEditable: {
      description: "When true, clicking a step fires `onSelect`. When false, the path is read-only.",
      control: "boolean",
      table: { category: "Behavior" },
    },
    showCoaching: {
      description: "Show coaching guidance text below the path (uses the `description` field of the active step).",
      control: "boolean",
      table: { category: "Behavior" },
    },
    onSelect: {
      description: "Callback fired with the new step value string when a step is clicked.",
      action: "onSelect",
      table: { category: "Events" },
    },
  },
} satisfies Meta<typeof PicklistPath>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ProjectLifecycle: Story = {
  name: "Project Lifecycle",
  args: {
    label: "Project Status",
    options: projectLifecycle,
    value: "active",
    isEditable: true,
    showCoaching: false,
  },
  parameters: {
    docs: {
      description: { story: "Standard 5-step project lifecycle path. The 'Active' step is highlighted; 'Initiated' and 'Planning' are marked complete." },
    },
  },
};

export const WithCoaching: Story = {
  name: "With Coaching Text",
  args: {
    label: "Project Status",
    options: projectLifecycle,
    value: "planning",
    isEditable: true,
    showCoaching: true,
  },
  parameters: {
    docs: {
      description: { story: "The coaching section is visible, showing guidance for the current 'Planning' step. The description comes from the active option's `description` field." },
    },
  },
};

export const ServiceWorkflow: Story = {
  name: "Service Appointment Workflow",
  args: {
    label: "Service Status",
    options: serviceWorkflow,
    value: "dispatched",
    isEditable: true,
    showCoaching: false,
  },
  parameters: {
    docs: {
      description: { story: "A 6-step service appointment workflow showing 'Dispatched' as the active state. Demonstrates how a wider set of stages renders." },
    },
  },
};

export const ClosedWon: Story = {
  name: "Closed State",
  args: {
    label: "Opportunity Stage",
    options: opportunityStages,
    value: "closed_won",
    isEditable: false,
  },
  parameters: {
    docs: {
      description: { story: "All steps are marked complete when the final step is active. Read-only mode — no step is clickable." },
    },
  },
};

export const ReadOnly: Story = {
  name: "Read-Only",
  args: {
    label: "Project Status",
    options: projectLifecycle,
    value: "active",
    isEditable: false,
  },
  parameters: {
    docs: {
      description: { story: "Non-interactive path. `isEditable: false` — clicking steps has no effect. Used in record view mode." },
    },
  },
};

export const InteractiveControlled: Story = {
  name: "Interactive (Controlled)",
  render: (args) => {
    const [stage, setStage] = useState("planning");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <PicklistPath
          {...args}
          value={stage}
          onSelect={setStage}
          showCoaching
        />
        <p style={{ fontSize: "0.85rem", color: "#706E6B", margin: 0 }}>
          Current stage: <strong>{stage}</strong>
        </p>
      </div>
    );
  },
  args: {
    label: "Project Status",
    options: projectLifecycle,
    isEditable: true,
    showCoaching: true,
  },
  parameters: {
    docs: {
      description: { story: "Fully interactive controlled example. Click any step to advance or revert the stage. Coaching text updates to match the selected step." },
    },
  },
};
