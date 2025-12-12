import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../src/app/server/githubClient", () => ({
  githubClient: {
    rest: {
      repos: {
        getContent: vi.fn(),
      },
    },
  },
}));

import { githubClient } from "../../src/app/server/githubClient";
import { getFile } from "../../src/app/server/github";

const getContentMock = githubClient.rest.repos
  .getContent as unknown as ReturnType<typeof vi.fn>;

describe("getFile", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns decoded content when encoding is base64", async () => {
    getContentMock.mockResolvedValue({
      data: {
        content: Buffer.from("hello", "utf8").toString("base64"),
        encoding: "base64",
        sha: "sha123",
      },
    });

    await expect(getFile("articles/a.md")).resolves.toEqual({
      content: "hello",
      sha: "sha123",
    });

    expect(getContentMock).toHaveBeenCalledWith(
      expect.objectContaining({
        owner: "dummy-owner",
        repo: "dummy-repo",
        ref: "main",
        path: "articles/a.md",
      }),
    );
  });
});
