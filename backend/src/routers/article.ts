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

router.get("/content", async (req, res) => {
  console.log("xvxczvzxzvxc")
  try {
    const filePath = String(req.query.file || "");
    if (!filePath) {
      return res.status(400).json({ error: "Filename required" });
    }

    const content = await gh.get(filePath);
    res.json({ ok: true, content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

// router.get("/content", (req, res) => {
//   const file = String(req.query.file || "");
//   if (!file) return res.status(400).send("Missing ?file");
//   const rel = path.posix.normalize(file).replace(/^(\.\.\/)+/g, "");
//   if (!rel.endsWith(".md")) return res.status(400).send("Only .md");
//   const abs = path.resolve(ROOT, rel);
//   if (!abs.startsWith(ROOT + path.sep)) return res.status(400).send("Bad path");
//   res.type("text/markdown; charset=utf-8");
//   res.sendFile(abs, (err) => (err ? res.status(404).send("Not found") : null));
// });

router.put("/content", async (req, res) => {
  try {
    const raw = String(req.query.path || "");
    if (!raw) return res.status(400).json({ error: "Missing ?path" });
    if (raw.includes("..")) return res.status(400).json({ error: "Bad path" });

    const filename = raw.endsWith(".md") ? raw : `${raw}.md`;
    console.log("zxvcxzcvzvxc")
    console.log(filename)
    const { title = "", content = "" } = req.body || {};
    const slug = filename.replace(/\.md$/, "");

    const md =
`---\n` +
`title: "${String(title).replace(/"/g, '\\"')}"\n` +
`slug: "${slug}"\n` +
`---\n\n${content}\n`;

    await gh.upsert(filename, md);
    res.json({ ok: true, path: filename });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "update failed" });
  }
});

router.post("/destroy", async (req, res) => {
  const { filename, sha } = req.body;

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
