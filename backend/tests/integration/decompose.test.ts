import request from "supertest";
import { describe, it, expect, vi } from "vitest";

import app from "../../src/app";
import * as llmCall from "../../src/services/llm/call";

describe("POST /decompose", () => {
  it("should response decomposed topics", async () => {
    const mockAnswer = {
      topics: [
        {
          title:
            "Architecting a digital payments infrastructure for UBI delivery using New Zealand’s existing tax collection systems",
        },
        {
          title:
            "Integrating national ID and authentication systems to securely identify and enroll UBI recipients in New Zealand",
        },
        {
          title:
            "Evaluating administrative efficiency and cost-effectiveness of UBI delivery via existing tax and ID infrastructure in New Zealand",
        },
        {
          title:
            "Assessing equity, inclusion, and error risks (exclusion, duplication, fraud) in a UBI system built on current tax and ID databases",
        },
        {
          title:
            "Designing governance, data protection, and interoperability standards for New Zealand’s UBI digital infrastructure",
        },
      ],
    };
    const callSpy = vi.spyOn(llmCall, "call");
    callSpy.mockResolvedValue(JSON.stringify(mockAnswer));

    const response = await request(app).post("/decompose").send({
      numberOfSubTopic: 5,
      professional: "economist",
      topic:
        "Designing and evaluating digital infrastructure to deliver a universal basic income using existing tax and ID systems in New Zealand.",
    });

    expect(response.status).toBe(200);
  });
});
