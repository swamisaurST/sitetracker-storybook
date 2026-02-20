export interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  /** Group label displayed above the options */
  label?: string;
  /** HTML name attribute used to group radio inputs */
  name?: string;
  /** Array of selectable options */
  options: RadioOption[];
  /** Currently selected value */
  value?: string;
  /** Rendering mode: stacked radio inputs or a button toggle group */
  type?: "radio" | "button";
  /** Disable all options in the group */
  disabled?: boolean;
  /** Mark the group as required */
  required?: boolean;
  /** Layout direction (only applies when type is "radio") */
  orientation?: "vertical" | "horizontal";
  /** Callback fired when selection changes */
  onChange?: (value: string) => void;
}
