import { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import type { Product } from "../atoms/products";
import { productList } from "../atoms/products";
import { fetchProducts } from "../services/api";

const isAbortError = (error: Readonly<Error>): boolean => error.name === "AbortError";

type Query = Readonly<{
  default?: Product[];
  skipInitial?: boolean;
  limit?: number;
}>;

// eslint-disable-next-line max-lines-per-function -- meh
export const useFetchProducts = ({
  skipInitial = false,
}: Query): {
    data: Product[];
    errors: Error[];
    loading: boolean;
    reload: (query?: Query) => void;
  } => {
  const [data, setData] = useRecoilState(productList);
  const [errors, setErrors] = useState<Error[]>([]);
  const [loading, setLoading] = useState(false);

  const loadingRef = useRef(loading);

  const runEffect = useCallback(() => {
    const abortController = new AbortController();

    void (async (): Promise<void> => {
      try {
        setLoading(true);
        setData(await fetchProducts({ signal: abortController.signal }));
        setLoading(false);
      } catch (error) {
        if (!isAbortError(error)) {
          setErrors([error]);
          setLoading(false);
        }
      }
    })();

    return (): void => {
      abortController.abort();
    };
  }, [setData]);

  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

  useEffect(() => {
    if (!loadingRef.current && !skipInitial) {
      runEffect();
    }
  }, [skipInitial, runEffect]);

  return {
    data,
    errors,
    loading,
    reload: useCallback(() => {
      if (!loadingRef.current) {
        runEffect();
      }
    }, [runEffect]),
  };
};
