import { User } from "../models/userModel";
import bcrypt from "bcrypt";
import { IUserSignupRequest, IUserLoginRequest } from "../types/user.types";

export const registerUser = async (userData: IUserSignupRequest) => {
  const { name, email, password } = userData;
  const existing = await User.findOne({ email });
  if (existing) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });
  return user;
};

export const loginUser = async (credentials: IUserLoginRequest) => {
  const { email, password } = credentials;
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  return user;
};
