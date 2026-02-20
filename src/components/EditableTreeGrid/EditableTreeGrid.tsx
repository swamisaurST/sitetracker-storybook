import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { SLDSIcon, UtilityIcon } from "../shared/SLDSIcon";
import type {
  EditableTreeGridProps,
  EditableTreeColumn,
  EditableTreeRow,
} from "./types";

// ─── Cell formatter ───────────────────────────────────────────────────

function formatCell(value: unknown, col: EditableTreeColumn): React.ReactNode {
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
        year: "numeric", month: "short", day: "numeric",
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

// ─── Inline cell editor ───────────────────────────────────────────────

interface InlineCellProps {
  col: EditableTreeColumn;
  value: unknown;
  rowId: string;
  hasError?: string;
  onChange: (rowId: string, field: string, value: unknown) => void;
}

const InlineCell: React.FC<InlineCellProps> = ({ col, value, rowId, hasError, onChange }) => {
  const attrs = col.typeAttributes;
  const inputClass = `slds-input slds-input_small${hasError ? " slds-has-error" : ""}`;

  if (col.type === "picklist") {
    return (
      <div className="slds-select_container" style={{ minWidth: "7rem" }}>
        <select
          className="slds-select"
          style={{ fontSize: "0.8rem", height: "1.75rem" }}
          value={value === null || value === undefined ? "" : String(value)}
          onChange={(e) => onChange(rowId, col.fieldName, e.target.value)}
        >
          <option value="">—</option>
          {attrs?.picklistValues?.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    );
  }

  if (col.type === "boolean") {
    return (
      <div className="slds-checkbox" style={{ display: "inline-flex" }}>
        <input
          type="checkbox"
          id={`tree-cell-${rowId}-${col.fieldName}`}
          checked={Boolean(value)}
          onChange={(e) => onChange(rowId, col.fieldName, e.target.checked)}
        />
        <label className="slds-checkbox__label" htmlFor={`tree-cell-${rowId}-${col.fieldName}`}>
          <span className="slds-checkbox_faux" />
          <span className="slds-form-element__label slds-assistive-text">{col.label}</span>
        </label>
      </div>
    );
  }

  return (
    <div className={`slds-form-element${hasError ? " slds-has-error" : ""}`}>
      <input
        className={inputClass}
        type={col.type === "number" || col.type === "currency" || col.type === "percent" ? "number" : col.type === "date" ? "date" : "text"}
        value={value === null || value === undefined ? "" : String(value)}
        min={attrs?.min}
        max={attrs?.max}
        style={{ minWidth: "6rem" }}
        onChange={(e) =>
          onChange(rowId, col.fieldName,
            col.type === "number" || col.type === "currency" || col.type === "percent"
              ? Number(e.target.value) : e.target.value)
        }
      />
      {hasError && <p className="slds-form-error" style={{ fontSize: "0.7rem" }}>{hasError}</p>}
    </div>
  );
};

// ─── Editable Tree Row (recursive) ───────────────────────────────────

interface EditableTreeRowComponentProps {
  row: EditableTreeRow;
  columns: EditableTreeColumn[];
  level: number;
  isReadOnly: boolean;
  expandedIds: Set<string>;
  edits: Record<string, Record<string, unknown>>;
  fieldErrors: Record<string, Record<string, string>>;
  openMenuId: string | null;
  keyField: string;
  onToggleExpand: (id: string) => void;
  onToggleMenu: (id: string) => void;
  onCellChange: (rowId: string, field: string, value: unknown) => void;
  onRowAction: (action: string, row: EditableTreeRow) => void;
}

const EditableTreeRowComponent: React.FC<EditableTreeRowComponentProps> = ({
  row, columns, level, isReadOnly, expandedIds, edits, fieldErrors,
  openMenuId, keyField, onToggleExpand, onToggleMenu, onCellChange, onRowAction,
}) => {
  const rowId = row[keyField] as string;
  const hasChildren = (row._children?.length ?? 0) > 0;
  const isExpanded = expandedIds.has(rowId);
  const rowEdits = edits[rowId] || {};
  const rowErrors = fieldErrors[rowId] || {};
  const isDirty = !!edits[rowId];

  return (
    <>
      <tr
        className={`slds-hint-parent${isDirty ? " slds-is-selected" : ""}`}
        style={isDirty ? { background: "#f3f9ff" } : undefined}
      >
        {columns.map((col, colIdx) => {
          const rawVal = row[col.fieldName];
          const editedVal = rowId in edits && col.fieldName in rowEdits ? rowEdits[col.fieldName] : rawVal;
          const canEdit = col.editable && !isReadOnly;

          if (colIdx === 0) {
            // First column: indentation + expand/collapse + content
            return (
              <td
                key={col.fieldName}
                style={{ paddingLeft: `${0.5 + level * 1.5}rem` }}
              >
                <div className="slds-grid slds-grid_vertical-align-center" style={{ gap: "0.25rem" }}>
                  {hasChildren ? (
                    <button
                      className="slds-button slds-button_icon slds-button_icon-bare slds-button_icon-x-small"
                      style={{ flexShrink: 0 }}
                      onClick={() => onToggleExpand(rowId)}
                    >
                      <UtilityIcon
                        name={isExpanded ? "chevrondown" : "chevronright"}
                        size="xx-small"
                        className="slds-icon-text-default"
                      />
                    </button>
                  ) : (
                    <span style={{ display: "inline-block", width: "1.5rem", flexShrink: 0 }} />
                  )}

                  {canEdit ? (
                    <InlineCell
                      col={col}
                      value={editedVal}
                      rowId={rowId}
                      hasError={rowErrors[col.fieldName]}
                      onChange={onCellChange}
                    />
                  ) : (
                    <div className="slds-truncate" title={typeof editedVal === "string" ? editedVal : undefined}>
                      {formatCell(editedVal, col)}
                    </div>
                  )}
                </div>
              </td>
            );
          }

          return (
            <td key={col.fieldName} data-label={col.label}>
              {canEdit ? (
                <InlineCell
                  col={col}
                  value={editedVal}
                  rowId={rowId}
                  hasError={rowErrors[col.fieldName]}
                  onChange={onCellChange}
                />
              ) : (
                <div className="slds-truncate">
                  {formatCell(editedVal, col)}
                </div>
              )}
            </td>
          );
        })}

        {/* Row actions */}
        <td style={{ width: "3rem", textAlign: "center" }}>
          <div style={{ position: "relative", display: "inline-block" }}>
            <button
              className="slds-button slds-button_icon slds-button_icon-border-filled slds-button_icon-x-small"
              onClick={() => onToggleMenu(rowId)}
            >
              <UtilityIcon name="down" size="xx-small" />
            </button>
            {openMenuId === rowId && (
              <div
                className="slds-dropdown slds-dropdown_right slds-dropdown_actions"
                style={{ position: "absolute", right: 0, zIndex: 9999 }}
              >
                <ul className="slds-dropdown__list" role="menu">
                  {["view", "edit"].map((action) => (
                    <li key={action} className="slds-dropdown__item" role="presentation">
                      <a href="#" role="menuitem" onClick={(e) => { e.preventDefault(); onRowAction(action, row); onToggleMenu(rowId); }}>
                        <span className="slds-truncate slds-text-transform_capitalize">{action}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </td>
      </tr>

      {/* Children */}
      {isExpanded && hasChildren &&
        row._children!.map((child) => (
          <EditableTreeRowComponent
            key={child[keyField] as string}
            row={child}
            columns={columns}
            level={level + 1}
            isReadOnly={isReadOnly}
            expandedIds={expandedIds}
            edits={edits}
            fieldErrors={fieldErrors}
            openMenuId={openMenuId}
            keyField={keyField}
            onToggleExpand={onToggleExpand}
            onToggleMenu={onToggleMenu}
            onCellChange={onCellChange}
            onRowAction={onRowAction}
          />
        ))}
    </>
  );
};

// ─── Main Component ───────────────────────────────────────────────────

function flattenRows(rows: EditableTreeRow[]): EditableTreeRow[] {
  const result: EditableTreeRow[] = [];
  const walk = (r: EditableTreeRow) => { result.push(r); r._children?.forEach(walk); };
  rows.forEach(walk);
  return result;
}

export const EditableTreeGrid: React.FC<EditableTreeGridProps> = ({
  title = "Records",
  iconName = "standard:record",
  columns,
  data,
  keyField = "Id",
  isReadOnly = false,
  enableSearch = true,
  expandOnLoad = false,
  loading = false,
  alertMessage,
  alertVariant = "info",
  headerActions,
  onSave,
  onCancel,
  onCellChange: externalOnCellChange,
  onSort,
  onExpandCollapse,
  onRowAction = () => {},
}) => {
  const [edits, setEdits] = useState<Record<string, Record<string, unknown>>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, Record<string, string>>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const allParentIds = useMemo(
    () => new Set(flattenRows(data).filter((r) => (r._children?.length ?? 0) > 0).map((r) => r[keyField] as string)),
    [data, keyField]
  );
  const [expandedIds, setExpandedIds] = useState<Set<string>>(expandOnLoad ? allParentIds : new Set());

  const isDirty = Object.keys(edits).length > 0;

  const handleCellChange = useCallback(
    (rowId: string, field: string, value: unknown) => {
      setEdits((prev) => ({ ...prev, [rowId]: { ...(prev[rowId] || {}), [field]: value } }));
      setFieldErrors((prev) => {
        if (!prev[rowId]?.[field]) return prev;
        const next = { ...prev, [rowId]: { ...prev[rowId] } };
        delete next[rowId][field];
        return next;
      });
      externalOnCellChange?.(rowId, field, value);
    },
    [externalOnCellChange]
  );

  const handleSave = useCallback(() => {
    // Validate required fields
    const errors: Record<string, Record<string, string>> = {};
    let valid = true;
    for (const [rowId, rowEdits] of Object.entries(edits)) {
      for (const field of Object.keys(rowEdits)) {
        const col = columns.find((c) => c.fieldName === field);
        if (col?.required && !rowEdits[field]) {
          errors[rowId] = errors[rowId] || {};
          errors[rowId][field] = `${col.label} is required`;
          valid = false;
        }
      }
    }
    if (!valid) { setFieldErrors(errors); return; }
    onSave?.(edits);
    setEdits({});
    setFieldErrors({});
  }, [edits, columns, onSave]);

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

  const handleToggleExpand = useCallback(
    (id: string) => {
      setExpandedIds((prev) => {
        const next = new Set(prev);
        const nowExpanded = !next.has(id);
        nowExpanded ? next.add(id) : next.delete(id);
        onExpandCollapse?.(id, nowExpanded);
        return next;
      });
    },
    [onExpandCollapse]
  );

  const expandAll = useCallback(() => setExpandedIds(allParentIds), [allParentIds]);
  const collapseAll = useCallback(() => setExpandedIds(new Set()), []);

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => setDebouncedSearch(val), 250);
  };

  // Filter root-level rows (children are rendered recursively)
  const visibleData = useMemo(() => {
    if (!debouncedSearch) return data;
    const term = debouncedSearch.toLowerCase();
    const rowMatches = (row: EditableTreeRow): boolean => {
      const selfMatch = columns.some((col) => {
        const val = row[col.fieldName];
        return val !== null && val !== undefined && String(val).toLowerCase().includes(term);
      });
      return selfMatch || (row._children?.some(rowMatches) ?? false);
    };
    return data.filter(rowMatches);
  }, [data, debouncedSearch, columns]);

  const flatCount = useMemo(() => flattenRows(data).length, [data]);
  const [iconCategory, iconKey] = (iconName || "standard:record").split(":");

  return (
    <div className="slds-card" style={{ overflow: "visible" }}>
      {/* ── Header ── */}
      <div
        className="slds-card__header slds-grid slds-grid_vertical-align-center slds-p-horizontal_medium slds-p-vertical_small"
        style={{ borderBottom: "1px solid #dddbda" }}
      >
        <div className="slds-media slds-media_center slds-has-flexi-truncate">
          <div className="slds-media__figure">
            <SLDSIcon category={iconCategory as "standard" | "utility"} name={iconKey || "record"} size="small" />
          </div>
          <div className="slds-media__body">
            <h2 className="slds-card__header-title slds-text-heading_small slds-truncate">
              {title}
              <span className="slds-text-body_regular slds-text-color_weak slds-m-left_x-small">({flatCount})</span>
            </h2>
          </div>
        </div>

        <div className="slds-grid slds-grid_vertical-align-center" style={{ gap: "0.5rem", flexShrink: 0 }}>
          {enableSearch && (
            <div className="slds-form-element">
              <div className="slds-form-element__control slds-input-has-icon slds-input-has-icon_left">
                <UtilityIcon name="search" size="x-small" className="slds-icon-text-default slds-input__icon slds-input__icon_left" />
                <input
                  className="slds-input"
                  type="search"
                  placeholder="Search…"
                  value={searchTerm}
                  style={{ minWidth: "10rem" }}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="slds-button-group" role="group">
            <button className="slds-button slds-button_neutral slds-button_small" onClick={expandAll}>
              <UtilityIcon name="expand_all" size="xx-small" className="slds-button__icon slds-button__icon_left" />
              Expand All
            </button>
            <button className="slds-button slds-button_neutral slds-button_small" onClick={collapseAll}>
              <UtilityIcon name="collapse_all" size="xx-small" className="slds-button__icon slds-button__icon_left" />
              Collapse All
            </button>
          </div>

          {headerActions}
        </div>
      </div>

      {/* ── Alert banner ── */}
      {alertMessage && (
        <div
          className={`slds-notify slds-notify_alert slds-alert_${alertVariant === "error" ? "error" : alertVariant === "warning" ? "warning" : "info"} slds-m-around_small`}
          role="alert"
        >
          <UtilityIcon
            name={alertVariant === "error" ? "error" : alertVariant === "warning" ? "warning" : "info"}
            size="x-small"
            className="slds-m-right_x-small"
          />
          <span>{alertMessage}</span>
        </div>
      )}

      {/* ── Dirty banner ── */}
      {isDirty && !isReadOnly && (
        <div
          className="slds-grid slds-grid_vertical-align-center slds-grid_align-spread slds-p-horizontal_medium slds-p-vertical_x-small"
          style={{ background: "#fafaf9", borderBottom: "1px solid #dddbda" }}
        >
          <span className="slds-text-body_small slds-text-color_weak">
            {Object.keys(edits).length} row{Object.keys(edits).length !== 1 ? "s" : ""} with unsaved changes
          </span>
          <div className="slds-grid" style={{ gap: "0.5rem" }}>
            <button className="slds-button slds-button_neutral slds-button_small" onClick={handleCancel}>Cancel</button>
            <button className="slds-button slds-button_brand slds-button_small" onClick={handleSave}>Save</button>
          </div>
        </div>
      )}

      {/* ── Table ── */}
      <div className="slds-card__body" style={{ overflowX: "auto" }}>
        <table className="slds-table slds-table_cell-buffer slds-table_bordered" role="treegrid">
          <thead>
            <tr className="slds-line-height_reset">
              {columns.map((col) => {
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
                        {col.required && <abbr className="slds-required" title="required">*</abbr>}
                      </span>
                      {isSorted && (
                        <UtilityIcon name={sortDir === "asc" ? "arrowup" : "arrowdown"} size="xx-small" className="slds-icon-text-default slds-m-left_xx-small" />
                      )}
                    </div>
                  </th>
                );
              })}
              <th scope="col" style={{ width: "3rem" }}>
                <span className="slds-assistive-text">Actions</span>
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  {columns.map((col) => (
                    <td key={col.fieldName}>
                      <div style={{ height: "0.75rem", background: "#e0e0e0", borderRadius: "4px", animation: "pulse 1.5s ease-in-out infinite", width: "80%" }} />
                    </td>
                  ))}
                  <td />
                </tr>
              ))
            ) : visibleData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="slds-text-align_center slds-p-around_medium slds-text-color_weak">
                  No records to display
                </td>
              </tr>
            ) : (
              visibleData.map((row) => (
                <EditableTreeRowComponent
                  key={row[keyField] as string}
                  row={row}
                  columns={columns}
                  level={0}
                  isReadOnly={isReadOnly}
                  expandedIds={expandedIds}
                  edits={edits}
                  fieldErrors={fieldErrors}
                  openMenuId={openMenuId}
                  keyField={keyField}
                  onToggleExpand={handleToggleExpand}
                  onToggleMenu={(id) => setOpenMenuId(openMenuId === id ? null : id)}
                  onCellChange={handleCellChange}
                  onRowAction={onRowAction}
                />
              ))
            )}
          </tbody>
        </table>

        {!loading && visibleData.length === 0 && data.length > 0 && debouncedSearch && (
          <div className="slds-p-around_medium slds-text-align_center slds-text-color_weak">
            No results for "{debouncedSearch}"
          </div>
        )}
      </div>

      {/* Footer save */}
      {isDirty && !isReadOnly && (
        <div className="slds-card__footer slds-grid slds-grid_align-end slds-p-around_small" style={{ borderTop: "1px solid #dddbda", gap: "0.5rem" }}>
          <button className="slds-button slds-button_neutral" onClick={handleCancel}>Cancel</button>
          <button className="slds-button slds-button_brand" onClick={handleSave}>Save</button>
        </div>
      )}

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.4} }
      `}</style>
    </div>
  );
};

export default EditableTreeGrid;
