import OpenAI from "openai";

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

type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

type BuildMessageArg =
  | {
      mode: "route";
      reasoningRoute: string[];
    }
  | {
      mode: "why";
      reasoningRoute: string[];
    }
  | {
      mode: "single";
      topic: string;
    }
  | { mode: "solution"; reasoningRoute: string[] };

const decomposeSystemMessage: Message = {
  role: "system",
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

const whySystemMessage: Message = {
  role: "system",
  content: `
You are a clear cross-disciplinary analyst.

Rules:
- Explain why this topic exists.
- Focus on practical significance, larger consequences, and decision value.
- Prefer 3 to 8 words.
- Avoid chain-of-thought or hidden reasoning.
- Return ONLY valid JSON in this exact shape:
{
  "answer": "..."
}
  `.trim(),
};

const buildDecomposeRouteMessage = async (
  reasoningRoute: string[],
): Promise<Message[]> => {
  const route = [...reasoningRoute].reverse();

  return [
    decomposeSystemMessage,
    {
      role: "user",
      content: `
Given the thinking route below, decompose only the final topic into immediate parent causes that are most useful for intervention design.

Reasoning route:
${route.map((t) => `'${t}'`).join(" -> ")}
      `.trim(),
    },
  ];
};

const buildDecomposeSingleMessage = async (
  topic: string,
): Promise<Message[]> => {
  return [
    decomposeSystemMessage,
    {
      role: "user",
      content: `
Decompose the final topic '${topic}' into immediate parent causes that are most useful for intervention design.
      `.trim(),
    },
  ];
};

const buildWhyMessage = async (
  reasoningRoute: string[],
): Promise<Message[]> => {
  const route = [...reasoningRoute].reverse();
  return [
    whySystemMessage,
    {
      role: "user",
      content: `
Explain why the final topic below is important in the overall route.

Reasoning route:
${route.map((t) => `'${t}'`).join(" -> ")}
      `.trim(),
    },
  ];
};

const solutionSystemMessage: Message = {
  role: "system",
  content: `
You are a clear cross-disciplinary problem solver.

Rules:
- Propose only one solution for the final topic.
- Use the earlier route only as context for why the final topic matters.
- Focus on the most practical, highest-leverage solution available now.
- Prefer solutions that are realistic, actionable, and useful for decision-making.
- Do not invent weak, symbolic, or unrealistic solutions.
- If there is no good solution now, return exactly:
{
  "solution": "no",
  "practicalWay": "no"
}
- Otherwise, return ONLY valid JSON in this exact shape:
{
  "solution": "...",
  "practicalWay": "..."
}
- "solution" should name the single best solution.
- "practicalWay" should state the most practical way to apply or start implementing it.
- Keep both fields short and concrete.
- Do not add any text before or after the JSON.
  `.trim(),
};

const buildSolutionMessage = async (
  reasoningRoute: string[],
): Promise<Message[]> => {
  const route = [...reasoningRoute].reverse();
  return [
    solutionSystemMessage,
    {
      role: "user",
      content: `
Provide a solution for the final topic below in the overall route.

Reasoning route:
${route.map((t) => `'${t}'`).join(" -> ")}
      `.trim(),
    },
  ];
};

const buildMessage = async (arg: BuildMessageArg): Promise<Message[]> => {
  switch (arg.mode) {
    case "route":
      return buildDecomposeRouteMessage(arg.reasoningRoute);
    case "single":
      return buildDecomposeSingleMessage(arg.topic);
    case "why":
      return buildWhyMessage(arg.reasoningRoute);
    case "solution":
      return buildSolutionMessage(arg.reasoningRoute);
    default:
      throw new Error("Invalid mode");
  }
};

export { buildMessage, call };
