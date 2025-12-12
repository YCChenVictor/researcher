import type { Node } from "../types/graph";

type ArticleApiResponse = {
  ok: boolean;
  path: string;
  content: string;
};

const get = async (
  key: string,
): Promise<{ path: string; content: string } | null> => {
  const res = await fetch(`/api/articles?key=${encodeURIComponent(key)}.md`);

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error(`Failed to load article: ${res.status}`);
  }

  const data = (await res.json()) as ArticleApiResponse;

  if (!data.ok) {
    throw new Error("Article API returned not ok");
  }

  return { path: data.path, content: data.content };
};

const create = async (node: Node) => {
  try {
    const key = node.key.endsWith(".md") ? node.key : `${node.key}.md`;

    const res = await fetch("/api/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: `articles/${key}`,
        content: `---\ntitle: ${node.name}\n---\n`,
      }),
    });

    if (!res.ok) throw new Error(`Init article failed: ${res.status}`);

    const data = await res.json();
    console.log("Article created", data.file);
  } catch (err) {
    console.error("Init article error", err);
  }
};

const update = async (args: {
  key: string;
  content: string;
}): Promise<{ path: string; sha?: string }> => {
  const key = args.key.endsWith(".md") ? args.key : `${args.key}.md`;
  const path = `articles/${key}`;

  const res = await fetch("/api/articles", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path, content: args.content }),
  });

  if (!res.ok) throw new Error(`Update article failed: ${res.status}`);

  const data = (await res.json()) as {
    ok: true;
    file: { path: string; sha?: string };
  };
  if (!data.ok) throw new Error("Article API returned not ok");

  return { path: data.file.path, sha: data.file.sha };
};

export { create, get, update };
