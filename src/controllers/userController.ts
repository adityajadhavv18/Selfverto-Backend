// // src/controllers/userController.ts
// import { Request, Response, NextFunction } from "express";
// import { getAllUsers } from "../services/userService";

// export const getUsers = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const users = await getAllUsers();
//     res.status(200).json(users);
//   } catch (error) {
//     next(error);
//   }
// };
