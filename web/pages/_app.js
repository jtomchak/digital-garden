import Head from "next/head";
import { Global } from "@emotion/react";
import xw from "xwind";

import "../styles/base.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Jesse Tomchak</title>
      </Head>
      <Global
        //add tailwind base + keyframes ... to global styles
        styles={xw`XWIND_BASE XWIND_GLOBAL`}
      />
      <Component {...pageProps} />
    </>
  );
}
