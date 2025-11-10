import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { registerUser, loginUser } from "../services/userService";
import { IApiResponse, IAuthTokenPayload } from "../types/auth.types";
import {
  IUserResponse,
  IUserLoginRequest,
  IUserSignupRequest,
} from "../types/user.types";
import { logger } from "../utils/logger";

const JWT_SECRET = process.env.JWT_SECRET as string;

// ===============================
// SIGNUP
// ===============================
export const signup = async (
  req: Request<{}, {}, IUserSignupRequest>,
  res: Response<IApiResponse<IUserResponse>>,
  next: NextFunction
) => {
  try {
    const user = await registerUser(req.body);

    const tokenPayload: IAuthTokenPayload = {
      id: user.id, // ✅ user.id is a string
      email: user.email,
    };

    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "1h" });
    logger.info(`User registered: ${user.email}`);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      data: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Signup failed for ${req.body.email}: ${error.message}`);
    } else {
      logger.error(
        `Signup failed for ${req.body.email}: Unknown error occurred`
      );
    }
    next(error);
  }
};

// ===============================
// LOGIN
// ===============================
export const login = async (
  req: Request<{}, {}, IUserLoginRequest>,
  res: Response<IApiResponse<IUserResponse>>,
  next: NextFunction
) => {
  try {
    const user = await loginUser(req.body);

    const tokenPayload: IAuthTokenPayload = {
      id: user.id, // ✅ this is string-safe
      email: user.email,
    };

    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "1h" });
    logger.info(`User logged in: ${user.email}`);

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
      data: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.warn(`Login failed for ${req.body.email}: ${error.message}`);
    } else {
      logger.warn(`Login failed for ${req.body.email}: Unknown error occurred`);
    }
    next(error);
  }
};
