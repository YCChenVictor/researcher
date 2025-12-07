import express from "express";
import asyncHandler from "express-async-handler";

import { create } from "../controllers/node";

const router = express.Router();

router.post("/", asyncHandler(create));

export default router;
