import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";

import { Runtime, LinkSim, Node } from "../../../src/types/graph";
import * as graph from "../../../src/components/client/graph";

const endKey = (end: LinkSim["source"] | LinkSim["target"]): string =>
  typeof end === "string"
    ? end
    : typeof end === "number"
      ? String(end)
      : end.key;

const makeSel = () => ({
  selectAll: vi.fn().mockReturnThis(),
  data: vi.fn().mockReturnThis(),
  join: vi.fn().mockReturnThis(),
  append: vi.fn().mockReturnThis(),
  attr: vi.fn().mockReturnThis(),
  style: vi.fn().mockReturnThis(),
  classed: vi.fn().mockReturnThis(),
  text: vi.fn().mockReturnThis(),
  on: vi.fn().mockReturnThis(),
  call: vi.fn().mockReturnThis(),
});

const mockPersistOk = () =>
  vi.spyOn(globalThis, "fetch").mockResolvedValue(
    new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }),
  );

const makeLinkForce = () => ({
  id: vi.fn().mockReturnThis(),
  links: vi.fn().mockReturnThis(),
});

const makeSim = (linkForce: ReturnType<typeof makeLinkForce>) => {
  const simForceSpy = vi.fn((name?: string) =>
    name === "link" ? linkForce : null,
  );

  const simAlphaSpy = vi.fn();
  const simRestartSpy = vi.fn();

  const simulation = {
    force: simForceSpy,
    alpha: simAlphaSpy,
    restart: simRestartSpy,
  } as unknown as Runtime["simulation"];

  vi.mocked(simAlphaSpy).mockReturnValue(simulation);

  return { simulation, simForceSpy, simAlphaSpy, simRestartSpy };
};

// ---------- test lifecycle ----------

beforeEach(() => {
  vi.restoreAllMocks();
});

afterEach(() => {
  vi.restoreAllMocks();
});

// ---------- tests ----------

describe("removeNode", () => {
  it("removes node + related links, restarts sim, persists, clears menu", async () => {
    const fetchSpy = mockPersistOk();

    const a: Node = { key: "a", name: "A" };
    const b: Node = { key: "b", name: "B" };
    const c: Node = { key: "c", name: "C" };

    const simNodesSpy = vi.fn();

    const linkForce = makeLinkForce();
    const { simulation, simForceSpy, simAlphaSpy, simRestartSpy } =
      makeSim(linkForce);

    // removeNode expects simulation.nodes(...) exists
    simulation.nodes = simNodesSpy;

    const sel = makeSel();
    const drag = vi.fn((_sel: unknown) => undefined);

    const rt = {
      selectedSource: b,
      nodes: [a, b, c],
      links: [
        { source: a, target: b },
        { source: b, target: c },
        { source: a, target: c },
      ],
      simulation,

      linkGroup: sel,
      nodeGroup: sel,
      labelGroup: sel,

      nodeSel: sel,
      labelSel: sel,

      drag,
      setMenu: vi.fn(),
    } as unknown as Runtime;

    const handlers = {} as ReturnType<typeof graph.createNodeInteractions>;

    await graph.removeNode(rt, b, handlers);

    expect(rt.selectedSource).toBeNull();

    expect(rt.nodes.map((n) => n.key)).toEqual(["a", "c"]);
    expect(
      rt.links.map((l) => `${endKey(l.source)}->${endKey(l.target)}`),
    ).toEqual(["a->c"]);

    expect(simNodesSpy).toHaveBeenCalledWith(rt.nodes);

    expect(simForceSpy).toHaveBeenCalledWith("link");
    expect(linkForce.id).toHaveBeenCalled();
    expect(linkForce.links).toHaveBeenCalledWith(rt.links);

    expect(simAlphaSpy).toHaveBeenCalledWith(1);
    expect(simRestartSpy).toHaveBeenCalled();

    expect(fetchSpy).toHaveBeenCalled(); // persistGraph POST
    expect(rt.setMenu).toHaveBeenCalledWith(null);
  });
});

describe("removeLink", () => {
  it("removes link, rebinds force, updates, restarts sim, persists, clears menu", async () => {
    const fetchSpy = mockPersistOk();

    const a: Node = { key: "a", name: "A" };
    const b: Node = { key: "b", name: "B" };
    const c: Node = { key: "c", name: "C" };

    const linkForce = makeLinkForce();
    const { simulation, simForceSpy, simAlphaSpy, simRestartSpy } =
      makeSim(linkForce);

    const sel = makeSel();

    const rt = {
      nodes: [a, b, c],
      links: [
        { source: a, target: b },
        { source: b, target: c },
        { source: a, target: c },
      ],
      simulation,

      linkGroup: sel,
      nodeGroup: sel,
      labelGroup: sel,

      nodeSel: sel,
      labelSel: sel,

      setMenu: vi.fn(),
    } as unknown as Runtime;

    const handlers = {} as ReturnType<typeof graph.createNodeInteractions>;
    const toRemove: LinkSim = { source: a, target: b };

    await graph.removeLink(rt, toRemove, handlers);

    expect(
      rt.links.map((l) => `${endKey(l.source)}->${endKey(l.target)}`),
    ).toEqual(["b->c", "a->c"]);

    expect(simForceSpy).toHaveBeenCalledWith("link");
    expect(linkForce.id).toHaveBeenCalled();
    expect(linkForce.links).toHaveBeenCalledWith(rt.links);

    // updateLinks/updateNodes should have run (they touch selections)
    expect(sel.selectAll).toHaveBeenCalled();

    expect(simAlphaSpy).toHaveBeenCalledWith(1);
    expect(simRestartSpy).toHaveBeenCalled();

    expect(fetchSpy).toHaveBeenCalled(); // persistGraph POST
    expect(rt.setMenu).toHaveBeenCalledWith(null);
  });
});
