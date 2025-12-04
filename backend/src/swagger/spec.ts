import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";

import { z } from "./zod";
import { helloWorldResponseSchema } from "../schema/helloWorld";
import "./decompose";
import { registry } from "./registry";

registry.registerPath({
  method: "get",
  path: "/",
  summary: "Hello world",
  request: {
    query: z.object({
      name: z.string(),
    }),
  },
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: helloWorldResponseSchema,
        },
      },
    },
  },
});

const generator = new OpenApiGeneratorV3(registry.definitions);

export const spec = generator.generateDocument({
  openapi: "3.0.0",
  info: {
    title: "Researcher",
    version: "1.0.0",
  },
});
