import sanityClient from "@sanity/client";
import { groq, createClient } from "next-sanity";

/**
 * Datasets include 'production' and 'stage' for developement
 * Project_ID is the same for both
 */
const options = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: "2021-08-31",
  // useCdn == true gives fast, cheap responses using a globally distributed cache.
  // Set this to false if your application require the freshest possible. aka development
};

// Set up Portable Text serialization

const client = sanityClient(options);

export const previewClient = (token = process.env.SANITY_API_TOKEN) =>
  sanityClient({
    ...options,
    useCdn: false,
    token: token,
  });

export default client;
