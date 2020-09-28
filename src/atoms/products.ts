import { Product } from "@prisma/client";
import { atom } from "recoil";

export const productList = atom<Product[]>({
  key: 'product-list',
  // eslint-disable-next-line sort-keys
  default: [],
});
