import {Fragment } from 'react'
import groq from "groq";
import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'
import client from "../../client";



import PostContainer from "../../components/PostContainer"


const Post = ({ title, name, categories, body } ) => {
  const _title = hydrate(title, {})
  const content = hydrate(body, {  })
  return (
   <>
   <PostContainer post={{
     title: _title,
     name, 
     content,
     categories
   }} />
      
     
 </>
  )
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
  const  { title, name, categories = null, body } = await client.fetch(singlePostQuery, { slug: params.slug });
  const mdxTitle = await renderToString(title, {})
  const mdxBody = await renderToString(body, {})
  return { props: { 
    title: mdxTitle, 
    body: mdxBody,
    name,
    categories
   } };
};

export default Post;
