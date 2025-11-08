// src/types/global.d.ts
import { IUserDocument } from "./user.types";

declare global {
  namespace Express {
    interface Request {
      user?: IUserDocument;
    }
  }
}
