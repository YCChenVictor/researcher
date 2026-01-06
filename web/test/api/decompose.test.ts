import { describe, it, expect, vi } from "vitest";
import { NextRequest } from "next/server";

const response = {
  topics: [
    "Coalition Incentives And Bargains",
    "Collective Action Coordination Costs",
    "Institutional Trust Coalition Stability",
  ],
};

vi.mock("openai", () => {
  class OpenAIMock {
    chat = {
      completions: {
        create: vi.fn().mockResolvedValue({
          choices: [{ message: { content: JSON.stringify(response) } }],
        }),
      },
    };
    constructor(_: { apiKey: string }) {}
  }
  return { default: OpenAIMock };
});

vi.mock("../../src/app/server/graph", () => {
  const get = vi.fn(async () => ({
    nodes: [
      {
        key: "72982fdf-03dd-4cad-869a-7f3704283f70",
        name: "Why there is no UBI",
        x: 321.8379111773541,
        y: 290.42725219450386,
      },
      {
        key: "235f3e06-43c6-475a-987f-dd1cbdabca32",
        name: "Fiscal Cost And Tax Politics",
        x: 336.01352382306794,
        y: 192.95487228331444,
      },
      {
        key: "bd0422db-a2da-4ef7-ad2e-a80fd7ff4c0f",
        name: "Labor Markets And Incentives",
        x: 299.3791739197092,
        y: 385.40427549852024,
      },
      {
        key: "a8f7fc83-5c4c-4ac2-811d-88e4078f93d1",
        name: "Institutions Trust And Coalition",
        x: 1075.0955063084057,
        y: 480.6495701359739,
      },
      {
        key: "bc2371f1-28e1-48e1-a52d-09ce3cdec5a7",
        name: "Institutional Trust Foundations",
        x: 1068.1951996044445,
        y: 379.8066622339008,
      },
      {
        key: "120a84dd-5f99-4725-81f9-564016e27c34",
        name: "Coalition Formation Mechanisms",
        x: 1017.4663163439516,
        y: 563.5873722506543,
      },
      {
        key: "e2d5b2e1-0ab5-41cc-9aae-dc204e1cbf63",
        name: "Trust-Coalition Feedback Dynamics",
        x: 1173.983638382267,
        y: 503.6580447448688,
      },
    ],
    links: [
      {
        source: "72982fdf-03dd-4cad-869a-7f3704283f70",
        target: "235f3e06-43c6-475a-987f-dd1cbdabca32",
      },
      {
        source: "a8f7fc83-5c4c-4ac2-811d-88e4078f93d1",
        target: "bc2371f1-28e1-48e1-a52d-09ce3cdec5a7",
      },
      {
        source: "a8f7fc83-5c4c-4ac2-811d-88e4078f93d1",
        target: "120a84dd-5f99-4725-81f9-564016e27c34",
      },
      {
        source: "a8f7fc83-5c4c-4ac2-811d-88e4078f93d1",
        target: "e2d5b2e1-0ab5-41cc-9aae-dc204e1cbf63",
      },
      {
        source: "72982fdf-03dd-4cad-869a-7f3704283f70",
        target: "bd0422db-a2da-4ef7-ad2e-a80fd7ff4c0f",
      },
      {
        source: "72982fdf-03dd-4cad-869a-7f3704283f70",
        target: "a8f7fc83-5c4c-4ac2-811d-88e4078f93d1",
      },
    ],
  }));

  return { get };
});

import { POST } from "../../src/app/api/decompose/route";

describe("POST /api/decompose", () => {
  it("returns 200 with graph", async () => {
    const req = new NextRequest("http://localhost/api/decompose", {
      method: "POST",
      body: JSON.stringify({
        startId: "72982fdf-03dd-4cad-869a-7f3704283f70",
        endId: "120a84dd-5f99-4725-81f9-564016e27c34",
        numberOfSubTopic: 3,
      }),
    });
    const res = await POST(req);
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json).toEqual({ answer: JSON.stringify(response) });
  });
});
