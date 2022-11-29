import { Fragment } from "react";
import { serialize } from "next-mdx-remote/serialize";
import { fetchAllArticles, fetchArticleBySlug } from "../src/hooks/useArticles";

import Article from "../src/components/Article";
import Layout from "../src/components/Layout";

const ArticlePage = ({ article }) => {
  // const _title = MDXRemote(title, {})
  // const content = MDXRemote(body, components)
  return (
    <div className="text-gray-200 flex flex-col  justify-center items-center">
      <div className="relative">
        <Article article={article} />
      </div>
    </div>
  );
};

ArticlePage.getLayout = (page) => <Layout>{page}</Layout>;

export const getStaticPaths = async () => {
  // Get the paths we want to pre-render based on persons
  const result = await fetchAllArticles();
  const paths = result?.data?.allPost?.map(
    ({ id, slug, categories, publishedAt }) => {
      const year = new Date(publishedAt).getFullYear().toString();
      // building slug path from year / category / sanity slug
      return {
        params: { slug: [year, categories[0].title, slug.current] },
      };
    }
  );
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

// This function gets called at build time on server-side.
export const getStaticProps = async ({ params }) => {
  // for query we only want the sanity slug of the array built in `getStaticPaths`
  const article = await fetchArticleBySlug(params.slug[2]);
  console.log(article);
  const { title, body, ...rest } = article;
  const mdxTitle = await serialize(title);
  const mdxBody = await serialize(body);
  return {
    props: {
      article: {
        title: mdxTitle,
        body: mdxBody,
        relativeSlug: `/${params.slug.join("/")}`,
        rest,
      },
    },
  };
};

export default ArticlePage;
