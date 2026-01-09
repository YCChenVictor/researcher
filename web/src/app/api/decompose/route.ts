import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import { decomposeBody } from "../../schemas/decompose";
import { buildMessage, call } from "../../server/llm";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const { topic, numberOfSubTopic } = decomposeBody.parse(json);

    let answer;
    if (process.env.NODE_ENV === "development") {
      const messages = await buildMessage({
        numberOfSubTopic: numberOfSubTopic ?? 3,
        topic,
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
        numberOfSubTopic: numberOfSubTopic ?? 3,
        topic,
      });
      answer = await call(messages);
    }

    return NextResponse.json({ answer }, { status: 200 });
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
