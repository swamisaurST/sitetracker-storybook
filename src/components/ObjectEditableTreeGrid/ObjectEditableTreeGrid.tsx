import React from "react";
import { EditableTreeGrid } from "../EditableTreeGrid/EditableTreeGrid";
import type { EditableTreeColumn, EditableTreeRow } from "../EditableTreeGrid/types";

/**
 * stObjectEditableTreeGrid — Pattern E.
 * A thin wrapper around stEditableTreeGrid that adds:
 *  - Object API name + fieldset configuration (simulated here as pre-built columns)
 *  - Recursive parent-field hierarchy fetching (simulated here with pre-built nested data)
 *
 * In Salesforce, this component wire-calls Apex to dynamically resolve
 * columns from a fieldset and data from up to 5 levels of parentField recursion.
 * In Storybook, columns and data are passed directly.
 */
export interface ObjectEditableTreeGridProps {
  objectName?: string;
  fieldSet?: string;
  parentField?: string;
  title?: string;
  iconName?: string;
  columns: EditableTreeColumn[];
  data: EditableTreeRow[];
  isReadOnly?: boolean;
  loading?: boolean;
  expandOnLoad?: boolean;
  onSave?: (changes: Record<string, Partial<EditableTreeRow>>) => void;
  onCancel?: () => void;
  onCellChange?: (rowId: string, field: string, value: unknown) => void;
}

export const ObjectEditableTreeGrid: React.FC<ObjectEditableTreeGridProps> = ({
  objectName = "Account",
  fieldSet = "Default",
  parentField = "ParentId",
  title,
  iconName = "standard:record",
  columns,
  data,
  isReadOnly = false,
  loading = false,
  expandOnLoad = false,
  onSave,
  onCancel,
  onCellChange,
}) => {
  const resolvedTitle = title || `${objectName} Hierarchy`;

  return (
    <div>
      {/* Config badge — shows resolved object/fieldset/parentField in Storybook only */}
      <div className="slds-box slds-box_x-small slds-m-bottom_small slds-theme_shade slds-text-body_small slds-text-color_weak" style={{ borderRadius: "4px" }}>
        <span className="slds-m-right_small">
          <strong>Object:</strong> {objectName}
        </span>
        <span className="slds-m-right_small">
          <strong>Field Set:</strong> {fieldSet}
        </span>
        <span>
          <strong>Parent Field:</strong> {parentField}
        </span>
      </div>

      <EditableTreeGrid
        title={resolvedTitle}
        iconName={iconName}
        columns={columns}
        data={data}
        isReadOnly={isReadOnly}
        loading={loading}
        expandOnLoad={expandOnLoad}
        onSave={onSave}
        onCancel={onCancel}
        onCellChange={onCellChange}
      />
    </div>
  );
};

export default ObjectEditableTreeGrid;
