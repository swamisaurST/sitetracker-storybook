export type ColumnType =
  | "text"
  | "currency"
  | "percent"
  | "date"
  | "number"
  | "email"
  | "phone"
  | "url"
  | "boolean"
  | "picklist"
  | "reference"
  | "textarea";

export interface PicklistOption {
  label: string;
  value: string;
}

export interface EditableColumn {
  label: string;
  fieldName: string;
  type: ColumnType;
  editable?: boolean;
  required?: boolean;
  sortable?: boolean;
  visible?: boolean;
  initialWidth?: number;
  typeAttributes?: {
    currencyCode?: string;
    fractionDigits?: number;
    picklistValues?: PicklistOption[];
    placeholder?: string;
    max?: number;
    min?: number;
  };
}

export interface EditableRow {
  Id: string;
  _isDirty?: boolean;
  _isNew?: boolean;
  _errors?: Record<string, string>;
  [key: string]: unknown;
}

export interface EditableDatatableProps {
  // Card
  title?: string;
  iconName?: string;
  iconUrl?: string;
  subtitle?: string;

  // Data
  columns: EditableColumn[];
  data: EditableRow[];
  keyField?: string;

  // Features
  isReadOnly?: boolean;
  enableSearch?: boolean;
  showCountInSubHeader?: boolean;
  allowSaveAndNew?: boolean;
  saveButtonLabel?: string;

  // Column management
  enableManageColumns?: boolean;

  // Sorting
  sortBy?: string;
  sortDirection?: "asc" | "desc";

  // States
  loading?: boolean;
  error?: string;

  // Header action slots (rendered as ReactNode)
  headerActions?: React.ReactNode;
  secondaryHeaderActions?: React.ReactNode;

  // Callbacks
  onSave?: (changes: Record<string, Partial<EditableRow>>) => void;
  onSaveAndNew?: (changes: Record<string, Partial<EditableRow>>) => void;
  onCancel?: () => void;
  onRowDelete?: (rowId: string) => void;
  onSort?: (field: string, direction: "asc" | "desc") => void;
  onSearch?: (term: string) => void;
  onCellChange?: (rowId: string, field: string, value: unknown) => void;
}
