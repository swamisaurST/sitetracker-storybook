import type { ReactNode } from "react";

// Only variants whose IDs exist in the SLDS standard-sprite/svg/symbols.svg are listed.
// The sprite ID uses underscores, e.g. "work_order" not "work-order".
// "standard-project" was removed — no matching ID found in the npm package sprite.
export type CardIconVariant =
  | "standard-account"
  | "standard-contact"
  | "standard-opportunity"
  | "standard-task"
  | "standard-work-order"
  | "custom";

export interface CardAction {
  label: string;
  onClick: () => void;
  variant?: "brand" | "neutral";
}

export interface LwcCardProps {
  /** Card title text displayed in the header */
  title?: string;
  /** Icon variant for the header icon container */
  iconVariant?: CardIconVariant;
  /** Custom icon SVG path (for variant "custom") */
  customIconPath?: string;
  /** Action buttons rendered in the header right slot */
  actions?: CardAction[];
  /** Main body content */
  children?: ReactNode;
  /** Optional footer content */
  footer?: ReactNode;
  /** Whether to show the card border */
  bordered?: boolean;
  /** Whether the card body has inner padding (slds-card__body_inner) */
  innerPadding?: boolean;
}
