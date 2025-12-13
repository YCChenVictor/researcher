import { useEffect, useMemo, useState } from "react";

import type { Node } from "../app/types/graph";
import { decompose } from "./client/graph";
import { get } from "./client/article";

export type MenuActionId = "decompose" | "view" | "edit" | "init" | "close";

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

  const doNavigate = useMemo(
    () => navigate ?? ((url: string) => window.location.assign(url)),
    [navigate],
  );

  const options = useMemo(() => {
    const extra =
      hasArticle === null
        ? []
        : hasArticle
          ? ([
              { label: "View", action: "view" as const },
              { label: "Edit", action: "edit" as const },
            ] as const)
          : ([{ label: "Init", action: "init" as const }] as const);

    return [
      { label: "Decompose", action: "decompose" as const },
      ...extra,
      { label: "Close", action: "close" as const },
    ];
  }, [hasArticle]);

  const handleClick = async (action: MenuActionId) => {
    switch (action) {
      case "close":
        closeMenu();
        return;

      case "init":
        await initArticle(node);
        closeMenu();
        return;

      case "view":
        doNavigate(`/article?file=${encodeURIComponent(node.key)}`);
        closeMenu();
        return;

      case "edit":
        doNavigate(toTinaDocEditUrl(node.key));
        closeMenu();
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
