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
  addLink,
  Mode,
  DecomposeDraft,
  decomposeRoute,
  whyRoute,
  solutionRoute,
} from "./client/graph";
import type { Node, LinkSim, Runtime, Menu, NodePair } from "../types/graph";

import NodeContextMenu from "./NodeContextMenu";
import LinkContextMenu from "./LinkContextMenu";
import DecomposeModal from "./DecomposeModal";

type ConnectChildrenFn = (parent: Node, titles: string[]) => void;

export const ForceGraph: React.FC = () => {
  const [menu, setMenu] = useState<Menu>(null);
  const [showConnectOptions, setShowConnectOptions] = useState(false);
  const [pendingPair, setPendingPair] = useState<NodePair | null>(null);
  const [decomposeDraft, setDecomposeDraft] = useState<DecomposeDraft>(null);

  const rtRef = useRef<Runtime | null>(null);
  const modeRef = useRef<Mode>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const interactionsRef = useRef<ReturnType<
    typeof createNodeInteractions
  > | null>(null);

  const connectChildrenRef = useRef<ConnectChildrenFn | null>(null);
  const removeNodeRef = useRef<((n: Node) => void) | null>(null);
  const removeLinkRef = useRef<((l: LinkSim) => Promise<void>) | null>(null);

  const handleConnect = () => {
    if (pendingPair && rtRef.current && interactionsRef.current) {
      addLink(rtRef.current, pendingPair.source, pendingPair.target);
    }

    setShowConnectOptions(false);
    setPendingPair(null);
  };

  const handleDecompose = () => {
    if (!pendingPair) return;

    setDecomposeDraft({
      start: pendingPair.source,
      end: pendingPair.target,
    });

    setShowConnectOptions(false);
    setPendingPair(null);
  };

  const handleCloseConnectOptions = () => {
    setShowConnectOptions(false);
    setPendingPair(null);
  };

  const handleWhy = async () => {
    if (!pendingPair) return;

    await whyRoute(pendingPair.source.key, pendingPair.target.key);

    setShowConnectOptions(false);
    setPendingPair(null);
  };

  const handleSolution = async () => {
    if (!pendingPair) return;

    await solutionRoute(pendingPair.source.key, pendingPair.target.key);

    setShowConnectOptions(false);
    setPendingPair(null);
  };

  const close = () => setDecomposeDraft(null);

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
        setPendingPair,
        setShowConnectOptions,
        persist: persistGraph,
        setMenu,
      };

      rtRef.current = rt;

      const interactions = createNodeInteractions(
        rt,
        () => modeRef.current,
        setDecomposeDraft,
      );

      interactionsRef.current = interactions;

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

    void run();

    return () => {
      alive = false;
      simulation?.stop();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden bg-slate-600 text-slate-100"
    >
      <svg
        ref={svgRef}
        data-testid="force-graph-svg"
        className="h-full w-full"
      />

      {decomposeDraft && (
        <DecomposeModal
          onClose={close}
          onConfirm={async () => {
            const draft = decomposeDraft;
            if (!draft) return;

            await decomposeRoute(draft.start.key, draft.end.key);
            close();
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

      {showConnectOptions && pendingPair && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-80 rounded-xl bg-white p-4 text-black shadow-xl">
            <h2 className="mb-3 text-lg font-semibold">Choose action</h2>

            <p className="mb-4 text-sm">
              {pendingPair.source.name} → {pendingPair.target.name}
            </p>

            <div className="flex flex-col gap-2">
              <button
                className="rounded bg-blue-600 px-3 py-2 text-white"
                onClick={handleConnect}
              >
                Connect
              </button>
              <button
                className="rounded bg-green-600 px-3 py-2 text-white"
                onClick={handleDecompose}
              >
                Decompose
              </button>
              <button
                className="rounded bg-green-600 px-3 py-2 text-white"
                onClick={handleWhy}
              >
                Why
              </button>
              <button
                className="rounded bg-green-600 px-3 py-2 text-white"
                onClick={handleSolution}
              >
                Solution
              </button>
              <button
                className="rounded bg-gray-300 px-3 py-2 text-black"
                onClick={handleCloseConnectOptions}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForceGraph;
