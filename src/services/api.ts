type Product = {
  id: number;
};

const PRODUCTS: Product[] = [{
  id: 1,
}, {
  id: 2,
}];

const pResolve = async <T>(object: T): Promise<T> => new Promise<T>((resolve) => {
  resolve(object);
});

const addProduct = async (product: Readonly<Product>): Promise<Product> => {
  // Const response = await fetch("http://localhost:3000/api/products/create", { method: "POST" });
  const response = {
    json: async (): Promise<Product> => pResolve<Product>(product),
    ok: true,
    statusText: void 0,
  };

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

const fetchProducts = async ({ signal }: Readonly<{ signal?: AbortSignal }>): Promise<Product[]> => {
  // Const response = await fetch("http://localhost:3000/api/products", { signal });
  const response = {
    json: async (): Promise<Product[]> => pResolve<Product[]>(PRODUCTS),
    ok: true,
    statusText: void 0,
  };

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  if (signal?.aborted ?? false) {
    throw new Error("signal.aborted");
  }

  return response.json();
};

export {
  addProduct,
  fetchProducts,
};
