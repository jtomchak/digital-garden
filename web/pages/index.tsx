import type { NextPage } from 'next'
import Article from '../src/components/Article';

import { fetchArticles } from '../src/hooks/useArticles';

const Home: NextPage = ({articles}) => {
  return (
<div className="text-gray-200 flex flex-col  justify-center items-center">{articles.map(a => <Article key={a.id} article={a} />)}</div>
  )
}
export default Home

export async function getStaticProps() {
  const parsed = await fetchArticles({limit: 30, daysBack: 70})
  return {
    props: {
      articles: parsed
    }

  }

}
