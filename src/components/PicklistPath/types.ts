export interface PathOption {
  /** Display text for this step */
  label: string;
  /** Value identifier for this step */
  value: string;
  /** Optional coaching guidance text shown when this step is active */
  description?: string;
}

export interface PicklistPathProps {
  /** Accessible label for the path navigation */
  label?: string;
  /** Ordered array of path steps */
  options: PathOption[];
  /** Value of the currently active step */
  value?: string;
  /** Whether the user can click to change the active step */
  isEditable?: boolean;
  /** Show coaching guidance text below the path */
  showCoaching?: boolean;
  /** Callback fired with the new step value when a step is clicked */
  onSelect?: (value: string) => void;
}
