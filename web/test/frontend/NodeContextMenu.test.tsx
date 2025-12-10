import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import NodeContextMenu from "../../src/app/NodeContextMenu";
import type { Node } from "../../src/app/types/graph";

describe("NodeContextMenu", () => {
  it("calls initArticle and closes menu when clicking Init", async () => {
    const node = { key: "n1", name: "Test node" } as Node;

    const closeMenu = vi.fn();
    const connectChildren = vi.fn();
    const initArticle = vi.fn().mockResolvedValue(undefined);

    render(
      <NodeContextMenu
        x={10}
        y={20}
        node={node}
        closeMenu={closeMenu}
        connectChildren={connectChildren}
        initArticle={initArticle}
      />,
    );

    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /init/i }));

    expect(initArticle).toHaveBeenCalledTimes(1);
    expect(initArticle).toHaveBeenCalledWith(node);
    expect(closeMenu).toHaveBeenCalledTimes(1);
    expect(connectChildren).not.toHaveBeenCalled();
  });
});
