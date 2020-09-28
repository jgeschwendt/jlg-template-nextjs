import { Product } from "@prisma/client";

export async function addProduct(): Promise<Product> {
  const response = await fetch('http://localhost:3000/api/products/create', { method: 'POST' });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json() as Product;
}

export async function fetchProducts({ signal }: { signal?: AbortSignal }): Promise<Product[]> {
  const response = await fetch('http://localhost:3000/api/products', { signal });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json() as Product[];
}
