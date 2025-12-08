import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, fireEvent, within, waitFor } from "@testing-library/react";

import * as graphFeatures from "../../src/app/features/graph";
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
  let persistSpy: ReturnType<typeof vi.spyOn>;
  let decomposeSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    promptSpy = vi.spyOn(window, "prompt");
    persistSpy = vi.spyOn(graphFeatures, "persistGraph");
    decomposeSpy = vi
      .spyOn(graphFeatures, "decompose")
      .mockResolvedValue(["Child 1", "Child 2"]);
  });

  afterEach(() => {
    promptSpy.mockRestore();
    persistSpy.mockRestore();
    decomposeSpy.mockRestore();
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

  it("shows the context menu when right-clicking a node", async () => {
    const { container } = render(<ForceGraph />);

    const svg = await within(container).findByTestId("force-graph-svg");

    // create one node
    fireEvent.click(svg, { clientX: 200, clientY: 200 });

    await waitFor(() => {
      expect(container.querySelectorAll("circle").length).toBeGreaterThan(0);
    });

    const circle = container.querySelector("circle") as SVGCircleElement;

    fireEvent.contextMenu(circle);

    const decomposeButton = await within(container).findByRole("button", {
      name: /decompose/i,
    });

    expect(decomposeButton).toBeTruthy(); // <- instead of toBeInTheDocument
  });

  it("uses connectChildren when clicking Decompose", async () => {
    const { container } = render(<ForceGraph />);

    const svg = await within(container).findByTestId("force-graph-svg");

    // baseline before we add anything
    const initialCircleCount = container.querySelectorAll("circle").length;
    const initialLineCount = container.querySelectorAll("line").length;

    // create one new node via background click
    promptSpy.mockReturnValue("Root node");
    fireEvent.click(svg, { clientX: 200, clientY: 200 });

    await waitFor(() => {
      expect(container.querySelectorAll("circle").length).toBe(
        initialCircleCount + 1,
      );
    });

    const circlesAfterRoot = container.querySelectorAll("circle");
    // the newly created node should be appended after existing ones
    const rootCircle =
      circlesAfterRoot[initialCircleCount] ?? circlesAfterRoot[0];

    // open context menu on that node
    fireEvent.contextMenu(rootCircle);

    const decomposeButton = await within(container).findByRole("button", {
      name: /decompose/i,
    });
    fireEvent.click(decomposeButton);

    // decompose called once
    await waitFor(() => {
      expect(decomposeSpy).toHaveBeenCalledTimes(1);
    });

    // connectChildren ran: +2 children, +2 links
    await waitFor(() => {
      const circleCount = container.querySelectorAll("circle").length;
      const lineCount = container.querySelectorAll("line").length;

      expect(circleCount).toBe(initialCircleCount + 3); // +1 root +2 children
      expect(lineCount).toBe(initialLineCount + 2);
    });

    // last persistGraph call should have updated nodes/links
    const lastCall = persistSpy.mock.calls.at(-1)!;
    const [nodesArg, linksArg] = lastCall;

    expect((nodesArg as graphFeatures.Node[]).length).toBe(
      initialCircleCount + 3,
    );
    expect((linksArg as graphFeatures.Link[]).length).toBe(
      initialLineCount + 2,
    );
  });
});
