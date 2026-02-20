import React, { useId } from "react";
import type { RadioGroupProps } from "./types";

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label = "",
  name,
  options = [],
  value,
  type = "radio",
  disabled = false,
  required = false,
  orientation = "vertical",
  onChange,
}) => {
  const uid = useId();
  const groupName = name ?? uid;

  if (type === "button") {
    return (
      <fieldset className="slds-form-element" style={{ border: "none", padding: 0, margin: 0 }}>
        {label && (
          <legend className="slds-form-element__label">
            {required && <abbr className="slds-required" title="required">*</abbr>}
            {label}
          </legend>
        )}
        <div className="slds-form-element__control">
          <div
            role="group"
            className="slds-button-group"
            aria-label={label}
          >
            {options.map((opt) => {
              const isSelected = opt.value === value;
              const isDisabled = disabled || opt.disabled;
              return (
                <button
                  key={opt.value}
                  type="button"
                  className={[
                    "slds-button",
                    isSelected ? "slds-button_brand" : "slds-button_neutral",
                    isDisabled ? "slds-is-disabled" : "",
                  ].join(" ").trim()}
                  disabled={isDisabled}
                  aria-pressed={isSelected}
                  onClick={() => !isDisabled && onChange?.(opt.value)}
                  style={{
                    borderRadius: "0",
                    ...(isSelected && !isDisabled ? {} : {}),
                  }}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </fieldset>
    );
  }

  return (
    <fieldset className="slds-form-element" style={{ border: "none", padding: 0, margin: 0 }}>
      {label && (
        <legend className="slds-form-element__label slds-form-element__legend">
          {required && <abbr className="slds-required" title="required">*</abbr>}
          {label}
        </legend>
      )}
      <div className="slds-form-element__control">
        <div
          style={{
            display: "flex",
            flexDirection: orientation === "horizontal" ? "row" : "column",
            gap: orientation === "horizontal" ? "1rem" : "0.25rem",
            flexWrap: "wrap",
          }}
        >
          {options.map((opt) => {
            const optId = `${uid}-${opt.value}`;
            const isSelected = opt.value === value;
            const isDisabled = disabled || opt.disabled;

            return (
              <span key={opt.value} className="slds-radio">
                <input
                  type="radio"
                  name={groupName}
                  id={optId}
                  value={opt.value}
                  checked={isSelected}
                  disabled={isDisabled}
                  onChange={() => !isDisabled && onChange?.(opt.value)}
                  className="slds-assistive-text"
                />
                <label
                  className={["slds-radio__label", isDisabled ? "slds-is-disabled" : ""].join(" ").trim()}
                  htmlFor={optId}
                  style={{ cursor: isDisabled ? "not-allowed" : "pointer" }}
                >
                  <span className="slds-radio_faux" />
                  <span className="slds-form-element__label">{opt.label}</span>
                </label>
              </span>
            );
          })}
        </div>
      </div>
    </fieldset>
  );
};

export default RadioGroup;
