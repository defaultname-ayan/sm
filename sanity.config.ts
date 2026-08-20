"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemas";
import { SINGLETON_IDS, structure } from "./sanity/structure";

export default defineConfig({
  basePath: "/studio",
  title: "Sudha Square",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
  document: {
    // Singletons are edited in place — never duplicated or deleted.
    actions: (input, context) =>
      SINGLETON_IDS.includes(context.schemaType) ||
      context.schemaType === "pageContent"
        ? input.filter(({ action }) =>
            ["publish", "discardChanges", "restore"].includes(action ?? ""),
          )
        : input,
  },
});
