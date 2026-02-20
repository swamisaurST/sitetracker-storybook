import type { Column, DataTableRow } from "../DataTable/types";

// Junction table: Equipment linked to a Tower Site
export const junctionColumns: Column[] = [
  { label: "Equipment Name", fieldName: "Name", type: "text", sortable: true, initialWidth: 200 },
  { label: "Category", fieldName: "Category__c", type: "text", sortable: true, initialWidth: 140 },
  { label: "Quantity", fieldName: "Quantity__c", type: "number", sortable: true, initialWidth: 100 },
  { label: "Unit Cost", fieldName: "UnitCost__c", type: "currency", sortable: true, initialWidth: 120, typeAttributes: { currencyCode: "USD" } },
  { label: "Install Date", fieldName: "InstallDate__c", type: "date", sortable: true, initialWidth: 120 },
];

export const junctionData: DataTableRow[] = [
  { Id: "j001", Name: "Nokia AirScale Radio", Category__c: "Radio", Quantity__c: 3, UnitCost__c: 4500, InstallDate__c: "2025-06-15" },
  { Id: "j002", Name: "Ericsson AIR 3239", Category__c: "Antenna", Quantity__c: 6, UnitCost__c: 2200, InstallDate__c: "2025-06-15" },
  { Id: "j003", Name: "CommScope Jumper Cable", Category__c: "Cable", Quantity__c: 12, UnitCost__c: 180, InstallDate__c: "2025-06-16" },
];

// Selection table: All available equipment in catalog
export const selectionColumns: Column[] = [
  { label: "Equipment Name", fieldName: "Name", type: "text", sortable: true, initialWidth: 200 },
  { label: "Category", fieldName: "Category__c", type: "text", sortable: true, initialWidth: 140 },
  { label: "Unit Cost", fieldName: "UnitCost__c", type: "currency", sortable: true, initialWidth: 120, typeAttributes: { currencyCode: "USD" } },
  { label: "In Stock", fieldName: "InStock__c", type: "boolean", sortable: false, initialWidth: 90 },
];

export const selectionData: DataTableRow[] = [
  { Id: "j001", Name: "Nokia AirScale Radio", Category__c: "Radio", UnitCost__c: 4500, InStock__c: true },
  { Id: "j002", Name: "Ericsson AIR 3239", Category__c: "Antenna", UnitCost__c: 2200, InStock__c: true },
  { Id: "j003", Name: "CommScope Jumper Cable", Category__c: "Cable", UnitCost__c: 180, InStock__c: true },
  { Id: "j004", Name: "Andrew SBNHJ-09", Category__c: "Antenna", UnitCost__c: 1800, InStock__c: true },
  { Id: "j005", Name: "Huawei RRU 5258", Category__c: "Radio", UnitCost__c: 3800, InStock__c: false },
  { Id: "j006", Name: "Times Microwave LMR-600", Category__c: "Cable", UnitCost__c: 95, InStock__c: true },
  { Id: "j007", Name: "Kathrein 742215", Category__c: "Antenna", UnitCost__c: 2600, InStock__c: true },
  { Id: "j008", Name: "Raycap DC6-48-12", Category__c: "Power", UnitCost__c: 1200, InStock__c: true },
  { Id: "j009", Name: "Alpha FXM 3300", Category__c: "Power", UnitCost__c: 2100, InStock__c: false },
  { Id: "j010", Name: "Cisco Catalyst IE3300", Category__c: "Networking", UnitCost__c: 3400, InStock__c: true },
];
