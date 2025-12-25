import { it, expect, vi, afterEach } from "vitest";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ComponentProps } from "react";

import NodeContextMenu from "../../src/components/NodeContextMenu";
import { get as getArticle } from "../../src/components/client/article";

type NodeT = ComponentProps<typeof NodeContextMenu>["node"];

const { getMock, createMock, destroyMock, redirectMock } = vi.hoisted(() => ({
  getMock:
    vi.fn<(key: string) => Promise<{ path: string; content: string } | null>>(),
  createMock: vi.fn<(node: NodeT) => Promise<void>>(),
  destroyMock: vi.fn<(key: string) => Promise<void>>(),
  redirectMock: vi.fn<(url: string) => void>(),
}));

vi.mock("../../src/components/client/article", async (importOriginal) => {
  const actual =
    await importOriginal<
      typeof import("../../src/components/client/article")
    >();

  return {
    ...actual,
    get: getMock,
    create: createMock,
    destroyArticle: destroyMock, // mock the same symbol NodeContextMenu calls
  };
});

vi.mock("../../src/components/client/graph", async (importOriginal) => {
  const mod =
    await importOriginal<typeof import("../../src/components/client/graph")>();
  return {
    ...mod,
    redirect: redirectMock,
  };
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

it('clicking "Init" calls create(node) and then closeMenu()', async () => {
  const user = userEvent.setup();
  const closeMenu = vi.fn();

  const node = {
    key: "content/articles/hello.md",
    name: "Hello",
  } satisfies NodeT;

  getMock.mockResolvedValueOnce(null);
  createMock.mockResolvedValueOnce(undefined);

  render(
    <NodeContextMenu
      node={node}
      closeMenu={closeMenu}
      connectChildren={vi.fn()}
      removeNode={vi.fn(async () => {})}
    />,
  );

  await waitFor(() => expect(getMock).toHaveBeenCalledWith(node.key));

  const initBtn = await screen.findByRole("button", { name: /init/i });
  await waitFor(() => expect(initBtn).not.toBeDisabled());

  await user.click(initBtn);

  await waitFor(() => expect(createMock).toHaveBeenCalledWith(node));
  await waitFor(() => expect(closeMenu).toHaveBeenCalledTimes(1));

  expect(createMock.mock.invocationCallOrder[0]).toBeLessThan(
    closeMenu.mock.invocationCallOrder[0],
  );
});

it('clicking "Edit" redirects', async () => {
  const user = userEvent.setup();

  const node = { key: "content/articles/中文", name: "x" } satisfies NodeT;

  vi.mocked(getArticle).mockResolvedValueOnce({ path: "p", content: "c" });

  render(
    <NodeContextMenu
      node={node}
      closeMenu={vi.fn()}
      connectChildren={vi.fn()}
      removeNode={vi.fn(async () => {})}
    />,
  );

  const editBtn = await screen.findByRole("button", { name: /edit/i });
  await waitFor(() => expect(editBtn).not.toBeDisabled());

  await user.click(editBtn);

  expect(redirectMock).toHaveBeenCalledTimes(1);

  const redirectedUrl = redirectMock.mock.calls[0][0];
  const fileName = node.key.split("/").pop()!;

  expect(redirectedUrl).toContain(
    `/keystatic/branch/main/collection/posts/item/${encodeURIComponent(fileName)}`,
  );
});

it('clicking "Destroy" calls removeNode(node) then closeMenu()', async () => {
  const user = userEvent.setup();

  // make menu enabled (hasArticle not null)
  vi.mocked(getArticle).mockResolvedValueOnce({ path: "p", content: "c" });

  const closeMenu = vi.fn();
  const removeNode = vi.fn(async (_n: NodeT) => {});

  const node = { key: "content/articles/中文.md", name: "x" } satisfies NodeT;

  render(
    <NodeContextMenu
      node={node}
      closeMenu={closeMenu}
      connectChildren={vi.fn()}
      removeNode={removeNode}
    />,
  );

  const destroyBtn = await screen.findByRole("button", { name: /destroy/i });
  await waitFor(() => expect(destroyBtn).not.toBeDisabled());

  await user.click(destroyBtn);

  await waitFor(() => expect(removeNode).toHaveBeenCalledWith(node));
  await waitFor(() => expect(closeMenu).toHaveBeenCalledTimes(1));

  // optional: ensure order (removeNode awaited before closeMenu)
  expect(removeNode.mock.invocationCallOrder[0]).toBeLessThan(
    closeMenu.mock.invocationCallOrder[0],
  );
});
