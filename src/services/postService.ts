import { Post } from "../models/postModel";
import { IPostCreateRequest } from "../types/post.types";
import { IUserDocument } from "../models/userModel";

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
  return post;
};

/** Fetch all public posts (feed) */
export const getPublicPosts = async () => {
  return Post.find({ isPublic: true })
    .populate("author", "name email")
    .sort({ createdAt: -1 });
};

/** Fetch all posts by specific user */
export const getUserPosts = async (userId: string) => {
  return Post.find({ author: userId }).sort({ createdAt: -1 });
};

/** Delete a post (if owner) */
export const deletePost = async (postId: string, userId: string) => {
  const post = await Post.findById(postId);
  if (!post) throw new Error("Post not found");
  if (post.author.toString() !== userId) throw new Error("Unauthorized");
  await post.deleteOne();
  return true;
};
