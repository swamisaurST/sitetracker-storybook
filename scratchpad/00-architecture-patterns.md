# Architecture Patterns — Data Display Components (from GitHub source)

> Source: `sitetracker/strk` repo (preprod branch), `src/main/default/lwc/`
> 581 total LWC components in repo. All 8 Data Display components are **pure LWC**.
> Last audited: Feb 20, 2026
> Default branch: `preprod` (not `main`)

## Usage Frequency (unique LWC consumers)

| Component | Usages | Adoption |
|-----------|--------|----------|
| stEditableDatatable | ~38 | Highest — the workhorse |
| stLwcDataTable | ~35 | Very high — foundation |
| stEditableTreeGrid | ~22 | High — powers gantt, schedule, permits |
| stTreeGrid | 3 | Low — teams prefer stEditableTreeGrid |
| stManyToMany | 2 | Niche — BOM Template flexipage |
| stFieldAssetTreeGrid | 1 | Domain-specific only |
| stFieldAssetEditableTreeGrid | 1 | Domain-specific only |
| stObjectEditableTreeGrid | 0 | Possibly dead code (flexipage-only?) |

## Coda Audit Findings

**Ghost components (in Coda but deleted from GitHub):**
- `stRelatedList` → replaced by `stObjectLayoutRelatedList`
- `stFieldSetForm` → no longer exists
- `StPicklistPath` → duplicate of `stPicklistPathLWC`

**Missing from Coda (exist in GitHub, exposed):**
- `stObjectLayoutRelatedList` — replaces stRelatedList
- `stLwcCard` — reusable card wrapper (used by stEditableDatatable)
- `stLwcStorybook` — internal Sitetracker storybook (20 registered components!)
- `stCustomDataTable` — the extended LightningDatatable (inner renderer)

**Internal Storybook discovery:** `stLwcStorybook` exists as an LWC that runs inside Salesforce with 20 registered primitive/component demos. Components: Avatar, InlineTreeGrid, PpsTreeGrid, LastModifiers, PowerfulProjectSchedule, PpsActivityName, PrimitiveActions, PrimitiveBoolean, PrimitiveCombobox, PrimitiveDate, PrimitiveDispatcher, PrimitiveLongText, PrimitiveLookup, PrimitiveMultiselect, PrimitiveNumber, PrimitiveText, TreeGridColumnHeader, UserAvatarGroup, AdHocActivity.

---

## Component Dependency Graph

```
stLwcDataTable
├── c-custom-data-table (extends lightning-datatable — 11 custom column types)
├── c-st-paginator
├── c-st-illustration (empty state)
└── c-st-page-layout (record creation modal)

stEditableDatatable
├── c-st-lwc-card (card container with header, icon, actions)
├── c-st-editable-datatable-base (actual editable table)
├── c-st-live-refresh-poller (real-time sync)
├── c-st-manage-columns (column visibility manager)
├── c-st-pps-toolbar-search (search bar)
├── c-st-stencil-datatable (skeleton loading)
└── c-st-illustration (error state)

stTreeGrid
├── lightning-card (standard)
├── lightning-tree-grid (standard — implied by pattern)
├── lightning-input (search)
└── lightning-button-group (expand/collapse)

stEditableTreeGrid (Light DOM — renderMode="light")
├── c-st-editable-tree-grid-header (custom column headers)
├── c-st-editable-tree-grid-row (custom row rendering)
├── c-st-stencil-datatable (skeleton loading)
├── c-st-alert-banner
└── c-st-paginator

stObjectEditableTreeGrid
└── c-st-editable-tree-grid (= stEditableTreeGrid pattern)

stFieldAssetTreeGrid
├── c-st-lwc-tree-grid (shared tree grid)
├── c-st-modal-wrapper
├── c-st-asset-adjustment
├── c-st-asset-swap
├── c-st-asset-consume
└── c-st-quantity-tracked-actions

stFieldAssetEditableTreeGrid
└── c-st-editable-tree-grid (= stEditableTreeGrid pattern)

stManyToMany
├── c-st-lwc-data-table (= stLwcDataTable — junction table)
├── c-st-many-to-many-selection (selection modal content)
├── c-st-modal-wrapper
└── c-st-lwc-data-table (staging table — same component, different config)
```

---

## Pattern Classification

### Pattern A: DataTable Wrapper
**Component:** `stLwcDataTable`
**Inner renderer:** `c-custom-data-table` which **extends `lightning-datatable`** with 11 custom column types:
- reference, customCurrency, picklist, percent, customNumber, inputText, treeLink, customFirstColumn, customStatusBadge, customLinkWithIcon, customAvatar

**Architecture:**
- Container handles: header (label, icon, search, count), CRUD buttons, pagination, illustration, record creation modal
- Inner table handles: column rendering, sorting, selection, inline editing, row actions
- Data: Apex service (`StDataTableService`)
- Comms: Lightning Message Service (`stDataTableMessage__c`)

**Key CSS (custom):**
```css
.stDataTableHeader { background: #f3f2f2; box-shadow: 0px 1px 0px #dddbda; border-bottom: 2px solid #dddbda; }
.stTable { overflow: visible; }
.slds-scrollable_y { height: 32rem !important; }
.stSearchBar { min-width: 28rem !important; max-width: 62rem !important; }
```

**Configurable properties (from XML):** objectName, customLabel, fieldSetName, relationshipField, whereClause, sortBy, defaultSortDirection, showLabel, paginateSize, allowRecordCreation, overrideRecordCreation, allowRecordDeletion, overrideRecordDeletion, hideCheckboxColumn, gridClass, recordId

---

### Pattern B: Editable DataTable with Card
**Component:** `stEditableDatatable`
**Inner renderer:** `c-st-editable-datatable-base` (separate component — NOT lightning-datatable)

**Architecture:**
- Wrapped in `c-st-lwc-card` (custom card with header, icon, actions slot)
- Live refresh via `c-st-live-refresh-poller` (checks for record changes)
- Column management via `c-st-manage-columns`
- Search via `c-st-pps-toolbar-search` (custom toolbar search component)
- Skeleton loading via `c-st-stencil-datatable`
- Error state via `c-st-illustration`
- Slots: customheader, initialheaderactions, headeractions, customaction, buttonactions, secondaryheaderactions
- Data: Apex (`StEditableDatatableController`)

**Configurable properties (from XML):** sobject, fieldSet, buttonOverride, pageLayoutName, manageColumnsKey, disableManageColumn, showButton, enableSearch, isReadOnly, showCountInSubHeader, relatedListField, parentField, childFieldSet, childObject, whereClause, allowSaveAndNew, saveButtonLabelOverride, modalTitle

---

### Pattern C: Standard Tree Grid
**Component:** `stTreeGrid`
**Inner renderer:** Uses `lightning-card` + standard `lightning-tree-grid`

**Architecture:**
- Navigation-capable (NavigationMixin)
- Supports 3 modes: "Linked List", "Linked List Root", "Parent Child"
- Header: title, search, filter slot, expand/collapse button group, refresh button, add new buttons
- Summary operations: Count, Sum, Avg, Min, Max (per column)
- Row actions: View, Edit, Delete (with confirmation)
- Data: Apex (`StLWCUtilsController` — getListByParentId, getHierarchyByRootId, getMapByParentIds)

**Configurable properties (from XML):** title, mode, recordId, primaryObjectAPI, primaryObjectFieldSetName, primaryObjectEditFieldSetName, secondaryObjectAPI, secondaryObjectFieldSetName, secondaryObjectEditFieldSetName, primaryRelationshipFieldAPI, secondaryRelationshipFieldAPI, keyFieldName, allowDeletePrimary, allowAddNewPrimary, addNewPrimaryLabel, allowDeleteSecondary, allowAddNewSecondary, addNewSecondaryLabel, columnHeaderOverrides, columnSummaries, summaryRowLabel, expandOnLoad, enableSearch, enableScrolling, gridHeightPixels

---

### Pattern D: Custom Editable Tree Grid (Light DOM)
**Component:** `stEditableTreeGrid`
**Rendering:** Light DOM (`static renderMode = "light"`) — fully custom rendering

**Architecture:**
- Completely custom table rendering (NOT using lightning-datatable or lightning-tree-grid)
- Custom header component (`c-st-editable-tree-grid-header`) with filters, sorting, resize, selection
- Custom row component (`c-st-editable-tree-grid-row`) with expand/collapse, inline editing, drag-drop
- Pagination via `c-st-paginator`
- Skeleton loading via `c-st-stencil-datatable`
- Alert banner support
- Fixed columns/header support
- Column filtering
- Drag and drop (reordering)
- Context menu support
- No direct Apex calls — data provided by parent component

**Note:** This is the most complex component. It's a full custom table engine.

---

### Pattern E: Generic Object Editable Tree Grid
**Component:** `stObjectEditableTreeGrid`
**Architecture:** Thin wrapper that:
1. Fetches columns from fieldset via Apex wire
2. Recursively fetches hierarchical data (up to 5 levels deep)
3. Renders via `c-st-editable-tree-grid` (Pattern D)

**Configurable properties (from XML):** fieldSet, parentField, objectName

---

### Pattern F: Domain-Specific Field Asset Tree Grid
**Component:** `stFieldAssetTreeGrid`
**Architecture:** Heavy business-logic wrapper around `c-st-lwc-tree-grid` with:
- Install/Uninstall/Swap/Consume/Dispose/Make Available actions (each with confirmation modals)
- Specialized Apex controllers (`StFieldAssetReceiveController`)
- Asset-specific child components: `c-st-asset-adjustment`, `c-st-asset-swap`, `c-st-asset-consume`, `c-st-quantity-tracked-actions`
- Lightning Message Service: `AssetWorkGrid__c`, `StTrackerMessage__c`

**Component:** `stFieldAssetEditableTreeGrid`
**Architecture:** Similar domain wrapper but uses `c-st-editable-tree-grid` (Pattern D) instead

**Configurable properties (from XML):** fieldSetName, isEditableTreeGrid (deprecated)

---

### Pattern G: Many-to-Many Junction Manager
**Component:** `stManyToMany`
**Architecture:** Orchestrator for managing junction object records:
1. Junction table: `c-st-lwc-data-table` (Pattern A) showing existing junction records
2. Selection modal: `c-st-modal-wrapper` + `c-st-many-to-many-selection` for picking new records
3. Staging table: Another `c-st-lwc-data-table` instance for reviewing selections before save
- Comms: Lightning Message Service (`stDataTableMessage__c`)
- Data: Apex (`StManyToManyController.createJunctionRecords`)

**Configurable properties (from XML):** title, addNewLabel, selObjType, juncObjType, colFieldset, juncFieldset, juncEditFieldset, selLookup, masterLookup, allowJunctionDelete, tableSearchEnabled, tableFilterEnabled, tablePaginationEnabled, tableSortingEnabled, allowDuplicateJunctionRecords, tableFilterFieldAPI, addModalSize, selectionTableStyle, stagingTableStyle

---

## Shared Inner Components (reused across multiple patterns)

| Component | Used By | Purpose |
|-----------|---------|---------|
| `c-custom-data-table` | Pattern A | Extension of lightning-datatable with 11 custom column types |
| `c-st-paginator` | A, D | Page navigation (prev/next/page-size) |
| `c-st-illustration` | A, B | Empty/error state illustration |
| `c-st-lwc-card` | B | Card container with header, icon, actions |
| `c-st-editable-datatable-base` | B | The actual editable table renderer |
| `c-st-editable-tree-grid-header` | D | Custom sortable/filterable column headers |
| `c-st-editable-tree-grid-row` | D | Custom expandable/editable rows |
| `c-st-stencil-datatable` | B, D | Skeleton loading placeholder |
| `c-st-manage-columns` | B | Column visibility toggle panel |
| `c-st-pps-toolbar-search` | B | Search bar with record count |
| `c-st-live-refresh-poller` | B | Real-time data change polling |
| `c-st-modal-wrapper` | F, G | Generic modal container |
| `c-st-lwc-tree-grid` | F | Shared tree grid (different from stTreeGrid) |
| `c-st-many-to-many-selection` | G | Selection table for junction records |
| `c-st-alert-banner` | D | Alert/notification banner |

---

## Custom Column Types (from c-custom-data-table)

| Type Key | Template | Key TypeAttributes |
|----------|----------|--------------------|
| reference | customLookup.html | rowRecordId, fieldName, objectName, referenceField, lookupRecord, nameField, editable |
| customCurrency | customCurrency.html | multicurrencyMap, value, currentRecordCurrency, userCurrency, currencyDisplayAs, editable |
| picklist | customPicklist.html | value, picklistValues, rowRecordId, fieldName, editable |
| percent | customPercent.html | value, rowRecordId, fieldName, editable |
| customNumber | customNumber.html | value, rowRecordId, fieldName, min, max |
| inputText | customInputText.html | value, rowRecordId, fieldName, placeholder, disabled |
| treeLink | customTreeLink.html | value, display, css, customOnClick, target |
| customFirstColumn | customFirstColumn.html | errorType, message, value, valueId |
| customStatusBadge | customStatusBadge.html | value, theme, fullWidth |
| customLinkWithIcon | customLinkWithIcon.html | url, label, target, icon, iconTooltip |
| customAvatar | customAvatar.html | userId, userName, displayName, type, iconName, size |

---

## Storybook Recreation Priority

Based on complexity, reusability, and dependency relationships:

| Priority | Component | Pattern | Rationale |
|----------|-----------|---------|-----------|
| 1 | stLwcDataTable | A | Foundation — used by stManyToMany, most pages |
| 2 | stEditableDatatable | B | High-use — editable variant with live refresh |
| 3 | stTreeGrid | C | Standard tree — uses platform lightning-tree-grid |
| 4 | stEditableTreeGrid | D | Custom tree engine — used by E and F |
| 5 | stObjectEditableTreeGrid | E | Thin wrapper around D — quick once D is done |
| 6 | stManyToMany | G | Uses stLwcDataTable — quick once A is done |
| 7 | stFieldAssetTreeGrid | F | Domain-specific — heavy business logic |
| 8 | stFieldAssetEditableTreeGrid | F | Domain-specific — variant of F |
