import express from "express";
import { create } from "../controllers/articlePathController";
import asyncHandler from "express-async-handler";

const router = express.Router();

router.post("/create", asyncHandler(create));

export default router;
