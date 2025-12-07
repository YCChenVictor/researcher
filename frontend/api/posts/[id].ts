// api/posts/[id].ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getPostFile, updatePostFile, deletePostFile } from "../../lib/github";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const id = req.query.id as string | undefined;
  if (!id) {
    res.status(400).json({ error: "id is required" });
    return;
  }

  try {
    if (req.method === "GET") {
      const data = await getPostFile(id);
      res.status(200).json(data);
      return;
    }

    if (req.method === "PUT") {
      const { content } = req.body as { content?: string };
      if (!content) {
        res.status(400).json({ error: "content is required" });
        return;
      }
      const data = await updatePostFile(id, content);
      res.status(200).json(data);
      return;
    }

    if (req.method === "DELETE") {
      await deletePostFile(id);
      res.status(204).end();
      return;
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}
