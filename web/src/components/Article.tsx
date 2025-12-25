"use client";

import React, { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import Link from "next/link";

import { get } from "./client/article";

import SidebarLayout from "./ArticleComponents/SidebarLayout";
import RenderCodeBlock from "./ArticleComponents/RenderCodeBlock";
import RenderMermaid from "./ArticleComponents/RenderMermaid";
import ScrollToTopButton from "./ArticleComponents/ScrollToTopButton";

type TitleItem = { content: string; tagName: string };

const generateSlug = (input: string) => {
  let str = input.trim().toLowerCase();
  str = str
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  return str;
};

const childrenToText = (children: React.ReactNode): string =>
  React.Children.toArray(children)
    .map((c) => {
      if (typeof c === "string" || typeof c === "number") return String(c);

      if (React.isValidElement<{ children?: React.ReactNode }>(c)) {
        return childrenToText(c.props.children);
      }

      return "";
    })
    .join("");

const extractTitles = (md: string): TitleItem[] => {
  const out: TitleItem[] = [];
  for (const line of md.split("\n")) {
    const m = line.match(/^(#{2,4})\s+(.+?)\s*$/);
    if (!m) continue;
    const level = m[1].length; // 2..4
    out.push({ tagName: `h${level}`, content: m[2] });
  }
  return out;
};

export default function Article({ filePath }: { filePath?: string }) {
  const [content, setContent] = useState("");

  const { articleName, category } = useMemo(() => {
    if (!filePath) return { articleName: "undefined", category: "base" };
    const parts = filePath.split("/").filter(Boolean);
    return {
      articleName: parts.at(-1) ?? "undefined",
      category: parts.at(-2) ?? "base",
    };
  }, [filePath]);

  // Only fetch when filePath exists; no "reset setState" in the effect.
  useEffect(() => {
    if (!filePath) return;

    let cancelled = false;

    (async () => {
      try {
        const r = await get(filePath);
        if (cancelled) return;
        setContent(r?.content ?? "");
      } catch (err) {
        if (!cancelled) console.error(err);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [filePath]);

  // Derive UI state from inputs, instead of setting it in the effect.
  const shownContent = filePath ? content : "";

  const rawTitles = useMemo(
    () => (shownContent ? extractTitles(shownContent) : []),
    [shownContent],
  );

  if (!filePath) return null;

  return (
    <div className="min-h-screen bg-slate-600 text-slate-100">
      <div className="sticky top-0 z-20 border-b border-slate-800/80 bg-slate-600/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="min-w-0">
            <div className="truncate text-sm text-slate-400">{category}</div>
            <div className="truncate text-lg font-semibold text-slate-100">
              {articleName}
            </div>
          </div>

          <Link
            href="/"
            className="inline-flex h-9 items-center rounded-lg border border-slate-700 bg-slate-900 px-3 text-sm font-medium text-slate-100 hover:bg-slate-800"
          >
            Home
          </Link>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl gap-4 px-4 py-6">
        <aside className="hidden lg:block w-72 shrink-0">
          <SidebarLayout
            isCollapsed={false}
            articleContent={shownContent}
            rawTitles={rawTitles}
          />
        </aside>

        <main className="min-w-0 flex-1">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 shadow-sm">
            <div id="article" className="p-6 lg:p-10">
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                  h1: () => null,

                  h2: ({ node: _node, children, ...props }) =>
                    children ? (
                      <h2
                        {...props}
                        className="mt-10 scroll-mt-24 text-xl font-semibold text-slate-100"
                        id={generateSlug(childrenToText(children))}
                      >
                        {children}
                      </h2>
                    ) : null,

                  h3: ({ node: _node, children, ...props }) =>
                    children ? (
                      <h3
                        {...props}
                        className="mt-8 scroll-mt-24 text-lg font-semibold text-slate-100"
                        id={generateSlug(childrenToText(children))}
                      >
                        {children}
                      </h3>
                    ) : null,

                  h4: ({ node: _node, children, ...props }) =>
                    children ? (
                      <h4
                        {...props}
                        className="mt-6 scroll-mt-24 text-base font-semibold text-slate-100"
                        id={generateSlug(childrenToText(children))}
                      >
                        {children}
                      </h4>
                    ) : null,

                  p: ({ children }) => (
                    <p className="mt-4 leading-7 text-slate-200">{children}</p>
                  ),

                  a: ({ children, ...props }) => (
                    <a
                      {...props}
                      className="text-sky-300 underline underline-offset-4 hover:text-sky-200"
                    >
                      {children}
                    </a>
                  ),

                  table: ({ children }) => (
                    <div className="mt-6 overflow-x-auto rounded-lg border border-slate-800">
                      <table className="min-w-full table-auto border-collapse">
                        {children}
                      </table>
                    </div>
                  ),

                  tr: ({ children }) => (
                    <tr className="border-t border-slate-800">{children}</tr>
                  ),

                  th: ({ children }) => (
                    <th className="bg-slate-600/40 px-4 py-2 text-left text-sm font-semibold text-slate-200">
                      {children}
                    </th>
                  ),

                  td: ({ children }) => (
                    <td className="px-4 py-2 text-sm text-slate-300">
                      {children}
                    </td>
                  ),

                  code: ({ children, className }) =>
                    className === "language-mermaid" ? (
                      <RenderMermaid>{children}</RenderMermaid>
                    ) : (
                      <RenderCodeBlock className={className}>
                        {children}
                      </RenderCodeBlock>
                    ),
                }}
              >
                {shownContent}
              </ReactMarkdown>
            </div>
          </div>
        </main>
      </div>

      <ScrollToTopButton />
    </div>
  );
}
