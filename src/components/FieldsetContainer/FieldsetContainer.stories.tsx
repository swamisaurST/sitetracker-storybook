import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { FieldsetContainer } from "./FieldsetContainer";
import { contactFields, projectFields, serviceAppointmentFields } from "./mockData";

const meta = {
  title: "Categories/UI · UX Building Blocks/stFieldsetContainer",
  component: FieldsetContainer,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          '<h3>stFieldsetContainer</h3>' +
          '<p><strong>For Use In:</strong> Record detail pages, related panels, inline editable forms. Anywhere a Salesforce fieldset needs to be displayed with read/edit toggle capability.</p>' +
          '<h4>Architecture</h4>' +
          '<p>Pattern <strong>Type C — Stateful Container</strong>. The most complex pattern in the UI/UX Building Blocks category. The LWC implementation uses <code>lightning-record-view-form</code> + <code>lightning-output-field</code> for read mode, and <code>lightning-record-edit-form</code> + <code>lightning-input-field</code> for edit mode. This React recreation mimics the same state machine:</p>' +
          '<ul>' +
          '<li><strong>Read mode (default)</strong> — fields shown as stacked label/value pairs using <code>slds-form_stacked</code></li>' +
          '<li><strong>Edit mode</strong> — fields become typed inputs (text, date, number, picklist, boolean, url, email, phone)</li>' +
          '<li><strong>Validation</strong> — required fields are checked before the save callback fires</li>' +
          '<li><strong>Cancel</strong> — restores the original field values (no Apex call needed)</li>' +
          '</ul>' +
          '<h4>Supported field types</h4>' +
          '<ul>' +
          '<li>text, number, date</li>' +
          '<li>boolean (checkbox)</li>' +
          '<li>picklist (select dropdown)</li>' +
          '<li>url, email, phone (with appropriate HTML input types and hyperlinks in read mode)</li>' +
          '<li>disabled (shown as read-only text even in edit mode)</li>' +
          '</ul>' +
          '<h4>Notes</h4>' +
          '<p>In production LWC, field values come from Apex via <code>@wire(getRecord)</code>. In Storybook, all values are passed as static props and the <code>onSave</code> callback receives the mutated values object.</p>',
      },
    },
  },
  argTypes: {
    title: {
      description: "Card header title shown in the top bar.",
      control: "text",
      table: { category: "Content" },
    },
    fields: {
      description: "Array of `FieldsetField` objects defining labels, values, types, and constraints.",
      table: { category: "Data" },
    },
    isEditable: {
      description: "Whether the edit button is shown in the card header.",
      control: "boolean",
      table: { category: "Behavior" },
    },
    defaultEditMode: {
      description: "When true, the card opens in edit mode.",
      control: "boolean",
      table: { category: "Behavior" },
    },
    onSave: {
      description: "Callback fired with `Record<apiName, value>` when the user clicks Save (after passing validation).",
      action: "onSave",
      table: { category: "Events" },
    },
    onCancel: {
      description: "Callback fired when the user clicks Cancel.",
      action: "onCancel",
      table: { category: "Events" },
    },
  },
} satisfies Meta<typeof FieldsetContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ReadMode: Story = {
  name: "Read Mode (Default)",
  args: {
    title: "Contact Information",
    fields: contactFields,
    isEditable: true,
    defaultEditMode: false,
  },
  parameters: {
    docs: {
      description: { story: "Default read-only view. Click the pencil icon in the top right to enter edit mode." },
    },
  },
  decorators: [(Story) => <div style={{ maxWidth: "480px" }}><Story /></div>],
};

export const EditMode: Story = {
  name: "Edit Mode (Open)",
  args: {
    title: "Contact Information",
    fields: contactFields,
    isEditable: true,
    defaultEditMode: true,
  },
  parameters: {
    docs: {
      description: { story: "Card opened directly in edit mode. The Account Name field is disabled (set via `disabled: true`) and appears greyed out even in edit mode." },
    },
  },
  decorators: [(Story) => <div style={{ maxWidth: "480px" }}><Story /></div>],
};

export const ProjectRecord: Story = {
  name: "Project Record",
  args: {
    title: "Project Details",
    fields: projectFields,
    isEditable: true,
  },
  parameters: {
    docs: {
      description: { story: "A Project__c record with mixed field types: text, picklist, date, number, boolean, and URL. Demonstrates how each type renders in read and edit modes." },
    },
  },
  decorators: [(Story) => <div style={{ maxWidth: "480px" }}><Story /></div>],
};

export const ServiceAppointment: Story = {
  name: "Service Appointment",
  args: {
    title: "Appointment Details",
    fields: serviceAppointmentFields,
    isEditable: true,
  },
  parameters: {
    docs: {
      description: { story: "Service appointment fieldset. The Appointment # field is disabled (system-generated). Shows the Status picklist and Duration number field." },
    },
  },
  decorators: [(Story) => <div style={{ maxWidth: "480px" }}><Story /></div>],
};

export const RequiredValidation: Story = {
  name: "Required Field Validation",
  args: {
    title: "Contact Information",
    fields: contactFields,
    isEditable: true,
    defaultEditMode: true,
  },
  parameters: {
    docs: {
      description: { story: "Clear the First Name or Last Name fields and click Save to trigger the required field validation. Error messages appear inline below the affected fields." },
    },
  },
  decorators: [(Story) => <div style={{ maxWidth: "480px" }}><Story /></div>],
};

export const ReadOnly: Story = {
  name: "Read Only (No Edit Button)",
  args: {
    title: "Project Details",
    fields: projectFields,
    isEditable: false,
  },
  parameters: {
    docs: {
      description: { story: "Edit button is hidden entirely. Used in contexts where the user only has read permission on the record." },
    },
  },
  decorators: [(Story) => <div style={{ maxWidth: "480px" }}><Story /></div>],
};
