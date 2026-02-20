import React from "react";

type IconCategory = "utility" | "standard" | "action" | "custom" | "doctype";

interface SLDSIconProps {
  category?: IconCategory;
  name: string;
  size?: "xx-small" | "x-small" | "small" | "medium" | "large";
  className?: string;
  assistiveText?: string;
  containerClassName?: string;
}

/**
 * Renders SLDS icons from local sprite sheets (no CDN).
 * Sprite files served via Storybook's staticDirs from the SLDS npm package.
 */
export const SLDSIcon: React.FC<SLDSIconProps> = ({
  category = "utility",
  name,
  size = "small",
  className = "",
  assistiveText,
  containerClassName = "",
}) => {
  const spritePath = `/assets/icons/${category}-sprite/svg/symbols.svg#${name}`;

  const isUtility = category === "utility";
  const containerClass = isUtility
    ? `slds-icon_container slds-icon-utility-${name} ${containerClassName}`.trim()
    : `slds-icon_container slds-icon-${category}-${name} ${containerClassName}`.trim();

  return (
    <span className={containerClass} title={assistiveText}>
      <svg
        className={`slds-icon slds-icon_${size} ${className}`.trim()}
        aria-hidden={!assistiveText}
      >
        <use xlinkHref={spritePath} />
      </svg>
      {assistiveText && (
        <span className="slds-assistive-text">{assistiveText}</span>
      )}
    </span>
  );
};

/** Utility-only icon shorthand (most common usage) */
export const UtilityIcon: React.FC<Omit<SLDSIconProps, "category">> = (
  props
) => <SLDSIcon {...props} category="utility" />;
