import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { SLDSIcon, UtilityIcon } from "../shared/SLDSIcon";
import type {
  EditableDatatableProps,
  EditableColumn,
  EditableRow,
} from "./types";

// ─── Skeleton Loading Row ─────────────────────────────────────────────

const SkeletonRow: React.FC<{ colCount: number }> = ({ colCount }) => (
  <tr>
    {Array.from({ length: colCount }).map((_, i) => (
      <td key={i}>
        <div
          className="slds-is-animating-from-right"
          style={{
            height: "0.75rem",
            background: "#e0e0e0",
            borderRadius: "4px",
            width: i === 0 ? "70%" : "90%",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
      </td>
    ))}
  </tr>
);

// ─── Column Visibility Panel ──────────────────────────────────────────

interface ManageColumnsPanelProps {
  columns: EditableColumn[];
  onToggle: (fieldName: string) => void;
  onClose: () => void;
}

const ManageColumnsPanel: React.FC<ManageColumnsPanelProps> = ({
  columns,
  onToggle,
  onClose,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="slds-dropdown slds-dropdown_right slds-dropdown_medium"
      style={{ position: "absolute", right: 0, top: "2.5rem", zIndex: 9999 }}
    >
      <div
        className="slds-dropdown__header slds-grid slds-grid_align-spread slds-p-around_small"
        style={{ borderBottom: "1px solid #dddbda" }}
      >
        <span className="slds-text-heading_small">Manage Columns</span>
        <button
          className="slds-button slds-button_icon slds-button_icon-small"
          onClick={onClose}
        >
          <UtilityIcon name="close" size="x-small" />
        </button>
      </div>
      <ul
        className="slds-dropdown__list slds-p-around_x-small"
        style={{ maxHeight: "16rem", overflowY: "auto" }}
      >
        {columns.map((col) => (
          <li key={col.fieldName} className="slds-p-vertical_xx-small">
            <label className="slds-checkbox slds-p-horizontal_small">
              <input
                type="checkbox"
                checked={col.visible !== false}
                onChange={() => onToggle(col.fieldName)}
              />
              <span className="slds-checkbox_faux" />
              <span className="slds-form-element__label">{col.label}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

// ─── Cell Editor ─────────────────────────────────────────────────────

interface CellEditorProps {
  column: EditableColumn;
  value: unknown;
  rowId: string;
  hasError?: string;
  onChange: (rowId: string, field: string, value: unknown) => void;
}

const CellEditor: React.FC<CellEditorProps> = ({
  column,
  value,
  rowId,
  hasError,
  onChange,
}) => {
  const attrs = column.typeAttributes;
  const inputClass = `slds-input slds-input_small${hasError ? " slds-has-error" : ""}`;

  switch (column.type) {
    case "picklist":
      return (
        <div className={`slds-form-element${hasError ? " slds-has-error" : ""}`}>
          <div className="slds-form-element__control">
            <div className="slds-select_container">
              <select
                className="slds-select"
                value={value === null || value === undefined ? "" : String(value)}
                onChange={(e) => onChange(rowId, column.fieldName, e.target.value)}
              >
                <option value="">-- Select --</option>
                {attrs?.picklistValues?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {hasError && (
            <p className="slds-form-error slds-text-color_error" style={{ fontSize: "0.7rem" }}>
              {hasError}
            </p>
          )}
        </div>
      );

    case "boolean":
      return (
        <div className="slds-checkbox" style={{ display: "inline-flex", justifyContent: "center" }}>
          <input
            type="checkbox"
            id={`cell-${rowId}-${column.fieldName}`}
            checked={Boolean(value)}
            onChange={(e) => onChange(rowId, column.fieldName, e.target.checked)}
          />
          <label className="slds-checkbox__label" htmlFor={`cell-${rowId}-${column.fieldName}`}>
            <span className="slds-checkbox_faux" />
            <span className="slds-form-element__label slds-assistive-text">
              {column.label}
            </span>
          </label>
        </div>
      );

    case "textarea":
      return (
        <textarea
          className="slds-textarea"
          style={{ minHeight: "3rem", fontSize: "0.8rem" }}
          value={value === null || value === undefined ? "" : String(value)}
          onChange={(e) => onChange(rowId, column.fieldName, e.target.value)}
        />
      );

    default:
      return (
        <div className={`slds-form-element${hasError ? " slds-has-error" : ""}`}>
          <div className="slds-form-element__control">
            <input
              className={inputClass}
              type={
                column.type === "number" ||
                column.type === "currency" ||
                column.type === "percent"
                  ? "number"
                  : column.type === "date"
                    ? "date"
                    : column.type === "email"
                      ? "email"
                      : "text"
              }
              value={value === null || value === undefined ? "" : String(value)}
              placeholder={attrs?.placeholder}
              min={attrs?.min}
              max={attrs?.max}
              onChange={(e) =>
                onChange(
                  rowId,
                  column.fieldName,
                  column.type === "number" ||
                    column.type === "currency" ||
                    column.type === "percent"
                    ? Number(e.target.value)
                    : e.target.value
                )
              }
            />
          </div>
          {hasError && (
            <p className="slds-form-error slds-text-color_error" style={{ fontSize: "0.7rem" }}>
              {hasError}
            </p>
          )}
        </div>
      );
  }
};

// ─── Read-only Cell ───────────────────────────────────────────────────

function formatReadOnly(value: unknown, col: EditableColumn): React.ReactNode {
  if (value === null || value === undefined || value === "")
    return <span className="slds-text-color_weak">—</span>;

  const attrs = col.typeAttributes;
  switch (col.type) {
    case "currency":
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: attrs?.currencyCode ?? "USD",
        minimumFractionDigits: attrs?.fractionDigits ?? 2,
        maximumFractionDigits: attrs?.fractionDigits ?? 2,
      }).format(Number(value));
    case "percent":
      return `${Number(value).toFixed(attrs?.fractionDigits ?? 0)}%`;
    case "number":
      return new Intl.NumberFormat("en-US").format(Number(value));
    case "date":
      return new Date(String(value)).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    case "boolean":
      return value ? (
        <UtilityIcon name="check" size="x-small" className="slds-icon-text-success" />
      ) : null;
    case "picklist": {
      const opt = attrs?.picklistValues?.find((o) => o.value === String(value));
      return opt ? opt.label : String(value);
    }
    default:
      return String(value);
  }
}

// ─── Main Component ───────────────────────────────────────────────────

export const EditableDatatable: React.FC<EditableDatatableProps> = ({
  title = "Records",
  iconName = "standard:record",
  iconUrl,
  subtitle,
  columns,
  data,
  keyField = "Id",
  isReadOnly = false,
  enableSearch = true,
  showCountInSubHeader = true,
  allowSaveAndNew = false,
  saveButtonLabel = "Save",
  enableManageColumns = true,
  sortBy: initialSortBy = "",
  sortDirection: initialSortDir = "asc",
  loading = false,
  error,
  headerActions,
  secondaryHeaderActions,
  onSave,
  onSaveAndNew,
  onCancel,
  onRowDelete,
  onSort,
  onSearch,
  onCellChange,
}) => {
  // ── Column visibility state ──
  const [colVisibility, setColVisibility] = useState<Record<string, boolean>>(
    () => Object.fromEntries(columns.map((c) => [c.fieldName, c.visible !== false]))
  );
  const [showManageCols, setShowManageCols] = useState(false);

  // ── Edit state: rowId → { fieldName → newValue } ──
  const [edits, setEdits] = useState<Record<string, Record<string, unknown>>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, Record<string, string>>>({});
  const isDirty = Object.keys(edits).length > 0;

  // ── Search & sort ──
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [sortField, setSortField] = useState(initialSortBy);
  const [sortDir, setSortDir] = useState<"asc" | "desc">(initialSortDir);

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      setDebouncedSearch(val);
      onSearch?.(val);
    }, 250);
  };

  // ── Visible columns ──
  const visibleCols = useMemo(
    () => columns.filter((c) => colVisibility[c.fieldName] !== false),
    [columns, colVisibility]
  );

  // ── Filter + sort ──
  const processedData = useMemo(() => {
    let result = data;
    if (debouncedSearch) {
      const term = debouncedSearch.toLowerCase();
      result = result.filter((row) =>
        visibleCols.some((col) => {
          const val = row[col.fieldName];
          return val !== null && val !== undefined && String(val).toLowerCase().includes(term);
        })
      );
    }
    if (sortField) {
      result = [...result].sort((a, b) => {
        const av = a[sortField];
        const bv = b[sortField];
        if (av === bv) return 0;
        if (av == null) return 1;
        if (bv == null) return -1;
        const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true });
        return sortDir === "asc" ? cmp : -cmp;
      });
    }
    return result;
  }, [data, debouncedSearch, sortField, sortDir, visibleCols]);

  // ── Handlers ──
  const handleCellChange = useCallback(
    (rowId: string, field: string, value: unknown) => {
      setEdits((prev) => ({
        ...prev,
        [rowId]: { ...(prev[rowId] || {}), [field]: value },
      }));
      // Clear error on change
      setFieldErrors((prev) => {
        if (!prev[rowId]?.[field]) return prev;
        const next = { ...prev, [rowId]: { ...prev[rowId] } };
        delete next[rowId][field];
        return next;
      });
      onCellChange?.(rowId, field, value);
    },
    [onCellChange]
  );

  const validateEdits = useCallback((): boolean => {
    const errors: Record<string, Record<string, string>> = {};
    let valid = true;
    for (const [rowId, rowEdits] of Object.entries(edits)) {
      for (const [field] of Object.entries(rowEdits)) {
        const col = columns.find((c) => c.fieldName === field);
        if (!col) continue;
        const val = rowEdits[field];
        if (col.required && (val === "" || val === null || val === undefined)) {
          errors[rowId] = errors[rowId] || {};
          errors[rowId][field] = `${col.label} is required`;
          valid = false;
        }
      }
    }
    setFieldErrors(errors);
    return valid;
  }, [edits, columns]);

  const handleSave = useCallback(() => {
    if (!validateEdits()) return;
    onSave?.(edits);
    setEdits({});
    setFieldErrors({});
  }, [edits, onSave, validateEdits]);

  const handleSaveAndNew = useCallback(() => {
    if (!validateEdits()) return;
    onSaveAndNew?.(edits);
    setEdits({});
    setFieldErrors({});
  }, [edits, onSaveAndNew, validateEdits]);

  const handleCancel = useCallback(() => {
    setEdits({});
    setFieldErrors({});
    onCancel?.();
  }, [onCancel]);

  const handleSort = useCallback(
    (field: string) => {
      const newDir = field === sortField && sortDir === "asc" ? "desc" : "asc";
      setSortField(field);
      setSortDir(newDir);
      onSort?.(field, newDir);
    },
    [sortField, sortDir, onSort]
  );

  const handleColToggle = useCallback((fieldName: string) => {
    setColVisibility((prev) => ({ ...prev, [fieldName]: !prev[fieldName] }));
  }, []);

  // ── Icon parts ──
  const [iconCategory, iconKey] = (iconName || "standard:record").split(":");

  // ── Render ──

  return (
    <div className="slds-card" style={{ overflow: "visible" }}>
      {/* ── Card Header ── */}
      <div className="slds-card__header slds-grid slds-grid_vertical-align-center slds-p-horizontal_medium slds-p-vertical_small"
        style={{ borderBottom: "1px solid #dddbda" }}
      >
        {/* Icon + Title */}
        <div className="slds-media slds-media_center slds-has-flexi-truncate">
          <div className="slds-media__figure">
            {iconUrl ? (
              <img src={iconUrl} alt="" style={{ width: "2rem", height: "2rem" }} />
            ) : (
              <SLDSIcon
                category={iconCategory as "standard" | "utility"}
                name={iconKey || "record"}
                size="small"
              />
            )}
          </div>
          <div className="slds-media__body">
            <h2 className="slds-card__header-title slds-text-heading_small slds-truncate">
              {title}
              {showCountInSubHeader && !loading && (
                <span className="slds-text-body_regular slds-text-color_weak slds-m-left_x-small">
                  ({processedData.length})
                </span>
              )}
            </h2>
            {subtitle && (
              <p className="slds-text-body_small slds-text-color_weak slds-truncate">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Header actions */}
        <div className="slds-grid slds-grid_vertical-align-center" style={{ gap: "0.5rem", flexShrink: 0 }}>
          {/* Search */}
          {enableSearch && (
            <div className="slds-form-element">
              <div className="slds-form-element__control slds-input-has-icon slds-input-has-icon_left">
                <UtilityIcon
                  name="search"
                  size="x-small"
                  className="slds-icon-text-default slds-input__icon slds-input__icon_left"
                />
                <input
                  className="slds-input"
                  type="search"
                  placeholder="Search…"
                  value={searchTerm}
                  style={{ minWidth: "12rem" }}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
              </div>
            </div>
          )}

          {secondaryHeaderActions}
          {headerActions}

          {/* Manage columns */}
          {enableManageColumns && (
            <div style={{ position: "relative" }}>
              <button
                className="slds-button slds-button_icon slds-button_icon-border-filled"
                title="Manage Columns"
                onClick={() => setShowManageCols((v) => !v)}
              >
                <UtilityIcon name="settings" size="x-small" />
              </button>
              {showManageCols && (
                <ManageColumnsPanel
                  columns={columns}
                  onToggle={handleColToggle}
                  onClose={() => setShowManageCols(false)}
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Dirty Banner ── */}
      {isDirty && !isReadOnly && (
        <div
          className="slds-grid slds-grid_vertical-align-center slds-p-horizontal_medium slds-p-vertical_x-small slds-grid_align-spread"
          style={{ background: "#fafaf9", borderBottom: "1px solid #dddbda" }}
        >
          <span className="slds-text-body_small slds-text-color_weak">
            <UtilityIcon name="edit" size="xx-small" className="slds-m-right_xx-small slds-icon-text-default" />
            {Object.keys(edits).length} row{Object.keys(edits).length !== 1 ? "s" : ""} edited — unsaved changes
          </span>
          <div className="slds-grid" style={{ gap: "0.5rem" }}>
            <button className="slds-button slds-button_neutral slds-button_small" onClick={handleCancel}>
              Cancel
            </button>
            {allowSaveAndNew && (
              <button className="slds-button slds-button_neutral slds-button_small" onClick={handleSaveAndNew}>
                Save & New
              </button>
            )}
            <button className="slds-button slds-button_brand slds-button_small" onClick={handleSave}>
              {saveButtonLabel}
            </button>
          </div>
        </div>
      )}

      {/* ── Error Banner ── */}
      {error && (
        <div className="slds-notify slds-notify_alert slds-alert_error slds-m-around_small" role="alert">
          <UtilityIcon name="error" size="x-small" className="slds-m-right_x-small" />
          <span>{error}</span>
        </div>
      )}

      {/* ── Table ── */}
      <div className="slds-card__body" style={{ overflowX: "auto" }}>
        <table className="slds-table slds-table_cell-buffer slds-table_bordered" role="grid">
          <thead>
            <tr className="slds-line-height_reset">
              {visibleCols.map((col) => {
                const isSorted = sortField === col.fieldName;
                const canSort = col.sortable !== false;
                return (
                  <th
                    key={col.fieldName}
                    scope="col"
                    style={col.initialWidth ? { width: `${col.initialWidth}px` } : undefined}
                    aria-sort={isSorted ? (sortDir === "asc" ? "ascending" : "descending") : "none"}
                  >
                    <div className="slds-grid slds-grid_vertical-align-center">
                      <span
                        className={`slds-truncate${canSort ? " slds-th__action" : ""}`}
                        style={canSort ? { cursor: "pointer" } : undefined}
                        onClick={canSort ? () => handleSort(col.fieldName) : undefined}
                        title={col.label}
                      >
                        {col.label}
                        {col.required && (
                          <abbr className="slds-required slds-m-left_xx-small" title="required">
                            *
                          </abbr>
                        )}
                      </span>
                      {isSorted && (
                        <UtilityIcon
                          name={sortDir === "asc" ? "arrowup" : "arrowdown"}
                          size="xx-small"
                          className="slds-icon-text-default slds-m-left_xx-small"
                        />
                      )}
                    </div>
                  </th>
                );
              })}
              {/* Delete column if not read only */}
              {!isReadOnly && onRowDelete && (
                <th scope="col" style={{ width: "3rem" }}>
                  <span className="slds-assistive-text">Delete</span>
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <SkeletonRow key={i} colCount={visibleCols.length + (onRowDelete ? 1 : 0)} />
                ))
              : processedData.map((row) => {
                  const rowId = row[keyField] as string;
                  const rowEdits = edits[rowId] || {};
                  const rowErrors = fieldErrors[rowId] || {};
                  const isRowDirty = !!edits[rowId];

                  return (
                    <tr
                      key={rowId}
                      className={`slds-hint-parent${isRowDirty ? " slds-is-selected" : ""}`}
                      style={isRowDirty ? { background: "#f3f9ff" } : undefined}
                    >
                      {visibleCols.map((col) => {
                        const rawValue = row[col.fieldName];
                        const editedValue =
                          rowId in edits && col.fieldName in rowEdits
                            ? rowEdits[col.fieldName]
                            : rawValue;
                        const isEditable = col.editable && !isReadOnly;

                        return (
                          <td key={col.fieldName} data-label={col.label}>
                            {isEditable ? (
                              <CellEditor
                                column={col}
                                value={editedValue}
                                rowId={rowId}
                                hasError={rowErrors[col.fieldName]}
                                onChange={handleCellChange}
                              />
                            ) : (
                              <div
                                className="slds-truncate"
                                title={
                                  typeof editedValue === "string"
                                    ? editedValue
                                    : undefined
                                }
                              >
                                {formatReadOnly(editedValue, col)}
                              </div>
                            )}
                          </td>
                        );
                      })}

                      {/* Delete button */}
                      {!isReadOnly && onRowDelete && (
                        <td style={{ textAlign: "center" }}>
                          <button
                            className="slds-button slds-button_icon slds-button_icon-bare"
                            title="Delete row"
                            onClick={() => onRowDelete(rowId)}
                          >
                            <UtilityIcon name="delete" size="x-small" className="slds-icon-text-error" />
                          </button>
                        </td>
                      )}
                    </tr>
                  );
                })}
          </tbody>
        </table>

        {/* Empty state */}
        {!loading && processedData.length === 0 && (
          <div className="slds-p-around_large slds-text-align_center slds-text-color_weak">
            No records to display
          </div>
        )}
      </div>

      {/* ── Footer save bar (sticky alternative) ── */}
      {isDirty && !isReadOnly && (
        <div
          className="slds-card__footer slds-grid slds-grid_align-end slds-p-around_small"
          style={{ borderTop: "1px solid #dddbda", gap: "0.5rem" }}
        >
          <button className="slds-button slds-button_neutral" onClick={handleCancel}>
            Cancel
          </button>
          {allowSaveAndNew && (
            <button className="slds-button slds-button_neutral" onClick={handleSaveAndNew}>
              Save & New
            </button>
          )}
          <button className="slds-button slds-button_brand" onClick={handleSave}>
            {saveButtonLabel}
          </button>
        </div>
      )}

      {/* Skeleton pulse animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
};

export default EditableDatatable;
