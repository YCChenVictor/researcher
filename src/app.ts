import express from "express";
import nodeGraphRouter from "./routers/nodeGraphRouter";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();

const nodesStructurePath = "../blog-frontend/src/node-structure.json";

app.use(express.json());

const readNodesStructure = (dir: string) => {
  const nodesStructure = fs.readFileSync(dir, "utf8");

  return nodesStructure;
};

const writeNodesStructure = (dir: string, nodesData: string) => {
  fs.writeFileSync(dir, nodesData, "utf8");

  console.log("Nodes written successfully");
};

const readMarkdownFiles = (dir: string, fileList: string[] = []) => {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Recursively read files in subdirectories
      readMarkdownFiles(filePath, fileList);
    } else if (file.endsWith(".md")) {
      // Add .md file to the list
      fileList.push(filePath);
    }
  });

  return fileList;
};

const generateRandomColors = (num: number) => {
  const colors = [];

  for (let i = 0; i < num; i++) {
    const color = `#${Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0")}`;
    colors.push(color);
  }

  return colors;
};

app.use(
  cors({
    origin: process.env.FRONTEND_BASE_URL,
    methods: ["GET", "POST", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  }),
);

app.options("*", cors());

app.post("/refresh-nodes", () => {
  const articlesPath = "../blog-frontend/src/posts-submodule";
  const files = readMarkdownFiles(articlesPath);
  const fileNames = files.map((file) => path.relative(articlesPath, file));
  const structure: Record<string, string[]> = { base: [] };
  for (const fileName of fileNames) {
    const parts: string[] = fileName.split("/");
    const baseName = parts.pop();
    const folder = parts.pop();
    if (!structure[String(folder)]) {
      structure[String(folder)] = [];
    }
    if (!folder) {
      structure["base"].push(String(baseName).replace(".md", ""));
    } else {
      structure[folder].push(String(baseName).replace(".md", ""));
    }
  }

  const nodes = [];
  const colors = generateRandomColors(Object.keys(structure).length);
  let index = 0;
  for (const key in structure) {
    for (const item of structure[key]) {
      nodes.push({
        key: key + "/" + item,
        name: item,
        group: key,
        color: colors[index],
      });
    }
    index++;
  }

  const nodesStructure = readNodesStructure(nodesStructurePath);
  const parsedNodesStructure = JSON.parse(nodesStructure);
  parsedNodesStructure.nodes = nodes;

  writeNodesStructure(nodesStructurePath, JSON.stringify(parsedNodesStructure));
});

app.patch("/add-links", (req, res) => {
  const nodesStructure = readNodesStructure(nodesStructurePath);
  const parsedNodesStructure = JSON.parse(nodesStructure);
  if (!parsedNodesStructure.rawLinks) {
    parsedNodesStructure.rawLinks = {};
  }
  const link = req.body;
  const parents = link.parents;
  const children = link.children;
  parsedNodesStructure.rawLinks[link.key] = {
    parents: parents,
    children: children,
  };
  // for (const parent of parents) {
  //   parsedNodesStructure.links.push({ source: parent, target: link.key });
  // }
  // for (const child of children) {
  //   parsedNodesStructure.links.push({ source: link.key, target: child });
  // }
  writeNodesStructure(nodesStructurePath, JSON.stringify(parsedNodesStructure));
  res.send("OK");
});

// hello world
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// node graph
app.use("/node-graph", nodeGraphRouter);

export default app;
