import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import { whyBody } from "../../schemas/why";
import { buildMessage, call } from "../../server/llm";
import { get as getGraph } from "../../server/graph";
import { endToStart, idsToTitles } from "../../../components/client/graph";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const body = whyBody.parse(json);

    const graph = await getGraph();
    const path = endToStart(graph.links, body.endId, body.startId);
    const reasoningRoute = idsToTitles(graph.nodes, path);

    const messages = await buildMessage({
      mode: "why",
      reasoningRoute,
    });

    // eslint-disable-next-line no-console
    console.log(messages);

    const answer =
      process.env.NODE_ENV === "development"
        ? {
            answer: `This is a mock answer for the reasoning route: ${reasoningRoute.join(" -> ")}`,
          }
        : await call(messages);

    if (!answer || typeof answer !== "object" || !("answer" in answer)) {
      return NextResponse.json(
        { error: "Invalid LLM response" },
        { status: 500 },
      );
    }

    const text = answer.answer;

    if (typeof text !== "string" || !text.trim()) {
      return NextResponse.json(
        { error: "Invalid LLM response" },
        { status: 500 },
      );
    }

    return NextResponse.json({ answer: text }, { status: 200 });
  } catch (err) {
    console.error(err);

    if (err instanceof ZodError) {
      return NextResponse.json(
        { error: "Invalid body", issues: err.issues },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
