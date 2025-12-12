import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import { articleBody, getQuerySchema } from "../../schemas/articles";
import { upsert, get } from "../../server/article";

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

export async function handleGetArticle(
  req: NextRequest,
  deps: { get: (key: string) => Promise<string | null> } = { get },
) {
  try {
    const url = new URL(req.url);
    const { key } = getQuerySchema.parse({
      key: url.searchParams.get("key"),
    });

    const content = await deps.get(key);
    if (!content) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, key, content }, { status: 200 });
  } catch (err) {
    console.log("zxcvxcvzxcvzvxc0");
    console.log(err);
    if (err instanceof ZodError) {
      return NextResponse.json(
        { error: "Invalid query", issues: err.issues },
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

export async function POST(req: NextRequest) {
  return handlePostArticle(req);
}

export async function GET(req: NextRequest) {
  return handleGetArticle(req);
}
