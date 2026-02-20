import React, { useState } from "react";
import type { FieldsetContainerProps, FieldsetField } from "./types";

// ─── Read-only field rendering ────────────────────────────────────────────────

function formatReadValue(field: FieldsetField): React.ReactNode {
  const { value, type } = field;
  if (value === undefined || value === null || value === "") {
    return <span style={{ color: "#ADADAD", fontStyle: "italic" }}>—</span>;
  }
  if (type === "boolean") {
    return (
      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
        <span
          style={{
            width: "14px", height: "14px", borderRadius: "3px", display: "inline-flex",
            alignItems: "center", justifyContent: "center",
            background: value ? "#0176D3" : "#DDDBDA", border: "1px solid " + (value ? "#0176D3" : "#C9C7C5"),
            flexShrink: 0,
          }}
        >
          {value && (
            <svg viewBox="0 0 12 12" fill="none" width="9" height="9">
              <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
        {String(value) === "true" ? "True" : "False"}
      </span>
    );
  }
  if (type === "url") {
    return <a href={String(value)} style={{ color: "#0176D3" }} target="_blank" rel="noopener noreferrer">{String(value)}</a>;
  }
  if (type === "email") {
    return <a href={`mailto:${value}`} style={{ color: "#0176D3" }}>{String(value)}</a>;
  }
  if (type === "phone") {
    return <a href={`tel:${value}`} style={{ color: "#0176D3" }}>{String(value)}</a>;
  }
  if (type === "picklist" && field.picklistOptions) {
    const match = field.picklistOptions.find((o) => o.value === value);
    return match ? match.label : String(value);
  }
  return String(value);
}

// ─── Edit input rendering ─────────────────────────────────────────────────────

interface FieldInputProps {
  field: FieldsetField;
  formValue: string | number | boolean | undefined;
  onChange: (apiName: string, value: string | number | boolean) => void;
  hasError: boolean;
}

const FieldInput: React.FC<FieldInputProps> = ({ field, formValue, onChange, hasError }) => {
  const baseInputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.375rem 0.75rem",
    border: `1px solid ${hasError ? "#BA0517" : "#DDDBDA"}`,
    borderRadius: "4px",
    fontSize: "0.875rem",
    color: "#3E3E3C",
    background: field.disabled ? "#FAFAF9" : "#fff",
    boxSizing: "border-box",
    cursor: field.disabled ? "not-allowed" : "auto",
  };

  if (field.disabled) {
    return <div style={{ ...baseInputStyle, color: "#706E6B" }}>{String(formValue ?? "—")}</div>;
  }

  switch (field.type) {
    case "boolean":
      return (
        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={Boolean(formValue)}
            onChange={(e) => onChange(field.apiName, e.target.checked)}
            className="slds-checkbox_faux"
            style={{ width: "16px", height: "16px" }}
          />
          <span style={{ fontSize: "0.875rem", color: "#3E3E3C" }}>{Boolean(formValue) ? "True" : "False"}</span>
        </label>
      );

    case "picklist":
      return (
        <div className="slds-select_container" style={{ width: "100%" }}>
          <select
            className="slds-select"
            value={String(formValue ?? "")}
            onChange={(e) => onChange(field.apiName, e.target.value)}
            style={{ ...baseInputStyle, appearance: "auto" }}
          >
            <option value="">— Select —</option>
            {field.picklistOptions?.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      );

    case "date":
      return (
        <input
          type="date"
          className="slds-input"
          value={String(formValue ?? "")}
          onChange={(e) => onChange(field.apiName, e.target.value)}
          style={baseInputStyle}
        />
      );

    case "number":
      return (
        <input
          type="number"
          className="slds-input"
          value={String(formValue ?? "")}
          onChange={(e) => onChange(field.apiName, e.target.valueAsNumber)}
          style={baseInputStyle}
        />
      );

    default:
      return (
        <input
          type={field.type === "email" ? "email" : field.type === "url" ? "url" : field.type === "phone" ? "tel" : "text"}
          className="slds-input"
          value={String(formValue ?? "")}
          onChange={(e) => onChange(field.apiName, e.target.value)}
          placeholder={`Enter ${field.label.toLowerCase()}`}
          style={baseInputStyle}
        />
      );
  }
};

// ─── Main Component ───────────────────────────────────────────────────────────

export const FieldsetContainer: React.FC<FieldsetContainerProps> = ({
  title = "Details",
  isEditable = true,
  defaultEditMode = false,
  fields = [],
  onSave,
  onCancel,
}) => {
  const [isEditing, setIsEditing] = useState(defaultEditMode);
  const [formValues, setFormValues] = useState<Record<string, string | number | boolean>>(() =>
    Object.fromEntries(fields.map((f) => [f.apiName, f.value ?? ""]))
  );
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handleFieldChange = (apiName: string, value: string | number | boolean) => {
    setFormValues((prev) => ({ ...prev, [apiName]: value }));
    setErrors((prev) => ({ ...prev, [apiName]: false }));
  };

  const handleSave = () => {
    const newErrors: Record<string, boolean> = {};
    fields.forEach((f) => {
      if (f.required && !f.disabled) {
        const val = formValues[f.apiName];
        if (val === undefined || val === null || val === "") {
          newErrors[f.apiName] = true;
        }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsEditing(false);
    onSave?.(formValues);
  };

  const handleCancel = () => {
    setFormValues(Object.fromEntries(fields.map((f) => [f.apiName, f.value ?? ""])));
    setErrors({});
    setIsEditing(false);
    onCancel?.();
  };

  return (
    <article className="slds-card">
      {/* Card Header */}
      <div className="slds-card__header slds-grid" style={{ alignItems: "center" }}>
        <header className="slds-media slds-media_center slds-has-flexi-truncate">
          <div className="slds-media__figure">
            <span className="slds-icon_container slds-icon-standard-account">
              <svg
                className="slds-icon slds-icon--small"
                aria-hidden="true"
                viewBox="0 0 24 24"
                style={{ width: "20px", height: "20px", fill: "#0176D3" }}
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </span>
          </div>
          <div className="slds-media__body">
            <h2 className="slds-card__header-title" style={{ fontWeight: 600, fontSize: "0.9rem" }}>
              {title}
            </h2>
          </div>
        </header>

        {isEditable && !isEditing && (
          <div className="slds-no-flex">
            <button
              className="slds-button slds-button_icon slds-button_icon-border-filled"
              title="Edit"
              onClick={() => setIsEditing(true)}
            >
              <svg viewBox="0 0 24 24" style={{ width: "14px", height: "14px", fill: "currentColor" }} aria-hidden="true">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm17.71-10.21a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
              </svg>
              <span className="slds-assistive-text">Edit {title}</span>
            </button>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="slds-card__body slds-card__body_inner">
        <dl className={`slds-form${!isEditing ? " slds-form_stacked" : ""}`}>
          {fields.map((field) => {
            const hasError = Boolean(errors[field.apiName]);

            return (
              <div
                key={field.apiName}
                className="slds-form-element"
                style={{
                  marginBottom: "0.75rem",
                  ...(hasError ? { paddingBottom: "0.25rem" } : {}),
                }}
              >
                <label
                  className="slds-form-element__label"
                  style={{ fontSize: "0.75rem", color: "#706E6B", display: "block", marginBottom: "0.2rem" }}
                >
                  {field.required && isEditing && (
                    <abbr className="slds-required" title="required" style={{ color: "#BA0517" }}>*&nbsp;</abbr>
                  )}
                  {field.label}
                </label>

                <div className="slds-form-element__control">
                  {isEditing ? (
                    <FieldInput
                      field={field}
                      formValue={formValues[field.apiName]}
                      onChange={handleFieldChange}
                      hasError={hasError}
                    />
                  ) : (
                    <div
                      className="slds-form-element__static"
                      style={{ fontSize: "0.875rem", color: "#3E3E3C", minHeight: "1.5rem" }}
                    >
                      {formatReadValue({ ...field, value: formValues[field.apiName] })}
                    </div>
                  )}

                  {hasError && (
                    <p
                      className="slds-form-error"
                      style={{ fontSize: "0.75rem", color: "#BA0517", marginTop: "0.2rem" }}
                    >
                      {field.label} is required.
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </dl>
      </div>

      {/* Edit Mode Footer */}
      {isEditing && (
        <footer className="slds-card__footer" style={{ borderTop: "1px solid #E5E5E5", padding: "0.75rem 1rem", display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
          <button className="slds-button slds-button_neutral" onClick={handleCancel}>
            Cancel
          </button>
          <button className="slds-button slds-button_brand" onClick={handleSave}>
            Save
          </button>
        </footer>
      )}
    </article>
  );
};

export default FieldsetContainer;
