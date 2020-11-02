import { Product } from '@prisma/client';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { productList } from '../../atoms/products';
import { fetchProducts } from '../../services/api';

type Props = {
  products: Product[];
};

const useRecoilProducts = (initialData: Props['products']) => {
  const [data, setData] = useRecoilState(productList);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  // const request = useRef(false);

  // useEffect(() => {
  //   preventRequest.current = !loading;
  // }, [loading]);

  useEffect(() => {
    if (initialData !== data) {
      setData(initialData);
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

const Products = (props: Props): JSX.Element => {
  const {
    data: products,
    errors,
    loading,
    reload,
  } = useRecoilProducts(props.products);

  return (
    <Fragment>
      <Head>
        <title>Products Listing</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Products Listing</h1>
        <div>{JSON.stringify({errors, loading},null,2)}</div>
        <button onClick={null}>Add</button>
        <button onClick={reload}>Reload</button>
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
