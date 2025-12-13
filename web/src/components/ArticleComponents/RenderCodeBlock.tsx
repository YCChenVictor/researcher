import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const RenderCodeBlock = (props: {
  inline?: boolean;
  className?: string;
  children: React.ReactNode;
}) => {
  const { inline, className, children } = props;

  const match = /language-(\w+)/.exec(className || "");
  const language = inline || !className ? "inline" : match?.[1] || "inline";

  if (language === "inline") {
    return <code className="bg-gray-500 text-white p-0.5">{children}</code>;
  }

  return (
    <SyntaxHighlighter
      language={language}
      wrapLines
      lineProps={{
        style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
      }}
      PreTag="div"
    >
      {typeof children === "string" ? children : String(children)}
    </SyntaxHighlighter>
  );
};

export default RenderCodeBlock;
