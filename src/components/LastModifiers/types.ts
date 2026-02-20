export interface ModifierUser {
  /** Unique identifier */
  id: string;
  /** Display name */
  name: string;
  /** Avatar image URL (optional — falls back to initials) */
  avatarUrl?: string;
  /** Initials shown when no avatarUrl is provided (auto-derived from name if omitted) */
  initials?: string;
  /** Background color for initials avatar. Defaults to a deterministic color from name. */
  color?: string;
  /** ISO 8601 timestamp of when this user last modified the record */
  modifiedAt?: string;
}

export interface LastModifiersProps {
  /** List of users who last modified the record */
  users?: ModifierUser[];
  /** Max number of avatars visible before showing "+N" overflow badge */
  maxVisible?: number;
  /** Label shown before the avatar group */
  label?: string;
  /** Show tooltip with name + date on hover */
  showTooltip?: boolean;
  /** Size of each avatar */
  size?: "x-small" | "small" | "medium";
}
