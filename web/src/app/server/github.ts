import { Octokit } from "octokit";
import type { Endpoints } from "@octokit/types";

import {
  GITHUB_TOKEN,
  GITHUB_OWNER,
  GITHUB_REPO,
  GITHUB_BRANCH,
} from "./env.server";

interface ArticleFile {
  name: string;
  path: string;
  sha: string;
  size: number;
}

type GithubFile = {
  content: string;
  sha: string;
};

const token = GITHUB_TOKEN;
const owner = GITHUB_OWNER;
const repo = GITHUB_REPO;
const branch = GITHUB_BRANCH;

const githubClient = new Octokit({ auth: token });

let repoChecked = false;

const assertRepoAndBranchExist = async () => {
  if (repoChecked) return;

  await githubClient.request("GET /repos/{owner}/{repo}", { owner, repo });
  await githubClient.request("GET /repos/{owner}/{repo}/branches/{branch}", {
    owner,
    repo,
    branch,
  });

  repoChecked = true;
};

const hasStatus = (
  error: unknown,
): error is {
  status: number;
} => {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    typeof (error as { status: unknown }).status === "number"
  );
};

const getFile = async (filePath: string): Promise<GithubFile | null> => {
  try {
    console.log("AAAAA");
    const { data } = await githubClient.rest.repos.getContent({
      owner,
      repo,
      path: filePath,
      ref: branch,
    });
    console.log("BBBBBB");

    if (Array.isArray(data)) {
      throw new Error(`Expected file but got directory at ${filePath}`);
    }

    const { content, encoding, sha } = data as {
      content?: string;
      encoding?: string;
      sha: string;
    };

    if (content && encoding === "base64") {
      return {
        content: Buffer.from(content, "base64").toString("utf8"),
        sha,
      };
    }

    // weird case: no content or unexpected encoding
    return { content: "", sha };
  } catch (err) {
    console.log("zxcvzxvzxv");
    if (hasStatus(err) && err.status === 404) {
      // file not found
      return null;
    }
    throw err;
  }
};

const encodeContent = (content: string): string =>
  Buffer.from(content, "utf8").toString("base64");

const put = async ({
  filePath,
  content,
  message,
  sha,
}: {
  filePath: string;
  content: string;
  message: string;
  sha?: string; // present => update, absent => create
}): Promise<
  Endpoints["PUT /repos/{owner}/{repo}/contents/{path}"]["response"]["data"]
> => {
  const { data } = await githubClient.rest.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: filePath,
    branch,
    message,
    content: encodeContent(content),
    committer: {
      name: "Your Name",
      email: "you@example.com",
    },
    ...(sha ? { sha } : {}),
  });

  return data;
};

const list = async (): Promise<ArticleFile[]> => {
  const { data } = await octokit.request(
    "GET /repos/{owner}/{repo}/contents/{path}",
    { owner: owner, repo: repo, path: "", ref: branch },
  );

  if (!Array.isArray(data)) return [];

  const result = data
    .filter((i) => i.type === "file" && i.name.endsWith(".md"))
    .map((i) => ({ name: i.name, path: i.path, sha: i.sha, size: i.size }));

  return result;
};

const destroy = async (filename: string): Promise<void> => {
  const filePath = `posts/${filename}`;

  // Get file metadata to retrieve SHA
  const { data } = await octokit.request(
    "GET /repos/{owner}/{repo}/contents/{path}",
    { owner: owner, repo: repo, path: filePath, ref: branch },
  );

  console.log(data);

  const sha = Array.isArray(data) ? "" : data.sha;
  if (!sha) throw new Error("File not found or sha missing");

  // Delete the file
  await octokit.request("DELETE /repos/{owner}/{repo}/contents/{path}", {
    owner: owner,
    repo: repo,
    path: filePath,
    message: `delete ${filename}`,
    sha,
    branch: branch,
  });
};

export { upsert, assertRepoAndBranchExist, list, getFile, destroy, put };
