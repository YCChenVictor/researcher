import { Octokit } from "octokit";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

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

  async create() {
    const owner = "YCChenVictor";
    const repo = "articles";
    const path = "posts/xxx.mdx";

    const content = Buffer.from(
      "# Hello World\nThis is my first article.",
    ).toString("base64");

    const body = {
      message: "add hello.mdx",
      committer: {
        name: "Your Name",
        email: "you@example.com",
      },
      content: content,
      branch: "main",
    };

    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, // replace or set env
          "X-GitHub-Api-Version": "2022-11-28",
        },
        body: JSON.stringify(body),
      },
    );

    if (!res.ok) {
      console.error("Error:", res.status, await res.text());
      return;
    }

    const data = await res.json();
    console.log("Success:", data);
  }
}
