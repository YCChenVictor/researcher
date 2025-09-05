import React, { useEffect, useState } from "react";

interface Item {
  name: string;
  path: string;
  download_url: string;
  html_url: string;
  type: "file" | "dir";
}

export default function List({
  owner = "YCChenVictor",
  repo = "articles",
  branch = "main",
  dir = "posts",
}: {
  owner?: string;
  repo?: string;
  branch?: string;
  dir?: string;
}) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const res = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(dir)}?ref=${encodeURIComponent(branch)}`,
        );
        if (!res.ok)
          throw new Error(
            `${res.status} ${res.statusText}: ${await res.text()}`,
          );
        const data: Item[] = await res.json();
        setItems(
          data.filter((i) => i.type === "file" && i.name.endsWith(".mdx")),
        );
      } catch (error) {
        setErr("Failed to load");
      } finally {
        setLoading(false);
      }
    })();
  }, [owner, repo, branch, dir]);

  if (loading) return <div className="p-3">Loading…</div>;
  if (err) return <div className="p-3 text-red-600">Error: {err}</div>;
  if (!items.length) return <div className="p-3">No articles found.</div>;

  return (
    <ul className="p-3 space-y-2">
      {items.map((it) => (
        <li key={it.path} className="border rounded-lg p-3">
          <div className="font-medium">{it.name}</div>
          <div className="text-sm opacity-70">{it.path}</div>
          <div className="mt-2 text-sm space-x-3">
            <a
              className="underline"
              href={it.html_url}
              target="_blank"
              rel="noreferrer"
            >
              View on GitHub
            </a>
            <a
              className="underline"
              href={it.download_url}
              target="_blank"
              rel="noreferrer"
            >
              Raw
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
}
