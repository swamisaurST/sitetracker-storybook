import React, { useState } from "react";
import type { LastModifiersProps, ModifierUser } from "./types";

// Deterministic color palette from name (avoids random per-render)
const AVATAR_COLORS = [
  "#0176D3", "#00857D", "#9050E9", "#E07735",
  "#C23934", "#3FB868", "#B45309", "#0D7084",
];

function colorFromName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function getInitials(user: ModifierUser): string {
  if (user.initials) return user.initials.slice(0, 2).toUpperCase();
  const parts = user.name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return user.name.slice(0, 2).toUpperCase();
}

function formatDate(iso?: string): string {
  if (!iso) return "";
  try {
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(iso));
  } catch {
    return iso;
  }
}

const SIZE_CONFIG = {
  "x-small": { dim: 24, fontSize: "0.55rem", gap: -6 },
  small:     { dim: 32, fontSize: "0.68rem", gap: -8 },
  medium:    { dim: 40, fontSize: "0.78rem", gap: -10 },
};

interface AvatarProps {
  user: ModifierUser;
  size: keyof typeof SIZE_CONFIG;
  showTooltip: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ user, size, showTooltip }) => {
  const [hovered, setHovered] = useState(false);
  const { dim, fontSize } = SIZE_CONFIG[size];
  const bg = user.color ?? colorFromName(user.name);
  const initials = getInitials(user);
  const dateStr = formatDate(user.modifiedAt);

  return (
    <div
      style={{ position: "relative", display: "inline-flex" }}
      onMouseEnter={() => showTooltip && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Avatar circle */}
      <div
        aria-label={user.name}
        style={{
          width: `${dim}px`,
          height: `${dim}px`,
          borderRadius: "50%",
          border: "2px solid white",
          overflow: "hidden",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          background: user.avatarUrl ? "#EEE" : bg,
          flexShrink: 0,
          cursor: "default",
          userSelect: "none",
        }}
      >
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={user.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <span style={{ fontSize, fontWeight: 600, color: "white", lineHeight: 1 }}>
            {initials}
          </span>
        )}
      </div>

      {/* Tooltip */}
      {showTooltip && hovered && (
        <div
          role="tooltip"
          style={{
            position: "absolute",
            bottom: `${dim + 6}px`,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#032D60",
            color: "white",
            padding: "0.3rem 0.6rem",
            borderRadius: "4px",
            fontSize: "0.72rem",
            whiteSpace: "nowrap",
            zIndex: 1000,
            pointerEvents: "none",
            boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
          }}
        >
          <div style={{ fontWeight: 600 }}>{user.name}</div>
          {dateStr && <div style={{ opacity: 0.75, marginTop: "1px" }}>{dateStr}</div>}
          {/* Arrow */}
          <div style={{
            position: "absolute",
            bottom: "-5px",
            left: "50%",
            transform: "translateX(-50%)",
            width: 0,
            height: 0,
            borderLeft: "5px solid transparent",
            borderRight: "5px solid transparent",
            borderTop: "5px solid #032D60",
          }} />
        </div>
      )}
    </div>
  );
};

export const LastModifiers: React.FC<LastModifiersProps> = ({
  users = [],
  maxVisible = 5,
  label = "Last modified by",
  showTooltip = true,
  size = "small",
}) => {
  const { dim, fontSize, gap } = SIZE_CONFIG[size];
  const visible = users.slice(0, maxVisible);
  const overflow = users.length - maxVisible;
  const bg = AVATAR_COLORS[0];

  if (users.length === 0) {
    return (
      <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
        {label && <span style={{ fontSize: "0.75rem", color: "#706E6B" }}>{label}</span>}
        <span style={{ fontSize: "0.75rem", color: "#ADADAD", fontStyle: "italic" }}>No modifiers</span>
      </div>
    );
  }

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "0.625rem", flexWrap: "wrap" }}>
      {label && (
        <span style={{ fontSize: "0.75rem", color: "#706E6B", flexShrink: 0 }}>{label}</span>
      )}

      {/* Avatar stack */}
      <div style={{ display: "flex", alignItems: "center" }}>
        {visible.map((user, i) => (
          <div key={user.id} style={{ marginLeft: i === 0 ? 0 : `${gap}px`, zIndex: visible.length - i }}>
            <Avatar user={user} size={size} showTooltip={showTooltip} />
          </div>
        ))}

        {/* Overflow badge */}
        {overflow > 0 && (
          <div
            style={{
              marginLeft: `${gap}px`,
              width: `${dim}px`,
              height: `${dim}px`,
              borderRadius: "50%",
              border: "2px solid white",
              background: "#E5E5E5",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize,
              fontWeight: 600,
              color: "#706E6B",
              flexShrink: 0,
              zIndex: 0,
              userSelect: "none",
            }}
            aria-label={`${overflow} more users`}
            title={`${overflow} more`}
          >
            +{overflow}
          </div>
        )}
      </div>

      {/* Single-user name display when only 1 modifier */}
      {users.length === 1 && (
        <span style={{ fontSize: "0.8rem", color: "#3E3E3C", fontWeight: 500 }}>
          {users[0].name}
          {users[0].modifiedAt && (
            <span style={{ fontWeight: 400, color: "#706E6B", marginLeft: "0.3rem" }}>
              · {formatDate(users[0].modifiedAt)}
            </span>
          )}
        </span>
      )}
    </div>
  );
};

export default LastModifiers;
