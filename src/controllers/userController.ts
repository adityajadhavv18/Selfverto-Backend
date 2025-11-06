import { Request, Response, NextFunction } from "express";
import { IApiResponse } from "../types/auth.types";
import { IUserResponse } from "../types/user.types";

export const getMyProfile = async (
  req: Request,
  res: Response<IApiResponse<IUserResponse>>,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
    }

    const { id, name, email } = req.user;

    res.status(200).json({
      success: true,
      message: "Fetched user profile",
      data: { id, name, email },
    });
  } catch (error) {
    next(error);
  }
};
