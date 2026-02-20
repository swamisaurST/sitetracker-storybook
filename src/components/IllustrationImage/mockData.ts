import type { IllustrationImageType } from "./types";

export const SLDS_PACKAGED_TYPES: IllustrationImageType[] = [
  "empty-state-assistant",
  "empty-state-events",
  "empty-state-tasks",
];

export const CUSTOM_FALLBACK_TYPES: IllustrationImageType[] = [
  "error:no_access",
  "error:no_connection",
  "error:page_not_available",
  "error:walkthrough_not_available",
  "no_data:desert",
  "no_data:open_road",
  "info:going_camping",
  "info:maintenance",
  "misc:no_content",
  "misc:gone_fishing",
];

export const ALL_TYPES: IllustrationImageType[] = [
  ...SLDS_PACKAGED_TYPES,
  ...CUSTOM_FALLBACK_TYPES,
];

export const TYPE_LABELS: Record<IllustrationImageType, string> = {
  "empty-state-assistant":        "empty-state-assistant (SLDS SVG)",
  "empty-state-events":           "empty-state-events (SLDS SVG)",
  "empty-state-tasks":            "empty-state-tasks (SLDS SVG)",
  "error:no_access":              "error:no_access (custom fallback)",
  "error:no_connection":          "error:no_connection (custom fallback)",
  "error:page_not_available":     "error:page_not_available (custom fallback)",
  "error:walkthrough_not_available": "error:walkthrough_not_available (custom fallback)",
  "no_data:desert":               "no_data:desert (custom fallback)",
  "no_data:open_road":            "no_data:open_road (custom fallback)",
  "info:going_camping":           "info:going_camping (custom fallback)",
  "info:maintenance":             "info:maintenance (custom fallback)",
  "misc:no_content":              "misc:no_content (custom fallback)",
  "misc:gone_fishing":            "misc:gone_fishing (custom fallback)",
};
