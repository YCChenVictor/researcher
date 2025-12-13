import { Octokit } from "octokit";
import { GITHUB_TOKEN } from "./env.server";

export const githubClient = new Octokit({ auth: GITHUB_TOKEN });
