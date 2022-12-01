import Article from "../src/components/Article";
import Layout from "../src/components/Layout";
import { MDXRemote } from "next-mdx-remote";
import { fetchArticles } from "../src/hooks/useArticles";
import { serialize } from "next-mdx-remote/serialize";

import CodeHighlight from "../src/components/CodeHighlight";
import InLineCode from "../src/components/InlineCode";

const components = { code: CodeHighlight, inlineCode: InLineCode };

const Home = ({ articles }) => {
  return (
    <div className="text-gray-200 flex flex-col  justify-center items-center">
      <div className="relative">
        {articles.map((a) => (
          <Article key={a._id} article={a} />
        ))}
      </div>
    </div>
  );
};

Home.getLayout = (page) => <Layout>{page}</Layout>;
export default Home;

export async function getStaticProps() {
  const { data } = await fetchArticles({ limit: 30, daysBack: 70 });
  const articles = await Promise.all(
    data.allPost.map(async (article) => ({
      ...article,
      category: article.categories[0].title,
      title: await serialize(article.title),
      body: await serialize(article.body),
      relativeSlug: `/${[
        new Date(article.publishedAt).getFullYear().toString(),
        article.categories[0].title,
        article.slug.current,
      ].join("/")}`,
    }))
  );
  return {
    props: {
      articles,
    },
  };
}
