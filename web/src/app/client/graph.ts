import type { Simulation } from "d3";
import * as d3 from "d3";

import type { Node, Link } from "../types/graph";

export type NodeClickDeps = {
  setSelectedSource: (node: Node | null) => void;
  addLink: (source: Node, target: Node) => void;
  openWindow?: (url: string) => void;
};

export type ShowContextMenuDeps = {
  zoomG: d3.Selection<SVGGElement, unknown, null, undefined>;
  removeContextMenu: () => void;
  log?: (msg: string, node: Node) => void;
};

const handleNodeClickLogic = (
  event: { stopPropagation: () => void; metaKey?: boolean; ctrlKey?: boolean },
  d: Node,
  selectedSource: Node | null,
  deps: NodeClickDeps,
) => {
  const {
    setSelectedSource,
    addLink,
    openWindow = (url) => window.open(url, "_blank"),
  } = deps;

  event.stopPropagation();

  if (event.metaKey || event.ctrlKey) {
    openWindow(d.key);
    return;
  }

  if (selectedSource === d) {
    setSelectedSource(null);
    return;
  }

  if (!selectedSource) {
    setSelectedSource(d);
    return;
  }

  addLink(selectedSource, d);
  setSelectedSource(null);
};

const fetchGraph = async (): Promise<{
  nodes: Node[];
  links: Link[];
}> => {
  const res = await fetch("/api/graph");
  if (!res.ok) {
    throw new Error(`Failed to load graph: ${res.status}`);
  }

  const { graph } = (await res.json()) as GraphApiResponse;

  if (!graph) {
    return { nodes: [], links: [] };
  }

  return {
    nodes: graph.nodes,
    links: graph.links.map((l) => ({
      source: l.source,
      target: l.target,
    })),
  };
};

const handleAddNodeAt = (
  x: number,
  y: number,
  deps: {
    nodes: Node[];
    links: Link[];
    setNodes: (next: Node[]) => void;
    simulation: Simulation<Node, Link>;
    updateNodes: () => void;
  },
) => {
  const { nodes, setNodes, simulation, updateNodes } = deps;

  const name = window.prompt("Topic?");
  if (!name) return;

  const newNode: Node = {
    key: `custom-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name,
    color: "#ff8800",
    x,
    y,
  };

  const nextNodes = [...nodes, newNode];

  setNodes(nextNodes);
  simulation.nodes(nextNodes);
  simulation.alpha(1).restart();
  updateNodes();
};

const buildChildren = (
  parent: Node,
  titles: string[],
  radius = 80,
): { newNodes: Node[]; newLinks: Link[] } => {
  const newNodes: Node[] = titles.map((title, i) => {
    const angle = (2 * Math.PI * i) / titles.length;
    const key = crypto.randomUUID();

    return {
      ...parent,
      key,
      name: title,
      x: (parent.x ?? 0) + Math.cos(angle) * radius,
      y: (parent.y ?? 0) + Math.sin(angle) * radius,
      vx: 0,
      vy: 0,
    };
  });

  const newLinks: Link[] = newNodes.map((child) => ({
    source: parent.key,
    target: child.key,
  }));

  return { newNodes, newLinks };
};

const decompose: DecomposeFn = async (nodeData) => {
  const res = await fetch("/api/decompose", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      topic: nodeData.name,
      numberOfSubTopic: 5,
    }),
  });

  if (!res.ok) {
    throw new Error(`Decompose failed: ${res.status}`);
  }

  const json = (await res.json()) as DecomposeResponse;
  return json.answer.topics.map((t) => t.title);
};
const serializeLinks = (links: Link[]) =>
  links.map((l) => ({
    source: typeof l.source === "string" ? l.source : l.source.key,
    target: typeof l.target === "string" ? l.target : l.target.key,
  }));

const serializeNodes = (nodes: Node[]) =>
  nodes.map(({ vx: _vx, vy: _vy, index: _index, ...rest }) => rest);

const persistGraph = (nodes: Node[], links: Link[]) => {
  const graph = {
    nodes: serializeNodes(nodes),
    links: serializeLinks(links),
  };

  void fetch("/api/graph", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ graph }),
  }).catch((err) => console.error("Failed to persist graph", err));
};

// D3 / SVG helpers
const setupSvg = (
  svgEl: SVGSVGElement,
  width: number,
  height: number,
): GraphLayers => {
  const svg = d3
    .select<SVGSVGElement, unknown>(svgEl)
    .attr("width", width)
    .attr("height", height);

  svg.selectAll("*").remove();

  const zoomG = svg.append("g");
  const linkGroup = zoomG.append("g");
  const nodeGroup = zoomG.append("g");
  const labelGroup = zoomG.append("g");

  svg
    .append("defs")
    .append("marker")
    .attr("id", "arrow")
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 15)
    .attr("refY", 0)
    .attr("markerWidth", 10)
    .attr("markerHeight", 10)
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M0,-5L10,0L0,5")
    .attr("fill", "#999");

  svg.call(
    d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 10])
      .on("zoom", (event) => {
        zoomG.attr("transform", event.transform);
      }),
  );

  return { svg, zoomG, linkGroup, nodeGroup, labelGroup };
};

const renderLinks = (
  linkGroup: d3.Selection<SVGGElement, unknown, null, undefined>,
  links: Link[],
) =>
  linkGroup
    .selectAll<SVGLineElement, Link>("line")
    .data(links)
    .join("line")
    .attr("stroke", "#999")
    .attr("marker-end", "url(#arrow)");

const createSimulation = (
  nodes: Node[],
  links: Link[],
  width: number,
  height: number,
) =>
  d3
    .forceSimulation<Node>(nodes)
    .force(
      "link",
      d3
        .forceLink<Node, Link>(links)
        .id((d) => d.key)
        .distance(80),
    )
    .force("charge", d3.forceManyBody().strength(-800))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collide", d3.forceCollide(20));

const createDrag = (simulation: d3.Simulation<Node, undefined>) =>
  d3
    .drag<SVGCircleElement, Node>()
    .on("start", (event, d) => {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    })
    .on("drag", (event, d) => {
      d.fx = event.x;
      d.fy = event.y;
    })
    .on("end", (event, d) => {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = undefined;
      d.fy = undefined;
    });

const positionLinksOnTick = (
  linkSelection: d3.Selection<SVGLineElement, Link, SVGGElement, unknown>,
) => {
  linkSelection
    .attr("x1", (d) =>
      typeof d.source === "object" && "x" in d.source
        ? ((d.source as Node).x ?? 0)
        : 0,
    )
    .attr("y1", (d) =>
      typeof d.source === "object" && "y" in d.source
        ? ((d.source as Node).y ?? 0)
        : 0,
    )
    .attr("x2", (d) =>
      typeof d.target === "object" && "x" in d.target
        ? ((d.target as Node).x ?? 0)
        : 0,
    )
    .attr("y2", (d) =>
      typeof d.target === "object" && "y" in d.target
        ? ((d.target as Node).y ?? 0)
        : 0,
    );
};

export {
  createSimulation,
  createDrag,
  setupSvg,
  fetchGraph,
  decompose,
  persistGraph,
  buildChildren,
  handleNodeClickLogic,
  handleAddNodeAt,
  renderLinks,
  positionLinksOnTick,
};
