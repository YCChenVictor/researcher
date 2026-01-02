import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import {
  handlePostArticle,
  handlePutArticle,
  handleDeleteArticle,
} from "../../src/app/api/articles/route";

vi.mock("../../src/app/server/article", () => ({
  upsert: vi.fn(),
  destroy: vi.fn(),
}));

import { upsert, destroy } from "../../src/app/server/article";

describe("handlePostArticle", () => {
  it("returns 201 and upsert result on success", async () => {
    const upsertMock = vi.mocked(upsert);
    upsertMock.mockResolvedValueOnce({ path: "posts/test.md", sha: "123" });

    const req = new NextRequest("http://localhost/api/article", {
      method: "POST",
      body: JSON.stringify({ path: "posts/test.md", content: "# Hello" }),
      headers: { "content-type": "application/json" },
    });

    const res = await handlePostArticle(req);
    expect(res.status).toBe(201);

    expect(upsertMock).toHaveBeenCalledWith("posts/test.md", "# Hello");
    await expect(res.json()).resolves.toEqual({
      ok: true,
      file: { path: "posts/test.md", sha: "123" },
    });
  });
});

describe("handlePutArticle", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns 200 + ok=true on success", async () => {
    vi.mocked(upsert).mockResolvedValueOnce({
      path: "posts/test.md",
      sha: "abc",
    });

    const req = new NextRequest("http://localhost/api/article", {
      method: "PUT",
      body: JSON.stringify({ path: "posts/test.md", content: "# Hello" }),
      headers: { "content-type": "application/json" },
    });

    const res = await handlePutArticle(req);

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({
      ok: true,
      file: { path: "posts/test.md", sha: "abc" },
    });

    expect(upsert).toHaveBeenCalledWith("posts/test.md", "# Hello");
  });
});
//
describe("handleDeleteArticle", () => {
  it("returns 200 + ok=true on success", async () => {
    vi.mocked(destroy).mockResolvedValueOnce({
      path: "articles/a",
      sha: "123",
    });

    const req = new NextRequest("http://localhost:3000/api/articles", {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ path: "articles/a.md" }),
    });

    const res = await handleDeleteArticle(req);

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({
      ok: true,
      deleted: { path: "articles/a", sha: "123" },
    });

    expect(destroy).toHaveBeenCalledWith("a"); // because you strip `.md`
  });
});
