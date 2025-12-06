import { z } from "../swagger/zod";

export const NodeSchema = z.object({
  id: z.string().openapi({ example: "node_123" }),
  name: z.string().min(1).openapi({ example: "Universal basic income" }),
  color: z
    .string()
    .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/)
    .optional()
    .openapi({ example: "#ff8800" }),
  x: z.number().optional().openapi({ example: 120 }),
  y: z.number().optional().openapi({ example: 80 }),
});

export const CreateNodeBodySchema = z.object({
  name: z.string().min(1).openapi({ example: "UBI in New Zealand" }),
  color: z
    .string()
    .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/)
    .optional()
    .openapi({ example: "#ff8800" }),
  x: z.number().optional().openapi({ example: 100 }),
  y: z.number().optional().openapi({ example: 200 }),
});

export const CreateNodeResponseSchema = z.object({
  node: NodeSchema,
});
