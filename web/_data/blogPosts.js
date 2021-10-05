const axios = require("axios");

const STRAPI_URL = "https://content.jessetomchak.com/graphql";

const QUERY = (limit = 50, start = 0) => ({
  query: `query getPosts($limit: Int, $start:Int) {
    articles(limit: $limit, start: $start, publicationState: LIVE){
      id
      title
      slug
      published
      body
      category{
        Tag
      }
    }
  }`,
  variables: { limit: limit, start: start },
});

// function to get blogposts
async function getAllPosts() {
  // max number of records to fetch per query
  const recordsPerQuery = 50;

  // number of records to skip (start at 0)
  let recordsToStartAt = 0;

  let makeNewQuery = true;

  let blogposts = [];

  // make queries until makeNewQuery is set to false
  while (makeNewQuery) {
    try {
      // initiate fetch
      config = {
        method: "post",
        url: STRAPI_URL,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(QUERY(recordsPerQuery, recordsToStartAt)),
      };
      const { data: response } = await axios(config);

      // handle CMS errors
      if (response.errors) {
        let errors = response.errors;
        errors.map((error) => {
          console.log(error.message);
        });
        throw new Error("Houston... We have a CMS problem");
      }

      // update blogpost array with the data from the JSON response
      blogposts = blogposts.concat(response.data.articles);

      // prepare for next query
      recordsToStartAt += recordsPerQuery;

      // stop querying if we are getting back less than the records we fetch per query
      if (response.data.articles.length < recordsPerQuery) {
        makeNewQuery = false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  // format blogposts objects
  const blogpostsFormatted = blogposts.map((item) => {
    return {
      id: item.id,
      title: item.title,
      slug: item.slug,
      body: item.body,
      date: item.published,
      tag: item.category.Tag,
    };
  });

  // return formatted blogposts
  return blogpostsFormatted;
}

// export for 11ty
module.exports = getAllPosts;
