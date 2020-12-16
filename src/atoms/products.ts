import { atom } from "recoil";

export type Product = {
  id: number;
};

export const productList = atom<Product[]>({
  key: "products",
  // eslint-disable-next-line sort-keys -- metadata break
  default: [],
});
