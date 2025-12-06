import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";

import { registry } from "./registry";
import "./decompose";
import "./node";

const generator = new OpenApiGeneratorV3(registry.definitions);

export const spec = generator.generateDocument({
  openapi: "3.0.0",
  info: {
    title: "Researcher",
    version: "1.0.0",
  },
});
