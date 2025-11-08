import express from "express";
import {
  addPost,
  getFeed,
  getMyPosts,
  removePost,
} from "../controllers/postController";
import { authenticateUser } from "../middlewares/authMiddleware";

const router = express.Router();

// Public feed
router.get("/feed", getFeed);

// Authenticated actions
router.post("/", authenticateUser, addPost);
router.get("/mine", authenticateUser, getMyPosts);
router.delete("/:id", authenticateUser, removePost);

export default router;
