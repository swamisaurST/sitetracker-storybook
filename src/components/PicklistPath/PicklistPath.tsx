import React from "react";
import type { PicklistPathProps, PathOption } from "./types";

function getStepState(option: PathOption, value: string | undefined, options: PathOption[]): "complete" | "current" | "incomplete" {
  if (!value) return "incomplete";
  const currentIdx = options.findIndex((o) => o.value === value);
  const thisIdx    = options.findIndex((o) => o.value === option.value);
  if (thisIdx < currentIdx)  return "complete";
  if (thisIdx === currentIdx) return "current";
  return "incomplete";
}

export const PicklistPath: React.FC<PicklistPathProps> = ({
  label,
  options = [],
  value,
  isEditable = true,
  showCoaching = false,
  onSelect,
}) => {
  const currentOption = options.find((o) => o.value === value);
  const coachingText  = currentOption?.description;

  return (
    <div className="slds-path" role="region" aria-label={label ?? "Path"}>
      <div className="slds-grid slds-path__track">
        <div className="slds-grid slds-path__scroller-container">
          <div className="slds-path__scroller" role="application">
            <div className="slds-path__scroller_inner">
              <ul
                className="slds-path__nav"
                role="listbox"
                aria-orientation="horizontal"
                aria-label={label ?? "Path"}
              >
                {options.map((opt) => {
                  const state     = getStepState(opt, value, options);
                  const isCurrent = state === "current";
                  const isComplete = state === "complete";
                  const canClick  = isEditable && !isCurrent;

                  return (
                    <li
                      key={opt.value}
                      className={[
                        "slds-path__item",
                        isComplete ? "slds-is-complete" : "",
                        isCurrent  ? "slds-is-current slds-is-active" : "",
                        !isComplete && !isCurrent ? "slds-is-incomplete" : "",
                      ].join(" ").trim()}
                      role="presentation"
                    >
                      <a
                        className="slds-path__link"
                        role="option"
                        aria-selected={isCurrent}
                        tabIndex={isCurrent ? 0 : -1}
                        style={{
                          cursor: canClick ? "pointer" : "default",
                          userSelect: "none",
                        }}
                        onClick={() => canClick && onSelect?.(opt.value)}
                        onKeyDown={(e) => e.key === "Enter" && canClick && onSelect?.(opt.value)}
                      >
                        <span className="slds-path__stage">
                          {isComplete && (
                            <svg className="slds-icon slds-icon_x-small" aria-hidden="true" viewBox="0 0 24 24" style={{ width: "12px", height: "12px", fill: "currentColor" }}>
                              <path d="M8.8 19.6L1.2 12c-.3-.3-.3-.8 0-1.1l1-1c.3-.3.8-.3 1.1 0L9 15.7 20.7 4c.3-.3.8-.3 1.1 0l1 1c.3.3.3.8 0 1.1L9.9 19.6c-.3.3-.8.3-1.1 0z" />
                            </svg>
                          )}
                        </span>
                        <span className="slds-path__title">{opt.label}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {showCoaching && coachingText && (
        <div className="slds-path__guidance" style={{ padding: "0.75rem 1rem", background: "#F3F3F3", borderTop: "1px solid #DDDBDA" }}>
          <div className="slds-path__guidance-content">
            <h2
              className="slds-path__guidance-title"
              style={{ fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.25rem", color: "#3E3E3C" }}
            >
              Guidance for {currentOption?.label}
            </h2>
            <p style={{ fontSize: "0.8125rem", color: "#706E6B", margin: 0 }}>
              {coachingText}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PicklistPath;
