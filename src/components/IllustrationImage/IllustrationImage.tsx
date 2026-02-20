import React from "react";
import type { IllustrationImageProps, IllustrationImageType } from "./types";

const SLDS_ILLUS_PATH = "/assets/images/illustrations";

/**
 * The @salesforce-ux/design-system npm package ships only 3 illustration SVGs
 * (empty-state-assistant, empty-state-events, empty-state-tasks).
 *
 * All other types use the real image names from sitetracker/strk stIllustrationImage
 * (format: "category:identifier") but render custom fallback artwork, since the
 * actual SVG templates are stored in Salesforce Static Resources in the org.
 *
 * Full list of 28 real image names:
 * https://github.com/sitetracker/strk/blob/preprod/src/main/default/lwc/stIllustrationImage/images/index.js
 */
const SLDS_PACKAGED: Set<IllustrationImageType> = new Set([
  "empty-state-assistant",
  "empty-state-events",
  "empty-state-tasks",
]);

const FALLBACK_SVGS: Partial<Record<IllustrationImageType, React.ReactElement>> = {
  "error:no_access": (
    <svg viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <ellipse cx="200" cy="280" rx="160" ry="22" fill="#E5E5E5" />
      <rect x="40" y="28" width="320" height="234" rx="14" fill="white" stroke="#E1E5EA" strokeWidth="2" />
      <rect x="130" y="100" width="140" height="160" rx="16" fill="#C9D7E8" />
      <rect x="148" y="120" width="104" height="100" rx="8" fill="#EBF1FA" />
      <rect x="170" y="175" width="60" height="50" rx="6" fill="#B0C0D8" />
      <circle cx="200" cy="194" r="10" fill="#7A9BBF" />
      <rect x="196" y="198" width="8" height="16" rx="3" fill="#7A9BBF" />
      <path d="M175 175 V148 Q175 118 200 118 Q225 118 225 148 V175" stroke="#7A9BBF" strokeWidth="12" fill="none" strokeLinecap="round" />
      <circle cx="310" cy="90" r="34" fill="#E74C3C" opacity="0.9" />
      <rect x="291" y="83" width="38" height="14" rx="4" fill="white" />
    </svg>
  ),
  "error:no_connection": (
    <svg viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <ellipse cx="200" cy="280" rx="160" ry="22" fill="#E5E5E5" />
      <rect x="40" y="28" width="320" height="234" rx="14" fill="white" stroke="#E1E5EA" strokeWidth="2" />
      <path d="M60 170 Q120 80 200 140 Q280 80 340 170" stroke="#D0D5DD" strokeWidth="6" fill="none" strokeLinecap="round" strokeDasharray="10 6" />
      <path d="M95 200 Q145 130 200 165 Q255 130 305 200" stroke="#C2C9D4" strokeWidth="6" fill="none" strokeLinecap="round" strokeDasharray="10 6" />
      <path d="M130 228 Q165 185 200 205 Q235 185 270 228" stroke="#B0BAC8" strokeWidth="6" fill="none" strokeLinecap="round" strokeDasharray="10 6" />
      <circle cx="200" cy="255" r="10" fill="#B0BAC8" />
      <line x1="60" y1="60" x2="340" y2="260" stroke="#E74C3C" strokeWidth="5" strokeLinecap="round" opacity="0.75" />
      <line x1="340" y1="60" x2="60" y2="260" stroke="#E74C3C" strokeWidth="5" strokeLinecap="round" opacity="0.75" />
      <circle cx="200" cy="160" r="95" stroke="#E74C3C" strokeWidth="5" fill="none" opacity="0.2" />
    </svg>
  ),
  "error:page_not_available": (
    <svg viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <ellipse cx="200" cy="285" rx="155" ry="20" fill="#E5E5E5" />
      <rect x="40" y="28" width="320" height="234" rx="14" fill="white" stroke="#E1E5EA" strokeWidth="2" />
      <polygon points="200,55 355,265 45,265" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="3" />
      <rect x="191" y="130" width="18" height="80" rx="5" fill="#F59E0B" />
      <rect x="191" y="224" width="18" height="18" rx="5" fill="#F59E0B" />
    </svg>
  ),
  "error:walkthrough_not_available": (
    <svg viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <ellipse cx="200" cy="280" rx="160" ry="22" fill="#E5E5E5" />
      <rect x="40" y="28" width="320" height="234" rx="14" fill="white" stroke="#E1E5EA" strokeWidth="2" />
      <rect x="90" y="70" width="220" height="190" rx="10" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="2" />
      <polygon points="270,70 310,110 270,110" fill="#E5E7EB" />
      <line x1="270" y1="70" x2="310" y2="110" stroke="#D1D5DB" strokeWidth="2" />
      <rect x="114" y="120" width="148" height="10" rx="3" fill="#E5E7EB" />
      <rect x="114" y="146" width="120" height="10" rx="3" fill="#EEF0F2" />
      <rect x="114" y="172" width="134" height="10" rx="3" fill="#EEF0F2" />
      <line x1="80" y1="60" x2="330" y2="260" stroke="#E74C3C" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
      <line x1="330" y1="60" x2="80" y2="260" stroke="#E74C3C" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
    </svg>
  ),
  "no_data:desert": (
    <svg viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <ellipse cx="200" cy="280" rx="160" ry="22" fill="#E5E5E5" />
      <rect x="40" y="28" width="320" height="234" rx="14" fill="white" stroke="#E1E5EA" strokeWidth="2" />
      <rect x="54" y="42" width="292" height="206" rx="10" fill="#FEF9EE" />
      <path d="M60 260 Q130 200 200 230 Q270 260 340 210 L340 280 L60 280 Z" fill="#F5DEB3" />
      <rect x="110" y="165" width="16" height="80" rx="5" fill="#6EAB6E" />
      <rect x="90" y="185" width="36" height="14" rx="5" fill="#6EAB6E" />
      <rect x="90" y="170" width="14" height="30" rx="5" fill="#6EAB6E" />
      <rect x="265" y="175" width="14" height="70" rx="5" fill="#6EAB6E" />
      <rect x="255" y="194" width="30" height="12" rx="5" fill="#6EAB6E" />
      <rect x="269" y="182" width="12" height="26" rx="5" fill="#6EAB6E" />
      <circle cx="310" cy="100" r="28" fill="#FCD34D" opacity="0.9" />
    </svg>
  ),
  "no_data:open_road": (
    <svg viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <ellipse cx="200" cy="280" rx="160" ry="22" fill="#E5E5E5" />
      <rect x="40" y="28" width="320" height="234" rx="14" fill="white" stroke="#E1E5EA" strokeWidth="2" />
      <rect x="54" y="42" width="292" height="206" rx="10" fill="#DBEAFE" />
      <polygon points="130,260 170,150 230,150 270,260" fill="#D1D5DB" />
      <rect x="196" y="155" width="8" height="20" rx="2" fill="white" opacity="0.7" />
      <rect x="196" y="185" width="8" height="20" rx="2" fill="white" opacity="0.7" />
      <rect x="196" y="215" width="8" height="20" rx="2" fill="white" opacity="0.7" />
      <ellipse cx="120" cy="105" rx="35" ry="18" fill="white" opacity="0.85" />
      <ellipse cx="145" cy="98" rx="28" ry="16" fill="white" opacity="0.85" />
      <ellipse cx="290" cy="115" rx="30" ry="15" fill="white" opacity="0.85" />
      <line x1="60" y1="150" x2="340" y2="150" stroke="#9CA3AF" strokeWidth="1" strokeDasharray="6 4" />
    </svg>
  ),
  "info:going_camping": (
    <svg viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <ellipse cx="200" cy="280" rx="160" ry="22" fill="#E5E5E5" />
      <rect x="40" y="28" width="320" height="234" rx="14" fill="white" stroke="#E1E5EA" strokeWidth="2" />
      <rect x="54" y="42" width="292" height="206" rx="10" fill="#EEF2FF" />
      <polygon points="200,100 115,250 285,250" fill="#60A5FA" stroke="#3B82F6" strokeWidth="2" />
      <polygon points="200,100 200,250 285,250" fill="#3B82F6" />
      <polygon points="200,200 170,250 200,250" fill="#1D4ED8" opacity="0.6" />
      <rect x="60" y="250" width="280" height="30" rx="4" fill="#A7F3D0" opacity="0.6" />
      <circle cx="130" cy="90" r="3" fill="#FCD34D" />
      <circle cx="270" cy="80" r="2.5" fill="#FCD34D" />
      <circle cx="310" cy="105" r="2" fill="#FCD34D" />
      <circle cx="100" cy="115" r="2" fill="#FCD34D" />
      <ellipse cx="330" cy="248" rx="16" ry="5" fill="#FDE68A" opacity="0.6" />
      <path d="M322 248 Q330 220 338 248" fill="#F97316" />
      <path d="M326 248 Q330 228 334 248" fill="#FCD34D" />
    </svg>
  ),
  "info:maintenance": (
    <svg viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <ellipse cx="200" cy="280" rx="160" ry="22" fill="#E5E5E5" />
      <rect x="40" y="28" width="320" height="234" rx="14" fill="white" stroke="#E1E5EA" strokeWidth="2" />
      <circle cx="200" cy="155" r="70" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="3" />
      <rect x="187" y="100" width="26" height="60" rx="6" fill="#9CA3AF" />
      <rect x="170" y="145" width="60" height="26" rx="6" fill="#9CA3AF" />
      <circle cx="200" cy="155" r="14" fill="white" stroke="#6B7280" strokeWidth="3" />
      <path d="M320 80 L340 100 L300 140 L280 120 Z" fill="#F59E0B" stroke="#D97706" strokeWidth="2" />
      <rect x="270" y="130" width="12" height="40" rx="4" fill="#6B7280" transform="rotate(-45 276 150)" />
    </svg>
  ),
  "misc:no_content": (
    <svg viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <ellipse cx="200" cy="280" rx="160" ry="22" fill="#E5E5E5" />
      <rect x="40" y="28" width="320" height="234" rx="14" fill="white" stroke="#E1E5EA" strokeWidth="2" />
      <rect x="90" y="70" width="220" height="190" rx="10" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="2" />
      <polygon points="270,70 310,110 270,110" fill="#E5E7EB" />
      <line x1="270" y1="70" x2="310" y2="110" stroke="#D1D5DB" strokeWidth="2" />
      <rect x="114" y="120" width="148" height="10" rx="3" fill="#E5E7EB" />
      <rect x="114" y="146" width="120" height="10" rx="3" fill="#EEF0F2" />
      <rect x="114" y="172" width="134" height="10" rx="3" fill="#EEF0F2" />
      <rect x="114" y="198" width="100" height="10" rx="3" fill="#EEF0F2" />
      <circle cx="296" cy="80" r="28" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="2" />
      <text x="296" y="89" textAnchor="middle" fill="#9CA3AF" fontSize="28" fontWeight="bold" fontFamily="sans-serif">?</text>
    </svg>
  ),
  "misc:gone_fishing": (
    <svg viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <ellipse cx="200" cy="280" rx="160" ry="22" fill="#E5E5E5" />
      <rect x="40" y="28" width="320" height="234" rx="14" fill="white" stroke="#E1E5EA" strokeWidth="2" />
      <rect x="54" y="42" width="292" height="206" rx="10" fill="#DBEAFE" />
      <ellipse cx="200" cy="230" rx="140" ry="28" fill="#BFDBFE" />
      <path d="M240 170 Q260 140 280 160 Q300 180 260 190 Z" fill="#FCD34D" />
      <path d="M260 190 Q280 195 265 205 Q240 200 240 170 Z" fill="#F59E0B" />
      <path d="M120 120 L250 120" stroke="#92400E" strokeWidth="4" strokeLinecap="round" />
      <path d="M250 120 Q260 120 260 130 L260 175" stroke="#92400E" strokeWidth="2" strokeLinecap="round" />
      <circle cx="260" cy="178" r="5" fill="#60A5FA" />
      <circle cx="140" cy="100" r="16" fill="#FDE68A" stroke="#F59E0B" strokeWidth="2" />
      <path d="M132 100 L148 100 M140 92 L140 108" stroke="#F59E0B" strokeWidth="2" />
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
