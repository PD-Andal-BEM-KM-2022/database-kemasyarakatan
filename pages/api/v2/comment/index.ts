import { getCollection } from "@core/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import {
  getComment,
  createComment,
  deleteComment,
  getAllComment,
  getPostComments,
} from "@backend/controller/comment";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const [postCollection, commentCollection] = await getCollection([
    "posts",
    "comments",
  ]);

  if (req.method === "GET") {
    const postId = req.query.postId as string;
    const commentId = req.query.commentId as string;

    if (postId && commentId) {
      return getComment(req, res, postId, commentId, commentCollection);
    } else if (postId) {
      return getPostComments(req, res, postId, commentCollection);
    } else {
      return getAllComment(req, res, commentCollection);
    }
  } else if (req.method === "POST") {
    createComment(req, res, commentCollection, postCollection);
  } else if (req.method === "DELETE") {
    return deleteComment(req, res, commentCollection, postCollection);
  } else {
    return res.status(400).json({ status: false, message: "Invalid request" });
  }
};
