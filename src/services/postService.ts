import { Post } from "../models/postModel";
import { IPostCreateRequest } from "../types/post.types";
import { IUserDocument } from "../models/userModel";
import { logger } from "../utils/logger";

/** Create new post */
export const createPost = async (
  author: IUserDocument,
  data: IPostCreateRequest
) => {
  const post = await Post.create({
    author: author._id,
    content: data.content,
    imageUrl: data.imageUrl,
    isPublic: data.isPublic,
  });
  logger.info(`New post created by ${author.email} (postId=${post._id})`);
  return post;
};

/** Fetch all public posts (feed) */
export const getPublicPosts = async () => {
  logger.info("Fetching all public posts for feed");
  return Post.find({ isPublic: true })
    .populate("author", "name email")
    .sort({ createdAt: -1 });
};

/** Fetch all posts by specific user */
export const getUserPosts = async (userId: string) => {
  logger.info(`Fetching posts for userId=${userId}`);
  return Post.find({ author: userId }).sort({ createdAt: -1 });
};

/** Delete a post (if owner) */
export const deletePost = async (postId: string, userId: string) => {
  const post = await Post.findById(postId);
  if (!post) {
    logger.warn(`Attempt to delete non-existent post: ${postId}`);
    throw new Error("Post not found");
  }
  if (post.author.toString() !== userId) {
    logger.warn(
      `Unauthorized delete attempt by userId=${userId} on postId=${postId}`
    );
    throw new Error("Unauthorized");
  }
  await post.deleteOne();
  logger.info(`Post deleted successfully (postId=${postId}, userId=${userId})`);
  return true;
};
