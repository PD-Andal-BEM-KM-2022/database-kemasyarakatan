import { NextApiRequest, NextApiResponse } from "next";
import { getCollection } from "@core/lib/mongodb";
import { ObjectId } from "mongodb";
import { protectMethod, protectRoute } from "@core/lib/api/middleware";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  protectRoute(req, res);
  protectMethod(req, res, "DELETE");
  const [categoriesCollection, postCollection] = await getCollection([
    "categories",
    "posts",
  ]);

  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }

  const post = await postCollection.find({ _id: id });

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const result = await postCollection.deleteOne({ _id: new ObjectId(id) });

  if (result.deletedCount === 1) {
    // Update category count
    const category = await categoriesCollection.findOne({
      _id: new ObjectId(post.category),
    });

    if (category) {
      category.count = category.count - 1;
      await categoriesCollection.updateOne(
        { _id: new ObjectId(post.category) },
        { $set: category }
      );
      return res
        .status(200)
        .json({ deletedId: id, message: "Post deleted successfully" });
    }
  }

  return res.status(500).json({ message: "Something went wrong" });
};
