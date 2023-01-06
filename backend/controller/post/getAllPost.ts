import { NextApiRequest, NextApiResponse } from "next";

let posts: any;

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
  collection: any
) => {
  const limit = req.query.limit || 10;
  const category = req.query.category || "";
  const page = (Number(req.query.page) - 1) * Number(limit) || 0;
  const maxPage = Math.ceil(
    (await collection.countDocuments(category ? { category } : {})) /
      Number(limit)
  );

  if (limit <= 0)
    return res.status(200).json({
      message: "Limit not valid",
      detail: {
        yourLimit: req.query.limit,
        minLimit: 1,
      },
    });

  if (page < 0)
    return res.status(200).json({
      message: "Page not valid",
      detail: {
        yourPage: req.query.page,
        minPage: 1,
      },
    });

  if (category) {
    posts = await collection.find({ category }).sort({ _id: -1 }).toArray();
  } else {
    posts = await collection.find({}).sort({ _id: -1 }).toArray();
  }

  posts.forEach(post => {
    post.id = post._id;
    post.img = post.img[0];
    delete post._id;
    delete post.tags;
  });

  if (!posts) return res.status(404).json({ message: "Posts is empty" });

  if (page >= posts.length && page)
    return res.status(200).json({ message: "Page not valid" });

  if (limit === "all") {
    return res.status(200).json({ length: posts.length, posts });
  }

  if (limit > 0)
    return res.status(200).json({
      lenght: limit,
      maxPage,
      posts: posts.slice(page, page + Number(limit)),
    });
  else return res.status(200).json({ message: "Limit not valid" });
};
