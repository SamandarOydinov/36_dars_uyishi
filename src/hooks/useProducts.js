import { useQuery } from '@tanstack/react-query';
import {
  
  
  getProductsApi,
} from '../api';
import { getProductByIdApi } from '../api/productId';

export const useAllProducts = () => {
  return useQuery({
    queryKey: ['all-products'],
    queryFn: getProductsApi,
  });
};

export const useProductById = (id) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductByIdApi(id),
    enabled: !!id,
  });
};

export const useProductsByCategory = (filters = {}) => {
  const { category, price_gte, price_lte, colors: filterColors } = filters;

  return useQuery({
    queryKey: ['filtered-products', filters],
    queryFn: async () => {
      const allProducts = await getProductsApi();

      if (!allProducts || allProducts.length === 0) {
        return [];
      }

      let filteredProducts = [...allProducts];

      if (category) {
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.category &&
            product.category.toLowerCase() === category.toLowerCase(),
        );
      }

      if (price_gte !== undefined && price_gte !== null) {
        const minPrice = parseFloat(price_gte);
        filteredProducts = filteredProducts.filter(
          (product) => product.price >= minPrice,
        );
      }
      if (price_lte !== undefined && price_lte !== null) {
        const maxPrice = parseFloat(price_lte);
        filteredProducts = filteredProducts.filter(
          (product) => product.price <= maxPrice,
        );
      }

      return filteredProducts;
    },
  });
};
