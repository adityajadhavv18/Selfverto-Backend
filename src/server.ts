// src/server.ts
import dotenv from "dotenv";
import app from "./app";
import { logger } from "./utils/logger";

dotenv.config();

const PORT = process.env.PORT || 2418;

app.get("/", (req, res) => {
  res.send("✅ SelfVerto is running!");
});

app.listen(PORT, () => {
  logger.info(`✅ Server running on http://localhost:${PORT}`);
});
