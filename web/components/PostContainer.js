import styled from "@emotion/styled";
import { MDXRemote } from "next-mdx-remote";
import xw from "xwind";
import CodeHighlight from "./CodeHighlight";
import InLineCode from "./InlineCode";

const components = { code: CodeHighlight, inlineCode: InLineCode };

const PostContainer = ({ post: { title, name, content, categories } }) => {
  return (
    <div
      css={xw`px-4 py-10 max-w-3xl mx-auto sm:px-6 sm:py-12 sm:min-w-full lg:max-w-4xl lg:py-16 lg:px-8 xl:max-w-6xl`}
    >
      <article className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto">
        <h1>
          <MDXRemote {...title}></MDXRemote>
        </h1>
        <MDXRemote {...content} components={components}></MDXRemote>
      </article>
    </div>
  );
};

export default PostContainer;
