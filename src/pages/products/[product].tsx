import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const Product = (): JSX.Element => {
  const router = useRouter();
  return (
    <div className="container">
      <Head>
        <title>TODO</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Product {router.query.product}</h1>
      </main>

      <footer>
        Updated: {new Date().toISOString()}
      </footer>
    </div>
  );
};

export {
  Product as default,
};
