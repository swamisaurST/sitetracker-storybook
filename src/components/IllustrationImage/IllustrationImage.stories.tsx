import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { IllustrationImage } from "./IllustrationImage";
import { ALL_TYPES, TYPE_LABELS } from "./mockData";

const SLDS_ILLUS_REF = "https://www.lightningdesignsystem.com/components/illustration/";

const meta = {
  title: "Categories/UI · UX Building Blocks/stIllustrationImage",
  component: IllustrationImage,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          '<h3>stIllustrationImage</h3>' +
          '<p><strong>For Use In:</strong> Anywhere you need just the illustration SVG — without heading or body text. Used as a sub-component inside <code>stIllustration</code> in the LWC codebase (<code>c-st-illustration-image</code>), where it loads SVGs from Salesforce Static Resources.</p>' +
          '<h4>Architecture</h4>' +
          '<p>Pattern <strong>Type A — Pure Wrapper (Image-only)</strong>. The LWC version loads illustrations via <code>@salesforce/resourceUrl</code> from Static Resources inside the org. In this Storybook:</p>' +
          '<ul>' +
          '<li><strong>3 types use the real SLDS SVG files</strong> shipped in the <code>@salesforce-ux/design-system</code> npm package: <code>empty-state-assistant</code>, <code>empty-state-events</code>, <code>empty-state-tasks</code></li>' +
          '<li><strong>4 types (<code>no-access</code>, <code>no-connection</code>, <code>no-data</code>, <code>error</code>) use custom fallback artwork.</strong> These are real SLDS illustration type names, but the actual Salesforce SVG files are not included in the npm package — they live in the org as Static Resources. The artwork shown here is a placeholder approximation only.</li>' +
          '</ul>' +
          `<p>&#128279; <a href="${SLDS_ILLUS_REF}" target="_blank" rel="noopener noreferrer">Full SLDS Illustration reference and all available types &rarr;</a></p>` +
          '<h4>Supported features</h4>' +
          '<ul>' +
          '<li>3 types with real SLDS artwork (from npm package)</li>' +
          '<li>4 types with custom fallback artwork (approximation only)</li>' +
          '<li>3 size variants: small (140px), medium (240px), large (380px)</li>' +
          '<li>Optional <code>alt</code> text — omit for decorative images (<code>aria-hidden</code> applied automatically)</li>' +
          '</ul>',
      },
    },
  },
  argTypes: {
    type: {
      description: "Illustration type. First 3 use real SLDS SVGs; last 4 use custom fallback artwork.",
      control: "select",
      options: ALL_TYPES,
      table: { category: "Content" },
    },
    size: {
      description: "Controls the max-width of the rendered image.",
      control: "radio",
      options: ["small", "medium", "large"],
      table: { category: "Appearance" },
    },
    alt: {
      description: "Alt text. Omit (empty string) for decorative images — aria-hidden is applied automatically.",
      control: "text",
      table: { category: "Accessibility" },
    },
  },
} satisfies Meta<typeof IllustrationImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Empty State — Assistant (real SLDS SVG)",
  args: { type: "empty-state-assistant", size: "medium", alt: "" },
  parameters: {
    docs: {
      description: { story: "Uses the real SLDS SVG shipped in the npm package. Rendered from `/assets/images/illustrations/empty-state-assistant.svg`." },
    },
  },
};

export const EmptyEvents: Story = {
  name: "Empty State — Events (real SLDS SVG)",
  args: { type: "empty-state-events", size: "medium", alt: "" },
  parameters: {
    docs: {
      description: { story: "Uses the real SLDS SVG from the npm package." },
    },
  },
};

export const EmptyTasks: Story = {
  name: "Empty State — Tasks (real SLDS SVG)",
  args: { type: "empty-state-tasks", size: "medium", alt: "" },
  parameters: {
    docs: {
      description: { story: "Uses the real SLDS SVG from the npm package." },
    },
  },
};

export const NoData: Story = {
  name: "no_data:desert (custom fallback)",
  args: { type: "no_data:desert", size: "medium", alt: "" },
  parameters: {
    docs: {
      description: {
        story:
          `<strong>Custom fallback artwork</strong> — not the real Salesforce SVG. ` +
          `The <code>no-data</code> type is a valid SLDS illustration name but its SVG is not in the npm package. ` +
          `<a href="${SLDS_ILLUS_REF}" target="_blank">See the real design on lightningdesignsystem.com &rarr;</a>`,
      },
    },
  },
};

export const NoAccess: Story = {
  name: "error:no_access (custom fallback)",
  args: { type: "error:no_access", size: "medium", alt: "" },
  parameters: {
    docs: {
      description: {
        story:
          `<strong>Custom fallback artwork</strong> — not the real Salesforce SVG. ` +
          `<a href="${SLDS_ILLUS_REF}" target="_blank">See the real design on lightningdesignsystem.com &rarr;</a>`,
      },
    },
  },
};

export const SizeVariants: Story = {
  name: "Size Variants",
  render: () => (
    <div style={{ display: "flex", gap: "3rem", alignItems: "flex-end", flexWrap: "wrap", justifyContent: "center" }}>
      {(["small", "medium", "large"] as const).map((s) => (
        <div key={s} style={{ textAlign: "center" }}>
          <p style={{ fontSize: "0.7rem", color: "#706E6B", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            {s}
          </p>
          <IllustrationImage type="empty-state-events" size={s} />
        </div>
      ))}
    </div>
  ),
  parameters: {
    layout: "centered",
    docs: {
      description: { story: "Three size variants using the real SLDS events SVG." },
    },
  },
};

export const AllVariants: Story = {
  name: "All Variants Gallery",
  render: () => (
    <div style={{ maxWidth: "700px" }}>
      <p style={{ fontSize: "0.75rem", color: "#706E6B", marginBottom: "1.5rem", lineHeight: 1.6 }}>
        First 3 use real SLDS SVGs from the npm package. Last 4 are custom fallback artwork —&nbsp;
        the actual Salesforce designs are available at&nbsp;
        <a href={SLDS_ILLUS_REF} target="_blank" rel="noopener noreferrer" style={{ color: "#0176D3" }}>
          lightningdesignsystem.com/components/illustration/
        </a>.
      </p>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        gap: "1.5rem",
      }}>
        {ALL_TYPES.map((t) => (
          <div key={t} style={{ textAlign: "center" }}>
            <IllustrationImage type={t} size="small" />
            <p style={{ fontSize: "0.68rem", color: "#706E6B", marginTop: "0.5rem", lineHeight: 1.3 }}>
              {TYPE_LABELS[t]}
            </p>
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: {
    layout: "centered",
    docs: {
      description: { story: "All 7 types. Labels indicate which are real SLDS SVGs and which are custom fallbacks." },
    },
  },
};

export const AccessibleWithAlt: Story = {
  name: "With Accessible Alt Text",
  args: { type: "error:no_access", size: "medium", alt: "You do not have permission to view this content" },
  parameters: {
    docs: {
      description: { story: "When <code>alt</code> is provided, the image is accessible to screen readers." },
    },
  },
};
