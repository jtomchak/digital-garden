import type { NextPage } from 'next'
import Article from '../src/components/Article';
import Layout from '../src/components/Layout';
import { fetchArticles } from '../src/hooks/useArticles';

const Home: NextPage = ({articles}) => {
  return (
<div className="text-gray-200 flex flex-col  justify-center items-center">
<div className="relative">
  {articles.map(a => <Article key={a.id} article={a} />)}
  </div>
  </div>
  )
}

Home.getLayout = (page) => <Layout>{page}</Layout>;
export default Home

export async function getStaticProps() {
  const parsed = await fetchArticles({limit: 30, daysBack: 70})
  return {
    props: {
      articles: parsed
    }

  }

}
