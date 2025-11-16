import { Request, Response, NextFunction } from "express";
import { uploadFile } from "../utils/uploadHelper";
import { User } from "../models/userModel";
import { storageConfig } from "../config/storageConfig";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: storageConfig.aws.region,
  credentials: storageConfig.aws.credentials,
});

export const uploadProfilePicture = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    // Upload new file
    const upload = await uploadFile(req.file.path, req.file.filename);

    // Delete old profile picture
    if (req.user.profilePictureKey && storageConfig.mode === "aws") {
      await s3.send(
        new DeleteObjectCommand({
          Bucket: storageConfig.aws.bucket,
          Key: req.user.profilePictureKey,
        })
      );
    }

    // Update user
    req.user.profilePictureUrl = upload.url;
    req.user.profilePictureKey = upload.key;
    await req.user.save();

    res.status(200).json({
      success: true,
      message: "Profile picture updated",
      data: { url: upload.url },
    });
  } catch (error) {
    next(error);
  }
};
