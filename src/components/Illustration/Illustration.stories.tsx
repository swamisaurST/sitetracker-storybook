import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Illustration } from "./Illustration";

const meta = {
  title: "Categories/UI · UX Building Blocks/stIllustration",
  component: Illustration,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          '<h3>stIllustration</h3>' +
          '<p><strong>For Use In:</strong> Empty states, error states, no-access screens, onboarding prompts, and any context where a data set or action list is empty. Already used internally as <code>c-st-illustration</code> inside all 6 Phase 1 components.</p>' +
          '<h4>Architecture</h4>' +
          '<p>Pattern <strong>Type A — Pure Wrapper</strong>. Wraps the SLDS <code>slds-illustration</code> blueprint. The LWC implementation has two sub-components:</p>' +
          '<ul>' +
          '<li><strong>stIllustration</strong> — The container. Renders the SLDS <code>slds-illustration</code> div, size modifier class, and the text body block.</li>' +
          '<li><strong>stIllustrationImage</strong> — The SVG image portion, loaded from SLDS static resources in LWC context.</li>' +
          '</ul>' +
          '<h4>Supported features</h4>' +
          '<ul>' +
          '<li><strong>3 types use real SLDS SVGs</strong> from the npm package: assistant, events, tasks</li>' +
          '<li><strong>4 types use custom fallback artwork</strong> (<code>no-access</code>, <code>no-connection</code>, <code>no-data</code>, <code>error</code>) — these are valid SLDS illustration type names but their actual Salesforce SVG files are not in the npm package. The artwork shown is a placeholder approximation.</li>' +
          '<li>3 size variants: small, medium (default), large</li>' +
          '<li>Configurable heading and body text</li>' +
          '<li>ARIA-hidden illustration images (text conveys meaning)</li>' +
          '</ul>' +
          '<p>&#128279; <a href="https://www.lightningdesignsystem.com/components/illustration/" target="_blank" rel="noopener noreferrer">Full SLDS Illustration reference &rarr;</a></p>' +
          '<h4>Usage in Phase 1</h4>' +
          '<p>This component is the empty-state fallback across all 6 Data Display components. When a data table has no records, <code>c-st-illustration</code> is rendered with contextual heading and body text.</p>' +
          '<h4>Real LWC API (sitetracker/strk@preprod)</h4>' +
          '<p>The actual <code>stIllustration</code> LWC (based on <a href="https://github.com/kacrouse/lwc-illustration" target="_blank">lwc-illustration</a> by Kyle Crouse, MIT licence) has these props:</p>' +
          '<ul>' +
          '<li><code>imageName</code> — format: "category:identifier" (e.g. "no_data:desert", "error:no_access"). Our React prop is <code>type</code>.</li>' +
          '<li><code>messageBody</code> — body text. Our React prop is <code>body</code>.</li>' +
          '<li><code>heading</code> — same ✅</li>' +
          '<li><code>imageSize</code> — "small" | "large" only (default "small"). Our React version adds "medium".</li>' +
          '<li><code>textOnly</code> (boolean) — hide the image, show only text (not in our component)</li>' +
          '<li><code>headingClass</code> — SLDS text class override</li>' +
          '<li>Slot: <code>messageBody</code> — rich text override for body. Slot: <code>actionButton</code></li>' +
          '</ul>',
      },
    },
  },
  argTypes: {
    type: {
      description: "Illustration variant. Selects the SVG image and semantic context.",
      control: "select",
      options: [
        "empty-state-assistant",
        "empty-state-events",
        "empty-state-tasks",
        "error:no_access",
        "error:no_connection",
        "error:page_not_available",
        "no_data:desert",
        "no_data:open_road",
        "info:going_camping",
        "misc:no_content",
        "misc:gone_fishing",
      ],
      table: { category: "Content" },
    },
    heading: {
      description: "Bold heading text displayed below the image.",
      control: "text",
      table: { category: "Content" },
    },
    body: {
      description: "Descriptive body text beneath the heading.",
      control: "text",
      table: { category: "Content" },
    },
    size: {
      description: "Size modifier — controls the max-width and scale of the entire component.",
      control: "radio",
      options: ["small", "medium", "large"],
      table: { category: "Appearance" },
    },
  },
} satisfies Meta<typeof Illustration>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Empty State — Assistant",
  args: {
    type: "empty-state-assistant",
    heading: "No Components Yet",
    body: "Start by selecting a component from the left panel or create a new one.",
    size: "medium",
  },
  parameters: {
    docs: {
      description: { story: "Default empty state using the SLDS assistant illustration. Used when a list or dashboard has no items yet." },
    },
  },
};

export const EmptyEvents: Story = {
  name: "Empty State — Events",
  args: {
    type: "empty-state-events",
    heading: "No Events Scheduled",
    body: "There are no events in the selected timeframe. Adjust filters or add a new event.",
    size: "medium",
  },
  parameters: {
    docs: {
      description: { story: "Calendar or timeline view with no events. The SLDS events illustration is bundled in the design-system npm package." },
    },
  },
};

export const EmptyTasks: Story = {
  name: "Empty State — Tasks",
  args: {
    type: "empty-state-tasks",
    heading: "All Tasks Complete",
    body: "Great work! There are no pending tasks assigned to this project.",
    size: "medium",
  },
  parameters: {
    docs: {
      description: { story: "All-done state for a task list. Communicates success rather than absence." },
    },
  },
};

export const NoAccess: Story = {
  name: "error:no_access (custom fallback)",
  args: {
    type: "error:no_access",
    heading: "Access Restricted",
    body: "You don't have permission to view this content. Contact your Salesforce administrator.",
    size: "medium",
  },
  parameters: {
    docs: {
      description: { story: "Real image name: <code>error:no_access</code>. Custom fallback artwork — the SVG lives in Salesforce Static Resources in the org. <a href=\"https://www.lightningdesignsystem.com/components/illustration/\" target=\"_blank\">See the SLDS reference &rarr;</a>" },
    },
  },
};

export const Desert: Story = {
  name: "no_data:desert (custom fallback)",
  args: {
    type: "no_data:desert",
    heading: "No Records Found",
    body: "There are no records to display. Try a different filter or create a new record.",
    size: "medium",
  },
  parameters: {
    docs: {
      description: { story: "Real image name: <code>no_data:desert</code>. Custom fallback artwork." },
    },
  },
};

export const SizeVariants: Story = {
  name: "Size Variants",
  render: () => (
    <div style={{ display: "flex", gap: "3rem", alignItems: "flex-start", flexWrap: "wrap", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: "0.7rem", color: "#706E6B", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Small</p>
        <Illustration type="empty-state-tasks" heading="No Tasks" body="Nothing pending." size="small" />
      </div>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: "0.7rem", color: "#706E6B", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Medium (default)</p>
        <Illustration type="empty-state-tasks" heading="No Tasks" body="Nothing pending right now." size="medium" />
      </div>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: "0.7rem", color: "#706E6B", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Large</p>
        <Illustration type="empty-state-tasks" heading="No Tasks" body="Nothing is pending right now. Check back later." size="large" />
      </div>
    </div>
  ),
  parameters: {
    layout: "centered",
    docs: {
      description: { story: "The three size variants side by side. `small` is used inside compact widgets; `large` for full-page empty states." },
    },
  },
};

export const NoDataGrid: Story = {
  name: "No Records (Grid Context)",
  render: () => (
    <div
      className="slds-card"
      style={{ padding: "3rem 2rem", display: "flex", justifyContent: "center", background: "#fff", minWidth: "480px" }}
    >
      <Illustration
        type="misc:no_content"
        heading="No Records Found"
        body="No records match your current filters. Try adjusting the search criteria or clearing active filters."
        size="medium"
      />
    </div>
  ),
  parameters: {
    layout: "centered",
    docs: {
      description: { story: "Illustration rendered inside a card — the typical usage pattern when a data grid returns zero rows." },
    },
  },
};
