import { Request, Response, NextFunction } from "express";
import { IApiResponse } from "../types/auth.types";
import { IPostResponse, IPostCreateRequest } from "../types/post.types";
import {
  createPost,
  getPublicPosts,
  getUserPosts,
  deletePost,
} from "../services/postService";

export const addPost = async (
  req: Request<{}, {}, IPostCreateRequest>,
  res: Response<IApiResponse<IPostResponse>>,
  next: NextFunction
) => {
  try {
    if (!req.user)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const post = await createPost(req.user, req.body);

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: {
        id: post.id,
        authorId: post.author.toString(),
        content: post.content,
        imageUrl: post.imageUrl,
        isPublic: post.isPublic,
        createdAt: post.createdAt!,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getFeed = async (
  _req: Request,
  res: Response<IApiResponse<IPostResponse[]>>,
  next: NextFunction
) => {
  try {
    const posts = await getPublicPosts();
    res.status(200).json({
      success: true,
      message: "Public posts fetched successfully",
      data: posts as unknown as IPostResponse[],
    });
  } catch (error) {
    next(error);
  }
};

export const getMyPosts = async (
  req: Request,
  res: Response<IApiResponse<IPostResponse[]>>,
  next: NextFunction
) => {
  try {
    if (!req.user)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const posts = await getUserPosts(req.user._id.toString());
    res.status(200).json({
      success: true,
      message: "User posts fetched successfully",
      data: posts as unknown as IPostResponse[],
    });
  } catch (error) {
    next(error);
  }
};

export const removePost = async (
  req: Request<{ id: string }>,
  res: Response<IApiResponse<null>>,
  next: NextFunction
) => {
  try {
    if (!req.user)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    await deletePost(req.params.id, req.user._id.toString());
    res
      .status(200)
      .json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};
