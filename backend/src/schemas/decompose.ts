import { z } from "../swagger/zod";

const decomposeBody = z.object({
  professional: z.string(),
  numberOfSubTopic: z.number(),
  topic: z.string().openapi({
    example:
      "Designing and evaluating digital infrastructure to deliver a universal basic income using existing tax and ID systems in New Zealand.",
  }),
});

export { decomposeBody };
