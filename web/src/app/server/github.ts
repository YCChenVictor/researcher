import type { Endpoints } from "@octokit/types";
import { githubClient } from "./githubClient";
import { GITHUB_OWNER, GITHUB_REPO, GITHUB_BRANCH } from "./env.server";

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

const owner = GITHUB_OWNER;
const repo = GITHUB_REPO;
const branch = GITHUB_BRANCH;

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

const get = async (filePath: string): Promise<GithubFile | null> => {
  try {
    console.log("AAA");
    console.log(owner);
    console.log(repo);
    console.log(filePath);
    console.log(branch);
    const { data } = await githubClient.rest.repos.getContent({
      owner,
      repo,
      path: filePath,
      ref: branch,
    });

    console.log("zxvzxvzxvczv");

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

    return { content: "", sha };
  } catch (err) {
    if (hasStatus(err) && err.status === 404) {
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

const list = async (dirPath = ""): Promise<ArticleFile[]> => {
  type GetContentData =
    Endpoints["GET /repos/{owner}/{repo}/contents/{path}"]["response"]["data"];

  type ArrayItem<T> = T extends readonly (infer U)[] ? U : never; // distributive
  type ContentItem = ArrayItem<GetContentData>;
  type FileItem = ContentItem & { type: "file" };

  const isMdFile = (i: ContentItem): i is FileItem =>
    i.type === "file" && i.name.endsWith(".md");

  const { data } = await githubClient.rest.repos.getContent({
    owner,
    repo,
    path: dirPath,
    ref: branch,
  });

  if (!Array.isArray(data)) return [];

  return (data as readonly ContentItem[]).filter(isMdFile).map((i) => ({
    name: i.name,
    path: i.path,
    sha: i.sha,
    size: i.size ?? 0,
  }));
};

const destroy = async ({
  filePath,
  message,
  sha,
}: {
  filePath: string;
  message: string;
  sha: string;
}): Promise<{ path: string; sha: string }> => {
  console.log("AAAAAAA");
  console.log(filePath);
  const res = await githubClient.rest.repos.deleteFile({
    owner,
    repo,
    path: filePath,
    message,
    sha,
    ...(branch ? { branch } : {}),
  });

  const commitSha = res.data.commit?.sha;
  if (!commitSha) throw new Error("GitHub deleteFile: missing commit sha");

  return {
    path: res.data.content?.path ?? filePath,
    sha: commitSha,
  };
};

export { assertRepoAndBranchExist, list, get, destroy, put };
