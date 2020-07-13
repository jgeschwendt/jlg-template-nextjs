import { Container } from '@jlg/styled-components';
import Head from 'next/head';
import React from 'react';

const Products = (): JSX.Element => {
  return (
    <Container className="container">
      <Head>
        <title>Products Listing</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Products Listing</h1>
      </main>

      <footer>
        Updated: {new Date().toISOString()}
      </footer>
    </Container>
  );
};

export {
  Products as default,
};
