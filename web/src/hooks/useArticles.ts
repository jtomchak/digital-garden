import ky from "ky-universal";
import { useQuery } from "react-query";
import { format, subDays } from "date-fns";
import { serialize } from "next-mdx-remote/serialize";

const BASE_URL = "https://content.jessetomchak.com/graphql";

const daysAgo = (n: number) => format(subDays(new Date(), n), "yyyy-MM-dd");

const mdSerialize = async (b: string) => await serialize(b);

async function fetchArticles({
  limit,
  daysBack,
}: {
  limit: number;
  daysBack: number;
}) {
  const filters = `limit: ${limit}, sort:"published:desc", where: { published_gt: "${daysAgo(
    daysBack
  )}" }`;
  console.log(filters);
  const parsed = await ky
    .post("https://content.jessetomchak.com/graphql", {
      json: {
        query: `
    query AllArticles {
      articles(${filters}) {
        id
        title
        body
        slug
        published
        category {
          Tag
        }
      }
    }
  `,
      },
    })
    .json();
  console.log(parsed);

  return Promise.all(
    parsed.data.articles.map(
      async (article: { body: string; category: String[] }) => ({
        ...article,
        category: article.category.Tag,
        title: await mdSerialize(article.title),
        body: await mdSerialize(article.body),
      })
    )
  );
}

const useArticles = () => {
  return useQuery(["articles"], () =>
    fetchArticles({ limit: 30, daysBack: 60 })
  );
};

export { fetchArticles, useArticles };
