import {
  get as getFromGithub,
  put,
  destroy as destroyInGithub,
} from "./github";

const upsert = async (filePath: string, content: string) => {
  const file = await getFromGithub(filePath);
  const sha = file?.sha;

  const data = await put({
    filePath,
    content,
    message: sha ? "Update article" : "Create article",
    ...(sha ? { sha } : {}),
  });

  const commitSha = data.commit?.sha;
  if (!commitSha) throw new Error("GitHub upsert: missing commit sha");

  return {
    path: data.content?.path ?? filePath,
    sha: commitSha,
  };
};

const get = async (filePath: string): Promise<string | null> => {
  const file = await getFromGithub(`articles/${filePath}.md`);
  if (!file) return null;

  return file.content ?? "";
};

const destroy = async (
  filePath: string,
): Promise<{ path: string; sha: string } | null> => {
  const fullPath = `articles/${filePath}.md`;

  const file = await getFromGithub(fullPath);
  if (!file?.sha) return null;

  return destroyInGithub({
    filePath: fullPath,
    message: "Delete article",
    sha: file.sha,
  });
};

export { upsert, get, destroy };
