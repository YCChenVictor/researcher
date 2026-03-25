import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import { decomposeBody } from "../../schemas/decompose";
import { buildMessage, call } from "../../server/llm";
import { get as getGraph } from "../../server/graph";
import { endToStart, idsToTitles } from "../../../components/client/graph";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const body = decomposeBody.parse(json);

    const graph = await getGraph();

    let messages;
    if (body.mode === "route") {
      const path = endToStart(graph.links, body.endId, body.startId);
      const reasoningRoute = idsToTitles(graph.nodes, path);

      messages = await buildMessage({
        mode: "route",
        reasoningRoute,
      });
    } else {
      messages = await buildMessage({
        mode: "single",
        topic: body.topic,
      });
    }

    // eslint-disable-next-line no-console
    console.log(messages);

    const answer =
      process.env.NODE_ENV === "development"
        ? {
            topics: [
              { title: "test, you should use ChatGPT 1" },
              { title: "test, you should use ChatGPT 2" },
              { title: "test, you should use ChatGPT 3" },
            ],
          }
        : await call(messages);

    if (!answer || typeof answer === "string") {
      return NextResponse.json(
        { error: "Invalid LLM response" },
        { status: 500 },
      );
    }

    return NextResponse.json({ answer }, { status: 200 });
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
