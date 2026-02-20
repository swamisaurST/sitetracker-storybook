import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { BetaBar } from "./BetaBar";
import { BETA_MESSAGES } from "./mockData";

const meta = {
  title: "Categories/UI · UX Building Blocks/stBetaBar",
  component: BetaBar,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          '<h3>stBetaBar</h3>' +
          '<p><strong>For Use In:</strong> Any page or component hosting a feature that is in beta or early access. Placed at the top of a page section, inside a card header, or directly above the component it annotates. Used in Sitetracker to flag features like the new Gantt Chart V2, mobile app, and calendar sync.</p>' +
          '<h4>Architecture</h4>' +
          '<p>Pattern <strong>Type A — Pure Wrapper (Notification Banner)</strong>. Maps to the SLDS <code>slds-notify_alert</code> blueprint. Implemented as a self-contained stateful component that manages its own dismissed state — no external state management required.</p>' +
          '<h4>Supported features</h4>' +
          '<ul>' +
          '<li>4 variants: info (default), warning, success, error</li>' +
          '<li>Optional Beta tag badge (pill)</li>' +
          '<li>Dismissible with internal state (calls optional <code>onDismiss</code> callback)</li>' +
          '<li>Optional CTA link (label + href)</li>' +
          '<li>Accessible: <code>role="status"</code> with <code>aria-live="polite"</code></li>' +
          '</ul>' +
          '<h4>Real LWC API (sitetracker/strk@preprod)</h4>' +
          '<p>The actual <code>stBetaBar</code> is simpler than our Storybook implementation. It has <strong>no variant system, no dismiss button, and no CTA link</strong>. Real props:</p>' +
          '<ul>' +
          '<li><code>text</code> (string) — the banner message. Falls back to the <code>Beta_Feature</code> custom label if empty.</li>' +
          '<li><code>colorStyleOverride</code> (string) — inline style override for background. Default: <code>background-color: rgb(0,132,134)</code> (Sitetracker teal)</li>' +
          '<li><code>borderStyleOverride</code> (string) — inline style override for border. Default: <code>border: 1px solid rgb(0,132,134)</code></li>' +
          '<li><code>width</code> (string) — banner width. Default: "100%"</li>' +
          '</ul>' +
          '<p>Our Storybook version adds variant/dismiss/CTA features as a richer documentation demo. The real component is a simple styled banner bar with a fixed teal color.</p>',
      },
    },
  },
  argTypes: {
    featureName: {
      description: "Feature name displayed prominently in the bar.",
      control: "text",
      table: { category: "Content" },
    },
    message: {
      description: "Main descriptive message text.",
      control: "text",
      table: { category: "Content" },
    },
    variant: {
      description: "Visual variant — drives color scheme and icon.",
      control: "radio",
      options: ["info", "warning", "success", "error"],
      table: { category: "Appearance" },
    },
    showBetaTag: {
      description: "Show the 'Beta' pill badge next to the feature name.",
      control: "boolean",
      table: { category: "Appearance" },
    },
    dismissible: {
      description: "Show a dismiss (×) button. Hides the bar on click.",
      control: "boolean",
      table: { category: "Behavior" },
    },
    ctaLabel: {
      description: "Text for the CTA link appended to the message.",
      control: "text",
      table: { category: "Content" },
    },
    ctaHref: {
      description: "URL for the CTA link.",
      control: "text",
      table: { category: "Content" },
    },
  },
} satisfies Meta<typeof BetaBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Info — Gantt Chart V2",
  args: {
    ...BETA_MESSAGES.gantt,
    variant: "info",
    showBetaTag: true,
    dismissible: true,
  },
  parameters: {
    docs: { description: { story: "Default info variant with Beta tag and CTA link. Clicking × dismisses the bar (state is local to this story instance)." } },
  },
};

export const Warning: Story = {
  name: "Warning — Calendar Sync",
  args: {
    ...BETA_MESSAGES.calendar,
    variant: "warning",
    showBetaTag: true,
    dismissible: true,
  },
  parameters: {
    docs: { description: { story: "Warning variant for features with known instability. Uses amber color scheme." } },
  },
};

export const Success: Story = {
  name: "Success — Feature Graduated",
  args: {
    featureName: "Enhanced Time Tracker",
    message: "Enhanced Time Tracker has graduated from beta and is now generally available to all users.",
    variant: "success",
    showBetaTag: false,
    dismissible: true,
    ctaLabel: "See what's new",
    ctaHref: "https://help.sitetracker.com/release-notes",
  },
  parameters: {
    docs: { description: { story: "Success variant used when a feature graduates from beta — <code>showBetaTag: false</code> since it's no longer beta." } },
  },
};

export const Error: Story = {
  name: "Error — Feature Degraded",
  args: {
    featureName: "Data Export API",
    message: "The Data Export API is experiencing degraded performance. Exports may be delayed. We are investigating.",
    variant: "error",
    showBetaTag: false,
    dismissible: false,
    ctaLabel: "View status page",
    ctaHref: "https://status.sitetracker.com",
  },
  parameters: {
    docs: { description: { story: "Error variant for active incidents. <code>dismissible: false</code> because the user should not be able to hide a live system issue." } },
  },
};

export const NoBetaTag: Story = {
  name: "Without Beta Tag",
  args: {
    ...BETA_MESSAGES.mobileApp,
    variant: "info",
    showBetaTag: false,
    dismissible: true,
  },
  parameters: {
    docs: { description: { story: "Same info bar without the Beta pill — for early access or preview features that aren't formally labeled beta." } },
  },
};

export const AllVariants: Story = {
  name: "All Variants",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "640px" }}>
      {(["info", "warning", "success", "error"] as const).map((v) => (
        <BetaBar
          key={v}
          variant={v}
          featureName={`${v.charAt(0).toUpperCase() + v.slice(1)} Feature`}
          message={`This is the ${v} variant of stBetaBar. Dismissible with optional CTA link.`}
          showBetaTag={v === "info" || v === "warning"}
          dismissible={true}
          ctaLabel="Learn more"
          ctaHref="#"
        />
      ))}
    </div>
  ),
  parameters: {
    docs: { description: { story: "All four variants stacked. Each applies a distinct color scheme derived from SLDS semantic color tokens." } },
  },
};
