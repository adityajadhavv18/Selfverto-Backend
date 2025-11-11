import { Request, Response, NextFunction } from "express";
import { IApiResponse } from "../types/auth.types";
import { IPostResponse, IPostCreateRequest } from "../types/post.types";
import {
  createPost,
  getPublicPosts,
  getUserPosts,
  deletePost,
} from "../services/postService";
import { logger } from "../utils/logger";

export const addPost = async (
  req: Request<{}, {}, IPostCreateRequest>,
  res: Response<IApiResponse<IPostResponse>>,
  next: NextFunction
) => {
  try {
    if (!req.user)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

    const isPublic =
      typeof req.body.isPublic === "string"
        ? req.body.isPublic === "true"
        : Boolean(req.body.isPublic);

    const post = await createPost(req.user, {
      ...req.body,
      imageUrl,
      isPublic,
    });

    logger.info(`Post created by ${req.user.email} with image=${!!imageUrl}`);

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
    const page = parseInt((_req.query.page as string) || "1", 10);
    const limit = parseInt((_req.query.limit as string) || "10", 10);
    const author = (_req.query.author as string) || undefined;

    const { posts, total, pages } = await getPublicPosts(page, limit, author);

    res.status(200).json({
      success: true,
      message: "Public posts fetched successfully",
      data: posts.map((post) => ({
        id: post.id,
        authorId: post.author.toString(),
        content: post.content,
        imageUrl: post.imageUrl,
        isPublic: post.isPublic,
        createdAt: post.createdAt!,
      })),
      meta: { total, page, pages },
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
