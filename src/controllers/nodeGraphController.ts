import puppeteer from 'puppeteer';
import cheerio from 'cheerio';
import path from 'path';
import fs from 'fs';
import randomColor from 'randomcolor';
import { Request, Response, NextFunction } from 'express';
import main from 'crawl-website-connectedness';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const startPoint = `http://localhost:3000/blog/${req.body.category}/main`;
  const result = await main(startPoint)
  console.log(result);
};
