import type { Request, Response, NextFunction, RequestHandler } from "express";
import { z } from "zod";

const validateQuery = (schema: z.ZodTypeAny): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      res.status(400).json({ errors: result.error.format() });
      return;
    }

    res.locals.query = result.data;
    next();
  };
};

const validateParams = (schema: z.ZodTypeAny): RequestHandler => {
  return (req, res, next) => {
    const result = schema.safeParse(req.params);

    if (!result.success) {
      res.status(400).json({
        message: "Invalid URL parameters",
        errors: result.error.flatten(),
      });
      return;
    }

    res.locals.params = result.data;
    next();
  };
};

const validateBody = (schema: z.ZodTypeAny): RequestHandler => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        message: "Invalid request body",
        errors: result.error.flatten(),
      });
      return;
    }

    res.locals.body = result.data;
    next();
  };
};

export { validateBody, validateQuery, validateParams };
