import { NextResponse } from "next/server";
import { upsert, get } from "../../lib/graph";

export async function GET() {
  try {
    const graph = await get();
    return NextResponse.json({ graph }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  const { graph } = (await req.json()) as {
    graph?: { nodes: unknown[]; links: unknown[] };
  };

  if (!graph) {
    return NextResponse.json({ error: "graph is required" }, { status: 400 });
  }

  try {
    await upsert(graph);
    return NextResponse.json(graph, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
