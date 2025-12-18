import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import {
  articleBody,
  deleteQuerySchema,
  getQuerySchema,
} from "../../schemas/articles";
import { upsert, get, destroy } from "../../server/article";

const handlePostArticle = async (req: NextRequest) => {
  try {
    const json = await req.json();
    const { path, content } = articleBody.parse(json);

    const result = await upsert(path, content);

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
};

const handleGetArticle = async (
  req: NextRequest,
  deps: { get: (key: string) => Promise<string | null> } = { get },
) => {
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
};

const handlePutArticle = async (req: NextRequest) => {
  try {
    const json = await req.json();
    const { path, content } = articleBody.parse(json);

    const result = await upsert(path, content);
    return NextResponse.json({ ok: true, file: result }, { status: 200 });
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
};

const handleDeleteArticle = async (
  req: NextRequest,
  deps: { destroy: (key: string) => Promise<{ path: string } | null> } = {
    destroy,
  },
) => {
  try {
    const url = new URL(req.url);
    const { key } = deleteQuerySchema.parse({
      key: url.searchParams.get("key"),
    });

    const result = await deps.destroy(key);
    if (!result) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, deleted: result }, { status: 200 });
    // or: return new NextResponse(null, { status: 204 });
  } catch (err) {
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
};

async function POST(req: NextRequest) {
  return handlePostArticle(req);
}

async function GET(req: NextRequest) {
  return handleGetArticle(req);
}

async function PUT(req: NextRequest) {
  return handlePutArticle(req);
}

async function DELETE(req: NextRequest) {
  return handleDeleteArticle(req);
}

export {
  handlePutArticle,
  handleGetArticle,
  handlePostArticle,
  handleDeleteArticle,
  POST,
  GET,
  PUT,
  DELETE,
};
