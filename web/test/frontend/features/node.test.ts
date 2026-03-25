import { describe, it, expect, vi } from "vitest";

import type { Node } from "../../../src/types/graph";
import {
  handleNodeClickLogic,
  type NodeClickDeps,
} from "../../../src/components/client/graph";

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
  const openWindow = vi.fn();
  const setSelectedSource = vi.fn();
  const setPendingPair = vi.fn();
  const setShowOptions = vi.fn();

  const deps: NodeClickDeps = {
    setSelectedSource,
    openWindow,
    setPendingPair,
    setShowOptions,
  };

  return {
    deps,
    openWindow,
    setSelectedSource,
    setPendingPair,
    setShowOptions,
  };
};

describe("handleNodeClickLogic", () => {
  it("opens window when metaKey or ctrlKey pressed", () => {
    const node: Node = { name: "test", key: "https://example.com" };
    const event = makeEvent({ metaKey: true });
    const { deps, openWindow, setSelectedSource } = makeDeps();

    handleNodeClickLogic(event, node, null, deps);

    expect(event.stopPropagation).toHaveBeenCalled();
    expect(openWindow).toHaveBeenCalledWith("https://example.com");
    expect(setSelectedSource).not.toHaveBeenCalled();
  });

  it("clears selection when clicking the same selected node", () => {
    const node: Node = { name: "test", key: "a" };
    const event = makeEvent();
    const { deps, setSelectedSource, openWindow } = makeDeps();

    handleNodeClickLogic(event, node, node, deps);

    expect(event.stopPropagation).toHaveBeenCalled();
    expect(setSelectedSource).toHaveBeenCalledWith(null);
    expect(openWindow).not.toHaveBeenCalled();
  });

  it("selects node when nothing is selected", () => {
    const node: Node = { name: "test", key: "a" };
    const event = makeEvent();
    const { deps, setSelectedSource, openWindow } = makeDeps();

    handleNodeClickLogic(event, node, null, deps);

    expect(event.stopPropagation).toHaveBeenCalled();
    expect(setSelectedSource).toHaveBeenCalledWith(node);
    expect(openWindow).not.toHaveBeenCalled();
  });

  it("when another node is selected, it pops options", () => {
    const source: Node = { name: "test", key: "source" };
    const target: Node = { name: "test", key: "target" };
    const event = makeEvent();
    const {
      deps,
      setSelectedSource,
      setPendingPair,
      setShowOptions,
      openWindow,
    } = makeDeps();

    handleNodeClickLogic(event, target, source, deps);

    expect(event.stopPropagation).toHaveBeenCalled();
    expect(setPendingPair).toHaveBeenCalledWith({
      source,
      target,
    });
    expect(setSelectedSource).toHaveBeenCalledWith(null);
    expect(setShowOptions).toHaveBeenCalledWith(true);
    expect(openWindow).not.toHaveBeenCalled();
  });
});
