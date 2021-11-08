import React, { Suspense } from "react";
import Article from "../src/components/Article";
import Layout from "../src/components/Layout";
import { MDXRemote } from "next-mdx-remote";
import { useRouter } from "next/router";
import { serialize } from "next-mdx-remote/serialize";
import { fetchArticleByTerm } from "../src/hooks/useArticles";

import CodeHighlight from "../src/components/CodeHighlight";
import InLineCode from "../src/components/InlineCode";

const components = { code: CodeHighlight, inlineCode: InLineCode };

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
  const articles = await Promise.all(
    parsed.map(async (article) => ({
      ...article,
      category: article.category.Tag,
      title: await serialize(article.title),
      body: await serialize(article.body),
      relativeSlug: `/${[
        new Date(article.published).getFullYear().toString(),
        article.category.Tag,
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
