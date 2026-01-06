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
          // Will truly enable it after enough budget
          if (process.env.NODE_ENV === "development") {
            // eslint-disable-next-line no-console
            console.log(titles);
          } else {
            connectChildren(node, titles);
          }
        } finally {
          closeMenu();
        }
        return;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-md"
      onClick={closeMenu}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="mt-20 w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/90 text-zinc-100 shadow-2xl ring-1 ring-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative px-5 py-4 border-b border-white/10">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-sm font-semibold tracking-tight">
                Actions
              </div>
              <div className="mt-1 text-xs text-zinc-400 break-all">
                {node.key}
              </div>
            </div>
            <button
              type="button"
              aria-label="Close"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full
                       text-zinc-300 hover:text-zinc-100 hover:bg-white/10
                       focus:outline-none focus:ring-2 focus:ring-indigo-400/70 focus:ring-offset-0"
              onClick={(e) => {
                e.stopPropagation();
                closeMenu();
              }}
            >
              <span className="text-xl leading-none">×</span>
            </button>
          </div>
        </div>
        <div className="p-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {/* Left: Init / View / Edit / Destroy */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
              <div className="px-4 py-2.5 border-b border-white/10">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                  Manage
                </div>
              </div>

              <div className="p-1">
                {options.map((opt) => {
                  if (!["init", "view", "edit", "destroy"].includes(opt.action))
                    return null;

                  return (
                    <button
                      key={opt.action}
                      type="button"
                      className="group w-full text-left rounded-xl px-4 py-3
                         border border-transparent hover:border-white/10 hover:bg-white/5
                         focus:outline-none focus:ring-2 focus:ring-indigo-400/70
                         disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:border-transparent"
                      onClick={() => void handleClick(opt.action)}
                      disabled={hasArticle === null}
                    >
                      <div className="text-sm font-medium text-zinc-100">
                        {opt.label}
                      </div>
                      <div className="mt-0.5 text-xs text-zinc-400">
                        {opt.hint}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
              <div className="px-4 py-2.5 border-b border-white/10">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                  Decompose
                </div>
              </div>

              <div className="p-1">
                <button
                  type="button"
                  className="group w-full text-left rounded-xl px-4 py-3
                     border border-transparent hover:border-white/10 hover:bg-white/5
                     focus:outline-none focus:ring-2 focus:ring-indigo-400/70
                     disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:border-transparent"
                  onClick={() => void handleClick("decompose")}
                  disabled={hasArticle === null}
                >
                  <div className="text-sm font-medium text-zinc-100">
                    Decompose
                  </div>
                  <div className="mt-0.5 text-xs text-zinc-400">
                    Ask AI to generate child topics and link them under this
                    node.
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NodeContextMenu;
