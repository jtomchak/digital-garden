import React from "react";
import { NextPage } from "next";

export type Article = {
  id: string;
  title: string;
  body: string;
  published: string;
  slug: string;
  category: {
    Tag: string;
  };
  relativeSlug: string;
};
export type Articles = Article[];

type GetLayoutFunc = (page: React.ReactElement) => React.ReactElement;
export type NextPageWithLayout = NextPage & {
  getLayout: GetLayoutFunc;
};
