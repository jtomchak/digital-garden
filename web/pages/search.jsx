import React, { Suspense } from "react";
import Article from "../src/components/Article";
import Layout from "../src/components/Layout";
import { useRouter } from "next/router";
import { serialize } from "next-mdx-remote/serialize";
import { fetchArticleByTerm } from "../src/hooks/useArticles";
import { postsBySearch } from "../src/api";

const Search = ({ articles }) => {
  const router = useRouter();
  return (
    <div className="text-gray-200 flex flex-col  justify-center items-center">
      <div className="relative">
        {articles.length === 0 ? (
          // eslint-disable-next-line react/no-unescaped-entities
          <span>No results found for '{router.query.term}'</span>
        ) : (
          articles.map((a) => <Article key={a.id} article={a} />)
        )}
      </div>
    </div>
  );
};

Search.getLayout = (page) => <Layout>{page}</Layout>;
export default Search;

export async function getServerSideProps(context) {
  const parsed = await fetchArticleByTerm(context.query.term);
  const results = await postsBySearch(context.query.term);
  console.log(results);
  const articles = await Promise.all(
    results.map(async (article) => ({
      ...article,
      category: article.category,
      title: await serialize(article.title),
      body: await serialize(article.body),
      relativeSlug: `/${[
        new Date(article.publishedAt).getFullYear().toString(),
        article.category,
        article.slug,
      ].join("/")}`,
    }))
  );
  return {
    props: {
      articles,
    },
  };
}
