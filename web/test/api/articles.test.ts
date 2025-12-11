import { describe, it, expect, vi } from "vitest";
import { NextRequest } from "next/server";
import { handlePostArticle } from "../../src/app/api/articles/route";

const makeRequest = (body: unknown) =>
  new NextRequest("http://localhost/api/article", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "content-type": "application/json" },
  });

describe("handlePostArticle", () => {
  it("returns 201 and upsert result on success", async () => {
    const mockResult = { path: "posts/test.md", sha: "123" };
    const upsert = vi.fn().mockResolvedValue(mockResult);

    const req = makeRequest({
      path: "posts/test.md",
      content: "# Hello",
    });

    const res = await handlePostArticle(req, { upsert });
    expect(res.status).toBe(201);

    const json = await res.json();
    expect(json).toEqual({ ok: true, file: mockResult });
    expect(upsert).toHaveBeenCalledWith("posts/test.md", "# Hello");
  });

  it("returns 400 on Zod validation error", async () => {
    const upsert = vi.fn(); // should not be called

    const req = makeRequest({}); // invalid body

    const res = await handlePostArticle(req, { upsert });
    expect(res.status).toBe(400);

    const json = await res.json();
    expect(json.error).toBe("Invalid body");
    expect(Array.isArray(json.issues)).toBe(true);
    expect(upsert).not.toHaveBeenCalled();
  });

  it("returns 500 on unexpected error", async () => {
    const upsert = vi.fn().mockRejectedValue(new Error("boom"));
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const req = makeRequest({
      path: "posts/test.md",
      content: "# Hello",
    });

    const res = await handlePostArticle(req, { upsert });
    expect(res.status).toBe(500);

    const json = await res.json();
    expect(json).toEqual({ error: "Internal server error" });

    expect(upsert).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
