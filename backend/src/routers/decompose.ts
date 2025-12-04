import express, { NextFunction, Request, Response } from "express";

import { call } from "../services/llm/call";
import { decomposeBody } from "../schema/decompose";
import { validateBody } from "../middleware/validation";
import buildMessage from "../services/llm/message";

const router = express.Router();

router.post(
  "/",
  validateBody(decomposeBody),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { topic, numberOfSubTopic } = req.body;

      let answer;
      if (process.env.NODE_ENV === "dev") {
        answer = {
          topics: [
            {
              title:
                "Architecting a digital payments infrastructure for UBI delivery using New Zealand’s existing tax collection systems",
            },
            {
              title:
                "Integrating national ID and authentication systems to securely identify and enroll UBI recipients in New Zealand",
            },
            {
              title:
                "Evaluating administrative efficiency and cost-effectiveness of UBI delivery via existing tax and ID infrastructure in New Zealand",
            },
            {
              title:
                "Assessing equity, inclusion, and error risks (exclusion, duplication, fraud) in a UBI system built on current tax and ID databases",
            },
            {
              title:
                "Designing governance, data protection, and interoperability standards for New Zealand’s UBI digital infrastructure",
            },
          ],
        };
      } else {
        const messages = await buildMessage({
          professional: "economist",
          numberOfSubTopic: numberOfSubTopic ?? 5,
          topic,
        });
        answer = await call(messages);
      }

      res.status(200).json({ answer });
    } catch (err) {
      next(err);
    }
  },
);

export default router;
