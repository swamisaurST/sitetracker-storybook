export type FieldType =
  | "text"
  | "number"
  | "date"
  | "boolean"
  | "picklist"
  | "url"
  | "email"
  | "phone";

export interface PicklistOption {
  label: string;
  value: string;
}

export interface FieldsetField {
  /** Salesforce API name for the field (used as the key in save payload) */
  apiName: string;
  /** Display label shown to the user */
  label: string;
  /** Input type — drives the control rendered in edit mode */
  type: FieldType;
  /** Current field value */
  value?: string | number | boolean;
  /** Mark as required — prevents save if empty */
  required?: boolean;
  /** Disable this field (shows read-only even in edit mode) */
  disabled?: boolean;
  /** Options for picklist type fields */
  picklistOptions?: PicklistOption[];
}

export interface FieldsetContainerProps {
  /** Card header title */
  title?: string;
  /** Whether the edit button is shown in the header */
  isEditable?: boolean;
  /** Start in edit mode instead of read mode */
  defaultEditMode?: boolean;
  /** Array of field definitions to display */
  fields: FieldsetField[];
  /** Callback fired with the current form values object on save */
  onSave?: (values: Record<string, string | number | boolean>) => void;
  /** Callback fired when the user clicks cancel in edit mode */
  onCancel?: () => void;
}
