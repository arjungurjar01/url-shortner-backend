import express from "express";
import { getAllShortUrls} from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();


router.get("/urls",authMiddleware,getAllShortUrls);

export default router;
