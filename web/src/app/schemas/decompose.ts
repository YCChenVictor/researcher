import { z } from "zod";

const decomposeBody = z.object({
  professional: z.string().min(1, "professional is required"),
  topic: z.string().min(1, "topic is required"),
  numberOfSubTopic: z.number().int().min(1, "must be at least 1"),
});

export { decomposeBody };
