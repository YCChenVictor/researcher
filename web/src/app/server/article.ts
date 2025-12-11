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

export { upsert };
