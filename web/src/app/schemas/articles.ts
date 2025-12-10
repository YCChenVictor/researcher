import { z } from "zod";

const articleBody = z.object({
  path: z.string(),
  content: z.string(),
});

export { articleBody };
