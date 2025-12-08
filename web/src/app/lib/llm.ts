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
  professional,
  numberOfSubTopic,
  topic,
}: {
  numberOfSubTopic: number;
  professional: string;
  topic: string;
}): Promise<{ role: "system" | "user" | "assistant"; content: string }[]> => {
  return [
    {
      role: "system",
      content: `
      You are ${professional}.
Given one broad research topic, you break it into more specific research topics.
Return ONLY valid JSON:
{
  "topics": [
    { "title": "string" }
  ]
}
    `.trim(),
    },
    {
      role: "user",
      content: `
Decompose this research topic into exactly ${numberOfSubTopic} research topics:
"${topic}"
    `.trim(),
    },
  ];
};

export { buildMessage, call };
