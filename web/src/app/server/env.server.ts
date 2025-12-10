// server-only

const required = (name: keyof NodeJS.ProcessEnv) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing ${name} in env`);
  }
  return value;
};

export const GITHUB_TOKEN = required("GITHUB_TOKEN");
export const GITHUB_OWNER = required("GITHUB_OWNER");
export const GITHUB_REPO = required("GITHUB_REPO");
export const GITHUB_BRANCH = process.env.GITHUB_BRANCH ?? "main";
