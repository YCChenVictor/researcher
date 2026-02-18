import OpenAI from "openai";

type BuildMessageArg =
  | {
      mode: "route";
      reasoningRoute: string[];
    }
  | {
      mode: "single";
      topic: string;
    };

const call = async (
  messages: { role: "system" | "user" | "assistant"; content: string }[],
) => {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const res = await client.chat.completions.create({
    model: "gpt-4",
    messages,
    temperature: 0.7,
  });

  return res.choices[0].message.content;
};

const buildMessage = async (
  arg: BuildMessageArg,
): Promise<{ role: "system" | "user" | "assistant"; content: string }[]> => {
  const system = {
    role: "system" as const,
    content: `
You are a cross-disciplinary analyst.

Rules:
- Titles only.
- No explanations.
- Return ONLY valid JSON:
{
  "topics": [
    { "title": "Topic 1" },
    { "title": "Topic 2" }
  ]
}
    `.trim(),
  };

  if (arg.mode === "route") {
    const route = [...arg.reasoningRoute];
    const topic = route[route.length - 1];

    return [
      system,
      {
        role: "user",
        content: `
Decompose the final topic '${topic}' into root causes.

Reasoning route:
${route.map((t) => `'${t}'`).join(" -> ")}
        `.trim(),
      },
    ];
  }

  return [
    system,
    {
      role: "user",
      content: `
Decompose the topic '${arg.topic}' into root causes.
      `.trim(),
    },
  ];
};

export { buildMessage, call };
