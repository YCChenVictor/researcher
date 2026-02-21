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
  Mode,
  DecomposeDraft,
  decompose,
} from "./client/graph";
import type { Node, LinkSim, Runtime, Menu } from "../types/graph";

import NodeContextMenu from "./NodeContextMenu";
import LinkContextMenu from "./LinkContextMenu";
import DecomposeModal from "./DecomposeModal";

type ConnectChildrenFn = (parent: Node, titles: string[]) => void;

export const ForceGraph: React.FC = () => {
  const [hint, setHint] = useState<string | null>(null);
  const [mode, _setMode] = useState<Mode>(null);
  const [menu, setMenu] = useState<Menu>(null);
  const [decomposeDraft, setDecomposeDraft] = useState<DecomposeDraft>(null);

  const rtRef = useRef<Runtime | null>(null);
  const modeRef = useRef<Mode>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const connectChildrenRef = useRef<ConnectChildrenFn | null>(null);
  const removeNodeRef = useRef<((n: Node) => void) | null>(null);
  const removeLinkRef = useRef<((l: LinkSim) => Promise<void>) | null>(null);

  const close = () => setDecomposeDraft(null);

  const setModeSafe = (updater: (m: Mode) => Mode) => {
    _setMode((prev) => {
      const next = updater(prev);
      modeRef.current = next;
      return next;
    });
  };

  const btn = (active: boolean) =>
    [
      "rounded-lg px-3 py-2",
      "border border-white/10",
      active
        ? "bg-indigo-500/30 ring-2 ring-indigo-400/50"
        : "bg-white/10 hover:bg-white/15",
    ].join(" ");

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

      rtRef.current = rt;
      const interactions = createNodeInteractions(
        rt,
        () => modeRef.current,
        setDecomposeDraft,
      );

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
      {hint && (
        <div className="absolute top-14 left-3 z-50 rounded-lg bg-black/40 px-3 py-2 text-sm border border-white/10">
          {hint}
        </div>
      )}

      <div className="absolute top-3 left-3 z-50 flex gap-2">
        <button
          type="button"
          className={btn(mode === "decompose")}
          onClick={() =>
            setModeSafe((m) => {
              const next = m === "decompose" ? null : "decompose";
              setHint(
                next === "decompose"
                  ? "Decompose: click start node and then target node"
                  : null,
              );
              return next;
            })
          }
        >
          Decompose
        </button>

        <button
          type="button"
          className={btn(mode === "link")}
          onClick={() =>
            setModeSafe((m) => {
              const next = m === "link" ? null : "link";
              setHint(
                next === "link"
                  ? "Link: click start node and then target node"
                  : null,
              );
              return next;
            })
          }
        >
          Link
        </button>
      </div>

      <svg
        ref={svgRef}
        data-testid="force-graph-svg"
        className="w-full h-full"
      />

      {decomposeDraft && (
        <DecomposeModal
          onClose={close}
          onConfirm={() => {
            decompose(decomposeDraft.start.key, decomposeDraft.end.key);
          }}
        />
      )}

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
