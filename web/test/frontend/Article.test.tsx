import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

import Article from "../../src/components/Article";
import * as articleClient from "../../src/components/client/article";

vi.mock("../client/article", () => ({ get: vi.fn() }));

// Avoid testing Sidebar internals here
vi.mock("../ArticleComponents/SidebarLayout", () => ({ default: () => null }));
vi.mock("../ArticleComponents/ScrollToTopButton", () => ({
  default: () => null,
}));

describe("Article", () => {
  const getSpy = vi.spyOn(articleClient, "get");

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders and displays markdown", async () => {
    getSpy.mockResolvedValueOnce({
      path: "x",
      content: "## Intro\nHello",
    });

    render(<Article filePath="content/articles/a.md" />);

    expect(await screen.findByText("Intro")).toBeInTheDocument();
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});
