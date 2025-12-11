import type { Node } from "./types/graph";
import { decompose } from "./client/graph";

export type MenuActionId = "decompose" | "init" | "close";

type NodeContextMenuProps = {
  x: number;
  y: number;
  node: Node;
  closeMenu: () => void;
  connectChildren: (parent: Node, titles: string[]) => void;
  initArticle: (node: Node) => void | Promise<void>;
};

const NodeContextMenu: React.FC<NodeContextMenuProps> = ({
  x,
  y,
  node,
  closeMenu,
  connectChildren,
  initArticle,
}) => {
  const options: { label: string; action: MenuActionId }[] = [
    { label: "Decompose", action: "decompose" },
    { label: "Init", action: "init" },
    { label: "Close", action: "close" },
  ];

  const handleClick = async (action: MenuActionId) => {
    switch (action) {
      case "close":
        closeMenu();
        return;

      case "init":
        await initArticle(node);
        closeMenu();
        return;

      case "decompose":
        try {
          const titles = await decompose(node);
          connectChildren(node, titles);
        } catch (err) {
          console.error("Decompose error", err);
        } finally {
          closeMenu();
        }
        return;
    }
  };

  return (
    <div
      className="absolute bg-slate-50 text-slate-900 border rounded shadow text-sm z-20"
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
