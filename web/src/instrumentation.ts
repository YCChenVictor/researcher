export const register = async (): Promise<void> => {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  const token = (process.env.GITHUB_TOKEN ?? "").trim();
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const res = await fetch("https://api.github.com/rate_limit", { headers });
    const data = await res.json();

    if (!res.ok) {
      console.error("[startup] GitHub check failed", {
        status: res.status,
        data,
      });
      return;
    }
  } catch (e: unknown) {
    console.error("[startup] GitHub check failed", e);
  }
};
