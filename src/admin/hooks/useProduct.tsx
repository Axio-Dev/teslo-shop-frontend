import { useMutation, useQuery } from '@tanstack/react-query';
import { getProductByIdAction } from '../actions/get-product-by-id.action';
import type { Product } from '@/interfaces/product.interface';
import { createUpadateProductAction } from '../actions/create-update-product.action';

export const useProduct = (id: string) => {
  const query = useQuery({
    queryKey: ['product', { id }],
    queryFn: () => getProductByIdAction(id),
    retry: false,
    staleTime: 1000 * 60 * 5, // caché de 5 minutos
  });

  const mutation = useMutation({
    mutationFn: createUpadateProductAction,
    onSuccess: (product: Product) => {
      console.log('Todo salió bien', product);
    },
    // TODO:
    // Invalidar caché
    // Actualizar queryData
  });

  // const handleSubmitForm = async (productLike: Partial<Product>) => {
  //   console.log({ productLike });
  // };

  return {
    ...query,
    mutation,
  };
};
