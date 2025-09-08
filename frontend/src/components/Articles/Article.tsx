import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import { marked } from "marked";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import SidebarLayout from "./SidebarLayout";
import RenderCodeBlock from "../RenderCodeBlock";
import RenderMermaid from "../RenderMermaid";
import ScrollToTopButton from "../ScrollToTopButton";
import LinkPage from "../LinkPage";
import nodeStructure from "../../node-structure.json";
import remarkGfm from "remark-gfm";

const btn =
  "inline-flex h-9 items-center gap-1 rounded-lg border px-3 text-sm font-medium transition-colors " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-1 " +
  "disabled:opacity-50 disabled:cursor-not-allowed";
const btnGhost = `${btn} border-slate-300 bg-white text-slate-700 hover:bg-slate-50`;
const btnPrimary = `${btn} border-transparent bg-slate-900 text-white hover:bg-slate-800`;

const Article = ({ filePath }: { filePath: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<string>("");
  const [rawTitles, setRawTitles] = useState<
    { content: string; tagName: string }[]
  >([]);

  const componentSidebarRef = useRef(null);
  const filePathSplit = "filePath".split("/");
  const articleName = filePathSplit.pop() || "undefined";
  let category = filePathSplit.pop();
  if (!category) {
    category = "base";
  }

  const renderArticle = (
    <div id="article" className="p-8">
      <div>
        <ReactMarkdown
          components={{
            h1: () => (
              <h1 className="text-center">{`(${category}) ${articleName}`}</h1>
            ),
            h2: ({ children, ...props }) =>
              children ? (
                <h2
                  id={generateSlug(React.Children.toArray(children).join(""))}
                  {...props}
                >
                  {children}
                </h2>
              ) : null,
            h3: ({ children, ...props }) =>
              children ? (
                <h3
                  id={generateSlug(React.Children.toArray(children).join(""))}
                  {...props}
                >
                  {children}
                </h3>
              ) : null,
            h4: ({ children, ...props }) =>
              children ? (
                <h4
                  id={generateSlug(React.Children.toArray(children).join(""))}
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
            span: ({ ...props }) => <span {...props} />,
          }}
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );

  const fetchFile = async () => {
    console.log("zxvxzzvxczcvx")
    const url = `${process.env.REACT_APP_BACKEND_URL}/articles/content?file=${encodeURIComponent(filePath)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch file");

    const text = await res.text();
    return JSON.parse(text).content;
  };

  const startEdit = () => {
    setDraft(content);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setDraft("");
  };

  const save = async () => {
    try {
      setSaving(true);
      const res = await fetch(
        `http://localhost:5000/articles/content?path=${encodeURIComponent(filePath)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: "testing", content }),
        },
      );
      if (!res.ok) throw new Error(await res.text());
      setIsEditing(false);
    } catch (error) {
      alert(`Save failed: ${error}`);
    } finally {
      setSaving(false);
    }
  };

  const parseArticle = async () => {
    try {
      const parsedHTML = await marked.parse(content);
      const container = document.createElement("div");
      container.innerHTML = parsedHTML;
      const tags = Array.from(
        container.querySelectorAll("h2, h3, h4, h5, h6"),
      ).map((tag) => ({
        content: tag.textContent || "",
        tagName: tag.tagName,
      }));
      setRawTitles(tags);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // get article content
    fetchFile().then(setContent).catch(console.error);

    parseArticle().catch((error) => {
      console.log(error);
    });
  }, []);

  const generateSlug = (string: string) => {
    let str = string.replace(/^\s+|\s+$/g, "");
    str = str.toLowerCase();
    str = str
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    return str;
  };

  return (
    <div className="bg-gray-400 flex min-h-screen w-full">
      <div className="" ref={componentSidebarRef}>
        <div className="sticky top-0 h-screen overflow-y-auto">
          <div className="hidden lg:block">
            {/* <LinkPage
              self={`${category}/${articleName}`}
              allNodes={nodeStructure.nodes.map((item) => item.key)}
              // parents={parents}
              // children={children}
            /> */}
            <div className="p-2">
              <SidebarLayout
                isCollapsed={false}
                articleContent={content}
                rawTitles={rawTitles}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 p-2">
        {isEditing ? (
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="w-full h-[70vh] font-mono text-sm p-3 border rounded-lg bg-white"
            spellCheck={false}
          />
        ) : (
          <div>{renderArticle}</div>
        )}
        <div className="flex items-center gap-2">
          {!isEditing ? (
            <button onClick={startEdit} className={btnGhost}>
              Edit
            </button>
          ) : (
            <>
              <button
                onClick={save}
                disabled={saving}
                className={`${btnPrimary} min-w-[5.5rem]`} // prevents width jump
                aria-busy={saving}
              >
                {saving ? "Saving…" : "Save"}
              </button>
              <button
                onClick={cancelEdit}
                disabled={saving}
                className={btnGhost}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
      <div className="lg:hidden"> </div>
      <div>
        <ScrollToTopButton />
      </div>
    </div>
  );
};

export default Article;
