import { describe, it, expect, vi, afterEach, type Mock } from "vitest";

vi.mock("../../src/app/server/graph", () => {
  const upsert = vi.fn(async (_path: string, _content: string) => ({
    path: "graph.json",
    sha: "test-sha",
  }));
  const get = vi.fn(async () => ({ nodes: [], links: [] }));

  return { upsert, get };
});

import { GET, POST } from "../../src/app/api/graph/route";
import { upsert, get } from "../../src/app/server/graph";

const mockedUpsert = upsert as unknown as Mock;
const mockedGet = get as unknown as Mock;

afterEach(() => {
  vi.clearAllMocks();
});

describe("GET /api/graph", () => {
  it("returns 200 with graph", async () => {
    mockedGet.mockResolvedValueOnce({
      nodes: [{ key: "n1", name: "Node 1", color: "#ff8800" }],
      links: [],
    });

    const res = await GET();
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json).toEqual({
      graph: {
        nodes: [{ key: "n1", name: "Node 1", color: "#ff8800" }],
        links: [],
      },
    });
  });

  it("returns 500 on error", async () => {
    mockedGet.mockRejectedValueOnce(new Error("boom"));

    const res = await GET();
    expect(res.status).toBe(500);

    const json = await res.json();
    expect(json).toEqual({ error: "Internal server error" });
  });
});

describe("POST /api/graph", () => {
  it("returns 400 when graph is missing", async () => {
    const req = new Request("http://localhost/api/graph", {
      method: "POST",
      body: JSON.stringify({}), // no graph
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const json = await res.json();
    expect(json.error).toBe("graph is required");
  });
  //
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

    const json = await res.json();
    expect(json).toEqual(graph);

    expect(mockedUpsert).toHaveBeenCalledWith(graph);
  });
});
