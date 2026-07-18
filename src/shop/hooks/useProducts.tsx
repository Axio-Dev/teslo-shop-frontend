import { useQuery } from '@tanstack/react-query';
import { getProductsAction } from '../actions/get-products.action';
import { useParams, useSearchParams } from 'react-router';

export const useProducts = () => {
  const { gender } = useParams();
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const limit = searchParams.get('limit') || 9;
  const page = searchParams.get('page') || 1;
  const sizes = searchParams.get('sizes') || undefined;

  const offset = (Number(page) - 1) * Number(limit);

  const price = searchParams.get('price') || 'any';
  let min_price = undefined;
  let max_price = undefined;

  switch (price) {
    case 'any':
      break;

    case '0-50':
      min_price = 0;
      max_price = 50;
      break;

    case '50-100':
      min_price = 50;
      max_price = 100;
      break;

    case '100-200':
      min_price = 100;
      max_price = 200;
      break;

    case '200+':
      min_price = 200;
      max_price = undefined;
      break;
  }

  return useQuery({
    queryKey: [
      'products',
      { offset, limit, gender, sizes, min_price, max_price, query },
    ],
    queryFn: () =>
      getProductsAction({
        limit: isNaN(+limit) ? 9 : limit,
        offset: isNaN(offset) ? 0 : offset,
        gender,
        sizes,
        min_price,
        max_price,
        query,
      }),
    staleTime: 1000 * 60 * 5, // 5 minutes info will be cached
  });
};
