export type IllustrationType =
  | "empty-state-assistant"
  | "empty-state-events"
  | "empty-state-tasks"
  | "no-access"
  | "no-connection"
  | "no-data"
  | "error";

export interface IllustrationProps {
  /** The illustration variant to display. Drives the SVG image shown. */
  type?: IllustrationType;
  /** Bold heading text below the image */
  heading?: string;
  /** Descriptive body text beneath the heading */
  body?: string;
  /** Size modifier — controls the overall scale of the illustration */
  size?: "small" | "medium" | "large";
}
