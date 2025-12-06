// test/api/nodes.post.test.ts
import { describe, it, expect, vi } from "vitest";

// 1) mock the module with a real mock fn
vi.mock("../../src/app/lib/graph", () => ({
  upsert: vi.fn(async () => ({})), // always resolves, no network
}));

// 2) AFTER mock, import route + upsert
import { POST } from "../../src/app/api/graph/route";
import { upsert } from "../../src/app/lib/graph";

const mockedUpsert = upsert as unknown as vi.Mock;

describe("POST /api/graph", () => {
  it("returns 400 when graph is missing", async () => {
    const req = new Request("http://localhost/api/graph", {
      method: "POST",
      body: JSON.stringify({}), // no graph
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const json = (await res.json());
    expect(json.error).toBe("graph is required");
  });

  it("upserts the graph and calls upsert", async () => {
    const graph = {
      nodes: [{ id: "n1" }],
      links: [{ source: "n1", target: "n1" }],
    };

    const req = new Request("http://localhost/api/graph", {
      method: "POST",
      body: JSON.stringify({ graph }),
    });

    const res = await POST(req);
    expect(res.status).toBe(201);

    const json = (await res.json());
    expect(json).toEqual(graph);

    expect(mockedUpsert).toHaveBeenCalledWith(graph);
  });
});
