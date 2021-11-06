import Link from "next/link";
import { MDXRemote } from "next-mdx-remote";
import { LinkIcon } from "@heroicons/react/solid";
import CodeHighlight from "./CodeHighlight";
import InLineCode from "./InlineCode";

const components = { code: CodeHighlight, inlineCode: InLineCode };

const Article = ({ article: { title, body, relativeSlug } }) => {
  return (
    <div className="px-4 py-10 max-w-1xl mx-auto sm:px-6 sm:py-12 sm:min-w-full lg:max-w-2xl lg:py-16 lg:px-8 xl:max-w-6xl">
      <article className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto">
        <h1>{title}</h1>
        {body}
      </article>
      <Link href={relativeSlug} passHref>
        <a className="inline-flex float-right items-center object-right px-2.5 py-1.5 mt-3 text-xs font-medium rounded text-gray-700 bg-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white-200">
          <LinkIcon className="h-5 w-5 mr-2 text-white-500" />
          <span>Link</span>
        </a>
      </Link>
    </div>
  );
};

export default Article;
