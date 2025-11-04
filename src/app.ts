// src/app.ts
import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import { errorHandler } from "./middlewares/errorMiddleware";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

// Error handling
app.use(errorHandler);

export default app;
