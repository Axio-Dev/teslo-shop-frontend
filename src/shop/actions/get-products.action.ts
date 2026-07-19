import { tesloApi } from '@/api/tesloApi';
import type { ProductsResponse } from '@/interfaces/products.response';

interface Options {
  limit?: number | string;
  offset?: number | string;
  sizes?: string;
  gender?: string;
  min_price?: number;
  max_price?: number;
  query?: string;
}

export const getProductsAction = async (
  options: Options,
): Promise<ProductsResponse> => {
  const { limit, offset, gender, sizes, min_price, max_price, query } = options;

  const { data } = await tesloApi.get<ProductsResponse>('/products/', {
    params: {
      limit,
      offset,
      gender,
      sizes,
      min_price,
      max_price,
      q: query,
    },
  });

  const productsWithImageUrl = data.products.map((product) => ({
    ...product,
    imageUrls: product.images.map(
      (image) =>
        `${import.meta.env.VITE_API_URL}/media/products/${image.image}`,
    ),
  }));

  return {
    ...data,
    products: productsWithImageUrl,
  };
};
