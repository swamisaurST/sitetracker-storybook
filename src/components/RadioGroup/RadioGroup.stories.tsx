import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { RadioGroup } from "./RadioGroup";
import {
  projectStatusOptions,
  priorityOptions,
  viewModeOptions,
  timeframeOptions,
  visibilityOptions,
} from "./mockData";

const meta = {
  title: "Categories/UI · UX Building Blocks/stRadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          '<h3>stRadioGroup</h3>' +
          '<p><strong>For Use In:</strong> Record pages, filter panels, settings forms, wizard steps. Any context requiring a mutually exclusive choice from a short list of options.</p>' +
          '<h4>Architecture</h4>' +
          '<p>Pattern <strong>Type A — Pure Wrapper</strong>. A thin React recreation of <code>lightning-radio-group</code>, using SLDS form-element and radio classes. Supports two rendering modes:</p>' +
          '<ul>' +
          '<li><strong>radio</strong> — Standard HTML radio inputs styled with <code>slds-radio</code> classes. Supports vertical (default) and horizontal orientation.</li>' +
          '<li><strong>button</strong> — SLDS button group toggle, applying <code>slds-button_brand</code> to the selected option. Ideal for compact filter bars.</li>' +
          '</ul>' +
          '<h4>Supported features</h4>' +
          '<ul>' +
          '<li>Vertical and horizontal layout (radio mode)</li>' +
          '<li>Button group toggle mode</li>' +
          '<li>Per-option disabled state</li>' +
          '<li>Global disabled state</li>' +
          '<li>Required indicator with asterisk</li>' +
          '<li>Controlled value via <code>value</code> prop</li>' +
          '</ul>' +
          '<h4>Notes</h4>' +
          '<p>This component is a presentation wrapper. Parent is responsible for maintaining selected state and handling the <code>onChange</code> callback.</p>',
      },
    },
  },
  argTypes: {
    label: {
      description: "Group label displayed above the options.",
      control: "text",
      table: { category: "Content" },
    },
    options: {
      description: "Array of `{ label, value, disabled? }` objects.",
      table: { category: "Data" },
    },
    value: {
      description: "Currently selected value (controlled).",
      control: "text",
      table: { category: "State" },
    },
    type: {
      description: "Rendering mode — `radio` for stacked list, `button` for toggle group.",
      control: "radio",
      options: ["radio", "button"],
      table: { category: "Appearance" },
    },
    orientation: {
      description: "Layout direction when `type` is `radio`.",
      control: "radio",
      options: ["vertical", "horizontal"],
      table: { category: "Appearance" },
    },
    disabled: {
      description: "Disables all options in the group.",
      control: "boolean",
      table: { category: "State" },
    },
    required: {
      description: "Marks the group as required with an asterisk.",
      control: "boolean",
      table: { category: "Validation" },
    },
    onChange: {
      description: "Callback fired with the new value string when selection changes.",
      action: "onChange",
      table: { category: "Events" },
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Default (Vertical)",
  args: {
    label: "Project Status",
    options: projectStatusOptions,
    value: "active",
    type: "radio",
    orientation: "vertical",
  },
  parameters: {
    docs: {
      description: { story: "Vertical radio list — the default rendering mode. Maps directly to the SLDS `slds-radio` pattern." },
    },
  },
};

export const Horizontal: Story = {
  name: "Horizontal Layout",
  args: {
    label: "Timeframe",
    options: timeframeOptions,
    value: "month",
    orientation: "horizontal",
  },
  parameters: {
    docs: {
      description: { story: "Horizontal orientation — useful in filter sidebars or settings rows with limited vertical space." },
    },
  },
};

export const ButtonGroup: Story = {
  name: "Button Group (Toggle)",
  args: {
    label: "View Mode",
    options: viewModeOptions,
    value: "list",
    type: "button",
  },
  parameters: {
    docs: {
      description: { story: "Button toggle mode using SLDS `slds-button-group`. Selected option is highlighted with `slds-button_brand`. Ideal for compact toolbar-style controls." },
    },
  },
};

export const PrioritySelector: Story = {
  name: "Priority Selector",
  args: {
    label: "Priority",
    options: priorityOptions,
    value: "medium",
    type: "button",
    required: true,
  },
  parameters: {
    docs: {
      description: { story: "A required button-group selection for priority levels. The required asterisk is shown in the label." },
    },
  },
};

export const DisabledState: Story = {
  name: "Disabled",
  args: {
    label: "Visibility",
    options: visibilityOptions,
    value: "team",
    disabled: false,
  },
  parameters: {
    docs: {
      description: { story: "Per-option disabled state — the 'Admins Only' option is individually disabled while the rest remain interactive." },
    },
  },
};

export const FullyDisabled: Story = {
  name: "Fully Disabled",
  args: {
    label: "Project Status",
    options: projectStatusOptions,
    value: "active",
    disabled: true,
  },
  parameters: {
    docs: {
      description: { story: "Global disabled state — all options are disabled. Used in read-only form contexts." },
    },
  },
};

export const Controlled: Story = {
  name: "Controlled (Interactive)",
  render: (args) => {
    const [selected, setSelected] = useState("month");
    return (
      <div>
        <RadioGroup
          {...args}
          value={selected}
          onChange={setSelected}
        />
        <p style={{ marginTop: "1rem", fontSize: "0.85rem", color: "#706E6B" }}>
          Selected: <strong>{selected}</strong>
        </p>
      </div>
    );
  },
  args: {
    label: "Report Timeframe",
    options: timeframeOptions,
    type: "button",
  },
  parameters: {
    docs: {
      description: { story: "Interactive controlled example demonstrating the `onChange` callback in use. The selected value is reflected below the component." },
    },
  },
};
