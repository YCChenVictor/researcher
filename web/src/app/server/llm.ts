import OpenAI from "openai";

const call = async (
  messages: { role: "system" | "user" | "assistant"; content: string }[],
) => {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

  const res = await client.chat.completions.create({
    model: "gpt-4",
    messages,
    temperature: 0.7,
  });

  return res.choices[0].message.content;
};

const buildMessage = async ({
  reasoningRoute,
  numberOfSubTopic,
}: {
  reasoningRoute: string[];
  numberOfSubTopic: number;
}): Promise<{ role: "system" | "user" | "assistant"; content: string }[]> => {
  const topic = reasoningRoute[0];

  return [
    {
      role: "system",
      content: `
You are a cross-disciplinary analyst.

Rules:
- Titles only (no explanations).
- Exactly ${numberOfSubTopic} items.
- Title length: no more than 6 words.
- Keep consistency with the provided reasoning route (do not introduce unrelated themes).

Return ONLY valid JSON:
{
  "topics": [
    topic1, topic2, ...
  ]
}
    `.trim(),
    },
    {
      role: "user",
      content: `
Decompose the question “'${topic}'”. This topic was derived from reasoning: ${reasoningRoute
        .reverse()
        .map((t, i) => `'${t}'${i === reasoningRoute.length - 1 ? "" : " -> "}`)
        .join("")}
    `.trim(),
    },
  ];
};

export { buildMessage, call };
