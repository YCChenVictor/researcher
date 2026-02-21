import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import { decomposeBody } from "../../schemas/decompose";
import { buildMessage, call } from "../../server/llm";
import { get as getGraph } from "../../server/graph";
import { endToStart, idsToTitles } from "../../../components/client/graph";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const { startId, endId, numberOfSubTopic } = decomposeBody.parse(json);

    const graph = await getGraph();

    const path = endToStart(graph.links, endId, startId);
    const reasoningRoute = idsToTitles(graph.nodes, path);

    let answer;
    if (process.env.NODE_ENV === "development") {
      const messages = await buildMessage({
        reasoningRoute,
        numberOfSubTopic: numberOfSubTopic ?? 3,
      });

      // Will truly enable it after enough budget
      // eslint-disable-next-line no-console
      console.log(messages);
      answer = {
        topics: [
          {
            title: "test, you should use ChatGPT",
          },
          {
            title: "test, you should use ChatGPT",
          },
          {
            title: "test, you should use ChatGPT",
          },
        ],
      };
    } else {
      const messages = await buildMessage({
        reasoningRoute,
        numberOfSubTopic: numberOfSubTopic ?? 3,
      });
      answer = await call(messages);
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
