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
        {articles.map((a) => {
          const mdTitle = <MDXRemote {...a.title}></MDXRemote>;
          const mdBody = (
            <MDXRemote {...a.body} components={components}></MDXRemote>
          );
          return (
            <Article
              key={a.id}
              article={{ ...a, title: mdTitle, body: mdBody }}
            />
          );
        })}
      </div>
    </div>
  );
};

Home.getLayout = (page) => <Layout>{page}</Layout>;
export default Home;

export async function getStaticProps() {
  const parsed = await fetchArticles({ limit: 30, daysBack: 70 });
  const articles = await Promise.all(
    parsed.data.articles.map(async (article) => ({
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
