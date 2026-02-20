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
      { name: "stIllustration", label: "ST Illustration", description: "Image + inline text pair communicating an application state (empty, error, no access) in a friendly way.", status: "built", reusable: true, githubPath: `${GH}/stIllustration`, storyPath: "categories-ui-ux-building-blocks-stillustration--default" },
      { name: "stIllustrationImage", label: "ST Illustration Image", description: "The SVG image portion of the SLDS Illustration component, standalone.", status: "planned", reusable: true, githubPath: `${GH}/stIllustrationImage` },
      { name: "stFieldsetContainer", label: "ST Fieldset Container", description: "Displays a Salesforce fieldset with editable and read-only modes.", status: "built", reusable: true, githubPath: `${GH}/stFieldsetContainer`, storyPath: "categories-ui-ux-building-blocks-stfieldsetcontainer--read-mode" },
      { name: "stPicklistPathLWC", label: "ST Picklist Path LWC", description: "Guided process path for any picklist field. Renders SLDS Path component.", status: "built", reusable: true, githubPath: `${GH}/stPicklistPathLWC`, storyPath: "categories-ui-ux-building-blocks-stpicklistpathlwc--project-lifecycle" },
      { name: "stRadioGroup", label: "ST Radio Group", description: "Reusable radio button group selection component.", status: "built", reusable: true, githubPath: `${GH}/stRadioGroup`, storyPath: "categories-ui-ux-building-blocks-stradiogroup--default" },
      { name: "stSobjectPicker", label: "ST SObject Picker", description: "Dynamic object picker for selecting Salesforce SObject records.", status: "planned", reusable: true, githubPath: `${GH}/stSobjectPicker` },
      { name: "stObjectLayoutRelatedList", label: "ST Object Layout Related List", description: "Inline editable data table for displaying related lists. Replaces deprecated stRelatedList.", status: "planned", reusable: true, githubPath: `${GH}/stObjectLayoutRelatedList` },
      { name: "stLwcCard", label: "ST LWC Card", description: "Reusable card wrapper with header, icon, and action slots. Used internally by stEditableDatatable.", status: "planned", reusable: true, githubPath: `${GH}/stLwcCard` },
      { name: "stIframeContainer", label: "ST IFrame Container", description: "Resizable iframe container based on window size.", status: "planned", reusable: true, githubPath: `${GH}/stIframeContainer` },
      { name: "stBetaBar", label: "ST Beta Bar", description: "Beta feature announcement banner component.", status: "planned", reusable: true, githubPath: `${GH}/stBetaBar` },
      { name: "stRecordSideBar", label: "ST Record Sidebar", description: "Sidebar component for record pages.", status: "planned", reusable: true, githubPath: `${GH}/stRecordSideBar` },
      { name: "stLastModifiers", label: "ST Last Modifiers", description: "Displays the last set of users who updated the record, with avatars.", status: "planned", reusable: true, githubPath: `${GH}/stLastModifiers` },
      { name: "stProductFeedback", label: "ST Product Feedback", description: "Allows users on any page to provide feedback to the Sitetracker product team.", status: "planned", reusable: true, githubPath: `${GH}/stProductFeedback` },
      { name: "stFeedback", label: "ST Feedback", description: "Feature flag-based feedback component.", status: "planned", reusable: true, githubPath: `${GH}/stFeedback` },
    ]}
  />
);

const meta = { title: "Categories/UI · UX Building Blocks", component: Page, parameters: { layout: "fullscreen", options: { showPanel: false }, docs: { page: null }, hideToolbar: true } } satisfies Meta<typeof Page>;
export default meta;
export const Overview: StoryObj<typeof meta> = { render: () => <Page /> };
