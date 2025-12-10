import { describe, it, expect, vi } from "vitest";

import {
  handleNodeClickLogic,
  type NodeClickDeps,
} from "../../../src/app/client/graph";

const makeEvent = (
  overrides: Partial<{ metaKey: boolean; ctrlKey: boolean }> = {},
) => {
  return {
    stopPropagation: vi.fn(),
    metaKey: false,
    ctrlKey: false,
    ...overrides,
  };
};

const makeDeps = () => {
  const setSelectedSource = vi.fn();
  const addLink = vi.fn();
  const openWindow = vi.fn();
  const deps: NodeClickDeps = {
    setSelectedSource,
    addLink,
    openWindow,
  };
  return { deps, setSelectedSource, addLink, openWindow };
};

describe("handleNodeClickLogic", () => {
  it("opens window when metaKey or ctrlKey pressed", () => {
    const node: TestNode = { key: "https://example.com" };
    const event = makeEvent({ metaKey: true });
    const { deps, openWindow, setSelectedSource, addLink } = makeDeps();

    handleNodeClickLogic(event, node, null, deps);

    expect(event.stopPropagation).toHaveBeenCalled();
    expect(openWindow).toHaveBeenCalledWith("https://example.com");
    expect(setSelectedSource).not.toHaveBeenCalled();
    expect(addLink).not.toHaveBeenCalled();
  });

  it("clears selection when clicking the same selected node", () => {
    const node: TestNode = { key: "a" };
    const event = makeEvent();
    const { deps, setSelectedSource, addLink, openWindow } = makeDeps();

    handleNodeClickLogic(event, node, node, deps);

    expect(event.stopPropagation).toHaveBeenCalled();
    expect(setSelectedSource).toHaveBeenCalledWith(null);
    expect(addLink).not.toHaveBeenCalled();
    expect(openWindow).not.toHaveBeenCalled();
  });

  it("selects node when nothing is selected", () => {
    const node: TestNode = { key: "a" };
    const event = makeEvent();
    const { deps, setSelectedSource, addLink, openWindow } = makeDeps();

    handleNodeClickLogic(event, node, null, deps);

    expect(event.stopPropagation).toHaveBeenCalled();
    expect(setSelectedSource).toHaveBeenCalledWith(node);
    expect(addLink).not.toHaveBeenCalled();
    expect(openWindow).not.toHaveBeenCalled();
  });

  it("creates link when another node is selected", () => {
    const source: TestNode = { key: "source" };
    const target: TestNode = { key: "target" };
    const event = makeEvent();
    const { deps, setSelectedSource, addLink, openWindow } = makeDeps();

    handleNodeClickLogic(event, target, source, deps);

    expect(event.stopPropagation).toHaveBeenCalled();
    expect(addLink).toHaveBeenCalledWith(source, target);
    expect(setSelectedSource).toHaveBeenCalledWith(null);
    expect(openWindow).not.toHaveBeenCalled();
  });
});
