import { Octokit } from "octokit";

import { get as getFromGithub } from "./github";
import { GITHUB_BRANCH, GITHUB_OWNER, GITHUB_REPO } from "./env.server";

const token = process.env.GITHUB_TOKEN;

export const githubClient = new Octokit({ auth: token });

export type GraphPayload = {
  nodes: unknown[];
  links: unknown[];
};

const GRAPH_PATH = "graph.json";

async function get(): Promise<GraphPayload> {
  try {
    const file = await getFromGithub(GRAPH_PATH);

    if (!file) {
      return { nodes: [], links: [] };
    }

    const json = file.content;

    return JSON.parse(json) as GraphPayload;
  } catch (err) {
    console.error("Failed to load graph from GitHub", err);
    return { nodes: [], links: [] };
  }
}

async function upsert(graph: unknown) {
  const content = Buffer.from(JSON.stringify(graph, null, 2)).toString(
    "base64",
  );

  let sha: string | undefined;

  try {
    const existing = await githubClient.rest.repos.getContent({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      path: "graph.json",
      ref: GITHUB_BRANCH,
    });

    if (!Array.isArray(existing.data) && "sha" in existing.data) {
      sha = existing.data.sha;
    }
  } catch (err) {
    console.error(err);
  }

  const res = await githubClient.rest.repos.createOrUpdateFileContents({
    owner: GITHUB_OWNER,
    repo: GITHUB_REPO,
    path: "graph.json",
    branch: GITHUB_BRANCH,
    message: "Update graph",
    content,
    sha, // undefined for create, set for update
  });

  return {
    path: res.data.content?.path ?? "graph.json",
    sha: res.data.commit.sha,
  };
}

export { get, upsert };
