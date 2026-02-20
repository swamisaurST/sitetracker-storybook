import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { EditableDatatable } from "./EditableDatatable";
import { projectColumns, projectData, readOnlyColumns } from "./mockData";

const meta = {
  title: "Categories/Data Display & Grid/stEditableDatatable",
  component: EditableDatatable,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "<h3>stEditableDatatable — ST Editable Datatable</h3>",
          "<p>Sitetracker's most widely used data component. An editable table inside a card that supports batch inline editing: modify multiple cells across multiple rows, then commit as a single Save operation.</p>",
          "<p><strong>For Use In:</strong> Any Sitetracker record page requiring inline record editing &nbsp;·&nbsp; <strong>~38 LWC consumers</strong> (highest in the library)</p>",
          "<p><strong>Architecture:</strong> <code>c-st-lwc-card</code> &rarr; <code>c-st-editable-datatable-base</code> + <code>c-st-manage-columns</code> + <code>c-st-pps-toolbar-search</code> + <code>c-st-stencil-datatable</code> &nbsp;·&nbsp; <strong>Pattern B</strong></p>",
          "<p><strong>Supported features:</strong></p>",
          "<ul>",
          "<li>Batch inline editing &mdash; edit multiple cells, then Save or Cancel as a unit</li>",
          "<li>Column visibility manager &mdash; show/hide columns via a slide-out panel</li>",
          "<li>Skeleton loading state with animated placeholder rows</li>",
          "<li>Header search with debounce</li>",
          "<li>Column sorting (ASC / DESC)</li>",
          "<li>Row delete with confirmation</li>",
          "<li>Save &amp; New workflow &mdash; saves and immediately opens a new record form</li>",
          "<li>Cell-level validation with error highlighting</li>",
          "<li>Custom header action slots (primary + secondary)</li>",
          "<li>Read-only mode &mdash; all editing disabled, pencil icons hidden</li>",
          "</ul>",
          "<p><strong>Column types:</strong> text, number, currency, percent, date, boolean, email, phone, picklist (dropdown select)</p>",
        ].join(""),
      },
    },
  },
  argTypes: {
    title:          { description: "Card title displayed in the header bar.", table: { category: "Card" } },
    iconName:       { description: "SLDS icon name (e.g. `standard:opportunity`) shown beside the title.", table: { category: "Card" } },
    subtitle:       { description: "Subtitle text shown below the title in the card header.", table: { category: "Card" } },
    columns:        { description: "Column definitions. Set `editable: true` on columns to enable inline editing.", table: { category: "Data" } },
    data:           { description: "Array of row objects. Each must have a unique key field (`Id` by default).", table: { category: "Data" } },
    keyField:       { description: "Unique row identifier field. Defaults to `Id`.", table: { category: "Data" } },
    isReadOnly:     { description: "Disables all editing. Hides pencil icons and Save/Cancel buttons.", table: { category: "Features" } },
    enableSearch:   { description: "Shows a search box in the card sub-header.", table: { category: "Features" } },
    enableManageColumns: { description: "Shows a 'Manage Columns' button that opens a visibility panel.", table: { category: "Features" } },
    allowSaveAndNew: { description: "Adds a 'Save & New' button alongside the primary Save button.", table: { category: "Features" } },
    saveButtonLabel: { description: "Custom label for the Save button. Defaults to `Save`.", table: { category: "Features" } },
    showCountInSubHeader: { description: "Displays the total record count in the sub-header.", table: { category: "Features" } },
    sortBy:         { description: "Initial sort field name.", table: { category: "Sorting" } },
    sortDirection:  { description: "Initial sort direction. `asc` or `desc`.", table: { category: "Sorting" } },
    loading:        { description: "Renders animated skeleton rows instead of data.", table: { category: "States" } },
    error:          { description: "Displays a global error message at the top of the card.", table: { category: "States" } },
    headerActions:  { description: "Primary slot for custom header buttons (React nodes).", table: { category: "Slots" } },
    secondaryHeaderActions: { description: "Secondary slot for additional header controls.", table: { category: "Slots" } },
  },
  args: {
    onSave: fn(),
    onSaveAndNew: fn(),
    onCancel: fn(),
    onRowDelete: fn(),
    onSort: fn(),
    onCellChange: fn(),
  },
} satisfies Meta<typeof EditableDatatable>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── 1. Default ──────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    title: "Projects",
    iconName: "standard:opportunity",
    columns: projectColumns,
    data: projectData,
    enableSearch: true,
    showCountInSubHeader: true,
  },
  parameters: {
    docs: {
      description: { story: "Default editable table. Edit any cell marked editable directly in the table, then Save." },
    },
  },
};

// ─── 2. Loading Skeleton ─────────────────────────────────────────────

export const LoadingSkeleton: Story = {
  args: {
    title: "Projects",
    iconName: "standard:opportunity",
    columns: projectColumns,
    data: [],
    loading: true,
  },
  parameters: {
    docs: {
      description: { story: "Skeleton rows animate while data is loading. No spinner — uses stencil/skeleton pattern." },
    },
  },
};

// ─── 3. Read Only ────────────────────────────────────────────────────

export const ReadOnly: Story = {
  args: {
    title: "Projects (Read Only)",
    iconName: "standard:opportunity",
    columns: readOnlyColumns,
    data: projectData,
    isReadOnly: true,
    onRowDelete: undefined,
  },
  parameters: {
    docs: {
      description: { story: "isReadOnly=true disables all inputs. No Save/Cancel bar, no delete buttons." },
    },
  },
};

// ─── 4. With Dirty Edits (pre-edited) ────────────────────────────────

export const WithDirtyEdits: Story = {
  render: (args) => {
    const [data, setData] = React.useState(args.data);
    return (
      <EditableDatatable
        {...args}
        data={data}
        onCellChange={(rowId, field, value) => {
          setData((prev) =>
            prev.map((r) => (r.Id === rowId ? { ...r, [field]: value } : r))
          );
        }}
      />
    );
  },
  args: {
    title: "Projects — Live Editing",
    iconName: "standard:opportunity",
    columns: projectColumns,
    data: projectData,
    saveButtonLabel: "Save All",
    allowSaveAndNew: true,
  },
  parameters: {
    docs: {
      description: { story: "Edit cells live. The dirty banner + footer Save/Cancel bar appear when unsaved changes exist." },
    },
  },
};

// ─── 5. Save & New ───────────────────────────────────────────────────

export const SaveAndNew: Story = {
  args: {
    title: "Projects",
    iconName: "standard:opportunity",
    columns: projectColumns,
    data: projectData.slice(0, 4),
    allowSaveAndNew: true,
    saveButtonLabel: "Save",
  },
  parameters: {
    docs: {
      description: { story: "allowSaveAndNew=true shows the 'Save & New' button alongside Save." },
    },
  },
};

// ─── 6. No Search ────────────────────────────────────────────────────

export const NoSearch: Story = {
  args: {
    title: "Projects",
    iconName: "standard:opportunity",
    columns: projectColumns,
    data: projectData,
    enableSearch: false,
  },
  parameters: {
    docs: {
      description: { story: "enableSearch=false hides the search bar from the card header." },
    },
  },
};

// ─── 7. No Column Manager ────────────────────────────────────────────

export const NoColumnManager: Story = {
  args: {
    title: "Projects",
    iconName: "standard:opportunity",
    columns: projectColumns,
    data: projectData,
    enableManageColumns: false,
  },
  parameters: {
    docs: {
      description: { story: "enableManageColumns=false hides the settings/column-toggle button." },
    },
  },
};

// ─── 8. With Header Actions Slot ────────────────────────────────────

export const WithHeaderActions: Story = {
  args: {
    title: "Projects",
    iconName: "standard:opportunity",
    columns: projectColumns,
    data: projectData,
    headerActions: (
      <button className="slds-button slds-button_neutral">
        Export CSV
      </button>
    ),
    secondaryHeaderActions: (
      <button className="slds-button slds-button_brand">
        + New Project
      </button>
    ),
  },
  parameters: {
    docs: {
      description: { story: "Slot-based header actions. Mirrors the customheader / headeractions / buttonactions slots in LWC." },
    },
  },
};

// ─── 9. With Row Delete ──────────────────────────────────────────────

export const WithRowDelete: Story = {
  args: {
    title: "Projects",
    iconName: "standard:opportunity",
    columns: projectColumns,
    data: projectData.slice(0, 5),
    onRowDelete: fn(),
  },
  parameters: {
    docs: {
      description: { story: "Delete icon shown per row when onRowDelete callback provided." },
    },
  },
};

// ─── 10. Error State ─────────────────────────────────────────────────

export const ErrorState: Story = {
  args: {
    title: "Projects",
    iconName: "standard:opportunity",
    columns: projectColumns,
    data: [],
    error: "Failed to load records. Please refresh and try again.",
  },
  parameters: {
    docs: {
      description: { story: "Error banner shown when the error prop is set — mirrors c-st-illustration error state." },
    },
  },
};

// ─── 11. Empty State ─────────────────────────────────────────────────

export const EmptyState: Story = {
  args: {
    title: "Projects",
    iconName: "standard:opportunity",
    columns: projectColumns,
    data: [],
  },
  parameters: {
    docs: {
      description: { story: "No records. Shows 'No records to display' in the table body." },
    },
  },
};

// ─── 12. Sorted ──────────────────────────────────────────────────────

export const PreSorted: Story = {
  args: {
    title: "Projects — Sorted by Budget",
    iconName: "standard:opportunity",
    columns: projectColumns,
    data: projectData,
    sortBy: "Budget__c",
    sortDirection: "desc",
  },
  parameters: {
    docs: {
      description: { story: "Pre-sorted descending by Budget. Arrow indicator shows active sort column." },
    },
  },
};

// ─── 13. With Subtitle ───────────────────────────────────────────────

export const WithSubtitle: Story = {
  args: {
    title: "Projects",
    subtitle: "Last synced 5 minutes ago",
    iconName: "standard:opportunity",
    columns: projectColumns,
    data: projectData,
  },
  parameters: {
    docs: {
      description: { story: "Optional subtitle line below the card title — useful for live refresh status." },
    },
  },
};

// ─── 14. Kitchen Sink ────────────────────────────────────────────────

export const KitchenSink: Story = {
  render: (args) => {
    const [data, setData] = React.useState(args.data);
    return (
      <EditableDatatable
        {...args}
        data={data}
        onCellChange={(rowId, field, value) => {
          setData((prev) =>
            prev.map((r) => (r.Id === rowId ? { ...r, [field]: value } : r))
          );
          args.onCellChange?.(rowId, field, value);
        }}
      />
    );
  },
  args: {
    title: "Projects — All Features",
    subtitle: "Live editable view",
    iconName: "standard:opportunity",
    columns: projectColumns,
    data: projectData,
    enableSearch: true,
    enableManageColumns: true,
    showCountInSubHeader: true,
    allowSaveAndNew: true,
    saveButtonLabel: "Save Changes",
    sortBy: "Name",
    sortDirection: "asc",
    headerActions: (
      <button className="slds-button slds-button_neutral">Export</button>
    ),
  },
  parameters: {
    docs: {
      description: { story: "All features active: editable cells, manage columns, search, sort, row delete, Save & New." },
    },
  },
};
