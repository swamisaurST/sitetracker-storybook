import React from "react";
import type { IllustrationImageProps, IllustrationImageType } from "./types";

const SLDS_ILLUS_PATH = "/assets/images/illustrations";

/**
 * The @salesforce-ux/design-system npm package ships only 3 illustration SVGs.
 * All other SLDS illustration type names exist in the design system spec
 * (https://www.lightningdesignsystem.com/components/illustration/) but their
 * actual SVG files are only available inside a Salesforce org as Static Resources.
 * The variants below render custom fallback artwork to approximate the intended state.
 */
const SLDS_PACKAGED: Set<IllustrationImageType> = new Set([
  "empty-state-assistant",
  "empty-state-events",
  "empty-state-tasks",
]);

// Custom fallback SVGs for types whose artwork is not in the npm package.
// These are NOT the official Salesforce illustrations — they are placeholder
// artwork only. Link to the real designs: https://www.lightningdesignsystem.com/components/illustration/
const FALLBACK_SVGS: Partial<Record<IllustrationImageType, React.ReactElement>> = {
  "no-access": (
    <svg viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <ellipse cx="200" cy="280" rx="160" ry="22" fill="#E5E5E5" />
      <rect x="40" y="28" width="320" height="234" rx="14" fill="white" stroke="#E1E5EA" strokeWidth="2" />
      {/* lock body */}
      <rect x="130" y="100" width="140" height="160" rx="16" fill="#C9D7E8" />
      <rect x="148" y="120" width="104" height="100" rx="8" fill="#EBF1FA" />
      <rect x="170" y="175" width="60" height="50" rx="6" fill="#B0C0D8" />
      {/* keyhole */}
      <circle cx="200" cy="194" r="10" fill="#7A9BBF" />
      <rect x="196" y="198" width="8" height="16" rx="3" fill="#7A9BBF" />
      {/* shackle */}
      <path d="M175 175 V148 Q175 118 200 118 Q225 118 225 148 V175" stroke="#7A9BBF" strokeWidth="12" fill="none" strokeLinecap="round" />
      {/* no-entry badge */}
      <circle cx="310" cy="90" r="34" fill="#E74C3C" opacity="0.9" />
      <rect x="291" y="83" width="38" height="14" rx="4" fill="white" />
    </svg>
  ),
  "no-connection": (
    <svg viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <ellipse cx="200" cy="280" rx="160" ry="22" fill="#E5E5E5" />
      <rect x="40" y="28" width="320" height="234" rx="14" fill="white" stroke="#E1E5EA" strokeWidth="2" />
      {/* wifi arcs */}
      <path d="M60 170 Q120 80 200 140 Q280 80 340 170" stroke="#D0D5DD" strokeWidth="6" fill="none" strokeLinecap="round" strokeDasharray="10 6" />
      <path d="M95 200 Q145 130 200 165 Q255 130 305 200" stroke="#C2C9D4" strokeWidth="6" fill="none" strokeLinecap="round" strokeDasharray="10 6" />
      <path d="M130 228 Q165 185 200 205 Q235 185 270 228" stroke="#B0BAC8" strokeWidth="6" fill="none" strokeLinecap="round" strokeDasharray="10 6" />
      <circle cx="200" cy="255" r="10" fill="#B0BAC8" />
      {/* X */}
      <line x1="60" y1="60" x2="340" y2="260" stroke="#E74C3C" strokeWidth="5" strokeLinecap="round" opacity="0.75" />
      <line x1="340" y1="60" x2="60" y2="260" stroke="#E74C3C" strokeWidth="5" strokeLinecap="round" opacity="0.75" />
      <circle cx="200" cy="160" r="95" stroke="#E74C3C" strokeWidth="5" fill="none" opacity="0.2" />
    </svg>
  ),
  "no-data": (
    <svg viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <ellipse cx="200" cy="280" rx="160" ry="22" fill="#E5E5E5" />
      <rect x="40" y="28" width="320" height="234" rx="14" fill="white" stroke="#E1E5EA" strokeWidth="2" />
      {/* document */}
      <rect x="90" y="70" width="220" height="190" rx="10" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="2" />
      {/* fold corner */}
      <polygon points="270,70 310,110 270,110" fill="#E5E7EB" />
      <line x1="270" y1="70" x2="310" y2="110" stroke="#D1D5DB" strokeWidth="2" />
      {/* placeholder rows */}
      <rect x="114" y="120" width="148" height="10" rx="3" fill="#E5E7EB" />
      <rect x="114" y="146" width="120" height="10" rx="3" fill="#EEF0F2" />
      <rect x="114" y="172" width="134" height="10" rx="3" fill="#EEF0F2" />
      <rect x="114" y="198" width="100" height="10" rx="3" fill="#EEF0F2" />
      {/* question badge */}
      <circle cx="296" cy="80" r="28" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="2" />
      <text x="296" y="89" textAnchor="middle" fill="#9CA3AF" fontSize="28" fontWeight="bold" fontFamily="sans-serif">?</text>
    </svg>
  ),
  "error": (
    <svg viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <ellipse cx="200" cy="285" rx="155" ry="20" fill="#E5E5E5" />
      <rect x="40" y="28" width="320" height="234" rx="14" fill="white" stroke="#E1E5EA" strokeWidth="2" />
      <polygon points="200,55 355,265 45,265" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="3" />
      <rect x="191" y="130" width="18" height="80" rx="5" fill="#F59E0B" />
      <rect x="191" y="224" width="18" height="18" rx="5" fill="#F59E0B" />
    </svg>
  ),
};

const SIZE_STYLES: Record<string, React.CSSProperties> = {
  small:  { maxWidth: "140px" },
  medium: { maxWidth: "240px" },
  large:  { maxWidth: "380px" },
};

export const IllustrationImage: React.FC<IllustrationImageProps> = ({
  type = "empty-state-assistant",
  size = "medium",
  alt = "",
}) => {
  const sizeStyle = SIZE_STYLES[size];

  if (SLDS_PACKAGED.has(type)) {
    return (
      <div style={{ display: "inline-block", ...sizeStyle }}>
        <img
          src={`${SLDS_ILLUS_PATH}/${type}.svg`}
          alt={alt}
          aria-hidden={!alt || undefined}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>
    );
  }

  const fallback = FALLBACK_SVGS[type];
  if (!fallback) return null;

  return (
    <div
      style={{ display: "inline-block", aspectRatio: "5/4", ...sizeStyle }}
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      aria-hidden={!alt || undefined}
    >
      {fallback}
    </div>
  );
};

export default IllustrationImage;
