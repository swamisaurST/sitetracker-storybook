import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { CategoryPage } from "./CategoryPage";

const CODA = "https://coda.io/d/Development-Plans_dHCab2qMnp2/Reusable-Components_suHonxkL";
const GH = "https://github.com/sitetracker/strk/tree/preprod/src/main/default/lwc";

const Page = () => (
  <CategoryPage
    phase={3}
    category="Files"
    icon="📁"
    description="File management components covering upload, download, delete, versioning, and manifest support. The Layout File Uploader is the only reusable one — the others are record-specific."
    codaUrl={CODA}
    components={[
      { name: "stLayoutFileUploader", label: "ST Layout File Uploader", description: "File uploader with layout integration. Reusable across any record page.", status: "planned", reusable: true, githubPath: `${GH}/stLayoutFileUploader` },
      { name: "stFiles", label: "ST Files", description: "Full file management with upload, download, delete, versioning, and manifest support.", status: "domain-specific", reusable: false, githubPath: `${GH}/stFiles` },
      { name: "stFileBrowser", label: "ST File Browser", description: "File browser for record pages with full CRUD capabilities.", status: "domain-specific", reusable: false, githubPath: `${GH}/stFileBrowser` },
      { name: "stFilesConditionalEdit", label: "ST Files Conditional Edit", description: "Files component that conditionally enables editing based on field values.", status: "domain-specific", reusable: false, githubPath: `${GH}/stFilesConditionalEdit` },
    ]}
  />
);

const meta = { title: "Categories/Files", component: Page, parameters: { layout: "fullscreen", options: { showPanel: false }, docs: { page: null }, hideToolbar: true } } satisfies Meta<typeof Page>;
export default meta;
export const Overview: StoryObj<typeof meta> = { render: () => <Page /> };
