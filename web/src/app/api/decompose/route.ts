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
      answer = {
        topics: [
          {
            title:
              "Architecting a digital payments infrastructure for UBI delivery using New Zealand’s existing tax collection systems",
          },
          {
            title:
              "Integrating national ID and authentication systems to securely identify and enroll UBI recipients in New Zealand",
          },
          {
            title:
              "Evaluating administrative efficiency and cost-effectiveness of UBI delivery via existing tax and ID infrastructure in New Zealand",
          },
          {
            title:
              "Assessing equity, inclusion, and error risks (exclusion, duplication, fraud) in a UBI system built on current tax and ID databases",
          },
          {
            title:
              "Designing governance, data protection, and interoperability standards for New Zealand’s UBI digital infrastructure",
          },
        ],
      };
    } else {
      const messages = await buildMessage({
        professional: "economist",
        numberOfSubTopic: numberOfSubTopic ?? 5,
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
