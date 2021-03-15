import {Fragment } from 'react'
import groq from "groq";
import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'
import client from "../client";



import PostContainer from "../components/PostContainer"
import CodeHighlight from '../components/CodeHighlight'
import InLineCode from '../components/InlineCode'

const components = {code: CodeHighlight, inlineCode: InLineCode}


const Post = ({ title, name, categories, body } ) => {
  const _title = hydrate(title, {})
  const content = hydrate(body, {components})
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

const postsQuery = `*[_type == "post"] { _id, "slug":slug.current, publishedAt, "category": categories[0]->title}`;

const singlePostQuery = groq`*[_type == "post" && slug.current == $slug][0]{
    title,
    "name": author->name,
    "category": categories[0]->title,
    publishedAt,
    body
  }`;

export const getStaticPaths = async () => {
  // Get the paths we want to pre-render based on persons
  const posts = await client.fetch(postsQuery);
  const paths = posts.map(({ _id, slug, category, publishedAt }) => {
    const year = new Date(publishedAt).getFullYear().toString();
    // building slug path from year / category / sanity slug
    return {params: { id: _id, slug: [year, category, slug] }}
  });
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

// This function gets called at build time on server-side.
export const getStaticProps = async ({ params }) => {
  // for query we only want the sanity slug of the array built in `getStaticPaths`
  const  { title,  body, ...post } = await client.fetch(singlePostQuery, { slug: params.slug[2] });
  const mdxTitle = await renderToString(title, {})
  const mdxBody = await renderToString(body, {components}, null)
  return { props: { 
    slug: params.slug,
    title: mdxTitle, 
    body: mdxBody,
    ...post
   } };
};

export default Post;
