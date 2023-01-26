import { NextApiRequest, NextApiResponse } from "next";
import { sortResult } from "@core/lib/search-engine";
import { getCollection } from "@core/lib/mongodb";
import { post } from "@core/@types/post";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query.id as string;
  if (!query)
    return res.status(400).json({
      status: false,
      message: "Query is required",
      details: {
        yourQuery: query || "undefined",
        expectedExample: "http://localhost:3000/api/v2/search?search=lari",
      },
    });
  if (query.length < 3)
    return res.status(400).json({
      status: false,
      message: "Query is too short",
      details: {
        yourQuery: query,
        reason: `Your query lenght just ${query.length}, but required >= 3 length`,
        example: "http://localhost:3000/api/v2/search?search=jog",
      },
    });

  const [collection] = await getCollection(["posts"]);

  const posts = await collection.find({}).toArray();

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
        .json({
          status: false,
          message: "recommendation not found",
          advice: `You can try to search with another query`,
        });

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
