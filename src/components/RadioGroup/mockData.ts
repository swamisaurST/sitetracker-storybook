import type { RadioOption } from "./types";

export const projectStatusOptions: RadioOption[] = [
  { label: "Initiated", value: "initiated" },
  { label: "Planning", value: "planning" },
  { label: "Active", value: "active" },
  { label: "On Hold", value: "on_hold" },
  { label: "Complete", value: "complete" },
];

export const priorityOptions: RadioOption[] = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
  { label: "Critical", value: "critical" },
];

export const viewModeOptions: RadioOption[] = [
  { label: "List View", value: "list" },
  { label: "Card View", value: "card" },
  { label: "Map View", value: "map" },
];

export const timeframeOptions: RadioOption[] = [
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
  { label: "This Quarter", value: "quarter" },
  { label: "This Year", value: "year" },
];

export const visibilityOptions: RadioOption[] = [
  { label: "Everyone", value: "all" },
  { label: "Team Only", value: "team" },
  { label: "Admins Only", value: "admin", disabled: true },
];
