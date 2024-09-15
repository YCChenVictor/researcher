import express from "express";
import nodeGraphRouter from "./routers/nodeGraphRouter";
import articlePathRouter from "./routers/articlePathRouter";
import cors from "cors";

const app = express();

// parse application/json
app.use(express.json());

// cors
app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

// hello world
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// node graph
app.use("/node-graph", nodeGraphRouter);

// article path
app.use("/article-path", articlePathRouter);

export default app;
