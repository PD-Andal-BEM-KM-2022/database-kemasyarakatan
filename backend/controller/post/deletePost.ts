import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
  postCollection: any,
  categoryCollection: any
) => {
  const { postId } = req.body;

  if (!postId) {
    return res.status(400).json({ message: "ID is required" });
  }

  const post = await postCollection.findOne({ _id: new ObjectId(postId) });

  if (!post || post.length === 0) {
    return res.status(404).json({ message: "Post not found" });
  }

  if (post) {
    // Update category collection
    const category = await categoryCollection.findOne({
      name: post.category,
    });

    await postCollection.deleteOne({
      _id: new ObjectId(postId),
    });

    if (category && category.count === 1) {
      await categoryCollection.deleteOne({
        name: post.category,
      });
    } else if (category) {
      category.count = category.count - 1;
      // filter out the post from the category

      category.posts = category.posts.filter(
        (post: ObjectId) => post.toString() !== postId
      );

      await categoryCollection.updateOne(
        { name: post.category },
        { $set: category }
      );

      return res
        .status(200)
        .json({ deletedId: postId, message: "Post deleted successfully" });
    }
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
