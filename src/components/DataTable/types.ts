export type StandardColumnType =
  | "text"
  | "currency"
  | "percent"
  | "date"
  | "number"
  | "email"
  | "phone"
  | "url"
  | "boolean"
  | "action";

export type CustomColumnType =
  | "reference"
  | "customCurrency"
  | "picklist"
  | "customNumber"
  | "inputText"
  | "treeLink"
  | "customFirstColumn"
  | "customStatusBadge"
  | "customLinkWithIcon"
  | "customAvatar";

export type ColumnType = StandardColumnType | CustomColumnType;

export interface TypeAttributes {
  currencyCode?: string;
  fractionDigits?: number;
  rowRecordId?: string;
  objectName?: string;
  referenceField?: string;
  picklistValues?: Array<{ label: string; value: string }>;
  multicurrencyMap?: Record<string, number>;
  theme?: string;
  icon?: string;
  url?: string;
  label?: string;
  target?: string;
  fullWidth?: boolean;
}

export interface Column {
  label: string;
  fieldName: string;
  type: ColumnType;
  sortable?: boolean;
  editable?: boolean;
  typeAttributes?: TypeAttributes;
  initialWidth?: number;
}

export interface RowAction {
  label: string;
  name: string;
  iconName?: string;
  disabled?: boolean;
}

export interface DataTableRow {
  Id: string;
  [key: string]: unknown;
}

export interface DataTableProps {
  // Header & Label
  showLabel?: boolean;
  customLabel?: string;
  iconUrl?: string;
  hideHeader?: boolean;
  hideCount?: boolean;
  hideTotalRecordsInHeader?: boolean;

  // Data & Schema
  columns: Column[];
  data: DataTableRow[];
  keyField?: string;

  // Search
  hideSearch?: boolean;
  searchPlaceholderLabel?: string;

  // Pagination
  paginateSize?: number;

  // Sorting
  sortBy?: string;
  defaultSortDirection?: "asc" | "desc";
  disableSorting?: boolean;

  // Filtering
  disableFiltering?: boolean;

  // Selection
  hideCheckboxColumn?: boolean;
  maxRowSelection?: number;

  // CRUD
  allowRecordCreation?: boolean;
  allowRecordDeletion?: boolean;
  addButtonLabel?: string;
  newButtonDisabled?: boolean;
  newButtonTitle?: string;

  // Appearance
  variant?: "base" | "striped";

  // States
  loading?: boolean;
  showIllustrationOnNoRows?: boolean;
  illustrationText?: string;

  // Advanced
  rowActions?: RowAction[];
  addErrorColumn?: boolean;
  summaryFields?: string[];
  editableFields?: string[];

  // Callbacks
  onRowSelection?: (selectedIds: string[]) => void;
  onRecordCreate?: () => void;
  onRecordDelete?: (deletedIds: string[]) => void;
  onRowAction?: (action: RowAction, row: DataTableRow) => void;
  onCellEdit?: (rowId: string, fieldName: string, value: unknown) => void;
  onSort?: (fieldName: string, direction: "asc" | "desc") => void;
}
