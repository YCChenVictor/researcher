import { OpenAI } from "openai";
import { readFileSync } from "fs";
import path from "path";

const articlesPath = path.join(__dirname, "../domain-knowledge/articles.json");
const articles = JSON.parse(readFileSync(articlesPath, "utf8")) as Record<
  string,
  string
>;

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

const prompt = (topic: keyof typeof articles) => {
  const article = articles[topic];

  return {
    role: "system",
    content: `
          You are a trading behavior specialist.
          Behavior Observed: ${topic}
          Explanation: ${article}
          Respond clearly and kindly, helping the user understand the behavior.
        `,
  };
};

export { call, prompt };
