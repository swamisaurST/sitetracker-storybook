import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { DataTable } from "./DataTable";
import {
  siteColumns,
  siteData,
  siteRowActions,
  errorSiteData,
  editableColumns,
} from "./mockData";

const meta = {
  title: "Categories/Data Display & Grid/stLwcDataTable",
  component: DataTable,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "<h3>stLwcDataTable — ST Data Table</h3>",
          "<p>A configurable data table for displaying Salesforce records with pagination, sorting, filtering, and CRUD actions. The foundational read-optimised data display component in the Sitetracker library.</p>",
          "<p><strong>For Use In:</strong> All Sitetracker record pages requiring tabular data display &nbsp;·&nbsp; <strong>~35 LWC consumers</strong></p>",
          "<p><strong>Architecture:</strong> Container &rarr; <code>c-custom-data-table</code> (extends <code>lightning-datatable</code>) + <code>c-st-paginator</code> + <code>c-st-illustration</code> &nbsp;·&nbsp; <strong>Pattern A</strong></p>",
          "<p><strong>Supported features:</strong></p>",
          "<ul>",
          "<li><strong>Column types:</strong> text, currency, percent, number, date, boolean, email, phone, url, reference, picklist, customCurrency, customNumber, customStatusBadge, customLinkWithIcon, customAvatar, treeLink (11 custom types beyond lightning-datatable)</li>",
          "<li>Page-based pagination &mdash; 5 / 10 / 15 / 25 / 50 per page</li>",
          "<li>Column sorting (ASC / DESC) with arrow indicator</li>",
          "<li>Header search with 250ms debounce</li>",
          "<li>Per-column checkbox filtering with unique-value dropdowns</li>",
          "<li>Row selection &mdash; multi-checkbox or single-radio (<code>maxRowSelection=1</code>)</li>",
          "<li>Row-level action menus (View / Edit / Delete or custom)</li>",
          "<li>CRUD buttons &mdash; New record + Delete selected rows</li>",
          "<li>Summary / aggregate row for numeric columns</li>",
          "<li>Resizable columns (min 50px, max 1000px)</li>",
          "<li>Illustration empty state via <code>c-st-illustration</code></li>",
          "<li>Error column with per-row error / warning indicators</li>",
          "</ul>",
          "<p><strong>Not supported:</strong> Mobile devices</p>",
        ].join(""),
      },
    },
  },
  argTypes: {
    columns:        { description: "Column definitions. Each column requires `label`, `fieldName`, and `type`. Optional: `sortable`, `editable`, `initialWidth`, `typeAttributes`.", table: { category: "Data" } },
    data:           { description: "Array of row objects. Each must have a unique `Id` field matching `keyField`.", table: { category: "Data" } },
    keyField:       { description: "Field name used as the unique row identifier. Defaults to `Id`.", table: { category: "Data" } },
    showLabel:      { description: "Show the header bar with label, icon, record count, and search.", table: { category: "Header" } },
    customLabel:    { description: "Custom label displayed in the header bar.", table: { category: "Header" } },
    iconUrl:        { description: "URL of a Salesforce object icon to display in the header.", table: { category: "Header" } },
    hideHeader:     { description: "Hides the entire header bar. Pure table view.", table: { category: "Header" } },
    hideCount:      { description: "Hides the record count badge in the header.", table: { category: "Header" } },
    hideSearch:     { description: "Hides the search box.", table: { category: "Header" } },
    paginateSize:   { description: "Number of rows per page. Set to 0 to disable pagination.", table: { category: "Pagination" } },
    sortBy:         { description: "Initial sort field name.", table: { category: "Sorting" } },
    defaultSortDirection: { description: "Initial sort direction. `asc` or `desc`.", table: { category: "Sorting" } },
    disableSorting: { description: "Disables column sorting entirely.", table: { category: "Sorting" } },
    disableFiltering: { description: "Disables per-column checkbox filters.", table: { category: "Filtering" } },
    hideCheckboxColumn: { description: "Hides the row selection checkbox column.", table: { category: "Selection" } },
    maxRowSelection: { description: "Maximum number of selectable rows. Set to 1 for radio-button single-select mode.", table: { category: "Selection" } },
    allowRecordCreation: { description: "Shows a 'New' button in the header.", table: { category: "CRUD" } },
    allowRecordDeletion: { description: "Shows a 'Delete' button that activates when rows are selected.", table: { category: "CRUD" } },
    addButtonLabel:  { description: "Custom label for the New button.", table: { category: "CRUD" } },
    newButtonDisabled: { description: "Renders the New button in a disabled state.", table: { category: "CRUD" } },
    newButtonTitle:  { description: "Tooltip text explaining why the New button is disabled.", table: { category: "CRUD" } },
    rowActions:      { description: "Array of row-level actions. Renders a dropdown ⋮ menu on each row.", table: { category: "CRUD" } },
    variant:         { description: "`base` (default) or `striped` — alternating row colours.", table: { category: "Appearance" } },
    loading:         { description: "Displays a spinner overlay. Header remains visible.", table: { category: "States" } },
    showIllustrationOnNoRows: { description: "Renders an SLDS illustration when the data array is empty.", table: { category: "States" } },
    illustrationText: { description: "Custom message displayed beneath the illustration.", table: { category: "States" } },
    addErrorColumn:  { description: "Prepends an error indicator column with per-row error / warning icons.", table: { category: "Advanced" } },
    summaryFields:   { description: "Field names for which a SUM total is shown in the summary row.", table: { category: "Advanced" } },
    editableFields:  { description: "Fields that support double-click inline editing.", table: { category: "Advanced" } },
  },
  args: {
    onRowSelection: fn(),
    onRecordCreate: fn(),
    onRecordDelete: fn(),
    onRowAction: fn(),
    onCellEdit: fn(),
    onSort: fn(),
  },
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── 1. Default ──────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    columns: siteColumns,
    data: siteData,
    showLabel: true,
    customLabel: "Tower Sites",
    paginateSize: 5,
  },
};

// ─── 2. Pagination ───────────────────────────────────────────────────

export const Pagination: Story = {
  args: {
    columns: siteColumns,
    data: siteData,
    showLabel: true,
    customLabel: "Sites",
    paginateSize: 5,
  },
  parameters: {
    docs: {
      description: {
        story: "Page-based pagination with prev/next and configurable page size (5/10/15/25/50).",
      },
    },
  },
};

// ─── 3. Column Sorting ──────────────────────────────────────────────

export const ColumnSorting: Story = {
  args: {
    columns: siteColumns,
    data: siteData,
    sortBy: "Name",
    defaultSortDirection: "asc",
    paginateSize: 10,
    showLabel: true,
    customLabel: "Sorted by Name",
  },
  parameters: {
    docs: {
      description: {
        story: "Click column headers to toggle ASC/DESC sort. Arrow icon shows active sort.",
      },
    },
  },
};

// ─── 4. Column Filtering ────────────────────────────────────────────

export const ColumnFiltering: Story = {
  args: {
    columns: siteColumns,
    data: siteData,
    paginateSize: 10,
    showLabel: true,
    customLabel: "Filterable Table",
  },
  parameters: {
    docs: {
      description: {
        story: "Each column has a filter icon. Click it to open a checkbox dropdown of unique values.",
      },
    },
  },
};

// ─── 5. Search ──────────────────────────────────────────────────────

export const Search: Story = {
  args: {
    columns: siteColumns,
    data: siteData,
    searchPlaceholderLabel: "Search sites…",
    paginateSize: 10,
    showLabel: true,
    customLabel: "Searchable Table",
  },
  parameters: {
    docs: {
      description: {
        story: "Debounced full-text search across all visible column values. 250ms delay.",
      },
    },
  },
};

// ─── 6. Row Selection Multi ─────────────────────────────────────────

export const RowSelectionMulti: Story = {
  args: {
    columns: siteColumns,
    data: siteData,
    hideCheckboxColumn: false,
    maxRowSelection: 50,
    paginateSize: 10,
    showLabel: true,
    customLabel: "Multi-Select",
  },
  parameters: {
    docs: {
      description: {
        story: "Checkbox multi-select with select-all. Header shows 'X items selected' badge.",
      },
    },
  },
};

// ─── 7. Row Selection Single ────────────────────────────────────────

export const RowSelectionSingle: Story = {
  args: {
    columns: siteColumns,
    data: siteData.slice(0, 5),
    hideCheckboxColumn: false,
    maxRowSelection: 1,
    paginateSize: 0,
    showLabel: true,
    customLabel: "Single Select (Radio)",
  },
  parameters: {
    docs: {
      description: {
        story: "Radio button mode when `maxRowSelection=1`. Only one row selectable at a time.",
      },
    },
  },
};

// ─── 8. Record Creation ─────────────────────────────────────────────

export const RecordCreation: Story = {
  args: {
    columns: siteColumns,
    data: siteData.slice(0, 5),
    allowRecordCreation: true,
    addButtonLabel: "New Site",
    showLabel: true,
    customLabel: "Create Records",
    paginateSize: 0,
  },
  parameters: {
    docs: {
      description: {
        story: '"New" button in header. In Salesforce, opens a `c-st-page-layout` modal.',
      },
    },
  },
};

// ─── 9. Record Deletion ─────────────────────────────────────────────

export const RecordDeletion: Story = {
  args: {
    columns: siteColumns,
    data: siteData.slice(0, 8),
    allowRecordDeletion: true,
    paginateSize: 10,
    showLabel: true,
    customLabel: "Delete Records",
  },
  parameters: {
    docs: {
      description: {
        story: "Select rows, then click Delete. A confirmation banner appears before executing.",
      },
    },
  },
};

// ─── 10. Full CRUD ──────────────────────────────────────────────────

export const FullCRUD: Story = {
  args: {
    columns: siteColumns,
    data: siteData,
    allowRecordCreation: true,
    allowRecordDeletion: true,
    addButtonLabel: "New Site",
    rowActions: siteRowActions,
    paginateSize: 5,
    showLabel: true,
    customLabel: "Full CRUD",
  },
  parameters: {
    docs: {
      description: {
        story: "Create + Delete + per-row View/Edit/Delete actions combined.",
      },
    },
  },
};

// ─── 11. Row Actions Menu ───────────────────────────────────────────

export const RowActionsMenu: Story = {
  args: {
    columns: siteColumns,
    data: siteData.slice(0, 5),
    rowActions: siteRowActions,
    paginateSize: 0,
    showLabel: true,
    customLabel: "Row Actions",
  },
  parameters: {
    docs: {
      description: {
        story: "Per-row dropdown menu with View, Edit, Delete actions.",
      },
    },
  },
};

// ─── 12. Inline Editing ─────────────────────────────────────────────

export const InlineEditing: Story = {
  args: {
    columns: editableColumns,
    data: siteData.slice(0, 5),
    editableFields: ["Name", "City__c", "Budget__c"],
    paginateSize: 0,
    showLabel: true,
    customLabel: "Inline Editing",
  },
  parameters: {
    docs: {
      description: {
        story: "Double-click cells marked as editable to enter edit mode. Enter to save, Escape to cancel.",
      },
    },
  },
};

// ─── 13. Loading State ──────────────────────────────────────────────

export const LoadingState: Story = {
  args: {
    columns: siteColumns,
    data: siteData.slice(0, 3),
    loading: true,
    showLabel: true,
    customLabel: "Loading…",
    paginateSize: 0,
  },
  parameters: {
    docs: {
      description: {
        story: "Spinner overlay while data is being fetched. Header remains visible.",
      },
    },
  },
};

// ─── 14. Empty State ────────────────────────────────────────────────

export const EmptyState: Story = {
  args: {
    columns: siteColumns,
    data: [],
    showLabel: true,
    customLabel: "Empty Table",
  },
  parameters: {
    docs: {
      description: {
        story: "Shows 'No records to display' when data array is empty.",
      },
    },
  },
};

// ─── 15. Illustration State ─────────────────────────────────────────

export const IllustrationState: Story = {
  args: {
    columns: siteColumns,
    data: [],
    showIllustrationOnNoRows: true,
    illustrationText: "No tower sites found in this region",
    showLabel: true,
    customLabel: "No Results",
  },
  parameters: {
    docs: {
      description: {
        story: "SLDS illustration with custom text for a friendlier empty state.",
      },
    },
  },
};

// ─── 16. Error Column ───────────────────────────────────────────────

export const ErrorColumn: Story = {
  args: {
    columns: siteColumns,
    data: errorSiteData,
    addErrorColumn: true,
    paginateSize: 0,
    showLabel: true,
    customLabel: "Error Indicators",
  },
  parameters: {
    docs: {
      description: {
        story: "Dedicated error column with red (error) and orange (warning) icons per row.",
      },
    },
  },
};

// ─── 17. Summary Row ────────────────────────────────────────────────

export const SummaryRow: Story = {
  args: {
    columns: siteColumns,
    data: siteData,
    summaryFields: ["Budget__c"],
    paginateSize: 0,
    showLabel: true,
    customLabel: "With Summary Totals",
  },
  parameters: {
    docs: {
      description: {
        story: "Auto-calculated total row at the bottom for specified numeric fields.",
      },
    },
  },
};

// ─── 18. Striped Variant ────────────────────────────────────────────

export const StripedVariant: Story = {
  args: {
    columns: siteColumns,
    data: siteData.slice(0, 8),
    variant: "striped",
    paginateSize: 0,
    showLabel: true,
    customLabel: "Striped Rows",
  },
  parameters: {
    docs: {
      description: {
        story: "Alternating row background colors for improved readability.",
      },
    },
  },
};

// ─── 19. Hidden Header ──────────────────────────────────────────────

export const HiddenHeader: Story = {
  args: {
    columns: siteColumns,
    data: siteData.slice(0, 5),
    hideHeader: true,
    paginateSize: 0,
  },
  parameters: {
    docs: {
      description: {
        story: "Table only — no header bar, search, or buttons. Pure data display.",
      },
    },
  },
};

// ─── 20. Custom Label with Icon ─────────────────────────────────────

export const CustomLabelWithIcon: Story = {
  args: {
    columns: siteColumns,
    data: siteData.slice(0, 5),
    showLabel: true,
    customLabel: "Cell Tower Sites",
    iconUrl: "",
    paginateSize: 0,
  },
  parameters: {
    docs: {
      description: {
        story: "Header with custom label and standard icon. Pass `iconUrl` for a custom object icon.",
      },
    },
  },
};

// ─── 21. Read Only ──────────────────────────────────────────────────

export const ReadOnly: Story = {
  args: {
    columns: siteColumns.map((c) => ({ ...c, sortable: false })),
    data: siteData.slice(0, 5),
    disableSorting: true,
    disableFiltering: true,
    hideSearch: true,
    hideCheckboxColumn: true,
    paginateSize: 0,
    showLabel: true,
    customLabel: "Read Only",
  },
  parameters: {
    docs: {
      description: {
        story: "All interactivity disabled: no sorting, filtering, search, or selection.",
      },
    },
  },
};

// ─── 22. Small Dataset ──────────────────────────────────────────────

export const SmallDataset: Story = {
  args: {
    columns: siteColumns,
    data: siteData.slice(0, 3),
    paginateSize: 0,
    showLabel: true,
    customLabel: "3 Records",
  },
  parameters: {
    docs: {
      description: {
        story: "Only 3 rows, `paginateSize=0` means no pagination bar.",
      },
    },
  },
};

// ─── 23. Large Page Size ────────────────────────────────────────────

export const LargePageSize: Story = {
  args: {
    columns: siteColumns,
    data: siteData,
    paginateSize: 25,
    showLabel: true,
    customLabel: "All on One Page",
  },
  parameters: {
    docs: {
      description: {
        story: "All 16 records fit in a single page of 25.",
      },
    },
  },
};

// ─── 24. Kitchen Sink ───────────────────────────────────────────────

export const KitchenSink: Story = {
  args: {
    columns: editableColumns,
    data: siteData,
    showLabel: true,
    customLabel: "Kitchen Sink — All Features",
    paginateSize: 5,
    sortBy: "Name",
    defaultSortDirection: "asc",
    allowRecordCreation: true,
    allowRecordDeletion: true,
    addButtonLabel: "New Tower",
    rowActions: siteRowActions,
    editableFields: ["Name", "City__c", "Budget__c"],
    summaryFields: ["Budget__c"],
    addErrorColumn: false,
    variant: "base",
  },
  parameters: {
    docs: {
      description: {
        story: "Every feature enabled simultaneously: CRUD, search, sort, filter, edit, pagination, summary.",
      },
    },
  },
};

// ─── 25. Disabled New Button ────────────────────────────────────────

export const DisabledNewButton: Story = {
  args: {
    columns: siteColumns,
    data: siteData.slice(0, 5),
    allowRecordCreation: true,
    newButtonDisabled: true,
    newButtonTitle: "You don't have permission to create sites",
    addButtonLabel: "New Site",
    showLabel: true,
    customLabel: "Disabled Create",
    paginateSize: 0,
  },
  parameters: {
    docs: {
      description: {
        story: "New button visible but disabled with a tooltip explaining why.",
      },
    },
  },
};
