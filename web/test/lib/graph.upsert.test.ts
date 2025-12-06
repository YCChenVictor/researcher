// test/lib/graph.upsert.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { upsert, githubClient, type GraphPayload } from "../../src/app/lib/graph";

const graph: GraphPayload = {
  nodes: [{ id: "n1" }],
  links: [{ source: "n1", target: "n1" }],
};

let getContentSpy: ReturnType<typeof vi.spyOn>;
let createOrUpdateSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  // reset spies each test
  getContentSpy = vi
    .spyOn(githubClient.rest.repos, "getContent")
    .mockReset();
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
        path: "nodes/graph.json",
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
        path: "nodes/graph.json",
        message: "Update graph",
        sha: "abc123",
      }),
    );
  });
});
