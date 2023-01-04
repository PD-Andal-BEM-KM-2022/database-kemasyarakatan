import { NextApiRequest, NextApiResponse } from "next";
import { getCollection } from "@core/lib/mongodb";

let posts: any;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const [collection] = await getCollection(["posts"]);
  const limit = req.query.limit || 10;
  const category = req.query.category || "";
  const page = (Number(req.query.page) - 1) * Number(limit) || 0;
  const maxPage = Math.ceil(
    (await collection.countDocuments()) / Number(limit)
  );

  if (category) {
    // get posts by category (array)
    posts = await collection.find({ category: { $in: category } }).toArray();
  } else {
    posts = await collection.find({}).sort({ _id: -1 }).toArray();
  }

	posts.forEach((post) => {
		post.id = post._id;
		post.img = post.img[0];
		delete post._id;
		delete post.tags;
	});

	if (!posts) return res.status(404).json({ message: "Posts is empty" });

	if (page >= posts.length && page)
		return res.status(200).json({ message: "Page not valid" });

	if (limit > posts.length)
		return res.status(200).json({ length: posts.length, posts });
	else if (limit < 0)
		return res.status(200).json({ length: posts.length, posts });
	else if (limit > 0 && limit < posts.length)
		return res
			.status(200)
			.json({ maxPage, posts: posts.slice(page, page + Number(limit)) });
	else return res.status(200).json({ message: "Limit not valid" });
};
