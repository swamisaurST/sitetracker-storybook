import type { IllustrationProps } from "./types";

export const emptyStatePresets: IllustrationProps[] = [
  {
    type: "empty-state-assistant",
    heading: "No Components Yet",
    body: "Start by selecting a component from the left panel or create a new one.",
    size: "medium",
  },
  {
    type: "empty-state-events",
    heading: "No Events Scheduled",
    body: "There are no events in the selected timeframe. Adjust filters or add a new event.",
    size: "medium",
  },
  {
    type: "empty-state-tasks",
    heading: "All Tasks Complete",
    body: "Great work! There are no pending tasks in this project.",
    size: "medium",
  },
  {
    type: "error:no_access",
    heading: "Access Restricted",
    body: "You don't have permission to view this content. Contact your administrator.",
    size: "medium",
  },
  {
    type: "error:no_connection",
    heading: "No Connection",
    body: "Check your network and try again. Changes are saved locally.",
    size: "medium",
  },
  {
    type: "misc:no_content",
    heading: "No Records Found",
    body: "No records match your current filters. Try adjusting the search criteria.",
    size: "medium",
  },
  {
    type: "error:page_not_available",
    heading: "Something Went Wrong",
    body: "We encountered an unexpected error. Refresh the page or contact support.",
    size: "medium",
  },
];
