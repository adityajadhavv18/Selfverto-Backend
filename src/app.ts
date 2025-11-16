// src/app.ts
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import uploadRoutes from "./routes/uploadProfilePictureRoute";
import { errorHandler } from "./middlewares/errorMiddleware";
import path from "path";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/upload", uploadRoutes);

// Serve static files (e.g., images)
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Error handling
app.use(errorHandler);

export default app;
