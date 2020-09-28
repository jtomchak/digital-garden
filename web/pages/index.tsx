// index.js
import Link from "next/link";
import client from "../client";

const Index = ({ posts = [] }) => {
  return (
    <div>
      <h1>Welcome to a blog!</h1>
      {posts.map(
        ({ _id, title = "", slug = "", _updatedAt = "" }) =>
          slug && (
            <li key={_id}>
              <Link href="/posts/[slug]" as={`/posts/${slug.current}`}>
                <a>{title}</a>
              </Link>
              ({new Date(_updatedAt).toDateString()})
            </li>
          )
      )}
    </div>
  );
};

export const getStaticProps = async () => {
  const posts = await client.fetch(
    `*[_type == "post" && publishedAt < now()]|order(publishedAt desc)`
  );
  return {
    props: { posts }, // will be passed to the page component as props
  };
};

export default Index;
