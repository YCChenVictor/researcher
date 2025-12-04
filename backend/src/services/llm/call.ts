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

export { call };
