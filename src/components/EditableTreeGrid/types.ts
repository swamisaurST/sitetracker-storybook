export type ColumnType =
  | "text"
  | "currency"
  | "percent"
  | "date"
  | "number"
  | "boolean"
  | "picklist"
  | "url";

export interface PicklistOption {
  label: string;
  value: string;
}

export interface EditableTreeColumn {
  label: string;
  fieldName: string;
  type?: ColumnType;
  editable?: boolean;
  sortable?: boolean;
  filterable?: boolean;
  resizable?: boolean;
  visible?: boolean;
  initialWidth?: number;
  required?: boolean;
  typeAttributes?: {
    currencyCode?: string;
    fractionDigits?: number;
    picklistValues?: PicklistOption[];
    min?: number;
    max?: number;
  };
}

export interface EditableTreeRow {
  Id: string;
  _children?: EditableTreeRow[];
  _isDirty?: boolean;
  _isNew?: boolean;
  _errors?: Record<string, string>;
  [key: string]: unknown;
}

export interface EditableTreeGridProps {
  // Data
  columns: EditableTreeColumn[];
  data: EditableTreeRow[];
  keyField?: string;

  // Header
  title?: string;
  iconName?: string;

  // Features
  isReadOnly?: boolean;
  enableSearch?: boolean;
  expandOnLoad?: boolean;
  enablePagination?: boolean;
  paginateSize?: number;
  enableColumnFiltering?: boolean;

  // States
  loading?: boolean;
  alertMessage?: string;
  alertVariant?: "info" | "warning" | "error";

  // Header actions slot
  headerActions?: React.ReactNode;

  // Callbacks
  onSave?: (changes: Record<string, Partial<EditableTreeRow>>) => void;
  onCancel?: () => void;
  onCellChange?: (rowId: string, field: string, value: unknown) => void;
  onSort?: (field: string, direction: "asc" | "desc") => void;
  onExpandCollapse?: (rowId: string, expanded: boolean) => void;
  onRowAction?: (action: string, row: EditableTreeRow) => void;
}
