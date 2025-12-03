import { z } from "../swagger/zod";

const decomposeBody = z.object({
  topic: z.string(),
});

export { decomposeBody };
