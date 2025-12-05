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

export default class GitHubClient {
  private octokit: Octokit;
  private owner: string;
  private repo: string;
  private branch: string;

  constructor() {
    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;
    const branch = process.env.GITHUB_BRANCH || "main";
    if (!token) throw new Error("Missing GITHUB_TOKEN in env");
    if (!owner) throw new Error("Missing GITHUB_OWNER in env");
    if (!repo) throw new Error("Missing GITHUB_REPO in env");

    this.octokit = new Octokit({ auth: token });
    this.owner = owner;
    this.repo = repo;
    this.branch = branch;
  }

  async upsert(
    filename: string,
    content: string,
    message = `upsert ${filename}`,
  ) {
    const filePath = `posts/${filename}`;

    let sha: string | undefined;
    try {
      const { data } = await this.octokit.request(
        "GET /repos/{owner}/{repo}/contents/{path}",
        {
          owner: this.owner,
          repo: this.repo,
          path: filePath,
          ref: this.branch,
        },
      );
      if (typeof data === "object" && "sha" in data) sha = data.sha;
    } catch {
      // 404 → create new
    }

    const { data } = await this.octokit.request(
      "PUT /repos/{owner}/{repo}/contents/{path}",
      {
        owner: this.owner,
        repo: this.repo,
        path: filePath,
        message,
        branch: this.branch,
        committer: { name: "Your Name", email: "you@example.com" },
        content: Buffer.from(content, "utf8").toString("base64"),
        sha, // present only when updating
      },
    );

    return data;
  }

  async list(): Promise<ArticleFile[]> {
    const { data } = await this.octokit.request(
      "GET /repos/{owner}/{repo}/contents/{path}",
      { owner: this.owner, repo: this.repo, path: "", ref: this.branch },
    );

    if (!Array.isArray(data)) return [];

    const result = data
      .filter((i) => i.type === "file" && i.name.endsWith(".md"))
      .map((i) => ({ name: i.name, path: i.path, sha: i.sha, size: i.size }));

    return result;
  }

  /** Get raw markdown text of one article */
  async get(filePath: string): Promise<string> {
    const { data } = await this.octokit.request(
      "GET /repos/{owner}/{repo}/contents/{path}",
      { owner: this.owner, repo: this.repo, path: filePath, ref: this.branch },
    );

    if (typeof data === "string") return data; // if raw returned
    const content = data.content;
    const encoding = data.encoding;
    if (content && encoding === "base64") {
      return Buffer.from(content, "base64").toString("utf8");
    }
    return "";
  }

  async destroy(filename: string): Promise<void> {
    const filePath = `posts/${filename}`;

    // Get file metadata to retrieve SHA
    const { data } = await this.octokit.request(
      "GET /repos/{owner}/{repo}/contents/{path}",
      { owner: this.owner, repo: this.repo, path: filePath, ref: this.branch },
    );

    console.log(data);

    const sha = Array.isArray(data) ? "" : data.sha;
    if (!sha) throw new Error("File not found or sha missing");

    // Delete the file
    await this.octokit.request("DELETE /repos/{owner}/{repo}/contents/{path}", {
      owner: this.owner,
      repo: this.repo,
      path: filePath,
      message: `delete ${filename}`,
      sha,
      branch: this.branch,
    });
  }
}
