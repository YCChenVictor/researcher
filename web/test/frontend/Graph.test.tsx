import { it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, fireEvent, within, waitFor } from "@testing-library/react";

import { Node, Link } from "../../src/types/graph";
import * as graphFeatures from "../../src/components/client/graph";
import ForceGraph from "../../src/components/Graph";

const hooks = vi.hoisted(() => ({
  stopSpy: null as ReturnType<typeof vi.spyOn> | null,
}));

// IMPORTANT: mock the SAME module path ForceGraph imports from
vi.mock("../../src/components/client/graph/graph", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("../../src/components/client/graph")>();

  return {
    ...actual,
    createSimulation: (nodes: Node[], links: Link[], w: number, h: number) => {
      const sim = actual.createSimulation(nodes, links, w, h);
      hooks.stopSpy = vi.spyOn(sim, "stop");
      return sim;
    },
  };
});

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

  const circlesBefore = container.querySelectorAll("circle").length;
  const linksBefore = container.querySelectorAll("g.link-pair").length; // or "line.link"

  // first node
  promptSpy.mockReturnValue("Node A");
  fireEvent.click(svg, { clientX: 200, clientY: 200 });

  // second node
  promptSpy.mockReturnValue("Node B");
  fireEvent.click(svg, { clientX: 400, clientY: 200 });

  await waitFor(() => {
    expect(container.querySelectorAll("circle").length).toBe(circlesBefore + 2);
  });

  const circles = container.querySelectorAll("circle");
  const nodeA = circles[circles.length - 2]!;
  const nodeB = circles[circles.length - 1]!;

  fireEvent.click(nodeA);
  fireEvent.click(nodeB);

  await waitFor(() => {
    expect(container.querySelectorAll("g.link-pair").length).toBe(
      linksBefore + 1,
    );
  });
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

  expect(decomposeButton).toBeTruthy();
});

it("uses connectChildren when clicking Decompose", async () => {
  const { container } = render(<ForceGraph />);
  const svg = await within(container).findByTestId("force-graph-svg");

  const circlesBefore = container.querySelectorAll("circle").length;
  const visibleLinksBefore = container.querySelectorAll("line.link").length;

  // create root node
  promptSpy.mockReturnValue("Root node");
  fireEvent.click(svg, { clientX: 200, clientY: 200 });

  await waitFor(() => {
    expect(container.querySelectorAll("circle").length).toBe(circlesBefore + 1);
  });

  // pick the newly-added circle
  const circlesAfterRoot = container.querySelectorAll("circle");
  const rootCircle = circlesAfterRoot[circlesAfterRoot.length - 1]!;

  fireEvent.contextMenu(rootCircle);

  // baseline persist right BEFORE decompose (if any)
  const lastBeforeDecompose = persistSpy.mock.calls.at(-1) as
    | [Node[], Link[]]
    | undefined;
  const [nodesBefore, linksBefore] = lastBeforeDecompose ?? [[], []];

  const decomposeButton = await within(container).findByRole("button", {
    name: /decompose/i,
  });
  fireEvent.click(decomposeButton);

  await waitFor(() => expect(decomposeSpy).toHaveBeenCalledTimes(1));

  // DOM: +2 children, +2 logical links
  await waitFor(() => {
    expect(container.querySelectorAll("circle").length).toBe(circlesBefore + 3);
    expect(container.querySelectorAll("line.link").length).toBe(
      visibleLinksBefore + 2,
    );
  });

  // persist: last call should include the new nodes/links
  await waitFor(() => expect(persistSpy).toHaveBeenCalled());

  const [nodesArg, linksArg] = persistSpy.mock.calls.at(-1)! as [
    Node[],
    Link[],
  ];
  expect(nodesArg.length).toBe(nodesBefore.length + 2); // decompose adds 2 children
  expect(linksArg.length).toBe(linksBefore.length + 2); // adds 2 links
});

it("clicking background clears selectedSource (no add node)", async () => {
  const { container } = render(<ForceGraph />);

  const svg = container.querySelector(
    'svg[data-testid="force-graph-svg"]',
  ) as SVGSVGElement;
  expect(svg).toBeTruthy();

  const circle = await waitFor(() => {
    const c = svg.querySelector("circle") as SVGCircleElement | null;
    expect(c).toBeTruthy();
    return c!;
  });

  fireEvent.click(circle);

  await waitFor(() => {
    expect(circle).toHaveAttribute("stroke", "#000");
    expect(circle).toHaveAttribute("stroke-width", "2");
  });

  const persistCallsBefore = persistSpy.mock.calls.length;

  fireEvent.click(svg); // background click => clears selection + returns

  await waitFor(() => {
    expect(circle).not.toHaveAttribute("stroke");
    expect(circle).toHaveAttribute("stroke-width", "0");
  });

  expect(persistSpy).toHaveBeenCalledTimes(persistCallsBefore);
});
