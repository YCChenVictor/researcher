import express from "express";
import nodeGraphRouter from "./routers/nodeGraphRouter";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_BASE_URL,
  }),
);

// hello world
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// node graph
app.use("/node-graph", nodeGraphRouter);

export default app;
