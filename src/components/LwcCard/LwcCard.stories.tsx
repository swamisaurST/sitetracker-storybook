import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { LwcCard } from "./LwcCard";
import { EDIT_ACTION, NEW_ACTION, SETTINGS_ACTION, SAMPLE_TABLE_ROWS } from "./mockData";

const meta = {
  title: "Categories/UI · UX Building Blocks/stLwcCard",
  component: LwcCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          '<h3>stLwcCard</h3>' +
          '<p><strong>For Use In:</strong> Any section of a Salesforce record page that needs a titled, bordered container — related lists, fieldset panels, data tables, and dashboard widgets. Used internally by <code>stEditableDatatable</code> (wraps the table + toolbar in a card shell) and available as a standalone primitive.</p>' +
          '<h4>Architecture</h4>' +
          '<p>Pattern <strong>Type B — Thin Composition</strong>. The card is a layout shell — it provides the SLDS <code>slds-card</code> structure (header + body + optional footer) and exposes slots for content. The LWC slot names are not confirmed without org access — React uses children + props.</p>' +
          '<h4>Supported features</h4>' +
          '<ul>' +
          '<li>5 verified icon variants using the real SLDS sprite (standard-account, contact, opportunity, task, work-order) + custom</li>' +
          '<li>Multiple header action buttons (brand, neutral, icon variants)</li>' +
          '<li>Optional footer slot</li>' +
          '<li>Inner padding toggle (<code>slds-card__body_inner</code>)</li>' +
          '<li>Border toggle for embedded/borderless contexts</li>' +
          '</ul>' +
          '<h4>Real LWC API (sitetracker/strk@preprod)</h4>' +
          '<p>The actual <code>stLwcCard</code> uses <code>lightning-icon</code> (not a sprite directly). Key real props:</p>' +
          '<ul>' +
          '<li><code>iconName</code> — SLDS icon name string (e.g. "standard:account"), not a variant enum</li>' +
          '<li><code>iconUrl</code>, <code>iconStyle</code>, <code>iconSize</code> (default "medium") — icon customisation</li>' +
          '<li><code>header</code> — card title (we call it <code>title</code> in our React prop)</li>' +
          '<li><code>subHeader</code> — subtitle below the header</li>' +
          '<li><code>status</code> — array of status badge objects [{status, theme, customLabel}]</li>' +
          '<li><code>showBorder</code>, <code>removePadding</code>, <code>showAsBlock</code>, <code>showDarkendHeader</code>, <code>hideCard</code></li>' +
          '<li><code>actionSlotStyle</code>, <code>headerStyle</code>, <code>cardBodyClasses</code></li>' +
          '<li>Confirmed slots: <code>customheader</code>, <code>actions</code>, plus default body slot</li>' +
          '</ul>' +
          '<p>Our Storybook uses simplified React props for demo purposes. The real component renders icons via <code>lightning-icon icon-name={iconName}</code> — we use the SLDS sprite directly instead.</p>',
      },
    },
  },
  argTypes: {
    title: {
      description: "Card title text shown in the header.",
      control: "text",
      table: { category: "Content" },
    },
    iconVariant: {
      description: "Icon variant for the header icon container.",
      control: "select",
      options: ["standard-account", "standard-contact", "standard-opportunity", "standard-task", "standard-work-order", "custom"],
      table: { category: "Appearance" },
    },
    bordered: {
      description: "Render the SLDS card border and shadow.",
      control: "boolean",
      table: { category: "Appearance" },
    },
    innerPadding: {
      description: "Apply slds-card__body_inner padding to the body.",
      control: "boolean",
      table: { category: "Appearance" },
    },
  },
} satisfies Meta<typeof LwcCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Basic Card",
  args: {
    title: "Work Orders",
    iconVariant: "standard-work-order",
    bordered: true,
    innerPadding: true,
  },
  render: (args) => (
    <div style={{ width: "480px" }}>
      <LwcCard {...args}>
        <p style={{ color: "#3E3E3C", fontSize: "0.875rem", margin: 0 }}>
          Card body content goes here. Pass any component as children — a data table, a fieldset, a list, etc.
        </p>
      </LwcCard>
    </div>
  ),
  parameters: {
    docs: { description: { story: "A basic card with an icon and body text. The simplest usage — no actions, no footer." } },
  },
};

export const WithActions: Story = {
  name: "Card with Header Actions",
  render: () => (
    <div style={{ width: "520px" }}>
      <LwcCard
        title="Tasks"
        iconVariant="standard-task"
        actions={[EDIT_ACTION, NEW_ACTION]}
      >
        <p style={{ color: "#3E3E3C", fontSize: "0.875rem", margin: 0 }}>
          Header actions render as buttons in the right slot. Pass <code>variant: "brand"</code> for the primary CTA.
        </p>
      </LwcCard>
    </div>
  ),
  parameters: {
    docs: { description: { story: "Card with two header actions — neutral Edit and brand New. Matches the stEditableDatatable toolbar pattern." } },
  },
};

export const WithTable: Story = {
  name: "Card Wrapping a Data Table",
  render: () => (
    <div style={{ width: "580px" }}>
      <LwcCard
        title="Work Items"
        iconVariant="standard-work-order"
        actions={[NEW_ACTION, SETTINGS_ACTION]}
        innerPadding={false}
      >
        <table className="slds-table slds-table_cell-buffer slds-table_bordered slds-table_fixed-layout" style={{ width: "100%" }}>
          <thead>
            <tr className="slds-line-height_reset">
              <th scope="col" style={{ width: "40%" }}><div className="slds-truncate" title="Name">Name</div></th>
              <th scope="col" style={{ width: "25%" }}><div className="slds-truncate" title="Status">Status</div></th>
              <th scope="col" style={{ width: "20%" }}><div className="slds-truncate" title="Owner">Owner</div></th>
              <th scope="col" style={{ width: "15%" }}><div className="slds-truncate" title="Due">Due</div></th>
            </tr>
          </thead>
          <tbody>
            {SAMPLE_TABLE_ROWS.map((row, i) => (
              <tr key={i} className="slds-hint-parent">
                <td><div className="slds-truncate">{row.name}</div></td>
                <td>
                  <span
                    className="slds-badge"
                    style={{
                      background: row.status === "Complete" ? "#D4EDDA" : row.status === "In Progress" ? "#CCE5FF" : "#F8F9FA",
                      color: row.status === "Complete" ? "#155724" : row.status === "In Progress" ? "#004085" : "#495057",
                    }}
                  >
                    {row.status}
                  </span>
                </td>
                <td><div className="slds-truncate">{row.owner}</div></td>
                <td><div className="slds-truncate">{row.due}</div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </LwcCard>
    </div>
  ),
  parameters: {
    docs: { description: { story: "The canonical usage pattern: an SLDS table nested inside a card shell with <code>innerPadding={false}</code> so the table fills edge-to-edge. This is how stEditableDatatable uses the card." } },
  },
};

export const WithFooter: Story = {
  name: "Card with Footer",
  render: () => (
    <div style={{ width: "480px" }}>
      <LwcCard
        title="Related Contacts"
        iconVariant="standard-contact"
        actions={[NEW_ACTION]}
        footer={
          <a href="#" style={{ color: "#0176D3", fontSize: "0.8125rem", textDecoration: "none" }}>
            View All (12) →
          </a>
        }
      >
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {["Alex Chen · Site Manager", "Sarah Kim · Project Lead", "Mike Davis · Field Tech"].map((name) => (
            <li key={name} style={{ padding: "0.5rem 0", borderBottom: "1px solid #F3F3F3", fontSize: "0.875rem", color: "#3E3E3C" }}>
              {name}
            </li>
          ))}
        </ul>
      </LwcCard>
    </div>
  ),
  parameters: {
    docs: { description: { story: "Card with a \"View All\" footer link — the standard Salesforce related list pattern." } },
  },
};

export const Borderless: Story = {
  name: "Borderless (Embedded)",
  render: () => (
    <div style={{ width: "480px", background: "#F3F3F3", padding: "1rem", borderRadius: "8px" }}>
      <LwcCard
        title="Embedded Panel"
        iconVariant="standard-opportunity"
        bordered={false}
        innerPadding={true}
      >
        <p style={{ color: "#3E3E3C", fontSize: "0.875rem", margin: 0 }}>
          With <code>bordered=false</code>, the card drops its shadow and border — suitable for embedding inside another surface like a modal or tab panel.
        </p>
      </LwcCard>
    </div>
  ),
  parameters: {
    docs: { description: { story: "Borderless variant for embedding inside already-surfaced containers. The box-shadow and border are removed." } },
  },
};

export const IconVariants: Story = {
  name: "All Icon Variants",
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", width: "640px" }}>
      {(["standard-account", "standard-contact", "standard-opportunity", "standard-task", "standard-work-order"] as const).map((v) => (
        <LwcCard key={v} title={v.replace("standard-", "")} iconVariant={v}>
          <p style={{ color: "#706E6B", fontSize: "0.8rem", margin: 0 }}>{v}</p>
        </LwcCard>
      ))}
    </div>
  ),
  parameters: {
    layout: "centered",
    docs: { description: { story: "All 5 verified standard icon variants. Icons use the real SLDS sprite (<code>standard-sprite/svg/symbols.svg</code>) and colors come directly from the SLDS CSS <code>.slds-icon-standard-{name}</code> rules." } },
  },
};
