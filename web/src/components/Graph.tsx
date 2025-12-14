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
} from "./client/graph";
import { create } from "./client/article";
import type { Node, Link } from "../types/graph";
import NodeContextMenu from "./NodeContextMenu";

type ConnectChildrenFn = (parent: Node, titles: string[]) => void;

const ForceGraph: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [menu, setMenu] = useState<{ node: Node } | null>(null);
  const connectChildrenRef = useRef<ConnectChildrenFn | null>(null);

  useEffect(() => {
    let alive = true;
    let simulation: d3.Simulation<Node, Link> | null = null;

    const run = async () => {
      const svgEl = svgRef.current;
      const containerEl = containerRef.current;
      if (!svgEl || !containerEl) return;

      const initial = await fetchGraph();
      if (!alive) return;

      let nodes: Node[] = initial.nodes;
      let links: Link[] = initial.links;

      const width = containerEl.clientWidth;
      const height = containerEl.clientHeight;

      const { svg, zoomG, linkGroup, nodeGroup, labelGroup } = setupSvg(
        svgEl,
        width,
        height,
      );

      simulation = createSimulation(nodes, links, width, height);
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
        if (!simulation) return;

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
        if (!simulation) return;

        links = [...links, { source: sourceNode.key, target: targetNode.key }];

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
        setMenu({ node: d }); // full-page menu
      }

      const connectChildren: ConnectChildrenFn = (parent, titles) => {
        if (!simulation) return;

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

    run().catch(console.error);

    return () => {
      alive = false;
      simulation?.stop();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-slate-600 text-slate-100 overflow-hidden"
    >
      <svg
        ref={svgRef}
        data-testid="force-graph-svg"
        className="w-full h-full"
      />

      {menu && (
        <NodeContextMenu
          node={menu.node}
          closeMenu={() => setMenu(null)}
          connectChildren={(parent, titles) =>
            connectChildrenRef.current?.(parent, titles)
          }
          initArticle={create}
        />
      )}
    </div>
  );
};

export default ForceGraph;
