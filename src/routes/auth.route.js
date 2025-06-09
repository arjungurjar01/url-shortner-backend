import express from "express";
import { getCurrentUser, loginUser, logoutUser, registerUser } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout",logoutUser);
router.get("/user",authMiddleware,getCurrentUser);

export default router;
