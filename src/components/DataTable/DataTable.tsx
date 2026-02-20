import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { SLDSIcon, UtilityIcon } from "../shared/SLDSIcon";
import type {
  DataTableProps,
  DataTableRow,
  Column,
  RowAction,
} from "./types";

// ─── Formatters ───────────────────────────────────────────────────────

function formatCell(value: unknown, column: Column): React.ReactNode {
  if (value === null || value === undefined || value === "") {
    return <span className="slds-text-color_weak">—</span>;
  }

  const attrs = column.typeAttributes;
  switch (column.type) {
    case "currency":
    case "customCurrency": {
      const code = attrs?.currencyCode ?? "USD";
      const digits = attrs?.fractionDigits ?? 2;
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: code,
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
      }).format(Number(value));
    }
    case "percent":
      return `${Number(value).toFixed(attrs?.fractionDigits ?? 0)}%`;
    case "number":
    case "customNumber":
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
    case "email":
      return <a href={`mailto:${value}`}>{String(value)}</a>;
    case "phone":
      return <a href={`tel:${value}`}>{String(value)}</a>;
    case "url":
      return (
        <a href={String(value)} target="_blank" rel="noopener noreferrer">
          {attrs?.label ?? String(value)}
        </a>
      );
    case "customStatusBadge": {
      const theme = attrs?.theme ?? "default";
      const themeClass =
        theme === "success"
          ? "slds-theme_success"
          : theme === "warning"
            ? "slds-theme_warning"
            : theme === "error"
              ? "slds-theme_error"
              : theme === "info"
                ? "slds-theme_info"
                : "";
      return (
        <span className={`slds-badge ${themeClass}`}>{String(value)}</span>
      );
    }
    case "customLinkWithIcon":
      return (
        <span className="slds-grid slds-grid_vertical-align-center slds-grid_align-spread">
          <a
            href={attrs?.url ?? "#"}
            target={attrs?.target ?? "_blank"}
            rel="noopener noreferrer"
          >
            {String(value)}
          </a>
          {attrs?.icon && (
            <UtilityIcon name={attrs.icon} size="xx-small" className="slds-m-left_xx-small" />
          )}
        </span>
      );
    case "customAvatar":
      return (
        <span className="slds-avatar slds-avatar_circle slds-avatar_x-small">
          <abbr
            className="slds-avatar__initials slds-avatar__initials_inverse"
            title={String(value)}
          >
            {String(value)
              .split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </abbr>
        </span>
      );
    default:
      return String(value);
  }
}

// ─── Sub-components ───────────────────────────────────────────────────

const Spinner: React.FC = () => (
  <div className="slds-spinner_container" style={{ position: "absolute" }}>
    <div role="status" className="slds-spinner slds-spinner_medium">
      <span className="slds-assistive-text">Loading</span>
      <div className="slds-spinner__dot-a" />
      <div className="slds-spinner__dot-b" />
    </div>
  </div>
);

const EmptyIllustration: React.FC<{ text: string }> = ({ text }) => (
  <div className="slds-p-around_large slds-text-align_center">
    <div className="slds-illustration slds-illustration_small">
      <SLDSIcon category="utility" name="info" size="large" className="slds-icon-text-default" />
      <div className="slds-text-longform slds-m-top_medium">
        <h3 className="slds-text-heading_medium">{text}</h3>
      </div>
    </div>
  </div>
);

interface PaginatorProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalRecords: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const Paginator: React.FC<PaginatorProps> = ({
  currentPage,
  totalPages,
  pageSize,
  totalRecords,
  onPageChange,
  onPageSizeChange,
}) => {
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalRecords);

  return (
    <div className="slds-grid slds-grid_align-spread slds-grid_vertical-align-center slds-p-around_x-small slds-border_top">
      <div className="slds-text-body_small slds-text-color_weak">
        {totalRecords > 0 ? `${start}–${end} of ${totalRecords}` : "0 records"}
      </div>
      <div className="slds-grid slds-grid_vertical-align-center">
        <span className="slds-text-body_small slds-m-right_x-small">Rows per page:</span>
        <select
          className="slds-select"
          style={{ width: "5rem" }}
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
        >
          {[5, 10, 15, 25, 50].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div className="slds-button-group" role="group">
        <button
          className="slds-button slds-button_neutral"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <UtilityIcon name="chevronleft" size="xx-small" className="slds-button__icon slds-button__icon_left" />
          Prev
        </button>
        <span className="slds-p-horizontal_small slds-align-middle slds-text-body_small">
          {currentPage} / {totalPages || 1}
        </span>
        <button
          className="slds-button slds-button_neutral"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
          <UtilityIcon name="chevronright" size="xx-small" className="slds-button__icon slds-button__icon_right" />
        </button>
      </div>
    </div>
  );
};

// ─── Column Filter Dropdown ───────────────────────────────────────────

interface ColumnFilterProps {
  column: Column;
  allValues: unknown[];
  activeFilters: Set<string>;
  onToggle: (value: string) => void;
  onClear: () => void;
  onClose: () => void;
}

const ColumnFilter: React.FC<ColumnFilterProps> = ({
  column,
  allValues,
  activeFilters,
  onToggle,
  onClear,
  onClose,
}) => {
  const uniqueValues = useMemo(() => {
    const seen = new Set<string>();
    return allValues
      .map((v) => (v === null || v === undefined ? "" : String(v)))
      .filter((v) => {
        if (seen.has(v)) return false;
        seen.add(v);
        return true;
      })
      .sort();
  }, [allValues]);

  return (
    <div
      className="slds-dropdown slds-dropdown_left slds-dropdown_small"
      style={{ position: "absolute", zIndex: 9999, minWidth: "12rem" }}
    >
      <div className="slds-dropdown__header">
        <span className="slds-text-title_caps">{column.label}</span>
        <button
          className="slds-button slds-button_icon slds-button_icon-small slds-float_right"
          onClick={onClose}
        >
          <UtilityIcon name="close" size="xx-small" />
        </button>
      </div>
      <ul className="slds-dropdown__list" role="listbox" style={{ maxHeight: "12rem", overflowY: "auto" }}>
        {uniqueValues.map((val) => (
          <li key={val} className="slds-dropdown__item" role="option">
            <label className="slds-checkbox slds-p-horizontal_small slds-p-vertical_xx-small">
              <input
                type="checkbox"
                checked={activeFilters.has(val)}
                onChange={() => onToggle(val)}
              />
              <span className="slds-checkbox_faux" />
              <span className="slds-form-element__label slds-truncate">{val || "(empty)"}</span>
            </label>
          </li>
        ))}
      </ul>
      {activeFilters.size > 0 && (
        <div className="slds-p-horizontal_small slds-p-vertical_xx-small slds-border_top">
          <button className="slds-button slds-button_neutral slds-button_stretch" onClick={onClear}>
            Clear Filter
          </button>
        </div>
      )}
    </div>
  );
};

// ─── Row Actions Menu ─────────────────────────────────────────────────

interface RowActionsMenuProps {
  actions: RowAction[];
  row: DataTableRow;
  onAction: (action: RowAction, row: DataTableRow) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const RowActionsMenu: React.FC<RowActionsMenuProps> = ({
  actions,
  row,
  onAction,
  isOpen,
  onToggle,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onToggle();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, onToggle]);

  return (
    <div ref={ref} className="slds-dropdown-trigger slds-dropdown-trigger_click" style={{ position: "relative" }}>
      <button
        className="slds-button slds-button_icon slds-button_icon-border-filled slds-button_icon-x-small"
        onClick={onToggle}
        aria-haspopup="true"
      >
        <UtilityIcon name="down" size="xx-small" />
        <span className="slds-assistive-text">Actions</span>
      </button>
      {isOpen && (
        <div className="slds-dropdown slds-dropdown_right slds-dropdown_actions" style={{ position: "absolute", right: 0, zIndex: 9999 }}>
          <ul className="slds-dropdown__list" role="menu">
            {actions.map((action) => (
              <li key={action.name} className="slds-dropdown__item" role="presentation">
                <a
                  href="#"
                  role="menuitem"
                  className={action.disabled ? "slds-is-disabled" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    if (!action.disabled) {
                      onAction(action, row);
                      onToggle();
                    }
                  }}
                >
                  <span className="slds-truncate">{action.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// ─── Main DataTable Component ─────────────────────────────────────────

export const DataTable: React.FC<DataTableProps> = ({
  showLabel = false,
  customLabel = "",
  iconUrl = "",
  hideHeader = false,
  hideCount = false,
  hideTotalRecordsInHeader = false,

  columns,
  data,
  keyField = "Id",

  hideSearch = false,
  searchPlaceholderLabel = "Search…",

  paginateSize = 5,
  sortBy: initialSortBy = "",
  defaultSortDirection = "asc",
  disableSorting = false,
  disableFiltering = false,

  hideCheckboxColumn = false,
  maxRowSelection = 50,

  allowRecordCreation = false,
  allowRecordDeletion = false,
  addButtonLabel = "New",
  newButtonDisabled = false,
  newButtonTitle = "New",

  variant = "base",
  loading = false,
  showIllustrationOnNoRows = false,
  illustrationText = "No records found",

  rowActions = [],
  addErrorColumn = false,
  summaryFields = [],
  editableFields = [],

  onRowSelection,
  onRecordCreate,
  onRecordDelete,
  onRowAction,
  onCellEdit,
  onSort,
}) => {
  // ── State ──

  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState(initialSortBy);
  const [sortDir, setSortDir] = useState<"asc" | "desc">(defaultSortDirection);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(paginateSize || 10);
  const [columnFilters, setColumnFilters] = useState<Record<string, Set<string>>>({});
  const [openFilterCol, setOpenFilterCol] = useState<string | null>(null);
  const [openActionRow, setOpenActionRow] = useState<string | null>(null);
  const [editingCell, setEditingCell] = useState<{ rowId: string; field: string } | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const searchRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    if (searchRef.current) clearTimeout(searchRef.current);
    searchRef.current = setTimeout(() => {
      setDebouncedSearch(value);
      setCurrentPage(1);
    }, 250);
  }, []);

  // ── Computed data pipeline: filter → search → sort → paginate ──

  const filteredData = useMemo(() => {
    let result = data;

    // Column filters
    const activeFilters = Object.entries(columnFilters).filter(
      ([, values]) => values.size > 0
    );
    if (activeFilters.length > 0) {
      result = result.filter((row) =>
        activeFilters.every(([field, allowed]) => {
          const val = row[field];
          return allowed.has(val === null || val === undefined ? "" : String(val));
        })
      );
    }

    // Search
    if (debouncedSearch) {
      const term = debouncedSearch.toLowerCase();
      result = result.filter((row) =>
        columns.some((col) => {
          const val = row[col.fieldName];
          return val !== null && val !== undefined && String(val).toLowerCase().includes(term);
        })
      );
    }

    return result;
  }, [data, columnFilters, debouncedSearch, columns]);

  const sortedData = useMemo(() => {
    if (!sortField || disableSorting) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (aVal === bVal) return 0;
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;
      const cmp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true });
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [filteredData, sortField, sortDir, disableSorting]);

  const totalRecords = sortedData.length;
  const usePagination = paginateSize > 0;
  const totalPages = usePagination ? Math.max(1, Math.ceil(totalRecords / pageSize)) : 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const pagedData = useMemo(() => {
    if (!usePagination) return sortedData;
    const start = (safeCurrentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, safeCurrentPage, pageSize, usePagination]);

  // ── Summary row ──

  const summaryRow = useMemo(() => {
    if (summaryFields.length === 0) return null;
    const sums: Record<string, number> = {};
    summaryFields.forEach((f) => {
      sums[f] = sortedData.reduce((acc, row) => acc + (Number(row[f]) || 0), 0);
    });
    return sums;
  }, [summaryFields, sortedData]);

  // ── Handlers ──

  const handleSort = useCallback(
    (field: string) => {
      if (disableSorting) return;
      const newDir = field === sortField && sortDir === "asc" ? "desc" : "asc";
      setSortField(field);
      setSortDir(newDir);
      onSort?.(field, newDir);
    },
    [sortField, sortDir, disableSorting, onSort]
  );

  const isRadioMode = maxRowSelection === 1;

  const handleRowSelect = useCallback(
    (id: string) => {
      setSelectedIds((prev) => {
        let next: Set<string>;
        if (isRadioMode) {
          next = prev.has(id) ? new Set() : new Set([id]);
        } else {
          next = new Set(prev);
          if (next.has(id)) next.delete(id);
          else if (next.size < maxRowSelection) next.add(id);
          else return prev;
        }
        onRowSelection?.([...next]);
        return next;
      });
    },
    [isRadioMode, maxRowSelection, onRowSelection]
  );

  const handleSelectAll = useCallback(() => {
    if (isRadioMode) return;
    const pageIds = pagedData.map((r) => r[keyField] as string);
    const allSelected = pageIds.every((id) => selectedIds.has(id));
    let next: Set<string>;
    if (allSelected) {
      next = new Set(selectedIds);
      pageIds.forEach((id) => next.delete(id));
    } else {
      next = new Set(selectedIds);
      pageIds.forEach((id) => {
        if (next.size < maxRowSelection) next.add(id);
      });
    }
    setSelectedIds(next);
    onRowSelection?.([...next]);
  }, [isRadioMode, pagedData, selectedIds, keyField, maxRowSelection, onRowSelection]);

  const handleDelete = useCallback(() => {
    onRecordDelete?.([...selectedIds]);
    setSelectedIds(new Set());
    setShowDeleteConfirm(false);
  }, [selectedIds, onRecordDelete]);

  const handleCellEditSave = useCallback(() => {
    if (!editingCell) return;
    onCellEdit?.(editingCell.rowId, editingCell.field, editValue);
    setEditingCell(null);
  }, [editingCell, editValue, onCellEdit]);

  const handleFilterToggle = useCallback(
    (field: string, value: string) => {
      setColumnFilters((prev) => {
        const next = { ...prev };
        const set = new Set(next[field] || []);
        if (set.has(value)) set.delete(value);
        else set.add(value);
        next[field] = set;
        return next;
      });
      setCurrentPage(1);
    },
    []
  );

  // ── Derived ──

  const visibleColumns = columns.filter((c) => c.type !== "action");
  const actionColumn = columns.find((c) => c.type === "action");
  const hasActions = rowActions.length > 0 || !!actionColumn;
  const allPageSelected =
    pagedData.length > 0 && pagedData.every((r) => selectedIds.has(r[keyField] as string));
  const somePageSelected =
    !allPageSelected && pagedData.some((r) => selectedIds.has(r[keyField] as string));

  // ── Render ──

  return (
    <div className="slds-card" style={{ position: "relative" }}>
      {loading && <Spinner />}

      {/* ── Header ── */}
      {!hideHeader && (
        <div
          className="slds-grid slds-grid_vertical-align-center slds-p-around_small slds-border_bottom"
          style={{
            background: "var(--st-header-bg, #f3f2f2)",
            borderBottom: "2px solid var(--st-header-border, #dddbda)",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          {/* Label + icon */}
          {showLabel && (
            <div className="slds-grid slds-grid_vertical-align-center slds-m-right_small">
              {iconUrl ? (
                <span className="slds-icon_container slds-m-right_x-small">
                  <img src={iconUrl} alt="" style={{ width: "1.5rem", height: "1.5rem" }} />
                </span>
              ) : (
                <SLDSIcon
                  category="standard"
                  name="record"
                  size="small"
                  containerClassName="slds-m-right_x-small"
                />
              )}
              <h2 className="slds-text-heading_small">
                {customLabel || "Records"}
                {!hideTotalRecordsInHeader && (
                  <span className="slds-text-color_weak slds-m-left_xx-small">({totalRecords})</span>
                )}
              </h2>
            </div>
          )}

          {/* Search */}
          {!hideSearch && (
            <div
              className="slds-form-element slds-grow"
              style={{
                minWidth: "var(--st-search-min-width, 16rem)",
                maxWidth: "var(--st-search-max-width, 40rem)",
              }}
            >
              <div className="slds-form-element__control slds-input-has-icon slds-input-has-icon_left">
                <UtilityIcon
                  name="search"
                  size="x-small"
                  className="slds-icon-text-default slds-input__icon slds-input__icon_left"
                />
                <input
                  className="slds-input"
                  type="search"
                  placeholder={searchPlaceholderLabel}
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Selected count */}
          {!hideCount && selectedIds.size > 0 && (
            <span className="slds-badge slds-badge_lightest slds-m-horizontal_x-small">
              {selectedIds.size} item{selectedIds.size !== 1 ? "s" : ""} selected
            </span>
          )}

          {/* CRUD buttons */}
          <div className="slds-grid slds-grid_vertical-align-center" style={{ gap: "0.25rem", marginLeft: "auto" }}>
            {allowRecordCreation && (
              <button
                className="slds-button slds-button_neutral"
                onClick={onRecordCreate}
                disabled={newButtonDisabled}
                title={newButtonTitle}
              >
                <UtilityIcon name="add" size="xx-small" className="slds-button__icon slds-button__icon_left" />
                {addButtonLabel}
              </button>
            )}
            {allowRecordDeletion && selectedIds.size > 0 && (
              <button
                className="slds-button slds-button_destructive"
                onClick={() => setShowDeleteConfirm(true)}
              >
                <UtilityIcon name="delete" size="xx-small" className="slds-button__icon slds-button__icon_left" />
                Delete ({selectedIds.size})
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── Delete Confirmation ── */}
      {showDeleteConfirm && (
        <div className="slds-notify_container" style={{ position: "relative" }}>
          <div className="slds-notify slds-notify_alert slds-alert_warning" role="alert">
            <span className="slds-assistive-text">Warning</span>
            <h2>
              Delete {selectedIds.size} record{selectedIds.size !== 1 ? "s" : ""}?
              <button className="slds-button slds-button_destructive slds-m-left_small" onClick={handleDelete}>
                Confirm Delete
              </button>
              <button
                className="slds-button slds-button_neutral slds-m-left_x-small"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
            </h2>
          </div>
        </div>
      )}

      {/* ── Table ── */}
      {pagedData.length === 0 && !loading ? (
        showIllustrationOnNoRows ? (
          <EmptyIllustration text={illustrationText} />
        ) : (
          <div className="slds-p-around_medium slds-text-align_center slds-text-color_weak">
            No records to display
          </div>
        )
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            className={`slds-table slds-table_cell-buffer slds-table_bordered ${
              variant === "striped" ? "slds-table_striped" : ""
            }`}
            role="grid"
          >
            <thead>
              <tr className="slds-line-height_reset">
                {/* Checkbox / radio column */}
                {!hideCheckboxColumn && (
                  <th scope="col" style={{ width: "2rem", padding: 0 }} className="slds-text-align_center">
                    {!isRadioMode && (
                      <div className="slds-th__action slds-th__action_form" style={{ justifyContent: "center" }}>
                        <div className="slds-checkbox">
                          <input
                            type="checkbox"
                            id="select-all"
                            checked={allPageSelected}
                            ref={(el) => {
                              if (el) el.indeterminate = somePageSelected;
                            }}
                            onChange={handleSelectAll}
                          />
                          <label className="slds-checkbox__label" htmlFor="select-all">
                            <span className="slds-checkbox_faux" />
                            <span className="slds-form-element__label slds-assistive-text">
                              Select All
                            </span>
                          </label>
                        </div>
                      </div>
                    )}
                  </th>
                )}

                {/* Error column */}
                {addErrorColumn && (
                  <th scope="col" style={{ width: "3.25rem" }}>
                    <span className="slds-assistive-text">Errors</span>
                  </th>
                )}

                {/* Data columns */}
                {visibleColumns.map((col) => {
                  const isSorted = sortField === col.fieldName;
                  const canSort = col.sortable !== false && !disableSorting;
                  const canFilter = !disableFiltering;
                  const hasFilter = (columnFilters[col.fieldName]?.size ?? 0) > 0;

                  return (
                    <th
                      key={col.fieldName}
                      scope="col"
                      aria-sort={isSorted ? (sortDir === "asc" ? "ascending" : "descending") : "none"}
                      style={col.initialWidth ? { width: `${col.initialWidth}px` } : undefined}
                    >
                      <div className="slds-grid slds-grid_vertical-align-center slds-has-flexi-truncate">
                        <span
                          className={`slds-truncate ${canSort ? "slds-th__action" : ""}`}
                          style={canSort ? { cursor: "pointer" } : undefined}
                          onClick={canSort ? () => handleSort(col.fieldName) : undefined}
                          title={col.label}
                        >
                          {col.label}
                          {isSorted && (
                            <UtilityIcon
                              name={sortDir === "asc" ? "arrowup" : "arrowdown"}
                              size="xx-small"
                              className="slds-icon-text-default slds-m-left_xx-small"
                            />
                          )}
                        </span>

                        {/* Filter button */}
                        {canFilter && (
                          <div style={{ position: "relative" }}>
                            <button
                              className={`slds-button slds-button_icon slds-button_icon-bare slds-button_icon-x-small ${
                                hasFilter ? "slds-is-selected" : ""
                              }`}
                              onClick={() =>
                                setOpenFilterCol(openFilterCol === col.fieldName ? null : col.fieldName)
                              }
                              title={`Filter ${col.label}`}
                            >
                              <UtilityIcon
                                name="filterList"
                                size="xx-small"
                                className={hasFilter ? "slds-icon-text-success" : "slds-icon-text-default"}
                              />
                            </button>
                            {openFilterCol === col.fieldName && (
                              <ColumnFilter
                                column={col}
                                allValues={data.map((r) => r[col.fieldName])}
                                activeFilters={columnFilters[col.fieldName] || new Set()}
                                onToggle={(v) => handleFilterToggle(col.fieldName, v)}
                                onClear={() => {
                                  setColumnFilters((prev) => ({
                                    ...prev,
                                    [col.fieldName]: new Set(),
                                  }));
                                  setCurrentPage(1);
                                }}
                                onClose={() => setOpenFilterCol(null)}
                              />
                            )}
                          </div>
                        )}
                      </div>
                    </th>
                  );
                })}

                {/* Actions column */}
                {hasActions && (
                  <th scope="col" style={{ width: "3.25rem" }}>
                    <span className="slds-assistive-text">Actions</span>
                  </th>
                )}
              </tr>
            </thead>

            <tbody>
              {pagedData.map((row) => {
                const rowId = row[keyField] as string;
                const isSelected = selectedIds.has(rowId);
                const errorData = row._errorType as string | undefined;

                return (
                  <tr
                    key={rowId}
                    className={`slds-hint-parent ${isSelected ? "slds-is-selected" : ""}`}
                    aria-selected={isSelected}
                  >
                    {/* Selection */}
                    {!hideCheckboxColumn && (
                      <td role="gridcell" style={{ width: "2rem", padding: 0, textAlign: "center" }}>
                        <div className={isRadioMode ? "slds-radio" : "slds-checkbox"} style={{ display: "inline-flex", justifyContent: "center" }}>
                          <input
                            type={isRadioMode ? "radio" : "checkbox"}
                            name="row-select"
                            id={`row-${rowId}`}
                            checked={isSelected}
                            onChange={() => handleRowSelect(rowId)}
                          />
                          <label className={`${isRadioMode ? "slds-radio" : "slds-checkbox"}__label`} htmlFor={`row-${rowId}`}>
                            <span className={`${isRadioMode ? "slds-radio" : "slds-checkbox"}_faux`} />
                            <span className="slds-form-element__label slds-assistive-text">
                              Select row
                            </span>
                          </label>
                        </div>
                      </td>
                    )}

                    {/* Error indicator */}
                    {addErrorColumn && (
                      <td style={{ width: "3.25rem" }}>
                        {errorData === "error" && (
                          <UtilityIcon name="error" size="xx-small" className="slds-icon-text-error" />
                        )}
                        {errorData === "warning" && (
                          <UtilityIcon name="warning" size="xx-small" className="slds-icon-text-warning" />
                        )}
                      </td>
                    )}

                    {/* Data cells */}
                    {visibleColumns.map((col) => {
                      const value = row[col.fieldName];
                      const isEditing =
                        editingCell?.rowId === rowId && editingCell?.field === col.fieldName;
                      const canEdit = editableFields.includes(col.fieldName);

                      return (
                        <td
                          key={col.fieldName}
                          data-label={col.label}
                          className={canEdit ? "slds-cell-edit" : ""}
                        >
                          {isEditing ? (
                            <div className="slds-grid slds-grid_vertical-align-center">
                              <input
                                className="slds-input slds-input_small"
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") handleCellEditSave();
                                  if (e.key === "Escape") setEditingCell(null);
                                }}
                                autoFocus
                              />
                              <button
                                className="slds-button slds-button_icon slds-button_icon-small"
                                onClick={handleCellEditSave}
                              >
                                <UtilityIcon name="check" size="xx-small" className="slds-icon-text-success" />
                              </button>
                              <button
                                className="slds-button slds-button_icon slds-button_icon-small"
                                onClick={() => setEditingCell(null)}
                              >
                                <UtilityIcon name="close" size="xx-small" />
                              </button>
                            </div>
                          ) : (
                            <div
                              className="slds-truncate"
                              title={typeof value === "string" ? value : undefined}
                              onDoubleClick={
                                canEdit
                                  ? () => {
                                      setEditingCell({ rowId, field: col.fieldName });
                                      setEditValue(value !== null && value !== undefined ? String(value) : "");
                                    }
                                  : undefined
                              }
                            >
                              {formatCell(value, col)}
                            </div>
                          )}
                        </td>
                      );
                    })}

                    {/* Row actions */}
                    {hasActions && (
                      <td style={{ width: "3.25rem" }}>
                        <RowActionsMenu
                          actions={rowActions}
                          row={row}
                          onAction={onRowAction || (() => {})}
                          isOpen={openActionRow === rowId}
                          onToggle={() => setOpenActionRow(openActionRow === rowId ? null : rowId)}
                        />
                      </td>
                    )}
                  </tr>
                );
              })}

              {/* Summary row */}
              {summaryRow && (
                <tr className="slds-text-title_caps" style={{ fontWeight: 600 }}>
                  {!hideCheckboxColumn && <td />}
                  {addErrorColumn && <td />}
                  {visibleColumns.map((col) => (
                    <td key={col.fieldName}>
                      {summaryFields.includes(col.fieldName) ? (
                        <span className="slds-truncate">
                          {formatCell(summaryRow[col.fieldName], col)}
                        </span>
                      ) : col === visibleColumns[0] ? (
                        <span className="slds-truncate slds-text-color_weak">Totals</span>
                      ) : null}
                    </td>
                  ))}
                  {hasActions && <td />}
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Pagination ── */}
      {usePagination && totalRecords > 0 && (
        <Paginator
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalRecords={totalRecords}
          onPageChange={setCurrentPage}
          onPageSizeChange={(s) => {
            setPageSize(s);
            setCurrentPage(1);
          }}
        />
      )}
    </div>
  );
};

export default DataTable;
