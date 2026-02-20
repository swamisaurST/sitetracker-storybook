import React from "react";
// @ts-ignore
import siitetrackerLogo from "../../assets/sitetracker-logo.png";

// ─── Tokens ───────────────────────────────────────────────────────────
const T = {
  bg:         "#0A1628",
  surface:    "#0D1E35",
  card:       "#112040",
  cardHover:  "#162B50",
  border:     "#1E3A6E",
  borderSoft: "#152A52",
  text:       "#E4EDF8",
  muted:      "#6B87A8",
  dim:        "#3D5573",
  accent:     "#22A0F5",
  accentDim:  "#0E4D80",
  success:    "#3FB868",
  warning:    "#FF9C2A",
  orange:     "#FF6B2B",
} as const;

// ─── Types ────────────────────────────────────────────────────────────
export type ComponentStatus = "built" | "in-progress" | "planned" | "domain-specific";

export interface CategoryComponent {
  name: string;
  label: string;
  description: string;
  status: ComponentStatus;
  reusable: boolean;
  usages?: number;
  storyPath?: string; // e.g. "Categories/Data Display & Grid/stLwcDataTable"
  githubPath?: string;
  pattern?: string;
}

function storyUrl(storyPath: string): string {
  const id = storyPath
    .toLowerCase()
    .replace(/[&]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return `/?path=/story/${id}--default`;
}

export interface CategoryPageProps {
  phase: number;
  category: string;
  icon: string;
  description: string;
  components: CategoryComponent[];
  codaUrl: string;
}

const STATUS_CONFIG: Record<ComponentStatus, { label: string; color: string; bg: string; dot: string }> = {
  "built":            { label: "Built",           color: T.success,  bg: `${T.success}18`,  dot: T.success  },
  "in-progress":      { label: "In Progress",     color: T.accent,   bg: `${T.accent}18`,   dot: T.accent   },
  "planned":          { label: "Planned",         color: T.muted,    bg: `${T.border}50`,   dot: T.dim      },
  "domain-specific":  { label: "Domain-Specific", color: T.orange,   bg: `${T.orange}18`,   dot: T.orange   },
};

const PHASE_COLORS: Record<number, string> = {
  1: T.accent,
  2: "#B36CF5",
  3: T.orange,
  4: T.muted,
};

const PHASE_LABELS: Record<number, string> = {
  1: "Phase 1 — Current",
  2: "Phase 2 — Next",
  3: "Phase 3 — Planned",
  4: "Phase 4 — Backlog",
};

// ─── Component ────────────────────────────────────────────────────────
export const CategoryPage: React.FC<CategoryPageProps> = ({
  phase, category, icon, description, components, codaUrl,
}) => {
  const builtCount = components.filter((c) => c.status === "built").length;
  const pct = Math.round((builtCount / components.length) * 100);
  const phColor = PHASE_COLORS[phase];

  return (
    <div style={{
      background: T.bg,
      minHeight: "100vh",
      fontFamily: '"Salesforce Sans","Inter",-apple-system,sans-serif',
      color: T.text,
      padding: "2.5rem 2rem 5rem",
    }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>

        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.75rem", fontSize: "0.75rem", color: T.muted }}>
          <img src={siitetrackerLogo} alt="Sitetracker" style={{ height: "14px", opacity: 0.4 }} />
          <span style={{ color: T.dim }}>›</span>
          <span>Component Library</span>
          <span style={{ color: T.dim }}>›</span>
          <span style={{ color: T.text, fontWeight: 500 }}>{category}</span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "2rem", lineHeight: 1, marginTop: "2px" }}>{icon}</span>
            <div>
              <h1 style={{ margin: "0 0 0.3rem", fontSize: "1.5rem", fontWeight: 700, color: T.text }}>
                {category}
              </h1>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "0.35rem",
                fontSize: "0.68rem", fontWeight: 700, color: phColor,
                background: `${phColor}18`, padding: "0.15rem 0.65rem",
                borderRadius: "999px", border: `1px solid ${phColor}40`,
              }}>
                {PHASE_LABELS[phase]}
              </span>
            </div>
          </div>

          <p style={{ margin: "0 0 1.25rem", fontSize: "0.875rem", color: T.muted, lineHeight: 1.7, maxWidth: "680px" }}>
            {description}
          </p>

          {/* Progress + Coda link */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ width: "110px", background: T.borderSoft, borderRadius: "999px", height: "5px", overflow: "hidden" }}>
                <div style={{
                  width: `${pct}%`, height: "100%", borderRadius: "999px",
                  background: pct === 100 ? T.success : T.accent,
                }} />
              </div>
              <span style={{ fontSize: "0.78rem", color: T.muted }}>{builtCount}/{components.length} built</span>
            </div>
            <a href={codaUrl} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: "0.75rem", color: T.accent, textDecoration: "none", display: "flex", alignItems: "center", gap: "0.3rem", opacity: 0.85 }}>
              📋 View in Coda <span style={{ fontSize: "0.6rem" }}>↗</span>
            </a>
          </div>
        </div>

        {/* Component table */}
        <div style={{ border: `1px solid ${T.border}`, borderRadius: "8px", overflow: "hidden" }}>
          {/* Column headers */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1.6fr 72px 110px",
            padding: "0.5rem 1rem",
            background: T.surface,
            fontSize: "0.66rem", fontWeight: 700, color: T.dim,
            textTransform: "uppercase", letterSpacing: "0.07em",
            borderBottom: `1px solid ${T.border}`,
          }}>
            <span>Component</span>
            <span>Description</span>
            <span style={{ textAlign: "center" }}>Usages</span>
            <span style={{ textAlign: "center" }}>Status</span>
          </div>

          {components.map((comp, idx) => {
            const s = STATUS_CONFIG[comp.status];
            return (
              <div
                key={comp.name}
                style={{
                  display: "grid", gridTemplateColumns: "1fr 1.6fr 72px 110px",
                  padding: "0.9rem 1rem",
                  borderTop: `1px solid ${T.borderSoft}`,
                  alignItems: "start", gap: "0.5rem",
                  transition: "background 0.12s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = T.card)}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                {/* Name column */}
                <div>
                  {comp.storyPath ? (
                    <a href={storyUrl(comp.storyPath)}
                      style={{ fontWeight: 600, fontSize: "0.82rem", color: T.accent, marginBottom: "0.2rem", display: "block", textDecoration: "none" }}>
                      {comp.label} →
                    </a>
                  ) : (
                    <div style={{ fontWeight: 600, fontSize: "0.82rem", color: T.text, marginBottom: "0.2rem" }}>
                      {comp.label}
                    </div>
                  )}
                  <div style={{ fontSize: "0.67rem", color: T.dim, fontFamily: "monospace" }}>
                    {comp.name}
                  </div>
                  {comp.githubPath && (
                    <a href={comp.githubPath} target="_blank" rel="noopener noreferrer"
                      style={{ fontSize: "0.65rem", color: T.muted, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.2rem", marginTop: "0.2rem", opacity: 0.7 }}>
                      GitHub ↗
                    </a>
                  )}
                </div>

                {/* Description */}
                <div style={{ fontSize: "0.78rem", color: T.muted, lineHeight: 1.55 }}>
                  {comp.description}
                </div>

                {/* Usages */}
                <div style={{ textAlign: "center", fontSize: "0.8rem", color: T.muted, fontWeight: 500, paddingTop: "2px" }}>
                  {comp.usages !== undefined ? `~${comp.usages}` : "—"}
                </div>

                {/* Status badge */}
                <div style={{ textAlign: "center", paddingTop: "2px" }}>
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: "0.3rem",
                    fontSize: "0.67rem", fontWeight: 600,
                    color: s.color, background: s.bg,
                    padding: "0.2rem 0.6rem", borderRadius: "999px",
                  }}>
                    <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: s.dot, flexShrink: 0 }} />
                    {s.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div style={{ display: "flex", gap: "1.25rem", marginTop: "0.85rem", flexWrap: "wrap" }}>
          {(Object.entries(STATUS_CONFIG) as [ComponentStatus, typeof STATUS_CONFIG[ComponentStatus]][]).map(([key, val]) => (
            <div key={key} style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.7rem", color: T.dim }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: val.dot }} />
              {val.label}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
