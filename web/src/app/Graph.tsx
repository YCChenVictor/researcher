import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

import {
  persistGraph,
  handleAddNodeAt,
  handleNodeClickLogic,
  fetchGraph,
  setupSvg,
  createSimulation,
  createDrag,
  renderLinks,
  positionLinksOnTick,
  buildChildren,
  decompose,
} from "./features/graph";
import type { Node, Link } from "./types/graph";
import NodeContextMenu from "./NodeContextMenu";

type ConnectChildrenFn = (parent: Node, titles: string[]) => void;

const ForceGraph: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  type MenuState = { node: Node; x: number; y: number } | null;
  const [menu, setMenu] = useState<MenuState>(null);

  // bridge React -> D3
  const connectChildrenRef = useRef<ConnectChildrenFn | null>(null);

  useEffect(() => {
    const run = async () => {
      if (!svgRef.current || !containerRef.current) return;

      let nodes: Node[] = [];
      let links: Link[] = [];

      const initial = await fetchGraph();
      nodes = initial.nodes;
      links = initial.links;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      const { svg, zoomG, linkGroup, nodeGroup, labelGroup } = setupSvg(
        svgRef.current,
        width,
        height,
      );

      const simulation = createSimulation(nodes, links, width, height);
      const drag = createDrag(simulation);

      let selectedSource: Node | null = null;

      let link = renderLinks(linkGroup, links);
      let node = nodeGroup.selectAll<SVGCircleElement, Node>("circle");
      let label = labelGroup.selectAll<SVGTextElement, Node>("text");

      function updateNodeHighlight() {
        node
          .attr("stroke", (d) => (d === selectedSource ? "#000" : null))
          .attr("stroke-width", (d) => (d === selectedSource ? 2 : 0));
      }

      function setSelectedSource(nodeToSelect: Node | null) {
        selectedSource = nodeToSelect;
        updateNodeHighlight();
      }

      function updateLinks() {
        link = renderLinks(linkGroup, links);
      }

      function updateNodes() {
        node = node
          .data(nodes, (d) => d.key)
          .join(
            (enter) =>
              enter
                .append("circle")
                .attr("r", 10)
                .attr("fill", (d) => d.color)
                .call(drag),
            (update) => update.call(drag),
            (exit) => exit.remove(),
          );

        node
          .on("click", handleNodeClick)
          .on("contextmenu", handleNodeContextMenu);

        label = label
          .data(nodes, (d) => d.key)
          .join(
            (enter) =>
              enter
                .append("text")
                .text((d) => d.name)
                .attr("font-size", 12)
                .attr("fill", "#000")
                .attr("text-anchor", "middle"),
            (update) => update.text((d) => d.name),
            (exit) => exit.remove(),
          );

        updateNodeHighlight();
      }

      function addNodeAt(x: number, y: number) {
        handleAddNodeAt(x, y, {
          nodes,
          setNodes(next: Node[]) {
            nodes = next;
          },
          simulation,
          updateNodes,
        });

        persistGraph(nodes, links);
      }

      function addLink(sourceNode: Node, targetNode: Node) {
        const newLink: Link = {
          source: sourceNode.key,
          target: targetNode.key,
        };
        links = [...links, newLink];

        const linkForce = simulation.force("link") as d3.ForceLink<Node, Link>;
        linkForce.id((d) => d.key);
        linkForce.links(links);

        updateLinks();
        simulation.alpha(1).restart();

        persistGraph(nodes, links);
      }

      function handleNodeClick(event: MouseEvent, d: Node) {
        handleNodeClickLogic(event, d, selectedSource, {
          setSelectedSource,
          addLink,
        });
      }

      function handleNodeContextMenu(event: MouseEvent, d: Node) {
        event.preventDefault();
        event.stopPropagation();

        if (d.x == null || d.y == null || !svgRef.current) return;

        const t = d3.zoomTransform(svgRef.current);
        const x = t.applyX(d.x) + 12;
        const y = t.applyY(d.y) - 12;

        setMenu({ node: d, x, y });
      }

      const connectChildren: ConnectChildrenFn = (parent, titles) => {
        const { newNodes, newLinks } = buildChildren(parent, titles);

        nodes = [...nodes, ...newNodes];
        links = [...links, ...newLinks];

        simulation.nodes(nodes);
        (simulation.force("link") as d3.ForceLink<Node, Link>).links(links);
        simulation.alpha(1).restart();

        persistGraph(nodes, links);
        updateLinks();
        updateNodes();
      };

      connectChildrenRef.current = connectChildren;

      updateNodes();

      svg.on("click", (event) => {
        const target = event.target as HTMLElement;
        if (target.closest("circle") || target.closest("text")) return;

        if (selectedSource) {
          selectedSource = null;
          updateNodeHighlight();
          return;
        }

        const [x, y] = d3.pointer(event, zoomG.node() as SVGGElement);
        addNodeAt(x, y);
      });

      simulation.on("tick", () => {
        positionLinksOnTick(link);
        node.attr("cx", (d) => d.x ?? 0).attr("cy", (d) => d.y ?? 0);
        label.attr("x", (d) => d.x ?? 0).attr("y", (d) => (d.y ?? 0) - 14);
      });
    };

    run().catch((e) => console.error(e));

    return () => {
      connectChildrenRef.current = null;
      if (svgRef.current) {
        d3.select(svgRef.current).selectAll("*").remove();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[70vh] rounded-xl border border-slate-200 bg-slate-600 text-slate-100 overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 py-2 text-xs text-slate-300 bg-slate-900/70 backdrop-blur">
        <span className="font-semibold tracking-wide">ForceGraph</span>
      </div>

      <svg
        ref={svgRef}
        data-testid="force-graph-svg"
        className="w-full h-full"
      />

      {menu && (
        <NodeContextMenu
          x={menu.x}
          y={menu.y}
          onAction={async (action) => {
            if (action === "close") {
              setMenu(null);
              return;
            }

            if (action === "decompose") {
              try {
                const titles = await decompose(menu.node);
                connectChildrenRef.current?.(menu.node, titles);
              } catch (err) {
                console.error("Decompose error", err);
              } finally {
                setMenu(null);
              }
            }
          }}
        />
      )}
    </div>
  );
};

export default ForceGraph;
