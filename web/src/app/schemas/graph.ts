import { z } from "zod";

const graphSchema = z
  .object({
    nodes: z.array(
      z
        .object({
          key: z.string().min(1),
          name: z.string().min(1),
        })
        .strict(),
    ),
    links: z.array(
      z
        .object({
          source: z.string().min(1),
          target: z.string().min(1),
        })
        .strict(),
    ),
  })
  .strict();

const postGraphBodySchema = z
  .object({
    graph: graphSchema,
  })
  .strict();

export { postGraphBodySchema, graphSchema };
