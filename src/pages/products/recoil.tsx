import Head from 'next/head';
import React, { Fragment } from 'react';
import { useFetchProducts } from '../../hooks/useFetchProducts';

const Products = (): JSX.Element => {
  const {
    data: products,
    loading,
    reload,
  } = useFetchProducts();

  return (
    <Fragment>
      <Head>
        <title>Products Listing</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Products Listing</h1>
        <button onClick={null}>Add</button>
        <button onClick={() => reload()}>Reload</button>
        <pre>{JSON.stringify(loading)}</pre>
        <ul>
        {
          products.map((product, key) => {
            return (
              <pre key={key}>{JSON.stringify(product, null, 2)}</pre>
            );
          })
        }
        </ul>
      </main>
    </Fragment>
  );
};

export {
  Products as default,
};
