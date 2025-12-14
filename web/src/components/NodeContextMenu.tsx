import { useEffect, useMemo, useState } from "react";

import type { Node } from "../types/graph";
import { decompose } from "./client/graph";
import { get } from "./client/article";

export type MenuActionId = "decompose" | "view" | "edit" | "init" | "close";

type MenuOption = {
  label: string;
  action: MenuActionId;
  hint: string;
};

type NodeContextMenuProps = {
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

  const options = useMemo<MenuOption[]>(() => {
    const base: MenuOption[] = [
      {
        label: "Decompose",
        action: "decompose",
        hint: "Ask AI to generate child topics and link them under this node.",
      },
    ];

    if (hasArticle === null) {
      return [
        ...base,
        { label: "Close", action: "close", hint: "Dismiss this menu." },
      ];
    }

    const extra: MenuOption[] = hasArticle
      ? [
          {
            label: "View",
            action: "view",
            hint: "Open the article read page for this node.",
          },
          {
            label: "Edit",
            action: "edit",
            hint: "Open this file in Tina editor to edit content.",
          },
        ]
      : [
          {
            label: "Init",
            action: "init",
            hint: "Create a new article file for this node (if it doesn’t exist).",
          },
        ];

    return [
      ...base,
      ...extra,
      { label: "Close", action: "close", hint: "Dismiss this menu." },
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
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
      onClick={closeMenu}
    >
      <div
        className="mx-auto mt-24 w-[min(520px,calc(100%-2rem))] rounded-xl border bg-slate-50 text-slate-900 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 py-3 border-b">
          <div className="text-sm font-medium">Actions</div>
          <div className="text-xs text-slate-500 break-all">{node.key}</div>
        </div>

        <div className="p-2">
          {options.map((opt) => (
            <button
              key={opt.action}
              className="w-full text-left px-3 py-2 rounded hover:bg-slate-100 disabled:opacity-60"
              onClick={() => void handleClick(opt.action)}
              disabled={hasArticle === null && opt.action !== "close"}
            >
              <div className="text-sm font-medium">{opt.label}</div>
              <div className="text-xs text-slate-600">{opt.hint}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NodeContextMenu;
