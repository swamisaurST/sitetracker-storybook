import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
// @ts-ignore
import siitetrackerLogo from "../assets/sitetracker-logo.png";

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

// ─── Data ─────────────────────────────────────────────────────────────
const CODA_URL =
  "https://coda.io/d/Development-Plans_dHCab2qMnp2/Reusable-Components_suHonxkL#Table-6_tu4NBnpr";

interface CategoryProgress {
  name: string;
  total: number;
  built: number;
  phase: number;
  codaAnchor: string;
  /** Storybook meta title for this category (e.g. "Categories/Data Display & Grid"). Used when built > 0 to link to category page. */
  storyTitle?: string;
  note?: string;
}

const CATEGORIES: CategoryProgress[] = [
  { name: "Data Display & Grid",    total: 8,  built: 6, phase: 1, codaAnchor: "Table-6_tu4NBnpr", storyTitle: "Categories/Data Display & Grid",    note: "6 reusable · 2 domain-specific" },
  { name: "Schedule & Timeline",    total: 7,  built: 0, phase: 2, codaAnchor: "suHonxkL",        storyTitle: "Categories/Schedule & Timeline" },
  { name: "UI/UX Building Blocks",  total: 14, built: 8, phase: 2, codaAnchor: "suHonxkL",        storyTitle: "Categories/UI · UX Building Blocks" },
  { name: "Financial & Budget",     total: 6,  built: 0, phase: 3, codaAnchor: "suHonxkL",        storyTitle: "Categories/Financial & Budget" },
  { name: "Inventory & Asset",      total: 5,  built: 0, phase: 3, codaAnchor: "suHonxkL",        storyTitle: "Categories/Inventory & Asset" },
  { name: "Files",                  total: 4,  built: 0, phase: 3, codaAnchor: "suHonxkL",        storyTitle: "Categories/Files" },
  { name: "Calendar & Scheduler",   total: 3,  built: 0, phase: 3, codaAnchor: "suHonxkL",        storyTitle: "Categories/Calendar & Scheduler" },
  { name: "Approval & Workflow",    total: 4,  built: 0, phase: 4, codaAnchor: "suHonxkL",        storyTitle: "Categories/Approval & Workflow" },
  { name: "Production Tracking",    total: 3,  built: 0, phase: 4, codaAnchor: "suHonxkL",        storyTitle: "Categories/Production Tracking" },
  { name: "Trackers",               total: 4,  built: 0, phase: 4, codaAnchor: "suHonxkL",        storyTitle: "Categories/Trackers" },
  { name: "Map & GIS",              total: 7,  built: 0, phase: 4, codaAnchor: "suHonxkL",        storyTitle: "Categories/Map & GIS" },
  { name: "Maintenance",            total: 2,  built: 0, phase: 4, codaAnchor: "suHonxkL",        storyTitle: "Categories/Maintenance" },
  { name: "Modules",                total: 8,  built: 0, phase: 4, codaAnchor: "suHonxkL",        storyTitle: "Categories/Modules" },
];

function storyId(storyTitle: string): string {
  return storyTitle
    .toLowerCase()
    .replace(/[&·]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function navigateToCategoryStory(storyTitle: string) {
  const id = storyId(storyTitle);
  const base = typeof window !== "undefined" && window.parent ? window.parent.location.pathname : "";
  const query = `?path=/story/${id}--overview`;
  if (typeof window !== "undefined" && window.parent) {
    window.parent.location.href = base + query;
  }
}

const totalComponents = CATEGORIES.reduce((s, c) => s + c.total, 0);
const totalBuilt      = CATEGORIES.reduce((s, c) => s + c.built, 0);
const totalPct        = Math.round((totalBuilt / totalComponents) * 100);

const PHASES = [
  { n: 1, label: "Phase 1 · Data Display",   built: 6,  total: 8,  color: T.accent  },
  { n: 2, label: "Phase 2 · Schedule & UI",  built: 8,  total: 21, color: "#B36CF5" },
  { n: 3, label: "Phase 3 · Domain-Specific",built: 0,  total: 18, color: T.orange  },
  { n: 4, label: "Phase 4 · Workflows & Maps",built: 0, total: 29, color: T.muted   },
];

const INSIGHTS = [
  {
    emoji: "🕵️",
    title: "Internal Storybook already exists",
    body: "Discovered stLwcStorybook — an LWC that runs inside Salesforce with 20 registered component demos. This external Storybook is the browser-native complement to it.",
  },
  {
    emoji: "🏗️",
    title: "7 distinct architecture patterns",
    body: "What looked like 8 similar data table components turned out to be 7 genuinely different architectural patterns — from a simple wrapper (A) to a full custom table engine built in Light DOM (D).",
  },
  {
    emoji: "🔩",
    title: "15 shared inner components",
    body: "c-st-paginator, c-st-illustration, c-st-lwc-card, c-st-editable-datatable-base… These are the real primitives. The public components are orchestrators on top of these 15 hidden inner ones.",
  },
  {
    emoji: "👻",
    title: "3 ghost components in Coda",
    body: "stRelatedList, stFieldSetForm, and a duplicate StPicklistPath were in the inventory but deleted from GitHub. Their replacement stObjectLayoutRelatedList was missing from Coda entirely.",
  },
  {
    emoji: "📊",
    title: "stLwcDataTable is the most-referenced component",
    body: "GitHub code search shows ~69 file references for stLwcDataTable vs ~46 for stEditableDatatable. The read-only table is actually more widely used than the editable variant.",
  },
  {
    emoji: "💡",
    title: "stObjectEditableTreeGrid may be dead code",
    body: "0 LWC consumers found despite being a public exposed component. Possibly only referenced in flexipage XML — invisible to template code search.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────
const IntroductionPage: React.FC = () => (
  <div style={{
    background: T.bg,
    minHeight: "100vh",
    fontFamily: '"Salesforce Sans","Inter",-apple-system,sans-serif',
    color: T.text,
    padding: "2.5rem 2rem 5rem",
  }}>
    <div style={{ maxWidth: "960px", margin: "0 auto" }}>

      {/* ── Top bar ── */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <img src={siitetrackerLogo} alt="Sitetracker" style={{ height: "28px", objectFit: "contain" }} />
          <div style={{ width: "1px", height: "28px", background: T.border }} />
          <div>
            <div style={{ fontSize: "1rem", fontWeight: 700, color: T.text, lineHeight: 1.2 }}>
              Component Library
            </div>
            <div style={{ fontSize: "0.7rem", color: T.muted, letterSpacing: "0.04em", marginTop: "1px" }}>
              Lightning Web Component Reference
            </div>
          </div>
        </div>

        <a href={CODA_URL} target="_blank" rel="noopener noreferrer" style={{
          display: "inline-flex", alignItems: "center", gap: "0.4rem",
          fontSize: "0.78rem", color: T.accent, textDecoration: "none",
          border: `1px solid ${T.accentDim}`, borderRadius: "6px",
          padding: "0.4rem 0.9rem", fontWeight: 500,
          background: `${T.accent}10`,
          transition: "background 0.15s",
        }}>
          📋 Component Inventory in Coda <span style={{ fontSize: "0.6rem", opacity: 0.7 }}>↗</span>
        </a>
      </div>

      {/* ── Hero progress card ── */}
      <div style={{
        background: `linear-gradient(135deg, #071428 0%, #0D2550 60%, #0E3A7A 100%)`,
        border: `1px solid ${T.border}`,
        borderRadius: "12px",
        padding: "2rem 2.5rem",
        marginBottom: "2rem",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* decorative circles */}
        <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "220px", height: "220px", borderRadius: "50%", background: `${T.accent}08` }} />
        <div style={{ position: "absolute", bottom: "-40px", right: "80px", width: "140px", height: "140px", borderRadius: "50%", background: `${T.accent}05` }} />

        <div style={{ position: "relative" }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "flex-end",
            marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.75rem",
          }}>
            <div>
              <div style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", color: T.muted, textTransform: "uppercase", marginBottom: "0.4rem" }}>
                Documentation Progress
              </div>
              <div style={{ fontSize: "2rem", fontWeight: 700, lineHeight: 1, color: T.text }}>
                {totalBuilt}{" "}
                <span style={{ fontSize: "1rem", color: T.muted, fontWeight: 400 }}>
                  of {totalComponents} components
                </span>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "2.8rem", fontWeight: 800, lineHeight: 1, color: T.accent }}>
                {totalPct}%
              </div>
              <div style={{ fontSize: "0.7rem", color: T.muted, marginTop: "0.2rem" }}>
                Phase 2 in progress
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ background: T.borderSoft, borderRadius: "999px", height: "6px", overflow: "hidden", marginBottom: "1.25rem" }}>
            <div style={{
              background: `linear-gradient(90deg, ${T.accent} 0%, #5BC8FF 100%)`,
              width: `${totalPct}%`,
              height: "100%",
              borderRadius: "999px",
            }} />
          </div>

          {/* Phase pills */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {PHASES.map((p) => (
              <div key={p.n} style={{
                padding: "0.3rem 0.8rem",
                borderRadius: "999px",
                fontSize: "0.7rem",
                fontWeight: 500,
                color: p.built > 0 ? p.color : T.muted,
                background: p.built > 0 ? `${p.color}18` : `${T.border}40`,
                border: `1px solid ${p.built > 0 ? p.color + "50" : T.borderSoft}`,
              }}>
                {p.label} · {p.built}/{p.total}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Category coverage table ── */}
      <div style={{ marginBottom: "2.5rem" }}>
        <SectionHeader
          title="Component Coverage"
          subtitle="All 13 categories from the Sitetracker LWC inventory, grouped by phase."
        />

        <div style={{ border: `1px solid ${T.border}`, borderRadius: "8px", overflow: "hidden" }}>
          {[1, 2, 3, 4].map((phase) => {
            const cats = CATEGORIES.filter((c) => c.phase === phase);
            const phColor = PHASES[phase - 1].color;
            const phLabel = PHASES[phase - 1].label;
            const phBuilt = cats.reduce((s, c) => s + c.built, 0);
            const phTotal = cats.reduce((s, c) => s + c.total, 0);

            return (
              <React.Fragment key={phase}>
                {/* Phase group header */}
                <div style={{
                  padding: "0.45rem 1rem",
                  borderTop: phase > 1 ? `1px solid ${T.border}` : undefined,
                  background: T.surface,
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <span style={{ fontSize: "0.68rem", fontWeight: 700, color: phColor, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    {phLabel}
                  </span>
                  <span style={{ fontSize: "0.68rem", color: T.muted }}>{phBuilt}/{phTotal}</span>
                </div>

                {cats.map((cat) => {
                  const pct = Math.round((cat.built / cat.total) * 100);
                  const codaHref = `https://coda.io/d/Development-Plans_dHCab2qMnp2/Reusable-Components_suHonxkL#${cat.codaAnchor}`;
                  const phaseOneDone = cat.note !== undefined && cat.phase === 1 && cat.built > 0;
                  const statusLabel = phaseOneDone ? "Phase 1 ✓" : cat.built === cat.total ? "Done" : cat.built > 0 ? "In Progress" : "Planned";
                  const statusColor = (phaseOneDone || cat.built === cat.total) ? T.success : cat.built > 0 ? T.accent : T.dim;
                  const statusBg    = (phaseOneDone || cat.built === cat.total) ? `${T.success}18` : cat.built > 0 ? `${T.accent}15` : `${T.border}40`;
                  const isPlanned = cat.built === 0;
                  const linkToStorybook = !isPlanned && cat.storyTitle;

                  const rowStyle: React.CSSProperties = {
                    display: "grid",
                    gridTemplateColumns: "7px minmax(0, 1fr) 80px 56px 88px",
                    alignItems: "center",
                    gap: "0.75rem 1rem",
                    padding: "0.6rem 1rem",
                    borderTop: `1px solid ${T.borderSoft}`,
                    textDecoration: "none",
                    color: "inherit",
                  };

                  const content = (
                    <>
                      <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: statusColor }} />

                      {/* Name + optional note inline, left of progress bar */}
                      <span style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", minWidth: 0, overflow: "hidden" }}>
                        <span style={{ fontSize: "0.83rem", fontWeight: 500, whiteSpace: "nowrap" }}>{cat.name}</span>
                        {cat.note && (
                          <span style={{ fontSize: "0.6rem", color: T.dim, whiteSpace: "nowrap", flexShrink: 0 }}>{cat.note}</span>
                        )}
                      </span>

                      <div style={{ background: T.borderSoft, borderRadius: "999px", height: "4px", overflow: "hidden" }}>
                        <div style={{ width: `${pct}%`, height: "100%", background: cat.built > 0 ? T.accent : T.dim, borderRadius: "999px" }} />
                      </div>

                      <span style={{ fontSize: "0.75rem", color: T.muted, textAlign: "right" }}>{cat.built}/{cat.total}</span>

                      <span style={{
                        fontSize: "0.63rem", padding: "0.15rem 0.5rem", borderRadius: "999px",
                        fontWeight: 600, color: statusColor, background: statusBg,
                        whiteSpace: "nowrap", justifySelf: "end",
                      }}>
                        {statusLabel}
                      </span>
                    </>
                  );

                  if (linkToStorybook) {
                    return (
                      <a
                        key={cat.name}
                        href="#"
                        style={rowStyle}
                        onMouseEnter={(e) => (e.currentTarget.style.background = T.card)}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        onClick={(e) => {
                          e.preventDefault();
                          navigateToCategoryStory(cat.storyTitle!);
                        }}
                        title="Open in Storybook"
                      >
                        {content}
                      </a>
                    );
                  }

                  return (
                    <a
                      key={cat.name}
                      href={codaHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={rowStyle}
                      onMouseEnter={(e) => (e.currentTarget.style.background = T.card)}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      {content}
                    </a>
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* ── Research Insights ── */}
      <div style={{ marginBottom: "2.5rem" }}>
        <SectionHeader
          title="Research Insights"
          subtitle="Key findings from the GitHub source audit before building Phase 1."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
          {INSIGHTS.map((ins) => (
            <div key={ins.title} style={{
              border: `1px solid ${T.border}`,
              borderRadius: "8px",
              padding: "1.25rem",
              background: T.card,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "1.2rem" }}>{ins.emoji}</span>
                <div style={{ fontWeight: 700, fontSize: "0.83rem", color: T.text }}>{ins.title}</div>
              </div>
              <p style={{ margin: 0, fontSize: "0.78rem", color: T.muted, lineHeight: 1.65 }}>{ins.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Footer ── */}
      <div style={{
        paddingTop: "1.5rem",
        borderTop: `1px solid ${T.border}`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: "0.75rem",
      }}>
        <img src={siitetrackerLogo} alt="Sitetracker" style={{ height: "18px", opacity: 0.35 }} />
        <div style={{ fontSize: "0.7rem", color: T.dim }}>
          Phase 2 · Feb 2026 · {totalBuilt}/{totalComponents} components documented
        </div>
        <div style={{ display: "flex", gap: "1.25rem" }}>
          {[
            { label: "Component Inventory", href: CODA_URL },
            { label: "GitHub Source", href: "https://github.com/sitetracker/strk/tree/preprod/src/main/default/lwc" },
            { label: "SLDS Docs", href: "https://developer.salesforce.com/docs/component-library" },
          ].map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: "0.7rem", color: T.accent, textDecoration: "none", opacity: 0.8 }}>
              {l.label} ↗
            </a>
          ))}
        </div>
      </div>

    </div>
  </div>
);

const SectionHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <div style={{ marginBottom: "1rem" }}>
    <h2 style={{ margin: "0 0 0.2rem", fontSize: "1rem", fontWeight: 700, color: T.text }}>{title}</h2>
    <p style={{ margin: 0, fontSize: "0.75rem", color: T.muted }}>{subtitle}</p>
  </div>
);

// ─── Storybook meta ────────────────────────────────────────────────────
const meta = {
  title: "Introduction",
  component: IntroductionPage,
  parameters: {
    layout: "fullscreen",
    docs: { page: null },
    options: { showPanel: false },
    hideToolbar: true,
  },
} satisfies Meta<typeof IntroductionPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  name: "Overview",
  render: () => <IntroductionPage />,
  parameters: {
    options: { showPanel: false },
    hideToolbar: true,
  },
};
