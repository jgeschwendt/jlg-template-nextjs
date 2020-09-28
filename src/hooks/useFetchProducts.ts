import { Product } from "@prisma/client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { productList } from "../atoms/products";
import { fetchProducts } from "../services/api";

type Query = {
  default?: Product[];
  skipInitial?: boolean;
  limit?: number;
};

const isAbortError = (error: Error) => error.name === 'AbortError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useFetchProducts(query?: Query): {
  data: Product[];
  errors: Error[];
  loading: boolean;
  reload: (query?: Query) => void;
} {
  const [data, setData] = useRecoilState(productList);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadingRef = useRef(loading);

  const runEffect = useCallback(() => {
    const abortController = new AbortController();

    void (async () => {
      try {
        setLoading?.(true);
        setData(await fetchProducts({ signal: abortController.signal }));
        setLoading?.(false);
      } catch (error) {
        if (!isAbortError(error)) {
          setErrors([error]);
          setLoading?.(false);
        }
      }
    })();

    return () => {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

  useEffect(() => {
    if (!loadingRef.current && !query?.skipInitial) {
      return runEffect();
    }
  }, []);

  return {
    data,
    errors,
    loading,
    reload: useCallback(() => {
      if (!loadingRef.current) {
        return runEffect();
      }
    }, []),
  };
}
