import React from "react";
import type { LwcCardProps, CardIconVariant } from "./types";

// Icon IDs in the SLDS standard sprite (/assets/icons/standard-sprite/svg/symbols.svg).
// Sprite uses underscores in IDs (work_order, not work-order).
// Colors are the actual values from .slds-icon-standard-{name} { background-color: ... }
// in the shipped SLDS CSS — verified from the npm package.
const SPRITE = "/assets/icons/standard-sprite/svg/symbols.svg";

const SPRITE_ID: Record<CardIconVariant, string | null> = {
  "standard-account":     "account",
  "standard-contact":     "contact",
  "standard-opportunity": "opportunity",
  "standard-task":        "task",
  "standard-work-order":  "work_order",
  "custom":               null,
};

const ICON_BG_COLORS: Record<CardIconVariant, string> = {
  "standard-account":     "rgb(88, 103, 232)",
  "standard-contact":     "rgb(150, 2, 199)",
  "standard-opportunity": "rgb(255, 93, 45)",
  "standard-task":        "rgb(59, 167, 85)",
  "standard-work-order":  "rgb(6, 165, 154)",
  "custom":               "rgb(88, 103, 232)",
};

export const LwcCard: React.FC<LwcCardProps> = ({
  title = "Card Title",
  iconVariant = "standard-account",
  customIconPath,
  actions = [],
  children,
  footer,
  bordered = true,
  innerPadding = true,
}) => {
  const spriteId = SPRITE_ID[iconVariant];
  const iconBg   = ICON_BG_COLORS[iconVariant];

  return (
    <article
      className="slds-card"
      style={bordered ? undefined : { boxShadow: "none", border: "none" }}
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="slds-card__header slds-grid">
        <header className="slds-media slds-media_center slds-has-flexi-truncate">
          {/* Icon — uses real SLDS sprite for standard variants */}
          <div className="slds-media__figure">
            <span
              className={`slds-icon_container slds-icon-${iconVariant}`}
              style={{
                background: iconBg,
                borderRadius: "6px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "32px",
                height: "32px",
                flexShrink: 0,
              }}
            >
              {spriteId ? (
                <svg
                  className="slds-icon slds-icon_small"
                  aria-hidden="true"
                  style={{ width: "18px", height: "18px" }}
                >
                  <use href={`${SPRITE}#${spriteId}`} />
                </svg>
              ) : customIconPath ? (
                <svg viewBox="0 0 24 24" style={{ width: "18px", height: "18px", fill: "white" }} aria-hidden="true">
                  <path d={customIconPath} />
                </svg>
              ) : null}
            </span>
          </div>

          {/* Title */}
          <div className="slds-media__body">
            <h2
              className="slds-card__header-title"
              style={{ fontWeight: 600, fontSize: "0.875rem", color: "#3E3E3C" }}
            >
              <span className="slds-truncate" title={title}>{title}</span>
            </h2>
          </div>
        </header>

        {/* Header actions */}
        {actions.length > 0 && (
          <div className="slds-no-flex" style={{ display: "flex", gap: "0.375rem", alignItems: "center" }}>
            {actions.map((action, i) => (
              <button
                key={i}
                type="button"
                className={`slds-button slds-button_${action.variant ?? "neutral"}`}
                onClick={action.onClick}
                style={{ fontSize: "0.8rem" }}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Body ───────────────────────────────────────────────────────────── */}
      <div className={`slds-card__body${innerPadding ? " slds-card__body_inner" : ""}`}>
        {children}
      </div>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      {footer && (
        <footer className="slds-card__footer">
          {footer}
        </footer>
      )}
    </article>
  );
};

export default LwcCard;
