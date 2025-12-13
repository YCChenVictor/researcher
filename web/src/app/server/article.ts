import { getFile, put } from "./github";

const upsert = async (filePath: string, content: string) => {
  const file = await getFile(filePath);
  const sha = file?.sha;

  const data = await put({
    filePath,
    content,
    message: sha ? "Update article" : "Create article",
    ...(sha ? { sha } : {}),
  });

  return {
    path: data.content?.path ?? filePath,
    sha: data.commit.sha,
  };
};

const get = async (filePath: string): Promise<string | null> => {
  const file = await getFile(`articles/${filePath}`);
  if (!file) return null;

  // getFile() already returns utf8 text in file.content
  return file.content ?? "";
};

export { upsert, get };
