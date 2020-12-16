import styled from "@emotion/styled";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import React, { Fragment } from "react";
import { fetchProducts } from "../../services/api";

type Props = Readonly<{
  products: Readonly<unknown[]>;
}>;

const Flex = styled.div<{ flexWrap?: string }>``;
const Box = styled.div``;

const Products = (props: Props): JSX.Element => (
  <Fragment>
    <Head>
      <title>Products Listing</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <Flex flexWrap="wrap">
        {
          props.products.map((product, key) => <Box key={key}>
            <pre>{
              JSON.stringify(product, null, 2)
            }</pre>
          </Box>)
        }
      </Flex>
    </main>
  </Fragment>
);

const getServerSideProps: GetServerSideProps<Props> = async () => ({
  props: {
    products: await fetchProducts({}),
  },
});

export {
  Products as default,
  getServerSideProps,
};
