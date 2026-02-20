import type { Column, DataTableRow, RowAction } from "./types";

export const siteColumns: Column[] = [
  { label: "Site Name", fieldName: "Name", type: "text", sortable: true, initialWidth: 180 },
  { label: "Status", fieldName: "Status__c", type: "customStatusBadge", sortable: true, initialWidth: 120, typeAttributes: { theme: "success" } },
  { label: "Site Type", fieldName: "Site_Type__c", type: "text", sortable: true, initialWidth: 120 },
  { label: "City", fieldName: "City__c", type: "text", sortable: true, initialWidth: 130 },
  { label: "State", fieldName: "State__c", type: "text", sortable: true, initialWidth: 70 },
  { label: "Budget", fieldName: "Budget__c", type: "currency", sortable: true, initialWidth: 130, typeAttributes: { currencyCode: "USD", fractionDigits: 2 } },
  { label: "Completion", fieldName: "Completion__c", type: "percent", sortable: true, initialWidth: 110 },
  { label: "Last Modified", fieldName: "LastModifiedDate", type: "date", sortable: true, initialWidth: 130 },
];

export const siteData: DataTableRow[] = [
  { Id: "001", Name: "Tower Alpha", Status__c: "Active", Site_Type__c: "Macro Tower", City__c: "Austin", State__c: "TX", Budget__c: 125000, Completion__c: 85, LastModifiedDate: "2026-02-15" },
  { Id: "002", Name: "Small Cell Hub B", Status__c: "Planned", Site_Type__c: "Small Cell", City__c: "Denver", State__c: "CO", Budget__c: 45000, Completion__c: 0, LastModifiedDate: "2026-02-14" },
  { Id: "003", Name: "Rooftop Node C7", Status__c: "In Progress", Site_Type__c: "Rooftop", City__c: "Seattle", State__c: "WA", Budget__c: 78000, Completion__c: 42, LastModifiedDate: "2026-02-12" },
  { Id: "004", Name: "Tower Delta 4", Status__c: "Active", Site_Type__c: "Macro Tower", City__c: "Portland", State__c: "OR", Budget__c: 210000, Completion__c: 100, LastModifiedDate: "2026-01-30" },
  { Id: "005", Name: "Fiber Node E", Status__c: "On Hold", Site_Type__c: "Fiber Hub", City__c: "Phoenix", State__c: "AZ", Budget__c: 56000, Completion__c: 15, LastModifiedDate: "2026-02-10" },
  { Id: "006", Name: "Small Cell Hub F", Status__c: "Active", Site_Type__c: "Small Cell", City__c: "San Francisco", State__c: "CA", Budget__c: 32000, Completion__c: 92, LastModifiedDate: "2026-02-18" },
  { Id: "007", Name: "Tower Golf 7", Status__c: "Planned", Site_Type__c: "Macro Tower", City__c: "Chicago", State__c: "IL", Budget__c: 180000, Completion__c: 0, LastModifiedDate: "2026-02-01" },
  { Id: "008", Name: "Rooftop Hotel H", Status__c: "In Progress", Site_Type__c: "Rooftop", City__c: "Miami", State__c: "FL", Budget__c: 95000, Completion__c: 60, LastModifiedDate: "2026-02-16" },
  { Id: "009", Name: "DAS Node I", Status__c: "Active", Site_Type__c: "DAS", City__c: "New York", State__c: "NY", Budget__c: 150000, Completion__c: 78, LastModifiedDate: "2026-02-11" },
  { Id: "010", Name: "Tower Juliet 10", Status__c: "Completed", Site_Type__c: "Macro Tower", City__c: "Dallas", State__c: "TX", Budget__c: 320000, Completion__c: 100, LastModifiedDate: "2026-01-20" },
  { Id: "011", Name: "Fiber Hub K", Status__c: "Active", Site_Type__c: "Fiber Hub", City__c: "Boston", State__c: "MA", Budget__c: 67000, Completion__c: 88, LastModifiedDate: "2026-02-13" },
  { Id: "012", Name: "Rooftop Lima L", Status__c: "On Hold", Site_Type__c: "Rooftop", City__c: "Nashville", State__c: "TN", Budget__c: 42000, Completion__c: 30, LastModifiedDate: "2026-02-05" },
  { Id: "013", Name: "Tower Mike 13", Status__c: "In Progress", Site_Type__c: "Macro Tower", City__c: "Atlanta", State__c: "GA", Budget__c: 275000, Completion__c: 55, LastModifiedDate: "2026-02-17" },
  { Id: "014", Name: "Small Cell N", Status__c: "Planned", Site_Type__c: "Small Cell", City__c: "Las Vegas", State__c: "NV", Budget__c: 38000, Completion__c: 0, LastModifiedDate: "2026-02-08" },
  { Id: "015", Name: "DAS Node O", Status__c: "Active", Site_Type__c: "DAS", City__c: "Minneapolis", State__c: "MN", Budget__c: 112000, Completion__c: 95, LastModifiedDate: "2026-02-19" },
  { Id: "016", Name: "Tower Papa 16", Status__c: "Completed", Site_Type__c: "Macro Tower", City__c: "Detroit", State__c: "MI", Budget__c: 290000, Completion__c: 100, LastModifiedDate: "2026-01-25" },
];

export const siteRowActions: RowAction[] = [
  { label: "View", name: "view", iconName: "utility:preview" },
  { label: "Edit", name: "edit", iconName: "utility:edit" },
  { label: "Delete", name: "delete", iconName: "utility:delete" },
];

export const errorSiteData: DataTableRow[] = siteData.slice(0, 6).map((row, i) => ({
  ...row,
  _errorType: i === 1 ? "error" : i === 4 ? "warning" : undefined,
}));

export const editableColumns: Column[] = siteColumns.map((col) => ({
  ...col,
  editable: ["Name", "City__c", "Budget__c"].includes(col.fieldName),
}));
