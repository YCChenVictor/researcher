# Researcher

A personal research/knowledge repo that turns Markdown notes into a navigable **knowledge graph** + **article reader**.

## What you can do
- Browse a graph of topics/notes (nodes + links).
- Open an article from a node and render Markdown (optionally math).
- Add/update articles through an API (so editors/automation can plug in later).
- Keep content in plain Markdown so it’s git-friendly.

## Getting started

### 1 Install

```bash
cd web
yarn
```

### 2 Environment variables

Create web/.env.local:

```bash
GITHUB_TOKEN=...
GITHUB_OWNER=...
GITHUB_REPO=...
GITHUB_BRANCH=main
```

### 3 Run locally

```bash
yarn dev
```
