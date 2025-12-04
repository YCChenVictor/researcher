import { z } from "./zod";
import { registry } from "./registry";
import { decomposeBody } from "../schema/decompose";

const DecomposeResponseSchema = registry.register(
  "DecomposeResponse",
  z.object({
    answer: z.array(z.string()).openapi({
      example: [
        "Mapping and assessing the capacity of New Zealand’s existing tax, ID, and payment systems to support a universal basic income.",
        "Designing a baseline digital architecture to deliver universal basic income using New Zealand’s current government and banking infrastructure.",
        "Developing a privacy-preserving digital infrastructure for universal basic income in New Zealand and comparing it to the baseline design.",
        "Evaluating exclusion risks and digital divide issues in a UBI system built on New Zealand’s existing tax and ID rails.",
        "Analysing cybersecurity and operational resilience requirements for a nationwide UBI payment system in New Zealand.",
        "Proposing a governance and institutional framework to manage and oversee a digital UBI infrastructure in New Zealand.",
      ],
    }),
  }),
);

registry.registerPath({
  method: "post",
  path: "/decompose",
  tags: ["Decompose"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: decomposeBody,
        },
      },
    },
  },
  responses: {
    200: {
      description: "LLM decompose result",
      content: {
        "application/json": {
          schema: DecomposeResponseSchema,
        },
      },
    },
  },
});
