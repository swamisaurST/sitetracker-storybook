import type { TreeGridColumn, TreeGridRow } from "./types";

export const projectTreeColumns: TreeGridColumn[] = [
  { label: "Name", fieldName: "Name", type: "text", initialWidth: 220 },
  { label: "Type", fieldName: "Type__c", type: "text", initialWidth: 120 },
  { label: "Status", fieldName: "Status__c", type: "text", initialWidth: 120 },
  { label: "Budget", fieldName: "Budget__c", type: "currency", initialWidth: 130, typeAttributes: { currencyCode: "USD" } },
  { label: "Completion", fieldName: "Completion__c", type: "percent", initialWidth: 110 },
  { label: "Owner", fieldName: "Owner__c", type: "text", initialWidth: 120 },
];

export const projectTreeData: TreeGridRow[] = [
  {
    Id: "r001", Name: "North Region Portfolio", Type__c: "Portfolio", Status__c: "Active", Budget__c: 850000, Completion__c: 68, Owner__c: "Sarah J.",
    _children: [
      {
        Id: "r002", Name: "Chicago Metro Program", Type__c: "Program", Status__c: "Active", Budget__c: 420000, Completion__c: 72, Owner__c: "Mike L.",
        _children: [
          { Id: "r003", Name: "Tower Alpha - Chicago", Type__c: "Project", Status__c: "Active", Budget__c: 125000, Completion__c: 85, Owner__c: "Anna K.", _children: [] },
          { Id: "r004", Name: "Small Cell Hub B", Type__c: "Project", Status__c: "Planned", Budget__c: 45000, Completion__c: 0, Owner__c: "Tom W.", _children: [] },
          { Id: "r005", Name: "Fiber Node C", Type__c: "Project", Status__c: "In Progress", Budget__c: 78000, Completion__c: 42, Owner__c: "Anna K.", _children: [] },
        ],
      },
      {
        Id: "r006", Name: "Detroit Metro Program", Type__c: "Program", Status__c: "Active", Budget__c: 430000, Completion__c: 64, Owner__c: "Lisa M.",
        _children: [
          { Id: "r007", Name: "Tower Delta - Detroit", Type__c: "Project", Status__c: "Completed", Budget__c: 210000, Completion__c: 100, Owner__c: "Lisa M.", _children: [] },
          { Id: "r008", Name: "Rooftop Node E", Type__c: "Project", Status__c: "On Hold", Budget__c: 56000, Completion__c: 15, Owner__c: "John P.", _children: [] },
        ],
      },
    ],
  },
  {
    Id: "r009", Name: "South Region Portfolio", Type__c: "Portfolio", Status__c: "Active", Budget__c: 640000, Completion__c: 55, Owner__c: "Carlos R.",
    _children: [
      {
        Id: "r010", Name: "Texas Program", Type__c: "Program", Status__c: "Active", Budget__c: 380000, Completion__c: 60, Owner__c: "Rachel S.",
        _children: [
          { Id: "r011", Name: "Tower Golf - Austin", Type__c: "Project", Status__c: "Active", Budget__c: 180000, Completion__c: 70, Owner__c: "Rachel S.", _children: [] },
          { Id: "r012", Name: "DAS Node H", Type__c: "Project", Status__c: "Active", Budget__c: 95000, Completion__c: 60, Owner__c: "Kevin T.", _children: [] },
        ],
      },
      {
        Id: "r013", Name: "Florida Program", Type__c: "Program", Status__c: "Planned", Budget__c: 260000, Completion__c: 0, Owner__c: "Nina B.",
        _children: [
          { Id: "r014", Name: "Tower Juliet - Miami", Type__c: "Project", Status__c: "Planned", Budget__c: 150000, Completion__c: 0, Owner__c: "Nina B.", _children: [] },
        ],
      },
    ],
  },
];

export const shallowTreeData: TreeGridRow[] = projectTreeData.map((r) => ({ ...r, _children: r._children?.map((c) => ({ ...c, _children: [] })) }));
