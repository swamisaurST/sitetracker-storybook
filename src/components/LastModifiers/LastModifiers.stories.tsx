import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { LastModifiers } from "./LastModifiers";
import { SINGLE_USER, FEW_USERS, MANY_USERS, MIXED_USERS } from "./mockData";

const meta = {
  title: "Categories/UI · UX Building Blocks/stLastModifiers",
  component: LastModifiers,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          '<h3>stLastModifiers</h3>' +
          '<p><strong>For Use In:</strong> Record page footers, card headers, and audit trail sections where you want to show who last touched a record. Typically appears below a fieldset or at the bottom of a detail card — "Last modified by [avatar stack] Alex Chen · Feb 19, 2026".</p>' +
          '<h4>Architecture</h4>' +
          '<p>Pattern <strong>Type B — Thin Composition</strong>. Renders a stacked avatar group using SLDS <code>slds-avatar</code> patterns. Each avatar shows an image if <code>avatarUrl</code> is provided, otherwise falls back to initials derived from the user\'s name. A deterministic color is assigned per name so the same user always gets the same color.</p>' +
          '<h4>Supported features</h4>' +
          '<ul>' +
          '<li>Avatar image or initials fallback (auto-derived from name)</li>' +
          '<li>Deterministic color assignment from name (8-color palette)</li>' +
          '<li>Overflow badge: shows "+N" for users beyond <code>maxVisible</code></li>' +
          '<li>Hover tooltip with name + formatted date (optional)</li>' +
          '<li>3 size variants: x-small (24px), small (32px, default), medium (40px)</li>' +
          '<li>Configurable label text</li>' +
          '<li>Single-user mode: shows name + date inline</li>' +
          '</ul>' +
          '<h4>Real LWC API (sitetracker/strk@preprod)</h4>' +
          '<p>The real component is wire-driven — it calls <code>getLastModifiedUsers(recordId, maxUsers)</code> Apex and renders the results. Our Storybook passes users as a static array instead:</p>' +
          '<ul>' +
          '<li><code>recordId</code> — Salesforce record ID. Wire fetches last modifiers automatically.</li>' +
          '<li><code>maxUsers</code> (integer, default 3) — max users in the avatar group (we call it <code>maxVisible</code>)</li>' +
          '<li><code>variant</code> (string) — "brand" or "brand-outline" (default). Controls avatar ring color.</li>' +
          '<li><code>size</code> — "x-small" (default in the real component)</li>' +
          '<li><code>refresh()</code> — public method to re-fetch modifier data</li>' +
          '</ul>' +
          '<p>The avatar renders user photos from Salesforce user records. Our React version uses <code>avatarUrl</code> or initials as a simulation.</p>',
      },
    },
  },
  argTypes: {
    maxVisible: {
      description: "Max avatars visible before overflow badge appears.",
      control: { type: "number", min: 1, max: 10 },
      table: { category: "Behavior" },
    },
    label: {
      description: "Label text shown before the avatar group.",
      control: "text",
      table: { category: "Content" },
    },
    showTooltip: {
      description: "Show name + date tooltip on hover.",
      control: "boolean",
      table: { category: "Behavior" },
    },
    size: {
      description: "Avatar size.",
      control: "radio",
      options: ["x-small", "small", "medium"],
      table: { category: "Appearance" },
    },
  },
} satisfies Meta<typeof LastModifiers>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Single Modifier",
  args: {
    users: SINGLE_USER,
    maxVisible: 5,
    label: "Last modified by",
    showTooltip: true,
    size: "small",
  },
  parameters: {
    docs: { description: { story: "Single user — displays the avatar, name, and date inline. This is the most common case for a freshly created or rarely edited record." } },
  },
};

export const FewModifiers: Story = {
  name: "Few Modifiers",
  args: {
    users: FEW_USERS,
    maxVisible: 5,
    label: "Last modified by",
    showTooltip: true,
    size: "small",
  },
  parameters: {
    docs: { description: { story: "Three modifiers — all visible, no overflow badge. Hover over any avatar to see the tooltip." } },
  },
};

export const WithOverflow: Story = {
  name: "Many Modifiers (Overflow)",
  args: {
    users: MANY_USERS,
    maxVisible: 4,
    label: "Last modified by",
    showTooltip: true,
    size: "small",
  },
  parameters: {
    docs: { description: { story: "7 users with <code>maxVisible=4</code> — 4 avatars shown and a '+3' overflow badge. The badge is accessible with <code>aria-label</code> and a title tooltip." } },
  },
};

export const MixedAvatars: Story = {
  name: "Mixed (Images + Initials)",
  args: {
    users: MIXED_USERS,
    maxVisible: 5,
    label: "Modified by",
    showTooltip: true,
    size: "medium",
  },
  parameters: {
    docs: { description: { story: "Mix of real avatar images and initials fallbacks at medium size. The component handles both within the same stack." } },
  },
};

export const SizeVariants: Story = {
  name: "Size Variants",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {(["x-small", "small", "medium"] as const).map((s) => (
        <div key={s} style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <span style={{ fontSize: "0.72rem", color: "#706E6B", width: "60px", flexShrink: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s}</span>
          <LastModifiers users={FEW_USERS} size={s} label="Modified by" showTooltip={true} />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: { description: { story: "Three size variants: x-small (24px) for compact table cells, small (32px, default) for card footers, medium (40px) for prominent record headers." } },
  },
};

export const InCardFooter: Story = {
  name: "In Card Footer (Realistic Context)",
  render: () => (
    <div style={{ width: "480px" }}>
      <article className="slds-card">
        <div className="slds-card__header slds-grid">
          <header className="slds-media slds-media_center slds-has-flexi-truncate">
            <div className="slds-media__body">
              <h2 className="slds-card__header-title" style={{ fontWeight: 600, fontSize: "0.875rem" }}>
                Tower Site — AT&amp;T Denver 04
              </h2>
            </div>
          </header>
        </div>
        <div className="slds-card__body slds-card__body_inner">
          <p style={{ color: "#3E3E3C", fontSize: "0.875rem", margin: 0 }}>
            Install date: Mar 15, 2026 · Status: In Progress · Owner: Alex Chen
          </p>
        </div>
        <footer
          className="slds-card__footer"
          style={{ borderTop: "1px solid #E5E5E5", padding: "0.625rem 1rem", display: "flex", justifyContent: "flex-end" }}
        >
          <LastModifiers users={FEW_USERS} label="Last modified by" showTooltip={true} size="x-small" />
        </footer>
      </article>
    </div>
  ),
  parameters: {
    docs: { description: { story: "Realistic placement: x-small avatars in a card footer. This is the standard Salesforce record page pattern." } },
  },
};

export const Empty: Story = {
  name: "No Modifiers",
  args: {
    users: [],
    label: "Last modified by",
    showTooltip: true,
    size: "small",
  },
  parameters: {
    docs: { description: { story: "Empty state — when no modifier history is available, renders a graceful 'No modifiers' fallback." } },
  },
};
