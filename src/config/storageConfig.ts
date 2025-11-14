import "dotenv/config";
export const storageConfig = {
  mode: process.env.UPLOAD_MODE || "local", // "aws" or "local"
  aws: {
    region: process.env.AWS_REGION!,
    bucket: process.env.AWS_S3_BUCKET!,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  },
  local: {
    path: process.env.UPLOAD_LOCAL_PATH || "uploads",
  },
};
