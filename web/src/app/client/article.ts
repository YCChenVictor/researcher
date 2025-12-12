import type { Node } from "../types/graph";

type ArticleApiResponse = {
  ok: boolean;
  path: string;
  content: string;
};

const get = async (
  key: string,
): Promise<{ path: string; content: string } | null> => {
  const res = await fetch(`/api/articles?key=${encodeURIComponent(key)}`);

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
    const res = await fetch("/api/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: `articles/${node.key}`,
        content: node.name,
      }),
    });

    if (!res.ok) {
      throw new Error(`Init article failed: ${res.status}`);
    }

    const data = await res.json();
    console.log("Article created", data.file);
  } catch (err) {
    console.error("Init article error", err);
  }
};

export { create, get };
