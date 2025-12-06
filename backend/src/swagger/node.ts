// src/openapi/paths/node.ts
import { registry } from "./registry";
import {
  CreateNodeBodySchema,
  CreateNodeResponseSchema,
} from "../schemas/node";

registry.registerPath({
  method: "post",
  path: "/nodes",
  tags: ["Nodes"],
  summary: "Create a node",
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateNodeBodySchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Node created",
      content: {
        "application/json": {
          schema: CreateNodeResponseSchema,
        },
      },
    },
  },
});
