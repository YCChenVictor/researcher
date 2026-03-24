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
  it("returns 400 for invalid graph schema", async () => {
    const req = new Request("http://localhost/api/graph", {
      method: "POST",
      body: JSON.stringify({
        graph: {
          nodes: [
            {
              key: "n1",
              name: "Node 1",
              color: "#ff8800",
              x: -20.926185307120086,
              y: -90.77368045712083,
            },
          ],
          links: [{ source: "n1", target: "n2" }],
        },
      }),
    });

    const res = await POST(req);

    expect(res.status).toBe(400);
    expect(await res.json()).toMatchObject({
      error: "Invalid graph payload",
    });
    expect(mockedUpsert).not.toHaveBeenCalled();
  });

  it("returns 400 for invalid graph schema", async () => {
    const req = new Request("http://localhost/api/graph", {
      method: "POST",
      body: JSON.stringify({
        graph: {
          nodes: [
            {
              key: "n1",
              name: "Node 1",
            },
            {
              key: "n2",
              name: "Node 2",
            },
            {
              key: "5312bd1a-cfe7-4e4e-9d58-f4a1a12a30fb",
              name: "Root node",
            },
            {
              key: "b3af94df-a2dd-40d2-8e65-67b243a51d9a",
              name: "Child 1",
            },
            {
              key: "c43203b5-333a-4f09-9adf-a508f707320e",
              name: "Child 2",
            },
          ],
          links: [
            { source: "n1", target: "n2" },
            {
              source: "5312bd1a-cfe7-4e4e-9d58-f4a1a12a30fb",
              target: "b3af94df-a2dd-40d2-8e65-67b243a51d9a",
            },
            {
              source: "5312bd1a-cfe7-4e4e-9d58-f4a1a12a30fb",
              target: "c43203b5-333a-4f09-9adf-a508f707320e",
            },
          ],
        },
      }),
    });

    const res = await POST(req);

    expect(res.status).toBe(201);
  });
});
