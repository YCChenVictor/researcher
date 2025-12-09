import { z } from "zod";

const decomposeBody = z.object({
  topic: z.string().min(1, "topic is required"),
  numberOfSubTopic: z.number().int().min(1, "must be at least 1"),
});

export { decomposeBody };
