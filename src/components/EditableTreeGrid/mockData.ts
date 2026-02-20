import type { EditableTreeColumn, EditableTreeRow } from "./types";

export const scheduleColumns: EditableTreeColumn[] = [
  { label: "Activity", fieldName: "Name", type: "text", editable: true, sortable: true, required: true, initialWidth: 200 },
  { label: "Status", fieldName: "Status__c", type: "picklist", editable: true, sortable: true, initialWidth: 120,
    typeAttributes: { picklistValues: [
      { label: "Not Started", value: "Not Started" },
      { label: "In Progress", value: "In Progress" },
      { label: "Completed", value: "Completed" },
      { label: "On Hold", value: "On Hold" },
    ]}
  },
  { label: "Assigned To", fieldName: "AssignedTo__c", type: "text", editable: true, sortable: true, initialWidth: 130 },
  { label: "Start Date", fieldName: "StartDate__c", type: "date", editable: true, sortable: true, initialWidth: 120 },
  { label: "End Date", fieldName: "EndDate__c", type: "date", editable: true, sortable: true, initialWidth: 120 },
  { label: "Effort (hrs)", fieldName: "Effort__c", type: "number", editable: true, sortable: true, initialWidth: 110 },
  { label: "Complete", fieldName: "IsComplete__c", type: "boolean", editable: true, sortable: false, initialWidth: 90 },
];

export const scheduleData: EditableTreeRow[] = [
  {
    Id: "a001", Name: "Site Design Phase", Status__c: "In Progress", AssignedTo__c: "Sarah J.", StartDate__c: "2025-09-01", EndDate__c: "2025-10-15", Effort__c: 120, IsComplete__c: false,
    _children: [
      { Id: "a002", Name: "RF Planning", Status__c: "Completed", AssignedTo__c: "Mike L.", StartDate__c: "2025-09-01", EndDate__c: "2025-09-15", Effort__c: 40, IsComplete__c: true, _children: [] },
      { Id: "a003", Name: "Civil Design", Status__c: "In Progress", AssignedTo__c: "Anna K.", StartDate__c: "2025-09-10", EndDate__c: "2025-10-01", Effort__c: 50, IsComplete__c: false, _children: [] },
      { Id: "a004", Name: "Structural Analysis", Status__c: "Not Started", AssignedTo__c: "Tom W.", StartDate__c: "2025-10-01", EndDate__c: "2025-10-15", Effort__c: 30, IsComplete__c: false, _children: [] },
    ],
  },
  {
    Id: "a005", Name: "Permitting Phase", Status__c: "Not Started", AssignedTo__c: "Lisa M.", StartDate__c: "2025-10-15", EndDate__c: "2026-01-15", Effort__c: 80, IsComplete__c: false,
    _children: [
      { Id: "a006", Name: "Zoning Application", Status__c: "Not Started", AssignedTo__c: "Lisa M.", StartDate__c: "2025-10-15", EndDate__c: "2025-11-30", Effort__c: 20, IsComplete__c: false, _children: [] },
      {
        Id: "a007", Name: "FAA Approval", Status__c: "Not Started", AssignedTo__c: "Carlos R.", StartDate__c: "2025-11-01", EndDate__c: "2026-01-15", Effort__c: 40, IsComplete__c: false,
        _children: [
          { Id: "a008", Name: "Form 7460 Filing", Status__c: "Not Started", AssignedTo__c: "Carlos R.", StartDate__c: "2025-11-01", EndDate__c: "2025-11-15", Effort__c: 10, IsComplete__c: false, _children: [] },
          { Id: "a009", Name: "Obstruction Study", Status__c: "Not Started", AssignedTo__c: "Carlos R.", StartDate__c: "2025-11-15", EndDate__c: "2026-01-15", Effort__c: 30, IsComplete__c: false, _children: [] },
        ],
      },
    ],
  },
  {
    Id: "a010", Name: "Construction Phase", Status__c: "Not Started", AssignedTo__c: "Kevin T.", StartDate__c: "2026-02-01", EndDate__c: "2026-05-01", Effort__c: 200, IsComplete__c: false,
    _children: [
      { Id: "a011", Name: "Site Prep", Status__c: "Not Started", AssignedTo__c: "Kevin T.", StartDate__c: "2026-02-01", EndDate__c: "2026-02-28", Effort__c: 60, IsComplete__c: false, _children: [] },
      { Id: "a012", Name: "Tower Erection", Status__c: "Not Started", AssignedTo__c: "Kevin T.", StartDate__c: "2026-03-01", EndDate__c: "2026-04-15", Effort__c: 100, IsComplete__c: false, _children: [] },
      { Id: "a013", Name: "Equipment Install", Status__c: "Not Started", AssignedTo__c: "Nina B.", StartDate__c: "2026-04-15", EndDate__c: "2026-05-01", Effort__c: 40, IsComplete__c: false, _children: [] },
    ],
  },
];
