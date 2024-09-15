import getArticleFilePaths from "../services/articleFilePaths";
import { Request, Response } from "express";

const create = async (req: Request, res: Response) => {
  const dirPath = req.body.dirPath;
  try {
    const paths = await getArticleFilePaths(dirPath);
    res.status(200).json(paths);
  } catch (err) {
    res.status(500).json(err);
  }
};

export { create };
