import type { Simulation } from "d3";
import type { Node, Link } from "../types/nodes";

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

export { handleAddNodeAt };
