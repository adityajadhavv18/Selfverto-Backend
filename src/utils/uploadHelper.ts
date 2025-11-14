import fs from "fs";
import path from "path";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { storageConfig } from "../config/storageConfig";
import { logger } from "./logger";

const s3 = new S3Client({
  region: storageConfig.aws.region,
  credentials: storageConfig.aws.credentials,
});

export interface UploadResult {
  url: string;
  key?: string;
}

/**
 * Upload file to storage (S3 or local)
 */
export const uploadFile = async (
  filePath: string,
  filename: string
): Promise<UploadResult> => {
  const mode = storageConfig.mode;

  if (mode === "aws") {
    try {
      const fileContent = fs.readFileSync(filePath);
      const command = new PutObjectCommand({
        Bucket: storageConfig.aws.bucket,
        Key: filename,
        Body: fileContent,
        ContentType: "image/jpeg",
      });
      await s3.send(command);

      const fileUrl = `https://${storageConfig.aws.bucket}.s3.${storageConfig.aws.region}.amazonaws.com/${filename}`;
      logger.info(`Uploaded to AWS S3: ${fileUrl}`);
      fs.unlinkSync(filePath); // delete local temp file
      return { url: fileUrl, key: filename };
    } catch (error: any) {
      logger.error(`S3 upload failed: ${error.message}`);
      throw new Error("Failed to upload to S3");
    }
  }

  // LOCAL fallback
  const localPath = path.join(__dirname, "../../uploads", filename);
  if (!fs.existsSync(path.dirname(localPath)))
    fs.mkdirSync(path.dirname(localPath), { recursive: true });
  fs.renameSync(filePath, localPath);
  logger.info(`Saved locally: ${localPath}`);
  return { url: `/uploads/${filename}` };
};
