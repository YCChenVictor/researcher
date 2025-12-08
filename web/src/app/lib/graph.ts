import { Octokit } from "octokit";

const token = process.env.GITHUB_TOKEN!;
const owner = process.env.GITHUB_OWNER!;
const repo = process.env.GITHUB_REPO!;
const branch = process.env.GITHUB_BRANCH ?? "main";

export const githubClient = new Octokit({ auth: token });

const encodeContent = (content: string) =>
  Buffer.from(content, "utf8").toString("base64");
const decodeContent = (content: string) =>
  Buffer.from(content, "base64").toString("utf8");

export type GraphPayload = {
  nodes: unknown[];
  links: unknown[];
};

const GRAPH_PATH = "graph.json";

async function get(): Promise<GraphPayload> {
  try {
    const res = await githubClient.rest.repos.getContent({
      owner,
      repo,
      path: GRAPH_PATH,
      ref: branch,
    });

    if (Array.isArray(res.data) || !("content" in res.data)) {
      return { nodes: [], links: [] };
    }

    const json = decodeContent(res.data.content);
    return JSON.parse(json) as GraphPayload;
  } catch {
    return { nodes: [], links: [] };
  }
}

async function upsert(graph: GraphPayload) {
  let sha: string | undefined;

  try {
    const res = await githubClient.rest.repos.getContent({
      owner,
      repo,
      path: GRAPH_PATH,
      ref: branch,
    });

    if (!Array.isArray(res.data) && "sha" in res.data) {
      sha = res.data.sha;
    }
  } catch {
    ("");
  }

  const { data } = await githubClient.rest.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: GRAPH_PATH, // ← always this file
    branch,
    message: sha ? "Update graph" : "Create graph",
    content: encodeContent(JSON.stringify(graph, null, 2)),
    ...(sha ? { sha } : {}),
  });

  return data;
}

export { get, upsert };
