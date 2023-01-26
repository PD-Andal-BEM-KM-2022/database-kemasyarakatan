import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
  commentCollection: any,
  postCollection: any
) => {
  const { comment, postId } = req.body;

  if (!postId) {
    res.status(400).json({ status: false, message: "Post id is required" });
    return;
  }

  if (!comment) {
    res.status(400).json({ status: false, message: "Comment is required" });
    return;
  }

  // check if post exists
  const post = await postCollection.findOne({ _id: new ObjectId(postId) });
  if (!post) {
    return res
      .status(404)
      .json({ success: false, message: `Post with id:${postId} not found` });
  } else {
    // create comment
    const result = await commentCollection.insertOne({
      postId: new ObjectId(postId),
      comment,
      createdAt: new Date(),
    });

    // update post with comment
    const updatedPost = await postCollection.updateOne(
      { _id: new ObjectId(postId) },
      { $push: { comments: result.insertedId } }
    );

    return res.status(200).json({
      success: true,
      message: "Comment created",
      id: result.insertedId,
    });
  }
};
