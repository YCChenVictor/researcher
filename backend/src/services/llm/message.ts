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

export default buildMessage;
