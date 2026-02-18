import { z } from "zod";

const routeDecomposeBody = z.object({
  mode: z.literal("route"),
  startId: z.string().min(1, "startId is required"),
  endId: z.string().min(1, "endId is required"),
});

const singleNodeDecomposeBody = z.object({
  mode: z.literal("single"),
  topic: z.string(),
});

const decomposeBody = z.union([routeDecomposeBody, singleNodeDecomposeBody]);

type DecomposeBody = z.infer<typeof decomposeBody>;

export { decomposeBody };
export type { DecomposeBody };
