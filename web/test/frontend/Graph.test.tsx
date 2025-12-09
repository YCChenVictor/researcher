import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, fireEvent, within } from "@testing-library/react";
import ForceGraph from "../../src/app/Graph";

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => ({
      ok: true,
      json: async () => ({
        graph: {
          nodes: [
            { key: "n1", name: "Node 1", color: "#ff8800" },
            { key: "n2", name: "Node 2", color: "#ff8800" },
          ],
          links: [{ source: "n1", target: "n2" }],
        },
      }),
    })) as unknown as typeof fetch,
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("ForceGraph", () => {
  let promptSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    promptSpy = vi.spyOn(window, "prompt");
  });

  afterEach(() => {
    promptSpy.mockRestore();
    vi.clearAllMocks();
  });

  it("creates a node when clicking on the background", async () => {
    promptSpy.mockReturnValue("My Topic");

    const { container } = render(<ForceGraph />);

    const svg = await within(container).findByTestId("force-graph-svg");

    fireEvent.click(svg, {
      clientX: 400,
      clientY: 300,
    });

    const circles = container.querySelectorAll("circle");
    expect(circles.length).toBeGreaterThan(0);
  });

  it("creates a link when clicking one node then another", async () => {
    const { container } = render(<ForceGraph />);

    const svg = await within(container).findByTestId("force-graph-svg");

    // first node
    promptSpy.mockReturnValue("Node A");
    fireEvent.click(svg, { clientX: 200, clientY: 200 });

    // second node
    promptSpy.mockReturnValue("Node B");
    fireEvent.click(svg, { clientX: 400, clientY: 200 });

    const circles = container.querySelectorAll("circle");
    expect(circles.length).toBe(4);

    const [nodeA, nodeB] = circles;

    fireEvent.click(nodeA);
    fireEvent.click(nodeB);

    const lines = container.querySelectorAll("line");
    expect(lines.length).toBe(2);
  });
});
