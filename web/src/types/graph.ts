import type { SimulationLinkDatum, SimulationNodeDatum } from "d3";
import type { Simulation } from "d3-force";
import type { DragBehavior, SubjectPosition } from "d3-drag";
import type { Selection } from "d3-selection";

export type Menu =
  | { kind: "node"; node: Node }
  | { kind: "link"; link: LinkJson; x: number; y: number }
  | null;

export interface Node extends SimulationNodeDatum {
  key: string;
  name: string;
  x?: number;
  y?: number;
  fx?: number;
  fy?: number;
}

// Use LinkJson for storage/API (stable string node ids) and LinkSim for d3-force rendering because d3 may mutate source/target from ids into node objects during forceLink initialization.
export type LinkJson = {
  source: string;
  target: string;
};
export type LinkSim = Omit<SimulationLinkDatum<Node>, "source" | "target"> & {
  source: string | Node;
  target: string | Node;
};

export type RawLinks = Record<
  string,
  { parents: string[]; children: string[] }
>;

export type Runtime = {
  nodes: Node[];
  links: LinkSim[];

  simulation: Simulation<Node, LinkSim>;
  drag: DragBehavior<SVGCircleElement, Node, Node | SubjectPosition>;

  linkGroup: Selection<SVGGElement, unknown, null, undefined>;
  nodeGroup: Selection<SVGGElement, unknown, null, undefined>;
  labelGroup: Selection<SVGGElement, unknown, null, undefined>;

  linkSel: Selection<SVGLineElement, LinkSim, SVGGElement, unknown> | null;
  nodeSel: Selection<SVGCircleElement, Node, SVGGElement, unknown>;
  labelSel: Selection<SVGTextElement, Node, SVGGElement, unknown>;

  selectedSource: Node | null;

  persist: (nodes: Node[], links: LinkSim[]) => void;
  setMenu: (menu: Menu) => void;
};

export type Deps = {
  getNodes: () => Node[];
  setNodes: (next: Node[]) => void; // ✅ not React Dispatch
  simulation: d3.Simulation<Node, LinkSim>;
  updateNodes: () => void;
};

export type GraphLayers = {
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  zoomG: d3.Selection<SVGGElement, unknown, null, undefined>;
  linkGroup: d3.Selection<SVGGElement, unknown, null, undefined>;
  nodeGroup: d3.Selection<SVGGElement, unknown, null, undefined>;
  labelGroup: d3.Selection<SVGGElement, unknown, null, undefined>;
};
