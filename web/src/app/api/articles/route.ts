import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import { articleBody } from "../../schemas/articles";
import { upsert } from "../../server/article";

export async function handlePostArticle(
  req: NextRequest,
  deps: { upsert: (path: string, content: string) => Promise<unknown> } = {
    upsert,
  },
) {
  try {
    const json = await req.json();
    const { path, content } = articleBody.parse(json);

    const result = await deps.upsert(path, content);

    return NextResponse.json({ ok: true, file: result }, { status: 201 });
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { error: "Invalid body", issues: err.issues },
        { status: 400 },
      );
    }

    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// actual route – used by Next
export async function POST(req: NextRequest) {
  return handlePostArticle(req);
}
