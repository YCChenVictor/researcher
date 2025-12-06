import { z } from "../swagger/zod";

const helloWorldResponseSchema = z.object({
  message: z.string(),
});

export { helloWorldResponseSchema };
