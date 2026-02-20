import React, { useState, useMemo, useCallback, useRef } from "react";
import { SLDSIcon, UtilityIcon } from "../shared/SLDSIcon";
import type { TreeGridProps, TreeGridRow, TreeGridColumn, ColumnSummary } from "./types";

// ─── Formatters ───────────────────────────────────────────────────────

function formatCell(value: unknown, col: TreeGridColumn): React.ReactNode {
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
    case "url":
      return <a href={String(value)} target="_blank" rel="noopener noreferrer">{String(value)}</a>;
    default:
      return String(value);
  }
}

// ─── Summary calculation ──────────────────────────────────────────────

function computeSummary(
  flatRows: TreeGridRow[],
  summary: ColumnSummary
): string {
  const vals = flatRows
    .map((r) => Number(r[summary.fieldName]))
    .filter((v) => !isNaN(v));
  if (vals.length === 0) return "—";
  switch (summary.operation) {
    case "count": return String(flatRows.length);
    case "sum": return new Intl.NumberFormat("en-US").format(vals.reduce((a, b) => a + b, 0));
    case "avg": return new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(
      vals.reduce((a, b) => a + b, 0) / vals.length
    );
    case "min": return String(Math.min(...vals));
    case "max": return String(Math.max(...vals));
  }
}

function flattenRows(rows: TreeGridRow[]): TreeGridRow[] {
  const result: TreeGridRow[] = [];
  const walk = (r: TreeGridRow) => {
    result.push(r);
    r._children?.forEach(walk);
  };
  rows.forEach(walk);
  return result;
}

// ─── Row context menu ─────────────────────────────────────────────────

interface RowMenuProps {
  row: TreeGridRow;
  allowDelete?: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onAction: (action: string, row: TreeGridRow) => void;
}

const RowMenu: React.FC<RowMenuProps> = ({ row, allowDelete, isOpen, onToggle, onAction }) => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
      <button
        className="slds-button slds-button_icon slds-button_icon-border-filled slds-button_icon-x-small"
        onClick={onToggle}
      >
        <UtilityIcon name="down" size="xx-small" />
        <span className="slds-assistive-text">Row actions</span>
      </button>
      {isOpen && (
        <div
          className="slds-dropdown slds-dropdown_right slds-dropdown_actions"
          style={{ position: "absolute", right: 0, zIndex: 9999 }}
        >
          <ul className="slds-dropdown__list" role="menu">
            {["View", "Edit"].map((action) => (
              <li key={action} className="slds-dropdown__item" role="presentation">
                <a href="#" role="menuitem" onClick={(e) => { e.preventDefault(); onAction(action.toLowerCase(), row); onToggle(); }}>
                  <span className="slds-truncate">{action}</span>
                </a>
              </li>
            ))}
            {allowDelete && (
              <li className="slds-dropdown__item slds-has-divider_top-space" role="presentation">
                <a href="#" role="menuitem" className="slds-text-color_error"
                  onClick={(e) => { e.preventDefault(); onAction("delete", row); onToggle(); }}>
                  <span className="slds-truncate">Delete</span>
                </a>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

// ─── Tree Row (recursive) ─────────────────────────────────────────────

interface TreeRowProps {
  row: TreeGridRow;
  columns: TreeGridColumn[];
  level: number;
  expandedIds: Set<string>;
  openMenuId: string | null;
  allowDelete?: boolean;
  keyField: string;
  onToggleExpand: (id: string) => void;
  onToggleMenu: (id: string) => void;
  onRowAction: (action: string, row: TreeGridRow) => void;
  searchTerm: string;
}

const TreeRow: React.FC<TreeRowProps> = ({
  row,
  columns,
  level,
  expandedIds,
  openMenuId,
  allowDelete,
  keyField,
  onToggleExpand,
  onToggleMenu,
  onRowAction,
  searchTerm,
}) => {
  const rowId = row[keyField] as string;
  const hasChildren = (row._children?.length ?? 0) > 0;
  const isExpanded = expandedIds.has(rowId);

  // Filter: show row if any field matches, or if it has visible children
  const matchesTerm = !searchTerm || columns.some((col) => {
    const val = row[col.fieldName];
    return val !== null && val !== undefined && String(val).toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (!matchesTerm && !hasChildren) return null;

  return (
    <>
      <tr className="slds-hint-parent">
        {/* Expand/collapse + first column */}
        <td style={{ paddingLeft: `${0.75 + level * 1.5}rem` }}>
          <div className="slds-grid slds-grid_vertical-align-center" style={{ gap: "0.25rem" }}>
            {hasChildren ? (
              <button
                className="slds-button slds-button_icon slds-button_icon-bare slds-button_icon-x-small"
                onClick={() => onToggleExpand(rowId)}
                aria-expanded={isExpanded}
              >
                <UtilityIcon
                  name={isExpanded ? "chevrondown" : "chevronright"}
                  size="xx-small"
                  className="slds-icon-text-default"
                />
                <span className="slds-assistive-text">
                  {isExpanded ? "Collapse" : "Expand"}
                </span>
              </button>
            ) : (
              <span style={{ display: "inline-block", width: "1.5rem" }} />
            )}
            <span className="slds-truncate" title={String(row[columns[0]?.fieldName] ?? "")}>
              {formatCell(row[columns[0]?.fieldName], columns[0])}
            </span>
          </div>
        </td>

        {/* Remaining columns */}
        {columns.slice(1).map((col) => (
          <td key={col.fieldName} data-label={col.label}>
            <div className="slds-truncate">
              {formatCell(row[col.fieldName], col)}
            </div>
          </td>
        ))}

        {/* Row actions */}
        <td style={{ width: "3rem", textAlign: "center" }}>
          <RowMenu
            row={row}
            allowDelete={allowDelete}
            isOpen={openMenuId === rowId}
            onToggle={() => onToggleMenu(rowId)}
            onAction={onRowAction}
          />
        </td>
      </tr>

      {/* Children (recursive) */}
      {isExpanded && hasChildren &&
        row._children!.map((child) => (
          <TreeRow
            key={child[keyField] as string}
            row={child}
            columns={columns}
            level={level + 1}
            expandedIds={expandedIds}
            openMenuId={openMenuId}
            allowDelete={allowDelete}
            keyField={keyField}
            onToggleExpand={onToggleExpand}
            onToggleMenu={onToggleMenu}
            onRowAction={onRowAction}
            searchTerm={searchTerm}
          />
        ))}
    </>
  );
};

// ─── Main Component ───────────────────────────────────────────────────

export const TreeGrid: React.FC<TreeGridProps> = ({
  title = "Records",
  iconName = "standard:record",
  columns,
  data,
  keyField = "Id",
  enableSearch = true,
  enableScrolling = false,
  gridHeightPixels = 400,
  expandOnLoad = false,
  columnSummaries = [],
  summaryRowLabel = "Total",
  allowAddNew = false,
  addNewLabel = "New",
  allowDelete = false,
  loading = false,
  filterSlot,
  onAddNew,
  onDelete,
  onRowAction = () => {},
  onExpandCollapse,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Collect all root IDs for expand-on-load
  const allRootIds = useMemo(
    () => new Set(data.filter((r) => (r._children?.length ?? 0) > 0).map((r) => r[keyField] as string)),
    [data, keyField]
  );

  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    expandOnLoad ? allRootIds : new Set()
  );

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => setDebouncedSearch(val), 250);
  };

  const handleToggleExpand = useCallback(
    (id: string) => {
      setExpandedIds((prev) => {
        const next = new Set(prev);
        const isNowExpanded = !next.has(id);
        if (isNowExpanded) next.add(id);
        else next.delete(id);
        onExpandCollapse?.(id, isNowExpanded);
        return next;
      });
    },
    [onExpandCollapse]
  );

  const expandAll = useCallback(() => {
    const all = new Set<string>();
    const walk = (rows: TreeGridRow[]) =>
      rows.forEach((r) => {
        if ((r._children?.length ?? 0) > 0) {
          all.add(r[keyField] as string);
          walk(r._children!);
        }
      });
    walk(data);
    setExpandedIds(all);
  }, [data, keyField]);

  const collapseAll = useCallback(() => setExpandedIds(new Set()), []);

  const handleRowAction = useCallback(
    (action: string, row: TreeGridRow) => {
      if (action === "delete") onDelete?.(row[keyField] as string);
      else onRowAction?.(action, row);
      setOpenMenuId(null);
    },
    [onDelete, onRowAction, keyField]
  );

  const flatRows = useMemo(() => flattenRows(data), [data]);
  const [iconCategory, iconKey] = (iconName || "standard:record").split(":");

  const tableStyle: React.CSSProperties = enableScrolling
    ? { maxHeight: `${gridHeightPixels}px`, overflowY: "auto" }
    : {};

  return (
    <div className="slds-card" style={{ overflow: "visible" }}>
      {/* ── Card Header ── */}
      <div
        className="slds-card__header slds-grid slds-grid_vertical-align-center slds-p-horizontal_medium slds-p-vertical_small"
        style={{ borderBottom: "1px solid #dddbda" }}
      >
        {/* Title */}
        <div className="slds-media slds-media_center slds-has-flexi-truncate">
          <div className="slds-media__figure">
            <SLDSIcon
              category={iconCategory as "standard" | "utility"}
              name={iconKey || "record"}
              size="small"
            />
          </div>
          <div className="slds-media__body">
            <h2 className="slds-card__header-title slds-text-heading_small slds-truncate">
              {title}
              <span className="slds-text-body_regular slds-text-color_weak slds-m-left_x-small">
                ({flatRows.length})
              </span>
            </h2>
          </div>
        </div>

        {/* Controls */}
        <div className="slds-grid slds-grid_vertical-align-center" style={{ gap: "0.5rem", flexShrink: 0 }}>
          {filterSlot}

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
                  style={{ minWidth: "10rem" }}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Expand / Collapse buttons */}
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

          {allowAddNew && (
            <button className="slds-button slds-button_brand slds-button_small" onClick={onAddNew}>
              <UtilityIcon name="add" size="xx-small" className="slds-button__icon slds-button__icon_left" />
              {addNewLabel}
            </button>
          )}
        </div>
      </div>

      {/* ── Table ── */}
      <div className="slds-card__body" style={{ overflowX: "auto" }}>
        <div style={tableStyle}>
          <table className="slds-table slds-table_cell-buffer slds-table_bordered" role="treegrid">
            <thead>
              <tr className="slds-line-height_reset">
                {columns.map((col, i) => (
                  <th
                    key={col.fieldName}
                    scope="col"
                    style={col.initialWidth ? { width: `${col.initialWidth}px` } : i === 0 ? { minWidth: "14rem" } : undefined}
                  >
                    <span className="slds-truncate" title={col.label}>
                      {col.label}
                    </span>
                  </th>
                ))}
                <th scope="col" style={{ width: "3rem" }}>
                  <span className="slds-assistive-text">Actions</span>
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i}>
                    {columns.map((col) => (
                      <td key={col.fieldName}>
                        <div style={{ height: "0.75rem", background: "#e0e0e0", borderRadius: "4px", animation: "pulse 1.5s ease-in-out infinite" }} />
                      </td>
                    ))}
                    <td />
                  </tr>
                ))
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="slds-text-align_center slds-p-around_medium slds-text-color_weak">
                    No records to display
                  </td>
                </tr>
              ) : (
                data.map((row) => (
                  <TreeRow
                    key={row[keyField] as string}
                    row={row}
                    columns={columns}
                    level={0}
                    expandedIds={expandedIds}
                    openMenuId={openMenuId}
                    allowDelete={allowDelete}
                    keyField={keyField}
                    onToggleExpand={handleToggleExpand}
                    onToggleMenu={(id) => setOpenMenuId(openMenuId === id ? null : id)}
                    onRowAction={handleRowAction}
                    searchTerm={debouncedSearch}
                  />
                ))
              )}

              {/* Summary row */}
              {columnSummaries.length > 0 && !loading && flatRows.length > 0 && (
                <tr className="slds-text-title_caps" style={{ fontWeight: 600, background: "#f3f2f2" }}>
                  <td>
                    <span className="slds-truncate slds-text-color_weak">{summaryRowLabel}</span>
                  </td>
                  {columns.slice(1).map((col) => {
                    const summary = columnSummaries.find((s) => s.fieldName === col.fieldName);
                    return (
                      <td key={col.fieldName}>
                        {summary ? (
                          <span className="slds-truncate">{computeSummary(flatRows, summary)}</span>
                        ) : null}
                      </td>
                    );
                  })}
                  <td />
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
};

export default TreeGrid;
