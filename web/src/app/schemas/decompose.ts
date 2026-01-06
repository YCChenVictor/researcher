import { z } from "zod";

const decomposeBody = z.object({
  startId: z.string().min(1, "startId is required"),
  endId: z.string().min(1, "endId is required"),
  numberOfSubTopic: z.number().int().min(1, "must be at least 1"),
});

export { decomposeBody };
