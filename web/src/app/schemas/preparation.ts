import { z } from "zod";

const preparationBody = z.object({
  startId: z.string().min(1, "startId is required"),
  endId: z.string().min(1, "endId is required"),
});

export { preparationBody };
