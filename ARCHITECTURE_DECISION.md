# Architecture Decision Record: React + SLDS for Component Documentation

## Status
**Accepted** — 2026-02-20

## Context

Sitetracker's product UI is built on **Salesforce Lightning Web Components (LWC)** running inside the Salesforce platform. The engineering team needs an interactive, browsable component reference that:

- Documents all reusable UI components with live examples
- Shows every variant, state, and configuration option
- Is accessible to designers, PMs, and new engineers without a Salesforce org
- Follows the familiar Salesforce Lightning Component Reference documentation format
- Is deployable to GitHub Pages for easy sharing

## The Problem

**Lightning Web Components cannot run outside of a Salesforce runtime.** LWC depends on:

- Salesforce's module resolution system (`@salesforce/*` imports)
- Wire adapters and Apex method calls for data
- Lightning Message Service for inter-component communication
- The Lightning runtime for component lifecycle and rendering
- Platform-level services (navigation, permissions, record access)

There is no officially supported way to render real LWC components in a standalone browser environment like Storybook.

## Decision

We build **React recreations** of each Sitetracker LWC component, styled with **SLDS2 (Salesforce Lightning Design System 2)** CSS classes and design tokens.

### What this means:

- Each component is re-implemented in React + TypeScript
- SLDS2 CSS classes provide pixel-perfect visual parity with the production UI
- Salesforce platform APIs (Apex, wire adapters, LMS) are simulated with mock data
- Storybook provides interactive controls, state manipulation, and accessibility testing
- MDX documentation follows the Salesforce Component Reference format exactly

### What this does NOT mean:

- These are NOT production components — the real LWC codebase remains the source of truth
- Behavioral edge cases tied to Salesforce platform APIs are documented but simulated
- Performance characteristics may differ from the real components

## Alternatives Considered

### 1. LWC OSS (Open Source)

Salesforce has an open-source version of the LWC engine, but it:
- Does not support `@salesforce/*` imports
- Cannot resolve custom LWC modules from the Sitetracker package
- Requires significant shimming that would be fragile and maintenance-heavy
- Has limited Storybook integration

**Rejected**: Too fragile, incomplete platform support.

### 2. Screenshot-based Documentation

Take screenshots of each component from the Salesforce org and embed them in static docs.

**Rejected**: No interactivity, stale quickly, doesn't show variants/states, poor developer experience.

### 3. Salesforce Sandbox + Live Demo

Point people to a Salesforce sandbox org with demo data.

**Rejected**: Requires Salesforce licenses, can't be shared publicly, sandbox data drifts, no isolated component view.

## Consequences

### Positive
- Anyone can browse the component library without a Salesforce org
- Interactive controls let users explore every prop/variant combination
- Accessibility testing is built into Storybook
- GitHub Pages deployment makes sharing trivial
- The Salesforce Component Reference format is immediately familiar to the team

### Negative
- Maintenance burden: React recreations must be updated when LWC components change
- Risk of drift: the Storybook version could diverge from the real component
- Mock data doesn't capture all real-world edge cases

### Mitigations
- Each component's MDX doc links to the real LWC source path
- The Coda component inventory is the single source of truth for what exists
- We mark components with a "Last Verified" date to track freshness
- Future: integrate with the Salesforce org via MCP for automated sync

## References

- [SLDS2 Documentation](https://www.lightningdesignsystem.com/)
- [Salesforce LWC Documentation](https://developer.salesforce.com/docs/component-library/documentation/en/lwc)
- [Storybook for React](https://storybook.js.org/docs/react/get-started/introduction)
- [Coda: Sitetracker Reusable Components](https://coda.io/d/_dHCab2qMnp2/Reusable-Components_suHonxkL)
