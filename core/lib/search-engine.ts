import { queryResult } from "@core/@types/query-result";

export const sortResult = (queryResult: queryResult, query: string) => {
  const queryArray = query.toLowerCase().split(" ");
  const resultArray = queryResult.map(result => {
    const keywordArray = result.keyword;
    const titleArray = result.title.toLowerCase().split(" ");
    let count = 0;
    for (const query of queryArray) {
      // check without case sensitive
      if (keywordArray?.includes(query)) count += 1;
      if (titleArray?.includes(query)) count += 10;
    }
    return { ...result, weight: count };
  });
  resultArray.sort((a, b) => b.weight - a.weight);
  return resultArray;
};
