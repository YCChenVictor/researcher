import { Octokit } from "octokit";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

interface ArticleFile {
  name: string;
  path: string;
  sha: string;
  size: number;
}

const token = process.env.GITHUB_TOKEN;
const owner = process.env.GITHUB_OWNER;
const repo = process.env.GITHUB_REPO;
const branch = process.env.GITHUB_BRANCH || "main";
if (!token) throw new Error("Missing GITHUB_TOKEN in env");
if (!owner) throw new Error("Missing GITHUB_OWNER in env");
if (!repo) throw new Error("Missing GITHUB_REPO in env");

const octokit = new Octokit({ auth: token });

let repoChecked = false;

const assertRepoAndBranchExist = async () => {
  if (repoChecked) return;

  await octokit.request("GET /repos/{owner}/{repo}", { owner, repo });
  await octokit.request("GET /repos/{owner}/{repo}/branches/{branch}", {
    owner,
    repo,
    branch,
  });

  repoChecked = true;
};

const get = async (filePath: string): Promise<string> => {
  await assertRepoAndBranchExist()

  const { data } = await octokit.request(
    "GET /repos/{owner}/{repo}/contents/{path}",
    { owner: owner, repo: repo, path: filePath, ref: branch },
  );

  if (typeof data === "string") return data;
  const content = data.content;
  const encoding = data.encoding;
  if (content && encoding === "base64") {
    return Buffer.from(content, "base64").toString("utf8");
  }
  return "";
};

const encodeContent = (content: string) =>
  Buffer.from(content, "utf8").toString("base64");

const getFileSha = async (filePath: string): Promise<string | null> => {
  const { data } = await octokit.request(
      "GET /repos/{owner}/{repo}/contents/{path}",
      {
        owner,
        repo,
        path: filePath,
        ref: branch,
      },
    );

    if (!Array.isArray(data) && "sha" in data) return data.sha;
    return null;
};

const put = async (params: {
  filePath: string;
  content: string;
  message: string;
  sha?: string;
}) => {
  const { filePath, content, message, sha } = params;

  const { data } = await octokit.request(
    "PUT /repos/{owner}/{repo}/contents/{path}",
    {
      owner,
      repo,
      path: filePath,
      message,
      branch,
      committer: { name: "Your Name", email: "you@example.com" },
      content: encodeContent(content),
      ...(sha ? { sha } : {}),
    },
  );

  return data;
};


const createPost = async (
  filename: string,
  content: string,
  message = `create ${filename}`,
) => {
  await assertRepoAndBranchExist()

  const filePath = `posts/${filename}`;

  const existingSha = await getFileSha(filePath);
  if (existingSha) {
    throw new Error(`File ${filePath} already exists`);
  }

  return put({ filePath, content, message });
};

const upsert = async (
  filename: string,
  content: string,
  message = `upsert ${filename}`,
) => {
  const filePath = `posts/${filename}`;

  let sha: string | undefined;
  try {
    const { data } = await octokit.request(
      "GET /repos/{owner}/{repo}/contents/{path}",
      {
        owner: owner,
        repo: repo,
        path: filePath,
        ref: branch,
      },
    );
    if (typeof data === "object" && "sha" in data) sha = data.sha;
  } catch {
    // 404 → create new
  }

  const { data } = await octokit.request(
    "PUT /repos/{owner}/{repo}/contents/{path}",
    {
      owner: owner,
      repo: repo,
      path: filePath,
      message,
      branch: branch,
      committer: { name: "Your Name", email: "you@example.com" },
      content: Buffer.from(content, "utf8").toString("base64"),
      sha, // present only when updating
    },
  );

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

export { assertRepoAndBranchExist, createPost, upsert, list, get, destroy };
