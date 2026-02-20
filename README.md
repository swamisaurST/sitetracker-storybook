# Sitetracker LWC Component Library

> An external Storybook documenting Sitetracker's Lightning Web Components — built for designers, frontend engineers, and anyone working in the Sitetracker UI.

[![Storybook](https://img.shields.io/badge/Storybook-Live-FF4785?logo=storybook&logoColor=white)](https://swamisaurst.github.io/sitetracker-storybook/)
[![GitHub Pages](https://img.shields.io/badge/Deployed-GitHub%20Pages-222?logo=github)](https://swamisaurst.github.io/sitetracker-storybook/)
[![Components](https://img.shields.io/badge/Components-14%20built-22A0F5)](https://swamisaurst.github.io/sitetracker-storybook/)
[![Phase](https://img.shields.io/badge/Phase-2%20in%20progress-B36CF5)](https://coda.io/d/Development-Plans_dHCab2qMnp2/Reusable-Components_suHonxkL)

---

## 🔗 Links

| | |
|---|---|
| **Live Storybook** | https://swamisaurst.github.io/sitetracker-storybook/ |
| **Component Inventory & Roadmap** | https://coda.io/d/Development-Plans_dHCab2qMnp2/Reusable-Components_suHonxkL |
| **LWC Source (Sitetracker repo)** | https://github.com/sitetracker/strk/tree/preprod/src/main/default/lwc |

---

## What this is

Sitetracker ships ~76 reusable Lightning Web Components. This Storybook is the browser-native reference for those components — every entry is:

- **Cross-verified** against the actual LWC source in `sitetracker/strk@preprod`
- **Documented to SLDS standards** — props, variants, slots, and real wire-adapter behaviour are all called out
- **Linked back** to GitHub usages, Salesforce Lightning Design System docs, and Coda inventory

This is a companion to the internal `stLwcStorybook` that runs inside Salesforce orgs. This one runs in a browser and is accessible to anyone on the team without an org login.

---

## Components built

### Phase 1 — Data Display & Grid (6/8)

| Component | Pattern | Usage refs |
|---|---|---|
| `stLwcDataTable` | Standard SLDS datatable wrapper | ~69 |
| `stEditableDatatable` | Inline-edit datatable with toolbar | ~46 |
| `stTreeGrid` | SLDS tree-grid for hierarchical data | ~6 |
| `stEditableTreeGrid` | Editable tree-grid | ~41 |
| `stObjectEditableTreeGrid` | Object-driven editable tree-grid | — |
| `stManyToMany` | Many-to-many relationship table | ~12 |

### Phase 2 — UI/UX Building Blocks (8/14)

| Component | Description |
|---|---|
| `stIllustration` | Empty state / error illustrations with heading + body |
| `stIllustrationImage` | Standalone SLDS illustration SVG |
| `stRadioGroup` | Radio button group — vertical, horizontal, and button-toggle modes |
| `stPicklistPathLWC` | SLDS Path for any picklist field |
| `stFieldsetContainer` | Fieldset read/edit container with save-cancel flow |
| `stLwcCard` | Card shell with icon header, actions, and slots |
| `stBetaBar` | Beta / info / warning announcement banner |
| `stLastModifiers` | Stacked avatar group showing last record modifiers |

**Remaining in Phase 2 (planned):** `stSobjectPicker`, `stObjectLayoutRelatedList`, `stIframeContainer`, `stRecordSideBar`, `stProductFeedback`, `stFeedback`

---

## Roadmap

| Phase | Category | Components | Status |
|---|---|---|---|
| 1 | Data Display & Grid | 8 | 🟢 6 built |
| 2 | Schedule & Timeline | 7 | ⚪ Planned |
| 2 | UI/UX Building Blocks | 14 | 🔵 8 built |
| 3 | Financial & Budget | 6 | ⚪ Planned |
| 3 | Inventory & Asset | 5 | ⚪ Planned |
| 3 | Files | 4 | ⚪ Planned |
| 3 | Calendar & Scheduler | 3 | ⚪ Planned |
| 4 | Approval & Workflow | 4 | ⚪ Planned |
| 4 | Production Tracking | 3 | ⚪ Planned |
| 4 | Trackers | 4 | ⚪ Planned |
| 4 | Map & GIS | 7 | ⚪ Planned |
| 4 | Maintenance | 2 | ⚪ Planned |
| 4 | Modules | 8 | ⚪ Planned |

Full tracker with per-component status → [Coda](https://coda.io/d/Development-Plans_dHCab2qMnp2/Reusable-Components_suHonxkL)

---

## Stack

| | |
|---|---|
| **Framework** | React 19 + TypeScript 5 |
| **Storybook** | v8 (Vite builder) |
| **Styling** | Salesforce Lightning Design System (SLDS) utility classes + inline tokens |
| **Deployment** | GitHub Actions → GitHub Pages |
| **Icons / SVGs** | `@salesforce-ux/design-system` npm package |

---

## Running locally

```bash
# Install
npm install

# Dev server (localhost:6006)
npm run storybook

# Production build
npm run build-storybook
```

---

## How each component is documented

Each component entry follows the same structure:

1. **What it is** — plain-English description with SLDS blueprint reference
2. **Real LWC API** — actual prop names, types, wire adapters, and events from the source; where our React implementation differs this is called out explicitly
3. **Variants** — every meaningful visual/behavioural state has its own story
4. **Usage refs** — GitHub code-search hit count across `sitetracker/strk@preprod`
5. **Architecture notes** — inner components used, pattern classification (A–G), and any SLDS dependencies

---

## Research notes

A few things discovered during the audit that aren't obvious from the Coda inventory:

- **Internal Storybook already exists** — `stLwcStorybook` is an LWC that runs inside the Salesforce org with ~20 registered demos. This is the external complement.
- **7 distinct architecture patterns** — what looked like similar table components turned out to be 7 genuinely different patterns, from a thin SLDS wrapper to a full Light DOM custom engine.
- **15 shared inner components** — `c-st-paginator`, `c-st-illustration`, `c-st-lwc-card`, etc. are the real primitives; the public-facing components are orchestrators on top.
- **3 ghost components** — `stRelatedList`, `stFieldSetForm`, and a duplicate `stPicklistPath` appear in Coda but are deleted from GitHub. Their replacement `stObjectLayoutRelatedList` was missing from Coda entirely.
- **`stLwcDataTable` is the most-used component** — ~69 file references vs ~46 for `stEditableDatatable`.
