import React from "react";
import type { IllustrationProps, IllustrationType } from "./types";

// SLDS illustrations are served as static assets at /assets/images/illustrations/
// via the staticDirs config in .storybook/main.ts
const SLDS_ILLUS_PATH = "/assets/images/illustrations";

// Inline SVG fallbacks for types not in the SLDS npm package
const INLINE_SVGS: Record<string, React.ReactElement> = {
  "no-access": (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <ellipse cx="100" cy="130" rx="80" ry="14" fill="#E5E5E5" />
      <rect x="70" y="40" width="60" height="70" rx="8" fill="#C9C9C9" />
      <rect x="80" y="55" width="40" height="40" rx="4" fill="#F3F3F3" />
      <circle cx="100" cy="75" r="10" fill="#C9C9C9" />
      <rect x="96" y="78" width="8" height="12" rx="2" fill="#C9C9C9" />
      <circle cx="100" cy="30" r="14" fill="#E74C3C" opacity="0.8" />
      <rect x="94" y="27" width="12" height="6" rx="1" fill="white" />
    </svg>
  ),
  "no-connection": (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <ellipse cx="100" cy="130" rx="80" ry="14" fill="#E5E5E5" />
      <path d="M40 80 Q70 40 100 70 Q130 40 160 80" stroke="#C9C9C9" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M55 95 Q80 65 100 85 Q120 65 145 95" stroke="#C9C9C9" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M75 110 Q90 95 100 105 Q110 95 125 110" stroke="#C9C9C9" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="100" cy="125" r="5" fill="#C9C9C9" />
      <line x1="30" y1="30" x2="170" y2="130" stroke="#E74C3C" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
    </svg>
  ),
  "no-data": (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <ellipse cx="100" cy="130" rx="80" ry="14" fill="#E5E5E5" />
      <rect x="45" y="50" width="110" height="70" rx="6" fill="#F3F3F3" stroke="#D8D8D8" />
      <rect x="55" y="62" width="90" height="8" rx="2" fill="#E5E5E5" />
      <rect x="55" y="78" width="70" height="8" rx="2" fill="#EEE" />
      <rect x="55" y="94" width="80" height="8" rx="2" fill="#EEE" />
      <circle cx="100" cy="48" r="16" fill="#ECF0F1" stroke="#D8D8D8" />
      <text x="100" y="53" textAnchor="middle" fill="#B0B0B0" fontSize="16" fontWeight="bold">?</text>
    </svg>
  ),
  "error": (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <ellipse cx="100" cy="135" rx="75" ry="13" fill="#E5E5E5" />
      <polygon points="100,25 165,130 35,130" fill="#FDF3E3" stroke="#F39C12" strokeWidth="2" />
      <rect x="96" y="65" width="8" height="35" rx="2" fill="#F39C12" />
      <rect x="96" y="108" width="8" height="8" rx="2" fill="#F39C12" />
    </svg>
  ),
};

const SVG_MAP: Record<IllustrationType, string | null> = {
  "empty-state-assistant": `${SLDS_ILLUS_PATH}/empty-state-assistant.svg`,
  "empty-state-events":    `${SLDS_ILLUS_PATH}/empty-state-events.svg`,
  "empty-state-tasks":     `${SLDS_ILLUS_PATH}/empty-state-tasks.svg`,
  "no-access":             null,
  "no-connection":         null,
  "no-data":               null,
  "error":                 null,
};

const SIZE_STYLES: Record<string, React.CSSProperties> = {
  small:  { maxWidth: "200px" },
  medium: { maxWidth: "320px" },
  large:  { maxWidth: "460px" },
};

const TEXT_SIZE: Record<string, { heading: string; body: string }> = {
  small:  { heading: "0.9rem",  body: "0.78rem" },
  medium: { heading: "1.1rem",  body: "0.875rem" },
  large:  { heading: "1.3rem",  body: "1rem" },
};

export const Illustration: React.FC<IllustrationProps> = ({
  type = "empty-state-assistant",
  heading,
  body,
  size = "medium",
}) => {
  const sizeStyle = SIZE_STYLES[size];
  const textSize  = TEXT_SIZE[size];
  const svgSrc    = SVG_MAP[type];
  const inlineSvg = INLINE_SVGS[type];

  return (
    <div
      className={`slds-illustration${size === "small" ? " slds-illustration_small" : size === "large" ? " slds-illustration_large" : ""}`}
      style={{ textAlign: "center", display: "inline-flex", flexDirection: "column", alignItems: "center", ...sizeStyle }}
    >
      <div
        className="slds-illustration__figure"
        style={{ marginBottom: "1rem" }}
      >
        {svgSrc ? (
          <img
            src={svgSrc}
            alt=""
            aria-hidden="true"
            style={{ width: "100%", height: "auto" }}
          />
        ) : inlineSvg ? (
          <div style={{ width: "100%", aspectRatio: "5/4" }}>{inlineSvg}</div>
        ) : null}
      </div>

      {(heading || body) && (
        <div className="slds-illustration__body">
          {heading && (
            <h3
              className="slds-text-heading_medium"
              style={{ fontSize: textSize.heading, fontWeight: 600, color: "#3E3E3C", marginBottom: "0.25rem" }}
            >
              {heading}
            </h3>
          )}
          {body && (
            <p
              className="slds-text-body_regular"
              style={{ fontSize: textSize.body, color: "#706E6B", maxWidth: "28ch", margin: "0 auto" }}
            >
              {body}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Illustration;
