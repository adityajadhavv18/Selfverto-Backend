// src/services/userService.ts
import { logger } from "../utils/logger";

export const getAllUsers = async () => {
  logger.info("Fetched all users");
  return [
    { id: 1, name: "Aditya" },
    { id: 2, name: "John Doe" },
  ];
};
