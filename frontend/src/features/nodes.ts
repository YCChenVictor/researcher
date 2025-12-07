import type { Simulation } from "d3";
import type { Node, Link } from "../types/nodes";

const handleAddNodeAt = (
  x: number,
  y: number,
  deps: {
    nodes: Node[];
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

  void fetch(`/api/nodes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newNode),
  }).catch((err) => {
    console.error("Failed to persist node", err);
  });
}

export { handleAddNodeAt }
