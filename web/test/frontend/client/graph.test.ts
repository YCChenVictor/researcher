import { describe, it, expect, vi, afterEach } from "vitest";

import { Runtime, Link, Node } from "../../../src/types/graph";
import * as graph from "../../../src/components/client/graph";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("removeNode", () => {
  it("removes node + related links, restarts sim, persists, clears menu", async () => {
    // ✅ stop real network + avoid "Invalid URL" from undici
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    const endKey = (end: Link["source"] | Link["target"]): string =>
      typeof end === "string"
        ? end
        : typeof end === "number"
          ? String(end)
          : end.key;

    const a: Node = { key: "a", name: "A" };
    const b: Node = { key: "b", name: "B" };
    const c: Node = { key: "c", name: "C" };

    const simNodesSpy = vi.fn();

    // bindLinkForce calls: simulation.force("link").id(...).links(links)
    const linkForce = {
      id: vi.fn().mockReturnThis(),
      links: vi.fn().mockReturnThis(),
    };
    const simForceSpy = vi.fn((name?: string) =>
      name === "link" ? linkForce : null,
    );

    const simRestartSpy = vi.fn();
    const simAlphaSpy = vi.fn();

    const simulation = {
      nodes: simNodesSpy,
      force: simForceSpy,
      alpha: simAlphaSpy,
      restart: simRestartSpy,
    } as unknown as Runtime["simulation"];

    // alpha(1).restart()
    vi.mocked(simAlphaSpy).mockReturnValue(simulation);

    // chainable d3-selection stub for updateLinks/updateNodes
    const sel = {
      selectAll: vi.fn().mockReturnThis(),
      data: vi.fn().mockReturnThis(),
      join: vi.fn().mockReturnThis(),
      append: vi.fn().mockReturnThis(),
      attr: vi.fn().mockReturnThis(),
      classed: vi.fn().mockReturnThis(),
      text: vi.fn().mockReturnThis(),
      on: vi.fn().mockReturnThis(),
      call: vi.fn().mockReturnThis(),
    };

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
      setMenu: vi.fn<(menu: { node: Node } | null) => void>(),
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

    expect(fetchSpy).toHaveBeenCalled(); // persistGraph did POST
    expect(rt.setMenu).toHaveBeenCalledWith(null);
  });
});
