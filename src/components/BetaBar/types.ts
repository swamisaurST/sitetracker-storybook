export type BetaBarVariant = "info" | "warning" | "success" | "error";

export interface BetaBarProps {
  /** Feature name displayed prominently in the bar */
  featureName?: string;
  /** Main message text */
  message?: string;
  /** Visual variant — controls color and icon */
  variant?: BetaBarVariant;
  /** Whether to show the beta tag badge */
  showBetaTag?: boolean;
  /** Whether to show the dismiss (×) button */
  dismissible?: boolean;
  /** Link text for a "Learn more" or "Give feedback" CTA */
  ctaLabel?: string;
  /** URL for the CTA link */
  ctaHref?: string;
  /** Callback when dismissed */
  onDismiss?: () => void;
}
