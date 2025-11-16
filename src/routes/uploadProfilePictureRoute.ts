import express from "express";
import { authenticateUser } from "../middlewares/authMiddleware";
import { upload } from "../config/upload";
import { uploadProfilePicture } from "../controllers/uploadProfilePictureController";

const router = express.Router();

router.post(
  "/profile-picture",
  authenticateUser,
  upload.single("image"),
  uploadProfilePicture
);

export default router;
