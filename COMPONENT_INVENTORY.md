# Sitetracker Component Inventory

> Source: [Coda — Development Plans > Reusable Components](https://coda.io/d/_dHCab2qMnp2/Reusable-Components_suHonxkL)
> Last synced: 2026-02-20

**Total: 77 components across 13 categories**

---

## 1. Data Display & Grid Components ← CURRENT FOCUS

### Grid, Table & List

| Component | Master Label | Description | Reusable |
|-----------|-------------|-------------|----------|
| stLwcDataTable | ST Data Table | Configurable data table component for displaying records with pagination, sorting, and filtering | Yes |
| stEditableDatatable | ST Editable DataTable | ST Editable DataTable with Live Refresh built in. Supports inline editing, search, and record creation | Yes |
| stTreeGrid | ST Tree Grid | Sitetracker Configurable Tree Grid Component for hierarchical data display with parent-child relationships | Yes |
| stEditableTreeGrid | stEditableTreeGrid | Editable tree grid for inline editing of hierarchical data | Yes |
| stObjectEditableTreeGrid | ST Object Editable Tree Grid | Generic tree grid for any object with parent-child relationship | Yes |
| stFieldAssetTreeGrid | ST Field Asset Tree Grid | Displays Field Assets in a tree grid structure | No |
| stFieldAssetEditableTreeGrid | ST Field Asset Editable Tree Grid | Editable version of Field Asset tree grid | No |
| stManyToMany | ST Many To Many | Sitetracker Configurable Many To Many Junction Record Component for managing junction objects | Yes |

---

## 2. Schedule & Timeline

| Component | Master Label | Description | Reusable |
|-----------|-------------|-------------|----------|
| sitetrackerGanttChart | Sitetracker Gantt Chart | Displayed a Gantt Chart using the provided object records | Yes |
| stProjectGanttChart | ST Project Gantt Chart | Display the Project schedule in a gantt chart | No |
| stPowerfulProjectSchedule | ST Project Schedule V2 | Display the Project schedule | No |
| stProjectTimeline | St Project Timeline | LWC container to display the Project Timeline in a responsive iframe component | No |
| stActivityTimeline | ST Activity Timeline | Displays activity timeline for a record | No |
| stSchedule | stSchedule | Project schedule display | No |
| stScheduleManager | stScheduleManager | Schedule management functionality | No |

---

## 3. Files

| Component | Master Label | Description | Reusable |
|-----------|-------------|-------------|----------|
| stFiles | ST Files | File management component with upload, download, delete, versioning, and manifest support | No |
| stFileBrowser | ST File Browser | File browser component for record pages with upload/download/delete capabilities | No |
| stFilesConditionalEdit | ST Files Conditional Edit | Files component with conditional editing based on field values | No |
| stLayoutFileUploader | stLayoutFileUploader | File uploader with layout integration | Yes |

---

## 4. Financial & Budget Components

| Component | Master Label | Description |
|-----------|-------------|-------------|
| stBudgetGrid | (exposed) | Budget grid component for displaying and editing budget lines with summary rows |
| stCostProjection | (exposed) | Cost projection grid for project cost management |
| stFinancialSummaryGrid | (exposed) | Financial summary grid with ETC adjustments and summary rows |
| stFinancialSummaryGraph | (exposed) | Financial summary graph visualization |
| stFinancialJournalEntryDataTable | (exposed) | Financial journal entry data table |
| stProjectFinances | (exposed) | Project finances component |

---

## 5. Inventory & Asset Components

| Component | Master Label | Description |
|-----------|-------------|-------------|
| stInventoryWrapper | ST Inventory Wrapper | Routes to 2GP Inventory if available, otherwise falls back to 1GP component |
| stSiteInventory | ST Site Inventory | This component displays the inventory for a Site |
| stReserveInventory | ST Reserve Inventory | This component displays the inventory for a Job and allows for inventory reservation |
| stKitItemTree | ST Kit Item Tree | Kit item tree for inventory management |
| stSearchInventory | (exposed) | Inventory search functionality |

---

## 6. Production Tracking

| Component | Master Label | Description |
|-----------|-------------|-------------|
| stProductionTracking | (exposed) | Production tracking grid with plan lines, allocations, and work logs management |
| stProductionTrackingGraph | (exposed) | Production tracking graph visualization |
| stPTPlannedvsActualGraph | (exposed) | Planned vs Actual graph for production tracking |

---

## 7. UI/UX Building Blocks

| Component | Master Label | Description | Reusable |
|-----------|-------------|-------------|----------|
| stIllustration | ST Illustration | An image and inline text that work in tandem to communicate a state in a more friendly way | Yes |
| stIllustrationImage | ST Illustration Image | The image portion of the SLDS Illustration component | Yes |
| stIframeContainer | St IFrame Container | LWC container to display provide an iframe that is resizeable based on the size of the window | Yes |
| stFieldsetContainer | ST Fieldset Container | Container for displaying fieldsets with editable/read-only options | Yes |
| stBetaBar | stBetaBar | Beta feature banner component | Yes |
| stRecordSideBar | stRecordSideBar | Record sidebar component | Yes |
| stRadioGroup | St Radio Group | Radio group selection component | Yes |
| stSobjectPicker | (exposed) | SObject picker component | Yes |
| stPicklistPathLWC | ST Picklist Path LWC | Picklist path component for guided processes | Yes |
| stRelatedList | St Related List | Inline editable data table for displaying related lists | Yes |
| stFieldSetForm | St Field Set form | A Lightning Component Bundle for displaying field sets as forms | Yes |
| StPicklistPath | ST Picklist Path | The Sitetracker Picklist Path component allows users to add a path for any picklist field | Yes |
| stManyToMany | ST Many to Many | Sitetracker Configurable Many To Many Junction Record Component | Yes |
| stProductFeedback | ST Product Feedback | This component can be placed onto any page and allow the users to provide feedback to Sitetracker | Yes |
| stFeedback | ST Feedback | Feature flag feedback component | Yes |
| stLastModifiers | ST Last Modifiers | Display the last set of users that updated the record | Yes |

---

## 8. Calendar and Scheduler

| Component | Master Label | Description | Reusable |
|-----------|-------------|-------------|----------|
| stLwcCalendar | ST Calendar (LWC) | This is the LWC version of the ST Calendar | Yes |
| stCalendarNavigator | stCalendarNavigator | Calendar navigation component | No |
| stCalendarRecordWrapper | stCalendarRecordWrapper | Calendar record wrapper | No |

---

## 9. Maintenance

| Component | Master Label | Description |
|-----------|-------------|-------------|
| stMaintenanceCentral | ST Maintenance Central | Central hub for managing Maintenance Profiles, Ad Hoc Maintenance Cycles, and Schedule Groups efficiently |
| stMaintenanceSchedule | ST Maintenance Schedule | Maintenance schedule management |

---

## 10. Map & GIS

| Component | Description |
|-----------|-------------|
| stMapContainer | Map container component |
| stMapMarker | Map marker component |
| stMapLayerClone | Map layer clone functionality |
| stMapObjectConfigurationSyncMapper | Map object configuration sync mapper |
| stSyncLayer | GIS layer sync functionality |
| stSyncRecord | Record sync with GIS |
| stCoverageMap | Coverage map component |

---

## 11. Approval & Workflow

| Component | Master Label | Description | Reusable |
|-----------|-------------|-------------|----------|
| stApprovalStepsContainer | stApprovalStepsContainer | Approval steps container | No |
| stApprovalConsole | ST Approvals | Approval console | Yes |
| stApprovalManager | stApprovalManager | Approval management | No |
| stNotifManager | stNotifManager | Notification manager | No |

---

## 12. Trackers

| Component | Master Label | Description |
|-----------|-------------|-------------|
| stTrackerTabView | (exposed) | Tracker tab view with folder management |
| stTrackerContainer | (exposed) | Tracker container component |
| stTrackerModalWindow | (exposed) | Tracker modal window |
| stTrackerFolderShare | (exposed) | Tracker folder sharing |

---

## 13. Modules

| Component | Master Label | Description | Reusable |
|-----------|-------------|-------------|----------|
| stTaskForm | ST Task Form | Form for creating a new Task record assigned to a Contact linked to an Account | No |
| stProductFeedback | St Product Feedback | Allows users to provide feedback to Sitetracker | No |
| stEnhancedTimetracker | stEnhancedTimetracker | Enhanced time tracking component | No |
| stLiveRefreshPoller | stLiveRefreshPoller | Live refresh polling component | No |
| stMaterialRequestTable | ST Material Request Table | Displays the requested material for a given job | No |
| stTjEditableTreeGridContainer | ST Ticket and Job Tree | Ticket and job tree grid container | No |
| stPunchDockedPanel | ST Punch Docked Panel | Punch docked panel | No |
| stProjectTemplateMilestoneModal | ST Template Designer Milestone Modal | Template designer milestone modal | No |
