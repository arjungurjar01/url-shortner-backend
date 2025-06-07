import { createShortUrl } from "../controllers/shortUrl.controller.js";
import express from "express";

const router = express.Router();

router.post("/", createShortUrl);

export default router;
