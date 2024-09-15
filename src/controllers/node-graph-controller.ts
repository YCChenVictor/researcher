import generateGraphData from "../services/generate-graph-data";
import { Request, Response } from "express";

export const create = async (req: Request, res: Response) => {
  const result = await generateGraphData();
  res.status(200).json(result);
  return;
};
