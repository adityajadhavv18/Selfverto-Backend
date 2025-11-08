import { Types } from "mongoose";

export interface IPost {
  _id: any;
  author: Types.ObjectId;
  content: string;
  imageUrl?: string | null;
  isPublic: boolean;
}

export interface IPostCreateRequest {
  content: string;
  imageUrl?: string;
  isPublic: boolean;
}

export interface IPostResponse {
  id: any;
  authorId: string;
  content: string;
  imageUrl?: string | null;
  isPublic: boolean;
  createdAt: Date;
}
