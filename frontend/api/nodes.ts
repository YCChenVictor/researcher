import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createPost } from "../lib/github";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { filename, content } = req.body as { filename?: string; content?: string };
  if (!filename || !content) {
    res.status(400).json({ error: "filename and content are required" });
    return;
  }

  try {
    const data = await createPost(filename, content);
    res.status(201).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}
