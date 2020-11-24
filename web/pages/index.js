import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import Link from "next/link";
import client from "../client";

import PostContainer from "../components/PostContainer";

const Index = ({ posts = [] }) => {
  return (
    <>
      {posts.map(({ _id, title, body, relativeUrl, categories }) => {
        const _title = hydrate(title, {});
        const content = hydrate(body, {});
        return (
          <PostContainer
            key={_id}
            post={{
              title: _title,
              content,
              categories,
              relativeUrl,
            }}
          />
        );
      })}
    </>
  );
};

export const getStaticProps = async () => {
  const rawPosts = await client.fetch(
    `*[_type == "post" && publishedAt < now()]|order(publishedAt desc){
      ...,
      "slug":slug.current,
      "categories":categories[]->.title
    }`
  );
  // mdx render
  const postResponse = rawPosts.map(
    async ({ title, body, categories = null, publishedAt, slug, ...rest }) => {
      const mdxTitle = await renderToString(title, {});
      const mdxBody = await renderToString(body, {});
      const datePath = new Date(publishedAt).toLocaleDateString("en-GB");
      const relativeUrl = `${datePath}/${slug}`;
      return {
        title: mdxTitle,
        body: mdxBody,
        categories,
        relativeUrl,
        ...rest,
      };
    }
  );
  // All Rendered yet?
  const renderedPosts = await Promise.all(postResponse);

  return {
    props: { posts: renderedPosts }, // will be passed to the page component as props
  };
};

export default Index;
