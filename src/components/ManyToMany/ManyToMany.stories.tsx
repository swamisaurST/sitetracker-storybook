import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { ManyToMany } from "./ManyToMany";
import { junctionColumns, junctionData, selectionColumns, selectionData } from "./mockData";

const meta = {
  title: "Categories/Data Display & Grid/stManyToMany",
  component: ManyToMany,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "<h3>stManyToMany — ST Many-to-Many Junction Manager</h3>",
          "<p>A self-contained UI for managing junction object records between two Salesforce objects. Orchestrates two <code>DataTable</code> instances: one showing existing linked records, and a modal-based one for selecting new records to link.</p>",
          "<p><strong>For Use In:</strong> Record pages where a many-to-many relationship (via a junction object) needs to be managed inline &nbsp;·&nbsp; <strong>2 LWC consumers</strong> (BOM Template flexipage)</p>",
          "<p><strong>Architecture:</strong> <code>c-st-lwc-data-table</code> (junction table) + <code>c-st-modal-wrapper</code> + <code>c-st-many-to-many-selection</code> (selection DataTable) &nbsp;·&nbsp; <strong>Pattern G</strong></p>",
          "<p><strong>How it works:</strong></p>",
          "<ol>",
          "<li>The <strong>junction table</strong> displays records already linked to the current record</li>",
          "<li>Clicking <strong>Add</strong> opens a modal containing a second DataTable of all available records</li>",
          "<li>The user selects one or more records and clicks <strong>Confirm</strong></li>",
          "<li>The <code>onAdd</code> event fires with the selected IDs &mdash; the parent creates the junction records in Salesforce</li>",
          "<li>Optionally, existing junction records can be deleted via the junction table's row actions</li>",
          "</ol>",
          "<p><strong>Supported features:</strong></p>",
          "<ul>",
          "<li>Duplicate prevention &mdash; already-linked records are excluded from the selection modal by default</li>",
          "<li>Allow duplicates mode for use-cases where the same record can be linked multiple times</li>",
          "<li>Search in both the junction table and the selection modal</li>",
          "<li>Pagination in both tables</li>",
          "<li>Junction row delete with <code>onDelete</code> callback</li>",
          "<li>Loading state for both tables</li>",
          "</ul>",
        ].join(""),
      },
    },
  },
  argTypes: {
    title:          { description: "Title displayed above the junction table.", table: { category: "Labels" } },
    addNewLabel:    { description: "Label for the Add button. Defaults to `Add`.", table: { category: "Labels" } },
    selectionModalTitle: { description: "Title of the record selection modal.", table: { category: "Labels" } },
    junctionColumns: { description: "Column definitions for the junction (existing records) table.", table: { category: "Junction Table" } },
    junctionData:   { description: "Row data for the junction table (already-linked records).", table: { category: "Junction Table" } },
    allowJunctionDelete: { description: "Adds a Delete action to each junction row.", table: { category: "Junction Table" } },
    selectionColumns: { description: "Column definitions for the selection modal table.", table: { category: "Selection Modal" } },
    selectionData:  { description: "Row data for the selection modal (all available records).", table: { category: "Selection Modal" } },
    allowDuplicateJunctionRecords: { description: "When true, already-linked records remain selectable in the modal.", table: { category: "Selection Modal" } },
    tableSearchEnabled: { description: "Enables search in both tables.", table: { category: "Features" } },
    tablePaginationEnabled: { description: "Enables pagination in both tables.", table: { category: "Features" } },
    loading:        { description: "Shows a loading spinner on the junction table.", table: { category: "States" } },
  },
  args: {
    onAdd: fn(),
    onDelete: fn(),
  },
} satisfies Meta<typeof ManyToMany>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Tower Equipment",
    addNewLabel: "Add Equipment",
    selectionModalTitle: "Select Equipment to Add",
    junctionColumns,
    junctionData,
    selectionColumns,
    selectionData,
    allowJunctionDelete: true,
    tableSearchEnabled: true,
    tablePaginationEnabled: true,
  },
  parameters: {
    docs: { description: { story: "Default: junction table with 3 linked records. Click 'Add Equipment' to open the selection modal." } },
  },
};

export const EmptyJunction: Story = {
  args: {
    title: "Tower Equipment",
    addNewLabel: "Add Equipment",
    selectionModalTitle: "Select Equipment to Add",
    junctionColumns,
    junctionData: [],
    selectionColumns,
    selectionData,
    allowJunctionDelete: true,
  },
  parameters: {
    docs: { description: { story: "No existing junction records. Prompt user to add the first item." } },
  },
};

export const NoDuplicates: Story = {
  args: {
    title: "Tower Equipment",
    addNewLabel: "Add Equipment",
    selectionModalTitle: "Select Equipment",
    junctionColumns,
    junctionData,
    selectionColumns,
    selectionData,
    allowDuplicateJunctionRecords: false,
  },
  parameters: {
    docs: { description: { story: "allowDuplicateJunctionRecords=false (default). Already-linked records are hidden from the selection modal." } },
  },
};

export const AllowDuplicates: Story = {
  args: {
    title: "Tower Equipment",
    addNewLabel: "Add Equipment",
    selectionModalTitle: "Select Equipment",
    junctionColumns,
    junctionData,
    selectionColumns,
    selectionData,
    allowDuplicateJunctionRecords: true,
  },
  parameters: {
    docs: { description: { story: "allowDuplicateJunctionRecords=true — all catalog items shown in modal even if already linked." } },
  },
};

export const ReadOnlyJunction: Story = {
  args: {
    title: "Tower Equipment (Read Only)",
    addNewLabel: "Add Equipment",
    junctionColumns,
    junctionData,
    selectionColumns,
    selectionData,
    allowJunctionDelete: false,
  },
  parameters: {
    docs: { description: { story: "allowJunctionDelete=false hides checkboxes and Remove button from junction table." } },
  },
};

export const Loading: Story = {
  args: {
    title: "Tower Equipment",
    junctionColumns,
    junctionData: [],
    selectionColumns,
    selectionData,
    loading: true,
  },
  parameters: {
    docs: { description: { story: "Loading state while junction records are being fetched from Apex." } },
  },
};
