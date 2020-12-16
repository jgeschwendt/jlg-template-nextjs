import type { GetServerSideProps } from "next";
import Head from "next/head";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import type { Product } from "../../atoms/products";
import { productList } from "../../atoms/products";
import { fetchProducts } from "../../services/api";

const useRecoilProducts = (initialData: Readonly<Readonly<Product>[]>): {
  data: Product[];
  errors: Error[];
  loading: boolean;
  reload: () => Promise<void>;
} => {
  const [data, setData] = useRecoilState(productList);
  const [errors, setErrors] = useState<Error[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData !== data) {
      setData(initialData as Product[]);
    }
  }, [data, initialData, setData]);

  return {
    data,
    errors,
    loading,
    reload: useCallback(async () => {
      if (!loading) {
        try {
          setLoading(true);
          setData(await fetchProducts({}));
          setLoading(false);
        } catch (error) {
          setErrors([error]);
          setLoading(false);
        }
      }
    }, [loading, setData]),
  };
};

type Props = Readonly<{
  products: readonly Product[];
}>;

const Products = (props: Readonly<Record<string, unknown>>): JSX.Element => {
  const {
    data: products,
    errors,
    loading,
    reload,
  } = useRecoilProducts(props.products as Product[]);

  return (
    <Fragment>
      <Head>
        <title>Products Listing</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Products Listing</h1>
        <div>{JSON.stringify({
          errors,
          loading,
        }, null, 2)}</div>
        <button onClick={(): 0 => 0}>Add</button>
        <button onClick={reload}>Reload</button>
        <ul>
          {products.map((product, key) => <pre key={key}>{JSON.stringify(product, null, 2)}</pre>)}
        </ul>
      </main>
    </Fragment>
  );
};

const getServerSideProps: GetServerSideProps<Props> = async () => ({
  props: {
    products: await fetchProducts({}),
  },
});

export {
  Products as default,
  getServerSideProps,
};
