import React, { useState } from "react";
import type { BetaBarProps, BetaBarVariant } from "./types";

const VARIANT_CONFIG: Record<BetaBarVariant, {
  bg: string;
  border: string;
  iconColor: string;
  textColor: string;
  iconPath: string;
}> = {
  info: {
    bg: "#EBF5FB",
    border: "#0176D3",
    iconColor: "#0176D3",
    textColor: "#032D60",
    iconPath: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z",
  },
  warning: {
    bg: "#FEF9EE",
    border: "#F59E0B",
    iconColor: "#B45309",
    textColor: "#451A03",
    iconPath: "M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z",
  },
  success: {
    bg: "#EDFAF4",
    border: "#3FB868",
    iconColor: "#2E7D50",
    textColor: "#0A3622",
    iconPath: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
  },
  error: {
    bg: "#FEF2F2",
    border: "#E74C3C",
    iconColor: "#B91C1C",
    textColor: "#450A0A",
    iconPath: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z",
  },
};

export const BetaBar: React.FC<BetaBarProps> = ({
  featureName = "New Feature",
  message = "This feature is in beta. Your feedback helps us improve it.",
  variant = "info",
  showBetaTag = true,
  dismissible = true,
  ctaLabel,
  ctaHref,
  onDismiss,
}) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const cfg = VARIANT_CONFIG[variant];

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "0.75rem",
        padding: "0.75rem 1rem",
        background: cfg.bg,
        borderLeft: `4px solid ${cfg.border}`,
        borderRadius: "4px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        position: "relative",
      }}
    >
      {/* Icon */}
      <svg
        viewBox="0 0 24 24"
        style={{ width: "20px", height: "20px", fill: cfg.iconColor, flexShrink: 0, marginTop: "1px" }}
        aria-hidden="true"
      >
        <path d={cfg.iconPath} />
      </svg>

      {/* Body */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.15rem" }}>
          <span style={{ fontWeight: 600, fontSize: "0.875rem", color: cfg.textColor }}>
            {featureName}
          </span>
          {showBetaTag && (
            <span
              style={{
                display: "inline-block",
                padding: "0.1rem 0.45rem",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                background: cfg.border,
                color: "white",
                borderRadius: "20px",
                lineHeight: 1.4,
              }}
            >
              Beta
            </span>
          )}
        </div>

        <p style={{ margin: 0, fontSize: "0.8125rem", color: cfg.textColor, opacity: 0.85, lineHeight: 1.5 }}>
          {message}
          {ctaLabel && ctaHref && (
            <>
              {" "}
              <a
                href={ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: cfg.iconColor, fontWeight: 600, textDecoration: "underline" }}
              >
                {ctaLabel}
              </a>
            </>
          )}
        </p>
      </div>

      {/* Dismiss */}
      {dismissible && (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={handleDismiss}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "2px",
            color: cfg.iconColor,
            opacity: 0.6,
            flexShrink: 0,
            lineHeight: 1,
          }}
        >
          <svg viewBox="0 0 24 24" style={{ width: "16px", height: "16px", fill: "currentColor" }} aria-hidden="true">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default BetaBar;
