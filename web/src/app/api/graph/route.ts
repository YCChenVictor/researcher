import { NextResponse } from "next/server";
import { upsert, get } from "../../server/graph";
import { postGraphBodySchema } from "../../schemas/graph";

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
  try {
    const json = await req.json();
    const result = postGraphBodySchema.safeParse(json);

    console.log("zxcvvcxzzvxc");
    console.log(result.success);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Invalid graph payload",
          issues: result.error.issues,
        },
        { status: 400 },
      );
    }

    const { graph } = result.data;

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
