import { Router } from "express";
import GitHubClient from "../services/github";

const router = Router();
const gh = new GitHubClient();

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

  try {
    const filename = `${slug}.md`;
    const r = await gh.upsert(filename, md);
    console.log(r);
    res.json({ ok: true });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
});

router.get("/", async (_req, res) => {
  try {
    const files = await gh.list();

    res.json(files);
  } catch (error) {
    console.error("GitHub list error:", error);
    res.status(500).json({ error });
  }
});

router.get("/:filename", async (req, res) => {
  console.log("zxcvzxcvzxcv")
  try {
    const { filename } = req.params;
    if (!filename) {
      return res.status(400).json({ error: "Filename required" });
    }

    const content = await gh.get(filename);
    res.json({ ok: true, content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

router.put("/:slug", async (req, res) => {
  try {
    const { slug, title, content } = req.body;
    const filename = `${slug}.md`;
    const md = `
    ---
    title: "${title}"
    slug: "${slug}"
    ---
    
    ${content}
    `;

    await gh.upsert(filename, md);
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "update failed" });
  }
});

router.post("/destroy", async (req, res) => {
  const { filename, sha } = req.body;

  console.log("zxcvxzcvzxcv")
  console.log(filename)

  if (!filename || !sha) {
    return res.status(400).json({ error: "Missing path or sha" });
  }

  try {
    await gh.destroy(filename);
    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

export default router;
