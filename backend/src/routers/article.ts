import { Router } from "express";
import GitHubClient from "../services/github";

const router = Router();

// curl -X POST http://localhost:5000/articles \
//   -H "Content-Type: application/json" \
//   -d '{
//     "slug": "my-first-post",
//     "title": "My First Post",
//     "content": "This is the **markdown** content of my first article."
//   }'
router.post("/", async (req, res) => {
  const { slug, title, content } = req.body;
  if (!slug || !title || !content)
    return res.status(400).json({ error: "missing fields" });

  const md = `
    ---
    title: "${title}"
    slug: "${slug}"
    ---
    
    ${content}
    `;

  const gh = new GitHubClient();

  try {
    const r = await gh.create();
    console.log(r);
    res.json({ ok: true });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
});

router.get("/", async (req, res) => {
  const gh = new GitHubClient();

  try {
    const r = await gh.list();
    console.log(r);
    res.json({ ok: true });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
});

export default router;
