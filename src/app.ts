import express from "express";
import nodeGraphRouter from "./routers/nodeGraphRouter";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
// import path from "path";

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

// const readMarkdownFiles = (dir: string, fileList: string[] = []) => {
//   const files = fs.readdirSync(dir);

//   files.forEach((file) => {
//     const filePath = path.join(dir, file);
//     const stat = fs.statSync(filePath);

//     if (stat.isDirectory()) {
//       // Recursively read files in subdirectories
//       readMarkdownFiles(filePath, fileList);
//     } else if (file.endsWith(".md")) {
//       // Add .md file to the list
//       fileList.push(filePath);
//     }
//   });

//   return fileList;
// };

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

app.post("/refresh-links", (req, res) => {
  const nodesStructure = readNodesStructure(nodesStructurePath);
  const parsedNodesStructure = JSON.parse(nodesStructure);
  const rawLinks = parsedNodesStructure.rawLinks || {};
  parsedNodesStructure.links = [];

  for (const key in rawLinks) {
    for (const parent of rawLinks[key].parents) {
      parsedNodesStructure.links.push({ source: parent, target: key });
    }
    for (const child of rawLinks[key].children) {
      parsedNodesStructure.links.push({ source: key, target: child });
    }
  }
  writeNodesStructure(nodesStructurePath, JSON.stringify(parsedNodesStructure));
  res.send("OK");
});

app.post("/refresh-nodes", () => {
  const restructure: Record<string, Set<string>> = {};
  const nodes = [];
  const nodesStructure = JSON.parse(readNodesStructure(nodesStructurePath));
  const rawLinks = nodesStructure.rawLinks || {};
  const categories = new Set<string>();
  for (const key in rawLinks) {
    const parts: string[] = key.split("/");
    parts.pop();
    const folder = parts.pop();
    if (folder) {
      categories.add(folder);
    }
  }
  for (const key in rawLinks) {
    const combined = [key, ...rawLinks[key].parents, ...rawLinks[key].children];
    for (const item of combined) {
      const parts: string[] = item.split("/");
      const baseName = parts.pop();
      const folder = parts.pop();
      if (!baseName) {
        continue;
      }
      if (!folder) {
        continue;
      }
      if (!restructure[folder]) {
        restructure[folder] = new Set<string>();
      }
      restructure[folder].add(baseName);
    }
  }
  const colors = generateRandomColors(categories.size);
  let index = 0;
  for (const key in restructure) {
    for (const item of restructure[key]) {
      nodes.push({
        key: `/${key}/${item}`,
        name: item,
        group: key,
        color: colors[index],
      });
    }
    index++;
  }
  nodesStructure.nodes = nodes;
  writeNodesStructure(nodesStructurePath, JSON.stringify(nodesStructure));
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
