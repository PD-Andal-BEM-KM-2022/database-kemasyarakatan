import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { commentType } from "@core/@types/post";

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
  postId: string,
  commentId: string,
  collection: any
) => {
  if (!postId || !commentId) {
    return res.status(400).json({
      success: false,
      message: "Bad Request please provide commentId and postId",
    });
  }

  const post = await collection.findOne({ _id: new ObjectId(postId) });
  if (!post) {
    return res
      .status(404)
      .json({ success: false, message: `Post with id:${postId} not found` });
  }
  const comment = post.comments.find(
    (comment: any) => comment._id.toString() === commentId
  );

  if (!comment) {
    return res.status(404).json({
      success: false,
      message: `Comment with id:${commentId} not found`,
    });
  }

  return res.status(200).json({
    success: true,
    message: "Comment found",
    comment: comment as commentType,
  });
};
