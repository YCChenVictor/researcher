import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Node, Link, RawLinks, NodesStructure } from "../types/nodesStructure";

const ForceGraph = () => {
  const ref = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        const rawData = (await import(`../node-structure.json`)).default;
        if (
          !rawData.nodes ||
          !rawData.links ||
          !ref.current ||
          !containerRef.current
        )
          return;

        const nodes: Node[] = rawData.nodes;
        const links: Link[] = rawData.links;
        const rawLinks: RawLinks = {};
        const nodeData: NodesStructure = { nodes, links, rawLinks };

        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;

        const svg = d3
          .select(ref.current)
          .attr("width", width)
          .attr("height", height);
        const zoomG = svg.append("g");

        // Add arrow marker
        svg
          .append("defs")
          .append("marker")
          .attr("id", "arrow")
          .attr("viewBox", "0 -5 10 10")
          .attr("refX", 15) // Distance of arrow from the line
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
            .on("zoom", (event) => zoomG.attr("transform", event.transform)),
        );

        const simulation = d3
          .forceSimulation<Node>(nodeData.nodes)
          .force(
            "link",
            d3.forceLink<Node, Link>(nodeData.links).id((d) => d.key),
          )
          .force("charge", d3.forceManyBody().strength(-800))
          .force("center", d3.forceCenter(width / 2, height / 2))
          .force("collide", d3.forceCollide(20));

        const link = zoomG
          .append("g")
          .selectAll("line")
          .data(nodeData.links)
          .join("line")
          .attr("stroke", "#999")
          .attr("marker-end", "url(#arrow)"); // Add the arrow marker to the end of the line

        const node = zoomG
          .append("g")
          .selectAll<SVGCircleElement, Node>("circle")
          .data(nodeData.nodes)
          .join("circle")
          .attr("r", 10)
          .attr("fill", (d) => d.color)
          .call(
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
              }),
          )
          .on("click", (_, d) => window.open(d.key, "_blank"));

        const label = zoomG
          .append("g")
          .selectAll("text")
          .data(nodeData.nodes)
          .join("text")
          .text((d) => d.name)
          .attr("font-size", 12)
          .attr("fill", "#000")
          .attr("text-anchor", "middle");

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
      } catch (error) {
        console.error("Error loading data: ", error);
      }
    };

    run();
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100vh" }}>
      <svg ref={ref} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default ForceGraph;
