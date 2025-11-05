// src/server.ts
import dotenv from "dotenv";
import app from "./app";
import { logger } from "./utils/logger";
import { connectDB } from "./config/db";

dotenv.config();

const PORT = process.env.PORT || 2418;

app.get("/", (req, res) => {
  res.send("✅ SelfVerto is running!");
});

connectDB().then(() => {
  app.listen(PORT, () => {
    logger.info(`✅ Server running on http://localhost:${PORT}`);
  });
});
