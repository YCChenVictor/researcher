import type { Link } from "../types/graph";

export default function LinkContextMenu(props: {
  link: Link;
  x: number;
  y: number;
  closeMenu: () => void;
  removeLink: (l: Link) => Promise<void> | void;
}) {
  const { x, y, link, closeMenu, removeLink } = props;

  return (
    <div
      className="fixed inset-0 z-50"
      onClick={closeMenu}
      onContextMenu={(e) => {
        e.preventDefault();
        closeMenu();
      }}
    >
      <div
        className="absolute w-56 rounded-xl border bg-slate-50 text-slate-900 shadow-lg"
        style={{ left: x, top: y }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="w-full text-left px-3 py-2 hover:bg-slate-100 rounded-xl"
          onClick={() => {
            void removeLink(link);
          }}
        >
          Remove link
        </button>
      </div>
    </div>
  );
}
