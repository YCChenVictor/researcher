import { describe, it, expect, vi, beforeEach } from "vitest";

import { get, upsert } from "../../src/app/server/article";
import * as github from "../../src/app/server/github";

type PutResp = { content?: { path?: string } | null; commit: { sha: string } };

const asGetFileRet = (x: { sha?: string; content?: string } | null) =>
  x as unknown as Awaited<ReturnType<typeof github.get>>;

const asPutRet = (x: PutResp) =>
  x as unknown as Awaited<ReturnType<typeof github.put>>;

describe("upsert", () => {
  const getFileSpy = vi.spyOn(github, "get");
  const putSpy = vi.spyOn(github, "put");

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("creates when no sha", async () => {
    getFileSpy.mockResolvedValueOnce(asGetFileRet(null));
    putSpy.mockResolvedValueOnce(
      asPutRet({
        content: { path: "articles/a.md" },
        commit: { sha: "newsha" },
      }),
    );

    const res = await upsert("articles/a.md", "# hello");

    expect(putSpy).toHaveBeenCalledWith({
      filePath: "articles/a.md",
      content: "# hello",
      message: "Create article",
    });
    expect(res).toEqual({ path: "articles/a.md", sha: "newsha" });
  });

  it("updates when sha exists", async () => {
    getFileSpy.mockResolvedValueOnce(asGetFileRet({ sha: "oldsha" }));
    putSpy.mockResolvedValueOnce(
      asPutRet({
        content: { path: "articles/a.md" },
        commit: { sha: "newsha" },
      }),
    );

    const res = await upsert("articles/a.md", "# updated");

    expect(putSpy).toHaveBeenCalledWith({
      filePath: "articles/a.md",
      content: "# updated",
      message: "Update article",
      sha: "oldsha",
    });
    expect(res).toEqual({ path: "articles/a.md", sha: "newsha" });
  });
});

describe("get", () => {
  const getFileSpy = vi.spyOn(github, "get");

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("returns null when file not found", async () => {
    getFileSpy.mockResolvedValueOnce(asGetFileRet(null));

    await expect(get("a")).resolves.toBeNull();
    expect(getFileSpy).toHaveBeenCalledWith("articles/a.md");
  });

  it("returns empty string when content is missing", async () => {
    getFileSpy.mockResolvedValueOnce(asGetFileRet({}));

    await expect(get("a.md")).resolves.toBe("");
  });

  it("returns content when present", async () => {
    getFileSpy.mockResolvedValueOnce(asGetFileRet({ content: "# hi" }));

    await expect(get("a.md")).resolves.toBe("# hi");
  });
});
