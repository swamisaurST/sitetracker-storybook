# Sitetracker Component Storybook — Project Plan

## Project Summary

Build an interactive, browsable component reference for all Sitetracker UI components using **Storybook v8**, **React 18**, **TypeScript**, and **SLDS2 styling**. Each component is documented in the **Salesforce Lightning Component Reference** format. Deployed to **GitHub Pages** on the Sitetracker GitHub org.

## Decisions Locked

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Storybook version | v8 (latest) | Better performance, improved docs, visual testing |
| Rendering framework | React 18 + TypeScript | Best Storybook support, interactive controls, strict typing |
| Styling approach | SLDS2 CSS classes + design tokens | Pixel-perfect parity with production Salesforce UI |
| Documentation format | Salesforce Component Reference format (MDX) | Familiar to Sitetracker devs, comprehensive, standardized |
| Hosting | GitHub Pages (auto-deploy via Actions) | Free, integrated with Sitetracker GitHub org |
| Component source | React recreations (not real LWC) | LWC cannot run outside Salesforce runtime; see ARCHITECTURE_DECISION.md |

## Execution Flow

```
Phase 1: Context        → Save plans, inventory, architecture decision locally
Phase 2: Components     → Research + Build all 8 Data Display components (USER GATE after each)
Phase 3: Storybook Site → Scaffold Storybook, integrate approved components (USER GATE)
Phase 4: Deploy         → Push to GitHub, configure Pages (USER GATE)
```

### Phase 2: Data Display & Grid Components (Current Focus)

| # | Component | Description | Reusable |
|---|-----------|-------------|----------|
| 1 | stLwcDataTable | Core configurable data table with pagination, sorting, filtering | Yes |
| 2 | stEditableDatatable | Editable data table with live refresh | Yes |
| 3 | stTreeGrid | Hierarchical tree grid for parent-child data | Yes |
| 4 | stEditableTreeGrid | Editable version of tree grid | Yes |
| 5 | stObjectEditableTreeGrid | Generic tree grid for any object | Yes |
| 6 | stFieldAssetTreeGrid | Field Asset tree grid (domain-specific) | No |
| 7 | stFieldAssetEditableTreeGrid | Editable Field Asset tree grid | No |
| 8 | stManyToMany | Junction record management component | Yes |

### Per-Component Workflow

```
Research → Scratchpad → Build → Self-Verify (browser) → USER GATE (approve) → Next
```

1. **Research**: SF docs, Coda descriptions, existing code audit, identify all variants/states
2. **Scratchpad**: Document props, events, variants, states, story list with rationale
3. **Build**: React + SLDS2 component (.tsx) + stories (.stories.tsx)
4. **Self-Verify**: Open in browser, screenshot zoomed-in + zoomed-out, fix all visual issues
5. **USER GATE**: Present to user with screenshots, iterate until approved

### Future Phases (after Data Display)

The full Sitetracker component inventory has 77 components across 13 categories. After Data Display is complete and deployed, we'll tackle:

- Schedule & Timeline (7 components)
- UI/UX Building Blocks (17 components)
- Calendar & Scheduler (3 components)
- Files (4 components)
- Financial & Budget (6 components)
- Inventory & Asset (5 components)
- Production Tracking (3 components)
- Approval & Workflow (4 components)
- Trackers (4 components)
- Map & GIS (6 components)
- Maintenance (2 components)
- Modules (8 components)

See COMPONENT_INVENTORY.md for the full list.

## Source References

- **Coda**: [Development Plans > Reusable Components](https://coda.io/d/_dHCab2qMnp2/Reusable-Components_suHonxkL)
- **Previous iteration**: `ticket-templates-prototype/stories/stLwcDataTable/` (25 stories, known visual bugs)
- **Salesforce docs**: [lightning-datatable](https://developer.salesforce.com/docs/platform/lightning-component-reference/guide/lightning-datatable.html)
