export type TreeGridMode = "linked-list" | "linked-list-root" | "parent-child";

export type SummaryOperation = "count" | "sum" | "avg" | "min" | "max";

export interface ColumnSummary {
  fieldName: string;
  operation: SummaryOperation;
  label?: string;
}

export interface TreeGridColumn {
  label: string;
  fieldName: string;
  type?: "text" | "currency" | "percent" | "date" | "number" | "boolean" | "url";
  initialWidth?: number;
  sortable?: boolean;
  typeAttributes?: {
    currencyCode?: string;
    fractionDigits?: number;
  };
}

export interface TreeGridRow {
  Id: string;
  _children?: TreeGridRow[];
  _level?: number;
  [key: string]: unknown;
}

export interface TreeGridProps {
  // Card
  title?: string;
  iconName?: string;

  // Data
  columns: TreeGridColumn[];
  data: TreeGridRow[];
  keyField?: string;

  // Mode
  mode?: TreeGridMode;

  // Features
  enableSearch?: boolean;
  enableScrolling?: boolean;
  gridHeightPixels?: number;
  expandOnLoad?: boolean;

  // Column summaries
  columnSummaries?: ColumnSummary[];
  summaryRowLabel?: string;

  // CRUD
  allowAddNew?: boolean;
  addNewLabel?: string;
  allowDelete?: boolean;

  // State
  loading?: boolean;

  // Slot
  filterSlot?: React.ReactNode;

  // Callbacks
  onAddNew?: () => void;
  onDelete?: (rowId: string) => void;
  onRowAction?: (action: string, row: TreeGridRow) => void;
  onExpandCollapse?: (rowId: string, expanded: boolean) => void;
}
