import { tesloApi } from '@/api/tesloApi';
import type { Product } from '@/interfaces/product.interface';

export const createUpadateProductAction = async (
  productLike: Partial<Product>,
): Promise<Product> => {
  const { id, user, imageUrls = [], ...rest } = productLike;

  const isCreating = id === 'new';

  rest.stock = Number(rest.stock || 0);
  rest.price = Number(rest.price || 0);

  const { data } = await tesloApi<Product>({
    url: isCreating ? '/products/' : `/products/${id}/`,
    method: isCreating ? 'POST' : 'PATCH',
    data: rest,
  });

  return {
    ...data,
    imageUrls: data.images.map((img) => {
      if (img.image.includes('http')) return img.image;
      return `${import.meta.env.VITE_API_URL}/media/products/${img.image}`;
    }),
  };
};
