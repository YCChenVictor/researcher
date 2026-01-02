import { z } from "zod";

const articleBody = z.object({
  path: z.string(),
  content: z.string(),
});

const getQuerySchema = z.object({
  key: z.string().min(1),
});

const deleteBodySchema = z.object({
  path: z.string().min(1),
});

export { articleBody, getQuerySchema, deleteBodySchema };
