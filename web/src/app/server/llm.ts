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
- Decompose only the final topic.
- Output only immediate parent factors, not distant causes.
- Prefer factors that are concrete, observable, practical, and useful for decision or intervention design.
- Prefer factors that can be assessed, compared, influenced, or measured.
- Avoid philosophical, moral, spiritual, or highly subjective abstractions unless unavoidable.
- Avoid overlapping, synonymous, or nested items.
- Each title must be 2 to 6 words.
- Return ONLY valid JSON in this exact shape:
{
  "topics": [
    { "title": "Topic 1" },
    { "title": "Topic 2" }
  ]
}
    `.trim(),
  };

  if (arg.mode === "route") {
    const route = [...arg.reasoningRoute].reverse();

    return [
      system,
      {
        role: "user",
        content: `
Given the thinking route below, decompose only the final topic into immediate parent causes that are most useful for intervention design.

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
Decompose the final topic '${arg.topic}' into immediate parent causes that are most useful for intervention design.
      `.trim(),
    },
  ];
};

export { buildMessage, call };
