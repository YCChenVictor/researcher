import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import { get } from "./client/article";

import SidebarLayout from "./ArticleComponents/SidebarLayout";
import RenderCodeBlock from "./ArticleComponents/RenderCodeBlock";
import RenderMermaid from "./ArticleComponents/RenderMermaid";
import ScrollToTopButton from "./ArticleComponents/ScrollToTopButton";

const btn =
  "inline-flex h-9 items-center gap-1 rounded-lg border px-3 text-sm font-medium transition-colors " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-1 " +
  "disabled:opacity-50 disabled:cursor-not-allowed";
const btnGhost = `${btn} border-slate-300 bg-white text-slate-700 hover:bg-slate-50`;

type TitleItem = { content: string; tagName: string };

const generateSlug = (input: string) => {
  let str = input.trim().toLowerCase();
  str = str
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  return str;
};

export default function Article({ filePath }: { filePath: string }) {
  const [content, setContent] = useState<string>("");
  const [rawTitles, setRawTitles] = useState<TitleItem[]>([]);
  const componentSidebarRef = useRef<HTMLDivElement | null>(null);

  const { articleName, category } = useMemo(() => {
    const parts = filePath.split("/").filter(Boolean);
    const name = parts.at(-1) ?? "undefined";
    const cat = parts.at(-2) ?? "base";
    return { articleName: name, category: cat };
  }, [filePath]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const r = await get(filePath);
        if (cancelled) return;

        const md = r?.content ?? "";
        setContent(md);

        if (!md) {
          setRawTitles([]);
          return;
        }

        // await parseTitlesFromMarkdown(md);
      } catch (err) {
        if (!cancelled) {
          console.error(err);
          setContent("");
          setRawTitles([]);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [filePath]);

  return (
    <div className="bg-gray-400 flex min-h-screen w-full">
      <div ref={componentSidebarRef}>
        <div className="sticky top-0 h-screen overflow-y-auto">
          <div className="hidden lg:block p-2">
            <SidebarLayout
              isCollapsed={false}
              articleContent={content}
              rawTitles={rawTitles}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-2 p-2 w-full">
        <div className="flex-1">
          <div id="article" className="p-8">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
              components={{
                h1: () => (
                  <h1 className="text-center text-2xl font-bold">{`(${category}) ${articleName}`}</h1>
                ),
                h2: ({ children, ...props }) =>
                  children ? (
                    <h2
                      id={generateSlug(
                        React.Children.toArray(children).join(""),
                      )}
                      {...props}
                    >
                      {children}
                    </h2>
                  ) : null,
                h3: ({ children, ...props }) =>
                  children ? (
                    <h3
                      id={generateSlug(
                        React.Children.toArray(children).join(""),
                      )}
                      {...props}
                    >
                      {children}
                    </h3>
                  ) : null,
                h4: ({ children, ...props }) =>
                  children ? (
                    <h4
                      id={generateSlug(
                        React.Children.toArray(children).join(""),
                      )}
                      {...props}
                    >
                      {children}
                    </h4>
                  ) : null,
                code: ({ children, className }) =>
                  className === "language-mermaid" ? (
                    <RenderMermaid>{children}</RenderMermaid>
                  ) : (
                    <RenderCodeBlock className={className}>
                      {children}
                    </RenderCodeBlock>
                  ),
                table: ({ children }) => (
                  <div className="overflow-x-auto p-4">
                    <table className="min-w-full table-auto border-collapse border border-gray-200">
                      {children}
                    </table>
                  </div>
                ),
                tr: ({ children }) => (
                  <tr className="border-t border-gray-200">{children}</tr>
                ),
                th: ({ children }) => (
                  <th className="px-4 py-2 text-left font-bold">{children}</th>
                ),
                td: ({ children }) => <td className="px-4 py-2">{children}</td>,
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>

        <div className="flex flex-col items-start gap-2">
          <button
            onClick={() => {
              console.log("redirect to edit page");
            }}
            className={btnGhost}
          >
            Edit
          </button>
        </div>
      </div>

      <div>
        <ScrollToTopButton />
      </div>
    </div>
  );
}
