import type { EditableColumn, EditableRow } from "./types";

export const projectColumns: EditableColumn[] = [
  { label: "Project Name", fieldName: "Name", type: "text", editable: true, sortable: true, required: true, initialWidth: 180 },
  { label: "Status", fieldName: "Status__c", type: "picklist", editable: true, sortable: true, initialWidth: 130,
    typeAttributes: { picklistValues: [
      { label: "Active", value: "Active" },
      { label: "Planned", value: "Planned" },
      { label: "On Hold", value: "On Hold" },
      { label: "Completed", value: "Completed" },
    ]}
  },
  { label: "Object", fieldName: "Object__c", type: "text", editable: false, sortable: true, initialWidth: 120 },
  { label: "Budget", fieldName: "Budget__c", type: "currency", editable: true, sortable: true, initialWidth: 130,
    typeAttributes: { currencyCode: "USD", fractionDigits: 2 }
  },
  { label: "Completion %", fieldName: "Completion__c", type: "percent", editable: true, sortable: true, initialWidth: 110 },
  { label: "Start Date", fieldName: "Start_Date__c", type: "date", editable: true, sortable: true, initialWidth: 130 },
  { label: "Active", fieldName: "IsActive__c", type: "boolean", editable: true, sortable: false, initialWidth: 80 },
  { label: "Notes", fieldName: "Notes__c", type: "textarea", editable: true, sortable: false, initialWidth: 200 },
];

export const projectData: EditableRow[] = [
  { Id: "p001", Name: "5G Tower Alpha", Status__c: "Active", Object__c: "Tower", Budget__c: 125000, Completion__c: 85, Start_Date__c: "2025-06-01", IsActive__c: true, Notes__c: "" },
  { Id: "p002", Name: "Small Cell Hub B", Status__c: "Planned", Object__c: "Small Cell", Budget__c: 45000, Completion__c: 0, Start_Date__c: "2026-03-01", IsActive__c: false, Notes__c: "Pending permits" },
  { Id: "p003", Name: "Rooftop Node C7", Status__c: "Active", Object__c: "Rooftop", Budget__c: 78000, Completion__c: 42, Start_Date__c: "2025-09-15", IsActive__c: true, Notes__c: "" },
  { Id: "p004", Name: "Tower Delta 4", Status__c: "Completed", Object__c: "Tower", Budget__c: 210000, Completion__c: 100, Start_Date__c: "2024-01-10", IsActive__c: false, Notes__c: "Closed out" },
  { Id: "p005", Name: "Fiber Node E", Status__c: "On Hold", Object__c: "Fiber Hub", Budget__c: 56000, Completion__c: 15, Start_Date__c: "2025-11-01", IsActive__c: true, Notes__c: "Awaiting contractor" },
  { Id: "p006", Name: "Small Cell Hub F", Status__c: "Active", Object__c: "Small Cell", Budget__c: 32000, Completion__c: 92, Start_Date__c: "2025-04-20", IsActive__c: true, Notes__c: "" },
  { Id: "p007", Name: "Tower Golf 7", Status__c: "Planned", Object__c: "Tower", Budget__c: 180000, Completion__c: 0, Start_Date__c: "2026-06-01", IsActive__c: false, Notes__c: "" },
  { Id: "p008", Name: "Rooftop Hotel H", Status__c: "Active", Object__c: "Rooftop", Budget__c: 95000, Completion__c: 60, Start_Date__c: "2025-08-01", IsActive__c: true, Notes__c: "Phase 2 underway" },
];

export const readOnlyColumns: EditableColumn[] = projectColumns.map((c) => ({
  ...c,
  editable: false,
}));
