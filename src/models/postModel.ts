import { Schema, model, InferSchemaType } from "mongoose";

const postSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    imageUrl: { type: String },
    imageKey: { type: String },
    isPublic: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// // optional cleaner output
// postSchema.set("toJSON", {
//   virtuals: true,
//   versionKey: false,
//   transform: (_, ret) => {
//     ret.id = ret._id;
//     delete ret._id;
//   },
// });

export type IPost = InferSchemaType<typeof postSchema>;
export const Post = model<IPost>("Post", postSchema);
