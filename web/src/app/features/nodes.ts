import type { Simulation } from "d3";
import type { Node, Link } from "../types/nodes";

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
  const { nodes, links, setNodes, simulation, updateNodes } = deps;

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

  // update local graph
  setNodes(nextNodes);
  simulation.nodes(nextNodes);
  simulation.alpha(1).restart();
  updateNodes();

  // persist full graph (nodes + links)
  const graph = { nodes: nextNodes, links };
};

const removeNodeContextMenu = (
  zoomG: d3.Selection<SVGGElement, unknown, null, undefined>,
) => {
  zoomG.selectAll(".node-context-menu").remove();
};

const createShowContextMenu = (
  zoomG: d3.Selection<SVGGElement, unknown, null, undefined>,
  log: (msg: string, node: Node) => void = console.log,
) => {
  const removeContextMenu = () => {
    zoomG.selectAll(".node-context-menu").remove();
  };

  return (nodeData: Node) => {
    removeContextMenu();

    const x = nodeData.x ?? 0;
    const y = nodeData.y ?? 0;

    const options = [
      {
        label: "Decompose",
        onClick: () => log("Decompose", nodeData),
      },
    ];

    const itemHeight = 20;
    const width = 120;

    const menu = zoomG
      .append("g")
      .attr("class", "node-context-menu")
      .attr("transform", `translate(${x + 14}, ${y - 10})`);

    menu
      .append("rect")
      .attr("width", width)
      .attr("height", options.length * itemHeight + 4)
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("fill", "#f9fafb")
      .attr("stroke", "#4b5563")
      .attr("pointer-events", "auto");

    menu
      .selectAll("text")
      .data(options)
      .join("text")
      .attr("x", 8)
      .attr("y", (_, i) => (i + 1) * itemHeight)
      .attr("font-size", 12)
      .attr("fill", "#111827")
      .attr("pointer-events", "auto")
      .text((d) => d.label)
      .on("click", (_, opt) => {
        opt.onClick();
        removeContextMenu();
      });
  };
};

export { createShowContextMenu, handleNodeClickLogic, handleAddNodeAt };
