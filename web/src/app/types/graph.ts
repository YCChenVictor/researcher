import { SimulationLinkDatum, SimulationNodeDatum } from "d3";

interface Node extends SimulationNodeDatum {
  key: string;
  name: string;
  x?: number;
  y?: number;
  fx?: number;
  fy?: number;
}

type Link = SimulationLinkDatum<Node> & {
  source: Node | string;
  target: Node | string;
};

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
