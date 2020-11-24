import styled from "@emotion/styled";
import xw, { cx } from "xwind";

// const Posxwrapper = styled.div`
//   ${xw`container mx-auto flex flex-wrap py-6 max-w-xl`}

//   > article {
//     ${xw`flex flex-col`}
//   }
// `;

// const sectionStyled = css`
//   ${xw`w-full flex flex-col items-center px-3`}
// `;
// const articleStyled = css`
//   ${xw`flex flex-col`}
// `;
// const titleAnchorStyled = css`
//   ${xw`text-gray-400 hover:text-white text-3xl font-bold pb-4 pt-2 px-4`}
// `;
// const Title = styled(`a`)`
//   ${xw`text-gray-400 hover:text-white text-3xl font-bold pb-4 pt-2 px-4`}
// `;

// const Byline = styled(`p`)`
//   ${xw`text-gray-400 text-sm pb-8 px-8`}
//   > a {
//     ${xw`font-semibold hover:text-gray-800`}
//   }
// `;

// const Content = styled(`div`)`
//   ${xw`text-gray-200 flex flex-col justify-start p-6`}
//   & > h1 {
//     ${xw`text-2xl font-bold pb-3`}
//   }
//   & > p {
//     ${xw`pb-3`}
//   }
//   & > blockquote {
//     ${xw`my-4 ml-4 pl-2 border-l-2 border-gray-400 `}
//     font: 14px/22px normal helvetica, sans-serif;
//   }
// `;

const styles = {
  container: xw`text-gray-200 flex flex-col  p-6`,
  "> article ": xw`flex flex-col`,
  section: xw`w-full flex flex-col items-start px-3`,
};

const PostContainer = ({ post: { title, name, content, categories } }) => {
  return (
    <div css={styles.container}>
      <span
        css={xw`w-auto self-start text-gray-400 hover:text-gray-50 text-3xl font-bold pb-4 pt-2 px-4`}
      >
        {title}
      </span>
      <section css={styles.section}>
        <article>
          <div>{content}</div>
        </article>
      </section>
    </div>
  );
};

export default PostContainer;
