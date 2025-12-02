import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

type Node = d3.SimulationNodeDatum & {
  key: string;
  name: string;
  color: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
};

type Link = d3.SimulationLinkDatum<Node> & {
  source: string | Node;
  target: string | Node;
};

// type RawData = {
//   nodes: Node[];
//   links: Link[];
// };

const ForceGraph: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const run = async () => {
      if (!svgRef.current || !containerRef.current) return;

      // const imported = (await import("../node-structure.json"))
      //   .default as RawData;

      // if (!imported.nodes || !imported.links) return;

      let nodes: Node[] = [];
      let links: Link[] = [];

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      const svg = d3
        .select<SVGSVGElement, unknown>(svgRef.current)
        .attr("width", width)
        .attr("height", height);

      // clear previous content if any
      svg.selectAll("*").remove();

      const zoomG = svg.append("g");
      const linkGroup = zoomG.append("g");
      const nodeGroup = zoomG.append("g");
      const labelGroup = zoomG.append("g");

      // Arrow marker
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

      const simulation = d3
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

      const drag = d3
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

      let selectedSource: Node | null = null;

      let link = linkGroup
        .selectAll<SVGLineElement, Link>("line")
        .data(links)
        .join("line")
        .attr("stroke", "#999")
        .attr("marker-end", "url(#arrow)");

      let node = nodeGroup
        .selectAll<SVGCircleElement, Node>("circle")
        .data(nodes, (d) => d.key)
        .join("circle")
        .attr("r", 10)
        .attr("fill", (d) => d.color)
        .call(drag);

      let label = labelGroup
        .selectAll<SVGTextElement, Node>("text")
        .data(nodes, (d) => d.key)
        .join("text")
        .text((d) => d.name)
        .attr("font-size", 12)
        .attr("fill", "#000")
        .attr("text-anchor", "middle");

      const updateNodeHighlight = () => {
        node
          .attr("stroke", (d) => (d === selectedSource ? "#000" : null))
          .attr("stroke-width", (d) => (d === selectedSource ? 2 : 0));
      };

      const updateLinks = () => {
        link = linkGroup
          .selectAll<SVGLineElement, Link>("line")
          .data(links)
          .join("line")
          .attr("stroke", "#999")
          .attr("marker-end", "url(#arrow)");
      };

      const updateNodes = () => {
        node = nodeGroup
          .selectAll<SVGCircleElement, Node>("circle")
          .data(nodes, (d) => d.key)
          .join(
            (enter) =>
              enter
                .append("circle")
                .attr("r", 10)
                .attr("fill", (d) => d.color)
                .call(drag),
            (update) => update,
            (exit) => exit.remove(),
          );

        // reattach click handler after join
        node.on("click", handleNodeClick);

        label = labelGroup
          .selectAll<SVGTextElement, Node>("text")
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
      };

      const addLink = (source: Node, target: Node) => {
        const newLink: Link = {
          source,
          target,
        };

        links = [...links, newLink];

        // update link force
        const linkForce = simulation.force("link") as d3.ForceLink<Node, Link>;
        linkForce.links(links);

        updateLinks();

        simulation.alpha(1).restart();
      };

      const handleNodeClick = (event: MouseEvent, d: Node) => {
  event.stopPropagation();

  if (event.metaKey || event.ctrlKey) {
    window.open(d.key, "_blank");
    return;
  }

  if (!selectedSource) {
    selectedSource = d;
    updateNodeHighlight();
  } else if (selectedSource === d) {
    selectedSource = null;
    updateNodeHighlight();
  } else {
    addLink(selectedSource, d);
    selectedSource = null;
    updateNodeHighlight();
  }
};

      node.on("click", handleNodeClick);

      const addNodeAt = (x: number, y: number) => {
        const name = window.prompt("Topic?");
        if (!name) return;

        const newNode: Node = {
          key: `custom-${Date.now()}-${Math.random().toString(16).slice(2)}`,
          name,
          color: "#ff8800",
          x,
          y,
        };

        nodes = [...nodes, newNode];

        simulation.nodes(nodes);
        simulation.alpha(1).restart();

        updateNodes();
      };

      // click background: if selecting a source, cancel; otherwise add node
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
        link
          .attr("x1", (d) =>
            typeof d.source === "object" && "x" in d.source
              ? (d.source as Node).x ?? 0
              : 0,
          )
          .attr("y1", (d) =>
            typeof d.source === "object" && "y" in d.source
              ? (d.source as Node).y ?? 0
              : 0,
          )
          .attr("x2", (d) =>
            typeof d.target === "object" && "x" in d.target
              ? (d.target as Node).x ?? 0
              : 0,
          )
          .attr("y2", (d) =>
            typeof d.target === "object" && "y" in d.target
              ? (d.target as Node).y ?? 0
              : 0,
          );

        node.attr("cx", (d) => d.x ?? 0).attr("cy", (d) => d.y ?? 0);
        label.attr("x", (d) => d.x ?? 0).attr("y", (d) => (d.y ?? 0) - 14);
      });
    };

    run().catch((e) => console.error(e));

    return () => {
      if (svgRef.current) {
        d3.select(svgRef.current).selectAll("*").remove();
      }
    };
  }, []);

  return (
  <div ref={containerRef} style={{ width: "100%", height: "100vh" }}>
    <svg
      ref={svgRef}
      data-testid="force-graph-svg"
      style={{ width: "100%", height: "100%" }}
    />
  </div>
);
};

export default ForceGraph;