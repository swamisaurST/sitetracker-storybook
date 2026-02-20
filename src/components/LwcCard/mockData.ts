import type { CardAction } from "./types";

export const EDIT_ACTION: CardAction = {
  label: "Edit",
  variant: "neutral",
  onClick: () => console.log("Edit clicked"),
};

export const NEW_ACTION: CardAction = {
  label: "New",
  variant: "brand",
  onClick: () => console.log("New clicked"),
};

export const SETTINGS_ACTION: CardAction = {
  label: "Settings",
  variant: "neutral",
  onClick: () => console.log("Settings clicked"),
};

export const SAMPLE_TABLE_ROWS = [
  { name: "Tower Installation", status: "In Progress", owner: "Alex Chen", due: "Mar 15, 2026" },
  { name: "Fiber Splice",        status: "Not Started",  owner: "Sarah Kim",  due: "Mar 22, 2026" },
  { name: "Site Survey",         status: "Complete",     owner: "Mike Davis", due: "Feb 28, 2026" },
];
