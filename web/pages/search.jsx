import React, { Suspense } from "react";
import Article from "../src/components/Article";
import Layout from "../src/components/Layout";
import Pulse from "../src/components/Pulse";
import { useRouter } from "next/router";
import {
  fetchArticleByTerm,
  fetchArticlesSuspense,
} from "../src/hooks/useArticles";

import dynamic from "next/dynamic";

const Search = () => {
  const router = useRouter();
  const [articles, setArticles] = React.useState([]);
  React.useEffect(() => {
    async function fetch() {
      const resource = await fetchArticleByTerm(router.query.term);
      console.log(resource);
      setArticles(resource);
    }
    if (router.query.term) {
      fetch(router.query.term);
    }
  }, [router.query]);
  return (
    <div className="text-gray-200 flex flex-col  justify-center items-center">
      <div className="relative">
        {articles?.map((article) => (
          <Article
            key={article.id}
            article={{
              ...article,
              category: article.category.Tag,
              title: article.title,
              body: article.body,
              relativeSlug: `/${[
                new Date(article.published).getFullYear().toString(),
                article.category.Tag,
                article.slug,
              ].join("/")}`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

Search.getLayout = (page) => <Layout>{page}</Layout>;
export default Search;
