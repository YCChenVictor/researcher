import { OpenAI } from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw "No OPENAI_API_KEY in env";
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const call = async (
  messages: { role: "system" | "user" | "assistant"; content: string }[],
) => {
  const res = await openai.chat.completions.create({
    model: "gpt-4",
    messages,
    temperature: 0.7,
  });

  return res.choices[0].message.content;
};

const buildMessage = async ({
  numberOfSubTopic,
  topic,
}: {
  numberOfSubTopic: number;
  topic: string;
}): Promise<{ role: "system" | "user" | "assistant"; content: string }[]> => {
  return [
    {
      role: "system",
      content: `
You are a cross-disciplinary analyst.

Rules:
- Titles must be self-contained and clearly about ${topic} adoption barriers.
- Cover different angles.
- Titles only (no explanations).
- Exactly ${numberOfSubTopic} items.
- Title length: no more than 6 words.

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
Decompose the question “${topic}” into exactly ${numberOfSubTopic} high-level explanatory aspects that together answer it.
    `.trim(),
    },
  ];
};

export { buildMessage, call };
