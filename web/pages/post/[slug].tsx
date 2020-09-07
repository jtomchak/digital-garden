import groq from "groq";
import client from "../../client";
import ReactMarkdown from "react-markdown";
// https://github.com/rexxars/react-markdown

import { GetStaticProps } from "next";

const Post = ({ post: { title, name, categories, body } }) => {
  return (
    <article>
      <h1>{title}</h1>
      <ReactMarkdown source={body} escapeHtml={false} />
      <span>By {name}</span>
      {categories && (
        <ul>
          Posted in
          {categories.map((category) => (
            <li key={category}>{category}</li>
          ))}
        </ul>
      )}
    </article>
  );
};

const postsQuery = `*[_type == "post"] { _id, "slug":slug.current }`;

const singlePostQuery = groq`*[_type == "post" && slug.current == $slug][0]{
    title,
    "name": author->name,
    "categories": categories[]->title,
    body
  }`;

export const getStaticPaths = async () => {
  // Get the paths we want to pre-render based on persons
  const posts = await client.fetch(postsQuery);
  const paths = posts.map(({ _id, slug }) => ({
    params: { id: _id, slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

// This function gets called at build time on server-side.
export const getStaticProps = async ({ params }) => {
  const post = await client.fetch(singlePostQuery, { slug: params.slug });
  return { props: { post } };
};

export default Post;
