import React, { useState, useEffect, useRef } from "react";
import ForceGraph2D from "react-force-graph-2d";
import axios from "axios";
import { ErrorBoundary } from "react-error-boundary";
import { Node, Link, NodesStructure } from "../types/nodesStructure";

interface ForceRef {
  zoom: (scale: number, duration: number) => void;
  d3Force: (type: string) => {
    distance: (callback: (link: Link) => number) => void;
  };
}

const NodeGraph = ({
  category,
  showDrawAgain,
}: {
  category: string;
  showDrawAgain: boolean;
}) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [links, setLinks] = useState<Link[]>([]);
  const forceRef = useRef();

  const handleNodeClick = (node: Node) => {
    if (node) {
      window.open(node.key, "_blank");
    }
  };

  const generateNodes = (category: string) => {
    const url = `${process.env.REACT_APP_HOST_DEV}node-graph/create?category=${category}`;
    const postData = { category: category };
    axios.post(url, postData).catch((error) => {
      console.log(error);
    });
  };

  const fetchNodeData = async () => {
    const nodeData: NodesStructure = (await import(
      `../node-structure.json`
    )) as NodesStructure;
    const { nodes, links } = nodeData;

    if (nodes === undefined || links === undefined) {
      return false;
    }

    setNodes(nodes);
    setLinks(links);
    return true;
  };

  useEffect(() => {
    // please extract following as method
    if (forceRef?.current) {
      const current = forceRef.current as ForceRef;
      current.zoom(2, 300);
    }

    fetchNodeData()
      .then((success) => {
        if (!success) return;

        setTimeout(function () {
          // Give it time to render
          const linkLengthConstant = 20;
          if (forceRef.current) {
            (forceRef.current as ForceRef)
              .d3Force("link")
              .distance(() => linkLengthConstant);
          }
          // forceRef.current.centerAt(nodes[0].x, nodes[0].y, 400) // fix it later
        }, 500);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div id="node-graph">
      {showDrawAgain ? (
        <button
          onClick={() => generateNodes(category)}
          className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Draw Again
        </button>
      ) : null}
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <ForceGraph2D
          ref={forceRef}
          graphData={{ nodes, links }}
          height={window.innerHeight}
          width={window.innerWidth * 0.75}
          nodeRelSize={5}
          linkDirectionalArrowRelPos={1}
          linkDirectionalArrowLength={5}
          d3VelocityDecay={0.6} // Decrease velocity decay to reduce node overlap
          d3AlphaDecay={0.03} // Decrease alpha decay to increase simulation time
          onNodeClick={handleNodeClick} // redirect to the page when click node
          nodeCanvasObjectMode={() => "after"}
          nodeCanvasObject={(node, ctx) => {
            ctx.textAlign = "center";
            ctx.font = "5px Sans-Serif";
            ctx.fillStyle = "gray";
            const lineHeight = 5;
            const lines = (node as Node).name.split("-");
            const x = node.x ?? 0;
            let y = (node.y ?? 0) - lineHeight;
            for (const line of lines) {
              ctx.fillText(line, x, y);
              y += lineHeight;
            }
          }}
        />
      </ErrorBoundary>
    </div>
  );
};

export default NodeGraph;
