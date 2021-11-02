import ky from "ky-universal";
import { useQuery } from "react-query";
import { format, subDays } from "date-fns";
import { serialize } from "next-mdx-remote/serialize";

const BASE_URL = "https://content.jessetomchak.com/graphql";

const daysAgo = (n: number) => format(subDays(new Date(), n), "yyyy-MM-dd");

const mdSerialize = async (b: string) => await serialize(b);

async function fetchArticleBySlug(slug: string) {
  try {
    const parsed = await ky
      .post("https://content.jessetomchak.com/graphql", {
        json: {
          query: `
          query ArticleBySlug {
            articles( where: { slug_eq: "${slug}" }){
              id
              title
              body
              slug
              published
              updated_at
              category{
                Tag
              }
            }
          }
          `,
        },
      })
      .json();
    return parsed.data.articles[0];
  } catch (err) {
    console.log(err);
  }
}

async function fetchAllArticles() {
  try {
    const parsed = await ky
      .post("https://content.jessetomchak.com/graphql", {
        json: {
          query: `
      query AllArticles {
        articles{
          id
          title
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
    return parsed;
  } catch (error) {
    console.log(error);
  }
}

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
  const parsed = await ky
    .post("https://content.jessetomchak.com/graphql", {
      json: {
        query: `
    query FilteredArticles {
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

  return Promise.all(
    parsed.data.articles.map(
      async (article: { body: string; category: String[] }) => ({
        ...article,
        category: article.category.Tag,
        title: await mdSerialize(article.title),
        body: await mdSerialize(article.body),
        relativeSlug: `/${[
          new Date(article.published).getFullYear().toString(),
          article.category.Tag,
          article.slug,
        ].join("/")}`,
      })
    )
  );
}

const useArticles = () => {
  return useQuery(["articles"], () =>
    fetchArticles({ limit: 30, daysBack: 60 })
  );
};

export { fetchArticles, fetchAllArticles, fetchArticleBySlug, useArticles };
