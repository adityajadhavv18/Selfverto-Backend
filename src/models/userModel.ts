import mongoose, { Schema, Document, InferSchemaType } from "mongoose";

export interface IUserDocument extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export type User = InferSchemaType<typeof userSchema>;
export const User = mongoose.model<IUserDocument>("User", userSchema);
