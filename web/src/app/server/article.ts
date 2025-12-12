import { getFile, put } from "./github";

const upsert = async (filePath: string, content: string) => {
  const file = await getFile(filePath);
  const sha = file?.sha;

  return put({
    filePath,
    content,
    message: sha ? "Update article" : "Create article",
    ...(sha ? { sha } : {}),
  });
};

const get = async (filePath: string): Promise<string | null> => {
  const file = await getFile(`articles/${filePath}`);

  if (!file || !file.content) return null;

  return Buffer.from(file.content, "base64").toString("utf-8");
};

export { upsert, get };
