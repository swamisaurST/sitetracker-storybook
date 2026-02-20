import type { FieldsetField } from "./types";

export const contactFields: FieldsetField[] = [
  { apiName: "FirstName",   label: "First Name",   type: "text",   value: "Jordan",              required: true  },
  { apiName: "LastName",    label: "Last Name",    type: "text",   value: "Reeves",              required: true  },
  { apiName: "Email",       label: "Email",        type: "email",  value: "jordan.reeves@nw.com"                 },
  { apiName: "Phone",       label: "Phone",        type: "phone",  value: "+1 (512) 555-0192"                    },
  { apiName: "Title",       label: "Title",        type: "text",   value: "Network Engineer"                     },
  { apiName: "AccountName", label: "Account Name", type: "text",   value: "Northeast Utilities",  disabled: true },
];

export const projectFields: FieldsetField[] = [
  {
    apiName: "Name",
    label: "Project Name",
    type: "text",
    value: "Network Expansion — Phase 3",
    required: true,
  },
  {
    apiName: "Status__c",
    label: "Status",
    type: "picklist",
    value: "active",
    required: true,
    picklistOptions: [
      { label: "Initiated",  value: "initiated" },
      { label: "Planning",   value: "planning"  },
      { label: "Active",     value: "active"    },
      { label: "On Hold",    value: "on_hold"   },
      { label: "Complete",   value: "complete"  },
    ],
  },
  {
    apiName: "StartDate__c",
    label: "Start Date",
    type: "date",
    value: "2026-01-15",
  },
  {
    apiName: "EndDate__c",
    label: "Target End Date",
    type: "date",
    value: "2026-09-30",
  },
  {
    apiName: "Budget__c",
    label: "Budget (USD)",
    type: "number",
    value: 4250000,
  },
  {
    apiName: "IsActive__c",
    label: "Active",
    type: "boolean",
    value: true,
  },
  {
    apiName: "ProjectURL__c",
    label: "Project Portal",
    type: "url",
    value: "https://projects.sitetracker.com/NE-P3",
  },
];

export const serviceAppointmentFields: FieldsetField[] = [
  { apiName: "AppointmentNumber", label: "Appointment #", type: "text",    value: "SA-00042191",  disabled: true  },
  { apiName: "Subject",           label: "Subject",       type: "text",    value: "Replace Panel — Node 7A", required: true },
  { apiName: "Status",            label: "Status",        type: "picklist", value: "dispatched",
    picklistOptions: [
      { label: "New", value: "new" },
      { label: "Scheduled", value: "scheduled" },
      { label: "Dispatched", value: "dispatched" },
      { label: "In Progress", value: "in_progress" },
      { label: "Completed", value: "completed" },
      { label: "Closed", value: "closed" },
    ],
  },
  { apiName: "SchedStartTime",    label: "Scheduled Start", type: "date",  value: "2026-02-21"                   },
  { apiName: "Duration",          label: "Duration (hrs)", type: "number", value: 3                              },
  { apiName: "IsEmergency__c",    label: "Emergency",      type: "boolean", value: false                         },
];
