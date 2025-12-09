import { describe, it, expect, vi } from "vitest";
import * as d3 from "d3";

import {
  createShowContextMenu,
  handleNodeClickLogic,
  showContextMenu,
  ShowContextMenuDeps,
  type NodeClickDeps,
} from "../../../src/app/features/nodes";

import { Node } from "../../../src/app/types/graph";

type MenuItemDatum = {
  label: string;
  onClick: () => void;
};

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

describe("showContextMenu", () => {
  it("creates a context menu and logs on click", () => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    document.body.appendChild(svg);

    const zoomG = d3.select<SVGSVGElement, unknown>(svg).append("g");
    const log = vi.fn();

    const node: Node = {
      key: "id-1",
      name: "Node 1",
      color: "#f00",
      x: 100,
      y: 50,
    };

    const showContextMenu = createShowContextMenu(zoomG, log);

    showContextMenu(node);

    const menus = zoomG.selectAll<SVGGElement, unknown>(".node-context-menu");
    expect(menus.size()).toBe(1);

    const texts = menus.selectAll<SVGTextElement, MenuItemDatum>("text");
    expect(texts.size()).toBe(1);
    expect(texts.text()).toBe("Decompose");

    const textEl = texts.node();
    expect(textEl).not.toBeNull();

    textEl!.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(log).toHaveBeenCalledWith("Decompose", node);
    expect(
      zoomG.selectAll<SVGGElement, unknown>(".node-context-menu").size(),
    ).toBe(0);
  });
});
