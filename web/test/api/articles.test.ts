import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import {
  handlePostArticle,
  handlePutArticle,
} from "../../src/app/api/articles/route";

vi.mock("../../src/app/server/article", () => ({
  upsert: vi.fn(),
}));

import { upsert } from "../../src/app/server/article";

// import { articleBody } from "@/app/schemas/articles";

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
