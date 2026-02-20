import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { EditableTreeGrid } from "./EditableTreeGrid";
import { scheduleColumns, scheduleData } from "./mockData";

const meta = {
  title: "Categories/Data Display & Grid/stEditableTreeGrid",
  component: EditableTreeGrid,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "<h3>stEditableTreeGrid — ST Editable Tree Grid</h3>",
          "<p>Sitetracker's most powerful and complex data component. A fully custom hierarchical table engine built with <strong>Light DOM</strong> (<code>renderMode: light</code>), allowing deep CSS penetration and external event attachment that Shadow DOM prevents. It is <strong>not</strong> based on <code>lightning-datatable</code> or <code>lightning-tree-grid</code>.</p>",
          "<p><strong>For Use In:</strong> Complex editable hierarchies &mdash; Project Schedules, Gantt rows, Permits, Milestones &nbsp;·&nbsp; <strong>~22 LWC consumers</strong></p>",
          "<p><strong>Architecture:</strong> Light DOM container &rarr; custom header rows + custom editable cell rows + <code>c-st-paginator</code> &nbsp;·&nbsp; <strong>Pattern D</strong> (most complex)</p>",
          "<p><strong>Why Light DOM?</strong> The custom engine needs to: (1) allow 3rd-party drag-and-drop on rows, (2) expose cell <code>input</code> elements to parent CSS for validation theming, and (3) dispatch DOM events that cross component boundaries without <code>composed: true</code> overhead.</p>",
          "<p><strong>Supported features:</strong></p>",
          "<ul>",
          "<li>Full inline editing for all column types including picklists</li>",
          "<li>Batch Save / Cancel &mdash; accumulates all changes, commits on Save</li>",
          "<li>Arbitrary nesting depth with expand / collapse per node</li>",
          "<li>Expand All on load option</li>",
          "<li>Header search filtering across all visible columns</li>",
          "<li>Column sorting (ASC / DESC)</li>",
          "<li>Optional pagination</li>",
          "<li>Optional column filtering</li>",
          "<li>Contextual alert banner (info / warning / error) with custom message</li>",
          "<li>Read-only mode</li>",
          "<li>Loading skeleton state</li>",
          "<li>Custom header action slot</li>",
          "</ul>",
        ].join(""),
      },
    },
  },
  argTypes: {
    columns:        { description: "Column definitions. Set `editable: true` to allow inline editing on a column.", table: { category: "Data" } },
    data:           { description: "Hierarchical row data. Child rows are nested in `_children` arrays.", table: { category: "Data" } },
    keyField:       { description: "Unique row identifier. Defaults to `Id`.", table: { category: "Data" } },
    title:          { description: "Header title.", table: { category: "Header" } },
    iconName:       { description: "SLDS icon name beside the title.", table: { category: "Header" } },
    isReadOnly:     { description: "Disables all inline editing. Hides Save/Cancel.", table: { category: "Features" } },
    enableSearch:   { description: "Shows a search box in the header.", table: { category: "Features" } },
    expandOnLoad:   { description: "Expands all tree nodes on initial render.", table: { category: "Features" } },
    enablePagination: { description: "Enables page-based pagination.", table: { category: "Features" } },
    paginateSize:   { description: "Rows per page when pagination is enabled.", table: { category: "Features" } },
    enableColumnFiltering: { description: "Enables per-column filter dropdowns.", table: { category: "Features" } },
    loading:        { description: "Shows skeleton loading rows.", table: { category: "States" } },
    alertMessage:   { description: "Displays an alert banner with this message.", table: { category: "States" } },
    alertVariant:   { description: "Alert banner variant: `info`, `warning`, or `error`.", table: { category: "States" } },
    headerActions:  { description: "Custom action buttons rendered in the header (React nodes).", table: { category: "Slots" } },
  },
  args: {
    onSave: fn(),
    onCancel: fn(),
    onCellChange: fn(),
    onSort: fn(),
    onRowAction: fn(),
    onExpandCollapse: fn(),
  },
} satisfies Meta<typeof EditableTreeGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Project Schedule",
    iconName: "standard:event",
    columns: scheduleColumns,
    data: scheduleData,
    enableSearch: true,
  },
  parameters: {
    docs: { description: { story: "Default collapsed state. Click chevrons to expand phases." } },
  },
};

export const ExpandedOnLoad: Story = {
  args: {
    title: "Project Schedule — Expanded",
    iconName: "standard:event",
    columns: scheduleColumns,
    data: scheduleData,
    expandOnLoad: true,
  },
  parameters: {
    docs: { description: { story: "All nodes expanded on load, including deeply nested 3rd level." } },
  },
};

export const LiveEditing: Story = {
  render: (args) => {
    const [data, setData] = React.useState(args.data);
    return (
      <EditableTreeGrid
        {...args}
        data={data}
        onCellChange={(rowId, field, value) => {
          const updateRow = (rows: typeof data): typeof data =>
            rows.map((r) =>
              r.Id === rowId
                ? { ...r, [field]: value }
                : { ...r, _children: r._children ? updateRow(r._children as typeof data) : r._children }
            );
          setData(updateRow(data));
          args.onCellChange?.(rowId, field, value);
        }}
      />
    );
  },
  args: {
    title: "Project Schedule — Live Editing",
    iconName: "standard:event",
    columns: scheduleColumns,
    data: scheduleData,
    expandOnLoad: true,
  },
  parameters: {
    docs: { description: { story: "Expand nodes and edit inline. Dirty banner + footer Save/Cancel appear when changes exist." } },
  },
};

export const ReadOnly: Story = {
  args: {
    title: "Project Schedule — Read Only",
    iconName: "standard:event",
    columns: scheduleColumns,
    data: scheduleData,
    expandOnLoad: true,
    isReadOnly: true,
  },
  parameters: {
    docs: { description: { story: "isReadOnly=true disables all inline editors. Useful for view-only contexts." } },
  },
};

export const WithAlertBanner: Story = {
  args: {
    title: "Project Schedule",
    iconName: "standard:event",
    columns: scheduleColumns,
    data: scheduleData,
    expandOnLoad: true,
    alertMessage: "Changes made by another user were detected. Refresh to see the latest data.",
    alertVariant: "warning",
  },
  parameters: {
    docs: { description: { story: "Alert banner above table — mirrors c-st-alert-banner for conflict/refresh notifications." } },
  },
};

export const LoadingSkeleton: Story = {
  args: {
    title: "Project Schedule",
    iconName: "standard:event",
    columns: scheduleColumns,
    data: [],
    loading: true,
  },
  parameters: {
    docs: { description: { story: "Skeleton rows animate while data is being fetched from Apex." } },
  },
};

export const EmptyState: Story = {
  args: {
    title: "Project Schedule",
    iconName: "standard:event",
    columns: scheduleColumns,
    data: [],
  },
  parameters: {
    docs: { description: { story: "Empty table state — no activities scheduled yet." } },
  },
};

export const WithHeaderActions: Story = {
  args: {
    title: "Project Schedule",
    iconName: "standard:event",
    columns: scheduleColumns,
    data: scheduleData,
    expandOnLoad: false,
    headerActions: (
      <button className="slds-button slds-button_brand slds-button_small">
        + Add Activity
      </button>
    ),
  },
  parameters: {
    docs: { description: { story: "Header actions slot — mirrors buttonactions/headeractions slots in the LWC." } },
  },
};

export const KitchenSink: Story = {
  render: (args) => {
    const [data, setData] = React.useState(args.data);
    return (
      <EditableTreeGrid
        {...args}
        data={data}
        onCellChange={(rowId, field, value) => {
          const updateRow = (rows: typeof data): typeof data =>
            rows.map((r) =>
              r.Id === rowId
                ? { ...r, [field]: value }
                : { ...r, _children: r._children ? updateRow(r._children as typeof data) : r._children }
            );
          setData(updateRow(data));
          args.onCellChange?.(rowId, field, value);
        }}
      />
    );
  },
  args: {
    title: "Project Schedule — All Features",
    iconName: "standard:event",
    columns: scheduleColumns,
    data: scheduleData,
    expandOnLoad: true,
    enableSearch: true,
    alertMessage: "Review and update schedule before submitting.",
    alertVariant: "info",
    headerActions: (
      <button className="slds-button slds-button_brand slds-button_small">+ Add Activity</button>
    ),
  },
  parameters: {
    docs: { description: { story: "All features: expanded on load, inline editing, search, alert banner, header actions." } },
  },
};
