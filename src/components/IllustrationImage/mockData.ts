import type { IllustrationImageType } from "./types";

/** All supported types. First 3 use real SLDS SVGs; last 4 use custom fallback artwork. */
export const ALL_TYPES: IllustrationImageType[] = [
  "empty-state-assistant",
  "empty-state-events",
  "empty-state-tasks",
  "no-access",
  "no-connection",
  "no-data",
  "error",
];

export const TYPE_LABELS: Record<IllustrationImageType, string> = {
  "empty-state-assistant": "Empty State — Assistant (SLDS SVG)",
  "empty-state-events":    "Empty State — Events (SLDS SVG)",
  "empty-state-tasks":     "Empty State — Tasks (SLDS SVG)",
  "no-access":             "No Access (custom fallback)",
  "no-connection":         "No Connection (custom fallback)",
  "no-data":               "No Data (custom fallback)",
  "error":                 "Error (custom fallback)",
};
