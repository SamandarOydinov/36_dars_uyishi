import { useQuery } from '@tanstack/react-query';
import { getProductByIdApi } from '../api/productId';

export const useProductById = (id) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductByIdApi(id),
    enabled: !!id,
  });
};
