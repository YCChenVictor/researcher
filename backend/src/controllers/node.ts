import { Request, Response } from "express";
import { createPost } from "../services/github";

const create = async (req: Request, res: Response) => {
  const { filename, content } = req.body;

  try {
    const data = await createPost(filename, content);
    res.status(201).json(data);
  } catch (err: unknown) {
    if (err instanceof Error && err.message.includes("already exists")) {
      res.status(409).json({ error: err.message });
      return;
    }

    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { create }
