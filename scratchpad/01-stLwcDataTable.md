# Research: stLwcDataTable (ST Data Table)

## Source References
- **GitHub source**: `sitetracker/strk` → `src/main/default/lwc/stLwcDataTable/` (44KB JS, 208-line HTML template)
- **Inner table**: `c-custom-data-table` → extends `LightningDatatable` with 11 custom column types
- **Coda**: "Configurable data table component for displaying records with pagination, sorting, and filtering"
- **SF Docs**: [lightning-datatable](https://developer.salesforce.com/docs/platform/lightning-component-reference/guide/lightning-datatable.html)
- **Existing recreation**: `ticket-templates-prototype/stories/stLwcDataTable/stLwcDataTable.wc.js` (831 lines)
- **Existing stories**: `ticket-templates-prototype/stories/stLwcDataTable/stLwcDataTable.stories.js` (699 lines, 25 stories)
- **Architecture pattern**: See `scratchpad/00-architecture-patterns.md` → Pattern A

## Real Architecture (from GitHub source)

**stLwcDataTable** is a **container component** that:
1. Renders a header bar (`stDataTableHeader` class): label, icon, search bar, record count, New/Delete buttons
2. Has named slots: `filter`, `top`, `secondrow` for composability
3. Delegates table rendering to `c-custom-data-table` (which extends `lightning-datatable`)
4. Handles pagination via `c-st-paginator` (prev/next/page-size)
5. Shows empty state via `c-st-illustration`
6. Opens record creation via `c-st-page-layout` modal
7. Fetches data via Apex: `StDataTableService.init`, `getDataTableWrapper`, `deleteRecords`
8. Communicates via Lightning Message Service: `stDataTableMessage__c`

**c-custom-data-table** adds 11 custom column types to standard `lightning-datatable`:
reference, customCurrency, picklist, percent, customNumber, inputText, treeLink, customFirstColumn, customStatusBadge, customLinkWithIcon, customAvatar

---

## Where stLwcDataTable DEVIATES from Standard lightning-datatable

This is the critical part. ST's data table is NOT just a wrapper around `lightning-datatable` — it adds significant custom functionality:

| Feature | lightning-datatable | stLwcDataTable |
|---------|-------------------|----------------|
| Header | None (just table) | Full header: label, icon, record count, search bar, New/Delete buttons |
| Pagination | Infinite scrolling (`enable-infinite-loading`) | Page-based with page-size selector (5/10/15/25/50) and prev/next |
| Search | None | Built-in debounced full-text search across visible columns |
| Column Filtering | Only wrap/clip text header actions | Dropdown filter per column showing unique values with checkboxes |
| Record CRUD | None | "New" button (opens modal), "Delete" button (with confirmation) |
| Error Column | Row-level error tooltips in number column | Dedicated error/warning icon column with colored indicators |
| Summary Row | None | Auto-calculated field totals row at bottom |
| Illustration | None | Configurable SVG illustration for empty/no-data state |
| Empty State | Shows nothing | Shows "No records to display" or custom illustration |
| Selection Count | Only via event handling | Built-in "X item(s) selected" display in header |

**Shared features (similar behavior):**
- Column sorting (ASC/DESC)
- Row selection (checkbox multi, radio single)
- Inline editing (click-to-edit)
- Row-level actions (dropdown menu)
- Data type formatting (currency, percent, date, email, phone, URL, boolean)
- Striped variant
- Loading spinner

---

## Complete Property List

### Header & Label
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| show-label | boolean | false | Show the object label header |
| custom-label | string | '' | Override the default object plural label |
| icon-url | string | '' | URL for the header icon (usually from getObjectInfo theme) |
| hide-header | boolean | false | Hide the entire header section |
| hide-count | boolean | false | Hide the selected item count |
| hide-total-records-in-header | boolean | false | Hide total count "(N)" after label |

### Data & Schema
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| columns | Column[] | [] | Column definitions (label, fieldName, type, sortable, typeAttributes) |
| data | Object[] | [] | Row data array |
| key-field | string | 'Id' | Unique row identifier field |
| object-name | string | 'Account' | Salesforce object API name |
| field-set-name | string | '' | Field set to use for dynamic column generation |

### Search
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| hide-search | boolean | false | Hide the search bar |
| search-placeholder-label | string | 'Search...' | Custom search placeholder text |

### Pagination
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| paginate-size | number | 5 | Records per page (0 = no pagination) |

### Sorting
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| sort-by | string | '' | Field API name to sort by initially |
| default-sort-direction | string | 'asc' | Default sort direction ('asc' or 'desc') |
| disable-sorting | boolean | false | Disable all column sorting |

### Filtering
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| disable-filtering | boolean | false | Disable column header filters |

### Selection
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| hide-checkbox-column | boolean | false | Hide row selection checkboxes |
| max-row-selection | number | 50 | Max selectable rows (1 = radio button mode) |

### CRUD
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| allow-record-creation | boolean | false | Show "New" button |
| allow-record-deletion | boolean | false | Show "Delete" button |
| add-button-label | string | 'New' | Custom label for New button |
| new-button-disabled | boolean | false | Disable the New button |
| new-button-title | string | 'New' | Tooltip for New button |
| override-record-creation | boolean | false | Override default creation behavior (fire event instead) |
| override-record-deletion | boolean | false | Override default deletion behavior |

### Appearance
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | string | 'base' | Table visual variant: 'base' or 'striped' |
| grid-class | string | 'slds-m-top_large' | CSS class for grid wrapper |

### States
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| loading | boolean | false | Show loading spinner |
| show-illustration-on-no-rows | boolean | false | Show illustration when no data |
| illustration-text | string | 'No records found' | Text for the illustration state |
| illustration-image-name | string | 'error:no_access' | SLDS illustration name |
| illustration-size | string | 'small' | Illustration size |

### Advanced
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| row-actions | Action[] | [] | Row-level action menu items |
| add-error-column | boolean | false | Show error/warning column |
| where-clause | string | '' | SOQL WHERE clause for server-side filtering |
| summary-fields | string[] | [] | Fields to calculate totals for in summary row |
| editable-fields | string[] | [] | Fields that can be inline edited |

**Total: 35 properties**

---

## Column Definition Schema

```typescript
interface Column {
  label: string;           // Header text
  fieldName: string;       // Data field key
  type: ColumnType;        // Data type for formatting
  sortable?: boolean;      // Enable sorting (default: false)
  editable?: boolean;      // Enable inline editing
  typeAttributes?: {       // Type-specific formatting
    currencyCode?: string;
    fractionDigits?: number;
    // Custom type-specific (from c-custom-data-table):
    rowRecordId?: string;
    objectName?: string;
    referenceField?: string;
    picklistValues?: Array<{label: string; value: string}>;
    multicurrencyMap?: Record<string, number>;
    theme?: string;        // for customStatusBadge
    icon?: string;         // for customLinkWithIcon
    url?: string;
  };
}

// Standard lightning-datatable types
type StandardColumnType = 'text' | 'currency' | 'percent' | 'date' | 'number' |
                          'email' | 'phone' | 'url' | 'boolean' | 'action';

// Custom types added by c-custom-data-table (11 total)
type CustomColumnType = 'reference' | 'customCurrency' | 'picklist' | 'percent' |
                        'customNumber' | 'inputText' | 'treeLink' | 'customFirstColumn' |
                        'customStatusBadge' | 'customLinkWithIcon' | 'customAvatar';

type ColumnType = StandardColumnType | CustomColumnType;
```

---

## Events

| Event | Payload | When |
|-------|---------|------|
| rowselection | `{ selectedRows: string[] }` | Row checkbox/radio toggled |
| recordcreate | `{}` | "New" button clicked |
| recordsaved | `{}` | Save clicked in creation modal |
| recorddelete | `{ deletedIds: string[] }` | Records deleted after confirmation |
| rowaction | `{ action: { name: string }, row: Object }` | Row action menu item clicked |
| celledit | `{ rowId: string, fieldName: string, value: string }` | Inline edit saved |

---

## Visual States

1. **Default** — Table with data, header, pagination
2. **Loading** — Spinner overlay, header visible
3. **Empty** — "No records to display" text
4. **Illustration** — SVG illustration + custom text for empty state
5. **Error rows** — Dedicated column with red (error) / orange (warning) icons
6. **Selected rows** — Blue highlight background via `slds-is-selected`
7. **Editing cell** — Input field replaces cell content
8. **Filter open** — Dropdown with checkboxes under column header
9. **Row action open** — Dropdown menu on row's action button
10. **Creation modal** — Modal overlay with form placeholder

---

## Existing Code Audit — What Broke

### Known Issues
1. **Black boxes around icons** — SVGs loaded from CDN via `<use xlink:href="...">`. If CDN is slow/blocked/CORS-restricted, the SVG renders as an empty container with the button border visible = black box. This is the #1 visual bug.
2. **Icon approach is fragile** — 4 places use CDN SVG references: search icon, delete icon, row action (down chevron), no inline fallback.
3. **Web component re-renders entirely on every interaction** — `this.innerHTML = html` on every render kills performance and loses focus/scroll state.
4. **No Shadow DOM** — Styles can leak in/out. The SLDS CDN link is loaded every render.
5. **Illustration SVG is a crude placeholder** — Not a real SLDS illustration. Just circles and rectangles.
6. **Checkbox indeterminate state** — Uses a CSS class instead of setting the DOM property (`el.indeterminate = true`).

### What Worked Well
1. All 25 stories have clear names and descriptions
2. Mock data is realistic (telecom/tower projects, real-looking field values)
3. Feature coverage is thorough — every major prop has a story
4. Data type formatting (currency, percent, date) works correctly
5. Sorting, filtering, search logic is solid
6. Pagination math is correct

---

## Story List (25 stories — kept from existing, improved)

| # | Story | Purpose | Key Props |
|---|-------|---------|-----------|
| 1 | Default | Baseline table with standard config | columns, data, show-label, paginate-size |
| 2 | Pagination | Page navigation + page-size selector | paginate-size=5 |
| 3 | Column Sorting | Click headers, ASC/DESC toggle | sort-by, default-sort-direction |
| 4 | Column Filtering | Header filter dropdowns | (default, not disabled) |
| 5 | Search | Debounced full-text search | search-placeholder-label |
| 6 | Row Selection Multi | Checkbox multi-select | hide-checkbox-column=false, max-row-selection=50 |
| 7 | Row Selection Single | Radio button single-select | max-row-selection=1 |
| 8 | Record Creation | "New" button with modal | allow-record-creation |
| 9 | Record Deletion | Delete with confirmation | allow-record-deletion |
| 10 | Full CRUD | Create + Delete + Row Actions combined | all CRUD props |
| 11 | Row Actions Menu | Per-row context menu | row-actions, columns with action type |
| 12 | Inline Editing | Click-to-edit cells | editable-fields |
| 13 | Loading State | Spinner overlay | loading=true |
| 14 | Empty State | No data, plain message | data=[] |
| 15 | Illustration State | No data, illustration + text | show-illustration-on-no-rows |
| 16 | Error Column | Per-row error/warning indicators | add-error-column |
| 17 | Summary Row | Auto-calculated field totals | summary-fields |
| 18 | Striped Variant | Alternating row backgrounds | variant='striped' |
| 19 | Hidden Header | Table only, no header | hide-header=true |
| 20 | Custom Label with Icon | Header icon + custom text | icon-url, custom-label |
| 21 | Read Only | All interactivity disabled | disable-sorting, disable-filtering, hide-search, hide-checkbox-column |
| 22 | Small Dataset | No pagination needed | paginate-size=0, 3 rows |
| 23 | Large Page Size | All data on one page | paginate-size=25 |
| 24 | Kitchen Sink | Every feature enabled simultaneously | all props |
| 25 | Disabled New Button | New button shown but disabled | new-button-disabled |

---

## Build Decisions

1. **React component** instead of web component — better Storybook integration, controls, state
2. **Local SLDS CSS** instead of CDN — no black box risk; download SLDS and serve from public/
3. **Inline SVG icons** or **SLDS sprite sheets from local files** — no CDN dependency
4. **TypeScript interfaces** for Column, RowAction, props — catches errors at build time
5. **Controlled state via React hooks** — search, sort, filter, selection, pagination all in state
6. **No Shadow DOM** — SLDS classes work at document level in Storybook
7. **SLDS illustration component** for empty state — use real SLDS illustration SVGs, not crude placeholders
