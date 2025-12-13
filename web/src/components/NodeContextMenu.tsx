import type { Node } from "../app/types/graph";
import { decompose } from "../app/client/graph";
import { get } from "../app/client/article";
import { useEffect, useMemo, useState } from "react";

export type MenuActionId = "decompose" | "init" | "close" | "edit";

type NodeContextMenuProps = {
  x: number;
  y: number;
  node: Node;
  closeMenu: () => void;
  connectChildren: (parent: Node, titles: string[]) => void;
  initArticle: (node: Node) => void | Promise<void>;
  navigate?: (url: string) => void;
  getArticle?: (key: string) => Promise<unknown | null>;
};

const encodePath = (p: string) =>
  p.split("/").map(encodeURIComponent).join("/");

const toTinaDocEditUrl = (fullPath: string) => {
  const collection = "post";
  const baseDir = "content/articles/";
  const relative = fullPath.startsWith(baseDir)
    ? fullPath.slice(baseDir.length)
    : fullPath;
  return `/edit/index.html#/collections/edit/${collection}/${encodePath(relative)}`;
};

const NodeContextMenu: React.FC<NodeContextMenuProps> = ({
  x,
  y,
  node,
  closeMenu,
  connectChildren,
  initArticle,
  navigate,
  getArticle,
}) => {
  const [hasArticle, setHasArticle] = useState<boolean | null>(null);

  useEffect(() => {
    let alive = true;
    setHasArticle(null);

    (async () => {
      try {
        const article = await (getArticle ?? get)(node.key);
        if (!alive) return;
        setHasArticle(article != null);
      } catch {
        if (!alive) return;
        setHasArticle(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [node.key, getArticle]);

  const options = useMemo(() => {
    const initOrEdit =
      hasArticle === null
        ? []
        : hasArticle
          ? [{ label: "Edit", action: "edit" as const }]
          : [{ label: "Init", action: "init" as const }];

    return [
      { label: "Decompose", action: "decompose" as const },
      ...initOrEdit,
      { label: "Close", action: "close" as const },
    ];
  }, [hasArticle]);

  const doNavigate = navigate ?? ((url: string) => window.location.assign(url));

  const handleClick = async (action: MenuActionId) => {
    switch (action) {
      case "close":
        closeMenu();
        return;
      case "init":
        await initArticle(node);
        closeMenu();
        return;
      case "edit":
        doNavigate(toTinaDocEditUrl(node.key));
        return;
      case "decompose":
        try {
          const titles = await decompose(node);
          connectChildren(node, titles);
        } finally {
          closeMenu();
        }
        return;
    }
  };

  return (
    <div
      className="absolute z-20 bg-slate-50 text-slate-900 border rounded shadow text-sm"
      style={{ left: x, top: y }}
      onClick={(e) => e.stopPropagation()}
    >
      {options.map((opt) => (
        <button
          key={opt.action}
          className="block w-full text-left px-3 py-1 hover:bg-slate-100"
          onClick={() => void handleClick(opt.action)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};

export default NodeContextMenu;
