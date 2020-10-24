import styled from "@emotion/styled";
import { css } from "emotion";
import tw from "@tailwindcssinjs/macro";
import Post from "../pages/posts/[slug]";

const PostWrapper = styled.div`
  ${tw`container mx-auto flex flex-wrap py-6 max-w-xl`}

  > article {
    ${tw`flex flex-col`}
  }
`;

const sectionStyled = css`
  ${tw`w-full flex flex-col items-center px-3`}
`;
const articleStyled = css`
  ${tw`flex flex-col`}
`;
const titleAnchorStyled = css`
  ${tw`text-gray-400 hover:text-white text-3xl font-bold pb-4 pt-2 px-4`}
`;
const Title = styled(`a`)`
  ${tw`text-gray-400 hover:text-white text-3xl font-bold pb-4 pt-2 px-4`}
`;

const Byline = styled(`p`)`
  ${tw`text-gray-400 text-sm pb-8 px-8`}
  > a {
    ${tw`font-semibold hover:text-gray-800`}
  }
`;

const Content = styled(`div`)`
  ${tw`text-gray-200 flex flex-col justify-start p-6`}
  & > h1 {
    ${tw`text-2xl font-bold pb-3`}
  }
  & > p {
    ${tw`pb-3`}
  }
  & > blockquote {
    ${tw`my-4 ml-4 pl-2 border-l-2 border-gray-400 `}
    font: 14px/22px normal helvetica, sans-serif;
  }
`;

const PostContainer = ({ title, name, content }) => {
  return (
    <PostWrapper>
      <section className={sectionStyled}>
        <article className={articleStyled}>
          <Title>{title}</Title>
          {name && <Byline>By {name}</Byline>}
          <Content>{content}</Content>
        </article>
      </section>
    </PostWrapper>
  );
};

export default PostContainer;
