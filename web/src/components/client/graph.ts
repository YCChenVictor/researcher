import * as d3 from "d3";

import type { Node, Link, Runtime, GraphLayers, Deps } from "../../types/graph";

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

// Graph data
const persistGraph = async (nodes: Node[], links: Link[]) => {
  const graph = {
    nodes: serializeNodes(nodes),
    links: serializeLinks(links),
  };

  const res = await fetch("/api/graph", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ graph }),
  });

  if (!res.ok) {
    throw new Error(`Failed to persist graph: ${res.status}`);
  }
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

const fetchGraph = async (): Promise<{ nodes: Node[]; links: Link[] }> => {
  const res = await fetch("/api/graph");
  if (!res.ok) throw new Error(`Failed to load graph: ${res.status}`);

  const { graph } = (await res.json()) as {
    graph: {
      nodes: Node[];
      links: { source: string; target: string }[];
    } | null;
  };

  if (!graph) return { nodes: [], links: [] };

  return {
    nodes: graph.nodes,
    links: graph.links.map((l) => ({ source: l.source, target: l.target })),
  };
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

const decompose = async (nodeData: { name: string }): Promise<string[]> => {
  const res = await fetch("/api/decompose", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic: nodeData.name, numberOfSubTopic: 5 }),
  });

  if (!res.ok) throw new Error(`Decompose failed: ${res.status}`);

  const json = (await res.json()) as {
    answer: { topics: { title: string }[] };
  };
  return json.answer.topics.map((t) => t.title);
};

const serializeLinks = (links: Link[]) =>
  links.map((l) => ({
    source: typeof l.source === "string" ? l.source : l.source.key,
    target: typeof l.target === "string" ? l.target : l.target.key,
  }));

const serializeNodes = (nodes: Node[]) =>
  nodes.map(({ vx: _vx, vy: _vy, index: _index, ...rest }) => rest);

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

const endKey = (end: Link["source"] | Link["target"]) =>
  typeof end === "string" ? end : end.key;

const updateNodeHighlight = (rt: Runtime) => {
  rt.nodeSel
    .attr("stroke", (d) => (rt.selectedSource?.key === d.key ? "#000" : null))
    .attr("stroke-width", (d) => (rt.selectedSource?.key === d.key ? 2 : 0));
};

const setSelectedSource = (rt: Runtime, next: Node | null) => {
  rt.selectedSource = next;
  updateNodeHighlight(rt);
};

const createNodeInteractions = (rt: Runtime) => {
  const onClick = (event: MouseEvent, d: Node) => {
    handleNodeClickLogic(event, d, rt.selectedSource, {
      setSelectedSource: (n) => setSelectedSource(rt, n),
      addLink: (sourceNode, targetNode) => addLink(rt, sourceNode, targetNode),
    });
  };

  const onContextMenu = (event: MouseEvent, d: Node) => {
    event.preventDefault();
    event.stopPropagation();
    rt.setMenu({ node: d });
  };

  return { onClick, onContextMenu };
};

const bindLinkForce = (
  simulation: d3.Simulation<Node, Link>,
  links: Link[],
) => {
  const linkForce = simulation.force("link") as d3.ForceLink<Node, Link>;
  linkForce.id((d) => d.key);
  linkForce.links(links);
};

const updateLinks = (rt: Runtime) => {
  rt.linkSel = renderLinks(rt.linkGroup, rt.links);
};

const addLink = (rt: Runtime, sourceNode: Node, targetNode: Node) => {
  rt.links = [...rt.links, { source: sourceNode.key, target: targetNode.key }];

  bindLinkForce(rt.simulation, rt.links);
  updateLinks(rt);
  rt.simulation.alpha(1).restart();

  rt.persist(rt.nodes, rt.links);
};

const updateNodes = (
  rt: Runtime,
  handlers: ReturnType<typeof createNodeInteractions>,
) => {
  // These events will be bind to all the nodes again
  rt.nodeSel = rt.nodeSel
    .data(rt.nodes, (d) => d.key)
    .join(
      (enter) => enter.append("circle").attr("r", 10).call(rt.drag),
      (update) => update.call(rt.drag),
      (exit) => exit.remove(),
    )
    .on("click", handlers.onClick)
    .on("contextmenu", handlers.onContextMenu);

  rt.labelSel = rt.labelSel
    .data(rt.nodes, (d) => d.key)
    .join(
      (enter) =>
        enter
          .append("text")
          .attr("font-size", 12)
          .attr("fill", "#000")
          .attr("text-anchor", "middle"),
      (update) => update,
      (exit) => exit.remove(),
    )
    .text((d) => d.name)
    .on("click", (event, d) =>
      handlers.onClick(event as unknown as MouseEvent, d),
    )
    .on("contextmenu", (event, d) =>
      handlers.onContextMenu(event as unknown as MouseEvent, d),
    );

  updateNodeHighlight(rt);
};

const removeNode = async (
  rt: Runtime,
  toRemove: Node,
  handlers: ReturnType<typeof createNodeInteractions>,
) => {
  const key = toRemove.key;

  if (rt.selectedSource?.key === key) setSelectedSource(rt, null);

  rt.links = rt.links.filter(
    (l) => endKey(l.source) !== key && endKey(l.target) !== key,
  );
  rt.nodes = rt.nodes.filter((n) => n.key !== key);

  rt.simulation.nodes(rt.nodes);
  bindLinkForce(rt.simulation, rt.links);

  updateLinks(rt);
  updateNodes(rt, handlers);

  rt.simulation.alpha(1).restart();

  await persistGraph(rt.nodes, rt.links);

  rt.setMenu(null);
};

const connectChildren = (
  rt: Runtime,
  parent: Node,
  titles: string[],
  handlers: ReturnType<typeof createNodeInteractions>,
) => {
  const { newNodes, newLinks } = buildChildren(parent, titles);

  rt.nodes = [...rt.nodes, ...newNodes];
  rt.links = [...rt.links, ...newLinks];

  rt.simulation.nodes(rt.nodes);
  bindLinkForce(rt.simulation, rt.links);

  updateLinks(rt);
  updateNodes(rt, handlers);

  rt.simulation.alpha(1).restart();
  rt.persist(rt.nodes, rt.links);
};

const onTick = (rt: Runtime) => {
  if (rt.linkSel) positionLinksOnTick(rt.linkSel);

  rt.nodeSel.attr("cx", (d) => d.x ?? 0).attr("cy", (d) => d.y ?? 0);
  rt.labelSel.attr("x", (d) => d.x ?? 0).attr("y", (d) => (d.y ?? 0) - 14);
};

const handleAddNodeAt = (x: number, y: number, deps: Deps) => {
  const { getNodes, setNodes, simulation, updateNodes } = deps;

  const name = window.prompt("Topic?");
  if (!name) return;

  const newNode: Node = {
    key:
      crypto.randomUUID?.() ??
      `custom-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name,
    x,
    y,
    fx: x,
    fy: y,
  };

  const next = [...getNodes(), newNode];
  setNodes(next);
  simulation.nodes(next);
  simulation.alpha(1).restart();
  updateNodes();

  return next;
};

const addNodeAt = (
  rt: Runtime,
  x: number,
  y: number,
  handlers: ReturnType<typeof createNodeInteractions>,
) => {
  const next = handleAddNodeAt(x, y, {
    getNodes: () => rt.nodes,
    setNodes: (n: Node[]) => {
      rt.nodes = n;
    },
    simulation: rt.simulation,
    updateNodes: () => updateNodes(rt, handlers),
  });

  if (next) rt.persist(rt.nodes, rt.links);
};

const redirect = (url: string) => window.location.assign(url);

export {
  addNodeAt,
  createSimulation,
  createDrag,
  setupSvg,
  fetchGraph,
  decompose,
  persistGraph,
  buildChildren,
  handleNodeClickLogic,
  renderLinks,
  positionLinksOnTick,
  removeNode,
  connectChildren,
  createNodeInteractions,
  updateLinks,
  updateNodes,
  setSelectedSource,
  onTick,
  redirect,
  endKey,
};
