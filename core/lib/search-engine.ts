import { queryResult } from "@core/@types/query-result";

export const sortResult = (queryResult: queryResult, query: string) => {
  const queryArray = query.toLowerCase().split(" ");
  const resultArray = queryResult.map(result => {
    const keywordArray = result.keyword;
    const categoryArray = result.category;
    const titleArray = result.title.toLowerCase().split(" ");
    let count = 0;
    for (const query of queryArray) {
      // check without case sensitive
      if (keywordArray?.includes(query)) count += 1;
      if (categoryArray?.includes(query)) count += 1.5;
      if (titleArray?.includes(query)) count += 3;
    }
    return { ...result, weight: count };
  });
  resultArray.sort((a, b) => b.weight - a.weight);
  return resultArray;
};
