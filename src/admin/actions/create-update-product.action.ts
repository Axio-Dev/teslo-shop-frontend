import { tesloApi } from '@/api/tesloApi';
import type { Product } from '@/interfaces/product.interface';
import { sleep } from '@/lib/sleep';

export const createUpdateProductAction = async (
  productLike: Partial<Product> & { files?: File[] },
): Promise<Product> => {
  await sleep(1500);

  const { id = '', user, imageUrls = [], files = [], ...rest } = productLike;

  const isCreating = id === 'new';

  rest.stock = Number(rest.stock || 0);
  rest.price = Number(rest.price || 0);

  // Preparar las imágenes
  if (files.length > 0) {
    const newImageNames = await uploadImages(files, id);
    imageUrls.push(...newImageNames);
  }

  const imagesToSave = imageUrls.map((image) => {
    if (image.includes('http')) return image.split('/').pop() || '';
    return image;
  });

  const { data } = await tesloApi<Product>({
    url: isCreating ? '/products/' : `/products/${id}/`,
    method: isCreating ? 'POST' : 'PATCH',
    data: {
      ...rest,
      imageUrls: imagesToSave,
    },
  });

  return {
    ...data,
    imageUrls: data.images.map((img) => {
      if (img.image.includes('http')) return img.image;
      return `${import.meta.env.VITE_API_URL}/media/products/${img.image}`;
    }),
  };
};

export interface FileUploadResponse {
  id: number;
  product: string;
  created_at: Date;
  image: string;
  image_url: string;
}

const uploadImages = async (files: File[], productId: string) => {
  const uploadPromises = files.map(async (file) => {
    const formData = new FormData();

    formData.append('product', productId);
    formData.append('image', file);

    const { data } = await tesloApi<FileUploadResponse>({
      url: '/products-images/',
      method: 'POST',
      data: formData,
    });

    return data.image;
  });

  const uploadImagesNames = await Promise.all(uploadPromises);

  return uploadImagesNames;
};
