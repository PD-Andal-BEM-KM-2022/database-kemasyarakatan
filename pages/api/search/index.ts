import { NextApiRequest, NextApiResponse } from "next";
import { sortResult } from "@core/lib/search-engine";
import clientPromise from "@core/lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const query  = req.query.search as string;
  if (!query) return res.status(400).json({ message: "Query is required" });

  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("posts");

  const posts = await collection.find({}).toArray();

  const items = posts.map(post => {
    return {
      title: post.title,
      keyword: post?.tags?.keywords,
      category: post?.tags?.categories,
      content: post.content,
      id: post._id.toString(),
    };
  });

  const result = items.filter(item => {
    const title = item.title.toLowerCase();
    const content = item.content.toLowerCase().split();
    const keywordString = item.keyword.join(" ") || "";
    const categoryString = item.category.join(" ") || "";
    const queryLowerCase = query.toLowerCase();

    return (
      title.includes(queryLowerCase) ||
      content.includes(queryLowerCase) ||
      keywordString.includes(queryLowerCase) ||
      categoryString.includes(queryLowerCase)
    );
  });

  const sortedResult = sortResult(result, query);

  const queryResult = sortedResult.map(item => ({
    id: item.id.toString(),
    title: item.title,
  }));

  if (queryResult.length === 0)
    return res.status(200).json({ message: "recommendation not found", status: true });

  res.status(200).json({
    result: queryResult,
    message: "recommendation is found",
  });
  res.end();
};
