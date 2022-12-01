import ky from "ky-universal";
import { useQuery } from "react-query";
import { format, subDays } from "date-fns";

const BASE_URL = "https://04imn06s.api.sanity.io/v1/graphql/production/default";

const daysAgo = (n) => format(subDays(new Date(), n), "yyyy-MM-dd");

async function fetchArticleByTerm(term) {
  console.log(">>>TERM", term);
  try {
    const parsed = await ky
      .post(BASE_URL, {
        json: {
          query: `
          query SearchArticleByTerm($term: String) {
            allPost(  where: { title :  {matches: $term }, body:{matches:$term}}, limit: 10){
              title
              body
              slug{
                current
              }
              publishedAt
              _updatedAt
    					categories{
                title
              }
            }
            }
          `,
          variables: { term: `${term}` },
        },
      })
      .json();
    return parsed.data.allPost;
  } catch (err) {
    console.log(err);
  }
}

async function fetchArticlesSuspense(term) {
  let status = "pending";
  let result;
  let suspender = ky
    .post(BASE_URL, {
      json: {
        query: `
      query ArticleBySearch {
        articles(where: { title_contains: "${term}", body_contains: "${term}" }, limit: 10){
          title
          body
          id
        }
      }
      `,
      },
    })
    .json()
    .then(
      (r) => {
        status = "success";
        result = r.data.articles;
      },
      (e) => {
        status = "error";
        result = e;
      }
    );
  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    },
  };
}

async function fetchArticleBySlug(slug) {
  try {
    const parsed = await ky
      .post(BASE_URL, {
        json: {
          query: `query ArticleBySlug($slug: String) {
                  allPost( where: { slug : {current : {eq: $slug }}}){
                    _id
                    title
                    body
                    slug{
                      current
                    }
                    publishedAt
                    _updatedAt
                    categories{
                      title
                    }
                  }
                  }`,
          variables: { slug: `${slug}` },
        },
      })
      .json();
    return parsed.data.allPost[0];
  } catch (err) {
    console.log(err);
  }
}

async function fetchAllArticles({ start = 0 }) {
  const filters = `limit: 100, start: ${start}`;
  try {
    const parsed = await ky
      .post(BASE_URL, {
        json: {
          query: `
          query AllArticles {
            allPost{
              _id
              title
              slug{
                current
              }
              publishedAt
              categories {
                title
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

async function fetchArticles({ limit, daysBack }) {
  const filters = `limit: ${limit}, sort:"published:desc", where: { published_gt: "${daysAgo(
    daysBack
  )}" }`;
  const parsed = await ky
    .post(BASE_URL, {
      json: {
        query: `
        query LastestArticles {
          allPost(limit: 30, sort:{publishedAt: DESC}) {
            _id
            title
            body
            slug{
              current
            }
            publishedAt
            categories{
              title
            }
          }
      }
  `,
      },
    })
    .json();

  return parsed;
}

export {
  fetchArticleByTerm,
  fetchArticles,
  fetchAllArticles,
  fetchArticleBySlug,
  fetchArticlesSuspense,
};
