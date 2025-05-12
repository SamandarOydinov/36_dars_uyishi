import { useQuery } from "@tanstack/react-query";
import {
  getProductByIdApi,
  getProductsApi,
  getProductsByCategoryApi,
} from "../api";

export const useAllProducts = () => {
  return useQuery({
    queryKey: ["all-products"],
    queryFn: getProductsApi,
  });
};

export const useProductById = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductByIdApi(id),
    enabled: !!id,
  });
};

export const useProductsByCategory = (filters = {}) => {
  const {
    category,
    price_gte,
    price_lte,
    colors: filterColors /*, size: filterSize ... */,
  } = filters;

  return useQuery({
    queryKey: ["filtered-products", filters], // Filterlar o'zgarsa, queryKey ham o'zgaradi
    queryFn: async () => {
      const allProducts = await getProductsApi();

      if (!allProducts || allProducts.length === 0) {
        return [];
      }

      let filteredProducts = [...allProducts];

      // 1. Kategoriya bo'yicha filterlash
      if (category) {
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.category &&
            product.category.toLowerCase() === category.toLowerCase()
        );
      }

      // 2. Narx bo'yicha filterlash (YANGI QO'SHILDI)
      if (price_gte !== undefined && price_gte !== null) {
        // null ham tekshiriladi
        const minPrice = parseFloat(price_gte);
        filteredProducts = filteredProducts.filter(
          (product) => product.price >= minPrice
        );
      }
      if (price_lte !== undefined && price_lte !== null) {
        // null ham tekshiriladi
        const maxPrice = parseFloat(price_lte);
        filteredProducts = filteredProducts.filter(
          (product) => product.price <= maxPrice
        );
      }

      // 3. Rang bo'yicha filterlash (agar API da mahsulotlarda rang ma'lumoti bo'lsa)
      // if (filterColors && Array.isArray(filterColors) && filterColors.length > 0) {
      //   // ... (rang filterlash logikasi)
      // }

      // Boshqa filterlarni ham shu yerga qo'shish mumkin

      return filteredProducts;
    },
  });
};
