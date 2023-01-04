import { NextApiRequest, NextApiResponse } from "next";
import { sortResult } from "@core/lib/search-engine";
import { getCollection } from "@core/lib/mongodb";
import { post } from "@core/@types/post";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query.search as string;
  if (!query) return res.status(400).json({ message: "Query is required" });

  const [collection] = await getCollection(["posts"]);

  const posts = (await collection.find({}).toArray()) as post[];

  try {
    const items = posts.map(post => {
      return {
        id: post?._id.toString(),
        title: post.title,
        keyword: post?.metadata?.tags,
        category: post?.category,
        content: post.content,
      };
    });

    const result = items.filter(item => {
      const title = item.title.toLowerCase();
      const content = item.content.join(" ").toLowerCase();
      const keywordString = item.keyword.join(" ") || "";
      const category = item.category;
      const queryLowerCase = query.toLowerCase();

      return (
        title.includes(queryLowerCase) ||
        content.includes(queryLowerCase) ||
        keywordString.includes(queryLowerCase) ||
        category.includes(queryLowerCase)
      );
    });

    const sortedResult = sortResult(result, query);

    const queryResult = sortedResult.map(item => ({
      id: item.id.toString(),
      title: item.title,
    }));

    if (queryResult.length === 0)
      return res
        .status(200)
        .json({ message: "recommendation not found", status: true });

    res.status(200).json({
      result: queryResult,
      message: "recommendation is found",
    });
    res.end();
  } catch (error) {
    return res
      .status(500)
      .json({ status: "Server Logic Error", message: error.message });
  }
};
