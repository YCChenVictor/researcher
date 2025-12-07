import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createPostFile } from "../lib/github";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "POST") {
    const { id, content } = req.body as { id?: string; content?: string };

    if (!id || !content) {
      res.status(400).json({ error: "id and content are required" });
      return;
    }

    try {
      const data = await createPostFile(id, content);
      res.status(201).json(data);
    } catch (err) {
      if (err instanceof Error && err.message.includes("already exists")) {
        res.status(409).json({ error: err.message });
        return;
      }
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
    return;
  }

  if (req.method === "GET") {
    // optional: list posts (from GitHub or cached graph.json)
    res.status(501).json({ error: "Not implemented" });
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}
