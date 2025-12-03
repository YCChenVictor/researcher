import React from "react";
import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
} from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import ForceGraph from "../src/components/ForceGraph";

// Mock the JSON import used in the component
vi.mock("../node-structure.json", () => ({
  default: {
    nodes: [],
    links: [],
  },
}));

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

    const svg = await screen.findByTestId("force-graph-svg");

    fireEvent.click(svg, {
      clientX: 400,
      clientY: 300,
    });

    const circles = container.querySelectorAll("circle");
    expect(circles.length).toBeGreaterThan(0);
  });

  it("creates a link when clicking one node then another", async () => {
    const { container } = render(<ForceGraph />);

    const svg = await screen.findByTestId("force-graph-svg");

    // first node
    promptSpy.mockReturnValue("Node A");
    fireEvent.click(svg, { clientX: 200, clientY: 200 });

    // second node
    promptSpy.mockReturnValue("Node B");
    fireEvent.click(svg, { clientX: 400, clientY: 200 });

    const circles = container.querySelectorAll("circle");
    expect(circles.length).toBe(2);

    const [nodeA, nodeB] = circles;

    fireEvent.click(nodeA);
    fireEvent.click(nodeB);

    const lines = container.querySelectorAll("line");
    expect(lines.length).toBe(1);
  });
});