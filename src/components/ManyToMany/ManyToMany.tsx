import React, { useState, useMemo, useCallback } from "react";
import { UtilityIcon } from "../shared/SLDSIcon";
import type { Column, DataTableRow } from "../DataTable/types";
import { DataTable } from "../DataTable/DataTable";

// ─── Types ────────────────────────────────────────────────────────────

export interface ManyToManyProps {
  // Labels
  title?: string;
  addNewLabel?: string;
  selectionModalTitle?: string;

  // Junction table (existing records)
  junctionColumns: Column[];
  junctionData: DataTableRow[];

  // Selection table (available records to add)
  selectionColumns: Column[];
  selectionData: DataTableRow[];

  // Features
  allowJunctionDelete?: boolean;
  tableSearchEnabled?: boolean;
  tablePaginationEnabled?: boolean;
  allowDuplicateJunctionRecords?: boolean;

  // States
  loading?: boolean;

  // Callbacks
  onAdd?: (selectedIds: string[]) => void;
  onDelete?: (deletedIds: string[]) => void;
}

// ─── Selection Modal ──────────────────────────────────────────────────

interface SelectionModalProps {
  title: string;
  columns: Column[];
  data: DataTableRow[];
  existingIds: Set<string>;
  allowDuplicates?: boolean;
  onConfirm: (selectedIds: string[]) => void;
  onClose: () => void;
}

const SelectionModal: React.FC<SelectionModalProps> = ({
  title,
  columns,
  data,
  existingIds,
  allowDuplicates = false,
  onConfirm,
  onClose,
}) => {
  const [stagedIds, setStagedIds] = useState<string[]>([]);

  const availableData = useMemo(
    () => (allowDuplicates ? data : data.filter((r) => !existingIds.has(r.Id))),
    [data, existingIds, allowDuplicates]
  );

  const handleConfirm = () => {
    if (stagedIds.length > 0) onConfirm(stagedIds);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Backdrop */}
      <div
        style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="slds-modal slds-fade-in-open"
        style={{ position: "relative", zIndex: 1, width: "min(90vw, 700px)", maxHeight: "85vh", display: "flex", flexDirection: "column" }}
      >
        <div className="slds-modal__container">
          {/* Header */}
          <header className="slds-modal__header">
            <h2 className="slds-modal__title slds-hyphenate">{title}</h2>
            <button
              className="slds-button slds-button_icon slds-modal__close slds-button_icon-inverse"
              onClick={onClose}
            >
              <UtilityIcon name="close" size="small" />
              <span className="slds-assistive-text">Close</span>
            </button>
          </header>

          {/* Body */}
          <div className="slds-modal__content slds-p-around_medium" style={{ overflowY: "auto" }}>
            {availableData.length === 0 ? (
              <p className="slds-text-color_weak slds-text-align_center slds-p-around_medium">
                All available records are already linked.
              </p>
            ) : (
              <DataTable
                columns={columns}
                data={availableData}
                hideHeader
                paginateSize={10}
                hideCheckboxColumn={false}
                maxRowSelection={50}
                onRowSelection={(ids) => setStagedIds(ids)}
              />
            )}
          </div>

          {/* Footer */}
          <footer className="slds-modal__footer">
            <button className="slds-button slds-button_neutral" onClick={onClose}>
              Cancel
            </button>
            <button
              className="slds-button slds-button_brand"
              disabled={stagedIds.length === 0}
              onClick={handleConfirm}
            >
              Add Selected ({stagedIds.length})
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────

export const ManyToMany: React.FC<ManyToManyProps> = ({
  title = "Related Records",
  addNewLabel = "Add",
  selectionModalTitle = "Select Records",
  junctionColumns,
  junctionData,
  selectionColumns,
  selectionData,
  allowJunctionDelete = true,
  tableSearchEnabled = true,
  tablePaginationEnabled = true,
  allowDuplicateJunctionRecords = false,
  loading = false,
  onAdd,
  onDelete,
}) => {
  const [junctionRows, setJunctionRows] = useState<DataTableRow[]>(junctionData);
  const [showModal, setShowModal] = useState(false);
  const [selectedForDelete, setSelectedForDelete] = useState<string[]>([]);

  const existingIds = useMemo(
    () => new Set(junctionRows.map((r) => r.Id)),
    [junctionRows]
  );

  const handleAdd = useCallback(
    (selectedIds: string[]) => {
      const newRows = selectionData.filter((r) => selectedIds.includes(r.Id));
      setJunctionRows((prev) => [...prev, ...newRows]);
      onAdd?.(selectedIds);
      setShowModal(false);
    },
    [selectionData, onAdd]
  );

  const handleDelete = useCallback(() => {
    setJunctionRows((prev) => prev.filter((r) => !selectedForDelete.includes(r.Id)));
    onDelete?.(selectedForDelete);
    setSelectedForDelete([]);
  }, [selectedForDelete, onDelete]);

  return (
    <div className="slds-card">
      {/* ── Header ── */}
      <div
        className="slds-card__header slds-grid slds-grid_vertical-align-center slds-p-horizontal_medium slds-p-vertical_small slds-grid_align-spread"
        style={{ borderBottom: "1px solid #dddbda" }}
      >
        <h2 className="slds-card__header-title slds-text-heading_small">
          {title}
          <span className="slds-text-color_weak slds-text-body_regular slds-m-left_x-small">
            ({junctionRows.length})
          </span>
        </h2>

        <div className="slds-grid" style={{ gap: "0.5rem" }}>
          {allowJunctionDelete && selectedForDelete.length > 0 && (
            <button className="slds-button slds-button_destructive slds-button_small" onClick={handleDelete}>
              <UtilityIcon name="delete" size="xx-small" className="slds-button__icon slds-button__icon_left" />
              Remove ({selectedForDelete.length})
            </button>
          )}
          <button
            className="slds-button slds-button_brand slds-button_small"
            onClick={() => setShowModal(true)}
          >
            <UtilityIcon name="add" size="xx-small" className="slds-button__icon slds-button__icon_left" />
            {addNewLabel}
          </button>
        </div>
      </div>

      {/* ── Junction Table ── */}
      <div className="slds-card__body slds-p-around_small">
        <DataTable
          columns={junctionColumns}
          data={junctionRows}
          hideHeader
          paginateSize={tablePaginationEnabled ? 5 : 0}
          hideSearch={!tableSearchEnabled}
          loading={loading}
          hideCheckboxColumn={!allowJunctionDelete}
          onRowSelection={(ids) => setSelectedForDelete(ids)}
          allowRecordDeletion={false}
        />
      </div>

      {/* ── Selection Modal ── */}
      {showModal && (
        <SelectionModal
          title={selectionModalTitle}
          columns={selectionColumns}
          data={selectionData}
          existingIds={existingIds}
          allowDuplicates={allowDuplicateJunctionRecords}
          onConfirm={handleAdd}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default ManyToMany;
