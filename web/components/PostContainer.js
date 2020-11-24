import styled from "@emotion/styled";
import xw, { cx } from "xwind";

const PostContainer = ({ post: { title, name, content, categories } }) => {
  return (
    <div css={xw`flex flex-col p-6`}>
      <article className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
        <h1>{title}</h1>
        {content}
      </article>
    </div>
  );
};

export default PostContainer;
