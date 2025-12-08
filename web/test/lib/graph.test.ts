// test/lib/graph.upsert.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  upsert,
  get,
  githubClient,
  type GraphPayload,
} from "../../src/app/lib/graph";

const graph: GraphPayload = {
  nodes: [{ id: "n1" }],
  links: [{ source: "n1", target: "n1" }],
};

let getContentSpy: ReturnType<typeof vi.spyOn>;
let createOrUpdateSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  // reset spies each test
  getContentSpy = vi.spyOn(githubClient.rest.repos, "getContent").mockReset();
  createOrUpdateSpy = vi
    .spyOn(githubClient.rest.repos, "createOrUpdateFileContents")
    .mockReset();
});

describe("upsert graph", () => {
  it("creates graph.json when file does not exist (404)", async () => {
    getContentSpy.mockRejectedValueOnce({ status: 404 });
    createOrUpdateSpy.mockResolvedValueOnce({ data: { ok: true } });

    const result = await upsert(graph);

    expect(result).toEqual({ ok: true });

    expect(createOrUpdateSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        path: "graph.json",
        message: "Create graph",
      }),
    );
    const args = createOrUpdateSpy.mock.calls[0][0];
    expect(args.sha).toBeUndefined();
  });

  it("updates graph.json when file exists", async () => {
    getContentSpy.mockResolvedValueOnce({
      data: { sha: "abc123", content: "old" },
    });
    createOrUpdateSpy.mockResolvedValueOnce({ data: { ok: true } });

    const result = await upsert(graph);

    expect(result).toEqual({ ok: true });

    expect(createOrUpdateSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        path: "graph.json",
        message: "Update graph",
        sha: "abc123",
      }),
    );
  });
});

describe("get graph", () => {
  it("returns parsed graph when file exists with content", async () => {
    const encoded = Buffer.from(JSON.stringify(graph), "utf8").toString(
      "base64",
    );

    getContentSpy.mockResolvedValueOnce({
      data: { content: encoded },
    });

    const result = await get();

    expect(getContentSpy).toHaveBeenCalled();
    expect(result).toEqual(graph);
  });

  it("returns empty graph when data is an array", async () => {
    getContentSpy.mockResolvedValueOnce({
      data: [],
    });

    const result = await get();

    expect(result).toEqual({ nodes: [], links: [] });
  });

  it("returns empty graph when content field is missing", async () => {
    getContentSpy.mockResolvedValueOnce({
      data: { something: "else" },
    });

    const result = await get();

    expect(result).toEqual({ nodes: [], links: [] });
  });

  it("returns empty graph when getContent throws", async () => {
    getContentSpy.mockRejectedValueOnce(new Error("boom"));

    const result = await get();

    expect(result).toEqual({ nodes: [], links: [] });
  });
});
