import generateGraphData from '../services/generate-graph-data';
import { Request, Response, NextFunction } from 'express';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const result = await generateGraphData();
  res.status(200).json(result);
  return;
};
