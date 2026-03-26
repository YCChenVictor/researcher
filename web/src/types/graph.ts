import type { SimulationLinkDatum, SimulationNodeDatum } from "d3";
import type { Simulation } from "d3-force";
import type { DragBehavior, SubjectPosition } from "d3-drag";
import type { Selection } from "d3-selection";

type Menu =
  | { kind: "node"; node: Node }
  | { kind: "link"; link: LinkJson; x: number; y: number }
  | null;

interface Node extends SimulationNodeDatum {
  key: string;
  name: string;
  x?: number;
  y?: number;
  fx?: number;
  fy?: number;
}

// Use LinkJson for storage/API (stable string node ids) and LinkSim for d3-force rendering because d3 may mutate source/target from ids into node objects during forceLink initialization.
type LinkJson = {
  source: string;
  target: string;
};
type LinkSim = Omit<SimulationLinkDatum<Node>, "source" | "target"> & {
  source: string | Node;
  target: string | Node;
};

type RawLinks = Record<
  string,
  { parents: string[]; children: string[] }
>;

type NodePair = {
  source: Node;
  target: Node;
};

type Runtime = {
  nodes: Node[];
  links: LinkSim[];
  simulation: Simulation<Node, LinkSim>;
  drag: d3.DragBehavior<SVGGElement, Node, Node>;
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  zoomG: d3.Selection<SVGGElement, unknown, null, undefined>;
  linkGroup: Selection<SVGGElement, unknown, null, undefined>;
  nodeGroup: Selection<SVGGElement, unknown, null, undefined>;
  linkSel: Selection<SVGLineElement, LinkSim, SVGGElement, unknown>;
  nodeSel: d3.Selection<SVGGElement, Node, SVGGElement, unknown>;
  selectedSource: Node | null;
};

type Deps = {
  getNodes: () => Node[];
  setNodes: (next: Node[]) => void; // ✅ not React Dispatch
  simulation: d3.Simulation<Node, LinkSim>;
  updateNodes: () => void;
};

type GraphLayers = {
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  zoomG: d3.Selection<SVGGElement, unknown, null, undefined>;
  linkGroup: d3.Selection<SVGGElement, unknown, null, undefined>;
  nodeGroup: d3.Selection<SVGGElement, unknown, null, undefined>;
  labelGroup: d3.Selection<SVGGElement, unknown, null, undefined>;
};

export type { NodePair, Runtime, Node, LinkJson, LinkSim, GraphLayers };
