/**
 * Real LWC API (stIllustration in sitetracker/strk@preprod):
 *   @api imageName  — format: "category:identifier" (matches stIllustrationImage keys)
 *   @api heading    — same as our prop ✅
 *   @api messageBody — we call this "body" in our React component
 *   @api imageSize  — only "small" | "large" in the real LWC (default "small")
 *   @api textOnly   — not in our component (hides the image, shows only text)
 *   @api headingClass — SLDS text class override
 *
 * Our React recreation uses simplified prop names (type, body, size) for ease of
 * use in Storybook controls. See IllustrationType for the real imageName values.
 */
export type IllustrationType =
  // ─── SLDS packaged SVGs (from @salesforce-ux/design-system npm package) ──
  | "empty-state-assistant"
  | "empty-state-events"
  | "empty-state-tasks"
  // ─── Sitetracker image names (custom fallback artwork in Storybook) ───────
  | "error:no_access"
  | "error:no_connection"
  | "error:page_not_available"
  | "no_data:desert"
  | "no_data:open_road"
  | "info:going_camping"
  | "misc:no_content"
  | "misc:gone_fishing";

export interface IllustrationProps {
  /**
   * The illustration image to display.
   * Real LWC prop: imageName (format: "category:identifier")
   */
  type?: IllustrationType;
  /** Bold heading text below the image. Real LWC prop: heading ✅ */
  heading?: string;
  /** Descriptive body text. Real LWC prop: messageBody */
  body?: string;
  /**
   * Size modifier. Real LWC only supports "small" | "large" (default "small").
   * Our recreation adds "medium" as a midpoint for demo purposes.
   */
  size?: "small" | "medium" | "large";
}
