import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

import {
  persistGraph,
  fetchGraph,
  setupSvg,
  createSimulation,
  createDrag,
  createNodeInteractions,
  updateLinks,
  removeNode,
  updateNodes,
  connectChildren,
  setSelectedSource,
  onTick,
  addNodeAt,
  removeLink,
} from "./client/graph";
import type { Node, LinkSim, Runtime, Menu } from "../types/graph";
import NodeContextMenu from "./NodeContextMenu";
import LinkContextMenu from "./LinkContextMenu";

type ConnectChildrenFn = (parent: Node, titles: string[]) => void;

export const ForceGraph: React.FC = () => {
  const [menu, setMenu] = useState<Menu>(null);

  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const connectChildrenRef = useRef<ConnectChildrenFn | null>(null);
  const removeNodeRef = useRef<((n: Node) => void) | null>(null);
  const removeLinkRef = useRef<((l: LinkSim) => Promise<void>) | null>(null);

  useEffect(() => {
    let alive = true;
    let simulation: d3.Simulation<Node, LinkSim> | null = null;

    const run = async () => {
      const svgEl = svgRef.current;
      const containerEl = containerRef.current;
      if (!svgEl || !containerEl) return;

      const initial = await fetchGraph();

      if (!alive) return;

      const width = containerEl.clientWidth;
      const height = containerEl.clientHeight;

      const { svg, zoomG, linkGroup, nodeGroup, labelGroup } = setupSvg(
        svgEl,
        width,
        height,
      );

      simulation = createSimulation(
        initial.nodes,
        initial.links,
        width,
        height,
      );
      const drag = createDrag(simulation);

      const rt: Runtime = {
        nodes: initial.nodes,
        links: initial.links,
        simulation,
        drag,
        linkGroup,
        nodeGroup,
        labelGroup,
        linkSel: null,
        nodeSel: nodeGroup.selectAll<SVGCircleElement, Node>("circle"),
        labelSel: labelGroup.selectAll<SVGTextElement, Node>("text"),
        selectedSource: null,
        persist: persistGraph,
        setMenu,
      };

      const interactions = createNodeInteractions(rt);

      updateLinks(rt);
      updateNodes(rt, interactions);

      connectChildrenRef.current = (parent, titles) =>
        connectChildren(rt, parent, titles, interactions);

      removeNodeRef.current = (n) => removeNode(rt, n, interactions);
      removeLinkRef.current = (l) => removeLink(rt, l, interactions);

      svg.on("click", (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (target.closest("circle") || target.closest("text")) return;

        if (rt.selectedSource) {
          setSelectedSource(rt, null);
          return;
        }

        const [x, y] = d3.pointer(event, zoomG.node() as SVGGElement);
        addNodeAt(rt, x, y, interactions);
      });

      simulation.on("tick", () => onTick(rt));
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

      {menu?.kind === "node" && (
        <NodeContextMenu
          node={menu.node}
          closeMenu={() => setMenu(null)}
          connectChildren={(parent, titles) =>
            connectChildrenRef.current?.(parent, titles)
          }
          removeNode={async (n) => {
            await removeNodeRef.current?.(n);
            setMenu(null);
          }}
        />
      )}

      {menu?.kind === "link" && (
        <LinkContextMenu
          link={menu.link}
          x={menu.x}
          y={menu.y}
          closeMenu={() => setMenu(null)}
          removeLink={async (l) => {
            await removeLinkRef.current?.(l);
            setMenu(null);
          }}
        />
      )}
    </div>
  );
};

export default ForceGraph;
