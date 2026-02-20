import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { ObjectEditableTreeGrid } from "./ObjectEditableTreeGrid";
import { scheduleColumns, scheduleData } from "../EditableTreeGrid/mockData";

const meta = {
  title: "Categories/Data Display & Grid/stObjectEditableTreeGrid",
  component: ObjectEditableTreeGrid,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "<h3>stObjectEditableTreeGrid — ST Object Editable Tree Grid</h3>",
          "<p>A generic, configuration-driven wrapper that makes <code>stEditableTreeGrid</code> usable with <em>any</em> Salesforce object. Instead of hardcoding columns, it accepts an object API name, a fieldset name, and a parent field name — then resolves both the column schema and the hierarchical data at runtime via two Apex wire methods.</p>",
          "<p><strong>For Use In:</strong> Flexipage deployments where the same tree-grid shell needs to work across different objects &nbsp;·&nbsp; <strong>0 LWC template consumers detected</strong> (likely flexipage-only via <code>targetConfigs</code>)</p>",
          "<p><strong>Architecture:</strong> Apex <code>getFieldSet</code> wire &rarr; Apex <code>getHierarchy</code> wire &rarr; <code>stEditableTreeGrid</code> (Pattern D) &nbsp;·&nbsp; <strong>Pattern E</strong></p>",
          "<p><strong>In this Storybook:</strong> The Apex resolution is simulated by passing <code>columns</code> and <code>data</code> props directly. The <code>objectName</code>, <code>fieldSet</code>, and <code>parentField</code> props are shown in the info badge for reference only.</p>",
          "<p><strong>Runtime behaviour (in Salesforce):</strong></p>",
          "<ul>",
          "<li><code>objectName</code> + <code>fieldSet</code> &rarr; Apex wire returns column metadata &rarr; builds <code>columns</code> array</li>",
          "<li><code>objectName</code> + <code>parentField</code> + record context &rarr; Apex wire recursively fetches up to 5 levels of parent-child records &rarr; builds <code>data</code> tree</li>",
          "<li>All editing, saving, and expand/collapse behaviour delegates to <code>stEditableTreeGrid</code></li>",
          "</ul>",
        ].join(""),
      },
    },
  },
  argTypes: {
    objectName:   { description: "Salesforce API name of the object to display (e.g. `WorkOrder`, `Opportunity`).", table: { category: "Configuration" } },
    fieldSet:     { description: "API name of the fieldset on the object that defines the columns.", table: { category: "Configuration" } },
    parentField:  { description: "API name of the lookup field pointing to the parent record. Used to build the hierarchy.", table: { category: "Configuration" } },
    title:        { description: "Card header title.", table: { category: "Header" } },
    iconName:     { description: "SLDS icon name beside the title.", table: { category: "Header" } },
    columns:      { description: "Column definitions (simulated Apex output in Storybook).", table: { category: "Data (Storybook only)" } },
    data:         { description: "Hierarchical row data (simulated Apex output in Storybook).", table: { category: "Data (Storybook only)" } },
    isReadOnly:   { description: "Passes through to stEditableTreeGrid to disable all editing.", table: { category: "Features" } },
    expandOnLoad: { description: "Expand all nodes on initial render.", table: { category: "Features" } },
    loading:      { description: "Shows skeleton state while Apex wires resolve.", table: { category: "States" } },
  },
  args: {
    onSave: fn(),
    onCancel: fn(),
    onCellChange: fn(),
  },
} satisfies Meta<typeof ObjectEditableTreeGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    objectName: "WorkOrder",
    fieldSet: "ScheduleFields",
    parentField: "ParentWorkOrderId",
    title: "Work Order Hierarchy",
    iconName: "standard:work_order",
    columns: scheduleColumns,
    data: scheduleData,
    expandOnLoad: true,
  },
};

export const ReadOnly: Story = {
  args: {
    objectName: "WorkOrder",
    fieldSet: "ScheduleFields",
    parentField: "ParentWorkOrderId",
    title: "Work Order Hierarchy",
    iconName: "standard:work_order",
    columns: scheduleColumns,
    data: scheduleData,
    expandOnLoad: true,
    isReadOnly: true,
  },
};

export const Loading: Story = {
  args: {
    objectName: "Opportunity",
    fieldSet: "HierarchyFields",
    parentField: "ParentOpportunityId",
    columns: scheduleColumns,
    data: [],
    loading: true,
  },
  parameters: {
    docs: { description: { story: "Loading state while Apex wire methods resolve fieldset and hierarchy." } },
  },
};
