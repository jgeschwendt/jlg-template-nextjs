import { Product } from '@prisma/client';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import React, { Fragment } from 'react';
import { fetchProducts } from '../../services/api';

type Props = {
  products: Product[];
};

const Products = (props: Props): JSX.Element => {
  return (
    <Fragment>
      <Head>
        <title>Products Listing</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Products Listing</h1>
        <ul>
        {
          props.products.map((product, key) => (
            <pre key={key}>{JSON.stringify(product, null, 2)}</pre>
          ))
        }
        </ul>
      </main>
    </Fragment>
  );
};

const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      products: await fetchProducts({}),
    },
    revalidate: 60 * 5,
  };
};

export {
  Products as default,
  getStaticProps,
};
