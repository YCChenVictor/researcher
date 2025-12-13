import { it, expect, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import NodeContextMenu from "../../src/components/NodeContextMenu";

const { getMock } = vi.hoisted(() => ({ getMock: vi.fn() }));

vi.mock("../services/articles", () => ({
  get: getMock,
}));

it('clicking "Init" calls initArticle(node) and then closeMenu()', async () => {
  const getArticle = vi
    .fn<(key: string) => Promise<unknown | null>>()
    .mockResolvedValue(null); // => show "Init"

  const closeMenu = vi.fn();
  const initArticle = vi
    .fn<
      (n: React.ComponentProps<typeof NodeContextMenu>["node"]) => Promise<void>
    >()
    .mockResolvedValue(undefined);

  const node = {
    key: "content/articles/hello.md",
    name: "Hello",
  } as React.ComponentProps<typeof NodeContextMenu>["node"];

  render(
    <NodeContextMenu
      x={0}
      y={0}
      node={node}
      closeMenu={closeMenu}
      connectChildren={vi.fn()}
      initArticle={initArticle}
      getArticle={getArticle}
    />,
  );

  fireEvent.click(await screen.findByRole("button", { name: "Init" }));

  await waitFor(() => {
    expect(initArticle).toHaveBeenCalledWith(node);
    expect(closeMenu).toHaveBeenCalledTimes(1);
  });
});

it('clicking "Edit" redirects (via injected navigate)', async () => {
  const navigate = vi.fn<(url: string) => void>();
  const getArticle = vi
    .fn<(key: string) => Promise<unknown | null>>()
    .mockResolvedValue({}); // ✅ exists => Edit

  render(
    <NodeContextMenu
      x={0}
      y={0}
      node={
        { key: "content/articles/dir a/中文 & stuff.md", name: "x" } as never
      }
      closeMenu={vi.fn()}
      connectChildren={vi.fn()}
      initArticle={vi.fn()}
      navigate={navigate}
      getArticle={getArticle}
    />,
  );

  fireEvent.click(await screen.findByRole("button", { name: "Edit" }));

  expect(navigate).toHaveBeenCalledWith(
    "/edit/index.html#/collections/edit/post/dir%20a/%E4%B8%AD%E6%96%87%20%26%20stuff.md",
  );
});
