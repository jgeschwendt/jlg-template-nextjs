import { Box, Flex } from '@jlg/styled-components';
import { Product } from '@prisma/client';
import { GetServerSideProps } from 'next';
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
          <Flex flexWrap="wrap">
          {
            props.products.map((product, key) => (
              <Box key={key}>
                <pre>{
                  JSON.stringify(product, null, 2)
                }</pre>
              </Box>
            ))
          }
          </Flex>
      </main>
    </Fragment>
  );
};

const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      products: await fetchProducts({}),
    },
  };
};

export {
  Products as default,
  getServerSideProps,
};
