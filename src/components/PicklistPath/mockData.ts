import type { PathOption } from "./types";

export const projectLifecycle: PathOption[] = [
  {
    label: "Initiated",
    value: "initiated",
    description: "Project has been created and assigned an owner. Confirm the project charter and stakeholder list before moving forward.",
  },
  {
    label: "Planning",
    value: "planning",
    description: "Define the project scope, schedule, and resource plan. All key milestones should be entered into the schedule before proceeding.",
  },
  {
    label: "Active",
    value: "active",
    description: "Project is underway. Monitor progress daily, update the schedule, and track open issues.",
  },
  {
    label: "On Hold",
    value: "on_hold",
    description: "Project is temporarily paused. Document the reason and expected restart date in the notes field.",
  },
  {
    label: "Complete",
    value: "complete",
    description: "All deliverables have been accepted. Close out open tasks, capture lessons learned, and archive project documents.",
  },
];

export const serviceWorkflow: PathOption[] = [
  { label: "New", value: "new", description: "Service appointment has been created and is awaiting assignment." },
  { label: "Scheduled", value: "scheduled", description: "Appointment has been assigned to a technician and the customer has been notified." },
  { label: "Dispatched", value: "dispatched", description: "Technician is en route to the service location." },
  { label: "In Progress", value: "in_progress", description: "Work is currently being performed on site." },
  { label: "Completed", value: "completed", description: "All work items are complete. Awaiting customer sign-off." },
  { label: "Closed", value: "closed", description: "Customer has signed off. Invoice generated." },
];

export const opportunityStages: PathOption[] = [
  { label: "Prospecting", value: "prospecting", description: "Identify the opportunity and confirm there is a real need." },
  { label: "Qualification", value: "qualification", description: "Confirm budget, authority, need, and timeline (BANT)." },
  { label: "Proposal", value: "proposal", description: "Present the formal proposal and gather feedback." },
  { label: "Negotiation", value: "negotiation", description: "Work through final terms, pricing, and contract language." },
  { label: "Closed Won", value: "closed_won", description: "Deal is signed. Transition to delivery team." },
];
