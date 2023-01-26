import { NextApiRequest, NextApiResponse } from "next";
import { postReq, post } from "@core/@types/post";

export default async (req: NextApiRequest, res: NextApiResponse, postCollection: any, categoryCollection: any) => {
  const { title, content, img, contact, category, keywords, location } =
    req.body as postReq;

  // convert categories and keywords to lowercase
  const keywordsArr = keywords.map(keyword => keyword.toLowerCase());

  // validate required input
  if (!title || !content) {
    return res
      .status(400)
      .json({ success: "error", message: "Title and content are required" });
  }

  // category must exist
  if (!category) {
    return res
      .status(400)
      .json({ success: "error", message: "Category is required" });
  }

  const post = {
    title: title,
    content: content,
    location: location || null,
    img: img || [],
    contact: {
      name: contact?.name || null,
      email: contact?.email || null,
      facebook: contact?.facebook || null,
      phone: contact?.phone || null,
      instagram: contact?.instagram || null,
      twitter: contact?.twitter || null,
    },
    metadata: {
      tags: keywordsArr || [],
    },
    category: category || null,
    views: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    comments: [],
  } as post;

  const postExists = await postCollection.findOne({ title });

  if (postExists) {
    return res
      .status(400)
      .json({ success: false, message: "Post with title already exists" });
  }

  const result = await postCollection.insertOne(post);

  const categoriesExists = await categoryCollection.find().toArray();
  const categoriesExistsArr = categoriesExists.map(category => ({
    name: category.name,
    count: category.count,
  }));

  // update category
  if (categoriesExistsArr.some(category => category.name === post.category)) {
    const category = await categoryCollection.findOne({
      name: post.category,
    });

    if (category) {
      category.posts.push(result.insertedId);
      category.count = category.posts.length;
      await categoryCollection.updateOne(
        { name: category.name },
        { $set: category }
      );
    }
  } else {
    await categoryCollection.insertOne({
      name: post.category,
      posts: [result.insertedId],
      count: 1,
    });
  }

  return res
    .status(201)
    .json({ success: true, message: "Post created", id: result.insertedId });
};
