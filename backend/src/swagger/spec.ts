// src/swagger/zodSpec.ts
import { OpenAPIRegistry, OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { z } from "./zod";
import { helloWorldResponseSchema } from "../schema/helloWorld";

const registry = new OpenAPIRegistry();

registry.registerPath({
  method: "get",
  path: "/",
  summary: "Hello world",
  request: {
    // optional, just to show usage
    query: z.object({
      name: z.string().optional(),
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

export const zodSpec = generator.generateDocument({
  openapi: "3.0.0",
  info: {
    title: "Test API (zod-to-openapi)",
    version: "1.0.0",
  },
});