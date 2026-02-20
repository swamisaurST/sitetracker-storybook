/**
 * Image name format: "category:identifier" — matches the exact keys in
 * stIllustrationImage's images/index.js in sitetracker/strk@preprod.
 *
 * The LWC component renders these from SVG templates stored as Salesforce
 * Static Resources. In this Storybook, the 3 SLDS-packaged types render from
 * the @salesforce-ux/design-system npm package; all others show custom
 * fallback artwork (not the official Salesforce SVGs).
 *
 * Full image index (28 types) from sitetracker/strk@preprod:
 *   custom:fishing_deals, custom:lake_mountain, custom:no_events, custom:no_task,
 *   custom:pp_robot, custom:pp_miss_config, custom:pp_robot_search,
 *   custom:pp_robot_no_records, custom:pp_robot_no_results,
 *   custom:pp_robot_walkthrough_not_available, custom:setup, custom:loading,
 *   error:no_access, error:no_connection, error:not_available_in_lightning,
 *   error:page_not_available, error:walkthrough_not_available,
 *   info:going_camping, info:maintenance,
 *   misc:gone_fishing, misc:no_access2, misc:no_content, misc:no_preview,
 *   misc:preview, misc:research,
 *   no_data:desert, no_data:open_road
 *
 * SLDS reference: https://www.lightningdesignsystem.com/components/illustration/
 */
export type IllustrationImageType =
  // ─── SLDS packaged (real SVGs in npm package) ────────────────────────────
  | "empty-state-assistant"
  | "empty-state-events"
  | "empty-state-tasks"
  // ─── Error states (custom fallback artwork) ──────────────────────────────
  | "error:no_access"
  | "error:no_connection"
  | "error:page_not_available"
  | "error:walkthrough_not_available"
  // ─── No data states (custom fallback artwork) ────────────────────────────
  | "no_data:desert"
  | "no_data:open_road"
  // ─── Info states (custom fallback artwork) ───────────────────────────────
  | "info:going_camping"
  | "info:maintenance"
  // ─── Misc states (custom fallback artwork) ───────────────────────────────
  | "misc:no_content"
  | "misc:gone_fishing";

export interface IllustrationImageProps {
  /**
   * The illustration image name. Format: "category:identifier"
   * Real LWC prop: imageName
   */
  type?: IllustrationImageType;
  /** Size modifier — controls max-width of the image */
  size?: "small" | "medium" | "large";
  /** Alt text for accessibility. Leave empty for decorative images. */
  alt?: string;
}
