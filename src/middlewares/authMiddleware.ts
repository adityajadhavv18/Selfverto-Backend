import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel";
import { IAuthTokenPayload } from "../types/auth.types";
import { logger } from "../utils/logger";

const JWT_SECRET = process.env.JWT_SECRET as string;

/**
 * Middleware to verify JWT and attach user to req.user
 */
export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      logger.warn("Missing Authorization header");
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as IAuthTokenPayload;

    // Find user in DB
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      logger.warn(`Invalid token used: ${token}`);
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    req.user = user; // ✅ typed via global.d.ts
    logger.info(`Authenticated user: ${user.email}`);
    next();
  } catch (error: any) {
    logger.error(`JWT Auth Error: ${error.message}`);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
