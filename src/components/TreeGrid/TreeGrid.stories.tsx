import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { TreeGrid } from "./TreeGrid";
import { projectTreeColumns, projectTreeData, shallowTreeData } from "./mockData";

const meta = {
  title: "Categories/Data Display & Grid/stTreeGrid",
  component: TreeGrid,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "<h3>stTreeGrid — ST Tree Grid</h3>",
          "<p>A hierarchical data grid for displaying parent-child records in a collapsible tree structure. Wraps Salesforce's <code>lightning-tree-grid</code> inside an <code>st-lwc-card</code> shell with search, expand controls, row actions, and optional column summaries.</p>",
          "<p><strong>For Use In:</strong> Record pages requiring parent-child hierarchical data &nbsp;·&nbsp; <strong>~6 file references in source</strong></p>",
          "<p><strong>Architecture:</strong> <code>c-st-lwc-card</code> &rarr; <code>lightning-tree-grid</code> + search input + button-group &nbsp;·&nbsp; <strong>Pattern C</strong></p>",
          "<p><strong>Hierarchy Modes:</strong></p>",
          "<ul>",
          "<li><code>linked-list</code> — uses a <code>_children</code> array on each row object (default Salesforce tree-grid format)</li>",
          "<li><code>linked-list-root</code> — same as linked-list but root nodes are filtered separately</li>",
          "<li><code>parent-child</code> — flat array with <code>parentId</code> references; tree is built at runtime</li>",
          "</ul>",
          "<p><strong>Supported features:</strong></p>",
          "<ul>",
          "<li>Expand All / Collapse All controls</li>",
          "<li>Header search</li>",
          "<li>Per-row action menu (View / Edit / Delete or custom)</li>",
          "<li>Column summary row with count, sum, avg, min, max operations</li>",
          "<li>Scrollable fixed-height viewport</li>",
          "<li>Add New button</li>",
          "</ul>",
          "<p><strong>Note:</strong> Teams often prefer <code>stEditableTreeGrid</code> for more control. This component is best for read-heavy hierarchies that match Salesforce's standard tree-grid contract.</p>",
        ].join(""),
      },
    },
  },
  argTypes: {
    title:          { description: "Card header title.", table: { category: "Card" } },
    iconName:       { description: "SLDS icon name shown beside the title.", table: { category: "Card" } },
    columns:        { description: "Column definitions. Each requires `label`, `fieldName`, `type`.", table: { category: "Data" } },
    data:           { description: "Hierarchical row data. Structure depends on `mode`.", table: { category: "Data" } },
    keyField:       { description: "Unique row identifier. Defaults to `Id`.", table: { category: "Data" } },
    mode:           { description: "Hierarchy mode: `linked-list`, `linked-list-root`, or `parent-child`.", table: { category: "Data" } },
    enableSearch:   { description: "Shows a search box in the card header.", table: { category: "Features" } },
    expandOnLoad:   { description: "Expands all nodes on initial render.", table: { category: "Features" } },
    enableScrolling: { description: "Enables a fixed-height scrollable viewport.", table: { category: "Features" } },
    gridHeightPixels: { description: "Height of the scrollable viewport in pixels. Requires `enableScrolling: true`.", table: { category: "Features" } },
    columnSummaries: { description: "Array of column summary definitions (count, sum, avg, min, max).", table: { category: "Features" } },
    summaryRowLabel: { description: "Label for the summary row. Defaults to `Total`.", table: { category: "Features" } },
    allowAddNew:    { description: "Shows an Add New button.", table: { category: "CRUD" } },
    addNewLabel:    { description: "Custom label for the Add New button.", table: { category: "CRUD" } },
    allowDelete:    { description: "Shows a Delete action on each row.", table: { category: "CRUD" } },
    loading:        { description: "Shows a loading spinner.", table: { category: "States" } },
    filterSlot:     { description: "Custom filter controls rendered in the card header.", table: { category: "Slots" } },
  },
  args: {
    onAddNew: fn(),
    onDelete: fn(),
    onRowAction: fn(),
    onExpandCollapse: fn(),
  },
} satisfies Meta<typeof TreeGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Project Hierarchy",
    iconName: "standard:work_order",
    columns: projectTreeColumns,
    data: projectTreeData,
    enableSearch: true,
  },
  parameters: {
    docs: { description: { story: "Default 3-level hierarchy. Click chevrons to expand/collapse nodes." } },
  },
};

export const ExpandedOnLoad: Story = {
  args: {
    title: "Project Hierarchy — Expanded",
    iconName: "standard:work_order",
    columns: projectTreeColumns,
    data: projectTreeData,
    expandOnLoad: true,
    enableSearch: true,
  },
  parameters: {
    docs: { description: { story: "expandOnLoad=true expands all nodes on initial render." } },
  },
};

export const WithSummaryRow: Story = {
  args: {
    title: "Project Hierarchy — Totals",
    iconName: "standard:work_order",
    columns: projectTreeColumns,
    data: projectTreeData,
    expandOnLoad: true,
    columnSummaries: [
      { fieldName: "Budget__c", operation: "sum" },
      { fieldName: "Completion__c", operation: "avg" },
    ],
    summaryRowLabel: "Totals",
  },
  parameters: {
    docs: { description: { story: "Summary row at the bottom with sum of Budget and average Completion across all nodes." } },
  },
};

export const WithScrolling: Story = {
  args: {
    title: "Project Hierarchy — Scrollable",
    iconName: "standard:work_order",
    columns: projectTreeColumns,
    data: projectTreeData,
    expandOnLoad: true,
    enableScrolling: true,
    gridHeightPixels: 280,
  },
  parameters: {
    docs: { description: { story: "Fixed height with vertical scroll when expanded content overflows." } },
  },
};

export const WithCRUD: Story = {
  args: {
    title: "Project Hierarchy — CRUD",
    iconName: "standard:work_order",
    columns: projectTreeColumns,
    data: projectTreeData,
    expandOnLoad: true,
    allowAddNew: true,
    addNewLabel: "New Project",
    allowDelete: true,
  },
  parameters: {
    docs: { description: { story: "allowAddNew shows the New button; allowDelete adds Delete to the row action menu." } },
  },
};

export const LoadingState: Story = {
  args: {
    title: "Project Hierarchy",
    iconName: "standard:work_order",
    columns: projectTreeColumns,
    data: [],
    loading: true,
  },
  parameters: {
    docs: { description: { story: "Skeleton animation while data loads." } },
  },
};

export const EmptyState: Story = {
  args: {
    title: "Project Hierarchy",
    iconName: "standard:work_order",
    columns: projectTreeColumns,
    data: [],
  },
  parameters: {
    docs: { description: { story: "No data to display." } },
  },
};

export const ShallowHierarchy: Story = {
  args: {
    title: "Two-Level Hierarchy",
    iconName: "standard:work_order",
    columns: projectTreeColumns,
    data: shallowTreeData,
    expandOnLoad: true,
  },
  parameters: {
    docs: { description: { story: "Two-level tree (Portfolio → Program). Children have no further nesting." } },
  },
};

export const KitchenSink: Story = {
  args: {
    title: "Project Portfolio — All Features",
    iconName: "standard:work_order",
    columns: projectTreeColumns,
    data: projectTreeData,
    expandOnLoad: true,
    enableSearch: true,
    enableScrolling: false,
    allowAddNew: true,
    addNewLabel: "New Project",
    allowDelete: true,
    columnSummaries: [
      { fieldName: "Budget__c", operation: "sum" },
      { fieldName: "Completion__c", operation: "avg" },
    ],
    summaryRowLabel: "Portfolio Totals",
  },
  parameters: {
    docs: { description: { story: "Every feature active: expand on load, search, CRUD, summary row." } },
  },
};
