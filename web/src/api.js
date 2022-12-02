import client, { previewClient } from "./sanity";
import groq from "groq";

const postFields = groq`
_id,
title,
slug,
body,
publishedAt,
"slug":slug.current,
"category": categories[0]->title
`;

const postsSearchQuery = groq`*[_type == "post" && [title, body] match [$term]  ] {${postFields}}`;

export async function postsBySearch(term) {
  const data = await client.fetch(postsSearchQuery, { term });
  return data;
}
