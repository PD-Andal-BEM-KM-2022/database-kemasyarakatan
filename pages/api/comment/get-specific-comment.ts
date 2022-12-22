import clientPromise from "@core/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { commentType } from "@core/@types/post";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const { postId, commentId } = req.body;
  if (!postId || !commentId) {
    return res.status(400).json({
      success: false,
      message: "Bad Request please provide commentId and postId",
    });
  }

  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed (GET ONLY)" });
  }

  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("posts");
  const post = await collection.findOne({ _id: new ObjectId(postId) });
  if (!post) {
    return res
      .status(404)
      .json({ success: false, message: `Post with id:${postId} not found` });
  }
  const comment = post.comments.find(
    comment => comment._id.toString() === commentId
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
