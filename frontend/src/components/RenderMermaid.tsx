import React, { useRef, useState, useEffect } from "react";
import mermaid from "mermaid";

const RenderMermaid = (props: React.PropsWithChildren) => {
  const markId = useRef(`mark${Math.floor(Math.random() * 100000 + 1)}`);
  const [svg, setSvg] = useState("");
  useEffect(() => {
    const renderMermaid = async () => {
      const svg = await mermaid.render(markId.current, String(props.children));
      setSvg(svg.svg);
    };
    renderMermaid().catch((error) => {
      console.log(error);
    });
  }, []);
  return <div dangerouslySetInnerHTML={{ __html: svg }}></div>;
};

export default RenderMermaid;
