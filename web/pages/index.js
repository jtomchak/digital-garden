import { serialize } from "next-mdx-remote/serialize";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import xw, { cx } from "xwind";

import client from "../client";

import PostContainer from "../components/PostContainer";

const styles = {
  container: xw`text-gray-200 flex flex-col  justify-center items-center`,
};

const Index = ({ posts = [] }) => {
  const onShare = (title, relativeUrl) => {
    if (navigator.share) {
      navigator
        .share({
          title: title,
          text: `Check out ${title}`,
          url: `${document.location.href.replace(/\/$/, "")}${relativeUrl}`,
        })
        .then(() => {
          console.log("Successfully shared");
        })
        .catch((error) => {
          console.error("Something went wrong sharing the blog", error);
        });
    }
  };
  return (
    <div css={styles.container}>
      {posts.map(({ _id, title, body, relativeUrl, category, rawTitle }) => {
        return (
          <div className="relative">
            <PostContainer
              key={_id}
              post={{
                title,
                content: body,
                category,
                relativeUrl,
              }}
            />
            <span className="absolute  bottom-0 left-8 inline-flex shadow-sm rounded-md">
              <button
                onClick={(e) => onShare(rawTitle, relativeUrl)}
                className="relative inline-flex items-center px-2 py-1 rounded-l-md border border-gray-300 bg-gray text-xs font-medium text-white-700 hover:bg-gray-500 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                Share
                <svg
                  className="ml-2 -mr-0.5 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="-ml-px relative inline-flex items-center px-2 py-1 rounded-r-md border border-gray-300 bg-grey text-xs font-medium text-white-700 hover:bg-gray-500 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <Link href={relativeUrl}>
                  <a>link</a>
                </Link>
              </button>
            </span>
          </div>
        );
      })}
    </div>
  );
};

export const getStaticProps = async () => {
  const rawPosts = await client.fetch(
    `*[_type == "post" && publishedAt < now()]|order(publishedAt desc){
      ...,
      "slug":slug.current,
      "category":categories[0]->.title
    }`
  );
  // mdx render
  const postResponse = rawPosts.map(
    async ({ title, body, category = null, publishedAt, slug, ...rest }) => {
      const mdxTitle = await serialize(title);
      const mdxBody = await serialize(body);
      const year = new Date(publishedAt).getFullYear().toString();
      const relativeUrl = `/${year}/${category}/${slug}`;
      return {
        rawTitle: title,
        title: mdxTitle,
        body: mdxBody,
        category,
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
