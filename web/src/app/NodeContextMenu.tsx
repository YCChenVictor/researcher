type MenuActionId = "decompose" | "close";

type NodeContextMenuProps = {
  x: number;
  y: number;
  onAction: (action: MenuActionId) => void | Promise<void>;
};

const NodeContextMenu: React.FC<NodeContextMenuProps> = ({
  x,
  y,
  onAction,
}) => {
  const options: { label: string; action: MenuActionId }[] = [
    { label: "Decompose", action: "decompose" },
    { label: "Close", action: "close" },
  ];

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
          onClick={() => onAction(opt.action)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};

export default NodeContextMenu;
