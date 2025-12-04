import { z as baseZod } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(baseZod);

export const z = baseZod;

export const HelloWorldResponseSchema = z
  .object({
    message: z.string().openapi({ example: "hello world" }),
  })
  .openapi("HelloWorldResponse");
