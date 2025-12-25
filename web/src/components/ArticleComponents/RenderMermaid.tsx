import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

type Props = React.PropsWithChildren;

const RenderMermaid: React.FC<Props> = ({ children }) => {
  const idRef = useRef<string | null>(null);
  const [svg, setSvg] = useState<string>("");

  useEffect(() => {
    if (!idRef.current) {
      idRef.current =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `mmd-${Date.now()}`;
    }

    let alive = true;

    (async () => {
      try {
        mermaid.initialize({ startOnLoad: false });

        const code = typeof children === "string" ? children : String(children);
        const result = await mermaid.render(idRef.current!, code);

        if (!alive) return;

        // mermaid.render() returns a RenderResult object
        setSvg(result.svg);
      } catch (e) {
        console.error(e);
        if (alive) setSvg("");
      }
    })();

    return () => {
      alive = false;
    };
  }, [children]);

  return <div dangerouslySetInnerHTML={{ __html: svg }} />;
};

export default RenderMermaid;
