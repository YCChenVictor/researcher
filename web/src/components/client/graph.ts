import * as d3 from "d3";

import type {
  Node,
  LinkSim,
  Runtime,
  GraphLayers,
  Deps,
  LinkJson,
  NodePair,
} from "../../types/graph";

type Mode = null | "decompose" | "link";

type DecomposeDraft = {
  start: Node;
  end: Node;
} | null;

export type NodeClickDeps = {
  mode: Mode;
  setSelectedSource: (node: Node | null) => void;
  setPendingPair: (pair: NodePair | null) => void;
  setShowOptions: (show: boolean) => void;
  openWindow?: (url: string) => void;
  openDecomposeModal: (draft: { start: Node; end: Node }) => void;
};

const persistGraph = async (nodes: Node[], links: LinkSim[]) => {
  const graph = {
    nodes: nodes.map(({ key, name }) => ({ key, name })),
    links: links.map((l) => ({
      source: typeof l.source === "string" ? l.source : l.source.key,
      target: typeof l.target === "string" ? l.target : l.target.key,
    })),
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
    setPendingPair,
    setShowOptions,
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

  setPendingPair({
    source: selectedSource,
    target: d,
  });
  setSelectedSource(null);
  setShowOptions(true);
};

const fetchGraph = async (): Promise<{ nodes: Node[]; links: LinkSim[] }> => {
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
): { newNodes: Node[]; newLinks: LinkSim[] } => {
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

  const newLinks: LinkSim[] = newNodes.map((child) => ({
    source: parent.key,
    target: child.key,
  }));

  return { newNodes, newLinks };
};

const decomposeNode = async (nodeData: { name: string }): Promise<string[]> => {
  const res = await fetch("/api/decompose", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      mode: "single",
      topic: nodeData.name,
      numberOfSubTopic: 3,
    }),
  });

  if (!res.ok) throw new Error(`Decompose failed: ${res.status}`);

  const json = (await res.json()) as {
    answer: { topics: { title: string }[] };
  };

  return json.answer.topics.map((t) => t.title);
};

const decomposeRoute = async (
  startId: string,
  endId: string,
): Promise<string[]> => {
  const res = await fetch("/api/decompose", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      mode: "route",
      startId,
      endId,
      numberOfSubTopic: 3,
    }),
  });

  if (!res.ok) throw new Error(`Decompose failed: ${res.status}`);

  const json = (await res.json()) as {
    answer: { topics: { title: string }[] };
  };

  return json.answer.topics.map((t) => t.title);
};

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

const linkKey = (d: LinkSim) => {
  const a = endKey(d.source);
  const b = endKey(d.target);
  return a < b ? `${a}—${b}` : `${b}—${a}`;
};

const getId = (e: string | Node) => (typeof e === "string" ? e : e.key);

type End = LinkSim["source"] | LinkSim["target"];

const isNodeObj = (v: End): v is Node => typeof v === "object" && v !== null;

const toLinkJson = (l: LinkSim): LinkJson => ({
  source: getId(l.source),
  target: getId(l.target),
});

type LinkHandlers = {
  onContextMenu: (event: MouseEvent, d: LinkSim) => void;
};

const renderLinks = (
  linkGroup: d3.Selection<SVGGElement, unknown, null, undefined>,
  links: LinkSim[],
  rt: Runtime,
  handlers: LinkHandlers,
): d3.Selection<SVGLineElement, LinkSim, SVGGElement, unknown> => {
  const byKey = new Map(rt.nodes.map((n) => [String(n.key), n]));

  const pos = (e: End) => {
    if (isNodeObj(e)) return { x: e.x ?? 0, y: e.y ?? 0 };
    const n = byKey.get(String(e));
    return { x: n?.x ?? 0, y: n?.y ?? 0 };
  };

  const pairs = linkGroup
    .selectAll<SVGGElement, LinkSim>("g.link-pair")
    .data(links, linkKey)
    .join((enter) => {
      const g = enter.append("g").attr("class", "link-pair");

      g.append("line")
        .attr("class", "link-hit")
        .style("stroke", "#999")
        .style("stroke-width", 4)
        .style("pointer-events", "stroke")
        .style("cursor", "context-menu");

      g.append("line")
        .attr("class", "link")
        .attr("marker-end", "url(#arrow)")
        .style("pointer-events", "none");

      return g;
    });

  pairs
    .select<SVGLineElement>("line.link-hit")
    .on("contextmenu", (event, d) =>
      handlers.onContextMenu(event as MouseEvent, d),
    );

  pairs.select<SVGLineElement>("line.link-hit")
    .attr("x1", (d) => pos(d.source).x)
    .attr("y1", (d) => pos(d.source).y)
    .attr("x2", (d) => pos(d.target).x)
    .attr("y2", (d) => pos(d.target).y);

  pairs.select<SVGLineElement>("line.link")
    .attr("x1", (d) => pos(d.source).x)
    .attr("y1", (d) => pos(d.source).y)
    .attr("x2", (d) => pos(d.target).x)
    .attr("y2", (d) => pos(d.target).y);

  return pairs.select<SVGLineElement>("line.link");
};

const createSimulation = (
  nodes: Node[],
  links: LinkSim[],
  width: number,
  height: number,
) =>
  d3
    .forceSimulation<Node>(nodes)
    .force(
      "link",
      d3
        .forceLink<Node, LinkSim>(links)
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
  linkSelection: d3.Selection<SVGLineElement, LinkSim, SVGGElement, unknown>,
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

const endKey = (end: LinkSim["source"] | LinkSim["target"]) =>
  typeof end === "string" ? end : end.key;

const updateNodeHighlight = (rt: Runtime) => {
  rt.nodeSel
    .attr("stroke", (d) => (rt.selectedSource?.key === d.key ? "#fff" : null))
    .attr("stroke-width", (d) => (rt.selectedSource?.key === d.key ? 2 : null))
    .attr("fill-opacity", (d) =>
      rt.selectedSource && rt.selectedSource.key !== d.key ? 0.6 : 1,
    );
};

const setSelectedSource = (rt: Runtime, next: Node | null) => {
  rt.selectedSource = next;
  updateNodeHighlight(rt);
};

const getNodeKey = (node: string | Node) =>
  typeof node === "string" ? node : node.key;

const addLink = (rt: Runtime, sourceNode: Node, targetNode: Node) => {
  const exists = rt.links.some(
    (l) =>
      getNodeKey(l.source) === sourceNode.key &&
      getNodeKey(l.target) === targetNode.key,
  );
  if (exists) return;

  rt.links = [...rt.links, { source: sourceNode.key, target: targetNode.key }];

  rt.simulation.alpha(1).restart();

  void persistGraph(rt.nodes, rt.links);
};

const updateLinks = (
  rt: Runtime,
  handlers: LinkHandlers,
) => {
  rt.linkSel = renderLinks(rt.linkGroup, rt.links, rt, handlers);
};

const removeLink = async (
  rt: Runtime,
  toRemove: LinkSim,
  handlers: ReturnType<typeof createNodeInteractions>,
) => {
  const s = endKey(toRemove.source);
  const t = endKey(toRemove.target);

  rt.links = rt.links.filter(
    (l) => !(endKey(l.source) === s && endKey(l.target) === t),
  );

  // bindLinkForce(rt.simulation, rt.links);

  updateNodes(rt, handlers);

  rt.simulation.alpha(1).restart();

  await persistGraph(rt.nodes, rt.links);

  rt.setMenu(null);
};

type NodeMenu = {
  kind: "node";
  node: Node;
  x: number;
  y: number;
};

type LinkMenu = {
  kind: "link";
  link: LinkSim;
  x: number;
  y: number;
};

type Menu = NodeMenu | LinkMenu | null;

const createNodeInteractions = (
  rt: Runtime,
  deps: {
    setPendingPair: (pair: { source: Node; target: Node } | null) => void;
    setShowConnectOptions: (value: boolean) => void;
    setMenu: (value: Menu) => void;
  },
) => {
  const onClick = (event: MouseEvent, d: Node) => {
    event.stopPropagation();

    if (rt.selectedSource === d) {
      rt.selectedSource = null;
      return;
    }

    if (!rt.selectedSource) {
      rt.selectedSource = d;
      return;
    }

    deps.setPendingPair({
      source: rt.selectedSource,
      target: d,
    });
    rt.selectedSource = null;
    deps.setShowConnectOptions(true);
  };

  const onContextMenu = (event: MouseEvent, d: Node) => {
    event.preventDefault();
    event.stopPropagation();

    deps.setMenu({
      kind: "node",
      node: d,
      x: event.clientX,
      y: event.clientY,
    });
  };

  return { onClick, onContextMenu };
};

const updateNodes = (
  rt: Runtime,
  handlers: ReturnType<typeof createNodeInteractions>,
) => {
  // These events will be bind to all the nodes again
  rt.nodeSel = rt.nodeSel
  .data(rt.nodes, (d) => d.key)
  .join(
    (enter) => {
      const g = enter.append("g").attr("class", "node");
      g.append("circle").attr("r", 10);
      g.append("text").attr("text-anchor", "middle").attr("dy", 4);
      return g;
    },
    (update) => update,
    (exit) => exit.remove(),
  )
  .call(rt.drag)
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

const idsToTitles = (nodes: Node[], path: string[]) => {
  const byId = new Map(nodes.map((n) => [n.key, n.name] as const));
  return path.map((id) => byId.get(id) ?? id);
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
  // bindLinkForce(rt.simulation, rt.links);

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
  // bindLinkForce(rt.simulation, rt.links);

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

  if (next) persistGraph(rt.nodes, rt.links);
};

const redirect = (url: string) => window.location.assign(url);

const endToStart = (
  links: LinkJson[],
  endId: string,
  startId: string,
): string[] => {
  const parentOf = new Map<string, string>();

  for (const { source, target } of links) {
    if (parentOf.has(target) && parentOf.get(target) !== source) {
      throw new Error(`Not a tree: ${target} has multiple parents`);
    }
    parentOf.set(target, source);
  }

  const path: string[] = [];
  let cur: string | undefined = endId;
  const seen = new Set<string>();

  while (cur && !seen.has(cur)) {
    seen.add(cur);
    path.push(cur);
    if (cur === startId) return path;
    cur = parentOf.get(cur);
  }

  return path;
};

export {
  endToStart,
  addNodeAt,
  createSimulation,
  createDrag,
  setupSvg,
  fetchGraph,
  decomposeNode,
  decomposeRoute,
  persistGraph,
  buildChildren,
  handleNodeClickLogic,
  renderLinks,
  positionLinksOnTick,
  removeNode,
  removeLink,
  connectChildren,
  createNodeInteractions,
  updateLinks,
  updateNodes,
  setSelectedSource,
  onTick,
  redirect,
  endKey,
  idsToTitles,
  addLink,
};

export type { Mode, DecomposeDraft };
