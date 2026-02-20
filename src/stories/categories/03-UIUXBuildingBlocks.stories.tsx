import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { CategoryPage } from "./CategoryPage";

const CODA = "https://coda.io/d/Development-Plans_dHCab2qMnp2/Reusable-Components_suHonxkL";
const GH = "https://github.com/sitetracker/strk/tree/preprod/src/main/default/lwc";

const Page = () => (
  <CategoryPage
    phase={2}
    category="UI/UX Building Blocks"
    icon="🧩"
    description="The primitives and utility components used throughout the Sitetracker UI. Includes illustrations, form containers, feedback widgets, pickers, and path indicators. High reusability — nearly all marked as reusable in the inventory."
    codaUrl={CODA}
    components={[
      { name: "stIllustration",           label: "ST Illustration",              description: "Image + inline text pair communicating an application state (empty, error, no access) in a friendly way.",          status: "built",   reusable: true, githubPath: `${GH}/stIllustration`,           storyPath: "Categories/UI · UX Building Blocks/stIllustration" },
      { name: "stIllustrationImage",      label: "ST Illustration Image",        description: "The SVG image portion of the SLDS Illustration component, standalone.",                                              status: "built",   reusable: true, githubPath: `${GH}/stIllustrationImage`,      storyPath: "Categories/UI · UX Building Blocks/stIllustrationImage" },
      { name: "stRadioGroup",             label: "ST Radio Group",               description: "Reusable radio button group selection component. Supports vertical, horizontal, and button-group toggle modes.",     status: "built",   reusable: true, githubPath: `${GH}/stRadioGroup`,             storyPath: "Categories/UI · UX Building Blocks/stRadioGroup" },
      { name: "stPicklistPathLWC",        label: "ST Picklist Path LWC",         description: "Guided process path for any picklist field. Renders the SLDS Path component with optional coaching text.",          status: "built",   reusable: true, githubPath: `${GH}/stPicklistPathLWC`,        storyPath: "Categories/UI · UX Building Blocks/stPicklistPathLWC", storySlug: "project-lifecycle" },
      { name: "stFieldsetContainer",      label: "ST Fieldset Container",        description: "Displays a Salesforce fieldset with editable and read-only modes. Handles validation and save/cancel flow.",        status: "built",   reusable: true, githubPath: `${GH}/stFieldsetContainer`,      storyPath: "Categories/UI · UX Building Blocks/stFieldsetContainer", storySlug: "read-mode" },
      { name: "stLwcCard",                label: "ST LWC Card",                  description: "Reusable card wrapper with header icon, title, action slots, and optional footer. Shell for other components.",      status: "built",   reusable: true, githubPath: `${GH}/stLwcCard`,                storyPath: "Categories/UI · UX Building Blocks/stLwcCard" },
      { name: "stBetaBar",                label: "ST Beta Bar",                  description: "Dismissible beta/info/warning/error announcement banner with optional CTA link.",                                    status: "built",   reusable: true, githubPath: `${GH}/stBetaBar`,                storyPath: "Categories/UI · UX Building Blocks/stBetaBar" },
      { name: "stLastModifiers",          label: "ST Last Modifiers",            description: "Stacked avatar group showing the last users who modified a record, with overflow badge and hover tooltips.",        status: "built",   reusable: true, githubPath: `${GH}/stLastModifiers`,          storyPath: "Categories/UI · UX Building Blocks/stLastModifiers" },
      { name: "stSobjectPicker",          label: "ST SObject Picker",            description: "Dynamic object picker for selecting Salesforce SObject records.",                                                    status: "planned", reusable: true, githubPath: `${GH}/stSobjectPicker` },
      { name: "stObjectLayoutRelatedList",label: "ST Object Layout Related List",description: "Inline editable data table for displaying related lists. Replaces deprecated stRelatedList.",                       status: "planned", reusable: true, githubPath: `${GH}/stObjectLayoutRelatedList` },
      { name: "stIframeContainer",        label: "ST IFrame Container",          description: "Resizable iframe container based on window size.",                                                                   status: "planned", reusable: true, githubPath: `${GH}/stIframeContainer` },
      { name: "stRecordSideBar",          label: "ST Record Sidebar",            description: "Sidebar component for record pages.",                                                                                status: "planned", reusable: true, githubPath: `${GH}/stRecordSideBar` },
      { name: "stProductFeedback",        label: "ST Product Feedback",          description: "Allows users on any page to provide feedback to the Sitetracker product team.",                                     status: "planned", reusable: true, githubPath: `${GH}/stProductFeedback` },
      { name: "stFeedback",               label: "ST Feedback",                  description: "Feature flag-based feedback component.",                                                                             status: "planned", reusable: true, githubPath: `${GH}/stFeedback` },
    ]}
  />
);

const meta = { title: "Categories/UI · UX Building Blocks", component: Page, parameters: { layout: "fullscreen", options: { showPanel: false }, docs: { page: null }, hideToolbar: true } } satisfies Meta<typeof Page>;
export default meta;
export const Overview: StoryObj<typeof meta> = { render: () => <Page /> };
