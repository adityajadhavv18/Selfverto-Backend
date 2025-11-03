import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import logger from "./utils/logger";

dotenv.config();

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Default route
app.get("/", (req: Request, res: Response) => {
  logger.info("GET / route accessed");
  res.send("✅ SelfVerto backend is running!");
});

app.get("/test", (req: Request, res: Response) => {
  logger.info("GET /test route accessed");
  res.json({ success: true, message: "Test route working!" });
});

app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`);
});
