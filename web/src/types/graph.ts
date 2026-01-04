import type { SimulationLinkDatum, SimulationNodeDatum } from "d3";
import type { Simulation } from "d3-force";
import type { DragBehavior, SubjectPosition } from "d3-drag";
import type { Selection } from "d3-selection";

export type Menu =
  | { kind: "node"; node: Node }
  | { kind: "link"; link: Link; x: number; y: number }
  | null;

export interface Node extends SimulationNodeDatum {
  key: string;
  name: string;
  x?: number;
  y?: number;
  fx?: number;
  fy?: number;
}

export type Link = SimulationLinkDatum<Node> & {
  source: Node | string;
  target: Node | string;
};

export type RawLinks = Record<
  string,
  { parents: string[]; children: string[] }
>;

export interface NodesStructure {
  nodes: Node[];
  rawLinks: RawLinks;
  links: Link[];
}

export type Runtime = {
  nodes: Node[];
  links: Link[];

  simulation: Simulation<Node, Link>;
  drag: DragBehavior<SVGCircleElement, Node, Node | SubjectPosition>;

  linkGroup: Selection<SVGGElement, unknown, null, undefined>;
  nodeGroup: Selection<SVGGElement, unknown, null, undefined>;
  labelGroup: Selection<SVGGElement, unknown, null, undefined>;

  linkSel: Selection<SVGLineElement, Link, SVGGElement, unknown> | null;
  nodeSel: Selection<SVGCircleElement, Node, SVGGElement, unknown>;
  labelSel: Selection<SVGTextElement, Node, SVGGElement, unknown>;

  selectedSource: Node | null;

  persist: (nodes: Node[], links: Link[]) => void;
  setMenu: (menu: Menu) => void;
};

export type Deps = {
  getNodes: () => Node[];
  setNodes: (next: Node[]) => void; // ✅ not React Dispatch
  simulation: d3.Simulation<Node, Link>;
  updateNodes: () => void;
};

export type GraphLayers = {
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  zoomG: d3.Selection<SVGGElement, unknown, null, undefined>;
  linkGroup: d3.Selection<SVGGElement, unknown, null, undefined>;
  nodeGroup: d3.Selection<SVGGElement, unknown, null, undefined>;
  labelGroup: d3.Selection<SVGGElement, unknown, null, undefined>;
};
