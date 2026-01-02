import { useEffect, useMemo, useState } from "react";

import type { Node } from "../types/graph";

import { decompose, redirect } from "./client/graph";
import {
  create,
  get as getArticle,
  destroy as destroyArticle,
} from "./client/article";

export type MenuActionId =
  | "decompose"
  | "view"
  | "edit"
  | "init"
  | "close"
  | "destroy";

type MenuOption = {
  label: string;
  action: MenuActionId;
  hint: string;
};

type NodeContextMenuProps = {
  node: Node;
  closeMenu: () => void;
  connectChildren: (parent: Node, titles: string[]) => void;
  removeNode: (n: Node) => Promise<void>;
};

const toKeystaticEntryEditUrl = (fullPath: string) => {
  const collectionKey = "posts";

  const p = fullPath.replaceAll("\\", "/").replace(/^\/+/, "");
  const last = p.split("/").filter(Boolean).at(-1) ?? "";
  const key = last.includes(".") ? last.slice(0, last.lastIndexOf(".")) : last;

  return `/keystatic/branch/main/collection/${collectionKey}/item/${encodeURIComponent(key)}`;
};

const NodeContextMenu: React.FC<NodeContextMenuProps> = ({
  node,
  closeMenu,
  connectChildren,
  removeNode,
}) => {
  const [hasArticle, setHasArticle] = useState<boolean | null>(null);

  useEffect(() => {
    let alive = true;
    setHasArticle(null);

    (async () => {
      try {
        console.log("xzcvxzvc");
        console.log(node.key);
        const article = await getArticle(`${node.key}`);
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
  }, [node.key]);

  const options = useMemo<MenuOption[]>(() => {
    const base: MenuOption[] = [
      {
        label: "Decompose",
        action: "decompose",
        hint: "Ask AI to generate child topics and link them under this node.",
      },
      {
        label: "Destroy",
        action: "destroy",
        hint: "Destroy this node and article file.",
      },
    ];

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

    return [...base, ...extra];
  }, [hasArticle]);

  const handleClick = async (action: MenuActionId) => {
    switch (action) {
      case "destroy":
        await Promise.allSettled([removeNode(node), destroyArticle(node.key)]);
        closeMenu();
        return;
      case "close":
        closeMenu();
        return;
      case "init":
        await create(node);
        closeMenu();
        return;
      case "view":
        redirect(`/articles/${encodeURIComponent(node.key)}`);
        return;
      case "edit":
        redirect(toKeystaticEntryEditUrl(node.key));
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
        <div className="px-4 py-3 border-b relative">
          <div className="text-sm font-medium">Actions</div>
          <div className="text-xs text-slate-500 break-all pr-10">
            {node.key}
          </div>

          <button
            type="button"
            aria-label="Close"
            className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded hover:bg-slate-100"
            onClick={(e) => {
              e.stopPropagation();
              closeMenu();
            }}
          >
            ×
          </button>
        </div>

        <div className="p-2">
          {options.map((opt) => (
            <button
              key={opt.action}
              type="button"
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
