import { SimulationNodeDatum } from "d3";

interface Node extends SimulationNodeDatum {
  key: string;
  name: string;
  group: string;
  color: string;
  x?: number;
  y?: number;
  fx?: number;
  fy?: number;
}

interface Link {
  source: string;
  target: string;
}

type RawLinks = Record<
  string,
  {
    parents: string[];
    children: string[];
  }
>;

interface NodesStructure {
  nodes: Node[];
  rawLinks: RawLinks;
  links: Link[];
}

export { Node, Link, RawLinks, NodesStructure };
