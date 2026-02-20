/**
 * SLDS Illustration type names.
 *
 * Sources:
 *   - empty-state-assistant / empty-state-events / empty-state-tasks
 *       → Real SVGs shipped in @salesforce-ux/design-system npm package.
 *         Rendered from /assets/images/illustrations/*.svg
 *
 *   - no-access / no-connection / no-data / error
 *       → Real SLDS illustration type names (see lightningdesignsystem.com/components/illustration/).
 *         The actual Salesforce SVG artwork is NOT included in the npm package —
 *         these render custom fallback SVGs designed to approximate the intended state.
 *
 * Full SLDS illustration reference:
 *   https://www.lightningdesignsystem.com/components/illustration/
 */
export type IllustrationImageType =
  | "empty-state-assistant"
  | "empty-state-events"
  | "empty-state-tasks"
  | "no-access"
  | "no-connection"
  | "no-data"
  | "error";

export interface IllustrationImageProps {
  /** The illustration variant to display */
  type?: IllustrationImageType;
  /** Size modifier — controls max-width of the image */
  size?: "small" | "medium" | "large";
  /** Alt text for accessibility. Leave empty for decorative images. */
  alt?: string;
}
