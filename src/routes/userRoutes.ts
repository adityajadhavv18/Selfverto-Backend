import express from "express";
import { getMyProfile } from "../controllers/userController";
import { authenticateUser } from "../middlewares/authMiddleware";

const router = express.Router();

// Protected route
router.get("/me", authenticateUser, getMyProfile);

export default router;
