import express, { Request, Response } from "express";

import { call } from "../services/llm";
import { decomposeBody } from "../schema/decompose";
import { validateBody } from "../middleware/validation";

const router = express.Router();

router.post(
  "/",
  validateBody(decomposeBody),
  async (req: Request, res: Response) => {
    const answer = await call(req.body);
    res.status(200).json({ answer });
  },
);
